"use client";

import {
  addNewAffiliate,
  AffiliateSchema,
  IAffiliate,
} from "@/lib/firebase/add-affiliate";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import toast from "react-hot-toast";
import { gsec } from "../_lib/utils";
import { getUID } from "../actions";
import { moses, secureRef } from "@/utils/helpers";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  collection,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface AffiliateConfig {
  id: string;
  label: string;
  description: string;
  value: boolean;
  onCheckedChange: (id: string) => (checked: boolean) => void;
}
interface AffiliateCtxValues {
  affiliateConfigState: {
    activated: boolean;
    generateQR: boolean;
  };
  affiliateConfigs: AffiliateConfig[];
  createAffiliate: (
    prev: IAffiliate,
    formData: FormData,
  ) => Promise<IAffiliate>;
  qrCodeUrl: string | null;
  qrCodeData: string | null;
  affiliates: IAffiliate[];
  loading: boolean;
}

const affiliatesConverter = {
  toFirestore: (affiliate: IAffiliate) => ({
    id: affiliate.id,
    name: affiliate.name,
    email: affiliate.email,
    phone: affiliate.phone,
  }),
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ) => {
    const data = snapshot.data(options);
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      tags: data.tags,
      active: data.active,
    };
  },
};

export const AffiliateCtx = createContext<AffiliateCtxValues | null>(null);

export const AffiliateCtxProvider = ({ children }: { children: ReactNode }) => {
  const [affiliateConfigState, setAffiliateConfigState] = useState({
    activated: true,
    generateQR: true,
  });

  const [affiliates, setAffiliates] = useState<IAffiliate[]>([]);

  const [data, loading] = useCollection(
    collection(db, "affiliates").withConverter(affiliatesConverter),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );

  useEffect(() => {
    if (data) {
      const d = data.docs.map((doc) => doc.data());
      setAffiliates(d);
    }
  }, [data]);

  // Modify the onCheckedChange handler
  const onAffiliateConfigChange = useCallback(
    (id: string) => (checked: boolean) => {
      setAffiliateConfigState((prev) => ({
        ...prev,
        [id]: checked,
      }));
    },
    [],
  );
  const affiliateConfigs = useMemo(
    () =>
      [
        {
          id: "activated",
          label: "Activate Account",
          description: "Check to activate affiliate account on create",
          value: affiliateConfigState.activated,
          onCheckedChange: onAffiliateConfigChange,
        },
        {
          id: "generateQR",
          label: "Generate QR",
          description: "This will generate a QR code on create",
          value: affiliateConfigState.generateQR,
          onCheckedChange: onAffiliateConfigChange,
        },
      ] as AffiliateConfig[],
    [onAffiliateConfigChange, affiliateConfigState],
  );

  const [qrCodeData, setQRCodeData] = useState<string | null>(null);
  const [qrCodeUrl, setQRCodeUrl] = useState<string | null>(null);

  const createAffiliate = useCallback(
    async (prev: IAffiliate, formData: FormData) => {
      const validation = runValidation(formData);

      const createdBy = (await getUID()) ?? "me";

      if (validation.error) {
        console.log(validation.error);
      }

      let qrCode;
      if (affiliateConfigState.generateQR) {
        const qr = await generateQR(gsec(), "grp", createdBy);
        qrCode = {
          id: qr?.id ?? "",
          ident: qr?.ident ?? "",
          url: qr?.qrUrl ?? "",
          data: qr?.qrData ?? "",
          active: true,
          createdBy,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        console.log(qrCode);
      }

      if (qrCode) {
        setQRCodeUrl(qrCode.url);
        setQRCodeData(qrCode.data);
      }

      try {
        const id = gsec();
        const promise = addNewAffiliate(id, {
          ...validation.data,
          id,
          createdBy,
          active: affiliateConfigState.activated,
          rewardPoints: 10,
          level: 1,
          qrCodes: qrCode && [qrCode],
        });

        await toast.promise(promise, {
          loading: "Generating...",
          success: "Successful!",
          error: "Failed to generate QR.",
        });
      } catch (err) {
        console.log(err);
      }
      console.log(validation.data);
      return prev;
    },
    [affiliateConfigState],
  );
  const value = useMemo(
    () => ({
      affiliateConfigState,
      affiliateConfigs,
      createAffiliate,
      qrCodeData,
      qrCodeUrl,
      affiliates,
      loading,
    }),
    [
      affiliateConfigState,
      affiliateConfigs,
      createAffiliate,
      qrCodeData,
      qrCodeUrl,
      affiliates,
      loading,
    ],
  );
  return <AffiliateCtx value={value}>{children}</AffiliateCtx>;
};

const runValidation = (formData: FormData) => {
  const validation = AffiliateSchema.safeParse({
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
  });
  return validation;
};

export const generateQR = async (id: string, grp?: string, seed?: string) => {
  const ident = moses(("b" + secureRef(8) + "d").toUpperCase());

  try {
    const response = await fetch(
      `/api/generate-qr?id=${encodeURIComponent(id)}&grp=${encodeURIComponent(grp ?? "")}&seed=${encodeURIComponent(seed ?? "")}&iztp1nk=${encodeURIComponent(ident)}`,
    );

    if (!response.ok) {
      throw new Error("Failed to generate QR code");
    }

    const data = (await response.json()) as {
      qrUrl: string | null;
      qrData: string | null;
    };

    return {
      error: null,
      qrUrl: data.qrUrl,
      qrData: data.qrData,
      ident,
      id,
    };
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "An error occurred",
      qrUrl: null,
      qrData: null,
    };
  }
};

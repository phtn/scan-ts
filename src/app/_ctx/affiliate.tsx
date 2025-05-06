"use client";

import {
  addNewAffiliate,
  AffiliateSchema,
  IAffiliate,
  IQrCode,
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
  affiliates: IAffiliate[];
  loading: boolean;
  getQRCodes: (affiliate: IAffiliate) => void;
  qrCodeList: IQrCode[] | undefined;
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
      level: data.level,
      qrCodes: data.qrCodes,
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

  const [qrCodeUrl, setQRCodeUrl] = useState<string | null>(null);
  const [qrCodeList, setQRCodes] = useState<IQrCode[]>();

  const getQRCodes = useCallback(({ qrCodes }: IAffiliate) => {
    setQRCodes(qrCodes);
    setQRCodeUrl(qrCodes?.[0]?.url ?? null);
  }, []);

  const createAffiliate = useCallback(
    async (prev: IAffiliate, formData: FormData) => {
      const validation = runValidation(formData);

      const createdBy = (await getUID()) ?? "DEV";

      if (validation.error) {
        console.log(validation.error);
      }

      let qrCode;
      if (affiliateConfigState.generateQR) {
        const qr = await generateQR(gsec(), createdBy, gsec());
        qrCode = {
          id: qr?.id ?? "",
          ident: qr?.ident ?? "",
          url: qr?.qrUrl ?? "",
          active: true,
          createdBy,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        console.log(qrCode);
      }

      if (qrCode) {
        setQRCodeUrl(qrCode.url);
      }

      try {
        const promise = addNewAffiliate(gsec(), {
          ...validation.data,
          active: affiliateConfigState.activated,
          rewardPoints: 0,
          level: 1,
          createdBy,
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
      qrCodeUrl,
      affiliates,
      loading,
      getQRCodes,
      qrCodeList,
    }),
    [
      affiliateConfigState,
      affiliateConfigs,
      createAffiliate,
      qrCodeUrl,
      affiliates,
      loading,
      getQRCodes,
      qrCodeList,
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

  const host =
    process.env.NODE_ENV === "development"
      ? "https://192.168.1.30:3000"
      : "https://scan-ts.vercel.app";
  const qrUrl = `${host}/?id=${encodeURIComponent(id)}&grp=${encodeURIComponent(grp ?? "no-group")}&seed=${encodeURIComponent(seed ?? "")}&iztp1nk=${encodeURIComponent(ident)}`;

  return {
    error: null,
    qrUrl,
    ident,
    id,
  };
};

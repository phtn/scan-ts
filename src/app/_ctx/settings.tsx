"use client";

import { db } from "@/lib/firebase";
import { IAppSetting } from "@/lib/firebase/update-settings";
import { collection } from "firebase/firestore";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useCollection } from "react-firebase-hooks/firestore";

// const subsConverter = {
//   toFirestore: () => {},
//   fromFirestore: (
//     snapshot: QueryDocumentSnapshot,
//     options: SnapshotOptions,
//   ) => {
//     const data = snapshot.data(options);
//     return {
//       id: data.id,
//       user: data.user,
//       affiliate: data.affiliate.id,
//       device: data.device,
//       createdAt: data.createdAt,
//       updatedAt: data.updatedAt,
//     };
//   },
// };

interface SettingsCtxValues {
  appSettings: IAppSetting | null;
  loading: boolean;
}
export const SettingsCtx = createContext<SettingsCtxValues | null>(null);

export const SettingsCtxProvider = ({ children }: { children: ReactNode }) => {
  const [appSettings, setSettings] = useState<IAppSetting | null>(null);

  const [data, loading] = useCollection(collection(db, "configs"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  useEffect(() => {
    if (data) {
      const docs = data.docs.map((doc) => doc.data() as IAppSetting);
      setSettings(docs[0]);
    }
  }, [data]);

  const value = useMemo(
    () => ({
      appSettings,
      loading,
    }),
    [appSettings, loading],
  );
  return <SettingsCtx value={value}>{children}</SettingsCtx>;
};

export const useSettingsCtx = () => {
  const ctx = useContext(SettingsCtx);
  if (!ctx) throw new Error("SettingsCtx not found");
  return ctx;
};

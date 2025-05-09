"use client";

import { db } from "@/lib/firebase";
import { Sub } from "@/lib/firebase/add-sub";
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

interface SubsCtxValues {
  subs: Sub[];
  loading: boolean;
}
export const SubsCtx = createContext<SubsCtxValues | null>(null);

export const SubsCtxProvider = ({ children }: { children: ReactNode }) => {
  const [subs, setSubs] = useState<Sub[]>([]);

  const [data, loading] = useCollection(collection(db, "subs"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  useEffect(() => {
    if (data) {
      const d = data.docs.map((doc) => doc.data());
      setSubs(d as Sub[]);
      console.log(d);
    }
  }, [data]);

  const value = useMemo(
    () => ({
      subs,
      loading,
    }),
    [subs, loading],
  );
  return <SubsCtx value={value}>{children}</SubsCtx>;
};

export const useSubsCtx = () => {
  const ctx = useContext(SubsCtx);
  if (!ctx) throw new Error("SubsCtx not found");
  return ctx;
};

"use client";

import { db } from "@/lib/firebase";
import { Log } from "@/lib/firebase/add-log";
import {
  collection,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useCollection } from "react-firebase-hooks/firestore";

const logsConverter = {
  toFirestore: (log: Log) => ({
    id: log.id,
    name: log.name,
    action: log.action,
    ref: log.ref,
    note: log.note,
  }),
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ) => {
    const data = snapshot.data(options);
    return {
      id: data.id,
      uid: data.uid,
      name: data.name,
      action: data.action,
      ref: data.ref,
      note: data.note,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  },
};

interface LogCtxValues {
  logs: Log[];
  loading: boolean;
}
export const LogCtx = createContext<LogCtxValues | null>(null);

export const LogCtxProvider = ({ children }: { children: ReactNode }) => {
  const [logs, setLogs] = useState<Log[]>([]);

  const [data, loading] = useCollection(
    collection(db, "logs").withConverter(logsConverter),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );

  useEffect(() => {
    if (data) {
      const d = data.docs.map((doc) => doc.data());
      setLogs(d);
    }
  }, [data]);

  const value = useMemo(
    () => ({
      logs,
      loading,
    }),
    [logs, loading],
  );
  return <LogCtx value={value}>{children}</LogCtx>;
};

export const useLogCtx = () => {
  const ctx = useContext(LogCtx);
  if (!ctx) throw new Error("LogCtx not found");
  return ctx;
};

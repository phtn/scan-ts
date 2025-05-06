import { collection, doc, setDoc } from "firebase/firestore";
import { db } from ".";

export interface Log {
  id: string | undefined;
  uid: string | null;
  name: string | null;
  ref: string | null;
  action: string | null;
  note: string | null;
  createdAt: number | undefined;
  updatedAt: number | undefined;
}
export async function addLog(id: string, payload: Log) {
  try {
    const ref = collection(db, "logs");
    const docRef = doc(ref, id);

    console.log(JSON.stringify(payload, null, 2));

    await setDoc(docRef, {
      ...payload,
      id,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    console.log("Document added successfully!");
    return "success";
  } catch (e) {
    console.error("Error adding document: ", e);
    return "failed";
  }
}

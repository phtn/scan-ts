import { collection, doc, setDoc } from "firebase/firestore";
import { db } from ".";

export interface IAppSetting {
  id: string | undefined;
  active: boolean | undefined;
  comms: {
    messenger: {
      value: string | null;
      enabled: boolean | null;
      updatedBy: number | undefined;
      updatedAt: number | undefined;
    };
    phone: {
      value: string | null;
      enabled: boolean | null;
      updatedBy: number | undefined;
      updatedAt: number | undefined;
    };
  };
  createdBy: number | undefined;
  createdAt: number | undefined;
  updatedBy: number | undefined;
  updatedAt: number | undefined;
}
export async function updateSettings(id: string, payload: IAppSetting) {
  try {
    const ref = collection(db, "configs");
    const docRef = doc(ref, id);

    console.log(JSON.stringify(payload, null, 2));

    await setDoc(docRef, {
      ...payload,
      id,
      updatedAt: Date.now(),
      createdAt: Date.now(),
    });

    console.log("Document added successfully!");
    return "success";
  } catch (e) {
    console.error("Error adding document: ", e);
    return "failed";
  }
}

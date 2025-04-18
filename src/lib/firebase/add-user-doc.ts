import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { type SubmitPayload } from "@/app/hooks/use-form";
import { db } from ".";

export async function addNewData(doc_id: string, payload: SubmitPayload) {
  try {
    const submitsRef = collection(db, "submits");
    const docRef = doc(submitsRef, doc_id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document already exists!");
      return "exists";
    } else {
      // Document doesn't exist, add it
      await setDoc(docRef, {
        doc_id,
        user: payload.user,
        station: payload.station,
        device: payload.device,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      console.log("Document added successfully!");
      return "success";
    }
  } catch (e) {
    console.error("Error adding document: ", e);
    return "failed";
  }
}

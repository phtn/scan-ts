import { collection, doc, getDoc, addDoc } from "firebase/firestore";
import { type SubmitPayload } from "@/app/hooks/use-form";
import { db } from ".";

export async function addDataIfNotExist(
  doc_id: string,
  payload: SubmitPayload,
) {
  try {
    const collectionRef = collection(db, "submits");
    const docRef = doc(collectionRef, doc_id); // Create a DocumentReference with the ID
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document already exists!");
    } else {
      // Document doesn't exist, add it
      await addDoc(collectionRef, payload);
      console.log("Document added successfully!");
      return "success";
    }
  } catch (e) {
    console.error("Error adding document: ", e);
    return "failed";
  }
}

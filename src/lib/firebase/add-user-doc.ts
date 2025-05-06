import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from ".";
import type { AffiliateId, Device } from "@/app/types";
import type { UserType } from "@/components/forms/schema";

export interface SubmitPayload {
  user: UserType;
  affiliateId: AffiliateId;
  device: Device;
}

export async function addNewData(doc_id: string, payload: SubmitPayload) {
  try {
    const submitsRef = collection(db, "submissions");
    const docRef = doc(submitsRef, doc_id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document already exists!");
      return "exists";
    } else {
      // Document doesn't exist, add it
      await setDoc(docRef, {
        id: doc_id,
        user: payload.user,
        affiliateId: payload.affiliateId,
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

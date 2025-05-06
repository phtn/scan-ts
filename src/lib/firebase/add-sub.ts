import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from ".";
import type { AffiliateId, Device } from "@/app/types";
import type { InquiryFormType } from "@/components/forms/schema";

export interface Sub {
  user: InquiryFormType;
  affiliateId: AffiliateId;
  device: Device;
}

export async function addSub(doc_id: string, payload: Sub) {
  try {
    const ref = collection(db, "subs");
    const docRef = doc(ref, doc_id);
    const docSnap = await getDoc(docRef);

    console.log(doc_id, JSON.stringify(payload, null, 2));

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

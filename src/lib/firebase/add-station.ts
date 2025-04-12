import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from ".";

interface StationPayload {
  params: {
    id: string;
    param1: string;
    param2: string;
  };
  url: string | null;
  data: string | null;
}
export async function addStation(doc_id: string, payload: StationPayload) {
  try {
    const stationsRef = collection(db, "stations");
    const docRef = doc(stationsRef, doc_id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document already exists!");
      return "exists";
    } else {
      // Document doesn't exist, add it
      await setDoc(docRef, {
        doc_id,
        ...payload,
      });

      console.log("Document added successfully!");
      return "success";
    }
  } catch (e) {
    console.error("Error adding document: ", e);
    return "failed";
  }
}

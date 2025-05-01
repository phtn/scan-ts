import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from ".";
import { z } from "zod";

export const QrCodeSchema = z.object({
  active: z.boolean(),
  url: z.string().url(),
  data: z.string().url(),
  id: z.string().optional(),
  grp: z.string().optional(),
  seed: z.string().optional(),
  ident: z.string().optional(),
  createdBy: z.string().optional(),
  createdAt: z.number().optional(),
  updatedAt: z.number().optional(),
});
export type IQrCode = z.infer<typeof QrCodeSchema>;

export const AffiliateSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  tags: z.string().optional(),
  group: z.string().optional(),
  level: z.number().optional(),
  active: z.boolean().optional(),
  createdBy: z.string().optional(),
  createdAt: z.number().optional(),
  updatedAt: z.number().optional(),
  rewardPoints: z.number().optional(),
  referralCount: z.number().optional(),
  rewards: z.array(z.record(z.string(), z.number())).optional(),
  qrCodes: z.array(QrCodeSchema).optional(),
});

export type IAffiliate = z.infer<typeof AffiliateSchema>;

export async function addNewAffiliate(docId: string, payload: IAffiliate) {
  try {
    const collectionRef = collection(db, "affiliates");
    const docRef = doc(collectionRef, docId);
    const docSnap = await getDoc(docRef);

    console.log(payload);

    if (docSnap.exists()) {
      console.log("Document already exists!");
      return "exists";
    } else {
      // Document doesn't exist, add it
      await setDoc(docRef, {
        docId,
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

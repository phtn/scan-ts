// import { gsec } from "@/app/_lib/utils";
// import { getUID } from "@/app/actions";
// import {
//   addNewAffiliate,
//   AffiliateSchema,
//   type IAffiliate,
// } from "@/lib/firebase/add-affiliate";
// import { moses, secureRef } from "@/utils/helpers";
// import { useCallback, useState } from "react";
// import toast from "react-hot-toast";

// export const useAffiliate = () => {

//   const [qrCodeData, setQRCodeData] = useState<string | null>(null);
//   const [qrCodeUrl, setQRCodeUrl] = useState<string | null>(null);

//   const createAffiliate = useCallback(
//     async (prev: IAffiliate, formData: FormData) => {
//       const validation = runValidation(formData);

//       const createdBy = (await getUID()) ?? "me";

//       if (validation.error) {
//         console.log(validation.error);
//       }

//       let qrCode;
//       if (checkboxStates.generateQR) {
//         const qr = await generateQR(gsec(), "grp", createdBy);
//         qrCode = {
//           id: qr?.id ?? "",
//           ident: qr?.ident ?? "",
//           url: qr?.qrUrl ?? "",
//           data: qr?.qrData ?? "",
//           active: true,
//           createdBy,
//           createdAt: Date.now(),
//           updatedAt: Date.now(),
//         };
//         console.log(qrCode);
//       }

//       if (qrCode) {
//         setQRCodeUrl(qrCode.url);
//         setQRCodeData(qrCode.data);
//       }

//       try {
//         const id = gsec();
//         const promise = addNewAffiliate(id, {
//           ...validation.data,
//           id,
//           createdBy,
//           active: checkboxStates.activated,
//           rewardPoints: 10,
//           level: 1,
//           qrCodes: qrCode && [qrCode],
//         });

//         await toast.promise(promise, {
//           loading: "Generating...",
//           success: "Successful!",
//           error: "Failed to generate QR.",
//         });
//       } catch (err) {
//         console.log(err);
//       }
//       console.log(validation.data);
//       return prev;
//     },
//     [checkboxStates],
//   );

//   return {
//     createAffiliate,
//     qrCodeData,
//     qrCodeUrl,
//     checkboxStates,
//     onCheckedChange,
//   };
// };

// const runValidation = (formData: FormData) => {
//   const validation = AffiliateSchema.safeParse({
//     name: formData.get("name") as string,
//     email: formData.get("email") as string,
//     phone: formData.get("phone") as string,
//   });
//   return validation;
// };

// export const generateQR = async (id: string, grp?: string, seed?: string) => {
//   const ident = moses(("b" + secureRef(8) + "d").toUpperCase());

//   try {
//     const response = await fetch(
//       `/api/generate-qr?id=${encodeURIComponent(id)}&grp=${encodeURIComponent(grp ?? "")}&seed=${encodeURIComponent(seed ?? "")}&iztp1nk=${encodeURIComponent(ident)}`,
//     );

//     if (!response.ok) {
//       throw new Error("Failed to generate QR code");
//     }

//     const data = (await response.json()) as {
//       qrUrl: string | null;
//       qrData: string | null;
//     };

//     return {
//       error: null,
//       qrUrl: data.qrUrl,
//       qrData: data.qrData,
//       ident,
//       id,
//     };
//   } catch (err) {
//     return {
//       error: err instanceof Error ? err.message : "An error occurred",
//       qrUrl: null,
//       qrData: null,
//     };
//   }
// };

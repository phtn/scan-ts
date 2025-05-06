// import { HyperList } from "@/ui/hyper-list";
// import { useActionState, useCallback, useMemo, useState } from "react";
// import { z } from "zod";
// import { type DeviceProfile } from "../_lib/utils";
// import toast from "react-hot-toast";
// import { FieldItem, IFieldItem } from "./input-field";
// import Inquiry from "@/app/inquiry";
// import { Icon, IconName } from "@/lib/icons";
// import { cn } from "@/lib/utils";
// import { FlexRow } from "@/ui/hyper-flex";
// import { IAffiliate } from "@/lib/firebase/add-affiliate";

// interface UserFormProps {
//   affiliateId: Record<string, keyof IAffiliate> | null;
//   device: DeviceProfile | null;
// }

// export default function UserForm({}: UserFormProps) {
//   const [, setError] = useState<string | null>(null);

//   const initialState = {
//     name: "",
//     tel: "",
//     email: "",
//   };

//   const handleSubmit = useCallback(
//     async (_: UserType | null, fd: FormData) => {
//       const validated = UserSchema.safeParse({
//         name: fd.get("name") as string,
//         tel: fd.get("tel") as string,
//         email: fd.get("email") as string,
//       });

//       if (validated.error) {
//         console.log(validated.error);
//         setError(validated.error.message);
//         return null;
//       }

//       // const promise = addNewData(gsec(), {
//       //   user: validated.data,
//       //   device,
//       //   affiliateId,
//       // });

//       // const result = await toast.promise(promise, {
//       //   loading: "Submitting",
//       //   success: "Sumitted Successfully!",
//       //   error: "Failed to submit.",
//       // });

//       // if (result === "success") {
//       //   setSubmitted(true);
//       // }

//       return validated.data;
//     },
//     [],
//   );

//   const [state, action, pending] = useActionState(handleSubmit, initialState);

//   const user_fields = useMemo(
//     () =>
//       [
//         {
//           id: "name",
//           name: "name",
//           label: "name",
//           value: state?.name,
//           required: true,
//         },
//         {
//           id: "tel",
//           name: "tel",
//           label: "phone",
//           value: state?.tel,
//         },
//         {
//           id: "email",
//           name: "email",
//           label: "email",
//           value: state?.email,
//         },
//       ] as IFieldItem[],
//     [state],
//   );

//   return (
//     <div className="bg-gradient-to-b from-gray-100 via-gray-400 to-gray-400 p-1.5 pb-0 rounded-[42px]">
//       <form action={action}>
//         <div className="pt-5 pb-3 px-3 border-gray-300 border space-y-4 bg-gray-100 rounded-b-3xl rounded-t-[38px]">
//           <h2 className="text-lg ps-2 font-semibold font-sans tracking-tight mb-4 text-hot-dark">
//             {submitted
//               ? "You're all set!"
//               : "Please enter your contact details."}
//           </h2>
//           {submitted ? (
//             <Checklist />
//           ) : (
//             <div>
//               <HyperList
//                 keyId="id"
//                 data={user_fields}
//                 container="space-y-4"
//                 component={FieldItem}
//               />
//               <Inquiry />
//             </div>
//           )}
//         </div>

//         <div className="h-20 flex items-end justify-between ps-3 pe-1 pb-2">
//           <div className="space-y-1">
//             <div className="text-xs px-0.5 font-sans text-white tracking-tight">
//               <span className="-ml-0.5 px-1.5 bg-hot-dark/20 py-0.5 s rounded-sm shadow-inner shadow-hot-dark/10">
//                 <span className="text-orange-300 mr-1">⏺</span>
//                 {submitted
//                   ? "Call and Chat is now available."
//                   : "Submit form to activate."}
//               </span>
//             </div>
//             <div
//               className={cn(
//                 "flex flex-row items-center justify-center",
//                 "h-10 gap-0 opacity-40 pointer-events-none",
//                 { "opacity-100 pointer-events-auto": submitted },
//               )}
//             >
//               <div className="h-9 rounded-bl-3xl border-y border-s border-hot-dark rounded-tl-md text-green-500 font-quick font-bold gap-x-1.5 ps-2 pe-2.5 bg-white flex items-center justify-center">
//                 <Icon name="phone" className="mt-0.5 select-none" />
//                 <a
//                   href="tel:+639275770777"
//                   className="text-[15px] drop-shadow-xs tracking-tight"
//                 >
//                   Call
//                 </a>
//               </div>
//               <div className="h-9 w-0.5 bg-gray-100 border-y border-hot-dark" />
//               <div className="h-9 rounded-lg rounded-e-full border-y border-e border-hot-dark text-blue-500 font-quick font-semibold gap-x-1.5 ps-2 pe-2.5 bg-white flex items-center justify-center">
//                 <Icon name="messenger" className="mt-0" />
//                 <a
//                   href="https://m.me/Bestdealinsuranceph"
//                   className="text-[15px] tracking-tight"
//                 >
//                   Chat
//                 </a>
//               </div>
//             </div>
//           </div>
//           <button
//             type="submit"
//             disabled={pending || submitted}
//             className="w-fit ps-8 border pe-10 h-12 text-[15px] font-semibold font-quick rounded-br-[38px] rounded-tr-lg rounded-tl-xl rounded-bl-xl text-white bg-hot-dark hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 border-gray-200 shadow-inner shadow-gray-400/80"
//           >
//             {pending ? "Submitting..." : "Submit"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// const UserSchema = z.object({
//   name: z.string().min(1).max(100),
//   tel: z.string().max(13).nullable(),
//   email: z.string().email().max(255).nullable(),
// });

// export type UserType = z.infer<typeof UserSchema>;

// const Checklist = () => {
//   const checklist = useMemo(
//     () =>
//       [
//         {
//           id: 0,
//           icon: "check-circle",
//           text: "We received your information.",
//           styles: "bg-green-100/60--text-green-600",
//         },
//         {
//           id: 1,
//           icon: "call-incoming",
//           text: "Expect a call from us shortly.",
//           styles: "bg-gray-100--text-gray-500",
//         },

//         {
//           id: 2,
//           icon: "book-open",
//           text: "Learn more about our services.",
//           styles: "bg-gray-100--text-gray-500",
//         },
//       ] as IChecklistItem[],
//     [],
//   );
//   return (
//     <HyperList
//       keyId="id"
//       data={checklist}
//       component={ChecklistItem}
//       container="space-y-2"
//     />
//   );
// };

// interface IChecklistItem {
//   id: number;
//   icon: IconName;
//   text: string;
//   styles: string;
// }

// const ChecklistItem = ({ icon, text, styles }: IChecklistItem) => {
//   return (
//     <div className="flex items-center justify-start text-hot-dark gap-x-3 border border-gray-400 p-3 bg-white rounded-xl">
//       <FlexRow
//         className={cn("size-9 rounded-full", styles.split("--").shift())}
//       >
//         <Icon name={icon} className={cn("size-5", styles.split("--").pop())} />
//       </FlexRow>
//       <span className="text-sm tracking-tight font-sans">{text}</span>
//     </div>
//   );
// };

import { IconName } from "@/lib/icons";
import { z } from "zod";
export type UserFieldName = "name" | "tel" | "email" | "inquiry";

export const InquiryFormSchema = z.object({
  name: z.string().min(1).max(100),
  tel: z.string().max(13),
  email: z.string().email().max(255),
  inquiry: z.string().min(1),
});
export type InquiryFormType = z.infer<typeof InquiryFormSchema>;

export type AffiliateFieldName = "name" | "phone" | "email" | "tags" | "grp";

export type FieldName =
  | "name"
  | "tel"
  | "email"
  | "inquiry"
  | "location"
  | "area"
  | "phone"
  | "active"
  | "tags"
  | "group"
  | "id";

// Define types for form values
type PersonalInfo = {
  name: FieldName;
  email: string;
  tel: string;
};

type InquiryTypeName = "car" | "pa" | "fire";

type InquiryInfo = {
  id: string;
  name: InquiryTypeName;
  label: string;
  value: InquiryTypeName;
  description: string;
};

// Complete form values type
export type FormValues = {
  personalInfo: PersonalInfo;
  inquiryInfo: InquiryInfo;
};

// Define option type for selects and checkbox groups
type FieldOption = {
  value: string;
  label: string;
  icon: IconName;
  description: string;
};

// Type for field validators
type FieldValidator = (value: string | number) => true | string;

// Define base field properties
export interface BaseFieldConfig {
  name: keyof InquiryFormType | keyof AffiliateFieldName;
  label?: string;
  required?: boolean;
  autoComplete?: string;
  validators?: Record<string, FieldValidator>;
  className?: string;
}

// Text field config
export interface TextFieldConfig extends BaseFieldConfig {
  type: "text" | "email" | "number" | "password" | "tel";
}

// Select field config
export interface SelectFieldConfig extends BaseFieldConfig {
  type: "select";
  options: FieldOption[];
  // onValueChange: (value: string) => void;
}

// CheckboxGroup field config
interface CheckboxGroupFieldConfig extends BaseFieldConfig {
  type: "checkbox-group";
  options: FieldOption[];
}

// Union type for all field types
export type FieldConfig =
  | TextFieldConfig
  | SelectFieldConfig
  | CheckboxGroupFieldConfig;

// Type for field groups
export interface FieldGroup {
  title: string;
  fields: FieldConfig[];
}

// Create the form hook with our types
// const useCustomForm = createFormHook({
//   defaultValues: {
//     personalInfo: {
//       firstName: "",
//       lastName: "",
//       email: "",
//       age: "",
//     },
//     professionalInfo: {
//       occupation: "",
//       experience: "0-1",
//       interests: [],
//     },
//   },
// });

// export default function TanStackFormWithTypes() {
//   // State to store form submission result
//   const [result, setResult] = useState<FormValues | null>(null);

//   // Initialize our form
//   const form = useCustomForm({
//     onSubmit: async ({ value }) => {
//       // Simulate API submission
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       setResult(value);
//     },
//   });

// Options for select fields
// const experienceOptions: FieldOption[] = [
//   { value: "0-1", label: "0-1 years" },
//   { value: "1-3", label: "1-3 years" },
//   { value: "3-5", label: "3-5 years" },
//   { value: "5+", label: "5+ years" },
// ];

// const interestOptions: FieldOption[] = [
//   { value: "frontend", label: "Frontend Development" },
//   { value: "backend", label: "Backend Development" },
//   { value: "fullstack", label: "Full Stack Development" },
//   { value: "devops", label: "DevOps" },
//   { value: "design", label: "UI/UX Design" },
// ];

// // Define our field groups for rendering
// const fieldGroups: FieldGroup[] = [
//   {
//     title: "Personal Information",
//     fields: [
//       {
//         name: "personalInfo.firstName",
//         label: "First Name",
//         type: "text",
//         validators: {
//           required: (value) => value.length > 0 || "First name is required",
//         },
//       },
//       {
//         name: "personalInfo.lastName",
//         label: "Last Name",
//         type: "text",
//         validators: {
//           required: (value) => value.length > 0 || "Last name is required",
//         },
//       },
//       {
//         name: "personalInfo.email",
//         label: "Email",
//         type: "email",
//         validators: {
//           required: (value) => value.length > 0 || "Email is required",
//           email: (value) =>
//             /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Invalid email format",
//         },
//       },
//       {
//         name: "personalInfo.age",
//         label: "Age",
//         type: "number",
//         validators: {
//           required: (value) => value.length > 0 || "Age is required",
//           number: (value) => !isNaN(Number(value)) || "Age must be a number",
//           min: (value) => Number(value) >= 18 || "You must be at least 18 years old",
//         },
//       },
//     ],
//   },
//   {
//     title: "Professional Information",
//     fields: [
//       {
//         name: "professionalInfo.occupation",
//         label: "Occupation",
//         type: "text",
//         validators: {
//           required: (value) => value.length > 0 || "Occupation is required",
//         },
//       },
//       {
//         name: "professionalInfo.experience",
//         label: "Experience Level",
//         type: "select",
//         options: experienceOptions,
//         validators: {
//           required: (value) => value.length > 0 || "Experience level is required",
//         },
//       },
//       {
//         name: "professionalInfo.interests",
//         label: "Areas of Interest",
//         type: "checkbox-group",
//         options: interestOptions,
//         validators: {
//           minLength: (value) => value.length > 0 || "Select at least one interest",
//         },
//       },
//     ],
//   },
// ];

// Function to render fields based on type
//   const renderField = (field: FieldConfig) => {
//     return (
//       <form.Field
//         key={field.name.toString()}
//         name={field.name.toString()}
//         validators={field.validators}
//       >
//         {(fieldApi) => {
//           const error = fieldApi.state.meta.touchedErrors;

//           // Determine what type of field to render
//           switch (field.type) {
//             case "select":
//               return (
//                 <div className="mb-4">
//                   <label htmlFor={field.name.toString()} className="block text-sm font-medium text-gray-700 mb-1">
//                     {field.label}
//                   </label>
//                   <select
//                     id={field.name.toString()}
//                     name={field.name.toString()}
//                     value={fieldApi.state.value}
//                     onChange={(e) => fieldApi.handleChange(e.target.value)}
//                     className="w-full p-2 border border-gray-300 rounded"
//                   >
//                     {field.options.map((option) => (
//                       <option key={option.value} value={option.value}>
//                         {option.label}
//                       </option>
//                     ))}
//                   </select>
//                   {error && <span className="text-red-500 text-sm">{error}</span>}
//                 </div>
//               );

//             case "checkbox-group":
//               return (
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     {field.label}
//                   </label>
//                   <div className="space-y-2">
//                     {field.options.map((option) => (
//                       <div key={option.value} className="flex items-center">
//                         <input
//                           id={`${field.name.toString()}-${option.value}`}
//                           type="checkbox"
//                           value={option.value}
//                           checked={fieldApi.state.value.includes(option.value)}
//                           onChange={(e) => {
//                             const newValue = [...fieldApi.state.value];
//                             if (e.target.checked) {
//                               newValue.push(option.value);
//                             } else {
//                               const index = newValue.indexOf(option.value);
//                               if (index !== -1) {
//                                 newValue.splice(index, 1);
//                               }
//                             }
//                             fieldApi.handleChange(newValue);
//                           }}
//                           className="h-4 w-4 text-blue-600 focus:ring-blue-500"
//                         />
//                         <label
//                           htmlFor={`${field.name.toString()}-${option.value}`}
//                           className="ml-2 text-sm text-gray-700"
//                         >
//                           {option.label}
//                         </label>
//                       </div>
//                     ))}
//                   </div>
//                   {error && <span className="text-red-500 text-sm">{error}</span>}
//                 </div>
//               );

//             default:
//               // Text, email, number, etc.
//               return (
//                 <div className="mb-4">
//                   <label htmlFor={field.name.toString()} className="block text-sm font-medium text-gray-700 mb-1">
//                     {field.label}
//                   </label>
//                   <input
//                     id={field.name.toString()}
//                     name={field.name.toString()}
//                     type={field.type}
//                     value={fieldApi.state.value}
//                     onChange={(e) => fieldApi.handleChange(e.target.value)}
//                     className="w-full p-2 border border-gray-300 rounded"
//                   />
//                   {error && <span className="text-red-500 text-sm">{error}</span>}
//                 </div>
//               );
//           }
//         }}
//       </form.Field>
//     );
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
//       <h1 className="text-xl font-bold mb-6">TanStack Form with TypeScript</h1>

//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           e.stopPropagation();
//           form.handleSubmit();
//         }}
//       >
//         {/* Render all field groups */}
//         {fieldGroups.map((group) => (
//           <div key={group.title} className="mb-6">
//             <h2 className="text-lg font-semibold mb-3">{group.title}</h2>
//             {group.fields.map((field) => renderField(field))}
//           </div>
//         ))}

//         {/* Submit button */}
//         <div className="pt-4">
//           <button
//             type="submit"
//             disabled={form.state.isSubmitting}
//             className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
//           >
//             {form.state.isSubmitting ? "Submitting..." : "Submit"}
//           </button>
//         </div>
//       </form>

//       {/* Display form result */}
//       {result && (
//         <div className="mt-6 p-4 border rounded bg-gray-50">
//           <h2 className="text-lg font-semibold mb-2">Form Submission Result:</h2>
//           <pre className="text-sm whitespace-pre-wrap">
//             {JSON.stringify(result, null, 2)}
//           </pre>
//         </div>
//       )}
//     </div>
//   );
// }

// // src/app/page.tsx
// import TanStackFormWithTypes from './components/TanStackFormWithTypes';

// export default function Home() {
//   return (
//     <main className="min-h-screen p-8 bg-gray-100">
//       <TanStackFormWithTypes />
//     </main>
//   );
// }

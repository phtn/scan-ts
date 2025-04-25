import { type AnyFieldApi } from "@tanstack/react-form";

export function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors.join(", ")}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}

interface SubmitButtonProps {
  pending: boolean;
  isSubmitted: boolean;
}

export const SubmitButton = ({ pending, isSubmitted }: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      disabled={pending || isSubmitted}
      className="w-32 border flex flex-row items-center justify-center pe-4 h-12 text-[15px] font-semibold font-quick rounded-br-[38px] rounded-tr-lg rounded-tl-xl rounded-bl-md text-white bg-hot-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:text-gray-400 disabled:border-gray-300/80 border-gray-300 shadow-inner shadow-gray-400/80"
    >
      {pending ? "Submitting" : "Submit"}
    </button>
  );
};

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
      className="w-32 border-[0.33px] cursor-pointer flex flex-row items-center justify-center h-12 text-[15px] font-semibold font-quick rounded-full text-white bg-panel dark:bg-hot-dark focus:outline-none focus:ring focus:ring-offset-0 focus:ring-orange-300 disabled:opacity-60 disabled:text-gray-400 disabled:border-gray-300/80 border-panel shadow-inner shadow-ultra-fade/15"
    >
      {pending ? "Submitting" : "Submit"}
    </button>
  );
};

import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
const { fieldContext, formContext } = createFormHookContexts();
import { InputField } from "./fields";
import { SubmitButton } from "./components";

export const { useAppForm } = createFormHook({
  fieldComponents: {
    InputField,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
});

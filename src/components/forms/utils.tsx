import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
const { fieldContext, formContext } = createFormHookContexts();
import { InputField } from "./fields";
import { SubmitButton } from "./components";
import { InquiryType } from "./fields/inquiry-type";

export const { useAppForm } = createFormHook({
  fieldComponents: {
    InputField,
    InquiryType,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
});

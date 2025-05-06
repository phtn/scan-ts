import { ReactNode, use, useActionState, useCallback, useMemo } from "react";
import { useAppForm } from "./utils";
import { AffiliateSchema, IAffiliate } from "@/lib/firebase/add-affiliate";
import { IField } from "./fields";
import { AffiliateFieldName } from "./schema";
import { HyperList } from "@/ui/hyper-list";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AffiliateConfig, AffiliateCtx } from "@/app/_ctx/affiliate";

interface AffiliateFormProps {
  children?: ReactNode;
}

export const AffiliateForm = ({ children }: AffiliateFormProps) => {
  const initialState = {
    name: "",
    phone: "",
    email: "",
    tags: "",
  } as IAffiliate;
  const form = useAppForm({
    defaultValues: initialState,
    validators: {
      onChange: AffiliateSchema,
    },
  });

  const { createAffiliate, affiliateConfigs } = use(AffiliateCtx)!;

  // Add state for checkbox configurations
  const [state, action, pending] = useActionState(
    createAffiliate,
    initialState,
  );
  const user_fields = useMemo(
    () =>
      [
        {
          id: "name",
          name: "name",
          label: "name",
          value: state?.name,
          required: true,
        },
        {
          id: "phone",
          name: "phone",
          label: "phone",
          value: state?.phone,
        },
        {
          id: "email",
          name: "email",
          label: "email",
          value: state?.email,
        },
        {
          id: "tags",
          name: "tags",
          label: "tags",
          value: state?.tags,
        },
      ] as IField<AffiliateFieldName>[],
    [state],
  );

  const FormField = useCallback(
    (props: IField<AffiliateFieldName>) => {
      return (
        <form.AppField name={props.name}>
          {(field) => (
            <field.InputField
              {...props}
              className="bg-super-fade dark:bg-neutral-600/60"
            />
          )}
        </form.AppField>
      );
    },
    [form],
  );

  const Submit = useCallback(
    () => (
      <form.AppForm>
        <form.SubmitButton
          title="Create"
          pending={pending}
          className="bg-ultra-fade border-none text-panel rounded-none flex-1 size-full dark:text-white text-sm dark:bg-zark font-sans tracking-tight font-medium"
        />
      </form.AppForm>
    ),
    [form, pending],
  );

  return (
    <div className="bg-gradient-to-b size-full dark:from-hot-dark/20 from-super-fade dark:via-hot-dark/40 dark:to-neutral-400/40 via-ultra-fade to-super-fade">
      <form action={action} className="flex flex-col justify-between">
        <div className="overflow-hidden h-full pt-5 relative bg-white border-t-[0.33px] dark:bg-zark border-gray-400/60 dark:border-hot-dark/40 px-4">
          <h2 className="ps-2 font-semibold h-8 lg:h-12 font-sans tracking-tight opacity-60">
            Create New Affiliate
          </h2>
          <div className="py-2">
            <HyperList
              keyId="id"
              data={user_fields}
              container="lg:space-y-5 space-y-2 grid grid-rows-2 gap-x-4 lg:grid-cols-3"
              component={FormField}
            />
            {children}
          </div>
        </div>
        <div className="flex flex-1 border-t-[0.33px] border-gray-400/60 dark:bg-zark dark:border-zinc-600 items-center justify-between">
          <CheckboxPanel data={affiliateConfigs} />
          <Submit />
        </div>
      </form>
    </div>
  );
};

interface CheckboxPanelProps {
  data: AffiliateConfig[];
}

const CheckboxPanel = ({ data }: CheckboxPanelProps) => {
  return (
    <HyperList
      delay={0.3}
      data={data}
      container="flex"
      component={ConfigItem}
    />
  );
};

const ConfigItem = ({
  id,
  label,
  value,
  description,
  onCheckedChange,
}: AffiliateConfig) => {
  return (
    <div className="relative border-r-[0.33px] border-gray-400 dark:border-zinc-600 tracking-tight flex w-full items-start lg:gap-7 bg-gray-300/30 font-sans dark:bg-zark lg:py-4 py-2 gap-2 lg:px-5 px-2 outline-none">
      <Checkbox
        id={`${id}-c`}
        checked={value}
        onCheckedChange={onCheckedChange(id)}
        className="order-1 after:absolute after:inset-0"
        aria-describedby={`${id}-description`}
      />

      <div className="flex grow items-center lg:gap-3">
        <div className="grid lg:gap-2">
          <Label
            htmlFor={id}
            className="max-w-[8ch] lg:max-w-full text-xs lg:text-[16px]"
          >
            {label}
          </Label>
          <p
            id={`${id}-description`}
            className="text-xs lg:flex hidden opacity-60"
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

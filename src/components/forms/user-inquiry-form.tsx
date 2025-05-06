import { HyperList } from "@/ui/hyper-list";
import { useActionState, useCallback, useMemo } from "react";
import { useAppForm } from "./utils";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "@/lib/icons";
import type { InquiryFormType, FieldGroup, FieldConfig } from "./schema";
import { InquiryFormSchema } from "./schema";
import { useInquiry } from "./hooks/use-inquiry";
import { opts } from "@/utils/helpers";
import { FlexRow } from "@/ui/hyper-flex";
import type { Device, AffiliateId } from "@/app/types";

interface InquiryFormProps {
  affiliateId: AffiliateId;
  device: Device;
}

export const UserInquiryForm = ({ affiliateId, device }: InquiryFormProps) => {
  const initialState = {
    name: "",
    tel: "",
    email: "",
    inquiry: "car",
  } as InquiryFormType;
  const form = useAppForm({
    defaultValues: initialState,
    validators: {
      onChange: InquiryFormSchema,
    },
  });

  const { isSubmitted, handleSubmit } = useInquiry(affiliateId, device);

  const [state, action, pending] = useActionState(handleSubmit, initialState);

  const fieldGroups = useMemo(
    () =>
      [
        {
          title: "PersonalInfo",
          fields: [
            {
              id: "name",
              name: "name",
              label: "name",
              value: state?.name,
              required: true,
              type: "text",
            },
            {
              id: "tel",
              name: "tel",
              label: "phone",
              value: state?.tel,
              type: "tel",
            },
            {
              id: "email",
              name: "email",
              label: "email",
              value: state?.email,
              type: "email",
              validators: {
                required: true,
                email: true,
              },
            },
          ],
        },
        {
          title: "Inquiry",
          fields: [
            {
              name: "inquiry",
              label: "inquiry",
              type: "select",
              options: [
                {
                  icon: "sports-car",
                  value: "car",
                  label: "Car Insurance",
                  description: "CTPL & Comprehensive",
                },
                {
                  icon: "injured",
                  value: "pa",
                  label: "Personal Accident",
                  description: "Individual & Family",
                },
                {
                  icon: "fire-extinguisher",
                  value: "fire",
                  label: "Fire Insurance",
                  description: "Residential & Commercial",
                },
              ],

              required: true,
            },
          ],
        },
      ] as FieldGroup[],
    [state],
  );

  const renderField = useCallback(
    (field: FieldConfig) => {
      return (
        <form.AppField
          key={field.name.toString()}
          name={field.name as keyof InquiryFormType}
          validators={field.validators}
        >
          {(fieldApi) => {
            const error = fieldApi.state.meta.errors;

            // Determine what type of field to render
            switch (field.type) {
              case "select":
                return (
                  <fieldApi.InquiryType
                    {...fieldApi}
                    name={field.name}
                    // onValueChange={setInquiryType}
                    options={field.options}
                    type={field.type}
                  />
                );

              case "checkbox-group":
                return (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                    </label>
                    <div className="space-y-2">
                      {field.options.map((option) => (
                        <div key={option.value} className="flex items-center">
                          <input
                            id={`${field.name.toString()}-${option.value}`}
                            type="checkbox"
                            value={option.value}
                            checked={fieldApi.state.value?.includes(
                              option.value,
                            )}
                            onChange={(e) => {
                              const newValue = [
                                ...(fieldApi.state.value ?? []),
                              ];
                              if (e.target.checked) {
                                newValue.push(option.value);
                              } else {
                                const index = newValue.indexOf(option.value);
                                if (index !== -1) {
                                  newValue.splice(index, 1);
                                }
                              }
                              fieldApi.handleChange((v) => v);
                            }}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                          />
                          <label
                            htmlFor={`${field.name.toString()}-${option.value}`}
                            className="ml-2 text-sm text-gray-700"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                    {error && (
                      <span className="text-red-500 text-sm">
                        {error[0]?.message}
                      </span>
                    )}
                  </div>
                );

              default:
                // Text, email, number, etc.
                return (
                  <fieldApi.InputField
                    {...fieldApi}
                    label={field.label}
                    required={field.required}
                    autoComplete={field.autoComplete}
                    type={field.type}
                  />
                );
            }
          }}
        </form.AppField>
      );
    },
    [form],
  );

  const Submit = useCallback(
    () => (
      <form.AppForm>
        <form.SubmitButton pending={pending} isSubmitted={isSubmitted} />
      </form.AppForm>
    ),
    [form, isSubmitted, pending],
  );

  const FormOptions = useCallback(() => {
    const options = opts(
      <Checklist />,
      <div className="space-y-4">
        {fieldGroups.map((group, index) => (
          <HyperList
            key={index}
            data={group.fields}
            container="space-y-4"
            component={renderField}
          />
        ))}
      </div>,
    );
    return <>{options.get(isSubmitted)}</>;
  }, [isSubmitted, fieldGroups, renderField]);

  return (
    <div className="bg-gradient-to-b dark:from-neutral-400 from-gray-300 dark:via-neutral-500 dark:to-neutral-400 via-gray-200 to-gray-400 p-1.5 pb-0 rounded-[42px]">
      <form action={action}>
        <div className="bg-gradient-to-b from-white dark:from-gray-300 dark:via-gray-300 dark:to-gray-300 via-white/80 to-white dark:border-neutral-500 border-gray-300 overflow-hidden border-t border-x space-y-4 rounded-b-[20px] rounded-t-[38px]">
          <div className="pt-5 pb-3.5 px-3 bg-gradient-to-br from-white to-white dark:from-panel dark:via-hot-dark dark:to-gray-600">
            <h2 className="ps-2 h-12 font-medium font-sans tracking-tight opacity-80">
              {isSubmitted
                ? "You're all set!"
                : "Please enter your contact details."}
            </h2>
            <FormOptions />
          </div>
        </div>
        <div className="h-24 flex items-end justify-between ps-4 pe-3 pb-4">
          <CommsPanel isSubmitted={isSubmitted} />
          <Submit />
        </div>
      </form>
    </div>
  );
};

interface CommsPanelProps {
  isSubmitted: boolean;
}

const CommsPanel = ({ isSubmitted }: CommsPanelProps) => {
  const data = useMemo(
    () =>
      [
        {
          id: 1,
          icon: "phone",
          href: "tel:+639275770777",
          title: "Call",
          styles: `border border-e-[0.33px] rounded-s-full ${isSubmitted ? "text-green-500" : "text-gray-400"}**mt-0.5`,
        },
        {
          id: 2,
          icon: "messenger",
          href: "https://m.me/Bestdealinsuranceph",
          title: "Chat",
          styles: `rounded-lg rounded-e-full border-y border-e ${isSubmitted ? "text-blue-500" : "text-gray-400"}**mt-0`,
        },
      ] as ICommItem[],
    [isSubmitted],
  );

  const PanelHeader = useCallback(() => {
    const options = opts(
      <>
        <div className="size-2 rounded-full bg-green-400 border-gray-600 border-[0.33px]"></div>
        {/* <span className="text-[1rem] text-green-500 leading-none">●</span> */}
        <span className="ml-1 text-white drop-shadow-sm shadow-panel">
          Call and Chat is available
        </span>
      </>,

      <>
        <span className="text-[1.25rem] pb-1 text-orange-300 leading-none">
          ●
        </span>
        <span className="ml-1.5 dark:text-white leading-none">
          Submit form to activate
        </span>
      </>,
    );
    return (
      <div className="text-xs font-sans tracking-tight">
        <div
          className={cn(
            "bg-hot-dark/0 px-1 py-0.5 s flex items-center rounded-full shadow-inner shadow-hot-dark/10",
            { "bg-ultra-fade/0": isSubmitted },
          )}
        >
          {options.get(isSubmitted)}
        </div>
      </div>
    );
  }, [isSubmitted]);
  return (
    <div className="space-y-0.5">
      <PanelHeader />
      <HyperList
        keyId="id"
        direction="left"
        data={data}
        component={CommItem}
        container="flex flex-row items-end justify-start h-10 p-0"
        itemStyle={cn("pointer-events-none opacity-20 p-0", {
          "pointer-events-auto opacity-100": isSubmitted,
        })}
      />
    </div>
  );
};

interface ICommItem {
  id: number;
  icon: IconName;
  title: string;
  href: string;
  styles: string;
  description?: string;
}
const CommItem = ({ icon, title, href, styles }: ICommItem) => (
  <div
    className={cn(
      "bg-ultra-fade dark:bg-neutral-200 flex items-center justify-center",
      "h-9 gap-x-2 ps-2.5 border-neutral-500/70 pe-3.5 font-quick font-semibold select-none",
      styles.split("**").shift(),
    )}
  >
    <Icon name={icon} className={cn("size-5", styles.split("**").pop())} />
    <a href={href} className="text-sm text-panel drop-shadow-xs tracking-tight">
      {title}
    </a>
  </div>
);

const Checklist = () => {
  const checklist = useMemo(
    () =>
      [
        {
          id: 0,
          icon: "check-circle",
          text: "We received your information.",
          styles: "bg-green-100/50 dark:bg-green-100 ** text-panel",
        },
        {
          id: 1,
          icon: "call-incoming",
          text: "Expect a call from us shortly.",
          styles: "bg-rose-100/50 dark:bg-rose-100 ** text-panel",
        },

        {
          id: 2,
          icon: "book-open",
          text: "Learn more about our services.",
          styles: "bg-indigo-100/50 dark:bg-indigo-100 ** text-panel",
        },
      ] as IChecklistItem[],
    [],
  );
  return (
    <HyperList
      keyId="id"
      data={checklist}
      component={ChecklistItem}
      container="space-y-3 pb-1"
    />
  );
};

interface IChecklistItem {
  id: number;
  icon: IconName;
  text: string;
  styles: string;
}

const ChecklistItem = ({ icon, text, styles }: IChecklistItem) => {
  return (
    <div className="flex items-center justify-start text-panel gap-x-3 bg-ultra-fade/80 dark:bg-neutral-200/30 dark:text-ultra-fade p-3 rounded-xl">
      <FlexRow
        className={cn("size-9 rounded-full", styles.split("**").shift())}
      >
        <Icon name={icon} className={cn("size-5", styles.split("**").pop())} />
      </FlexRow>
      <span className="text-sm tracking-tight font-sans">{text}</span>
    </div>
  );
};
export type affiliateIdFieldName = "sid" | "location" | "area";

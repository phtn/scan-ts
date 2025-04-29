import { HyperList } from "@/ui/hyper-list";
import { type ReactNode, useActionState, useCallback, useMemo } from "react";
import { useAppForm } from ".";
import { IField } from "./fields";
import { cn } from "@/lib/utils";
import { Icon } from "@/lib/icons";
import { UserFieldName, UserInfoSchema } from "./schema";
import { useUserForm } from "./hooks/use-userform";
import { opts } from "@/utils/helpers";
import { FlexRow } from "@/ui/hyper-flex";
import type { Device, Station } from "@/app/types";
import { IconName } from "@/lib/icons/types";

interface UserInfoFormProps {
  children: ReactNode;
  station: Station;
  device: Device;
}

export const UserInfoForm = ({
  children,
  station,
  device,
}: UserInfoFormProps) => {
  const initialState = {
    name: "",
    tel: "",
    email: "",
  };
  const form = useAppForm({
    defaultValues: initialState,
    validators: {
      onChange: UserInfoSchema,
    },
  });

  const { isSubmitted, handleSubmit } = useUserForm(station, device);

  const [state, action, pending] = useActionState(handleSubmit, initialState);
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
          id: "tel",
          name: "tel",
          label: "phone",
          value: state?.tel,
        },
        {
          id: "email",
          name: "email",
          label: "email",
          value: state?.email,
        },
      ] as IField<UserFieldName>[],
    [state],
  );

  const FormField = useCallback(
    (props: IField<UserFieldName>) => {
      return (
        <form.AppField name={props.name}>
          {(field) => <field.InputField {...props} />}
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
        <HyperList
          keyId="id"
          data={user_fields}
          container="space-y-4"
          component={FormField}
        />
        {children}
      </div>,
    );
    return <>{options.get(isSubmitted)}</>;
  }, [isSubmitted, FormField, children, user_fields]);

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
        <span className="text-[1rem] text-green-500 leading-none">●</span>
        <span className="ml-1.5 text-white">Call and Chat is available</span>
      </>,

      <>
        <span className="text-[1rem] text-orange-300 leading-none">●</span>
        <span className="ml-1.5 text-white">Submit form to activate</span>
      </>,
    );
    return (
      <div className="text-xs font-sans text-white tracking-tight">
        <div
          className={cn(
            "bg-hot-dark/0 py-0.5 s rounded-full shadow-inner shadow-hot-dark/10",
            { "bg-hot-dark": isSubmitted },
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
      "bg-ultra-fade dark:bg-neutral-300 flex items-center justify-center",
      "h-9 gap-x-2 ps-2 border-gray-500/90 pe-3 font-quick font-semibold select-none",
      styles.split("**").shift(),
    )}
  >
    <Icon name={icon} className={cn("size-5", styles.split("**").pop())} />
    <a href={href} className="text-sm drop-shadow-xs tracking-tight">
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
          styles: "bg-green-100/50 ** text-green-800",
        },
        {
          id: 1,
          icon: "call-incoming",
          text: "Expect a call from us shortly.",
          styles: "bg-rose-100/50 ** text-rose-800",
        },

        {
          id: 2,
          icon: "book-open",
          text: "Learn more about our services.",
          styles: "bg-indigo-100/50 ** text-indigo-800",
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
    <div className="flex items-center justify-start text-hot-dark gap-x-3 border-[0.33px] border-gray-400 p-3 bg-white rounded-xl">
      <FlexRow
        className={cn("size-9 rounded-full", styles.split("**").shift())}
      >
        <Icon name={icon} className={cn("size-5", styles.split("**").pop())} />
      </FlexRow>
      <span className="text-sm tracking-tight font-sans">{text}</span>
    </div>
  );
};
export type StationFieldName = "sid" | "location" | "area";

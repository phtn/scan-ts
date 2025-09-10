"use client";

import { useAppForm } from "@/components/forms/utils";
import { settingsForm } from "./schema";
import { use, useCallback, useMemo } from "react";
import { CommsFieldName, TextFieldConfig } from "@/components/forms/schema";
import { HyperList } from "@/ui/hyper-list";
import { MicroSwitch } from "../../_components/ui/switch";
import { Icon } from "@/lib/icons";
import { SettingsCtx } from "@/app/_ctx/settings";

export const Content = () => {
  const { appSettings } = use(SettingsCtx)!;

  const form = useAppForm(settingsForm);

  const comms = useMemo(
    () => [
      {
        title: "Comms",
        fields: [
          {
            name: "phone",
            label: "phone number",
            type: "tel",
            value: appSettings?.comms.phone.value ?? "",
          },
          {
            name: "messenger",
            label: "messenger id",
            type: "text",
            value: appSettings?.comms.messenger.value ?? "",
          },
        ],
      },
    ],
    [appSettings],
  );

  const FieldItem = useCallback(
    ({ name, label, type }: TextFieldConfig) => (
      <form.AppField name={name as CommsFieldName}>
        {(field) => (
          <div className="grid grid-cols-6 gap-2">
            <div className="col-span-2 flex flex-col font-quick justify-between py-1">
              <div className="text-sm capitalize tracking-tighter items-center lg:gap-2.5 gap-2 flex">
                <span className="font-bold">{label?.split(" ").shift()}</span>
                <button className="cursor-pointer">
                  <Icon
                    name="pen-square"
                    className="size-4 select-none text-slate-500 dark:text-neutral-300"
                    aria-label="edit"
                  />
                </button>
              </div>
              <div className="text-xs font-dm gap-8 w-fit flex px-2 py-1 bg-ultra-fade border-[0.33px] border-neutral-300 dark:border-zinc-600 dark:bg-zinc-900 items-center rounded-lg">
                <span className="opacity-70 tracking-tighter select-none">
                  Enabled
                </span>
                <MicroSwitch className="" />
              </div>
            </div>
            <div className="col-span-4">
              <field.InputField
                name={name as keyof CommsFieldName}
                type={type}
                label={label}
              />
            </div>
          </div>
        )}
      </form.AppField>
    ),
    [form],
  );

  return (
    <main className="h-screen w-full bg-ultra-fade rounded-xl dark:bg-zark">
      <div className="p-6 text-2xl font-sans font-medium tracking-tighter">
        App Settings
      </div>
      <div className="flex items-start justify-start">
        <div className="px-4 font-sans font-medium">
          <div className="p-4 space-y-4 rounded-xl border-none border-slate-400/0 size-full bg-slate-200 dark:bg-zinc-900">
            <div className="font-sans font-medium text-xl tracking-tight">
              Open Communications
            </div>
            {/* <div className="h-px px-4 my-4 bg-slate-400 dark:bg-zark"></div> */}
            <HyperList
              data={comms[0].fields as TextFieldConfig[]}
              component={FieldItem}
              container="space-y-8 py-4"
              itemStyle="rounded-lg p-6 dark:bg-neutral-700 border-none bg-white border-neutral-400 dark:border-zinc-400/80"
            />
          </div>
        </div>
        <div className="p-6 font-quick font-medium"></div>
      </div>
    </main>
  );
};

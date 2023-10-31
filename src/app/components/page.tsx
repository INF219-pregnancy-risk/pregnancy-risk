"use client";
import SurveyButton from "@/components/inputs/buttons/SurveyButton";
import React from "react";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import Check from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const ComponentsPage = () => {
  const [state, setState] = React.useState({
    checked: false,
    loading: false,
    disabled: false,
    buttonText: "TestBtn",
    card: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Accusamus aspernatur beatae, mollitia laborum dignissimos
    incidunt maiores quae, provident, eaque quia dolor iste
    perferendis doloremque reiciendis! Maiores quaerat illo quos
    in.`,
  } as any);

  return (
    <>
      <section className="grid-layout gap-6 light bg-background text-foreground py-8">
        <h1 className="text-4xl font-bold">LightMode</h1>
        <h2 className="text-2xl font-bold">Control Panel</h2>
        <div className="bg-card text-card-foreground p-4 rounded-xl gap-2 flex flex-col">
          <section className="border-2 p-2 rounded-lg flex flex-col gap-4  flex-wrap">
            <h2 className="font-bold">Buttons</h2>
            <h3>States</h3>
            <div className="flex gap-4 flex-wrap">
              {["checked", "loading", "disabled"].map((c) => {
                return (
                  <SurveyButton
                    size={"lg"}
                    key={c}
                    className="capitalize"
                    variant={"outline"}
                    onClick={() => setState((s: any) => ({ ...s, [c]: !s[c] }))}
                    icon={
                      state[c] ? (
                        <Check className="text-success" />
                      ) : (
                        <CloseIcon className="text-disabled" />
                      )
                    }
                  >
                    {c}
                  </SurveyButton>
                );
              })}
            </div>
            <h3>Text</h3>

            <input
              type="text"
              className="border-2 rounded-lg p-2 w-full bg-input ring-2 ring-ring"
              value={state.buttonText}
              maxLength={10}
              onChange={(e) =>
                setState((s: any) => ({ ...s, buttonText: e.target.value }))
              }
            />
          </section>
          <section className="border-2 p-2 rounded-lg flex flex-col gap-4 flex-wrap">
            <h2 className="font-bold">Cards</h2>
            <textarea
              name="cardtext"
              id="card"
              className="resize-none p-4 h-48 rounded-md bg-input ring-2 ring-ring"
              value={state.card}
              onChange={(e) =>
                setState((s: any) => ({ ...s, card: e.target.value }))
              }
            />
          </section>
        </div>
        <h1 className="text-2xl font-bold">Colors</h1>
        <section className="flex items-center justify-center gap-2">
          <div className="bg-background text-foreground w-8 h-8 border-2 border-black rounded-full hover:bg-background/50 hover:text-foreground/50" />
          <div className="bg-card text-card-foreground w-8 h-8 border-2 border-black rounded-full hover:bg-card/90 hover:text-card-foreground/90" />
          <div className="bg-popover text-popover-foreground w-8 h-8 border-2 border-black rounded-full hover:bg-popover/90 hover:text-popover-foreground/90" />
          <div className="bg-primary text-primary-foreground w-8 h-8 border-2 border-black rounded-full hover:bg-primary/90 hover:text-primary-foreground/90" />
          <div className="bg-secondary text-secondary-foreground w-8 h-8 border-2 border-black rounded-full hover:bg-secondary/90 hover:text-secondary-foreground/90" />
          <div className="bg-accent text-accent-foreground w-8 h-8 border-2 border-black rounded-full hover:bg-accent/90 hover:text-accent-foreground/90" />
          <div className="bg-success text-success-foreground w-8 h-8 border-2 border-black rounded-full hover:bg-success/90 hover:text-success-foreground/90" />
          <div className="bg-warning text-warning-foreground w-8 h-8 border-2 border-black rounded-full hover:bg-warning/90 hover:text-warning-foreground/90" />
          <div className="bg-info text-info-foreground w-8 h-8 border-2 border-black rounded-full hover:bg-info/90 hover:text-info-foreground/90" />
          <div className="bg-disabled text-disabled-foreground w-8 h-8 border-2 border-black rounded-full" />
          <div className="bg-cancel text-cancel-foreground w-8 h-8 border-2 border-black rounded-full hover:bg-cancel/90 hover:text-cancel-foreground/90" />
          <div className="bg-muted text-muted-foreground w-8 h-8 border-2 border-black rounded-full hover:bg-muted/90 hover:text-muted-foreground/90" />
          <div className="bg-destructive text-destructive-foreground w-8 h-8 border-2 border-black rounded-full hover:bg-destructive/90 hover:text-destructive-foreground/90" />
        </section>
        <div className="flex flex-col flex-wrap">
          {[
            "primary",
            "secondary",
            "accent",
            "success",
            "warning",
            "destructive",
            "info",
            "disabled",
            "cancel",
            "muted",
          ].map((c) => {
            const className = `bg-${c} text-${c}-foreground hover:bg-${c}/90 hover:text-${c}-foreground/90`;
            const variant = {
              loading: state.loading,
              checked: state.checked,
              disabled: state.disabled,
              className,
            };

            return (
              <div
                className="flex gap-8 my-2 border-b justify-center flex-wrap"
                key={c}
              >
                <h1 className="w-20 justify-end items-center capitalize flex">
                  {c}
                </h1>
                <SurveyButton
                  size={"icon"}
                  {...variant}
                  icon={<GppMaybeIcon />}
                />
                <SurveyButton size={"sm"} {...variant}>
                  {state.buttonText} - sm
                </SurveyButton>
                <SurveyButton {...variant} icon={<GppMaybeIcon />}>
                  {state.buttonText}
                </SurveyButton>
                <SurveyButton size={"lg"} {...variant}>
                  {state.buttonText} - lg
                </SurveyButton>
              </div>
            );
          })}
        </div>
        <section className="flex justify-between px-6 relative flex-wrap">
          {["popover", "card", "muted"].map((c) => {
            return (
              <div
                className={`w-[30%] bg-${c} text-${c}-foreground border-2 rounded-lg p-4`}
                key={c}
              >
                <h1 className="capitalize text-xl font-bold">{c}</h1>
                <p className="whitespace-pre-line">{state.card}</p>
              </div>
            );
          })}
        </section>
      </section>
      <section className="grid-layout gap-6 dark bg-background text-foreground py-8 rounded-lg">
        <h1 className="text-4xl font-bold">Darkmode</h1>
        <h2 className="text-2xl font-bold">Colors</h2>
        <section className="flex items-center justify-center gap-2">
          <div className="bg-background text-foreground w-8 h-8 border-2 border-black rounded-full hover:bg-background/50 hover:text-foreground/50" />
          <div className="bg-card text-card-foreground w-8 h-8 border-2 border-black rounded-full hover:bg-card/90 hover:text-card-foreground/90" />
          <div className="bg-popover text-popover-foreground w-8 h-8 border-2 border-black rounded-full hover:bg-popover/90 hover:text-popover-foreground/90" />
          <div className="bg-primary text-primary-foreground w-8 h-8 border-2 border-black rounded-full hover:bg-primary/90 hover:text-primary-foreground/90" />
          <div className="bg-secondary text-secondary-foreground w-8 h-8 border-2 border-black rounded-full hover:bg-secondary/90 hover:text-secondary-foreground/90" />
          <div className="bg-accent text-accent-foreground w-8 h-8 border-2 border-black rounded-full hover:bg-accent/90 hover:text-accent-foreground/90" />
          <div className="bg-success text-success-foreground w-8 h-8 border-2 border-black rounded-full hover:bg-success/90 hover:text-success-foreground/90" />
          <div className="bg-warning text-warning-foreground w-8 h-8 border-2 border-black rounded-full hover:bg-warning/90 hover:text-warning-foreground/90" />
          <div className="bg-info text-info-foreground w-8 h-8 border-2 border-black rounded-full hover:bg-info/90 hover:text-info-foreground/90" />
          <div className="bg-disabled text-disabled-foreground w-8 h-8 border-2 border-black rounded-full" />
          <div className="bg-cancel text-cancel-foreground w-8 h-8 border-2 border-black rounded-full hover:bg-cancel/90 hover:text-cancel-foreground/90" />
          <div className="bg-muted text-muted-foreground w-8 h-8 border-2 border-black rounded-full hover:bg-muted/90 hover:text-muted-foreground/90" />
          <div className="bg-destructive text-destructive-foreground w-8 h-8 border-2 border-black rounded-full hover:bg-destructive/90 hover:text-destructive-foreground/90" />
        </section>
        <section>
          <h2 className="text-xl font-bold mb-4">Input</h2>
          <input
            type="text"
            readOnly
            value={"Test input"}
            className="rounded-md bg-input p-2"
          />
        </section>
        <div className="flex flex-col flex-wrap">
          {[
            "primary",
            "secondary",
            "accent",
            "success",
            "warning",
            "destructive",
            "info",
            "disabled",
            "cancel",
            "muted",
          ].map((c) => {
            const className = `bg-${c} text-${c}-foreground hover:bg-${c}/90`;
            const variant = {
              loading: state.loading,
              checked: state.checked,
              disabled: state.disabled,
              className,
            };

            return (
              <div
                className="flex gap-8 my-2 border-b justify-center flex-wrap"
                key={c}
              >
                <h1 className="w-20 justify-end items-center capitalize flex">
                  {c}
                </h1>
                <SurveyButton
                  size={"icon"}
                  {...variant}
                  icon={<GppMaybeIcon />}
                />
                <SurveyButton size={"sm"} {...variant}>
                  {state.buttonText} - sm
                </SurveyButton>
                <SurveyButton {...variant} icon={<GppMaybeIcon />}>
                  {state.buttonText}
                </SurveyButton>
                <SurveyButton size={"lg"} {...variant}>
                  {state.buttonText} - lg
                </SurveyButton>
              </div>
            );
          })}
        </div>
        <section className="flex justify-between px-6 relative flex-wrap">
          {["popover", "card", "muted"].map((c) => {
            return (
              <div
                className={`w-[30%] bg-${c} text-${c}-foreground border-2 rounded-lg p-4`}
                key={c}
              >
                <h1 className="capitalize text-xl font-bold">{c}</h1>
                <p className="whitespace-pre-line">{state.card}</p>
              </div>
            );
          })}
        </section>
      </section>
      <section className="grid-layout w-full py-8 gap-4">
        <h1 className="text-4xl font-bold">Grid layout</h1>
        <div className="w-full bg-card text-card-foreground border-2 items-center justify-center flex span-left rounded-md h-12">
          This is only left
        </div>
        <div className="w-full bg-card text-card-foreground border-2 items-center justify-center flex rounded-md h-12">
          This is normal span
        </div>
        <div className="w-full bg-card text-card-foreground border-2 items-center justify-center flex span-right rounded-md h-12">
          This is only right
        </div>
        <div className="w-full bg-card text-card-foreground border-2 items-center justify-center flex span-full rounded-md h-12">
          This span the whole width
        </div>
      </section>
    </>
  );
};

export default ComponentsPage;

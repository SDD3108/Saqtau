"use client";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/src/utils/cn";
// State changes only in user event handlers; no focus registration effects.
const TabsContext = React.createContext(null);
function useTabs() {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error("Tabs components must be inside Tabs");
  return context;
}
function Tabs({ className, orientation = "horizontal", dir = "ltr",
  value, defaultValue, onValueChange, children, ...props }) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const id = React.useId();
  const selected = value === undefined ? internalValue : value;
  function select(nextValue) {
    if (nextValue === selected) return;
    if (value === undefined) setInternalValue(nextValue);
    onValueChange?.(nextValue);
  }
  return (
    <TabsContext.Provider value={{ id, selected, select, orientation, dir }}>
      <div {...props} dir={dir} data-slot="tabs" data-orientation={orientation}
        className={cn("group/tabs flex gap-2 data-[orientation=horizontal]:flex-col", className)}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}
const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-[orientation=horizontal]/tabs:h-9 group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col data-[variant=line]:rounded-none",
  {
    variants: {
      variant: {
        default: "bg-muted",
        line: "gap-1 bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
function TabsList({ className, variant = "default", onKeyDown, ...props }) {
  const { orientation, dir } = useTabs();
  function handleKeyDown(event) {
    onKeyDown?.(event);
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
    const items = Array.from(event.currentTarget.querySelectorAll('[role="tab"]'))
      .filter((item) => !item.disabled && item.closest('[role="tablist"]') === event.currentTarget);
    const index = items.indexOf(event.target);
    if (index < 0 || !items.length) return;
    const next = orientation === "vertical" ? "ArrowDown" : dir === "rtl" ? "ArrowLeft" : "ArrowRight";
    const previous = orientation === "vertical" ? "ArrowUp" : dir === "rtl" ? "ArrowRight" : "ArrowLeft";
    let target;
    if (event.key === "Home") target = 0;
    else if (event.key === "End") target = items.length - 1;
    else if (event.key === next) target = (index + 1) % items.length;
    else if (event.key === previous) target = (index - 1 + items.length) % items.length;
    else return;
    event.preventDefault();
    items[target].focus();
  }
  return (
    <div {...props} role="tablist" aria-orientation={orientation}
      data-orientation={orientation} data-slot="tabs-list" data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)} onKeyDown={handleKeyDown} />
  );
}
function TabsTrigger({ className, value, disabled, onClick, onFocus, ...props }) {
  const { id, selected, select, orientation } = useTabs();
  const active = selected === value;
  return (
    <button
      {...props}
      type="button"
      role="tab"
      id={`${id}-tab-${value}`}
      aria-controls={`${id}-panel-${value}`}
      aria-selected={active}
      disabled={disabled}
      tabIndex={active ? 0 : -1}
      data-state={active ? "active" : "inactive"}
      data-orientation={orientation}
      onClick={(event) => { onClick?.(event); if (!event.defaultPrevented && !disabled) select(value); }}
      onFocus={(event) => { onFocus?.(event); if (!event.defaultPrevented && !disabled) select(value); }}
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 group-data-[variant=default]/tabs-list:data-[state=active]:shadow-sm group-data-[variant=line]/tabs-list:data-[state=active]:shadow-none dark:text-muted-foreground dark:hover:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:border-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent",
        "data-[state=active]:bg-background data-[state=active]:text-foreground dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 dark:data-[state=active]:text-foreground",
        "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:bottom-[-5px] group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-[state=active]:after:opacity-100",
        className,
      )}
    />
  );
}
function TabsContent({ className, value, children, ...props }) {
  const { id, selected, orientation } = useTabs();
  const active = selected === value;
  return (
    <div {...props} role="tabpanel" id={`${id}-panel-${value}`}
      aria-labelledby={`${id}-tab-${value}`} tabIndex={0} hidden={!active}
      data-state={active ? "active" : "inactive"} data-orientation={orientation}
      data-slot="tabs-content" className={cn("flex-1 outline-none", className)}>
      {active ? children : null}
    </div>
  );
}
export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants };

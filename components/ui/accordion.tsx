"use client";

import { useState, createContext, useContext } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionContextProps {
  openItem: string | null;
  type?: "single" | "multiple";
  openItems: string[];
  toggleItem: (id: string) => void;
}

const AccordionContext = createContext<AccordionContextProps | null>(null);
const AccordionItemContext = createContext<{ value: string } | null>(null);

export function Accordion({
  children,
  type = "single",
  collapsible = false, // Added collapsible support
  defaultValue,
  className
}: {
  children: React.ReactNode;
  type?: "single" | "multiple";
  collapsible?: boolean;
  defaultValue?: string | string[];
  className?: string;
}) {
  const [openItem, setOpenItem] = useState<string | null>(
    typeof defaultValue === "string" ? defaultValue : null
  );

  const [openItems, setOpenItems] = useState<string[]>(
    Array.isArray(defaultValue) ? defaultValue : []
  );

  const toggleItem = (id: string) => {
    if (type === "single") {
      if (collapsible) {
        setOpenItem(openItem === id ? null : id);
      } else {
        setOpenItem(id);
      }
    } else {
      setOpenItems(prev => 
        prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
      );
    }
  };

  return (
    <AccordionContext.Provider value={{ openItem, type, openItems, toggleItem }}>
      <div className={className}>{children}</div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <AccordionItemContext.Provider value={{ value }}>
      <div className={cn("border-b", className)}>{children}</div>
    </AccordionItemContext.Provider>
  );
}

export function AccordionTrigger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ctx = useContext(AccordionContext);
  const itemCtx = useContext(AccordionItemContext);
  
  if (!ctx || !itemCtx) throw new Error("AccordionTrigger must be inside AccordionItem");

  const isOpen = ctx.type === "single" 
    ? ctx.openItem === itemCtx.value 
    : ctx.openItems.includes(itemCtx.value);

  return (
    <button
      type="button"
      onClick={() => ctx.toggleItem(itemCtx.value)}
      className={cn(
        "flex w-full items-center justify-between py-4 font-medium transition-all hover:no-underline",
        className
      )}
    >
      {children}
      <ChevronDown
        className={cn(
          "h-4 w-4 shrink-0 transition-transform duration-200 text-muted-foreground",
          isOpen && "rotate-180"
        )}
      />
    </button>
  );
}

export function AccordionContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ctx = useContext(AccordionContext);
  const itemCtx = useContext(AccordionItemContext);

  if (!ctx || !itemCtx) throw new Error("AccordionContent must be inside AccordionItem");

  const isOpen = ctx.type === "single" 
    ? ctx.openItem === itemCtx.value 
    : ctx.openItems.includes(itemCtx.value);

  return (
    <div
      className={cn(
        "overflow-hidden text-sm transition-all duration-300 ease-in-out",
        isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0",
        className
      )}
    >
      <div className="pb-4 pt-0">{children}</div>
    </div>
  );
}
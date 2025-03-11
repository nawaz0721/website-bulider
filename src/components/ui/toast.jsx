"use client";
import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cn } from "@/lib/utils";

export function useToast() {
  const [open, setOpen] = React.useState(false);
  const [toastData, setToastData] = React.useState({ title: "", description: "" });

  const toast = ({ title, description }) => {
    setToastData({ title, description });
    setOpen(true);
  };

  return {
    toast,
    ToastComponent: (
      <ToastPrimitives.Root open={open} onOpenChange={setOpen} className={cn("fixed bottom-5 right-5 bg-black text-white p-4 rounded-md")}>
        <ToastPrimitives.Title>{toastData.title}</ToastPrimitives.Title>
        <ToastPrimitives.Description>{toastData.description}</ToastPrimitives.Description>
      </ToastPrimitives.Root>
    ),
  };
}

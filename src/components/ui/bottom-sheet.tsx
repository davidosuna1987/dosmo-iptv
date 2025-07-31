
"use client"

import * as React from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

interface BottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  content: React.ReactNode;
  onSuccess?: () => void;
  onCancel?: () => void;
  cancelText?: string;
  successText?: string;
}

export function BottomSheet({
  open,
  onOpenChange,
  title,
  content,
  onSuccess,
  onCancel,
  cancelText = "Cancelar",
  successText = "Aceptar",
}: BottomSheetProps) {

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
        onOpenChange(false);
    }
  };

  const handleSuccess = () => {
    if (onSuccess) {
      onSuccess();
    }
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-2xl max-w-[600px] mx-auto">
        <SheetHeader className="text-left">
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <div className="py-4">{content}</div>
        <SheetFooter>
          <div className="flex w-full flex-col-reverse sm:flex-row gap-2">
              <Button variant="secondary" onClick={handleCancel} className="w-full">
                {cancelText}
              </Button>
              <Button onClick={handleSuccess} className="w-full">
                {successText}
              </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

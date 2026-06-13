import React, { useEffect, useRef } from "react";
import Button from "./Button";

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  autoFocus?: "confirm" | "cancel";
  classNames?: {
    overlay?: string;
    content?: string;
    title?: string;
    message?: string;
    footer?: string;
    button?: {
      cancelClassName?: string;
      confirmClassName?: string;
      cancelVariant?: "solid" | "outline" | "ghost";
      confirmVariant?: "solid" | "outline" | "ghost";
      cancelColor?: "primary" | "secondary" | "danger";
      confirmColor?: "primary" | "secondary" | "danger";
    };
  };
}
export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  autoFocus = "confirm",
  classNames = {},
}) => {
  const confirmRef = useRef<HTMLButtonElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      if (autoFocus === "cancel") {
        cancelRef.current?.focus();
      } else {
        confirmRef.current?.focus();
      }
    }
  }, [isOpen, autoFocus]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={`wpab-wpoa-fixed wpab-wpoa-inset-0 wpab-wpoa-z-[60000] wpab-wpoa-flex wpab-wpoa-items-center wpab-wpoa-justify-center wpab-wpoa-bg-black/50 wpab-wpoa-backdrop-blur-sm wpab-wpoa-transition-opacity ${
        classNames.overlay || ""
      }`}
    >
      <div
        className={`wpab-wpoa-bg-white wpab-wpoa-rounded-lg wpab-wpoa-shadow-xl wpab-wpoa-py-2 wpab-wpoa-px-4 wpab-wpoa-max-w-sm wpab-wpoa-w-full wpab-wpoa-mx-4 wpab-wpoa-transform wpab-wpoa-transition-all wpab-wpoa-scale-100 ${
          classNames.content || ""
        }`}
      >
        <h3
          className={`wpab-wpoa-ignore-preflight wpab-wpoa-mb-2 wpab-wpoa-mt-0 wpab-wpoa-text-nowrap ${
            classNames.title || ""
          }`}
        >
          {title}
        </h3>
        <p
          className={`wpab-wpoa-text-gray-600 wpab-wpoa-mb-6 wpab-wpoa-text-sm wpab-wpoa-leading-relaxed ${
            classNames.message || ""
          }`}
        >
          {message}
        </p>
        <div
          className={`wpab-wpoa-flex wpab-wpoa-justify-end wpab-wpoa-gap-3 wpab-wpoa-mt-3 ${
            classNames.footer || ""
          }`}
        >
          <Button
            ref={cancelRef}
            className={classNames.button?.cancelClassName || ""}
            variant={classNames.button?.cancelVariant || "ghost"}
            color={classNames.button?.cancelColor || "secondary"}
            onClick={onCancel}
          >
            {cancelLabel}
          </Button>
          <Button
            ref={confirmRef}
            className={classNames.button?.confirmClassName || ""}
            variant={classNames.button?.confirmVariant || "solid"}
            color={classNames.button?.confirmColor || "primary"}
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

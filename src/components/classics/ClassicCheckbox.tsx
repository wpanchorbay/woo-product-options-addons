import React, { useMemo } from "react";

interface ClassicCheckboxProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  description?: string;
  className?: string;
  isError?: boolean;
  id?: string;
}

export const ClassicCheckbox: React.FC<ClassicCheckboxProps> = ({
  label,
  checked,
  onChange,
  disabled,
  description,
  className = "",
  isError = false,
  id,
}) => {
  const checkboxId = useMemo(
    () => id || `classic-cb-${Math.random().toString(36).slice(2, 9)}`,
    [id],
  );

  return (
    <div
      className={`wpab-wpoa-flex wpab-wpoa-flex-col wpab-wpoa-gap-1 ${className}`}
    >
      <label
        htmlFor={checkboxId}
        className={`wpab-wpoa-flex wpab-wpoa-items-start wpab-wpoa-gap-2 wpab-wpoa-cursor-pointer ${
          disabled ? "wpab-wpoa-opacity-50 wpab-wpoa-cursor-not-allowed" : ""
        }`}
      >
        <div
          className={`
          wpab-wpoa-flex wpab-wpoa-items-center wpab-wpoa-justify-center
          wpab-wpoa-w-4 wpab-wpoa-h-4 wpab-wpoa-rounded wpab-wpoa-border-2 
          wpab-wpoa-mt-[7px] wpab-wpoa-transition-all wpab-wpoa-duration-200
          ${
            checked
              ? isError
                ? "!wpab-wpoa-border-red-400 wpab-wpoa-bg-red-400"
                : "wpab-wpoa-border-[#2271b1] wpab-wpoa-bg-[#2271b1]"
              : isError
              ? "!wpab-wpoa-border-red-400 wpab-wpoa-bg-white"
              : "wpab-wpoa-border-[#8c8f94] wpab-wpoa-bg-white hover:wpab-wpoa-border-[#2271b1]"
          }
        `}
        >
          <svg
            className={`wpab-wpoa-w-3.5 wpab-wpoa-h-3.5 wpab-wpoa-text-white wpab-wpoa-transform wpab-wpoa-transition-transform wpab-wpoa-duration-200 ${
              checked ? "wpab-wpoa-scale-100" : "wpab-wpoa-scale-0"
            }`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <input
            id={checkboxId}
            type="checkbox"
            className="!wpab-wpoa-hidden"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            disabled={disabled}
          />
        </div>
        {label && <span style={{ lineHeight: "28px" }}>{label}</span>}
      </label>
      {description && (
        <p className="description wpab-wpoa-block wpab-wpoa-mt-0 wpab-wpoa-pl-6">
          {description}
        </p>
      )}
    </div>
  );
};

/* eslint-disable */
import { CircleQuestionMark, CircleQuestionMarkIcon } from "lucide-react";
import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";

interface ClassicTooltipProps {
  tip: string;
  className?: string;
}

/**
 * Renders the WooCommerce-native help tip icon.
 * Implements a pure React Portal tooltip instead of relying on
 * WooCommerce's bundled jQuery (tipTip) which fails on dynamically rendered React nodes.
 * @param root0
 * @param root0.tip
 * @param root0.className
 */
export const ClassicTooltip: React.FC<ClassicTooltipProps> = ({
  tip,
  className = "",
}) => {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const iconRef = useRef<HTMLSpanElement>(null);

  const updateCoords = () => {
    if (iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect();
      setCoords({
        top: rect.top - 8,
        left: rect.left + rect.width / 2,
      });
    }
  };
  return (
    <>
      <span
        ref={iconRef}
        onPointerEnter={(e) => {
          updateCoords();
          setVisible(true);
        }}
        onPointerLeave={(e) => {
          setVisible(false);
        }}
        onFocus={(e) => {
          updateCoords();
          setVisible(true);
        }}
        onBlur={(e) => {
          setVisible(false);
        }}
        tabIndex={0}
        className={`woocommerce-help-tip`}
      ></span>
      {visible &&
        createPortal(
          <div
            className="wpab-wpoa-fixed wpab-wpoa-z-[999999] wpab-wpoa-bg-[#333] wpab-wpoa-text-white wpab-wpoa-px-2 wpab-wpoa-py-1 wpab-wpoa-rounded wpab-wpoa-text-xs wpab-wpoa-leading-snug wpab-wpoa-max-w-[200px] wpab-wpoa-text-center wpab-wpoa-pointer-events-none wpab-wpoa-shadow-sm"
            style={{
              top: coords.top,
              left: coords.left,
              transform: "translate(-50%, -100%)",
            }}
          >
            {tip}
            <div
              className="wpab-wpoa-absolute wpab-wpoa-border-[5px] wpab-wpoa-border-solid wpab-wpoa-border-t-[#333] wpab-wpoa-border-x-transparent wpab-wpoa-border-b-transparent"
              style={{
                top: "100%",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            />
          </div>,
          document.body,
        )}
    </>
  );
};

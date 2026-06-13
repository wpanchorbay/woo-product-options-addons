import React from "react";
import { __ } from "@wordpress/i18n";
import {
  ClassicCheckbox,
  ClassicSelect,
  ClassicInput,
  ClassicButton,
} from "../classics";
import { useAddonContext, FieldDefinition } from "../../store/AddonContext";
import { FormError } from "./FormError";
import { CirclePlus, Trash2 } from "lucide-react";

interface ConditionEditorProps {
  field: FieldDefinition;
  index: number;
  hideLabel?: boolean;
}

export const ConditionEditor: React.FC<ConditionEditorProps> = ({
  field,
  index,
  hideLabel = false,
}) => {
  const { state, dispatch } = useAddonContext();
  const siblingFields = state.schema.filter((f) => f.id !== field.id);
  const conditions = field.conditions;

  console.log('ConditionEditor for field:', field.id, 'label:', field.label);
  console.log('Total schema fields:', state.schema.length);
  console.log('Sibling fields:', siblingFields.length);

  const updateConditions = (updates: Partial<typeof conditions>) => {
    dispatch({
      type: "UPDATE_FIELD",
      payload: {
        id: field.id,
        updates: { conditions: { ...conditions, ...updates } },
      },
    });
  };

  if (siblingFields.length === 0) {
    return (
      <p
        className={`wpab-wpoa-text-[#666] wpab-wpoa-italic ${
          !hideLabel ? "wpab-wpoa-mt-4" : ""
        }`}
      >
        {__("Add more fields to set up conditional logic.", "woo-product-options-addons")}
      </p>
    );
  }

  return (
    <div className="">
      <div className="wpab-wpoa-flex wpab-wpoa-justify-between wpab-wpoa-items-center">
        <ClassicCheckbox
          label={__("Enable Conditional Logic", "woo-product-options-addons")}
          checked={conditions.status === "active"}
          onChange={(checked) =>
            updateConditions({
              status: checked ? "active" : "inactive",
            })
          }
        />
        {conditions.status === "active" && (
          <ClassicButton
            variant="secondary"
            onClick={() => {
              const rules = [
                ...(conditions.rules || []),
                {
                  target_field_id: "",
                  operator: "==",
                  value: "",
                },
              ];
              updateConditions({ rules });
            }}
          >
            <CirclePlus className="wpab-wpoa-size-4" />{" "}
            {__("Add Rule", "woo-product-options-addons")}
          </ClassicButton>
        )}
      </div>

      {conditions.status === "active" && (
        <div className="wpab-wpoa-mt-4 wpab-wpoa-space-y-4">
          <div className="wpab-wpoa-flex wpab-wpoa-gap-2 wpab-wpoa-items-center wpab-wpoa-text-[13px]">
            <ClassicSelect
              value={conditions.action}
              classNames={{
                innerContainer: "!wpab-wpoa-w-[85px]",
              }}
              onChange={(val) =>
                updateConditions({
                  action: val as "show" | "hide",
                })
              }
              options={[
                {
                  value: "show",
                  label: __("Show", "woo-product-options-addons"),
                },
                {
                  value: "hide",
                  label: __("Hide", "woo-product-options-addons"),
                },
              ]}
            />
            <span>{__("this field if", "woo-product-options-addons")}</span>
            <ClassicSelect
              value={conditions.match}
              classNames={{
                innerContainer: "!wpab-wpoa-w-[85px]",
              }}
              onChange={(val) =>
                updateConditions({
                  match: val as "ALL" | "ANY",
                })
              }
              options={[
                {
                  value: "ALL",
                  label: __("ALL", "woo-product-options-addons"),
                },
                {
                  value: "ANY",
                  label: __("ANY", "woo-product-options-addons"),
                },
              ]}
            />
            <span>{__("of these rules match:", "woo-product-options-addons")}</span>
          </div>

          <div className="wpab-wpoa-border wpab-wpoa-border-[#c3c4c7] wpab-wpoa-rounded-[12px] wpab-wpoa-overflow-hidden wpab-wpoa-bg-white wpab-wpoa-condition-rules-table">
            <div className="wpab-wpoa-w-0 wpab-wpoa-min-w-full wpab-wpoa-overflow-x-auto">
              <table
                className="wpab-wpoa-w-full wpab-wpoa-text-left wpab-wpoa-text-[13px]"
                style={{ minWidth: "500px" }}
              >
                <thead>
                  <tr className="wpab-wpoa-border-b wpab-wpoa-border-[#c3c4c7]">
                    <th className="!wpab-wpoa-py-[10px] !wpab-wpoa-px-[12px] wpab-wpoa-font-semibold wpab-wpoa-text-[#1d2327]">
                      {__("Field", "woo-product-options-addons")}
                    </th>
                    <th className="!wpab-wpoa-py-[10px] !wpab-wpoa-px-[12px] wpab-wpoa-font-semibold wpab-wpoa-text-[#1d2327] wpab-wpoa-w-[150px]">
                      {__("Operator", "woo-product-options-addons")}
                    </th>
                    <th className="!wpab-wpoa-py-[10px] !wpab-wpoa-px-[12px] wpab-wpoa-font-semibold wpab-wpoa-text-[#1d2327]">
                      {__("Value", "woo-product-options-addons")}
                    </th>
                    <th className="!wpab-wpoa-py-[10px] !wpab-wpoa-px-[12px] wpab-wpoa-w-[40px]"></th>
                  </tr>
                </thead>
                <tbody>
                  {conditions.rules && conditions.rules.length > 0 ? (
                    conditions.rules.map((rule, idx) => {
                      const targetField = siblingFields.find(
                        (f) => f.id === rule.target_field_id,
                      );
                      const ruleType = targetField?.type || "text";

                      const operatorOptions = [
                        {
                          value: "==",
                          label: __("equals", "woo-product-options-addons"),
                        },
                        {
                          value: "!=",
                          label: __("not equals", "woo-product-options-addons"),
                        },
                      ];

                      // Operators for scalar fields that support math or partial matching
                      if (
                        ["number", "text", "textarea"].includes(ruleType) ||
                        typeof targetField === "undefined"
                      ) {
                        if (ruleType === "number") {
                          operatorOptions.push(
                            {
                              value: ">",
                              label: __("greater than", "woo-product-options-addons"),
                            },
                            {
                              value: "<",
                              label: __("less than", "woo-product-options-addons"),
                            },
                            {
                              value: ">=",
                              label: __("greater than or equals", "woo-product-options-addons"),
                            },
                            {
                              value: "<=",
                              label: __("less than or equals", "woo-product-options-addons"),
                            },
                          );
                        } else {
                          operatorOptions.push(
                            {
                              value: "contains",
                              label: __("contains", "woo-product-options-addons"),
                            },
                            {
                              value: "not_contains",
                              label: __("not contains", "woo-product-options-addons"),
                            },
                          );
                        }
                      } else if (
                        ["select", "radio", "checkbox"].includes(ruleType)
                      ) {
                        operatorOptions.push(
                          {
                            value: "contains",
                            label: __("contains", "woo-product-options-addons"),
                          },
                          {
                            value: "not_contains",
                            label: __("not contains", "woo-product-options-addons"),
                          },
                        );
                      }

                      // Add empty/not_empty to all types
                      operatorOptions.push(
                        {
                          value: "empty",
                          label: __("is empty", "woo-product-options-addons"),
                        },
                        {
                          value: "not_empty",
                          label: __("is not empty", "woo-product-options-addons"),
                        },
                      );

                      return (
                        <tr
                          key={idx}
                          className="wpab-wpoa-border-b wpab-wpoa-border-[#c3c4c7] last:wpab-wpoa-border-none"
                        >
                          <td className="wpab-wpoa-py-2 wpab-wpoa-px-3">
                            <ClassicSelect
                              value={rule.target_field_id}
                              differentDropdownWidth
                              isError={
                                !!state.errors?.[
                                  `schema.${index}.conditions.rules.${idx}.target_field_id`
                                ]
                              }
                              onChange={(val) => {
                                const rules = [...(conditions.rules || [])];
                                rules[idx] = {
                                  ...rules[idx],
                                  target_field_id: String(val),
                                  // Reset operator and value when field changes
                                  operator: "==",
                                  value: "",
                                };
                                updateConditions({ rules });
                              }}
                              options={[
                                {
                                  value: "",
                                  label: __("Select field…", "woo-product-options-addons"),
                                },
                                ...siblingFields.map((sf) => ({
                                  value: sf.id,
                                  label: sf.label || sf.id,
                                })),
                              ]}
                            />
                            <FormError
                              message={
                                state.errors?.[
                                  `schema.${index}.conditions.rules.${idx}.target_field_id`
                                ]
                              }
                            />
                          </td>
                          <td className="wpab-wpoa-py-2 wpab-wpoa-px-3">
                            <ClassicSelect
                              differentDropdownWidth
                              value={rule.operator}
                              isError={
                                !!state.errors?.[
                                  `schema.${index}.conditions.rules.${idx}.operator`
                                ]
                              }
                              onChange={(val) => {
                                const rules = [...(conditions.rules || [])];
                                rules[idx] = {
                                  ...rules[idx],
                                  operator: String(val),
                                };
                                updateConditions({ rules });
                              }}
                              options={operatorOptions}
                            />
                            <FormError
                              message={
                                state.errors?.[
                                  `schema.${index}.conditions.rules.${idx}.operator`
                                ]
                              }
                            />
                          </td>
                          <td className="wpab-wpoa-py-2 wpab-wpoa-px-3">
                            {!["empty", "not_empty"].includes(rule.operator) &&
                              targetField && (
                                <>
                                  {targetField.type === "single_checkbox" ? (
                                    <ClassicSelect
                                      value={rule.value}
                                      differentDropdownWidth
                                      isError={
                                        !!state.errors?.[
                                          `schema.${index}.conditions.rules.${idx}.value`
                                        ]
                                      }
                                      onChange={(val) => {
                                        const rules = [
                                          ...(conditions.rules || []),
                                        ];
                                        rules[idx] = {
                                          ...rules[idx],
                                          value: String(val),
                                        };
                                        updateConditions({
                                          rules,
                                        });
                                      }}
                                      options={[
                                        {
                                          value: "1",
                                          label: __("Checked", "woo-product-options-addons"),
                                        },
                                        {
                                          value: "",
                                          label: __("Unchecked", "woo-product-options-addons"),
                                        },
                                      ]}
                                    />
                                  ) : (targetField.type === "select" ||
                                      targetField.type === "radio" ||
                                      targetField.type === "checkbox") &&
                                    targetField.options &&
                                    targetField.options.length > 0 ? (
                                    <ClassicSelect
                                      value={rule.value}
                                      differentDropdownWidth
                                      isError={
                                        !!state.errors?.[
                                          `schema.${index}.conditions.rules.${idx}.value`
                                        ]
                                      }
                                      onChange={(val) => {
                                        const rules = [
                                          ...(conditions.rules || []),
                                        ];
                                        rules[idx] = {
                                          ...rules[idx],
                                          value: String(val),
                                        };
                                        updateConditions({
                                          rules,
                                        });
                                      }}
                                      options={[
                                        {
                                          value: "",
                                          label: __(
                                            "Select option…",
                                            "woo-product-options-addons",
                                          ),
                                        },
                                        ...targetField.options.map((opt) => ({
                                          value: opt.value,
                                          label: opt.label || opt.value,
                                        })),
                                      ]}
                                    />
                                  ) : (
                                    <ClassicInput
                                      size="regular"
                                      value={rule.value}
                                      isError={
                                        !!state.errors?.[
                                          `schema.${index}.conditions.rules.${idx}.value`
                                        ]
                                      }
                                      onChange={(e) => {
                                        const rules = [
                                          ...(conditions.rules || []),
                                        ];
                                        rules[idx] = {
                                          ...rules[idx],
                                          value: e.target.value,
                                        };
                                        updateConditions({
                                          rules,
                                        });
                                      }}
                                      placeholder={__("Value", "woo-product-options-addons")}
                                    />
                                  )}
                                  <FormError
                                    message={
                                      state.errors?.[
                                        `schema.${index}.conditions.rules.${idx}.value`
                                      ]
                                    }
                                  />
                                </>
                              )}
                          </td>
                          <td className="wpab-wpoa-py-2">
                            <button
                              type="button"
                              onClick={() => {
                                const rules = (conditions.rules || []).filter(
                                  (_, i) => i !== idx,
                                );
                                updateConditions({ rules });
                              }}
                              className="wpab-wpoa-bg-transparent wpab-wpoa-border-none wpab-wpoa-cursor-pointer wpab-wpoa-p-1 wpab-wpoa-text-[#d63638] hover:wpab-wpoa-text-[#b32d2e] wpab-wpoa-transition-colors"
                              title={__("Remove rule", "woo-product-options-addons")}
                            >
                              <Trash2 className="wpab-wpoa-size-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="wpab-wpoa-py-6 wpab-wpoa-text-center wpab-wpoa-text-[#94a3b8] wpab-wpoa-italic"
                      >
                        {__("No rules added yet.", "woo-product-options-addons")}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

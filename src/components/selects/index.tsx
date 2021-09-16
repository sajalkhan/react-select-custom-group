import React from "react";
import Select, { components, ValueType, ActionMeta } from "react-select";
import { Icon } from "../icon";
import { mapModifiers, ModifierProp } from "../../libs/component";
import { OptionTypes } from "../../App";
import "./index.scss";

export interface SelectProps {
  placeholder?: string;
  modifiers?: ModifierProp<"invalid">;
  disabled?: boolean;
  defaultItems?: OptionTypes[];
  defaultMenuIsOpen?: boolean;
  groupedOptions: {
    label: string;
    options: OptionTypes[];
  }[];
  handleModal?: (value: string) => void;
  onChange?: (
    value: ValueType<OptionTypes, boolean>,
    actionMeta: ActionMeta<OptionTypes>
  ) => void;
}

const DropdownIndicator = (props: any) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        {props.selectProps.menuIsOpen ? (
          <Icon name="arrow-up" />
        ) : (
          <Icon name="arrow-down" />
        )}
      </components.DropdownIndicator>
    )
  );
};

export const Selects: React.FC<SelectProps> = ({
  groupedOptions,
  defaultItems,
  defaultMenuIsOpen,
  modifiers,
  placeholder,
  disabled = false,
  handleModal,
  onChange,
}) => {
  const formatOptionLabel = ({ label, alert }: OptionTypes) => (
    <div className="a-react-select--item">
      <div>
        <Icon name="add-item" />
        <span>{label}</span>
      </div>
      {alert && (
        <Icon
          name="alert"
          onClick={(e) => {
            e.stopPropagation();
            handleModal && handleModal(label);
          }}
        />
      )}
    </div>
  );

  const className = mapModifiers("a-react-select", modifiers);

  return (
    <Select
      isMulti
      className={className}
      classNamePrefix={"a-react-select"}
      placeholder={placeholder}
      defaultValue={defaultItems}
      defaultMenuIsOpen={defaultMenuIsOpen}
      options={groupedOptions}
      getOptionValue={(option: { label: string }) => option.label}
      isDisabled={disabled}
      isClearable={false}
      closeMenuOnSelect={false}
      components={{ DropdownIndicator }}
      formatOptionLabel={formatOptionLabel}
      onChange={onChange}
      noOptionsMessage={() => "選択肢がありません"}
    />
  );
};

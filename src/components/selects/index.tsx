import React from "react";
import Select, { components } from "react-select";
import { Icon } from "../icon";
import { mapModifiers, ModifierProp } from "../../libs/component";
import "./index.scss";

type OptionTypes = {
  label: string;
  value: string;
  alert?: boolean;
};

export interface SelectProps {
  placeholder?: string;
  modifiers?: ModifierProp<"invalid">;
  disabled?: boolean;
  defaultItems?: OptionTypes[];
  groupedOptions: {
    label: string;
    options: OptionTypes[];
  }[];
  handleModal?: () => void;
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
  modifiers,
  placeholder,
  disabled = false,
  handleModal,
}) => {
  const formatOptionLabel = ({ label, alert }: OptionTypes) => (
    <div className="a-react-select--item">
      <div>
        <Icon name="add-item" />
        <span>{label}</span>
      </div>
      {alert && (
        <Icon name="alert" onClick={() => handleModal && handleModal()} />
      )}
    </div>
  );

  const className = mapModifiers("a-react-select", modifiers);

  return (
    <Select
      isMulti
      isClearable={false}
      className={className}
      classNamePrefix={className}
      defaultValue={defaultItems}
      components={{ DropdownIndicator }}
      closeMenuOnSelect={false}
      options={groupedOptions}
      getOptionValue={(option) => option.label}
      formatOptionLabel={formatOptionLabel}
      placeholder={placeholder}
      isDisabled={disabled}
    />
  );
};

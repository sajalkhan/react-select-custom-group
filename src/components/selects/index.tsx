import React from "react";
import Select, { components, OptionsType } from "react-select";
import { groupedOptions } from "./data";
import { Icon } from "../icon";
import "./index.scss";
// import { customStyle, optionStyle } from './customStyle';

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

const handleChange = (value: OptionsType<any>) => {
  console.log("input -- ", value);
};

export const Selects: React.FC = () => {
  const formatOptionLabel = ({ label, menu }: any) => (
    <div className="a-react-select--item">
      <div>
        <Icon name="add-item" />
        <span>{label}</span>
      </div>
      {menu && <Icon name="alert" onClick={() => alert("Are you sure?")} />}
    </div>
  );

  return (
    <>
      <Select
        isMulti
        isClearable={false}
        className="a-react-select"
        classNamePrefix="a-react-select"
        defaultValue={[
          groupedOptions[0]?.options[0],
          groupedOptions[1]?.options[0],
        ]}
        components={{ DropdownIndicator }}
        closeMenuOnSelect={false}
        options={groupedOptions}
        onChange={(e) => handleChange(e)}
        formatOptionLabel={formatOptionLabel}
      />
    </>
  );
};

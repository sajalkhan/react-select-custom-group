import React, { useRef, useState, useEffect, useCallback } from 'react';
import Select, { components, ValueType, ActionMeta } from 'react-select';
import { mapModifiers, ModifierProp } from '../../libs/component';
import { OptionTypes } from '../../App';
import { Icon } from '../icon';
import './index.scss';

export interface SelectProps {
  placeholder?: string;
  modifiers?: ModifierProp<'invalid'>;
  disabled?: boolean;
  defaultItems?: OptionTypes[];
  defaultMenuIsOpen?: boolean;
  groupedOptions: {
    label: string;
    options: OptionTypes[];
  }[];
  handleModal?: (value: string) => void;
  onChange?: (value: ValueType<OptionTypes, boolean>, actionMeta: ActionMeta<OptionTypes>) => void;
}

const DropdownIndicator = (props: any) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        {props.selectProps.menuIsOpen ? <Icon name="arrow-up" /> : <Icon name="arrow-down" />}
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
  const divRef = useRef<HTMLDivElement | null>(null);
  const [menuIsOpen, setMenuIsOpen] = useState<boolean | undefined>(undefined);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    const modal = document.querySelector<HTMLDivElement>('.modal'); //check modal is open or not
    const rootEl = divRef?.current;

    if (rootEl && !rootEl.contains(e.target as HTMLElement)) {
      modal ? setMenuIsOpen(true) : setMenuIsOpen(undefined);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const formatOptionLabel = ({ label, alert }: OptionTypes) => (
    <div className="a-react-select--item">
      <div>
        <Icon name="add-item" />
        <span>{label}</span>
      </div>
      {alert && (
        <Icon
          name="alert"
          onClick={e => {
            e.stopPropagation();
            handleModal && handleModal(label);
          }}
        />
      )}
    </div>
  );

  const className = mapModifiers('a-react-select', modifiers);

  return (
    <div ref={divRef}>
      <Select
        className={className}
        classNamePrefix={'a-react-select'}
        placeholder={placeholder}
        defaultValue={defaultItems}
        defaultMenuIsOpen={defaultMenuIsOpen}
        options={groupedOptions}
        getOptionValue={(option: { label: string }) => option.label}
        isDisabled={disabled}
        isClearable={false}
        closeMenuOnSelect={false}
        isMulti
        menuIsOpen={menuIsOpen}
        components={{ DropdownIndicator }}
        formatOptionLabel={formatOptionLabel}
        onChange={onChange}
        noOptionsMessage={() => '選択肢がありません'}
      />
    </div>
  );
};

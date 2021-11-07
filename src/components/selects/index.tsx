import React, { useRef, useState, useEffect, useCallback, useLayoutEffect } from 'react';
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

//It's use for custom sticky group heading
const Menu = (props: any) => {
  return (
    <components.Menu {...props}>
      <div className="a-react-select__group-heading--custom">
        <p className="a-react-select__group-heading--custom-label">
          <span>{props.options[0].label}</span>
        </p>
        <p className="a-react-select__group-heading--custom-label">
          <span>{props.options[1].label}</span>
        </p>
      </div>
      <div>{props.children}</div>
    </components.Menu>
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
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [menuIsOpen, setMenuIsOpen] = useState<boolean | undefined>(undefined);

  const handleClickOutside = useCallback((e: Event) => {
    const rootEl = wrapRef?.current;
    if (rootEl) {
      const isModalOpened = document.querySelector('.modal') as HTMLElement;
      const isMenuOpened = rootEl.querySelector('div[class*="menu-is-open"]') as HTMLElement;
      const Indicator = document.querySelector('.a-react-select__indicators') as HTMLElement;

      if (!rootEl.contains(e.target as HTMLElement)) {
        isModalOpened && isMenuOpened ? setMenuIsOpen(true) : setMenuIsOpen(undefined);
      } else {
        Indicator.addEventListener('touchend', () => setMenuIsOpen(undefined));
        Indicator.addEventListener('click', () => setMenuIsOpen(undefined));
      }
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
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

  useLayoutEffect(() => {
    groupedOptions && groupedOptions[0].options.push({ label: '', value: '' });
  }, [groupedOptions]);

  const className = mapModifiers('a-react-select', modifiers);

  return (
    <div ref={wrapRef}>
      <Select
        className={className}
        classNamePrefix={'a-react-select'}
        placeholder={placeholder}
        defaultValue={defaultItems}
        defaultMenuIsOpen={defaultMenuIsOpen}
        options={groupedOptions}
        getOptionValue={(option: { value: string }) => option.value}
        isDisabled={disabled}
        isClearable={false}
        closeMenuOnSelect={false}
        isMulti
        menuIsOpen={menuIsOpen}
        components={{ DropdownIndicator, Menu }}
        formatOptionLabel={formatOptionLabel}
        onChange={onChange}
        noOptionsMessage={() => '選択肢がありません'}
      />
    </div>
  );
};

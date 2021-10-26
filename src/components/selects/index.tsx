import React, { useRef, useState, useEffect, useCallback } from 'react';
import Select, { components, ValueType, ActionMeta } from 'react-select';
import { mapModifiers, ModifierProp } from '../../libs/component';
import { useMediaQuery } from 'react-responsive';
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
        <span>{props.options[0].label}</span>
        <span>{props.options[1].label}</span>
      </div>
      <div>{props.children}</div>
    </components.Menu>
  );
};

//I have use it when any group items is empty then set his current position
const GroupHeading = (props: any) => {
  const menuList = document.querySelector('.a-react-select__menu-list') as HTMLElement;
  const leftGroupHeading = document.querySelector('div[id$="group-0-heading"]') as HTMLElement;
  const rightGroupHeading = document.querySelector('div[id$="group-1-heading"]') as HTMLElement;

  const isMobile = useMediaQuery({ query: `(max-width: 720px)` });

  if (menuList && !isMobile) {
    if (!leftGroupHeading && rightGroupHeading) {
      menuList.classList.remove('a-react-select__menu-list--left');
      menuList.classList.add('a-react-select__menu-list--right');
    } else if (leftGroupHeading && !rightGroupHeading) {
      menuList.classList.add('a-react-select__menu-list--left');
      menuList.classList.remove('a-react-select__menu-list--right');
    }
  }

  return (
    components.GroupHeading && (
      <components.GroupHeading {...props}>
        <span>{props.children}</span>
      </components.GroupHeading>
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
        components={{ DropdownIndicator, GroupHeading, Menu }}
        formatOptionLabel={formatOptionLabel}
        onChange={onChange}
        noOptionsMessage={() => '選択肢がありません'}
      />
    </div>
  );
};

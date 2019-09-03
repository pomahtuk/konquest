import React, { ReactElement, HTMLProps, ChangeEvent, useContext } from "react";
import { ThemeContext } from "../themes/ThemeProvider";
import { css } from "emotion";
// import IconDropdown from "icons/Dropdown";

export type Option = {
  text: string;
  value: string;
  disabled?: boolean;
  key?: string;
};

export interface InputSelectProps extends HTMLProps<HTMLSelectElement> {
  label?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  options: Option[];
  className?: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const InputSelect = ({ placeholder, value, options, name, label, disabled, onChange, className, ...rest }: InputSelectProps): ReactElement => {
  const theme = useContext(ThemeContext);

  const wrapperClass = css`
    border: none;
    padding: 0;
    margin: 0;
  `;

  const labelClass = css`
    display: block;
    margin-bottom: ${theme.units.small};
  `;

  const selectClass = css`
    padding-right: ${theme.units.largest};
    -webkit-appearance: none;
    appearance: none;
    min-width: calc(${theme.units.largest} * 2);
    z-index: ${theme.zIndex[1]};
  `;

  return (
    <div className={`${wrapperClass} ${className}`}>
      {label && <label className={labelClass}>{label}</label>}
      <select {...rest} disabled={disabled} value={value} onChange={onChange} name={name} className={selectClass}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(
          ({ value, key, text, disabled }): ReactElement => (
            <option value={value} key={key || value} disabled={disabled}>
              {text}
            </option>
          )
        )}
        {/* <Icon svg={<IconDropdown />} className="bui-input-select__icon" /> */}
      </select>
    </div>
  );
};

export default InputSelect;

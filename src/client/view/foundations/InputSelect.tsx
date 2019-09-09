import React, { ReactElement, HTMLProps, ChangeEvent, useContext } from "react";
import { ThemeContext } from "../themes/ThemeProvider";
import { css } from "emotion";
import hexToRgba from "../helpers/hexToRgba";
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
    position: relative;
    top: 0;
    left: 0;
  `;

  const labelClass = css`
    display: block;
    margin-bottom: ${theme.units.small};
  `;

  const selectClass = css`
    padding: ${theme.units.medium} ${theme.units.largest} ${theme.units.medium} ${theme.units.medium};
    -webkit-appearance: none;
    appearance: none;
    min-width: calc(${theme.units.largest} * 2);
    z-index: ${theme.zIndex[1]};
    font-size: ${theme.fontSizes.small};
    font-weight: ${theme.fontWeights.normal};
    line-height: ${theme.lineHeights.small};
    font-family: ${theme.fontStacks.sans};
    background: ${theme.colors.white};
    border-radius: ${theme.units.smaller};
    border: 1px solid ${theme.colors.grayscaleLighter};
    display: block;
    width: 100%;
    text-align: left;
    margin: ${theme.units.medium} 0;

    :focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(${hexToRgba(theme.colors.action, "0.3")});
      border-color: ${theme.colors.action};
      border-radius: ${theme.units.smaller};
    }
  `;

  const iconClass = css`
    width: ${theme.units.large};
    height: ${theme.units.large};
    vertical-align: middle;
    fill: ${theme.colors.grayscaleDark};
    position: absolute;
    pointer-events: none;
    right: ${theme.units.medium};
    top: 50%;
    transform: translateY(30%);
  `;

  return (
    <div className={`${wrapperClass} ${className}`}>
      {label && <label className={labelClass}>{label}</label>}
      <select {...rest} disabled={disabled} value={value} onChange={onChange} name={name} className={selectClass}>
        {options.map(
          ({ value, key, text, disabled }): ReactElement => (
            <option value={value} key={key || value} disabled={disabled}>
              {text}
            </option>
          )
        )}
      </select>
      <span className={iconClass}>
        <svg viewBox="0 0 128 128" width="1em" height="1em">
          <path d="M92 52a4 4 0 0 1-2.8-1.2L64 25.7 38.8 50.8a4 4 0 0 1-5.6-5.6L64 14.3l30.8 30.9A4 4 0 0 1 92 52zm0 24a4 4 0 0 0-2.8 1.2L64 102.3 38.8 77.2a4 4 0 0 0-5.6 5.6L64 113.7l30.8-30.9A4 4 0 0 0 92 76z"></path>
        </svg>
      </span>
    </div>
  );
};

export default InputSelect;

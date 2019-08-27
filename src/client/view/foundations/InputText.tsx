import React, { ReactElement, useContext, ChangeEvent } from "react";
import { css } from "emotion";
import { ThemeContext } from "../themes/ThemeProvider";
import hexToRgba from "../helpers/hexToRgba";

type InputTextProps = {
  id?: string;
  label?: React.ReactNode;
  value?: string | number;
  type?: string;
  disabled?: boolean;
  // error?: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  min?: number;
  max?: number;
};

const InputText = ({ disabled, type, placeholder, label, value, onChange, min, max }: InputTextProps): ReactElement => {
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

  const sharedInput = css`
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
  `;

  const inputClass = css`
    ${sharedInput};
    margin: ${theme.units.medium} 0;

    appearance: none;
    padding: calc(${theme.units.medium} + 1px);
    outline: none;

    :focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(${hexToRgba(theme.colors.action, "0.3")});
      border-color: ${theme.colors.action};
      border-radius: ${theme.units.smaller};
    }
  `;

  return (
    <div className={wrapperClass}>
      {label && <label className={labelClass}>{label}</label>}
      <input
        className={inputClass}
        disabled={disabled}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...(type === "number" ? { min, max } : {})}
      />
    </div>
  );
};

export default InputText;

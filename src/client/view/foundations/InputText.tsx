import React, { ReactElement, useContext, ChangeEvent } from "react";
import { css } from "emotion";
import { ThemeContext } from "../themes/ThemeProvider";
import hexRgb from "hex-rgb";

const hexToRgba = (hex: string, alpha: string): string => [...hexRgb(hex, { format: "array" }).slice(0, -1), alpha].join(", ");

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

    :last-child {
      margin-bottom: 0;
    }
  `;

  const labelClass = css`
    display: block;
    margin-bottom: ${theme.units.small};
  `;

  const contentClass = css`
    display: flex;
    align-items: center;
    position: relative;
    z-index: 0;
  `;

  const fieldClass = css`
    ${contentClass};
    flex-grow: 1;
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

  const inputDecoratorClass = css`
    ${sharedInput};
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: block;
    padding: ${theme.units.medium};
    border-radius: 0;
    position: absolute;
  `;

  const inputClass = css`
    ${sharedInput};
    position: relative;
    z-index: 5;
    margin: 0;

    appearance: none;
    padding: calc(${theme.units.medium} + 1px);
    outline: none;
    border: 0;
    background: none;

    :focus + div {
      outline: none;
      box-shadow: 0 0 0 3px rgba(${hexToRgba(theme.colors.action, "0.3")});
      border-color: ${theme.colors.action};
      border-radius: ${theme.units.smaller};
    }
  `;

  return (
    <div className={wrapperClass}>
      {label && <label className={labelClass}>{label}</label>}
      <div className={contentClass}>
        <div className={fieldClass}>
          <input
            className={inputClass}
            disabled={disabled}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            {...(type === "number" ? { min, max } : {})}
          />
          <div className={inputDecoratorClass} />
        </div>
      </div>
    </div>
  );
};

export default InputText;

import React, { ReactElement, useContext, ReactNode } from "react";
import styled from "@emotion/styled";
import { ThemeContext } from "../themes/ThemeProvider";

type ButtonProps = {
  children?: ReactNode;
  variant?: "primary" | "secondary" | "destructive";
  size?: "large";
  wide?: boolean;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
};

const Button = ({ children, type = "button", variant, size, disabled, wide, className, onClick }: ButtonProps): ReactElement => {
  const theme = useContext(ThemeContext);

  const color = variant === "secondary" ? theme.colors.action : theme.colors.white;
  const backgroundColorHover =
    variant === "secondary" ? theme.colors.actionLighter : variant === "destructive" ? theme.colors.destructiveDark : theme.colors.actionDark;
  const backgroundColor = variant === "secondary" ? theme.colors.white : variant === "destructive" ? theme.colors.destructive : theme.colors.action;
  const borderColorHover = variant === "destructive" ? theme.colors.destructiveDark : theme.colors.actionDark;
  const borderColor = variant === "destructive" ? theme.colors.destructive : theme.colors.action;

  const ButtonTag = styled.button`
    border: 1px solid ${borderColor};
    border-radius: ${theme.units.smaller};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: ${theme.units.medium} ${theme.units.large};
    cursor: pointer;
    font-family: inherit;
    text-decoration: none;
    box-sizing: border-box;
    vertical-align: middle;
    position: relative;
    background-color: ${backgroundColor};
    color: ${color};
    font-size: ${theme.fontSizes.small};
    font-weight: ${theme.fontWeights.medium};
    line-height: ${theme.lineHeights.small};

    :hover,
    :active {
      background-color: ${backgroundColorHover};
      border-color: ${borderColorHover};
    }

    [disabled],
    [disabled]:hover {
      background-color: ${theme.colors.grayscale};
      border-color: ${theme.colors.grayscale};
      cursor: not-allowed;
    }

    ${size === "large"
      ? `
      padding: calc(${theme.units.larger} / 2) ${theme.units.larger};
      font-size: ${theme.fontSizes.medium};
      font-weight: ${theme.fontWeights.normal};
      line-height: ${theme.lineHeights.medium};
    `
      : ""}
    ${wide ? "width: 100%;" : ""}
  `;
  return (
    <ButtonTag className={className} onClick={onClick} type={type} disabled={disabled}>
      {children}
    </ButtonTag>
  );
};

export default Button;

import React, { ReactElement, useContext, ReactNode } from "react";
import styled from "@emotion/styled";
import { ThemeContext } from "../themes/ThemeProvider";
import hexToRgba from "../helpers/hexToRgba";

type ButtonProps = {
  children?: ReactNode;
  variant?: "primary" | "destructive";
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
};

type CornerProps = {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
};

const Button = ({ children, type = "button", variant, className, onClick }: ButtonProps): ReactElement => {
  const theme = useContext(ThemeContext);

  const color = variant === "destructive" ? theme.colors.red : theme.colors.primaryLight;
  const backgroundColor =
    variant === "destructive" ? `rgba(${hexToRgba(theme.colors.buttonDestructiveBg, "0.65")})` : `rgba(${hexToRgba(theme.colors.buttonBg, "0.65")})`;
  const borderColor = variant === "destructive" ? theme.colors.red : theme.colors.primaryLight;

  const ButtonWrapper = styled.div`
    position: relative;
    display: inline-block;
    top: 0;
    left: 0;
  `;

  const Corner = styled.div`
    border-color: ${borderColor};
    z-index: 1;
    opacity: 1;
    position: absolute;
    border-style: solid;
    width: 8px;
    height: 8px;
    border-width: ${({ position }: CornerProps): string => {
      switch (position) {
        case "top-left":
          return "1px 0 0 1px";
        case "top-right":
          return "1px 1px 0 0";
        case "bottom-left":
          return "0 0 1px 1px";
        default:
          return "0 1px 1px 0";
      }
    }};
    top: ${({ position }: CornerProps): string => {
      if (position === "top-left" || position === "top-right") {
        return "-1px";
      }
      return "";
    }};
    bottom: ${({ position }: CornerProps): string => {
      if (position === "bottom-left" || position === "bottom-right") {
        return "-1px";
      }
      return "";
    }};
    left: ${({ position }: CornerProps): string => {
      if (position === "bottom-left" || position === "top-left") {
        return "-1px";
      }
      return "";
    }};
    right: ${({ position }: CornerProps): string => {
      if (position === "bottom-right" || position === "top-right") {
        return "-1px";
      }
      return "";
    }};
  `;

  const ButtonTag = styled.button`
    border: 1px solid ${borderColor};
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
    font-weight: ${theme.fontWeights.normal};
    line-height: ${theme.lineHeights.small};
    font-family: Arial, sans-serif;
    user-select: none;
    position: relative;
    z-index: 2;

    :focus {
      outline: none;
    }
  `;

  return (
    <ButtonWrapper>
      <Corner position="top-left" />
      <Corner position="top-right" />
      <Corner position="bottom-left" />
      <Corner position="bottom-right" />
      <ButtonTag className={className} onClick={onClick} type={type}>
        {children}
      </ButtonTag>
    </ButtonWrapper>
  );
};

export default Button;

import React, { ReactElement, useContext, ReactNode, HTMLAttributes } from "react";
import styled from "@emotion/styled";
import { ThemeContext } from "../themes/ThemeProvider";

export type ContainerProps = {
  children: ReactNode;
  centered?: boolean;
  className?: string;
  attributes?: HTMLAttributes<HTMLDivElement>;
};

const Container = ({ children, centered, className, attributes }: ContainerProps): ReactElement => {
  const theme = useContext(ThemeContext);
  const ContainerStyled = styled.div({
    boxSizing: "border-box",
    position: "relative",
    width: "100%",
    padding: theme.units.medium,
    ...(centered
      ? {
          margin: "0 auto",
          maxWidth: "1140px;"
        }
      : {})
  });
  return (
    <ContainerStyled className={className} {...attributes}>
      {children}
    </ContainerStyled>
  );
};

export default Container;

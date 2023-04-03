import React, { ReactElement } from "react";
import { Wrapper, WrapperVariant } from "./Wrapper";
import NavBar from "./NavBar";

interface LayoutProps {
  variant?: WrapperVariant;
  children: ReactElement;
}

export const Layout: React.FC<LayoutProps> = ({ children, variant }) => {
  return (
    <>
      <NavBar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};

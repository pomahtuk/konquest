import React, { ReactElement } from "react";
import { HeaderNavigation, ALIGN, StyledNavigationItem as NavigationItem, StyledNavigationList as NavigationList } from "baseui/header-navigation";
import { Button } from "baseui/button";

const Header = (): ReactElement => (
  <HeaderNavigation>
    <NavigationList $align={ALIGN.left}>
      <NavigationItem>Konquest</NavigationItem>
    </NavigationList>
    <NavigationList $align={ALIGN.center} />
    <NavigationList $align={ALIGN.right}>
      <NavigationItem>
        <Button>Get started</Button>
      </NavigationItem>
    </NavigationList>
  </HeaderNavigation>
);

export default Header;

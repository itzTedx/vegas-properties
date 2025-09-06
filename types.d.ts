import { Route } from "next";

declare global {
  type SVGProps = React.SVGProps<SVGSVGElement>;

  type NavItem = {
    href: Route;
    label: string;
  };
}

export {};

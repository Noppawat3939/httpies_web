import type { PropsWithChildren } from "react";
import "../../index.css";

type LayoutWrapperProps = Readonly<PropsWithChildren>;

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  return <div className="layout-wrapper">{children}</div>;
}

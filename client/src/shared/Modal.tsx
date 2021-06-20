import { ReactElement } from "react";

export default function Modal({
  children,
}: {
  children: ReactElement | string;
}) {
  return <div>{children}</div>;
}

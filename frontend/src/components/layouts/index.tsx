import { PropsWithChildren } from "react";
import { Header } from "./header";

export function BaseLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <main className="pt-5 md:pt-10">{children}</main>
    </>
  );
}

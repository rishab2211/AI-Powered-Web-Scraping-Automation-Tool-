import React, { ReactNode } from "react";
import Navbar from "./_components/navbar";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="dark bg-black w-full text-white sm:p-2 ">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;

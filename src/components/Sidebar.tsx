import type { ReactNode } from "react";
import { TiContacts } from "react-icons/ti/";
import { BiMapAlt } from "react-icons/bi/";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";

type SidebarProps = {
  children: ReactNode;
};

const menuItems = [
  {
    path: "/",
    name: "Contacts",
    icon: <TiContacts />,
  },
  {
    path: "/visuals",
    name: "Chars and Maps",
    icon: <BiMapAlt />,
  },
];

export default function Sidebar({ children }: SidebarProps) {
  return (
    <div className="flex flex-col-reverse md:flex-row h-screen">
      <div className="bg-[#171717]">
        {/* Menu Bars Icon */}
        <div className="hidden">
          <FaBars />
        </div>
        <div className="grid grid-flow-col md:grid-flow-row items-center">
          {menuItems.map((item,index) => (
            <NavLink to={item.path} key={index}>
              {({ isActive, isPending }) => (
                <div
                  className={
                    (isActive ? "bg-[#353535] " : "") +
                    "flex self-center py-1 md:p-3 justify-center items-center gap-4"
                  }
                >
                  <div className="text-2xl md:text-3xl">{item.icon}</div>
                </div>
              )}
            </NavLink>
          ))}
        </div>
      </div>
      <main className="w-full h-full ">{children}</main>
    </div>
  );
}

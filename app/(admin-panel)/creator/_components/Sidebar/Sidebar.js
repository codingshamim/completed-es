import UserDetails from "./UserDetails";
import SidebarItem from "./SidebarItem";
import SidebarContainer from "./SidebarContainer";
import CloseSidebar from "./CloseSidebar";
import Link from "next/link";
import Logo from "@/app/components/Logo";
export const sidebarList = [
  {
    title: "Dashboard",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={18}
        height={18}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-house-icon lucide-house"
      >
        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
        <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      </svg>
    ),
    items: [],
    target: "/creator",
  },
  {
    title: "Products",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={18}
        height={18}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-box-icon lucide-box"
      >
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
      </svg>
    ),
    items: [
      { title: "All Products", href: "/creator/products" },
      { title: "Create Product", href: "/creator/products/create" },
    ],
    target: "",
  },
  {
    title: "Orders",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={18}
        height={18}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-list-ordered-icon lucide-list-ordered"
      >
        <path d="M10 12h11" />
        <path d="M10 18h11" />
        <path d="M10 6h11" />
        <path d="M4 10h2" />
        <path d="M4 6h1v4" />
        <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
      </svg>
    ),
    items: [
      { title: "All Order", href: "/creator/orders" },
      { title: "Create Order", href: "/creator/orders/create" },
    ],
    target: "",
  },

  {
    title: "Categories",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={18}
        height={18}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-list-todo-icon lucide-list-todo"
      >
        <path d="M13 5h8" />
        <path d="M13 12h8" />
        <path d="M13 19h8" />
        <path d="m3 17 2 2 4-4" />
        <rect x={3} y={4} width={6} height={6} rx={1} />
      </svg>
    ),
    items: [],
    target: "/creator/categories",
  },
  {
    title: "Inbox",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={18}
        height={18}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-message-square-more-icon lucide-message-square-more"
      >
        <path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" />
        <path d="M12 11h.01" />
        <path d="M16 11h.01" />
        <path d="M8 11h.01" />
      </svg>
    ),
    items: [],
    target: "/creator/inbox",
  },
];
export default function Sidebar() {
  return (
    <SidebarContainer>
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-700">
        <div className="flex items-center">
          <Logo />
        </div>
        <CloseSidebar />
      </div>
      <nav className="mt-6">
        <UserDetails />
        <ul className="space-y-1 px-3">
          {sidebarList.map((item, index) => (
            <SidebarItem
              key={index}
              target={item?.target}
              title={item?.title}
              svg={item?.svg}
              items={item?.items}
            />
          ))}
        </ul>
      </nav>
    </SidebarContainer>
  );
}

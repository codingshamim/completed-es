import LoggedNavigationAction from "./LoggedNavigationAction";
import Logo from "./Logo";

import { auth } from "@/auth";
import NavbarActions from "./NavbarActions";
import UserCredentials from "../src/UserCredentials";

export default async function TopNavigation() {
  const loggedAuth = await auth();
  const user = await UserCredentials(loggedAuth?.user?.id);
  const role = user ? user?.role : "";
  const isAdmin = role === "admin" ? true : false;
  return (
    <nav className="flex justify-between items-center ">
      <Logo />

      {loggedAuth ? (
        <LoggedNavigationAction isAdmin={isAdmin}>
          <div className="w-[40px] h-[40px] rounded-full bg-secondary flex justify-center items-center">
            {user?.name.charAt(0).toUpperCase()}
          </div>
          <div className="hidden md:block">
            <h1 className="text-sm">{user?.name}</h1>
            <p className="text-xs text-gray-300">{user?.phone}</p>
          </div>
        </LoggedNavigationAction>
      ) : (
        <NavbarActions />
      )}
    </nav>
  );
}

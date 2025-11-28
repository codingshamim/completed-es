import UserCredentials from "@/app/src/UserCredentials";
import HamburgerButton from "./HamburgerButton";
import UserIcon from "./UserIcon";
import { auth } from "@/auth";
import MainSearchbar from "./MainSearchbar";

export default async function TopHeader() {
  const loggedAuth = await auth();
  const user = await UserCredentials(loggedAuth?.user?.id);
  return (
    <header className=" border-b border-gray-700">
      <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-3 h-auto min-h-16 px-4 py-3">
        {/* Sidebar toggle for small screens */}
        <HamburgerButton />

        {/* Search bar */}
        <MainSearchbar />

        {/* Right side icons */}
        <UserIcon
          user={{ name: user?.name || "Unknow", role: user?.role || "Unknown" }}
          icon={user?.name?.charAt(0) || "U"}
        />
      </div>
    </header>
  );
}

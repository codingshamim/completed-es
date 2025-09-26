import TopHeader from "./creator/_components/Header/TopHeader";
import Sidebar from "./creator/_components/Sidebar/Sidebar";
import ConfirmationModal from "./creator/_components/ConfirmationModal";
import CategoryModal from "./creator/categories/_component/CategoryModal";
import { auth } from "@/auth";
import { getUserRole } from "../actions/user.action";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }) {
  const user = await auth();
  const role = await getUserRole(user?.user?.id);
  if (role?.[0]?.role !== "admin") {
    redirect("/");
  }
  return (
    <div className="text-white bg-[#000] ">
      <ConfirmationModal />
      <Sidebar />

      <div className="lg:ml-64">
        <TopHeader />
        <CategoryModal />
        {children}
      </div>
    </div>
  );
}

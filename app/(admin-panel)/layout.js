import TopHeader from "./creator/_components/Header/TopHeader";
import Sidebar from "./creator/_components/Sidebar/Sidebar";
import ConfirmationModal from "./creator/_components/ConfirmationModal";
import CategoryModal from "./creator/categories/_component/CategoryModal";

export default async function AdminLayout({ children }) {
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

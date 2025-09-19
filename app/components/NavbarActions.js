import { LogIn, UserPlus } from "lucide-react";
import Link from "next/link";

export default function NavbarActions() {
  return (
    <div className="actions  items-center gap-3 flex">
      <Link href="/login" className="new-btn cursor-pointer ">
        <LogIn width={18} height={18} />
        Login
      </Link>
      <Link
        href="/register"
        className="new-variable-btn nav-border cursor-pointer"
      >
        <UserPlus width={18} height={18} />
        <span className="hidden md:block">Register</span>
      </Link>
    </div>
  );
}

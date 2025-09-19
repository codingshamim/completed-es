import UserCredentials from "@/app/src/UserCredentials";
import { auth } from "@/auth";

export default async function UserDetails() {
  const loggedAuth = await auth();
  const user = await UserCredentials(loggedAuth?.user?.id);

  return (
    <div className="px-6 mb-6">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-black rounded-full  flex items-center justify-center">
          <span className="text-sm font-semibold">
            {user?.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="text-sm">
          <p className="font-medium">{user?.name}</p>
          <p className="text-gray-400 capitalize">{user?.role}</p>
        </div>
      </div>
    </div>
  );
}

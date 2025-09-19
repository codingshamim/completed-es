"use client";

import { deleteAccountAction, makeSignout } from "@/app/backend/actions";
import useCommonState from "@/app/src/hooks/useCommonState";
import { useRouter } from "next/navigation";

export default function DeleteAccountButton() {
  const { common, setCommon } = useCommonState();
  const router = useRouter();
  const handleDelete = async () => {
    const response = await deleteAccountAction();
    if (response.ok) {
      setCommon({
        ...common,
        modal: false,
        modalContent: null,
      });
      router.push("/goodbye");
      await makeSignout();
    }
  };
  return (
    <button className="btn" onClick={handleDelete}>
      Yes
    </button>
  );
}

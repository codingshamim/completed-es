import CancelModal from "./CancelModal";
import DeleteAccountButton from "./DeleteAccountButton";

export default function DeleteAccountModalContent() {
  return (
    <div>
      <div className="flex gap-2 items-center text-xs">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide stroke-yellow-400 lucide-circle-alert"
        >
          <circle cx={12} cy={12} r={10} />
          <line x1={12} x2={12} y1={8} y2={12} />
          <line x1={12} x2="12.01" y1={16} y2={16} />
        </svg>
        <span>Warning</span>
      </div>
      <hr className="text-gray-400 mt-2 mb-2" />
      <div>
        <p className="text-sm"> Are You Sure to Delete This ?</p>
      </div>
      <div className="flex justify-end gap-2 items-center w-full mt-4">
        <CancelModal />
        <DeleteAccountButton />
      </div>
    </div>
  );
}

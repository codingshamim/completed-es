import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      {/* Logo Icon */}
      <div className="size-[38px] logo-es bg-white text-black rounded-sm flex justify-center items-center font-bold text-xl tracking-tight shadow-sm">
        ES
      </div>

      {/* Logo Text */}
      <div className="flex flex-col -space-y-1">
        <div className="text-white font-bold text-xl tracking-wide logo-es">
          ES VIBES
        </div>
        <p className="text-gray-300 text-xs  font-medium tracking-wide logo-font">
          next level tees
        </p>
      </div>
    </Link>
  );
}

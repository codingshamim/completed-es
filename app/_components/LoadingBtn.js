export default function LoadingBtn({
  loading,
  children,
  customClass,
  onEvent,
}) {
  return (
    <>
      <button
        disabled={loading}
        onClick={onEvent}
        className={`${customClass} anim-btn  bg-white text-black ${
          loading || "hover:bg-[#cacaca] "
        }`}
      >
        {loading && (
          <span className="mr-2 inline-block w-[10px] h-[10px] border border-black rounded-full anim border-r-transparent" />
        )}
        {loading ? "Loading..." : children}
      </button>
    </>
  );
}

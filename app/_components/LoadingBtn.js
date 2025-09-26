const LoadingBtn = ({ loading, children, customClass, onEvent, disabled }) => {
  return (
    <button
      disabled={loading || disabled}
      onClick={onEvent}
      className={`${customClass} anim-btn bg-white text-black ${
        loading || disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-[#cacaca]"
      } transition-all duration-200`}
    >
      {loading && (
        <span className="mr-2 inline-block w-[10px] h-[10px] border border-black rounded-full anim border-r-transparent animate-spin" />
      )}
      {loading ? "Loading..." : children}
    </button>
  );
};
export default LoadingBtn;

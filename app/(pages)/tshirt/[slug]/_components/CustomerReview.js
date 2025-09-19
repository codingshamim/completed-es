export default function CustomerReview({ userName, content }) {
  return (
    <div className="mt-4 flex gap-2">
      <div className="w-[40px] uppercase bg-secondary h-[40px] rounded-full flex justify-center items-center">
        {userName ? userName.charAt(0) : "U"}
      </div>
      <div className="content-user w-[85%]">
        <h1>{userName ? userName : "Unknown User"}</h1>
        <p className="text-xs text-gray-400">{content}</p>
      </div>
    </div>
  );
}

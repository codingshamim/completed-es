import AddCommentQuery from "@/app/backend/queries/AddCommentQuery";
import { revalidatePath } from "next/cache";
import CommentButton from "./CommentButton";
import { auth } from "@/auth";
import UserCredentials from "@/app/src/UserCredentials";
import { isCommented } from "@/app/actions/comment.action";

export default async function AddComment(product) {
  const loggedAuth = await auth();
  const getUser = await UserCredentials(loggedAuth?.user?.id);
  const isComment = await isCommented(product?.product);

  const commentAdd = async (event) => {
    "use server";
    try {
      const comment = event.get("comment");

      await AddCommentQuery(product?.product, comment);
      revalidatePath("/");
    } catch (err) {
      throw new Error(err);
    }
  };
  return (
    <>
      {isComment.length === 0 && (
        <form action={commentAdd} className="relative pb-4">
          <div className="flex justify-center items-center gap-4">
            <div className="w-[50px] h-[50px] rounded-full bg-secondary text-white flex justify-center items-center">
              {loggedAuth && getUser?.name.charAt(0)}
            </div>
            <input
              required
              name="comment"
              placeholder="Write your review..."
              className="rounded-sm w-full py-2 px-4 bg-transparent border focus:border-white outline-none"
            />
          </div>
          <CommentButton />
        </form>
      )}
    </>
  );
}

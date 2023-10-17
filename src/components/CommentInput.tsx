import React from "react";
import { toast } from "react-hot-toast";
import { api } from "~/utils/api";

interface CommentInputProps {
  postId: string;
}
const CommentInput = (props: CommentInputProps) => {
  const [comment, setComment] = React.useState<string>("");
  const ctx = api.useContext();
  const { mutate } = api.postComments.commentedOnPost.useMutation({
    onSuccess: () => {
      void ctx.posts.getAll.invalidate();
    },
    onError: () => {
      toast.error("Something went wrong, try logging in");
    },
  });
  return (
    <div>
      {/* <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              aria-hidden="true"
              className="h-5 w-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div> */}
      <input
        type="comment"
        id="comment"
        onChange={(e) => {
          setComment(e.target.value);
        }}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 focus:border-teal-500 focus:ring-teal-500"
        placeholder="comment"
        required
      />
      <button
        onClick={() => {
          void mutate({ postId: props.postId, content: comment });
        }}
        className="absolute bottom-3.5 right-4 mb-2 rounded-lg bg-teal-500 px-4 py-2 text-sm font-medium text-white hover:bg-teal-600 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-teal-500 dark:hover:bg-teal-600 dark:focus:ring-teal-800"
      >
        comment
      </button>
    </div>
  );
};

export default CommentInput;

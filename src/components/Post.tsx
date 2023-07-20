import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import relativeTime from "dayjs/plugin/relativeTime";
import type { PostComments, PostLikes, Posts, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { toast } from "react-hot-toast";
import CommentInput from "./CommentInput";
dayjs.extend(relativeTime);
type Post = {
  postId: string | undefined;
  post: Posts & {
    PostLikes: PostLikes[];
    PostComments: PostComments[];
    author: User;
  };
};

const PostView = (props: Post) => {
  const { data: sessionData } = useSession();
  const isPostLiked = props.post.PostLikes?.find(
    (like) => like.userId === sessionData?.user.id
  )
    ? true
    : false;
  const [isLiked, setIsLiked] = React.useState<boolean>(isPostLiked);
  const [isCommenting, setIsCommenting] = React.useState<boolean>(false);

  const ctx = api.useContext();
  const { mutateAsync: like } = api.postLikes.likedPost.useMutation({
    onSuccess: (data) => {
      console.log(data);
      void ctx.posts.getAll.invalidate();
    },
    onError: (err) => {
      console.log(err);
      toast.error("Something went wrong, try logging in");
    },
  });
  const { mutateAsync: dislike } = api.postLikes.unlikedPost.useMutation({
    onSuccess: (data) => {
      console.log(data);
      void ctx.posts.getAll.invalidate();
    },
    onError: (err) => {
      toast.error("Something went wrong, try logging in");

      console.log(err);
    },
  });
  const likeHandler = (
    post: Posts & {
      PostLikes: PostLikes[];
      PostComments: PostComments[];
      author: User;
    }
  ) => {
    const isLiked = post.PostLikes.find(
      (like) => like.userId === sessionData?.user.id
    );
    if (isLiked) {
      void dislike({ postId: post.id }).catch((err) => {
        console.log(err);
      });
      setIsLiked((prevState) => !prevState);
    } else {
      void like({ postId: post.id }).catch((err) => {
        console.log(err);
      });
      setIsLiked((prevState) => !prevState);
    }
  };

  if (!props.post) return <div>no data</div>;
  return (
    <div className="hover:bg-dark-lighter anim border-opacity-15 flex cursor-pointer p-3 ">
      {props.post && (
        <div className="h-12 w-12 flex-shrink-0 pt-1">
          <div className="relative">
            <div className="anim hover:bg-opacity-15 absolute bottom-0 left-0 right-0 top-0 z-10 rounded-full"></div>
            {props.post.author.image && props.post.author.name && (
              <Link href={`/${props.post.authorId}` || ""}>
                <Image
                  src={props.post.author.image}
                  alt={`${props.post.author.name}`}
                  className="asd h-12 w-12 min-w-full rounded-full border-2 border-teal-600 border-opacity-30"
                  width={46}
                  height={46}
                />
              </Link>
            )}
          </div>
        </div>
      )}
      <div className="relative flex-grow px-3 pb-1">
        {props.post.id && (
          <div>
            <Link href={`/post/${props.post.id}` || ""}>
              <div className="flex">
                <div className="flex flex-grow flex-wrap items-center">
                  <div className="text-gray-600">
                    <span className="">{props.post.author.name} · </span>
                    <span className="text-xs text-gray-400">
                      {dayjs(props.post.createdAt).fromNow()}
                    </span>
                  </div>
                </div>
                <button className="anim hover:bg-primary hover:bg-opacity-15 rounded-full px-1 py-1 text-white focus:bg-opacity-50 focus:outline-none">
                  {/* <ArrowDown height="1rem" /> */}
                </button>
              </div>
              <div className="pr-1">
                <div className="text-base font-semibold leading-5 text-gray-900">
                  {props.post.title}
                </div>
                <div className="text-xs leading-5 text-gray-500">
                  Location: {props.post.location}
                </div>
                <div className="text-xs leading-5 text-gray-500">
                  Description: {props.post.content}
                </div>
                <div className="mt-3 flex flex-wrap">
                  {props.post.image && (
                    <Image
                      src={props.post.image}
                      alt={`${props.post.title}`}
                      className="object-fill"
                      width={250}
                      height={100}
                    />
                  )}
                </div>
              </div>
            </Link>
          </div>
        )}
        <div className="mt-3 flex gap-4">
          {!isLiked ? (
            <div className="hover:text-primary anim   select-none items-center text-gray-500">
              <AiOutlineHeart
                size={22}
                className="mr-1"
                onClick={() => likeHandler(props.post)}
              />
              {/* <span className="ml-3 text-xs">
                {props.post.PostLikes.length}
              </span> */}
            </div>
          ) : (
            <div className="hover:text-primary anim  select-none items-center text-gray-500">
              <AiFillHeart
                size={22}
                className="mr-1"
                color="#FF3777"
                onClick={() => likeHandler(props.post)}
              />
              {/* <span className="ml-3 text-xs">
                {props.post.PostLikes.length}
              </span> */}
            </div>
          )}

          <div className="hover:text-primary anim flex flex-grow select-none items-center text-gray-500">
            <BiComment
              size={22}
              className="mr-1"
              onClick={() => setIsCommenting(!isCommenting)}
            />
            {/* <span className="ml-3 text-xs">
             
            </span> */}
          </div>
        </div>
        {isCommenting && props.post.id && (
          <div className="my-2">
            <CommentInput postId={props.post.id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostView;

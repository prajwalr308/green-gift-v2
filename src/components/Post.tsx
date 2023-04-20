import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import relativeTime from "dayjs/plugin/relativeTime";
import type { PostComments, PostLikes, Posts, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { toast } from "react-hot-toast";
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

  const ctx = api.useContext();
  const { mutateAsync: like, isLoading: isPosting } =
    api.postLikes.likedPost.useMutation({
      onSuccess: (data) => {
        console.log(data);
        void ctx.posts.getAll.invalidate();
      },
      onError: (err) => {
        toast.error("Something went wrong, try logging in");
      },
    });
  const { mutateAsync: dislike, isLoading: isUnliking } =
    api.postLikes.unlikedPost.useMutation({
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
    <div className="hover:bg-dark-lighter anim border-opacity-15 flex cursor-pointer border-b border-gray-100 p-3">
      {props.postId ? (
        <Link href={`/post/${props.postId}` || ""}>
          <div className="h-12 w-12 flex-shrink-0 pt-1">
            <div className="relative">
              <div className="anim hover:bg-opacity-15 absolute bottom-0 left-0 right-0 top-0 z-10 rounded-full hover:bg-black"></div>
              {props.post.author.image && props.post.author.name && (
                <Image
                  src={props.post.author.image}
                  alt={`${props.post.author.name}`}
                  className="asd h-12 w-12 min-w-full rounded-full"
                  width={48}
                  height={48}
                />
              )}
            </div>
          </div>
        </Link>
      ) : (
        <div>
          <div className="h-12 w-12 flex-shrink-0 pt-1">
            <div className="relative">
              <div className="anim hover:bg-opacity-15 absolute bottom-0 left-0 right-0 top-0 z-10 rounded-full hover:bg-black"></div>
              {props.post.author.image && props.post.author.name && (
                <Image
                  src={props.post.author.image}
                  alt={`${props.post.author.name}`}
                  className="asd h-12 w-12 min-w-full rounded-full"
                  width={48}
                  height={48}
                />
              )}
            </div>
          </div>
        </div>
      )}
      <div className="relative flex-grow px-3 pb-1">
        <div className="flex">
          <div className="flex flex-grow flex-wrap items-center">
            <div>
              <span className="text-gray-600">
                {props.post.author.name} ·{" "}
                {dayjs(props.post.createdAt).fromNow()}
              </span>
            </div>
          </div>
          <button className="anim hover:bg-primary hover:bg-opacity-15 rounded-full px-1 py-1 text-white focus:bg-opacity-50 focus:outline-none">
            {/* <ArrowDown height="1rem" /> */}
          </button>
        </div>
        <div className="pr-1">
          <span
            className="text-sm leading-5 text-gray-500"
            dangerouslySetInnerHTML={{ __html: props.post.content || "" }}
          ></span>
          <div className="mt-3 flex flex-wrap">
            {props.post.image && (
              <Image
                src={props.post.image}
                alt={`${props.post.title}`}
                className="w-full"
                width={298}
                height={198}
              />
            )}
          </div>
        </div>
        <div className="mt-3 flex">
          {!isLiked ? (
            <div className="hover:text-primary anim flex flex-grow select-none items-center text-gray-500">
              <AiOutlineHeart
                className="mr-1"
                onClick={() => likeHandler(props.post)}
              />
              <span className="ml-3 text-xs">
                {props.post.PostLikes.length}
              </span>
            </div>
          ) : (
            <div className="hover:text-primary anim flex flex-grow select-none items-center text-gray-500">
              <AiFillHeart
                className="mr-1"
                onClick={() => likeHandler(props.post)}
              />
              <span className="ml-3 text-xs">
                {props.post.PostLikes.length}
              </span>
            </div>
          )}

          <div className="hover:text-primary anim flex flex-grow select-none items-center text-gray-500">
            <BiComment className="mr-1" />
            <span className="ml-3 text-xs">
              {/* {data[0]?.PostLikes.length} */}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostView;

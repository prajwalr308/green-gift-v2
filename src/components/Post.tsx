import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiComment } from "react-icons/bi";

type Post = {
  postId: string;
  authorName: string;
  authorImage: string;
  postImage: string;
  postTitle: string;
  postContent: string;
  postLikes: number;
  postComments: unknown;
  postAuthorId: string;
  postCreatedAt: Date;
  postUpdatedAt: Date;
};

const PostView = (props: Post) => {
  return (
    <div className="hover:bg-dark-lighter anim border-opacity-15 flex cursor-pointer border-b border-gray-100 p-3">
      <Link href="/mhmdou1">
        <p className="h-12 w-12 flex-shrink-0 pt-1">
          <div className="relative">
            <div className="anim hover:bg-opacity-15 absolute bottom-0 left-0 right-0 top-0 z-10 rounded-full hover:bg-black"></div>
            {props.authorImage && props.authorName && (
              <Image
                src={props.authorImage}
                alt={`${props.authorName}`}
                className="asd h-12 w-12 min-w-full rounded-full"
                width={48}
                height={48}
              />
            )}
          </div>
        </p>
      </Link>
      <div className="relative flex-grow px-3 pb-1">
        <div className="flex">
          <div className="flex flex-grow flex-wrap items-center">
            <div>
              {/* <span className="mr-1 cursor-pointer font-bold text-white hover:underline">
              {data[0]?.author.name}
            </span> */}
              <span className="text-gray-600">
                {props.authorName} . 1 hrs ago
              </span>
            </div>
          </div>
          <button className="anim hover:bg-primary hover:bg-opacity-15 rounded-full px-1 py-1 text-white focus:bg-opacity-50 focus:outline-none">
            {/* <ArrowDown height="1rem" /> */}
          </button>
        </div>
        <div className="pr-1">
          <span
            className="text-white"
            dangerouslySetInnerHTML={{ __html: props.postContent || "" }}
          ></span>
          <div className="mt-3 flex flex-wrap">
            {props.postImage && (
              <Image
                src={props.postImage}
                alt={`${props.postTitle}`}
                className="w-full"
                width={298}
                height={198}
              />
            )}
          </div>
        </div>
        <div className="mt-3 flex">
          {true ? (
            <div className="hover:text-primary anim flex flex-grow select-none items-center text-gray-500">
              <AiOutlineHeart className="mr-1" />
              <span className="ml-3 text-xs">{props.postLikes}</span>
            </div>
          ) : (
            <div className="hover:text-primary anim flex flex-grow select-none items-center text-gray-500">
              <AiFillHeart className="mr-1" />
              <span className="ml-3 text-xs">
                {/* {data[0]?.PostLikes.length} */}
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

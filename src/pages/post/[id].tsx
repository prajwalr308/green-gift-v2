import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiComment } from "react-icons/bi";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const PostById: NextPage<PageProps> = ({ postId }) => {
  const { data, isLoading } = api.posts.getPostById.useQuery({
    postId: postId,
  });
  const { data: sessionData } = useSession();
  const ctx = api.useContext();
  const { mutate: like, isLoading: isPosting } =
    api.postLikes.likedPost.useMutation({
      onSuccess: (data) => {
        console.log(data);

        void ctx.posts.getAll.invalidate();
      },
      onError: (err) => {
        toast.error("Something went wrong, try logging in");

        console.log(err);
      },
    });
  const { mutate: dislike, isLoading: isUnliking } =
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
      dislike({ postId: post.id });
      return false;
    } else {
      like({ postId: post.id });
      return true;
    }
  };
  console.log("🚀 ~ file: [id].tsx:24 ~ data:", data);
  if (isLoading) return <div>loading...</div>;
  if (!data) return <div>Not found</div>;
  return (
    <>
      <Head>
        <title>{data[0]?.title}</title>
      </Head>

      <main className="flex justify-center">
        <PostView
          postId={undefined}
          postTitle={data[0]?.title as string}
          authorImage={data[0]?.author.image as string}
          authorName={data[0]?.author.name as string}
          postImage={data[0]?.image as string}
          postContent={data[0]?.content as string}
          postLikes={data[0]?.PostLikes.length as number}
          postComments={data[0]?.PostComments}
          postAuthorId={data[0]?.author.id as string}
          postCreatedAt={data[0]?.createdAt as Date}
          postUpdatedAt={data[0]?.updatedAt as Date}
          post={data[0]!}
        />
      </main>
    </>
  );
};

import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import SuperJSON from "superjson";
import Image from "next/image";
import Link from "next/link";
import PostView from "~/components/Post";
import { toast } from "react-hot-toast";
import { PostComments, PostLikes, Posts, User } from "@prisma/client";
import { useSession } from "next-auth/react";

export const getStaticProps: GetStaticProps<{ postId: string }> = async (
  context
) => {
  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: { prisma, session: null },
    transformer: SuperJSON, // optional - adds superjson serialization
  });
  const id = context.params?.id;
  if (typeof id !== "string") throw new Error("no id");
  await ssg.posts.getPostById.prefetch({ postId: id });
  return {
    props: {
      trpcState: ssg.dehydrate(),
      postId: id,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default PostById;

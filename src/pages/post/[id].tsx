import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const PostById: NextPage<PageProps> = ({ postId }) => {
  const { data, isLoading } = api.posts.getPostById.useQuery({
    postId: postId,
  });
  if (isLoading) return <div>loading...</div>;
  if (!data) return <div>Not found</div>;
  return (
    <>
      <Head>
        <title>{data[0]?.title}</title>
      </Head>

      <main className="flex justify-center">
        <PostView postId={undefined} post={data[0]!} />
      </main>
    </>
  );
};

import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import SuperJSON from "superjson";
import PostView from "~/components/Post";

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

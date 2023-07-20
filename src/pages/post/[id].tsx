import dayjs from "dayjs";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import relativeTime from "dayjs/plugin/relativeTime";
import { api } from "~/utils/api";

dayjs.extend(relativeTime);
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

      <main>
        <Navbar />
        <div className="flex justify-center">
          {/* <Link href="/" className="mt-4">
            <AiOutlineArrowLeft size={20} />
          </Link> */}
          {data[0] && ( // <-- this is the fix
            <div>
              <PostView postId={undefined} post={data[0]} />
              {data[0].PostComments.map((comment) => (
                <div key={comment.id} className="flex justify-around ">
                  <div>
                    <div className="text-sm text-gray-600">
                      {comment.user.name} · {dayjs(comment.createdAt).fromNow()}
                    </div>
                    <div>{comment.content}</div>
                  </div>
                  <div className="text-gray-600"></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import SuperJSON from "superjson";
import PostView from "~/components/Post";
import Link from "next/link";
import { AiFillCaretLeft, AiOutlineArrowLeft } from "react-icons/ai";
import Navbar from "~/components/Navbar";

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

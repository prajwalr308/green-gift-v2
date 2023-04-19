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
  console.log("🚀 ~ file: [id].tsx:24 ~ data:", data);
  if (isLoading) return <div>loading...</div>;
  if (!data) return <div>Not found</div>;
  return (
    <>
      <Head>
        <title>{data[0]?.title}</title>
      </Head>

      <main className="flex justify-center">
        <div className="hover:bg-dark-lighter anim border-opacity-15 flex cursor-pointer border-b border-gray-100 p-3">
          <Link href="/mhmdou1">
            <p className="h-12 w-12 flex-shrink-0 pt-1">
              <div className="relative">
                <div className="anim hover:bg-opacity-15 absolute bottom-0 left-0 right-0 top-0 z-10 rounded-full hover:bg-black"></div>
                {data[0]?.author.image && data[0]?.author.name && (
                  <Image
                    src={data[0]?.author.image}
                    alt={`${data[0]?.author.name}`}
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
                    {data[0]?.author.name} . 1 hrs ago
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
                dangerouslySetInnerHTML={{ __html: data[0]?.content || "" }}
              ></span>
              <div className="mt-3 flex flex-wrap">
                {data[0]?.image && (
                  <Image
                    src={data[0]?.image}
                    alt={`${data[0]?.title}`}
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
                  <span className="ml-3 text-xs">
                    {data[0]?.PostLikes.length}
                  </span>
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
                  {data[0]?.PostLikes.length}
                </span>
              </div>
            </div>
          </div>
        </div>
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

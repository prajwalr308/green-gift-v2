import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const ProfilePage: NextPage<PageProps> = ({ userId }) => {
  const { data, isLoading } = api.profile.getUserByUserId.useQuery({
    userId: userId,
  });
  const { data: postData, isLoading: isPostLoading } =
    api.posts.getPostByUserId.useQuery({
      userId: userId,
    });
  if (isLoading) return <div>loading...</div>;
  if (!data) return <div>Not found</div>;
  return (
    <>
      <Head>
        <title>{data.name}</title>
      </Head>

      <main>
        <Navbar />
        <div className="flex justify-center">
          <div className="w-1/2 md:max-w-3xl">
            <div className="h-40 min-h-screen bg-teal-600 bg-opacity-30">
              <div className="container mx-auto h-40 ">
                <div className="relative h-40 ">
                  <div className="h-40 ">
                    {/* <Link href="/" className="mt-4">
                      <AiOutlineArrowLeft size={30} color="white" />
                    </Link> */}
                  </div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 transform ">
                    {typeof data.image == "string" &&
                      typeof data.name === "string" && (
                        <Image
                          src={data.image}
                          alt={`${data.name}'s profile`}
                          className="mx-auto mb-4 rounded-full border-4 border-white"
                          width={128}
                          height={128}
                        />
                      )}
                  </div>
                </div>
                <div className="mb-4 text-center">
                  <h2 className="text-xl font-semibold">{data.name}</h2>
                  <p className="text-gray-600">{data.email}</p>
                </div>
                <div>
                  {postData?.map((post) => (
                    <div
                      key={post.id}
                      className="mb-4 rounded bg-white p-5 shadow"
                    >
                      <h3 className="mb-2 text-lg font-semibold">
                        {post.title}
                      </h3>
                      <p className="mb-2 text-gray-700">{post.content}</p>
                      <Image
                        src={post.image}
                        alt={`${post.title}`}
                        className="h-auto w-full"
                        width={298}
                        height={198}
                      />
                    </div>
                  ))}
                </div>
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
import { AiOutlineArrowLeft } from "react-icons/ai";
import Navbar from "~/components/Navbar";

export const getStaticProps: GetStaticProps<{ userId: string }> = async (
  context
) => {
  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: { prisma, session: null },
    transformer: SuperJSON, // optional - adds superjson serialization
  });
  const slug = context.params?.slug;
  if (typeof slug !== "string") throw new Error("no slug");
  await ssg.profile.getUserByUserId.prefetch({ userId: slug });
  return {
    props: {
      trpcState: ssg.dehydrate(),
      userId: slug,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default ProfilePage;

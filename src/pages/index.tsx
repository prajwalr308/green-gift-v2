import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import Image from "next/image";
import AddPosts from "~/components/AddPosts";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { PostComments, PostLikes, Posts } from "@prisma/client";
import Sidebar from "~/components/SideBar";
import PostView from "~/components/Post";

const Home: NextPage = () => {
  const { data, isLoading } = api.posts.getAll.useQuery();
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

  if (isLoading) return <div>loading...</div>;
  if (!data) return <div>no data</div>;
  console.log(data);
  return (
    <>
      <Head>
        <title>GreenGift</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex">
        <div className="flex w-full">
          <div className="w-1/10 flex-grow"></div>
          <div className="w-2/10 flex-grow">
            <Sidebar />
          </div>
          <div className="w-4/10 flex-grow">
            <div className="flex ">
              <Navbar />
            </div>
            {/* <div className="flex"> */}
            <div className="">
              {data?.map((post) => (
                <div
                  key={post.id}
                  className="flex  justify-center rounded-lg bg-white shadow-md"
                >
                  {/* <div className="p-4">
                    <div className="mb-2 font-bold">Title: {post.title}</div>
                    <div className="mb-4">desc: {post.content}</div>
                    <div className="mb-2 text-sm text-gray-500">
                      Location: {post.location}
                    </div>
                    {post.image && (
                      <div className="mb-4 flex justify-center">
                        <Image
                          src={post.image}
                          alt="profile"
                          width={700}
                          height={298}
                          className="rounded-lg shadow-md"
                        />
                      </div>
                    )}
                    <button
                      onClick={() => likeHandler(post)}
                      className="rounded-full font-semibold text-black no-underline transition"
                    >
                      Like:{post.PostLikes.length}
                    </button>
                    <div>
                      <Link href={`/post/${post.id}`}>link</Link>
                    </div>
                  </div> */}
                  <PostView 
                  postId={post.id}
                  post={post} />
                </div>
              ))}
            </div>
            {/* </div> */}
          </div>
          <div className="w-3/10 flex-grow"></div>
        </div>
      </main>
    </>
  );
};

export default Home;

const Navbar: React.FC = () => {
  const { data: sessionData } = useSession();
  const [showModal, setShowModal] = React.useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="w-full border-slate-400">
      <div className="flex gap-5 border-b border-slate-400 p-4">
        <div className=" flex w-full gap-3">
          {sessionData ? (
            <Link href={`/${sessionData?.user.id}`}>
              <Image
                src={sessionData?.user.image || ""}
                alt="profile"
                width={48}
                height={18}
                className="gap-3 rounded-full"
              />
            </Link>
          ) : (
            <div className="mb-12"></div> //put logo here later
          )}
        </div>
        <button
          className=" rounded-full font-semibold text-black no-underline transition"
          onClick={() => setShowModal(true)}
        >
          Create
        </button>
        <AddPosts
          showModal={showModal}
          setShowModal={setShowModal}
          openModal={openModal}
          closeModal={closeModal}
        />
        <button className=" rounded-full font-semibold text-black no-underline transition">
          posts
        </button>
        <button
          className={
            sessionData
              ? `w-2/12  rounded bg-red-500 font-semibold  text-white hover:bg-red-600`
              : `w-2/12  rounded bg-blue-500  font-semibold text-white hover:bg-blue-600`
          }
          onClick={sessionData ? () => void signOut() : () => void signIn()}
        >
          {sessionData ? "Sign out" : "Sign in"}
        </button>
      </div>
    </div>
  );
};

import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import Image from "next/image";
import AddPosts from "~/components/AddPosts";
import React from "react";
import Sidebar from "~/components/SideBar";
import PostView from "~/components/Post";
import Navbar from "~/components/Navbar";
import Layout from "~/components/Layout";

const Home: NextPage = () => {
  const { data, isLoading } = api.posts.getAll.useQuery();

  if (isLoading)
    return (
      <Layout>
        <div className="flex min-h-screen  justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-solid border-teal-500"></div>
        </div>
      </Layout>
    );
  if (!data) return <div>no data</div>;
  return (
    <>
      {/* <div className="flex"> */}
      <Layout>
        <div className="mx-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data?.map((post) => (
            <div key={post.id} className="rounded-lg bg-white shadow-lg">
              <PostView postId={post.id} post={post} />
            </div>
          ))}
        </div>
      </Layout>
    </>
  );
};

export default Home;

// const Navbar: React.FC = () => {
//   const { data: sessionData } = useSession();
//   const [showModal, setShowModal] = React.useState(false);
//   const openModal = () => setShowModal(true);
//   const closeModal = () => setShowModal(false);

//   return (
//     <div className="w-full border-slate-400">
//       <div className="flex gap-5 border-b border-slate-400 p-4">
//         <div className=" flex w-full gap-3">
//           {sessionData ? (
//             <Link href={`/${sessionData?.user.id}`}>
//               <Image
//                 src={sessionData?.user.image || ""}
//                 alt="profile"
//                 width={48}
//                 height={18}
//                 className="gap-3 rounded-full"
//               />
//             </Link>
//           ) : (
//             <div className="my-5">
//               {" "}
//               <Image
//                 src="/Green-gift-logo.png"
//                 alt="logo"
//                 width={160}
//                 height={100}
//               ></Image>{" "}
//             </div> //put logo here later
//           )}
//         </div>
//         <button
//           className=" rounded-full font-semibold text-black no-underline transition"
//           onClick={() => setShowModal(true)}
//         >
//           Create
//         </button>
//         <AddPosts
//           showModal={showModal}
//           setShowModal={setShowModal}
//           openModal={openModal}
//           closeModal={closeModal}
//         />
//         <button className=" rounded-full font-semibold text-black no-underline transition">
//           posts
//         </button>
//         <button
//           className={
//             sessionData
//               ? `w-2/12  rounded bg-red-500 font-semibold  text-white hover:bg-red-600`
//               : `w-2/12  rounded bg-blue-500  font-semibold text-white hover:bg-blue-600`
//           }
//           onClick={sessionData ? () => void signOut() : () => void signIn()}
//         >
//           {sessionData ? "Sign out" : "Sign in"}
//         </button>
//       </div>
//     </div>
//   );
// };

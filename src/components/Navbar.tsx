import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import AddPosts from "~/components/AddPosts";

const Navbar: React.FC = () => {
  const { data: sessionData } = useSession();
  const [showModal, setShowModal] = React.useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="mb-5">
      <div className="mx-12 flex items-center justify-between py-4 ">
        <div className="">
          <Image
            src="/Green-gift-logo.png"
            alt="logo"
            width={160}
            height={50}
          ></Image>
        </div>
        <div className="rounded-3xl bg-neutral-100 px-12 py-4 shadow-sm">
          <ul className="flex justify-center gap-10">
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
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
            </li>
            <li>
              <button className=" rounded-full font-semibold text-black no-underline transition">
                Posts
              </button>
            </li>
            <li>
              <Link href={"/"}>About</Link>
            </li>
            <li>
              <Link href={"/"}>Contact</Link>
            </li>
          </ul>
        </div>
        <div className="basis-1/12">
          <div className="flex gap-2">
            {sessionData ? (
              <Link href={`/${sessionData?.user.id}`}>
                <Image
                  src={sessionData?.user.image || ""}
                  alt="profile"
                  width={48}
                  height={20}
                  className="gap-3 rounded-full"
                />
              </Link>
            ) : (
              <div></div> //put logo here later
            )}
            <button
              className={
                sessionData
                  ? `  w-32  rounded-3xl bg-red-500 font-semibold  text-white hover:bg-red-600`
                  : ` h-10 w-32 rounded-3xl bg-blue-500  font-semibold text-white hover:bg-blue-600`
              }
              onClick={sessionData ? () => void signOut() : () => void signIn()}
            >
              {sessionData ? "Sign out" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
    // <div className=" border-slate-400">
    //   <div className="mx-10 flex gap-5 border-b border-slate-400 p-4">
    //     <div className="flex w-full gap-3">
    //       {sessionData ? (
    //         <Link href={`/${sessionData?.user.id}`}>
    //           <Image
    //             src={sessionData?.user.image || ""}
    //             alt="profile"
    //             width={48}
    //             height={18}
    //             className="gap-3 rounded-full"
    //           />
    //         </Link>
    //       ) : (
    //         <div className="my-5">
    //           {" "}
    //           <Image
    //             src="/Green-gift-logo.png"
    //             alt="logo"
    //             width={160}
    //             height={100}
    //           ></Image>{" "}
    //         </div> //put logo here later
    //       )}
    //     </div>
    //     <button
    //       className=" rounded-full font-semibold text-black no-underline transition"
    //       onClick={() => setShowModal(true)}
    //     >
    //       Create
    //     </button>
    //     <AddPosts
    //       showModal={showModal}
    //       setShowModal={setShowModal}
    //       openModal={openModal}
    //       closeModal={closeModal}
    //     />
    //     <button className=" rounded-full font-semibold text-black no-underline transition">
    //       posts
    //     </button>
    //     <button
    //       className={
    //         sessionData
    //           ? `w-2/12  rounded bg-red-500 font-semibold  text-white hover:bg-red-600`
    //           : `w-2/12  rounded bg-blue-500  font-semibold text-white hover:bg-blue-600`
    //       }
    //       onClick={sessionData ? () => void signOut() : () => void signIn()}
    //     >
    //       {sessionData ? "Sign out" : "Sign in"}
    //     </button>
    //   </div>
    // </div>
  );
};

export default Navbar;

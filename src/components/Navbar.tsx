import { signIn, signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AddPosts from "~/components/AddPosts";

const Navbar: React.FC = () => {
  const { data: sessionData } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="mb-5">
      <div className="mx-12 flex items-center justify-between py-4 ">
        {!isOpen ? (
          <div className="fixed top-5 z-20    lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              <div className="mb-1 h-1 w-6 rounded bg-gray-600"></div>
              <div className="mb-1 h-1 w-6 rounded bg-gray-600"></div>
              <div className="h-1 w-6 rounded bg-gray-600"></div>
            </button>
          </div>
        ) : (
          <div className="fixed top-5 z-20 lg:hidden">
            {/* Close ('X') Button */}
            <button onClick={() => setIsOpen(!isOpen)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-8 w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
        )}
        <div className="hidden lg:block">
          <Image
            src="/Green-gift-logo.png"
            alt="logo"
            width={160}
            height={50}
          ></Image>
        </div>
        <div className="hidden rounded-3xl bg-neutral-100 px-12 py-4 shadow-sm lg:flex">
          <ul className="text-md flex justify-center gap-10 rounded-full font-normal transition">
            <li>
              <Link
                href={"/"}
                className="hover:text-teal-600 hover:underline hover:underline-offset-8"
              >
                Home
              </Link>
            </li>
            <li>
              <button
                className="hover:text-teal-600 hover:underline hover:underline-offset-8"
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
              <button className="hover:text-teal-600 hover:underline hover:underline-offset-8">
                Posts
              </button>
            </li>
            <li>
              <Link
                href={"/"}
                className="hover:text-teal-600 hover:underline hover:underline-offset-8"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href={"/"}
                className="hover:text-teal-600 hover:underline hover:underline-offset-8"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        {/* sidebar */}
        {isOpen && (
          <div className="fixed bottom-0 left-0 right-2/3 top-0 z-10  bg-white p-4 shadow-md lg:hidden ">
            <div className="ml-16 mt-10">
              <Link
                href={"/"}
                className="mb-4 block hover:text-teal-600 hover:underline"
              >
                Home
              </Link>
              <button
                onClick={() => setShowModal(true)}
                className="mb-4 block hover:text-teal-600 hover:underline"
              >
                Create
              </button>
              <button className="mb-4 block hover:text-teal-600 hover:underline">
                Posts
              </button>
              <Link
                href={"/"}
                className="mb-4 block hover:text-teal-600 hover:underline"
              >
                About
              </Link>
              <Link
                href={"/"}
                className="mb-4 block hover:text-teal-600 hover:underline"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
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
            <div className="absolute top-5 right-5 lg:block lg:static">
            <button
              className={
                sessionData
                  ? `   w-32 rounded-3xl  bg-red-500 font-semibold text-white hover:bg-red-600   `
                  : ` h-10 w-32 rounded-3xl  bg-teal-600 font-semibold text-white hover:bg-teal-600  `
              }
              onClick={sessionData ? () => void signOut() : () => void signIn()}
            >
              {sessionData ? "Sign out" : "Sign in"}
            </button>
            </div>
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

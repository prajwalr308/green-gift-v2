// components/Sidebar.js
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Profile", href: `/${session?.user.id as string}` },
    { name: "Messages", href: "/messages" },
    { name: "Notifications", href: "/notifications" },
  ];

  return (
    <nav className="relative">
      {/* Mobile view */}
      <div className="flex items-center justify-between px-4 py-2  lg:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          <div className="mb-1 h-1 w-6 rounded bg-gray-600"></div>
          <div className="mb-1 h-1 w-6 rounded bg-gray-600"></div>
          <div className="h-1 w-6 rounded bg-gray-600"></div>
        </button>
      </div>

      {/* Full menu for larger screens */}
      <ul
        className={`absolute left-0 top-full h-screen w-64 transform bg-white p-4 shadow-lg transition-transform md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:flex md:translate-x-0 md:space-x-4`}
      >
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={`my-2 ${
              router.pathname === item.href
                ? "bg-gray-200 text-blue-600"
                : "hover:bg-gray-200"
            }`}
          >
            <Link href={item.href}>
              <p className="block rounded-md px-4 py-2 font-semibold transition-colors">
                {item.name}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;

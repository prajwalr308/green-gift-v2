// components/Sidebar.js
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Profile", href: `/${session?.user.id as string}` },
    { name: "Messages", href: "/messages" },
    { name: "Notifications", href: "/notifications" },
  ];

  return (
    <nav className="h-screen p-4">
      <ul className="menu-items">
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={`menu-item my-2 ${
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

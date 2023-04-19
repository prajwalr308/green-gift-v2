// components/Sidebar.js
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Profile", href: "/profile" },
    { name: "Messages", href: "/messages" },
    { name: "Notifications", href: "/notifications" },
  ];

  return (
    <nav className="min-h-screen  bg-gray-100 p-4">
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

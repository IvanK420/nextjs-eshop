import Link from "next/link";
import CartLink from "./CartLink";
function NavBar() {
  return (
    <div className="navbar bg-base-300 shadow-sm   ">
      <div className="flex-1">
        <Link href={"/"} className="btn btn-ghost text-xl">
          Accueil
        </Link>
      </div>
      <div className="divider"></div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href={"/admin"}>Admin</Link>
          </li>
          <li>
          <CartLink></CartLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;

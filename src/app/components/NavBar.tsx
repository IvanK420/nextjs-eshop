import Link from "next/link";
import BasketHeader from "./basketHeader";

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
            {" "}
            <BasketHeader></BasketHeader>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;

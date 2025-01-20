'use client';
import Link from "next/link";

import Styles from "./navbar.module.css";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  return (
    <div className={Styles.navbar}>
      <div className={Styles.logo}>ShopEase</div>
      <div className={Styles.navLinks}>
        <Link legacyBehavior href="/">
          <a className={router.pathname == "/" ? Styles.active : Styles.navbar_link}>_home</a>
        </Link>

        <Link legacyBehavior href="/orders">
          <a className={router.pathname == "/orders" ? Styles.active : Styles.navbar_link}>_orders</a>
        </Link>

        <Link legacyBehavior href="/cart">
          <a className={router.pathname == "/cart" ? Styles.active : Styles.navbar_link}>_cart</a>
        </Link>
      </div>
      
    </div>
  );
};

export default Navbar;

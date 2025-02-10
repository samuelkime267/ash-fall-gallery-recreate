import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 flex justify-between items-center p-4 z-30 bg-blend-multiply">
      <Link href={"/"}>All Blue</Link>

      <Link href={"https://samuelkime.netlify.app/"} target="_blank">
        Portfolio
      </Link>
    </nav>
  );
}

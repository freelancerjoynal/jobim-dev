import React from "react";
import Image from "next/image";
import logo from "@/app/assets/Logo.png"; // Replace with your actual path
import Link from "next/link";
import HamburgerMenu from "./HamburgerMenu";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-[#720ADA] to-[#EF892B] sticky top-0 z-50 border-b">
      <div className="container mx-auto py-4 text-center">
        <div className="flex justify-between items-center">
          <div></div>
          <div>
            <Link href="/">
              <Image
                src={logo}
                alt="Jobim Logo"
                width={180}
                height={0}
                style={{ height: "auto", maxWidth: "100%", margin: "0 auto" }}
              />
            </Link>
          </div>
          <div>
            <HamburgerMenu/>
          </div>
        </div>
      </div>
    </header>
  );
}

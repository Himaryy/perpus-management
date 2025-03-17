"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Header = () => {
  const pathName = usePathname();
  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/">
        <Image src="/icons/logo.svg" width={40} height={40} alt="logo" />
      </Link>

      <ul className="flex flex-row items-center gap-8">
        <li>
          <Link
            className={cn(
              "text-base cursor-pointer capitalize",
              pathName === "/library" ? "text-light-200" : "text-light-100"
            )}
            href="/"
          >
            Library
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;

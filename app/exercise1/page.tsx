"use client";

import dynamic from "next/dynamic";
const Range = dynamic(() => import("@/app/exercise1/range"), { ssr: false });

export default function Home() {
  return (
    <>
      <Range />
    </>
  );
}

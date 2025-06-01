"use client";
import FindViaAgent from "@/components/FindViaAgent";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const FindByAgent = () => {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [router, status]);
  return (
    <>
      <Navbar />
      <FindViaAgent />
    </>
  );
};

export default FindByAgent;

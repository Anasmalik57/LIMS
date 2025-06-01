"use client";
import FindViaDate from "@/components/FindViaDate";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const FindByDate = () => {
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
      <FindViaDate />
    </>
  );
};

export default FindByDate;

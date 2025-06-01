"use client";
import Navbar from "@/components/Navbar";
import ReportLists from "@/components/ReportLists";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const ReportsHere = () => {
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
      <ReportLists />
    </>
  );
};

export default ReportsHere;

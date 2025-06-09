"use client";
import AllBillsComponent from "@/components/AllBillsComponent";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AllBills = () => {
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
      <AllBillsComponent />
      <Footer />
    </>
  );
};

export default AllBills;

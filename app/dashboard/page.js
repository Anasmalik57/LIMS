"use client";
import DashboardData from "@/components/DashboarData";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Dashboard = () => {
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
      <DashboardData />
    </>
  );
};

export default Dashboard;

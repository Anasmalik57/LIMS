"use client";
import ReportPDF from "@/components/ReportPDF";

import React from "react";

const ReportPage = () => {
  //   const { data: session, status, update } = useSession();
  // const router = useRouter();

  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.push("/");
  //   }
  // }, [router, status]);
  return (
    <>
      <ReportPDF />
    </>
  );
};

export default ReportPage;

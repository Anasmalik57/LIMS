"use client"
import { useQRCode } from "next-qrcode";
import React from "react";

const QRCode = ({param}) => {
  const { SVG } = useQRCode();
  return (
    <>
      <SVG
        text={param}
        options={{
          margin: 2,
          width: 70,
          color: {
           dark: "#000000", // black color for dark parts
            light: "#FFFFFF", // white color for light parts
          },
        }}
      />
    </>
  );
};

export default QRCode;

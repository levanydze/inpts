"use client";
import React from "react";
import Login from "./Login";

export default function NoData() {
  return (
    <div className="notSigned">
      <p className="">You need to log in order to access your data</p>
      <div>
        <Login />
      </div>
    </div>
  );
}

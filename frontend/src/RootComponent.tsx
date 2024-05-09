"use client";
/* Release: ee65b719 (Latest – unreleased) */

import classNames from "classnames";
import * as SubframeCore from "@subframe/core";
import React, { useRef, useState, useEffect } from "react";

import { useUserStateContext } from "./context/UserStateContext";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import { init, Form } from "@feathery/react";
import Onboarding from "./pages/onboarding";
import posthog from "posthog-js";

posthog.init("phc_GklsIGZF6U38LCVs4D5oybUhjbmFAIxI4gNxVye1dJ4", {
  api_host: "https://app.posthog.com",
});

function RootComponent() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { bearer, completedOnboarding, authStateLoading, email, userId } =
    useUserStateContext();

  const [leads, setLeads] = useState<any[]>([]);

  if (!authStateLoading) {
    posthog.identify(userId, {
      email: email,
    });
  }

  return (
    <>
      {!completedOnboarding ? (
        <>
          {!authStateLoading ? (
            <Routes>
              <Route path="/" element={<Onboarding />} />
            </Routes>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<div>App</div>} />
          </Routes>
        </>
      )}
    </>
  );
}

export default RootComponent;

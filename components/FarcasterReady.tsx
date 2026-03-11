"use client";

import { useEffect } from "react";

export default function FarcasterReady() {
  useEffect(() => {
    import("@farcaster/frame-sdk").then(({ sdk }) => {
      sdk.actions.ready();
    }).catch(() => {
      // Not in a Farcaster context — safe to ignore
    });
  }, []);

  return null;
}

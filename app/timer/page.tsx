import type { Metadata } from "next";
import { Timer } from "@/components/timer/Timer";

export const metadata: Metadata = {
  title: "Timer",
  description:
    "A WCA-style 3x3 speedcube timer with hold-to-ready, optional 15s inspection, live scrambles, and ao5/ao12/PB tracking.",
};

export default function TimerPage() {
  return <Timer />;
}

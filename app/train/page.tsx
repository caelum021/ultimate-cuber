import type { Metadata } from "next";
import { Trainer } from "@/components/train/Trainer";

export const metadata: Metadata = {
  title: "Train",
  description:
    "Practice speedcube algorithms: see a random case, recall the algorithm, then reveal to check. OLL, PLL, WVLS, CMLL, and 2×2.",
};

export default function TrainPage() {
  return <Trainer />;
}

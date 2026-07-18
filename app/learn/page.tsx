import type { Metadata } from "next";
import { LearnHub } from "@/components/learn/LearnHub";

export const metadata: Metadata = {
  title: "Learn",
  description:
    "Learn CFOP: cross, F2L, 2-look OLL and 2-look PLL algorithm sets, and the habits that take you to sub-20.",
};

export default function LearnPage() {
  return <LearnHub />;
}

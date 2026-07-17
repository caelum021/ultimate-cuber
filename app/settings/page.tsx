import type { Metadata } from "next";
import { SettingsPanel } from "@/components/settings/SettingsPanel";

export const metadata: Metadata = {
  title: "Settings",
  description: "Adjust your timer (inspection, hold time, scramble length) and site theme.",
};

export default function SettingsPage() {
  return <SettingsPanel />;
}

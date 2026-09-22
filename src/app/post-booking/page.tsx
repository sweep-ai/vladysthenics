import type { Metadata } from "next";
import { PostBookingPage } from "@/components/PostBookingPage";

export const metadata: Metadata = {
  title: "You're Almost There | Vladysthenics",
  robots: { index: false, follow: false },
};

export default function PostBookingRoute() {
  return <PostBookingPage />;
}
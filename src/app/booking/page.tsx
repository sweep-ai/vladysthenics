import type { Metadata } from "next";
import { BookingPage } from "@/components/BookingPage";

export const metadata: Metadata = {
  title: "Book Your Strategy Call | Vladysthenics",
  robots: { index: false, follow: false },
};

export default function BookingRoute() {
  return <BookingPage />;
}
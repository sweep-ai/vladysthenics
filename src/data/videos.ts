import { vslPoster } from "./assets";

export type VideoConfig = {
  placement: "funnel" | "postBookingPreface";
  provider: "youtube";
  youtubeId: string;
  poster: string;
  title: string;
};

/** Primary VSL — https://youtu.be/fKu8PHMj010 */
export const funnelVsl: VideoConfig = {
  placement: "funnel",
  provider: "youtube",
  youtubeId: "fKu8PHMj010",
  poster: vslPoster,
  title: "Vladysthenics — Watch Before You Apply",
};

export const postBookingPreface: VideoConfig = {
  placement: "postBookingPreface",
  provider: "youtube",
  youtubeId: "fKu8PHMj010",
  poster: vslPoster,
  title: "Welcome — what to do before your call",
};

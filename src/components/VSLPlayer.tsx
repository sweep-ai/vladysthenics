"use client";

import type { VideoConfig } from "@/data/videos";

type Props = {
  config: VideoConfig;
  id?: string;
};

export function VSLPlayer({ config, id }: Props) {
  const muted = config.placement === "postBookingPreface" ? 1 : 0;

  return (
    <section className="vsl" id={id}>
      <div className="vsl__frame">
        <iframe
          className="vsl__iframe"
          src={`https://www.youtube.com/embed/${config.youtubeId}?autoplay=1&mute=${muted}&rel=0&modestbranding=1`}
          title={config.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </section>
  );
}

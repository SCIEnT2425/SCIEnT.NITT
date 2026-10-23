import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Users } from "lucide-react";
import { optimizedImage } from "../utils/optimizedImage";

// One club on the Clubs page: logo on a black tile (most logo files have a black
// background baked in), name and project count. A real link, so it works
// with the keyboard and "open in new tab". Spacing and borders use bracket
// values: Bootstrap's utilities are !important and would override Tailwind's.
export default function ClubCard({ club }) {
  const [logoError, setLogoError] = useState(false);
  const count = club.projectCount;

  return (
    <Link
      to={`/clubs/${encodeURIComponent(club.name)}/projects`}
      className="group/club flex h-full flex-col items-center gap-[14px] rounded-2xl border-[1px] border-zinc-800 bg-zinc-950 p-[24px] text-center no-underline transition-colors duration-300 hover:border-zinc-600"
    >
      <div className="flex h-[96px] w-[96px] items-center justify-center rounded-[18px] border-[1px] border-zinc-800 bg-black p-[8px] transition-transform duration-300 group-hover/club:-translate-y-0.5">
        {club.logo && !logoError ? (
          <img
            src={optimizedImage(club.logo, 300)}
            alt=""
            loading="lazy"
            className="max-h-full max-w-full rounded-[10px] object-contain"
            onError={() => setLogoError(true)}
          />
        ) : (
          <Users className="h-10 w-10 text-zinc-400" strokeWidth={1.5} aria-hidden="true" />
        )}
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="m-0 text-[15px] font-semibold uppercase tracking-[0.06em] text-zinc-50 transition-colors group-hover/club:text-[#facc15]">
          {club.name}
        </h2>
        {typeof count === "number" && (
          <p className="m-0 text-xs text-zinc-400">
            {count} {count === 1 ? "project" : "projects"}
          </p>
        )}
      </div>
    </Link>
  );
}

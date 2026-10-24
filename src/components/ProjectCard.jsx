import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FolderKanban } from "lucide-react";
import { optimizedImage } from "../utils/optimizedImage";

// One project in a club's year row: photo, year, name, short description.
// The whole card is a link. Spacing and borders use bracket values: Bootstrap's
// utilities are !important and would override Tailwind's.
const ProjectCard = ({ project }) => {
  const { name } = useParams();
  const [imgError, setImgError] = useState(false);

  if (!project) return null;

  const imageUrl = project.image?.url || (typeof project.image === "string" ? project.image : "");

  return (
    <Link
      to={`/clubs/${encodeURIComponent(name)}/projects/${project._id}`}
      className="group/project flex w-[280px] shrink-0 flex-col overflow-hidden rounded-2xl border-[1px] border-zinc-800 bg-zinc-950 no-underline transition-colors duration-300 hover:border-zinc-600"
    >
      <div className="aspect-[16/10] overflow-hidden bg-zinc-900">
        {imageUrl && !imgError ? (
          <img
            src={optimizedImage(imageUrl, 600)}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover/project:scale-[1.03]"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <FolderKanban className="h-12 w-12 text-zinc-700" strokeWidth={1.5} aria-hidden="true" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 px-[18px] pt-[16px] pb-[16px]">
        {project.year && (
          <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#facc15]">{project.year}</p>
        )}
        <h3 className="m-0 line-clamp-2 text-[16px] font-semibold leading-snug text-zinc-50">
          {project.name || "Untitled project"}
        </h3>
        <p className="m-0 line-clamp-2 text-[13px] leading-normal text-zinc-400">
          {project.description || "No description yet."}
        </p>
        <p className="m-0 mt-auto pt-[10px] text-xs font-semibold uppercase tracking-[0.12em] text-zinc-400 transition-colors group-hover/project:text-[#facc15]">
          View project →
        </p>
      </div>
    </Link>
  );
};

export default ProjectCard;

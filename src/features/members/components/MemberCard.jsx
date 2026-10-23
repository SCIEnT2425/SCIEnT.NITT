import React, { useState } from 'react';
import { Mail, Linkedin, Instagram, User, X } from 'lucide-react';
import { departmentCode } from '../data/teamStructure';
import '../styles/MembersCard.css';

// Shorter sub-team names for the role line
const SUBTEAM_LABELS = {
    'Corporate Communications': 'CC',
    'Corporate Communication': 'CC',
};

// Core members show only their special role
const isCoreSubteam = subteam => subteam === 'Cores' || subteam === 'Core';

// Front shows photo, role, name and department; tapping the card (or About)
// flips it to the back with the bio, team year and links.
// Spacing and borders use bracket values: Bootstrap's px-5/pt-5/border
// utilities are !important and would override Tailwind's.
const MemberCard = ({ member }) => {
    const [imgError, setImgError] = useState(false);
    const [flipped, setFlipped] = useState(false);

    const team = member.subteam && !isCoreSubteam(member.subteam)
        ? SUBTEAM_LABELS[member.subteam] || member.subteam
        : null;
    const roleLine = [member.role || 'Member', team].filter(Boolean).join(' · ');
    const department = departmentCode(member.Department);
    const hasPhoto = member.photoUrl && !imgError;

    const links = [
        member.email && { href: `mailto:${member.email}`, label: 'Email', Icon: Mail },
        member.linkedin && { href: member.linkedin, label: 'LinkedIn', Icon: Linkedin, external: true },
        member.instagram && { href: member.instagram, label: 'Instagram', Icon: Instagram, external: true },
    ].filter(Boolean);

    // Taps on the card flip it; links and buttons inside keep their own behaviour
    const handleCardClick = (e) => {
        if (e.target.closest('a, button')) return;
        setFlipped(prev => !prev);
    };

    const linkRow = (
        <div className="-ml-[13px] flex">
            {links.map(({ href, label, Icon, external }) => (
                <a
                    key={label}
                    href={href}
                    aria-label={`${member.name} on ${label}`}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="flex h-11 w-11 items-center justify-center text-zinc-400 transition-colors hover:text-[#facc15]"
                >
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden="true" />
                </a>
            ))}
        </div>
    );

    return (
        // Named group: GalleryPage.css styles every `.group img` site-wide
        <article className="memberCard group/card cursor-pointer" onClick={handleCardClick}>
            <div className={`memberCard__inner${flipped ? ' is-flipped' : ''}`}>

                {/* ── Front ── */}
                <div className="memberCard__face flex flex-col" inert={flipped ? '' : undefined}>
                    <div className="memberCard__photo overflow-hidden bg-zinc-900">
                        {hasPhoto ? (
                            <img
                                src={member.photoUrl}
                                alt={member.name}
                                loading="lazy"
                                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover/card:scale-[1.03]"
                                onError={() => setImgError(true)}
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center">
                                <User className="h-16 w-16 text-zinc-700" strokeWidth={1.5} aria-hidden="true" />
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-1.5 px-[20px] pt-[20px] pb-[16px]">
                        <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#facc15]">
                            {roleLine}
                        </p>
                        <h3 className="m-0 text-xl font-semibold text-zinc-50">{member.name}</h3>
                        {department && <p className="m-0 text-[13px] text-zinc-400">{department}</p>}
                    </div>

                    <div className="mt-auto px-[20px]">
                        <div className="border-t border-zinc-800" />
                        <div className="flex items-center justify-between py-[4px]">
                            {linkRow}
                            <button
                                type="button"
                                onClick={() => setFlipped(true)}
                                aria-expanded={flipped}
                                className="-mr-[12px] h-11 px-[12px] text-xs font-semibold uppercase tracking-[0.12em] text-zinc-400 transition-colors hover:text-[#facc15]"
                            >
                                About
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Back ── */}
                <div className="memberCard__face memberCard__face--back flex flex-col" inert={flipped ? undefined : ''}>
                    {hasPhoto && (
                        <img
                            src={member.photoUrl}
                            alt=""
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover object-top blur-xl brightness-[0.3]"
                        />
                    )}
                    <div className="relative flex min-h-0 flex-1 flex-col px-[20px] pt-[16px]">
                        <div className="flex items-start justify-between gap-2">
                            <p className="m-0 pt-[12px] text-[11px] font-semibold uppercase tracking-[0.12em] text-[#facc15]">
                                {roleLine}
                            </p>
                            <button
                                type="button"
                                onClick={() => setFlipped(false)}
                                aria-label={`Close ${member.name}'s bio`}
                                className="-mr-[12px] flex h-11 w-11 shrink-0 items-center justify-center text-zinc-400 transition-colors hover:text-white"
                            >
                                <X className="h-[18px] w-[18px]" aria-hidden="true" />
                            </button>
                        </div>
                        <h3 className="m-0 text-xl font-semibold text-zinc-50">{member.name}</h3>
                        {department && <p className="m-0 mt-1 text-[13px] text-zinc-400">{department}</p>}
                        {member.year && (
                            <p className="m-0 mt-1 text-[13px] text-zinc-500">Team of {member.year}</p>
                        )}

                        <div className="my-[16px] border-t border-zinc-700/70" />

                        <div className="memberCard__bio min-h-0 flex-1 overflow-y-auto pr-1">
                            {member.description ? (
                                <p className="m-0 text-sm leading-relaxed text-zinc-200">{member.description}</p>
                            ) : (
                                <p className="m-0 text-sm text-zinc-500">No bio yet.</p>
                            )}
                        </div>
                    </div>

                    {links.length > 0 && (
                        <div className="relative px-[20px] py-[4px]">{linkRow}</div>
                    )}
                </div>
            </div>
        </article>
    );
};

export default MemberCard;

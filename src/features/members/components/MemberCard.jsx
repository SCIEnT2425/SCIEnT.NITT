import React, { useState } from 'react';
import { Mail, Linkedin, Instagram, Zap, RotateCw } from 'lucide-react';
import scient from '../../../assets/scient.png';
import '../styles/MembersCard.css';

const MemberCard = ({ member, index }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    // Fallback preset colors if cardColor is not defined
    const presetColors = ['#facc15', '#a78bfa', '#38bdf8', '#f472b6', '#34d399', '#fb923c'];
    const accentColor = member?.cardColor || presetColors[index % presetColors.length];

    const toggleFlip = (e) => {
        e.stopPropagation();
        setIsFlipped(prev => !prev);
    };

    return (
        <div 
            className="card relative group perspective cursor-pointer"
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
            onClick={toggleFlip}
        >
            <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                {/* Front View */}
                <div className="absolute w-full h-full backface-hidden">
                    <div 
                        className="relative h-full rounded-3xl bg-zinc-950 p-[2px] overflow-hidden transition-all duration-300 shadow-lg group-hover:scale-[1.02]"
                        style={{
                            boxShadow: `0 0 20px ${accentColor}25`,
                            borderColor: accentColor,
                            borderWidth: '2px',
                            borderStyle: 'solid'
                        }}
                    >
                        {/* Background subtle glow */}
                        <div 
                            className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
                            style={{ backgroundColor: accentColor }}
                        ></div>

                        {/* Top Logo */}
                        <div className="absolute top-4 right-4 z-20 w-8 h-8 opacity-80 group-hover:opacity-100 transition-opacity">
                            <img src={scient} alt="SCIEnT" className="w-full h-full object-contain" />
                        </div>

                        {/* Photo / Avatar Section - Aligned for crystal clear face visibility */}
                        <div className="relative w-full h-[62%] bg-zinc-900/60 flex items-center justify-center overflow-hidden">
                            {member.photoUrl ? (
                                <img 
                                    src={member.photoUrl} 
                                    alt={member.name} 
                                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                />
                            ) : (
                                <div 
                                    className="w-24 h-24 rounded-full flex items-center justify-center border-2 shadow-inner"
                                    style={{ borderColor: accentColor, backgroundColor: `${accentColor}15` }}
                                >
                                    <Zap className="w-12 h-12" style={{ color: accentColor }} />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent pointer-events-none"></div>
                        </div>

                        {/* Card Info */}
                        <div className="relative p-5 flex flex-col justify-between h-[38%] bg-zinc-950/90 backdrop-blur-md">
                            <div>
                                <h3 className="text-xl font-bold text-white tracking-wide truncate mb-1">
                                    {member.name}
                                </h3>
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                    <span 
                                        className="text-xs font-semibold px-2.5 py-0.5 rounded-full border"
                                        style={{ 
                                            backgroundColor: `${accentColor}18`, 
                                            color: accentColor,
                                            borderColor: `${accentColor}40`
                                        }}
                                    >
                                        {member.role || 'Member'}
                                    </span>
                                    {member.subteam && (
                                        <span className="text-xs text-zinc-400 font-medium truncate">
                                            • {member.subteam}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-between items-center text-xs text-zinc-400 pt-2 border-t border-zinc-800/80">
                                <span className="truncate max-w-[60%]">{member.Department || member.year || 'NIT Trichy'}</span>
                                
                                {/* Mobile/Tab Flip Button */}
                                <button
                                    type="button"
                                    onClick={toggleFlip}
                                    className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border transition-all hover:scale-105 shadow-sm"
                                    style={{
                                        backgroundColor: `${accentColor}20`,
                                        borderColor: `${accentColor}50`,
                                        color: accentColor
                                    }}
                                    aria-label="Flip card for details"
                                >
                                    <span>Details</span>
                                    <RotateCw className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Back View (Details & Contact) */}
                <div className="absolute w-full h-full backface-hidden rotate-y-180">
                    <div 
                        className="relative h-full rounded-3xl bg-zinc-950 p-6 flex flex-col justify-between overflow-hidden shadow-2xl"
                        style={{
                            boxShadow: `0 0 25px ${accentColor}35`,
                            borderColor: accentColor,
                            borderWidth: '2px',
                            borderStyle: 'solid'
                        }}
                    >
                        {/* Background Accent Glow */}
                        <div 
                            className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-25 pointer-events-none"
                            style={{ backgroundColor: accentColor }}
                        ></div>

                        <div>
                            <div className="flex justify-between items-start mb-4 border-b border-zinc-800 pb-3">
                                <div>
                                    <h3 className="text-xl font-bold text-white">{member.name}</h3>
                                    <p className="text-xs font-medium mt-1" style={{ color: accentColor }}>
                                        {member.role} {member.subteam ? `(${member.subteam})` : ''}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={toggleFlip}
                                    className="p-1.5 rounded-full bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-700 transition-colors"
                                    aria-label="Flip back"
                                >
                                    <RotateCw className="w-4 h-4" />
                                </button>
                            </div>

                            {member.description && (
                                <p className="text-xs text-zinc-300 leading-relaxed line-clamp-4 italic mb-4">
                                    "{member.description}"
                                </p>
                            )}

                            <div className="space-y-1 text-xs text-zinc-400">
                                {member.Department && <p><span className="text-zinc-500">Dept:</span> {member.Department}</p>}
                                {member.year && <p><span className="text-zinc-500">Year:</span> {member.year}</p>}
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="pt-4 border-t border-zinc-800">
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mb-3 text-center">
                                Connect
                            </p>
                            <div className="flex gap-3 justify-center items-center">
                                {member.email && (
                                    <a 
                                        href={`mailto:${member.email}`}
                                        onClick={(e) => e.stopPropagation()}
                                        aria-label="Email"
                                        className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border"
                                        style={{
                                            backgroundColor: `${accentColor}15`,
                                            borderColor: `${accentColor}50`,
                                            color: accentColor
                                        }}
                                    >
                                        <Mail className="w-5 h-5" />
                                    </a>
                                )}
                                {member.linkedin && (
                                    <a 
                                        href={member.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        aria-label="LinkedIn"
                                        className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border"
                                        style={{
                                            backgroundColor: `${accentColor}15`,
                                            borderColor: `${accentColor}50`,
                                            color: accentColor
                                        }}
                                    >
                                        <Linkedin className="w-5 h-5" />
                                    </a>
                                )}
                                {member.instagram && (
                                    <a 
                                        href={member.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        aria-label="Instagram"
                                        className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border"
                                        style={{
                                            backgroundColor: `${accentColor}15`,
                                            borderColor: `${accentColor}50`,
                                            color: accentColor
                                        }}
                                    >
                                        <Instagram className="w-5 h-5" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberCard;
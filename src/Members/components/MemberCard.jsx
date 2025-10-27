import React, { useState } from 'react';
import { Mail, Linkedin, Zap, Sparkles, Instagram } from 'lucide-react';
import scient from '../../assets/scient.png'
import '../styles/MembersCard.css'

const MemberCard = ({ member, index }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    
    const gradients = [
        'from-pink-500 via-red-500 to-yellow-500',
        'from-green-400 via-blue-500 to-purple-600',
        'from-yellow-400 via-pink-500 to-red-500',
        'from-blue-500 via-purple-500 to-pink-500',
        'from-cyan-400 via-blue-500 to-purple-600',
        'from-orange-400 via-red-500 to-pink-500',
    ];
    
    const gradient = gradients[index % gradients.length];
    
    return (
        <div 
            className="card relative cursor-pointer group perspective" 
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180'  : 'rotate-x-20'}`}>
                {/* Front */}
                <div className="absolute w-full h-full backface-hidden">
                    <div className={`relative h-full rounded-3xl bg-gradient-to-br ${gradient} p-1 overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/20 "></div>
                        <div className="relative h-full rounded-3xl bg-gray-950 overflow-hidden ">
                            <div className="absolute inset-0 flex items-center justify-center">
                                {member.photoUrl ? (
                                    <div className="relative w-full h-full image-container">
                                        <img 
                                            src={member.photoUrl} 
                                            alt={member.name} 
                                            className="w-full h-full object-cover image-blend"
                                        />
                                    </div>
                                ) : (
                                    <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                                        <Zap className="w-16 h-16 text-white" />
                                    </div>
                                )}
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6">
                                <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                                <p className={`text-sm font-semibold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                                    {member.subteam} || {member.role}
                                </p>
                                {member.year && <p className="text-xs text-gray-300 mt-1">{member.year}</p>}
                                {member.Department && (
                                    <p className="text-xs text-gray-400 mt-1">{member.Department}</p>
                                )}
                            </div>
                            <div className="absolute top-4 right-4 size-12">
                                <img src={scient} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Back */}
                <div className="absolute w-full h-full backface-hidden rotate-y-180">
                    <div className={`relative h-full rounded-3xl bg-gradient-to-br ${gradient} p-1 overflow-hidden`}>
                        <div className="h-full rounded-3xl bg-gray-950 p-6 flex flex-col justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                                <p className="text-sm text-gray-300 mb-3">{member.Department}</p>
                                
                            </div>
                            <div className="flex gap-3 justify-center">
                                {member.email && (
                                    <a 
                                        href={`mailto:${member.email}`}
                                        onClick={(e) => e.stopPropagation()}
                                        className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center hover:scale-110 transition-transform`}
                                    >
                                        <Mail className="w-6 h-6 text-white" />
                                    </a>
                                )}
                                {member.linkedin && (
                                    <a 
                                        href={member.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center hover:scale-110 transition-transform`}
                                    >
                                        <Linkedin className="w-6 h-6 text-white" />
                                    </a>
                                )}
                                {member.instagram && (
                                    <a 
                                        href={member.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center hover:scale-110 transition-transform`}
                                    >
                                        <Instagram className="w-6 h-6 text-white" />
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
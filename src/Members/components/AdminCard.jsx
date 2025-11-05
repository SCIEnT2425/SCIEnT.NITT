import React from 'react';
import { Mail, Linkedin, Sparkles, Wrench, GraduationCap } from 'lucide-react';

const AdminCard = ({ admin, type = 'facility' }) => {
    // Determine icon based on type
    const Icon = type === 'faculty' ? GraduationCap : Wrench;

    return (
        <div className="w-full px-4 desktop:w-4/5 desktop:flex desktop:flex-col desktop:justify-around desktop:mx-auto desktop:px-12">
            {/* Card */}
            <div className="relative max-w-full mx-auto w-[80vw] laptop:w-[45vw] desktop:w-[58vw] desktop:scale-110">
                <div className="relative rounded-3xl bg-gradient-to-br from-blue-400 via-cyan-500 to-teal-600 p-1 overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative rounded-3xl bg-gray-950 overflow-hidden">
                        <div className="flex flex-col laptop:flex-row">
                            {/* Photo Section - Left Half */}
                            <div className="relative w-full h-72 laptop:w-1/2 laptop:h-[25rem] desktop:h-[35rem]">
                                {admin.photoUrl ? (
                                    <img
                                        src={admin.photoUrl}
                                        alt={admin.name}
                                        className="absolute inset-0 w-full h-full object-cover laptop:border-8 laptop:border-black rounded-3xl"
                                    />
                                ) : (
                                    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-400 via-cyan-500 to-teal-600 flex items-center justify-center">
                                        <Icon className="w-20 h-20 text-white opacity-50 laptop:w-32 laptop:h-32" />
                                    </div>
                                )}
                            </div>

                            {/* Info Section - Right Half */}
                            <div className="w-full flex flex-col justify-center gap-3 p-4 laptop:w-1/2 laptop:gap-6 laptop:p-10 desktop:p-12">
                                {/* Name and Role */}
                                <div className="flex flex-col">
                                    <h3 className="text-xl leading-6 font-bold text-white mb-2 laptop:text-4xl laptop:leading-10">
                                        {admin.name}
                                    </h3>
                                    <p className="text-base leading-5 font-semibold bg-gradient-to-r from-blue-400 via-cyan-500 to-teal-600 bg-clip-text text-transparent laptop:text-xl laptop:leading-7">
                                        {admin.role}
                                    </p>
                                </div>

                                <p className="text-gray-400 text-xs  laptop:text-xl ">
                                    {type === 'faculty'
                                        ? 'Guiding our Team to excellence'
                                        : 'Managing our facilities with excellence'}
                                </p>

                                {/* Email */}
                                {admin.email && (
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                                        <a
                                            href={`mailto:${admin.email}`}
                                            className="text-xs text-gray-300 transition-colors break-all hover:text-cyan-400 laptop:text-xl"
                                        >
                                            {admin.email}
                                        </a>
                                    </div>
                                )}

                                {/* Social Media Icons */}
                                <div className="flex gap-2 pt-2">
                                    {admin.linkedin && (
                                        <a
                                            href={admin.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 via-cyan-500 to-teal-600 flex items-center justify-center transition-transform hover:scale-110 laptop:w-14 laptop:h-14"
                                        >
                                            <Linkedin className="w-4 h-4 text-white laptop:w-7 laptop:h-7" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminCard;
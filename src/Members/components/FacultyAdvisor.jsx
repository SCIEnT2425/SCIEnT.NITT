import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, Linkedin, Award, Sparkles, BookOpen, GraduationCap } from 'lucide-react';
import '../styles/admin.css';
const FacultyAdvisorCard = ({ advisor }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div className="w-full  tab desktop px-4 md:px-8 lg:px-12 mt-12 ">
            {/* Section Title */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 mb-4">
                    <Sparkles className="w-6 h-6 text-yellow-400" />
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                        Faculty Advisor
                    </h2>
                    <Sparkles className="w-6 h-6 text-yellow-400" />
                </div>
                <p className="text-gray-400 text-sm">Guiding our team to excellence</p>
            </div>

            {/* Card */}
            <div
                className="relative cursor-pointer group perspective"
                onClick={() => setIsFlipped(!isFlipped)}
            >
                <div className={`relative w-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                    {/* Front */}
                    <div className="absolute w-full backface-hidden">
                        <div className="relative rounded-3xl bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 p-1 overflow-hidden">
                            <div className="absolute inset-0 bg-black/20"></div>
                            <div className="relative rounded-3xl bg-gray-950 overflow-hidden">
                                <div className="grid grid-cols-2 md:grid-rows-2 min-h-[500px]">
                                    {/* Photo Section - Left Half */}
                                    <div className="relative w-full md:w-1/2 min-h-[500px] md:min-h-[500px]">
                                        {advisor.photoUrl ? (
                                            <img
                                                src={advisor.photoUrl}
                                                alt={advisor.name}
                                                className="absolute inset-0 w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 flex items-center justify-center">
                                                <GraduationCap className="w-32 h-32 text-white" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Info Section - Right Half */}
                                    <div className="flex flex-col justify-center space-y-6 p-8 md:p-12 w-full md:w-1/2">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <Award className="w-8 h-8 text-yellow-400" />
                                                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                                                    {advisor.name}
                                                </h3>
                                            </div>
                                            <p className="text-lg md:text-xl font-semibold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-3">
                                                {advisor.role}
                                            </p>
                                        </div>

                                        {advisor.Department && (
                                            <div className="flex items-start gap-3">
                                                <BookOpen className="w-6 h-6 text-orange-400 mt-1 flex-shrink-0" />
                                                <div>
                                                    <p className="text-sm text-gray-400 mb-1">Department</p>
                                                    <p className="text-base md:text-lg text-gray-200">{advisor.Department}</p>
                                                </div>
                                            </div>
                                        )}

                                        {advisor.bio && (
                                            <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                                                {advisor.bio}
                                            </p>
                                        )}

                                        {/* Contact Icons */}
                                        <div className="flex gap-4 pt-4">
                                            {advisor.email && (
                                                <a
                                                    href={`mailto:${advisor.email}`}
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 flex items-center justify-center hover:scale-110 transition-transform"
                                                >
                                                    <Mail className="w-7 h-7 text-white" />
                                                </a>
                                            )}
                                            {advisor.linkedin && (
                                                <a
                                                    href={advisor.linkedin}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 flex items-center justify-center hover:scale-110 transition-transform"
                                                >
                                                    <Linkedin className="w-7 h-7 text-white" />
                                                </a>
                                            )}
                                        </div>

                                        {/* Click hint */}
                                        <p className="text-xs text-gray-500 flex items-center gap-2 pt-2">
                                            <Sparkles className="w-4 h-4" />
                                            Click to see more details
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Back */}
                    <div className="absolute w-full backface-hidden rotate-y-180">
                        <div className="relative rounded-3xl bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 p-1 overflow-hidden">
                            <div className="rounded-3xl bg-gray-950 p-8 md:p-12 min-h-[500px] flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <GraduationCap className="w-10 h-10 text-yellow-400" />
                                        <div>
                                            <h3 className="text-3xl font-bold text-white">{advisor.name}</h3>
                                            <p className="text-gray-400">{advisor.role}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {advisor.Department && (
                                            <div className="p-4 rounded-xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-orange-500/20">
                                                <p className="text-sm text-gray-400 mb-1">Department</p>
                                                <p className="text-lg text-white font-medium">{advisor.Department}</p>
                                            </div>
                                        )}

                                        {advisor.email && (
                                            <div className="p-4 rounded-xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-orange-500/20">
                                                <p className="text-sm text-gray-400 mb-1">Email</p>
                                                <p className="text-lg text-white font-medium break-all">{advisor.email}</p>
                                            </div>
                                        )}

                                        {advisor.bio && (
                                            <div className="p-4 rounded-xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-orange-500/20">
                                                <p className="text-sm text-gray-400 mb-2">About</p>
                                                <p className="text-gray-300 leading-relaxed">{advisor.bio}</p>
                                            </div>
                                        )}

                                        {advisor.description && (
                                            <div className="p-4 rounded-xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-orange-500/20">
                                                <p className="text-gray-300 leading-relaxed">{advisor.description}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Contact buttons */}
                                <div className="flex gap-4 justify-center mt-8">
                                    {advisor.email && (
                                        <a
                                            href={`mailto:${advisor.email}`}
                                            onClick={(e) => e.stopPropagation()}
                                            className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 flex items-center justify-center hover:scale-110 transition-transform"
                                        >
                                            <Mail className="w-8 h-8 text-white" />
                                        </a>
                                    )}
                                    {advisor.linkedin && (
                                        <a
                                            href={advisor.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 flex items-center justify-center hover:scale-110 transition-transform"
                                        >
                                            <Linkedin className="w-8 h-8 text-white" />
                                        </a>
                                    )}
                                </div>

                                <p className="text-xs text-gray-500 text-center flex items-center justify-center gap-2 mt-6">
                                    <Sparkles className="w-4 h-4" />
                                    Click to flip back
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Updated section to fetch data dynamically
export default function FacultyAdvisorSection() {
    const [advisor, setAdvisor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAdvisor = async () => {
            try {
                setLoading(true);
                // Assuming your API endpoint is /api/team/faculty-advisors
                // Adjust baseURL if needed (e.g., if proxy or full URL)
                const response = await axios.get('http://localhost:2000/api/team/faculty-advisors');
                
                // Assuming response.data.data is an array; use first item or map for multiple
                if (response.data && response.data.data && response.data.data.length > 0) {
                    setAdvisor(response.data.data[0]); // Use first advisor; or map to render multiple cards
                } else {
                    setError('No faculty advisors found');
                }
            } catch (err) {
                console.error('Error fetching faculty advisor:', err);
                setError('Failed to fetch faculty advisor data');
            } finally {
                setLoading(false);
            }
        };

        fetchAdvisor();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-black py-12 flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    if (error || !advisor) {
        return (
            <div className="min-h-screen bg-black py-12 flex items-center justify-center">
                <div className="text-red-400">{error || 'No data available'}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black py-12">
            <FacultyAdvisorCard advisor={advisor} />
        </div>
    );
}
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, Linkedin, Shield, Sparkles, Building2, Wrench } from 'lucide-react';
import '../styles/admin.css';
const FacilityAdminCard = ({ admin }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div className="w-full mt-80  mb-52 desktop tab  px-4 md:px-8 min-h-[600px]">
            {/* Section Title */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 mb-4">
                    <Sparkles className="w-6 h-6 text-blue-400" />
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
                        Facility Admin
                    </h2>
                    <Sparkles className="w-6 h-6 text-blue-400" />
                </div>
                <p className="text-gray-400 text-sm">Managing our facilities with excellence</p>
            </div>

            {/* Card */}
            <div
                className="relative cursor-pointer group perspective"
                onClick={() => setIsFlipped(!isFlipped)}
            >
                <div className={`relative w-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                    {/* Front */}
                    <div className="absolute w-full backface-hidden">
                        <div className="relative rounded-3xl bg-gradient-to-br from-blue-400 via-cyan-500 to-teal-500 p-1 overflow-hidden">
                            <div className="absolute inset-0 bg-black/20"></div>
                            <div className="relative rounded-3xl bg-gray-950 overflow-hidden">
                                <div className="grid grid-cols-2 md:grid-cols-2 min-h-[500px]">
                                    {/* Photo Section - Left Half */}
                                    <div className="relative w-full md:w-1/2 min-h-[400px] md:min-h-[500px]">
                                        {admin.photoUrl ? (
                                            <img
                                                src={admin.photoUrl}
                                                alt={admin.name}
                                                className="absolute inset-0 w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-400 via-cyan-500 to-teal-500 flex items-center justify-center">
                                                <Building2 className="w-32 h-32 text-white" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Info Section - Right Half */}
                                    <div className="flex flex-col justify-center space-y-6 p-8 md:p-12 w-full md:w-1/2">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <Shield className="w-8 h-8 text-blue-400" />
                                                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                                                    {admin.name}
                                                </h3>
                                            </div>
                                            <p className="text-lg md:text-xl font-semibold bg-gradient-to-r from-blue-400 via-cyan-500 to-teal-500 bg-clip-text text-transparent mb-3">
                                                {admin.role}
                                            </p>
                                        </div>

                                        {admin.Department && (
                                            <div className="flex items-start gap-3">
                                                <Wrench className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0" />
                                                <div>
                                                    <p className="text-sm text-gray-400 mb-1">Department</p>
                                                    <p className="text-base md:text-lg text-gray-200">{admin.Department}</p>
                                                </div>
                                            </div>
                                        )}

                                        {admin.bio && (
                                            <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                                                {admin.bio}
                                            </p>
                                        )}

                                        {/* Contact Icons */}
                                        <div className="flex gap-4 pt-4">
                                            {admin.email && (
                                                <a
                                                    href={`mailto:${admin.email}`}
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 via-cyan-500 to-teal-500 flex items-center justify-center hover:scale-110 transition-transform"
                                                >
                                                    <Mail className="w-7 h-7 text-white" />
                                                </a>
                                            )}
                                            {admin.linkedin && (
                                                <a
                                                    href={admin.linkedin}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 via-cyan-500 to-teal-500 flex items-center justify-center hover:scale-110 transition-transform"
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
                        <div className="relative rounded-3xl bg-gradient-to-br from-blue-400 via-cyan-500 to-teal-500 p-1 overflow-hidden">
                            <div className="rounded-3xl bg-gray-950 p-8 md:p-12 min-h-[500px] flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <Building2 className="w-10 h-10 text-blue-400" />
                                        <div>
                                            <h3 className="text-3xl font-bold text-white">{admin.name}</h3>
                                            <p className="text-gray-400">{admin.role}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {admin.Department && (
                                            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-cyan-500/20">
                                                <p className="text-sm text-gray-400 mb-1">Department</p>
                                                <p className="text-lg text-white font-medium">{admin.Department}</p>
                                            </div>
                                        )}

                                        {admin.email && (
                                            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-cyan-500/20">
                                                <p className="text-sm text-gray-400 mb-1">Email</p>
                                                <p className="text-lg text-white font-medium break-all">{admin.email}</p>
                                            </div>
                                        )}

                                        {admin.bio && (
                                            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-cyan-500/20">
                                                <p className="text-sm text-gray-400 mb-2">About</p>
                                                <p className="text-gray-300 leading-relaxed">{admin.bio}</p>
                                            </div>
                                        )}

                                        {admin.description && (
                                            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-cyan-500/20">
                                                <p className="text-gray-300 leading-relaxed">{admin.description}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Contact buttons */}
                                <div className="flex gap-4 justify-center mt-8">
                                    {admin.email && (
                                        <a
                                            href={`mailto:${admin.email}`}
                                            onClick={(e) => e.stopPropagation()}
                                            className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 via-cyan-500 to-teal-500 flex items-center justify-center hover:scale-110 transition-transform"
                                        >
                                            <Mail className="w-8 h-8 text-white" />
                                        </a>
                                    )}
                                    {admin.linkedin && (
                                        <a
                                            href={admin.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 via-cyan-500 to-teal-500 flex items-center justify-center hover:scale-110 transition-transform"
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

// Dummy data fallback
const dummyAdmin = {
    name: "John Smith",
    role: "Facility Admin",
    Department: "Facility Management",
    photoUrl: "/Team/facility_admin.png",
    email: "admin@nitt.edu",
    bio: "Ensuring smooth operations and maintenance of all facilities",
    linkedin: "https://linkedin.com/in/example"
};

// Updated section to fetch data dynamically
export default function FacilityAdminSection() {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [useDummy, setUseDummy] = useState(false);

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                setLoading(true);
                // Assuming your API endpoint is /api/team/facility-admins
                // Adjust baseURL if needed (e.g., if proxy or full URL)
                const response = await axios.get('http://localhost:2000/api/team/facility-admins');
                
                // Assuming response.data.data is an array; use first item or map for multiple
                if (response.data && response.data.data && response.data.data.length > 0) {
                    setAdmin(response.data.data[0]); // Use first admin; or map to render multiple cards
                    setUseDummy(false);
                } else {
                    // No data found, use dummy
                    setAdmin(dummyAdmin);
                    setUseDummy(true);
                }
            } catch (err) {
                console.error('Error fetching facility admin:', err);
                // Fetch failed, use dummy
                setAdmin(dummyAdmin);
                setUseDummy(true);
            } finally {
                setLoading(false);
            }
        };

        fetchAdmin();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-black py-12 flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    // Always render the card; admin will be either API data or dummy
    return (
        <div className="min-h-screen bg-black py-12">
            <FacilityAdminCard admin={admin} />
        </div>
    );
}
import React from 'react';
import { Mail, Linkedin, Sparkles, Wrench, GraduationCap } from 'lucide-react';
import '../styles/admin.css';

const AdminCard = ({ admin, type = 'facility' }) => {
    // Determine icon based on type
    const Icon = type === 'faculty' ? GraduationCap : Wrench;

    return (
        <div className="admin-container">
            {/* Section Title */}
            <div className="admin-section-title">
                <div className="admin-title-wrapper">

                    <h2 className="admin-title">
                        {type === 'faculty' ? 'Faculty Advisor' : 'Facility Admin'}
                    </h2>

                </div>
                <p className="admin-subtitle">
                    {type === 'faculty'
                        ? 'Guiding our academic excellence'
                        : 'Managing our facilities with excellence'}
                </p>
            </div>

            {/* Card */}
            <div className="admin-card-wrapper">
                <div className="admin-card-border">
                    <div className="admin-card-overlay"></div>
                    <div className="admin-card-inner">
                        <div className="admin-card-content">
                            {/* Photo Section - Left Half */}
                            <div className="admin-photo-section">
                                {admin.photoUrl ? (
                                    <img
                                        src={admin.photoUrl}
                                        alt={admin.name}
                                        className="admin-photo"
                                    />
                                ) : (
                                    <div className="admin-photo-placeholder">
                                        <Icon className="admin-icon-placeholder" />
                                    </div>
                                )}
                            </div>

                            {/* Info Section - Right Half */}
                            <div className="admin-info-section">
                                {/* Name and Role */}
                                <div className="admin-name-role">
                                    <h3 className="admin-name">
                                        {admin.name}
                                    </h3>
                                    <p className="admin-role">
                                        {admin.role}
                                    </p>
                                </div>

                                {/* Bio */}
                                {admin.bio && (
                                    <p className="admin-bio">
                                        {admin.bio}
                                    </p>
                                )}

                                {/* Email */}
                                {admin.email && (
                                    <div className="admin-email-row">
                                        <Mail className="admin-email-icon" />
                                        <a
                                            href={`mailto:${admin.email}`}
                                            className="admin-email-link"
                                        >
                                            {admin.email}
                                        </a>
                                    </div>
                                )}

                                {/* Social Media Icons */}
                                <div className="admin-social-icons">
                                    {admin.email && (
                                        <a
                                            href={`mailto:${admin.email}`}
                                            className="admin-social-link"
                                        >
                                            <Mail className="admin-social-icon" />
                                        </a>
                                    )}
                                    {admin.linkedin && (
                                        <a
                                            href={admin.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="admin-social-link"
                                        >
                                            <Linkedin className="admin-social-icon" />
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
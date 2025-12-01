import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, Linkedin, Github, Zap, Sparkles, Rocket, Star, ChevronDown } from 'lucide-react';
import MemberCard from './MemberCard';
import  AdminCard from './AdminCard.jsx';
import FacultyAdvisorCard from './FacultyAdvisor.jsx';
import FacilityAdminCard from './FacilityAdmin.jsx';
import '../styles/ScientMembers.css';

const SCIentMembers = () => {
  const [activeSection, setActiveSection] = useState('team');
  const [membersData, setMembersData] = useState({
    team: [],
    cores: [],
    corporate: [],
    devops: [],
    creative: []
  });
  const [loading, setLoading] = useState(true);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const MODE = process.env.NODE_ENV || 'development';
  const API_BASE = MODE==="development"? 'http://localhost:2000/api/team' : "/api/team"; // Adjust base URL as needed

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const [teamRes] = await Promise.all([
          axios.get(`${API_BASE}/all`),
        ]);

        setMembersData({
          team: teamRes.data.data || [],
          cores: teamRes.data.data.filter(m => m.subteam === 'Cores') || [],
          corporate: teamRes.data.data.filter(m => m.subteam === 'Corporate Communications') || [],
          devops: teamRes.data.data.filter(m => m.subteam === 'DevOps') || [],
          creative: teamRes.data.data.filter(m => m.subteam === 'Creatives') || [],
        });
      } catch (err) {
        console.error('Error fetching members:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);



  const renderTeamSections = () => {
    const all = membersData.team;
    const cores = all.filter(m => 
      ['Technical Executive', 'Facility Executive', 'External Affairs Executive', 'Internal Affairs Executive' , 'Project Operations Executive'].includes(m.role)
    );
    const managers = all.filter(m => ['Manager' , 'Project Manager'].includes(m.role));
    const deputyManagers = all.filter(m => m.role === 'Deputy Manager');
    

    return (
      <div>
        {cores.length > 0 && (
          <div className="mt-12">
            <h2 className="text-4xl font-bold text-[#facc15] mb-4 flex justify-center">Core Members</h2>
            <div className="membersGrid">
              {cores.map((member, idx) => (
                <MemberCard key={member._id || idx} member={member} index={idx} />
              ))}
            </div>
          </div>
        )}
        {managers.length > 0 && (
          <div className="mt-12">
            <h2 className="text-4xl font-bold text-[#facc15] mb-4 flex justify-center">Managers</h2>
            <div className="membersGrid">
              {managers.map((member, idx) => (
                <MemberCard key={member._id || idx} member={member} index={idx} />
              ))}
            </div>
          </div>
        )}
        {deputyManagers.length > 0 && (
          <div className="mt-12">
            <h2 className="text-4xl font-bold text-[#facc15] mb-4 flex justify-center">Deputy Managers</h2>
            <div className="membersGrid">
              {deputyManagers.map((member, idx) => (
                <MemberCard key={member._id || idx} member={member} index={idx} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderCores = () => {
     const all = membersData.team;
    const cores = all.filter(m => 
      ['Technical Executive', 'Facility Executive', 'External Affairs Executive', 'Internal Affairs Executive','Project Operations Executive'].includes(m.role)
    );
    return (
      <div>
        <h2 className="text-4xl font-bold text-[#facc15] flex justify-center">Core</h2>
        <div className="membersGrid">
          {cores.map((member, idx) => (
            <MemberCard key={member._id || idx} member={member} index={idx} />
          ))}
        </div>
      </div>
    );
  };

const renderProjectManagementTeam = () => {
  const all = membersData.team;
  const head = all.filter(m => m.role === 'Project Management Head');
  const managers = all.filter(m => m.role === 'Project Manager');

  return (
    <div>
      {head.length > 0 && (
        <div className="mt-12">
          <h2 className="text-4xl font-bold text-[#facc15] mb-4 flex justify-center">Head</h2>
          <div className="membersGrid">
            {head.map((member, idx) => (
              <MemberCard key={member._id || idx} member={member} index={idx} />
            ))}
          </div>
        </div>
      )}
      {managers.length > 0 && (
        <div className="mt-12">
          <h2 className="text-4xl font-bold text-[#facc15] mb-4 flex justify-center">Managers</h2>
          <div className="membersGrid">
            {managers.map((member, idx) => (
              <MemberCard key={member._id || idx} member={member} index={idx} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

  const renderSubteam = (key, subteamName) => {
    const allMembers = membersData[key];
    const managers = allMembers.filter(m => m.role === 'Manager');
    const deputyManagers = allMembers.filter(m => m.role === 'Deputy Manager');

    return (
      <div>
        {managers.length > 0 && (
          <div className="mt-12">
            <h2 className="text-4xl font-bold text-[#facc15] mb-4 flex justify-center">Managers</h2>
            <div className="membersGrid">
              {managers.map((member, idx) => (
                <MemberCard key={member._id || idx} member={member} index={idx} />
              ))}
            </div>
          </div>
        )}
        {deputyManagers.length > 0 && (
          <div className="mt-12">
            <h2 className="text-4xl font-bold text-[#facc15] mb-4 flex justify-center">Deputy Managers </h2>
            <div className="membersGrid">
              {deputyManagers.map((member, idx) => (
                <MemberCard key={member._id || idx} member={member} index={idx} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-[#facc15] text-xl">Loading team members...</div>
      </div>
    );
  }

  const filterOptions = [
    { id: 'team', label: 'Team' },
    { id: 'cores', label: 'Core'},
    { id: 'corporate', label: 'Corporate Communication'},
    { id: 'devops', label: 'DevOps'},
    { id: 'creative', label: 'Creative'},
    { id: 'projectManagement', label: 'Project Management'}
  ];

  const currentFilter = filterOptions.find(opt => opt.id === activeSection);
  const dummyAdmin = {
      name: "John Smith",
      role: "Facility Admin",
      Department: "Facility Management",
      photoUrl: "/Team/facility_admin.png",
      email: "FacultyAdvsor@gamil.com",
      bio: "Ensuring smooth operations and maintenance of all facilities",
      linkedin: "https://linkedin.com/in/example"
    };
    const dummyAdvisor = {
      name: "Dr. Jane Doe",
      role: "Faculty Advisor",
      Department: "Computer Science",
      photoUrl: "/Team/faculty_advisor.png",
      email: "FacilityAdmin@gamil.com",
      bio: "Guiding and mentoring the team towards excellence",
      linkedin: "https://linkedin.com/in/example"
    };
    const FacultyAdvisor = membersData.team.find(m => m.role === 'Faculty Advisor') || dummyAdvisor;
    const FacilityAdmin = membersData.team.find(m => m.role === 'Admin Executive') || dummyAdmin;

  return (
    <div className="min-h-screen bg-black">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-[#facc15]/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-[#facc15]/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute w-96 h-96 bg-[#facc15]/10 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Hero */}
      <div className="relative pt-20 pb-16 px-4 text-center">
        <div className="inline-block mb-4">
          <Rocket className="w-16 h-16 text-[#facc15] animate-bounce" />
        </div>
        <h1 className="text-6xl laptop:text-7xl font-black mb-4 text-[#facc15]">
          THE SQUAD
        </h1>
        <p className="text-xl text-[#facc15]/80 max-w-2xl mx-auto laptop:text-2xl">
          Meet the awesome Team behind <span className="text-[#facc15] font-bold">SCIEnT</span>
        </p>
        <p className="text-sm text-[#facc15]/60 mt-2 laptop:text-2xl">
          Student Centre for Innovation in Engineering and Technology
        </p>
      </div>
      <div className='AdminSection'>
        <div className='flex justify-center text-center'>
            <h1 className="text-4xl laptop:text-5xl font-black mb-4 text-[#facc15]">
              SCIEnT Admin
            </h1>
        </div>
        <div className='Admins flex w-screen align-center laptop:px-16 justify-center'>
            <FacilityAdminCard  adminData={FacilityAdmin}/>
            <FacultyAdvisorCard  AdvisorData={FacultyAdvisor}/>
        </div>
      </div>
      <div className='mb-12'>
        <h1 className="text-4xl laptop:text-5xl font-black mb-12 text-[#facc15] flex justify-center text-center">
              SCIEnT Student Team
        </h1>
      </div>
      {/* Filter Buttons / Custom Mobile Menu */}
      <div className="relative px-4 mb-12">
        {/* Buttons for laptop and desktop */}
        <div className="hidden laptop:flex flex-wrap gap-3 justify-center mx-auto">
          {filterOptions.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveSection(filter.id)}
              className={`px-6 py-3 rounded-full font-bold text-xl transition-all duration-300 tabs ${
                activeSection === filter.id
                  ? 'bg-[#facc15] text-black scale-105 shadow-lg shadow-[#facc15]/25'
                  : 'bg-black/80 text-[#facc15]/80 border-2 border-[#facc15]/50 hover:bg-[#facc15]/20 hover:scale-105 hover:border-[#facc15]/80'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Custom Mobile Filter Menu */}
        <div className="laptop:hidden flex justify-center relative z-50">
          {/* Trigger Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-lg border-2 border-[#facc15]/50 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#facc15]/20 w-full max-w-xs justify-center ${
              showMobileMenu
                ? 'bg-[#facc15]/20 text-[#facc15] scale-105'
                : 'bg-black/80 text-[#facc15] hover:bg-[#facc15]/10 hover:border-[#facc15]/80'
            }`}
          >
            {currentFilter?.label || 'Team'}
            <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${showMobileMenu ? 'rotate-180' : ''}`} />
          </button>

          {/* Overlay */}
          {showMobileMenu && (
            <div 
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setShowMobileMenu(false)}
            />
          )}

          {/* Dropdown Menu */}
          {showMobileMenu && (
            <div 
              className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-full max-w-xs bg-black/95 border-2 border-[#facc15]/30 rounded-2xl shadow-xl shadow-[#facc15]/10 z-50 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {filterOptions.map((filter) => (
                <button
                  key={filter.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveSection(filter.id);
                    setShowMobileMenu(false);
                  }}
                  className={`w-full text-left px-6 py-4 font-bold text-lg transition-all duration-300 flex items-center gap-3 ${
                    activeSection === filter.id
                      ? 'bg-[#facc15]/20 text-[#facc15] border-l-4 border-[#facc15]'
                      : 'text-[#facc15]/70 hover:bg-[#facc15]/10 hover:text-[#facc15]'
                  }`}
                >
                  {filter.label}
                  {activeSection === filter.id && (
                    <div className="ml-auto w-2 h-2 bg-[#facc15] rounded-full animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Members Sections */}
      <div className="relative w-screen mx-auto px-36 pb-20">
        {activeSection === 'team' && renderTeamSections()}
        {activeSection === 'cores' && renderCores()}
        {activeSection === 'projectManagement' && renderProjectManagementTeam()}
        {activeSection === 'corporate' && renderSubteam('corporate', 'Corporate Communications')}
        {activeSection === 'devops' && renderSubteam('devops', 'DevOps')}
        {activeSection === 'creative' && renderSubteam('creative', 'Creatives')}
      </div>
    </div>
  );
};

export default SCIentMembers;
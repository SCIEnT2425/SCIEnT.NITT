import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, Linkedin, Github, Zap, Sparkles, Rocket, Star } from 'lucide-react';
import MemberCard from './MemberCard';
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

  const API_BASE = 'http://localhost:2000/api/team'; // Adjust base URL as needed

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const [teamRes, coresRes, corpRes, devRes, creaRes] = await Promise.all([
          axios.get(`${API_BASE}/all`),
          axios.get(`${API_BASE}/cores`),
          axios.get(`${API_BASE}/cc`),
          axios.get(`${API_BASE}/devops`),
          axios.get(`${API_BASE}/creatives`),
        ]);

        setMembersData({
          team: teamRes.data.data || [],
          cores: coresRes.data.data || [],
          corporate: corpRes.data.data || [],
          devops: devRes.data.data || [],
          creative: creaRes.data.data || [],
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
    // const facultyAdvisors = all.filter(m => m.role === 'Faculty Advisor');
    const cores = all.filter(m => m.role === 'Core Member');
    const managers = all.filter(m => m.role === 'Manager');
    const deputyManagers = all.filter(m => m.role === 'Deputy Manager');
    const exManagers = all.filter(m => m.role === 'Ex-Manager');

    return (
      <div>
        {/* {facultyAdvisors.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-[#facc15] mb-4">Faculty Advisors</h2>
            <div className="membersGrid">
              {facultyAdvisors.map((member, idx) => (
                <MemberCard key={member._id || idx} member={member} index={idx} />
              ))}
            </div>
          </div>
        )} */}
        {cores.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-[#facc15] mb-4">Core Members</h2>
            <div className="membersGrid">
              {cores.map((member, idx) => (
                <MemberCard key={member._id || idx} member={member} index={idx} />
              ))}
            </div>
          </div>
        )}
        {managers.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-[#facc15] mb-4">Managers</h2>
            <div className="membersGrid">
              {managers.map((member, idx) => (
                <MemberCard key={member._id || idx} member={member} index={idx} />
              ))}
            </div>
          </div>
        )}
        {deputyManagers.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-[#facc15] mb-4">Deputy Managers</h2>
            <div className="membersGrid">
              {deputyManagers.map((member, idx) => (
                <MemberCard key={member._id || idx} member={member} index={idx} />
              ))}
            </div>
          </div>
        )}
        {exManagers.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-[#facc15] mb-4">Ex-Managers</h2>
            <div className="membersGrid">
              {exManagers.map((member, idx) => (
                <MemberCard key={member._id || idx} member={member} index={idx} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderCores = () => {
    const cores = membersData.cores;
    return (
      <div>
        <h2 className="text-2xl font-bold text-[#facc15] mb-4">Core Members</h2>
        <div className="membersGrid">
          {cores.map((member, idx) => (
            <MemberCard key={member._id || idx} member={member} index={idx} />
          ))}
        </div>
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
          <div>
            <h2 className="text-2xl font-bold text-[#facc15] mb-4">Managers - {subteamName}</h2>
            <div className="membersGrid">
              {managers.map((member, idx) => (
                <MemberCard key={member._id || idx} member={member} index={idx} />
              ))}
            </div>
          </div>
        )}
        {deputyManagers.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-[#facc15] mb-4">Deputy Managers - {subteamName}</h2>
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
        <h1 className="text-6xl md:text-7xl font-black mb-4 text-[#facc15]">
          THE SQUAD
        </h1>
        <p className="text-xl text-[#facc15]/80 max-w-2xl mx-auto">
          Meet the awesome Team behind <span className="text-[#facc15] font-bold">SCIEnT</span>
        </p>
        <p className="text-sm text-[#facc15]/60 mt-2">
          Student Centre for Innovation in Engineering and Technology
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="relative px-4 mb-12">
        <div className="flex flex-wrap gap-3 justify-center max-w-5xl mx-auto">
          {[
            { id: 'team', label: 'Team', icon: Zap },
            { id: 'cores', label: 'Cores', icon: Rocket },
            { id: 'corporate', label: 'Corporate Communication', icon: Mail },
            { id: 'devops', label: 'DevOps', icon: Zap },
            { id: 'creative', label: 'Creative', icon: Sparkles }
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveSection(filter.id)}
              className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 tabs ${
                activeSection === filter.id
                  ? 'bg-[#facc15] text-black scale-105'
                  : 'bg-black/80 text-[#facc15]/80 border border-[#facc15]/50 hover:bg-[#facc15]/20 hover:scale-105'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Members Sections */}
      <div className="relative max-w-7xl mx-auto px-4 pb-20">
        {activeSection === 'team' && renderTeamSections()}
        {activeSection === 'cores' && renderCores()}
        {activeSection === 'corporate' && renderSubteam('corporate', 'Corporate Communications')}
        {activeSection === 'devops' && renderSubteam('devops', 'DevOps')}
        {activeSection === 'creative' && renderSubteam('creative', 'Creatives')}
      </div>
    </div>
  );
};

export default SCIentMembers;
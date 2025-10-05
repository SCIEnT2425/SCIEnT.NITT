import React, { useState } from 'react';
import { Mail, Linkedin, Github, Instagram } from 'lucide-react';

const MemberCard = ({ member, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const gradients = [
    'from-amber-600 via-amber-500 to-yellow-500',
    'from-rose-600 via-rose-500 to-pink-500',
    'from-emerald-600 via-emerald-500 to-teal-500',
    'from-violet-600 via-violet-500 to-purple-500',
    'from-cyan-600 via-cyan-500 to-blue-500',
    'from-orange-600 via-orange-500 to-amber-500',
  ];

  const gradient = gradients[index % gradients.length];

  return (
    <div 
      className="relative w-80 h-[28rem] cursor-pointer group"
      style={{ perspective: '1500px' }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div 
        className="relative w-full h-full transition-transform duration-700 ease-out rounded-3xl shadow-2xl"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* Front Face */}
        <div 
          className="absolute w-full h-full rounded-3xl overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: member.image ? `url(${member.image})` : 'none',
              backgroundColor: member.image ? 'transparent' : 'black'
            }}
          />
          {/* Dark Overlay with Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
          
          {/* Subtle Grain Texture */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
            backgroundRepeat: 'repeat'
          }} />

          {/* Top Accent */}
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient}`} />

          {/* Content Layer */}
          <div className="relative z-10 h-full flex flex-col p-8 justify-between">
            {/* Header */}
            <div>
              <div className="text-2xl font-bold text-white tracking-tight mb-1">
                AHOING
              </div>
              <div className="text-xs text-zinc-400 tracking-widest uppercase">
                Member Card
              </div>
            </div>

            {/* Member Info */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                {member.name}
              </h3>
              <div className={`inline-block px-4 py-1.5 rounded-full bg-gradient-to-r ${gradient} bg-opacity-10`}>
                <p className={`text-sm font-semibold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                  {member.role || member.post}
                </p>
              </div>
              {member.department && (
                <p className="text-xs text-zinc-400 mt-2">
                  {member.department}
                </p>
              )}
            </div>

            {/* Footer with ID */}
            <div className="flex justify-between items-center pt-6 border-t border-zinc-800/50">
              <div className="text-[10px] text-zinc-400 tracking-widest font-mono">
                ID: AHO-{member.year || '2024'}-{String(index + 1).padStart(3, '0')}
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
              </div>
            </div>
          </div>
        </div>

        {/* Back Face */}
        <div 
          className="absolute w-full h-full rounded-3xl shadow-2xl overflow-hidden"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: member.image ? `url(${member.image})` : 'none',
              backgroundColor: member.image ? 'transparent' : 'black'
            }}
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
          
          {/* Subtle Grain Texture */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
            backgroundRepeat: 'repeat'
          }} />

          {/* Top Accent */}
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient}`} />

          {/* Content Layer */}
          <div className="relative z-10 h-full flex flex-col p-8">
            {/* Header */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-1">
                {member.name}
              </h3>
              <p className="text-xs text-zinc-400">
                {member.role || member.post} • {member.department || 'Member'}
              </p>
            </div>

            {/* Bio Section */}
            {member.bio && (
              <div className="mb-8 flex-1">
                <div className="text-[10px] text-zinc-400 uppercase tracking-wider mb-3">
                  About
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            )}

            {/* Contact Section */}
            <div className="flex justify-center gap-4">
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  onClick={(e) => e.stopPropagation()}
                  className={`p-3 rounded-lg bg-gradient-to-br ${gradient} hover:scale-110 transition-transform`}
                >
                  <Mail className="w-5 h-5 text-white" />
                </a>
              )}
              {member.instagram && (
                <a
                  href={member.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className={`p-3 rounded-lg bg-gradient-to-br ${gradient} hover:scale-110 transition-transform`}
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>
              )}
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className={`p-3 rounded-lg bg-gradient-to-br ${gradient} hover:scale-110 transition-transform`}
                >
                  <Linkedin className="w-5 h-5 text-white" />
                </a>
              )}
              {member.github && (
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className={`p-3 rounded-lg bg-gradient-to-br ${gradient} hover:scale-110 transition-transform`}
                >
                  <Github className="w-5 h-5 text-white" />
                </a>
              )}
            </div>

            {/* Footer */}
            <div className="pt-6 border-t border-zinc-800/50 text-center">
              <div className="text-[10px] text-zinc-400">
                Hover to flip back
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
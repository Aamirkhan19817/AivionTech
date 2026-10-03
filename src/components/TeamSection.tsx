import React, { useState } from 'react';
import { TEAM_MEMBERS } from '../data/companyData';
import { TeamCanvas } from './TeamCanvas';
import { TeamMember } from '../types';
import { ScrollReveal } from './ScrollReveal';

export const TeamSection: React.FC = () => {
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);

  return (
    <section id="team" className="relative py-24 sm:py-32 bg-gray-950">
      {/* 3D Digital Room Background with Core and Network Lines */}
      <TeamCanvas />

      <ScrollReveal variant="3d-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal variant="fade-up">
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <div className="text-xs font-mono tracking-[0.25em] text-cyan-400 uppercase mb-3">
              LEADERSHIP & GOVERNANCE
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              OUR TEAM
            </h2>
            <p className="mt-3 text-base sm:text-lg text-gray-400">
              Meet the people behind AIVION TECH.
            </p>
          </div>
        </ScrollReveal>

        {/* 5 Team Cards Grid with Staggered Scroll Reveal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 lg:gap-6">
          {TEAM_MEMBERS.map((member, index) => (
            <ScrollReveal
              key={member.id}
              variant="3d-stagger"
              delay={index * 100}
              className="h-full"
            >
              <TeamMemberCard
                member={member}
                index={index}
                isHovered={hoveredMember === member.id}
                onHover={() => setHoveredMember(member.id)}
                onLeave={() => setHoveredMember(null)}
              />
            </ScrollReveal>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
};

interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  member,
  index,
  isHovered,
  onHover,
  onLeave,
}) => {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    // Subtle rotation toward cursor (max 8 degrees)
    setTilt({ rx: -y * 8, ry: x * 8 });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
    onLeave();
  };

  return (
    <div
      onMouseEnter={onHover}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative rounded-xl p-6 sm:p-7 transition-all duration-300 transform backdrop-blur-xl border flex flex-col items-center text-center cursor-default ${
        isHovered
          ? 'border-cyan-400/50 bg-gray-900/90 shadow-[0_15px_30px_-5px_rgba(6,182,212,0.2)]'
          : 'border-white/[0.08] bg-gray-900/40 hover:bg-gray-900/60'
      }`}
      style={{
        transform: `perspective(800px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) ${
          isHovered ? 'translateY(-4px)' : 'translateY(0)'
        }`,
        transition: 'transform 0.15s ease-out, border-color 0.25s, box-shadow 0.25s, background-color 0.25s',
      }}
    >
      {/* Top Index Marker */}
      <div className="w-full flex justify-between items-center mb-6">
        <span className="text-[11px] font-mono tracking-widest text-gray-500">
          MEMBER 0{index + 1}
        </span>
        <span
          className="w-1.5 h-1.5 rounded-full transition-all duration-300"
          style={{
            backgroundColor: member.accent,
            boxShadow: isHovered ? `0 0 10px ${member.accent}` : 'none',
          }}
        />
      </div>

      {/* 3D Avatar Container */}
      <div className="relative w-28 h-28 my-3 flex items-center justify-center">
        {/* Outer Orbiting Holographic Rings */}
        <div
          className={`absolute inset-0 rounded-full border border-dashed transition-all duration-700 pointer-events-none ${
            isHovered
              ? 'scale-110 rotate-90 border-cyan-400/60 opacity-100'
              : 'scale-100 rotate-0 border-white/10 opacity-40'
          }`}
        />
        <div
          className={`absolute -inset-2 rounded-full border transition-all duration-500 pointer-events-none ${
            isHovered
              ? 'scale-105 -rotate-45 border-cyan-400/40 opacity-80'
              : 'scale-95 rotate-0 border-transparent opacity-0'
          }`}
        />

        {/* Avatar Core Circle */}
        <div
          className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${member.color} border flex items-center justify-center transition-all duration-300 overflow-hidden ${
            isHovered
              ? 'border-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.6)]'
              : 'border-white/15 shadow-lg'
          }`}
        >
          {member.image ? (
            <img 
              src={member.image} 
              alt={member.name} 
              className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`} 
            />
          ) : (
            <>
              {/* Internal Geometric Mesh Lines */}
              <div className="absolute inset-0 opacity-25 subtle-grid" />
              {/* Initial Glyph */}
              <span className="font-display font-bold text-2xl tracking-wider text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] select-none">
                {member.initials}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Member Name */}
      <h3
        className={`font-display text-lg font-bold transition-colors duration-200 mt-4 mb-1 ${
          isHovered ? 'text-white text-glow' : 'text-gray-200'
        }`}
      >
        {member.name}
      </h3>

      {/* Role / Position */}
      <div className="mt-1 font-mono text-xs tracking-widest uppercase font-semibold text-cyan-400">
        {member.role}
      </div>

      <div className="text-[11px] text-gray-500 tracking-wider font-mono mt-1">
        AIVION TECH EXECUTIVE
      </div>
    </div>
  );
};

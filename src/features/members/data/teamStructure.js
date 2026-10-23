// SCIEnT student team structure, shared by the public team page and the admin portal.
// Role and sub-team names must match the enums in server/models/TeamMember.js.

// The four domains; Core members sit in the separate 'Cores' sub-team
export const DOMAINS = ['DevOps', 'Creatives', 'Corporate Communications', 'Project Management'];
export const CORE_SUBTEAM = 'Cores';

// Each Core member holds one of these special roles
export const CORE_ROLES = [
  'Technical Executive',
  'Facility Executive',
  'Project Operations Executive',
  'External Affairs Executive',
  'Internal Affairs Executive',
  'Core',
];

// Role a new member joins a domain with. Lateral inductees in DevOps, Creatives
// and Corporate Communications join directly as Manager instead.
export const entryRole = domain => (domain === 'Project Management' ? 'Manager' : 'Deputy Manager');

// Next role up within a domain; Senior Manager (from 26-27) is the top domain role.
// Project Manager is the 25-26 Project Management title, equivalent to Manager.
export const PROMOTION = {
  'Deputy Manager': 'Manager',
  Manager: 'Senior Manager',
  'Project Manager': 'Senior Manager',
};

// Roles offered per sub-team in the admin form, lowest first
export const ROLES_BY_SUBTEAM = {
  [CORE_SUBTEAM]: CORE_ROLES,
  'Project Management': ['Manager', 'Senior Manager', 'Project Manager'],
  'Corporate Communications': ['Deputy Manager', 'Manager', 'Senior Manager'],
  DevOps: ['Deputy Manager', 'Manager', 'Senior Manager'],
  Creatives: ['Deputy Manager', 'Manager', 'Senior Manager'],
};

// Roles without a sub-team (shown under SCIEnT Admin, not in a year's team)
export const STAFF_ROLES = ['Faculty Advisor', 'Admin Executive'];

export const ALL_ROLES = [...new Set([...Object.values(ROLES_BY_SUBTEAM).flat(), ...STAFF_ROLES])];
export const ALL_SUBTEAMS = [CORE_SUBTEAM, ...DOMAINS];

// ── Team years ('25-26' style) ───────────────────────────────────────────────

const YEAR_RE = /^(\d{2})-(\d{2})$/;

export const isTeamYear = y => {
  const m = YEAR_RE.exec(y || '');
  return !!m && Number(m[2]) === (Number(m[1]) + 1) % 100;
};

const pad = n => String(n % 100).padStart(2, '0');

export const nextTeamYear = y => {
  const start = Number(YEAR_RE.exec(y)[1]) + 1;
  return `${pad(start)}-${pad(start + 1)}`;
};

// Team year for the current academic year (July onwards counts as the new year)
export const currentTeamYear = (date = new Date()) => {
  const start = date.getFullYear() - (date.getMonth() < 6 ? 1 : 0);
  return `${pad(start)}-${pad(start + 1)}`;
};

// Distinct team years present in a member list, oldest first
export const teamYears = members =>
  [...new Set(members.map(m => m.year).filter(isTeamYear))].sort();

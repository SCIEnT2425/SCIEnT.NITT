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

// ── Departments ──────────────────────────────────────────────────────────────

// NIT Trichy departments, shown on every card by their short code
export const DEPARTMENTS = [
  { code: 'ARCH', name: 'Architecture' },
  { code: 'CHEM', name: 'Chemical Engineering' },
  { code: 'CIVIL', name: 'Civil Engineering' },
  { code: 'CSE', name: 'Computer Science and Engineering' },
  { code: 'ECE', name: 'Electronics and Communication Engineering' },
  { code: 'EEE', name: 'Electrical and Electronics Engineering' },
  { code: 'ICE', name: 'Instrumentation and Control Engineering' },
  { code: 'MECH', name: 'Mechanical Engineering' },
  { code: 'MME', name: 'Metallurgical and Materials Engineering' },
  { code: 'PROD', name: 'Production Engineering' },
  { code: 'BSc.BEd', name: 'B.Sc. B.Ed.' },
];

// Other spellings found in the data, keyed by lower-case letters only
const DEPARTMENT_VARIANTS = {
  computerscienceengineering: 'CSE',
  computerscience: 'CSE',
  chemical: 'CHEM',
  civil: 'CIVIL',
  mechanical: 'MECH',
  production: 'PROD',
  meta: 'MME',
};

const departmentKey = value => (value || '').toLowerCase().replace(/[^a-z]/g, '');
const CODE_BY_KEY = {
  ...DEPARTMENT_VARIANTS,
  ...Object.fromEntries(DEPARTMENTS.flatMap(d => [[departmentKey(d.code), d.code], [departmentKey(d.name), d.code]])),
};

// Short code ('CSE') for a department's code, full name or variant; anything else
// (faculty departments, 'SCIEnT Facility Operations') is returned trimmed
export const departmentCode = value => CODE_BY_KEY[departmentKey(value)] || (value || '').trim();

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

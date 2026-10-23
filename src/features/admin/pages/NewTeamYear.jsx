import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Loader2, Users, CalendarPlus } from 'lucide-react';
import { toast } from 'react-toastify';
import {
  DOMAINS, CORE_SUBTEAM, CORE_ROLES, PROMOTION, teamYears, nextTeamYear,
} from '../../members/data/teamStructure';

// What happens to a member in the new year. Encoded as a string for <select>:
//   'leave'        not continuing
//   'role:<Role>'  stays in their domain with this role
//   'core:<Role>'  selected as Core with this special role
const LEAVE = 'leave';

// Project Manager is the 25-26 name for a Project Management Manager
const currentDomainRole = role => (role === 'Project Manager' ? 'Manager' : role);

const isCore = m => m.subteam === CORE_SUBTEAM;

const choicesFor = (member) => {
  const options = [];
  if (!isCore(member)) {
    const promotion = PROMOTION[member.role];
    if (promotion) options.push({ value: `role:${promotion}`, label: `Promote to ${promotion}` });
    const same = currentDomainRole(member.role);
    options.push({ value: `role:${same}`, label: `Stay as ${same}` });
  }
  CORE_ROLES.forEach(r => options.push({
    value: `core:${r}`,
    label: isCore(member) && r === member.role ? `Stay as ${r} (Core)` : `Core — ${r}`,
  }));
  options.push({ value: LEAVE, label: 'Not continuing' });
  return options;
};

// Domain members default to their next role; Senior Managers and Cores to leaving
const defaultChoice = member =>
  !isCore(member) && PROMOTION[member.role] ? `role:${PROMOTION[member.role]}` : LEAVE;

const toAssignment = (member, choice) => {
  const [kind, role] = choice.split(/:(.*)/);
  return { id: member._id, role, subteam: kind === 'core' ? CORE_SUBTEAM : member.subteam };
};

const NewTeamYear = () => {
  const { token, API_BASE } = useAuth();
  const navigate = useNavigate();

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fromYear, setFromYear] = useState('');
  const [choices, setChoices] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    axios.get(`${API_BASE}/api/team/all`)
      .then(res => {
        const data = res.data.data || [];
        setMembers(data);
        setFromYear(teamYears(data).pop() || '');
      })
      .catch(() => toast.error('Failed to fetch team members from database'))
      .finally(() => setLoading(false));
  }, [API_BASE]);

  const years = teamYears(members);
  const toYear = fromYear ? nextTeamYear(fromYear) : '';
  const nameKey = name => (name || '').trim().toLowerCase();
  const alreadyInToYear = new Set(members.filter(m => m.year === toYear).map(m => nameKey(m.name)));

  const sources = members.filter(m => m.year === fromYear && m.subteam);
  const pending = sources.filter(m => !alreadyInToYear.has(nameKey(m.name)));
  const choiceOf = m => choices[m._id] || defaultChoice(m);

  const sections = [CORE_SUBTEAM, ...DOMAINS]
    .map(subteam => ({
      subteam,
      members: sources
        .filter(m => m.subteam === subteam)
        .sort((a, b) => (a.order || 0) - (b.order || 0)),
    }))
    .filter(s => s.members.length > 0);

  const assignments = pending.filter(m => choiceOf(m) !== LEAVE).map(m => toAssignment(m, choiceOf(m)));
  const toCore = assignments.filter(a => a.subteam === CORE_SUBTEAM).length;

  const handleFromYear = (year) => {
    setFromYear(year);
    setChoices({});
  };

  const handleSubmit = async () => {
    if (assignments.length === 0) {
      toast.error('Nobody is selected to continue');
      return;
    }
    if (!window.confirm(`Create the Team of ${toYear} with ${assignments.length} member(s) from ${fromYear}?`)) return;

    setSaving(true);
    try {
      const res = await axios.post(
        `${API_BASE}/api/team/carry-over`,
        { fromYear, toYear, members: assignments },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const { created, skipped } = res.data.data;
      toast.success(`Team of ${toYear}: ${created} member(s) carried over${skipped.length ? `, ${skipped.length} already there` : ''}. Now add the new inductees.`);
      navigate('/admin/team');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create the new team');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-yellow-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 pb-32">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/admin/team"
            className="p-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Start Next Year's Team</h1>
            <p className="text-zinc-500 text-sm">
              Choose who continues and in which role. New inductees are added afterwards with Add Member.
            </p>
          </div>
        </div>

        {years.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
            <Users className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
            <p className="text-zinc-400">No team years yet. Add the first team with Add Member.</p>
          </div>
        ) : (
          <>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-6 flex flex-col sm:flex-row sm:items-center gap-3">
              <label className="text-sm text-zinc-300 font-medium" htmlFor="from-year">From</label>
              <select
                id="from-year"
                value={fromYear}
                onChange={(e) => handleFromYear(e.target.value)}
                className="w-full sm:w-44 px-4 py-2 bg-zinc-950 border border-zinc-700 rounded-lg focus:outline-none focus:border-yellow-400 text-white"
              >
                {[...years].reverse().map(y => <option key={y} value={y}>Team of {y}</option>)}
              </select>
              <span className="text-sm text-zinc-300">
                to <span className="text-yellow-400 font-semibold">Team of {toYear}</span>
              </span>
              {alreadyInToYear.size > 0 && (
                <span className="text-xs text-zinc-500 sm:ml-auto">
                  {alreadyInToYear.size} member(s) already in {toYear} are skipped
                </span>
              )}
            </div>

            <div className="space-y-6">
              {sections.map(({ subteam, members: sectionMembers }) => (
                <section key={subteam} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                  <h2 className="px-4 py-3 border-b border-zinc-800 text-sm font-bold uppercase tracking-wide text-yellow-400">
                    {subteam === CORE_SUBTEAM ? 'Core' : subteam}
                  </h2>
                  <ul className="divide-y divide-zinc-800">
                    {sectionMembers.map(member => {
                      const done = alreadyInToYear.has(nameKey(member.name));
                      return (
                        <li key={member._id} className="px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-white truncate">{member.name}</p>
                            <p className="text-xs text-zinc-500">{member.role}</p>
                          </div>
                          {done ? (
                            <span className="text-xs text-zinc-500 sm:w-64">Already in {toYear}</span>
                          ) : (
                            <select
                              aria-label={`${member.name} in ${toYear}`}
                              value={choiceOf(member)}
                              onChange={(e) => setChoices(prev => ({ ...prev, [member._id]: e.target.value }))}
                              className={`w-full sm:w-64 px-3 py-2 bg-zinc-950 border rounded-lg focus:outline-none focus:border-yellow-400 text-sm ${
                                choiceOf(member) === LEAVE ? 'border-zinc-800 text-zinc-500' : 'border-zinc-700 text-white'
                              }`}
                            >
                              {choicesFor(member).map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                            </select>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ))}
            </div>
          </>
        )}
      </div>

      {years.length > 0 && (
        <div className="fixed bottom-0 inset-x-0 bg-zinc-950/95 border-t border-zinc-800 backdrop-blur-sm px-4 py-3">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center gap-3">
            <p className="text-sm text-zinc-300 flex-1">
              <span className="text-white font-semibold">{assignments.length}</span> continuing
              {toCore > 0 && <> ({toCore} as Core)</>}
              {' · '}
              <span className="text-white font-semibold">{pending.length - assignments.length}</span> not continuing
            </p>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={saving || assignments.length === 0}
              className="flex items-center justify-center gap-2 px-6 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CalendarPlus className="w-4 h-4" />}
              Create Team of {toYear}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewTeamYear;

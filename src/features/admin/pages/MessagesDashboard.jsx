import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import AdminTabs from '../components/AdminTabs';
import { Mail, LogOut, Loader2, Trash2, Reply, Check, Inbox } from 'lucide-react';
import { toast } from 'react-toastify';

const formatDate = iso =>
  new Date(iso).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' });

// Messages sent through the website's Contact Us form
const MessagesDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const { token, logout, API_BASE } = useAuth();
  const navigate = useNavigate();
  const auth = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    axios.get(`${API_BASE}/api/contact`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setMessages(res.data.data || []))
      .catch(() => toast.error('Failed to load messages'))
      .finally(() => setLoading(false));
  }, [API_BASE, token]);

  const setRead = async (msg, read) => {
    try {
      await axios.patch(`${API_BASE}/api/contact/${msg._id}`, { read }, auth);
      setMessages(prev => prev.map(m => (m._id === msg._id ? { ...m, read } : m)));
    } catch {
      toast.error('Could not update the message');
    }
  };

  const remove = async (msg) => {
    if (!window.confirm(`Delete the message from ${msg.name}? This cannot be undone.`)) return;
    try {
      await axios.delete(`${API_BASE}/api/contact/${msg._id}`, auth);
      setMessages(prev => prev.filter(m => m._id !== msg._id));
      toast.success('Message deleted');
    } catch {
      toast.error('Could not delete the message');
    }
  };

  const replyHref = msg =>
    `mailto:${msg.email}?subject=${encodeURIComponent(`Re: ${msg.subject || 'Your message to SCIEnT'}`)}`;

  const unread = messages.filter(m => !m.read).length;
  const shown = showUnreadOnly ? messages.filter(m => !m.read) : messages;

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Mail className="text-yellow-400 w-8 h-8" />
            Contact <span className="text-yellow-400">Messages</span>
          </h1>
          <p className="text-zinc-400 mt-1">Messages sent through the website's Contact Us form</p>
        </div>
        <button
          onClick={() => { logout(); navigate('/admin/login'); }}
          className="self-start md:self-auto flex items-center justify-center p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded-lg border border-zinc-700 transition-colors"
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Tabs */}
      <AdminTabs />

      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-4 mb-4">
          <p className="text-sm text-zinc-400">
            {messages.length} message{messages.length === 1 ? '' : 's'}, {unread} unread
          </p>
          <label className="flex items-center gap-2 text-sm text-zinc-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showUnreadOnly}
              onChange={e => setShowUnreadOnly(e.target.checked)}
              className="accent-yellow-400 w-4 h-4"
            />
            Unread only
          </label>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 text-yellow-400 animate-spin" />
          </div>
        ) : shown.length === 0 ? (
          <div className="bg-zinc-900 border-[1px] border-zinc-800 rounded-xl p-12 text-center">
            <Inbox className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">{showUnreadOnly ? 'No unread messages' : 'No messages yet'}</h3>
            <p className="text-zinc-400">Messages from the Contact Us form appear here.</p>
          </div>
        ) : (
          <ul className="space-y-4 p-0 m-0 list-none">
            {shown.map(msg => (
              <li
                key={msg._id}
                className={`bg-zinc-900 border-[1px] rounded-xl p-[20px] ${msg.read ? 'border-zinc-800' : 'border-yellow-400/40'}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-[12px]">
                  <div className="min-w-0">
                    <p className="m-0 font-semibold text-white flex items-center gap-2">
                      {!msg.read && <span className="w-2 h-2 rounded-full bg-yellow-400 shrink-0" aria-label="Unread" />}
                      {msg.name}
                      <a href={`mailto:${msg.email}`} className="text-sm font-normal text-zinc-400 hover:text-yellow-400 truncate">
                        {msg.email}
                      </a>
                    </p>
                    {msg.subject && <p className="m-0 mt-1 text-zinc-200">{msg.subject}</p>}
                  </div>
                  <span className="text-xs text-zinc-500 shrink-0">{formatDate(msg.createdAt)}</span>
                </div>
                <p className="m-0 text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed">{msg.message}</p>
                <div className="flex flex-wrap items-center gap-2 mt-[16px] pt-[12px] border-t border-zinc-800">
                  <a
                    href={replyHref(msg)}
                    className="flex items-center gap-1.5 px-[12px] py-1.5 text-sm rounded-lg bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
                  >
                    <Reply className="w-4 h-4" /> Reply
                  </a>
                  <button
                    type="button"
                    onClick={() => setRead(msg, !msg.read)}
                    className="flex items-center gap-1.5 px-[12px] py-1.5 text-sm rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200"
                  >
                    <Check className="w-4 h-4" /> Mark {msg.read ? 'unread' : 'read'}
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(msg)}
                    className="flex items-center gap-1.5 px-[12px] py-1.5 text-sm rounded-lg bg-zinc-800 hover:bg-red-600 text-zinc-200 ml-auto"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                  {!msg.emailed && (
                    <span className="basis-full text-xs text-zinc-500">Not emailed (email isn't configured or failed); only shown here.</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MessagesDashboard;

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Save, Loader2, Palette } from 'lucide-react';
import { toast } from 'react-toastify';
import MemberCard from '../../members/components/MemberCard';

const TeamMemberForm = () => {
  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();
  const { token, API_BASE } = useAuth();

  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    subteam: '',
    Department: '',
    photoUrl: '',
    linkedin: '',
    instagram: '',
    email: '',
    year: '',
    description: '',
    order: 0,
    cardColor: '#facc15'
  });

  const roles = [
    'Faculty Advisor', 'Core', 'Ex-Core', 'Senior Manager', 'Manager', 'Deputy Manager', 
    'Senior Project Manager', 'Project Manager',
    'Admin Executive', 'Technical Executive', 'Facility Executive', 
    'External Affairs Executive', 'Internal Affairs Executive', 
    'Project Operations Executive'
  ];

  const subteams = [
    'Cores', 'Ex-Cores', 'Project Management', 'DevOps', 'Corporate Communications', 'Creatives'
  ];

  const presetColors = [
    { name: 'SCIEnT Gold', hex: '#facc15' },
    { name: 'Cyber Cyan', hex: '#38bdf8' },
    { name: 'Electric Purple', hex: '#a78bfa' },
    { name: 'Neon Pink', hex: '#f472b6' },
    { name: 'Emerald Green', hex: '#34d399' },
    { name: 'Sunset Orange', hex: '#fb923c' },
    { name: 'Cobalt Blue', hex: '#60a5fa' },
    { name: 'Crimson Red', hex: '#f87171' }
  ];

  useEffect(() => {
    if (isEditMode) {
      const fetchMember = async () => {
        try {
          const response = await axios.get(`${API_BASE}/api/team/${id}`);
          const data = response.data.data || response.data;
          
          const sanitizedData = {};
          Object.keys(formData).forEach(key => {
            sanitizedData[key] = data[key] !== null && data[key] !== undefined ? data[key] : (key === 'cardColor' ? '#facc15' : '');
          });
          
          setFormData(sanitizedData);
        } catch (error) {
          toast.error('Failed to fetch member details');
          navigate('/admin/team');
        } finally {
          setLoading(false);
        }
      };
      fetchMember();
    }
  }, [id, isEditMode, navigate, API_BASE]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleColorSelect = (hex) => {
    setFormData(prev => ({ ...prev, cardColor: hex }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.role) {
      toast.error('Name and Role are required');
      return;
    }

    setSaving(true);
    
    try {
      const payload = { ...formData };
      
      if (payload.subteam === '') payload.subteam = null;
      if (payload.order !== '') payload.order = Number(payload.order);

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      if (isEditMode) {
        await axios.put(`${API_BASE}/api/team/${id}`, payload, config);
        toast.success('Member updated successfully');
      } else {
        await axios.post(`${API_BASE}/api/team`, payload, config);
        toast.success('Member added successfully');
      }
      
      navigate('/admin/team');
    } catch (error) {
      toast.error(error.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'add'} member`);
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
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link 
            to="/admin/team" 
            className="p-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{isEditMode ? 'Edit Member' : 'Add New Member'}</h1>
            <p className="text-zinc-500 text-sm">Fill in the details below & customize your card</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Form Controls */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 bg-zinc-900 border border-zinc-800 rounded-xl p-6 md:p-8 space-y-6">
            
            {/* Color Customization Section */}
            <div className="p-4 bg-zinc-950/60 border border-zinc-800 rounded-xl space-y-3">
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-yellow-400" />
                <label className="text-sm font-semibold text-white">Custom Card Accent Color</label>
              </div>
              <p className="text-xs text-zinc-400">Choose a signature color accent for this member's card</p>
              
              <div className="flex flex-wrap gap-2 pt-1">
                {presetColors.map((color) => (
                  <button
                    key={color.hex}
                    type="button"
                    title={color.name}
                    onClick={() => handleColorSelect(color.hex)}
                    className={`w-8 h-8 rounded-full border-2 transition-all transform hover:scale-110 flex items-center justify-center ${
                      formData.cardColor?.toLowerCase() === color.hex.toLowerCase()
                        ? 'border-white scale-110 shadow-lg'
                        : 'border-transparent opacity-80 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  >
                    {formData.cardColor?.toLowerCase() === color.hex.toLowerCase() && (
                      <span className="w-2 h-2 rounded-full bg-white shadow"></span>
                    )}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-2">
                <span className="text-xs text-zinc-400">Custom Picker:</span>
                <input
                  type="color"
                  name="cardColor"
                  value={formData.cardColor || '#facc15'}
                  onChange={handleChange}
                  className="w-10 h-8 bg-transparent border-0 cursor-pointer rounded overflow-hidden"
                />
                <span className="text-xs font-mono text-zinc-300 uppercase bg-zinc-900 px-2 py-1 rounded border border-zinc-800">
                  {formData.cardColor || '#facc15'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg focus:outline-none focus:border-yellow-400 text-white"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Role *</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg focus:outline-none focus:border-yellow-400 text-white"
                  required
                >
                  <option value="">Select a role</option>
                  {roles.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Subteam</label>
                <select
                  name="subteam"
                  value={formData.subteam}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg focus:outline-none focus:border-yellow-400 text-white"
                >
                  <option value="">None</option>
                  {subteams.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Department</label>
                <input
                  type="text"
                  name="Department"
                  value={formData.Department}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg focus:outline-none focus:border-yellow-400 text-white"
                  placeholder="E.g., Computer Science"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Year</label>
                <input
                  type="text"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg focus:outline-none focus:border-yellow-400 text-white"
                  placeholder="E.g., 2024"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Photo URL</label>
                <input
                  type="text"
                  name="photoUrl"
                  value={formData.photoUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg focus:outline-none focus:border-yellow-400 text-white"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg focus:outline-none focus:border-yellow-400 text-white"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Order</label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg focus:outline-none focus:border-yellow-400 text-white"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">LinkedIn URL</label>
                <input
                  type="text"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg focus:outline-none focus:border-yellow-400 text-white"
                  placeholder="https://linkedin.com/in/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Instagram URL</label>
                <input
                  type="text"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg focus:outline-none focus:border-yellow-400 text-white"
                  placeholder="https://instagram.com/..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Description / Bio</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg focus:outline-none focus:border-yellow-400 text-white resize-none"
                placeholder="Brief intro..."
              />
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-zinc-800">
              <Link 
                to="/admin/team"
                className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg font-medium transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>{isEditMode ? 'Update Member' : 'Create Member'}</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Right: Live Preview Panel */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="sticky top-8 w-full flex flex-col items-center p-6 bg-zinc-900 border border-zinc-800 rounded-xl space-y-4">
              <div className="text-center">
                <span className="text-xs font-bold text-yellow-400 tracking-wider uppercase">Live Card Preview</span>
                <p className="text-xs text-zinc-500">Hover or click to flip the card</p>
              </div>

              <div className="w-full flex justify-center py-4">
                <MemberCard 
                  member={{
                    name: formData.name || 'Member Name',
                    role: formData.role || 'Role Title',
                    subteam: formData.subteam || 'Subteam',
                    Department: formData.Department || 'Department',
                    year: formData.year || '4th Year',
                    photoUrl: formData.photoUrl,
                    email: formData.email || 'email@example.com',
                    linkedin: formData.linkedin || 'https://linkedin.com',
                    instagram: formData.instagram || 'https://instagram.com',
                    description: formData.description || 'Custom member bio will be displayed here on card flip.',
                    cardColor: formData.cardColor || '#facc15'
                  }}
                  index={0}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberForm;

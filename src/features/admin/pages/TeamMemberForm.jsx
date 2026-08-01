import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

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
    order: 0
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

  useEffect(() => {
    if (isEditMode) {
      const fetchMember = async () => {
        try {
          const response = await axios.get(`${API_BASE}/api/team/${id}`);
          const data = response.data.data || response.data;
          
          // Ensure null/undefined values become empty strings for inputs
          const sanitizedData = {};
          Object.keys(formData).forEach(key => {
            sanitizedData[key] = data[key] !== null && data[key] !== undefined ? data[key] : '';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.role) {
      toast.error('Name and Role are required');
      return;
    }

    setSaving(true);
    
    try {
      const payload = { ...formData };
      
      // Clean up empty strings for optional fields that might expect null or specific types
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
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link 
            to="/admin/team" 
            className="p-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{isEditMode ? 'Edit Member' : 'Add New Member'}</h1>
            <p className="text-zinc-500 text-sm">Fill in the details below</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-5">
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
            </div>

            {/* Right Column */}
            <div className="space-y-5">
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

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Display Order</label>
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
            
            {/* Full Width */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-zinc-300 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg focus:outline-none focus:border-yellow-400 text-white resize-y"
                placeholder="Brief bio or description..."
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-4 border-t border-zinc-800 pt-6">
            <Link 
              to="/admin/team"
              className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-medium transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg font-semibold transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {isEditMode ? 'Update Member' : 'Save Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeamMemberForm;

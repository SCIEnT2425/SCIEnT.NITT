import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { Loader2, ArrowLeft, FolderOpen } from 'lucide-react';

const ProjectForm = () => {
  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();
  const { token, API_BASE } = useAuth();
  
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditMode);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    club: '',
    year: new Date().getFullYear(),
    imageUrl: '',
    imageFilename: ''
  });

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await axios.get(`${API_BASE}/api/clubs`);
        setClubs(response.data.data || response.data || []);
      } catch (error) {
        toast.error('Failed to fetch clubs');
        console.error(error);
      }
    };
    fetchClubs();
  }, [API_BASE]);

  useEffect(() => {
    if (isEditMode) {
      const fetchProject = async () => {
        try {
          const response = await axios.get(`${API_BASE}/api/projects/${id}`);
          const project = response.data.data || response.data;
          
          setFormData({
            name: project.name || '',
            description: project.description || '',
            club: project.club?._id || project.club || '',
            year: project.year || new Date().getFullYear(),
            imageUrl: project.image?.url || '',
            imageFilename: project.image?.filename || ''
          });
        } catch (error) {
          toast.error('Failed to fetch project details');
          console.error(error);
          navigate('/admin/projects');
        } finally {
          setInitialLoading(false);
        }
      };
      fetchProject();
    }
  }, [id, isEditMode, API_BASE, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.name || !formData.description || !formData.club || !formData.year) {
      toast.error('Please fill in all required fields');
      setLoading(false);
      return;
    }

    const payload = {
      name: formData.name,
      description: formData.description,
      club: formData.club,
      year: Number(formData.year),
      image: {
        url: formData.imageUrl,
        filename: formData.imageFilename
      }
    };

    try {
      const headers = { Authorization: `Bearer ${token}` };
      
      if (isEditMode) {
        await axios.put(`${API_BASE}/api/projects/${id}`, payload, { headers });
        toast.success('Project updated successfully');
      } else {
        await axios.post(`${API_BASE}/api/projects`, payload, { headers });
        toast.success('Project created successfully');
      }
      navigate('/admin/projects');
    } catch (error) {
      toast.error(error.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'create'} project`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <Loader2 className="w-12 h-12 text-yellow-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link 
            to="/admin/projects" 
            className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg border border-zinc-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
              <FolderOpen className="text-yellow-400 w-8 h-8" />
              {isEditMode ? 'Edit' : 'Add'} <span className="text-yellow-400">Project</span>
            </h1>
            <p className="text-zinc-400 mt-1">
              {isEditMode ? 'Update project details' : 'Create a new project'}
            </p>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-300">
                  Project Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Autonomous Rover"
                  className="w-full px-4 py-2 bg-zinc-950 border border-zinc-700 rounded-lg focus:outline-none focus:border-yellow-400 text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-300">
                  Club <span className="text-red-500">*</span>
                </label>
                <select
                  name="club"
                  value={formData.club}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-zinc-950 border border-zinc-700 rounded-lg focus:outline-none focus:border-yellow-400 text-white"
                  required
                >
                  <option value="">Select a club...</option>
                  {clubs.map(club => (
                    <option key={club._id} value={club._id}>
                      {club.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-300">
                  Year <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  placeholder="e.g., 2024"
                  className="w-full px-4 py-2 bg-zinc-950 border border-zinc-700 rounded-lg focus:outline-none focus:border-yellow-400 text-white"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-300">
                  Image URL
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-2 bg-zinc-950 border border-zinc-700 rounded-lg focus:outline-none focus:border-yellow-400 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-300">
                  Image Filename
                </label>
                <input
                  type="text"
                  name="imageFilename"
                  value={formData.imageFilename}
                  onChange={handleChange}
                  placeholder="e.g., project-thumbnail.jpg"
                  className="w-full px-4 py-2 bg-zinc-950 border border-zinc-700 rounded-lg focus:outline-none focus:border-yellow-400 text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-300">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the project..."
                rows="5"
                className="w-full px-4 py-2 bg-zinc-950 border border-zinc-700 rounded-lg focus:outline-none focus:border-yellow-400 text-white resize-y"
                required
              />
            </div>

            <div className="pt-4 flex items-center justify-end gap-4 border-t border-zinc-800">
              <Link
                to="/admin/projects"
                className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-medium transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg font-bold transition-colors flex items-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {isEditMode ? 'Update Project' : 'Create Project'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;

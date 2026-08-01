import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Plus, Edit, Trash2, Search, LogOut, FolderOpen, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

const ProjectDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [clubFilter, setClubFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { token, logout, API_BASE } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const fetchData = async () => {
    try {
      setLoading(true);
      const [projectsRes, clubsRes] = await Promise.all([
        axios.get(`${API_BASE}/api/projects`),
        axios.get(`${API_BASE}/api/clubs`)
      ]);
      const pData = Array.isArray(projectsRes.data) ? projectsRes.data : (projectsRes.data?.data || []);
      const cData = Array.isArray(clubsRes.data) ? clubsRes.data : (clubsRes.data?.data || []);
      setProjects(pData);
      setClubs(cData);
    } catch (error) {
      toast.error('Failed to fetch data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const confirmDelete = async () => {
    if (!projectToDelete) return;
    try {
      setIsDeleting(true);
      await axios.delete(`${API_BASE}/api/projects/${projectToDelete._id || projectToDelete.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Project deleted successfully');
      setProjectToDelete(null);
      setShowDeleteModal(false);
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete project');
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const projectList = Array.isArray(projects) ? projects : [];
  const clubList = Array.isArray(clubs) ? clubs : [];

  const years = [...new Set(projectList.map(p => p?.year))].filter(Boolean).sort((a, b) => b - a);

  const filteredProjects = projectList.filter(project => {
    if (!project) return false;
    const nameStr = project.name ? String(project.name) : '';
    const matchesSearch = nameStr.toLowerCase().includes((search || '').toLowerCase());
    const matchesClub = clubFilter ? (project.club?._id === clubFilter || project.club === clubFilter) : true;
    const matchesYear = yearFilter ? (project.year != null && String(project.year) === String(yearFilter)) : true;
    return matchesSearch && matchesClub && matchesYear;
  });

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <FolderOpen className="text-yellow-400 w-8 h-8" />
            Project <span className="text-yellow-400">Management</span>
          </h1>
          <p className="text-zinc-400 mt-1">Manage projects and clubs</p>
        </div>
        <div className="flex items-center gap-3">
          <Link 
            to="/admin/projects/new" 
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Project
          </Link>
          <button 
            onClick={handleLogout}
            className="flex items-center justify-center p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded-lg border border-zinc-700 transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto mb-6 flex bg-zinc-900/90 border border-zinc-800 p-1 rounded-xl w-full sm:w-fit gap-1 backdrop-blur-sm">
        <Link 
          to="/admin/team"
          className={`flex-1 sm:flex-none text-center px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
            location.pathname.includes('/admin/team') 
              ? 'bg-yellow-400 text-black shadow-md shadow-yellow-400/10' 
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
          }`}
        >
          Team Members
        </Link>
        <Link 
          to="/admin/projects"
          className={`flex-1 sm:flex-none text-center px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
            location.pathname.includes('/admin/projects') 
              ? 'bg-yellow-400 text-black shadow-md shadow-yellow-400/10' 
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
          }`}
        >
          Projects
        </Link>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Filters */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-zinc-950 border border-zinc-700 rounded-lg focus:outline-none focus:border-yellow-400 text-white"
            />
          </div>
          <select 
            value={clubFilter} 
            onChange={(e) => setClubFilter(e.target.value)}
            className="w-full md:w-48 px-4 py-2 bg-zinc-950 border border-zinc-700 rounded-lg focus:outline-none focus:border-yellow-400 text-white"
          >
            <option value="">All Clubs</option>
            {clubList.map(c => <option key={c._id || c.id} value={c._id || c.id}>{c.name}</option>)}
          </select>
          <select 
            value={yearFilter} 
            onChange={(e) => setYearFilter(e.target.value)}
            className="w-full md:w-48 px-4 py-2 bg-zinc-950 border border-zinc-700 rounded-lg focus:outline-none focus:border-yellow-400 text-white"
          >
            <option value="">All Years</option>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 text-yellow-400 animate-spin" />
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
            <FolderOpen className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">No projects found</h3>
            <p className="text-zinc-400">Adjust your search filters or add a new project.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProjects.map((project) => (
              <div key={project._id || project.id} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex flex-col group hover:border-yellow-400/50 transition-colors">
                <div className="h-48 overflow-hidden bg-zinc-950 flex items-center justify-center relative">
                  {project.image?.url ? (
                    <img 
                      src={project.image.url} 
                      alt={project.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/400x400?text=No+Image'; }}
                    />
                  ) : (
                    <FolderOpen className="w-16 h-16 text-zinc-800" />
                  )}
                  {/* Action Overlay */}
                  <div className="absolute top-0 right-0 p-3 flex gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-bl from-black/80 to-transparent w-full justify-end">
                    <Link 
                      to={`/admin/projects/edit/${project._id || project.id}`}
                      className="p-2 bg-zinc-800/80 hover:bg-zinc-700 text-white rounded-lg backdrop-blur-sm"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button 
                      onClick={() => {
                        setProjectToDelete(project);
                        setShowDeleteModal(true);
                      }}
                      className="p-2 bg-red-500/80 hover:bg-red-600 text-white rounded-lg backdrop-blur-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-white mb-1">{project.name}</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2 py-1 bg-yellow-400/10 text-yellow-400 text-xs rounded-md border border-yellow-400/20 font-medium">
                      {project.club?.name || 'Club'}
                    </span>
                    <span className="px-2 py-1 bg-zinc-800 text-zinc-300 text-xs rounded-md border border-zinc-700">
                      {project.year}
                    </span>
                  </div>
                  {project.description && (
                    <p className="text-zinc-500 text-sm mt-auto line-clamp-2">{project.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-2">Delete Project</h3>
            <p className="text-zinc-400 mb-6">
              Are you sure you want to delete <span className="text-white font-semibold">{projectToDelete?.name}</span>? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDashboard;

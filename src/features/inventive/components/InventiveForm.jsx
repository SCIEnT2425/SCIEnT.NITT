import { useState, useEffect } from "react";
import "../styles/Inventive.css";
import {
  Instagram,
  Linkedin,
  MessageCircle,
  QrCode,
  HelpCircle,
  Calendar,
  User,
  Sparkles,
  Users,
  Check,
  ChevronDown,
  Clock,
  AlertCircle,
  GraduationCap,
  BookOpen,
  Phone,
  Hash,
  Plus,
  Minus,
  CheckCircle2,
  Send,
  Lightbulb,
  FileText,
  Award,
  ArrowRight,
  RefreshCw
} from "lucide-react";

const PRESENTATION_DATES = [
  { date: "5th October", day: "Monday" },
  { date: "6th October", day: "Tuesday" },
  { date: "7th October", day: "Wednesday" },
  { date: "8th October", day: "Thursday" },
];

const SECTIONS = [
  { id: "section-personal", label: "Personal", num: "01" },
  { id: "section-availability", label: "Availability", num: "02" },
  { id: "section-discovery", label: "Discovery", num: "03" },
  { id: "section-project", label: "Project", num: "04" },
  { id: "section-team", label: "Team", num: "05" },
];

export default function ProjectForm() {
  const [formData, setFormData] = useState({
    roll: "",
    branch: "",
    year: "",
    name: "",
    age: "",
    dob: "",
    mobile: "",
    source: "",
    otherSource: "",
    projectDescription: "",
    problemStatement: "",
    teamSize: 1,
    members: [],
    availableDates: [],
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAgeAutoCalculated, setIsAgeAutoCalculated] = useState(false);
  const [activeSection, setActiveSection] = useState("section-personal");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Active section scroll observer
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      const offset = 120;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Auto calculate age from DOB
  const calculateAge = (dobString) => {
    if (!dobString) return "";
    const birthDate = new Date(dobString);
    if (isNaN(birthDate.getTime())) return "";
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age > 0 ? age.toString() : "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "dob") {
      const autoAge = calculateAge(value);
      setFormData((prev) => ({
        ...prev,
        dob: value,
        age: autoAge || prev.age,
      }));
      setIsAgeAutoCalculated(!!autoAge);
      if (autoAge) {
        if (Number(autoAge) <= 15) {
          setErrors((prev) => ({ ...prev, age: "Age must be greater than 15", dob: undefined }));
        } else {
          setErrors((prev) => ({ ...prev, age: undefined, dob: undefined }));
        }
      }
    } else if (name === "age") {
      setIsAgeAutoCalculated(false);
      setFormData((prev) => ({ ...prev, age: value }));
      if (value && Number(value) > 15) {
        setErrors((prev) => ({ ...prev, age: undefined }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    }
  };

  const handleDateToggle = (date) => {
    setFormData((prev) => {
      const current = prev.availableDates || [];
      const updated = current.includes(date)
        ? current.filter((d) => d !== date)
        : [...current, date];
      return { ...prev, availableDates: updated };
    });
    setErrors((prev) => ({ ...prev, availableDates: undefined }));
  };

  const handleSelectAllDates = () => {
    const allDateStrings = PRESENTATION_DATES.map((d) => d.date);
    if (formData.availableDates.length === PRESENTATION_DATES.length) {
      setFormData((prev) => ({ ...prev, availableDates: [] }));
    } else {
      setFormData((prev) => ({ ...prev, availableDates: [...allDateStrings] }));
    }
    setErrors((prev) => ({ ...prev, availableDates: undefined }));
  };

  const handleTeamSizeChange = (newSize) => {
    const size = Math.min(10, Math.max(1, parseInt(newSize) || 1));
    setFormData({
      ...formData,
      teamSize: size,
      members: Array(size - 1)
        .fill()
        .map(
          (_, i) =>
            formData.members[i] || { name: "", roll: "", branch: "", year: "" }
        ),
    });
    setErrors((prev) => ({ ...prev, teamSize: undefined }));
  };

  const handleMemberChange = (index, field, value) => {
    const updated = [...formData.members];
    updated[index][field] = value;
    setFormData({ ...formData, members: updated });
    if (errors[`member${index}_${field}`]) {
      setErrors((prev) => ({ ...prev, [`member${index}_${field}`]: undefined }));
    }
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.roll.trim()) newErrors.roll = "Roll number is required";
    if (!formData.branch) newErrors.branch = "Branch is required";
    if (!formData.year) newErrors.year = "Year of study is required";
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    
    // Validation: age must be > 15
    if (!formData.age || isNaN(formData.age) || Number(formData.age) <= 15) {
      newErrors.age = "Age must be greater than 15";
    }

    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!/^\d{10}$/.test(formData.mobile))
      newErrors.mobile = "Enter a valid 10-digit mobile number";
    if (!formData.source) newErrors.source = "Please select how you heard about us";
    if (formData.source === "Other" && !formData.otherSource.trim())
      newErrors.otherSource = "Please specify other source";
    if (!formData.projectDescription.trim() && !formData.problemStatement) {
      newErrors.projectDescription = "Enter a project description or select a problem statement";
    }
    if (!formData.teamSize) newErrors.teamSize = "Please select team size";

    // Validation: available dates for presentation
    if (!formData.availableDates || formData.availableDates.length === 0) {
      newErrors.availableDates = "Please select at least one available date for the presentation";
    }

    formData.members.forEach((member, i) => {
      if (!member.name.trim())
        newErrors[`member${i}_name`] = `Member ${i + 2} name required`;
      if (!member.roll.trim())
        newErrors[`member${i}_roll`] = `Member ${i + 2} roll required`;
      if (!member.branch)
        newErrors[`member${i}_branch`] = `Member ${i + 2} branch required`;
      if (!member.year)
        newErrors[`member${i}_year`] = `Member ${i + 2} year required`;
    });

    setErrors(newErrors);

    // Scroll to first error
    const firstErrorKey = Object.keys(newErrors)[0];
    if (firstErrorKey) {
      if (["roll", "name", "branch", "year", "dob", "age", "mobile"].includes(firstErrorKey)) {
        scrollToSection("section-personal");
      } else if (firstErrorKey === "availableDates") {
        scrollToSection("section-availability");
      } else if (["source", "otherSource"].includes(firstErrorKey)) {
        scrollToSection("section-discovery");
      } else if (firstErrorKey === "projectDescription") {
        scrollToSection("section-project");
      } else if (firstErrorKey.startsWith("member") || firstErrorKey === "teamSize") {
        scrollToSection("section-team");
      }
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    const payload = {
      ...formData,
      projectDescription: formData.projectDescription || formData.problemStatement,
    };

    const API_BASE = process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";
    try {
      const response = await fetch(`${API_BASE}/api/inventiveForm/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({
          roll: "",
          branch: "",
          year: "",
          name: "",
          age: "",
          dob: "",
          mobile: "",
          source: "",
          otherSource: "",
          projectDescription: "",
          problemStatement: "",
          teamSize: 1,
          members: [],
          availableDates: [],
        });
        setErrors({});
        setIsAgeAutoCalculated(false);
      } else {
        const errorMessage = await response.text();
        alert(`Submission Error: ${errorMessage}`);
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Network error. Please check if the backend server is running on port 5000.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative top-10 mb-20 bg-black text-gray-100 font-sans selection:bg-yellow-400 selection:text-black overflow-hidden">
      
      {/* Ambient Radial Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] sm:w-[1000px] h-[500px] bg-gradient-to-b from-amber-500/15 via-yellow-500/10 to-transparent blur-[140px] pointer-events-none -z-0"></div>
      <div className="absolute top-[40%] right-[-100px] w-[500px] h-[500px] bg-yellow-500/10 blur-[130px] rounded-full pointer-events-none -z-0"></div>
      <div className="absolute bottom-[10%] left-[-100px] w-[500px] h-[500px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none -z-0"></div>

      {/* Main Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* HERO / HEADER */}
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-500/30 text-yellow-400 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-5 shadow-[0_0_15px_rgba(234,179,8,0.15)]">
            <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
            <span>INVENTIVE 2026 • PROJECT REGISTRATION</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-amber-400 to-yellow-500 mb-4 drop-shadow-sm">
            INVENTIVE
          </h1>
          
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-4 tracking-wide uppercase">
            REGISTRATION PORTAL
          </h2>

          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-6 leading-relaxed">
            Bring your idea, find your team, and build something impactful. Turn your concept into innovation.
          </p>

          {/* Quick info feature pills */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-gray-300 font-medium pt-2 border-t border-zinc-900 max-w-xl mx-auto">
            <div className="flex items-center gap-1.5 bg-zinc-900/80 px-3 py-1.5 rounded-full border border-zinc-800">
              <CheckCircle2 className="w-4 h-4 text-yellow-400" />
              <span>Required fields</span>
            </div>
            <div className="flex items-center gap-1.5 bg-zinc-900/80 px-3 py-1.5 rounded-full border border-zinc-800">
              <CheckCircle2 className="w-4 h-4 text-yellow-400" />
              <span>Multiple presentation dates</span>
            </div>
            <div className="flex items-center gap-1.5 bg-zinc-900/80 px-3 py-1.5 rounded-full border border-zinc-800">
              <CheckCircle2 className="w-4 h-4 text-yellow-400" />
              <span>Team registration supported</span>
            </div>
          </div>
        </div>

        {/* STICKY FORM PROGRESS INDICATOR */}
        <div className="sticky top-20 z-40 mb-10 bg-zinc-950/90 backdrop-blur-md p-2.5 sm:p-3.5 rounded-2xl border border-zinc-800/90 shadow-2xl">
          <div className="flex items-center justify-between overflow-x-auto no-scrollbar gap-2 px-1">
            {SECTIONS.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => scrollToSection(sec.id)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? "bg-yellow-400 text-black shadow-md shadow-yellow-400/20 scale-105"
                      : "text-gray-400 hover:text-white hover:bg-zinc-900/80"
                  }`}
                >
                  <span className={`font-mono text-[10px] sm:text-xs px-1.5 py-0.5 rounded ${
                    isActive ? "bg-black/20 text-black" : "bg-zinc-900 text-yellow-400/80"
                  }`}>
                    {sec.num}
                  </span>
                  <span>{sec.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* SUCCESS NOTIFICATION TOAST */}
        {submitSuccess && (
          <div className="mb-10 bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 border-2 border-yellow-400 rounded-3xl p-6 sm:p-8 text-center shadow-2xl shadow-yellow-500/10 animate-fade-in">
            <div className="inline-flex items-center justify-center p-4 bg-yellow-400 text-black rounded-2xl mb-4 shadow-lg shadow-yellow-400/30">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-yellow-400 mb-2">
              Registration Submitted!
            </h3>
            <p className="text-gray-300 text-sm sm:text-base max-w-lg mx-auto mb-6">
              Your INVENTIVE project registration has been successfully recorded in the database.
            </p>
            <button
              type="button"
              onClick={() => setSubmitSuccess(false)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-yellow-400 text-black font-extrabold text-sm hover:bg-yellow-300 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Submit Another Registration</span>
            </button>
          </div>
        )}

        <form className="space-y-10" onSubmit={handleSubmit}>
          
          {/* 01 PERSONAL DETAILS CARD */}
          <div
            id="section-personal"
            className="bg-zinc-950/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 md:p-10 border border-zinc-800/80 shadow-2xl hover:border-yellow-500/30 transition-all duration-300 relative group"
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-8 pb-4 border-b border-zinc-900">
              <div className="w-10 h-10 rounded-2xl bg-yellow-400/10 border border-yellow-500/30 flex items-center justify-center font-mono font-bold text-yellow-400 text-sm">
                01
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide uppercase flex items-center gap-2">
                  <User className="w-5 h-5 text-yellow-400" />
                  Personal Details
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                  Tell us about yourself and your academic standing
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Roll Number */}
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-1">
                  Roll Number <span className="text-yellow-400">*</span>
                </label>
                <div className="relative">
                  <Hash className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="text"
                    name="roll"
                    value={formData.roll}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-900/90 border text-white placeholder-zinc-600 focus:outline-none focus:ring-2 transition-all ${
                      errors.roll
                        ? "border-red-500/80 focus:ring-red-500/20 bg-red-950/10"
                        : "border-zinc-800 focus:border-yellow-400 focus:ring-yellow-400/20"
                    }`}
                    placeholder="e.g. 106121001"
                  />
                </div>
                <p className="text-[11px] text-zinc-500 mt-1">
                  Use your official institute roll number.
                </p>
                {errors.roll && (
                  <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.roll}
                  </p>
                )}
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-1">
                  Full Name <span className="text-yellow-400">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-900/90 border text-white placeholder-zinc-600 focus:outline-none focus:ring-2 transition-all ${
                      errors.name
                        ? "border-red-500/80 focus:ring-red-500/20 bg-red-950/10"
                        : "border-zinc-800 focus:border-yellow-400 focus:ring-yellow-400/20"
                    }`}
                    placeholder="Enter your complete name"
                  />
                </div>
                <p className="text-[11px] text-zinc-500 mt-1">
                  Your full name as per college records.
                </p>
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Branch */}
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-1">
                  Branch <span className="text-yellow-400">*</span>
                </label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5 pointer-events-none" />
                  <select
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-10 py-3 rounded-xl bg-zinc-900/90 border text-white appearance-none focus:outline-none focus:ring-2 transition-all cursor-pointer ${
                      errors.branch
                        ? "border-red-500/80 focus:ring-red-500/20 bg-red-950/10"
                        : "border-zinc-800 focus:border-yellow-400 focus:ring-yellow-400/20"
                    }`}
                  >
                    <option value="">Select Branch</option>
                    <option value="Architecture">Architecture</option>
                    <option value="Chemical Engineering">Chemical Engineering</option>
                    <option value="Civil Engineering">Civil Engineering</option>
                    <option value="Computer Science and Engineering">Computer Science and Engineering</option>
                    <option value="Electrical and Electronics Engineering">Electrical and Electronics Engineering</option>
                    <option value="Electronics and Communication Engineering">Electronics and Communication Engineering</option>
                    <option value="Instrumentation and Control Engineering">Instrumentation and Control Engineering</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Metallurgical and Materials Engineering">Metallurgical and Materials Engineering</option>
                    <option value="Production Engineering">Production Engineering</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-zinc-500 absolute right-3.5 top-3.5 pointer-events-none" />
                </div>
                {errors.branch && (
                  <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.branch}
                  </p>
                )}
              </div>

              {/* Year of Study */}
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-1">
                  Year of Study <span className="text-yellow-400">*</span>
                </label>
                <div className="relative">
                  <BookOpen className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5 pointer-events-none" />
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-10 py-3 rounded-xl bg-zinc-900/90 border text-white appearance-none focus:outline-none focus:ring-2 transition-all cursor-pointer ${
                      errors.year
                        ? "border-red-500/80 focus:ring-red-500/20 bg-red-950/10"
                        : "border-zinc-800 focus:border-yellow-400 focus:ring-yellow-400/20"
                    }`}
                  >
                    <option value="">Select Year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-zinc-500 absolute right-3.5 top-3.5 pointer-events-none" />
                </div>
                {errors.year && (
                  <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.year}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-1">
                  Date of Birth <span className="text-yellow-400">*</span>
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-900/90 border text-white focus:outline-none focus:ring-2 transition-all ${
                      errors.dob
                        ? "border-red-500/80 focus:ring-red-500/20 bg-red-950/10"
                        : "border-zinc-800 focus:border-yellow-400 focus:ring-yellow-400/20"
                    }`}
                  />
                </div>
                <p className="text-[11px] text-zinc-500 mt-1">
                  Your age will be calculated automatically.
                </p>
                {errors.dob && (
                  <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.dob}
                  </p>
                )}
              </div>

              {/* Age */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-semibold text-gray-200">
                    Age <span className="text-yellow-400">*</span>
                  </label>
                  {isAgeAutoCalculated && (
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-yellow-400/10 text-yellow-400 border border-yellow-500/30">
                      AUTO CALCULATED
                    </span>
                  )}
                </div>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl bg-zinc-900/90 border text-white placeholder-zinc-600 focus:outline-none focus:ring-2 transition-all ${
                    errors.age
                      ? "border-red-500/80 focus:ring-red-500/20 bg-red-950/10"
                      : "border-zinc-800 focus:border-yellow-400 focus:ring-yellow-400/20"
                  }`}
                  placeholder="Must be > 15"
                />
                <p className="text-[11px] text-zinc-500 mt-1">
                  Must be above 15 years old.
                </p>
                {errors.age && (
                  <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.age}
                  </p>
                )}
              </div>
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-1">
                Mobile Number <span className="text-yellow-400">*</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-900/90 border text-white placeholder-zinc-600 focus:outline-none focus:ring-2 transition-all ${
                    errors.mobile
                      ? "border-red-500/80 focus:ring-red-500/20 bg-red-950/10"
                      : "border-zinc-800 focus:border-yellow-400 focus:ring-yellow-400/20"
                  }`}
                  placeholder="Enter 10-digit mobile number"
                  maxLength={10}
                />
              </div>
              <p className="text-[11px] text-zinc-500 mt-1">
                Enter a 10-digit mobile number for WhatsApp & SMS updates.
              </p>
              {errors.mobile && (
                <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.mobile}
                </p>
              )}
            </div>
          </div>

          {/* 02 PRESENTATION AVAILABILITY CARD */}
          <div
            id="section-availability"
            className="bg-zinc-950/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 md:p-10 border border-zinc-800/80 shadow-2xl hover:border-yellow-500/30 transition-all duration-300 relative group"
          >
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-900 flex-wrap gap-3">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-yellow-400/10 border border-yellow-500/30 flex items-center justify-center font-mono font-bold text-yellow-400 text-sm">
                  02
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide uppercase flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-yellow-400" />
                    Presentation Availability
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                    Select all the dates you are available to present
                  </p>
                </div>
              </div>
              
              <button
                type="button"
                onClick={handleSelectAllDates}
                className="text-xs font-bold px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-yellow-400 hover:text-black text-yellow-400 border border-yellow-500/30 transition-all shadow-sm"
              >
                {formData.availableDates.length === PRESENTATION_DATES.length
                  ? "Deselect All Dates"
                  : "Select All Dates"}
              </button>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-200">
                Which date are you available for the presentation? <span className="text-yellow-400">*</span>
              </p>
              <p className="text-xs text-zinc-400 mt-0.5">
                Select all the dates you are available.
              </p>
            </div>

            {/* Date Selection Grid Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-2">
              {PRESENTATION_DATES.map(({ date, day }) => {
                const isSelected = formData.availableDates.includes(date);
                return (
                  <button
                    key={date}
                    type="button"
                    onClick={() => handleDateToggle(date)}
                    className={`relative p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between h-28 ${
                      isSelected
                        ? "bg-yellow-400 text-black border-yellow-400 shadow-xl shadow-yellow-400/20 scale-[1.02]"
                        : "bg-zinc-900/90 text-gray-200 border-zinc-800 hover:border-yellow-400/50 hover:bg-zinc-900 hover:-translate-y-0.5"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Clock className={`w-4 h-4 ${isSelected ? "text-black/80" : "text-yellow-400"}`} />
                      <div
                        className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-all ${
                          isSelected
                            ? "bg-black text-yellow-400 border-black"
                            : "border-zinc-700 bg-zinc-950"
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>

                    <div>
                      <div className="font-extrabold text-sm sm:text-base tracking-tight leading-tight">
                        {date}
                      </div>
                      <div className={`text-[11px] font-medium mt-0.5 ${isSelected ? "text-black/70" : "text-zinc-400"}`}>
                        {day}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {errors.availableDates && (
              <p className="text-red-400 text-xs mt-3 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.availableDates}
              </p>
            )}
          </div>

          {/* 03 DISCOVERY CARD */}
          <div
            id="section-discovery"
            className="bg-zinc-950/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 md:p-10 border border-zinc-800/80 shadow-2xl hover:border-yellow-500/30 transition-all duration-300 relative group"
          >
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-zinc-900">
              <div className="w-10 h-10 rounded-2xl bg-yellow-400/10 border border-yellow-500/30 flex items-center justify-center font-mono font-bold text-yellow-400 text-sm">
                03
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide uppercase flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  Discovery
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                  How did you hear about INVENTIVE?
                </p>
              </div>
            </div>

            <label className="block text-sm font-semibold text-gray-200 mb-4">
              Select Source <span className="text-yellow-400">*</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { label: "Instagram", icon: <Instagram className="w-4 h-4" /> },
                { label: "Linkedin", icon: <Linkedin className="w-4 h-4" /> },
                { label: "WhatsApp Groups", icon: <MessageCircle className="w-4 h-4" /> },
                { label: "Offline QR Codes", icon: <QrCode className="w-4 h-4" /> },
                { label: "Other", icon: <HelpCircle className="w-4 h-4" /> },
              ].map(({ label, icon }) => {
                const isSelected = formData.source === label;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setFormData({ ...formData, source: label })}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border text-sm font-bold transition-all duration-300 ${
                      isSelected
                        ? "bg-yellow-400 text-black border-yellow-400 shadow-lg shadow-yellow-400/20 scale-[1.02]"
                        : "bg-zinc-900/90 text-gray-300 border-zinc-800 hover:border-yellow-400/50 hover:bg-zinc-900"
                    }`}
                  >
                    <span className={isSelected ? "text-black" : "text-yellow-400"}>
                      {icon}
                    </span>
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>

            {formData.source === "Other" && (
              <div className="mt-5 animate-fade-in">
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Please Specify Other Source <span className="text-yellow-400">*</span>
                </label>
                <input
                  type="text"
                  name="otherSource"
                  placeholder="Specify how you heard about Inventive..."
                  value={formData.otherSource}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl bg-zinc-900/90 border text-white placeholder-zinc-600 focus:outline-none focus:ring-2 transition-all ${
                    errors.otherSource
                      ? "border-red-500/80 focus:ring-red-500/20 bg-red-950/10"
                      : "border-zinc-800 focus:border-yellow-400 focus:ring-yellow-400/20"
                  }`}
                />
              </div>
            )}

            {errors.source && (
              <p className="text-red-400 text-xs mt-2.5 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.source}
              </p>
            )}
            {errors.otherSource && (
              <p className="text-red-400 text-xs mt-2.5 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.otherSource}
              </p>
            )}
          </div>

          {/* 04 PROJECT DETAILS CARD */}
          <div
            id="section-project"
            className="bg-zinc-950/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 md:p-10 border border-zinc-800/80 shadow-2xl hover:border-yellow-500/30 transition-all duration-300 relative group"
          >
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-zinc-900">
              <div className="w-10 h-10 rounded-2xl bg-yellow-400/10 border border-yellow-500/30 flex items-center justify-center font-mono font-bold text-yellow-400 text-sm">
                04
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide uppercase flex items-center gap-2">
                  <FileText className="w-5 h-5 text-yellow-400" />
                  Project Details
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                  Describe your innovation or choose an official problem statement
                </p>
              </div>
            </div>

            {/* Custom Project Proposal */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-gray-200">
                  Brief Description of Project
                </label>
                <span className="text-[10px] font-mono text-zinc-500">
                  {formData.projectDescription.length} chars
                </span>
              </div>
              <textarea
                rows="6"
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleChange}
                className={`w-full px-4 py-3.5 rounded-2xl bg-zinc-900/90 border text-white placeholder-zinc-600 focus:outline-none focus:ring-2 transition-all resize-none ${
                  errors.projectDescription
                    ? "border-red-500/80 focus:ring-red-500/20 bg-red-950/10"
                    : "border-zinc-800 focus:border-yellow-400 focus:ring-yellow-400/20"
                }`}
                placeholder="Describe your innovation, key objectives, technical approach, and expected outcome..."
              ></textarea>
              {errors.projectDescription && (
                <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.projectDescription}
                </p>
              )}
            </div>

            {/* Glowing OR Separator */}
            <div className="flex items-center my-8">
              <div className="flex-1 border-t border-zinc-900"></div>
              <span className="px-5 text-xs font-black uppercase tracking-widest text-yellow-400 bg-zinc-900 rounded-full py-1.5 border border-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.1)]">
                OR
              </span>
              <div className="flex-1 border-t border-zinc-900"></div>
            </div>

            {/* Problem Statement Selection */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Lightbulb className="w-4 h-4 text-yellow-400" />
                <label className="block text-sm font-semibold text-gray-200">
                  Choose a Problem Statement
                </label>
              </div>
              <p className="text-xs text-zinc-400 mb-3">
                Don't have your own project idea? Pick one of the available challenges.
              </p>

              <div className="relative">
                <select
                  onChange={(e) =>
                    setFormData({ ...formData, problemStatement: e.target.value })
                  }
                  value={formData.problemStatement}
                  className="w-full pl-4 pr-10 py-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white appearance-none focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all cursor-pointer text-xs sm:text-sm font-medium"
                >
                  <option value="">Select an official problem statement challenge</option>
                  <option value="Pick and Place using VLA for Collaborative Robot (COBOT)">
                    Pick and Place using VLA for Collaborative Robot (COBOT)
                  </option>
                  <option value="Aggressive maneuver Stabilization for a Minidrone">
                    Aggressive maneuver Stabilization for a Minidrone
                  </option>
                  <option value="Portable Charging System for Electric Vehicles">
                    Portable Charging System for Electric Vehicles
                  </option>
                  <option value="Autonomous Vehicle Localization Using Onboard Sensors and HD Geolocated Maps">
                    Autonomous Vehicle Localization Using Onboard Sensors and HD Geolocated Maps
                  </option>
                  <option value="Automated Testing of All Electrical Accessories in QC Station of an Automobile Factory">
                    Automated Testing of All Electrical Accessories in QC Station of an Automobile Factory
                  </option>
                  <option value="Vehicle Borne Edge AI for Electric Vehicle Driver Safety Assistance">
                    Vehicle Borne Edge AI for Electric Vehicle Driver Safety Assistance
                  </option>
                  <option value="AI enabled object reorientation system for industrial production lines">
                    AI enabled object reorientation system for industrial production lines
                  </option>
                </select>
                <ChevronDown className="w-4 h-4 text-zinc-500 absolute right-3.5 top-4 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* 05 TEAM DETAILS CARD */}
          <div
            id="section-team"
            className="bg-zinc-950/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 md:p-10 border border-zinc-800/80 shadow-2xl hover:border-yellow-500/30 transition-all duration-300 relative group"
          >
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-zinc-900">
              <div className="w-10 h-10 rounded-2xl bg-yellow-400/10 border border-yellow-500/30 flex items-center justify-center font-mono font-bold text-yellow-400 text-sm">
                05
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide uppercase flex items-center gap-2">
                  <Users className="w-5 h-5 text-yellow-400" />
                  Team Details
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                  Register as an individual or add team members (up to 10)
                </p>
              </div>
            </div>

            {/* Team Size Stepper Control */}
            <div className="bg-zinc-900/90 rounded-2xl p-5 border border-zinc-800/90 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <label className="block text-sm font-extrabold text-white">
                  Total Team Size (Including Leader) <span className="text-yellow-400">*</span>
                </label>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Select between 1 to 10 members.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleTeamSizeChange(formData.teamSize - 1)}
                  disabled={formData.teamSize <= 1}
                  className="w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-700 text-white flex items-center justify-center hover:bg-yellow-400 hover:text-black hover:border-yellow-400 disabled:opacity-30 transition-all"
                >
                  <Minus className="w-4 h-4" />
                </button>

                <div className="w-14 text-center font-mono text-xl font-black text-yellow-400 bg-black py-1.5 rounded-xl border border-zinc-800">
                  {formData.teamSize}
                </div>

                <button
                  type="button"
                  onClick={() => handleTeamSizeChange(formData.teamSize + 1)}
                  disabled={formData.teamSize >= 10}
                  className="w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-700 text-white flex items-center justify-center hover:bg-yellow-400 hover:text-black hover:border-yellow-400 disabled:opacity-30 transition-all"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {errors.teamSize && (
              <p className="text-red-400 text-xs mb-4 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.teamSize}
              </p>
            )}

            {/* Dynamic Member Cards */}
            {formData.members.map((member, index) => (
              <div
                key={index}
                className="mt-6 p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 shadow-xl transition-all duration-300 hover:border-yellow-500/30 animate-fade-in"
              >
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-zinc-800/80">
                  <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                  <h3 className="font-extrabold text-sm tracking-wider uppercase text-yellow-400">
                    MEMBER 0{index + 2} DETAILS
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Full Name <span className="text-yellow-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) =>
                        handleMemberChange(index, "name", e.target.value)
                      }
                      className={`w-full px-4 py-2.5 rounded-xl bg-black/90 border text-white text-sm focus:outline-none focus:ring-2 transition-all ${
                        errors[`member${index}_name`]
                          ? "border-red-500/80 focus:ring-red-500/20"
                          : "border-zinc-800 focus:border-yellow-400 focus:ring-yellow-400/20"
                      }`}
                      placeholder="Enter member name"
                    />
                    {errors[`member${index}_name`] && (
                      <p className="text-red-400 text-[11px] mt-1 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3 h-3" /> {errors[`member${index}_name`]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Roll Number <span className="text-yellow-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={member.roll}
                      onChange={(e) =>
                        handleMemberChange(index, "roll", e.target.value)
                      }
                      className={`w-full px-4 py-2.5 rounded-xl bg-black/90 border text-white text-sm focus:outline-none focus:ring-2 transition-all ${
                        errors[`member${index}_roll`]
                          ? "border-red-500/80 focus:ring-red-500/20"
                          : "border-zinc-800 focus:border-yellow-400 focus:ring-yellow-400/20"
                      }`}
                      placeholder="Enter member roll number"
                    />
                    {errors[`member${index}_roll`] && (
                      <p className="text-red-400 text-[11px] mt-1 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3 h-3" /> {errors[`member${index}_roll`]}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Branch <span className="text-yellow-400">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={member.branch}
                        onChange={(e) =>
                          handleMemberChange(index, "branch", e.target.value)
                        }
                        className={`w-full pl-4 pr-9 py-2.5 rounded-xl bg-black/90 border text-white text-sm appearance-none focus:outline-none focus:ring-2 transition-all cursor-pointer ${
                          errors[`member${index}_branch`]
                            ? "border-red-500/80 focus:ring-red-500/20"
                            : "border-zinc-800 focus:border-yellow-400 focus:ring-yellow-400/20"
                        }`}
                      >
                        <option value="">Select Branch</option>
                        <option value="Architecture">Architecture</option>
                        <option value="Chemical Engineering">Chemical Engineering</option>
                        <option value="Civil Engineering">Civil Engineering</option>
                        <option value="Computer Science and Engineering">Computer Science and Engineering</option>
                        <option value="Electrical and Electronics Engineering">Electrical and Electronics Engineering</option>
                        <option value="Electronics and Communication Engineering">Electronics and Communication Engineering</option>
                        <option value="Instrumentation and Control Engineering">Instrumentation and Control Engineering</option>
                        <option value="Mechanical Engineering">Mechanical Engineering</option>
                        <option value="Metallurgical and Materials Engineering">Metallurgical and Materials Engineering</option>
                        <option value="Production Engineering">Production Engineering</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-zinc-500 absolute right-3 top-3 pointer-events-none" />
                    </div>
                    {errors[`member${index}_branch`] && (
                      <p className="text-red-400 text-[11px] mt-1 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3 h-3" /> {errors[`member${index}_branch`]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Year <span className="text-yellow-400">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={member.year}
                        onChange={(e) =>
                          handleMemberChange(index, "year", e.target.value)
                        }
                        className={`w-full pl-4 pr-9 py-2.5 rounded-xl bg-black/90 border text-white text-sm appearance-none focus:outline-none focus:ring-2 transition-all cursor-pointer ${
                          errors[`member${index}_year`]
                            ? "border-red-500/80 focus:ring-red-500/20"
                            : "border-zinc-800 focus:border-yellow-400 focus:ring-yellow-400/20"
                        }`}
                      >
                        <option value="">Select Year</option>
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-zinc-500 absolute right-3 top-3 pointer-events-none" />
                    </div>
                    {errors[`member${index}_year`] && (
                      <p className="text-red-400 text-[11px] mt-1 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3 h-3" /> {errors[`member${index}_year`]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* FINAL CTA SUBMIT BUTTON */}
          <div className="pt-6 text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold text-sm sm:text-base rounded-xl border border-yellow-300/60 shadow-lg shadow-yellow-500/15 hover:shadow-yellow-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 cursor-pointer inline-flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Submit</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-zinc-500 text-xs mt-3">
              By submitting, you confirm that all entered details and team information are accurate.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

import { useState } from "react";

export default function ProjectForm() {
  const [formData, setFormData] = useState({
    roll: "",
    branch: "",
    year: "",
    name: "",
    age: "",
    dob: "",
    mobile: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.roll) newErrors.roll = "Roll number is required";
    if (!formData.branch) newErrors.branch = "Branch is required";
    if (!formData.year) newErrors.year = "Year of study is required";
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.age || formData.age <= 0) newErrors.age = "Valid age is required";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = "Enter a valid 10-digit mobile number";
    if (!formData.description) newErrors.description = "Project description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    
    // First validate the form
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/inventiveForm/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const message = await response.text();
        alert(message || "Form submitted successfully!");
        // Reset form on successful submission
        setFormData({
          roll: "",
          branch: "",
          year: "",
          name: "",
          age: "",
          dob: "",
          mobile: "",
          description: "",
        });
        setErrors({});
      } else {
        const errorMessage = await response.text();
        alert(`Error: ${errorMessage}`);
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Network error. Please check if the server is running on port 3001.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative top-16 mb-16 bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-zinc-950 shadow-2xl rounded-2xl p-10 border border-yellow-500/30">
        <h1 className="text-4xl font-extrabold text-yellow-400 mb-3 text-center drop-shadow-lg">
          Inventive Form
        </h1>
        <p className="text-center text-gray-400 mb-8">
          Submit your details and project info below
        </p>

        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Personal Details Section */}
          <div className="bg-zinc-900/60 rounded-xl p-6 shadow-md border border-zinc-800">
            <h2 className="text-xl font-semibold text-yellow-300 mb-4">Personal Details</h2>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-white mb-2">Roll Number</label>
                <input
                  type="text"
                  name="roll"
                  value={formData.roll}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-black border border-yellow-400/70 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Enter Roll Number"
                />
                {errors.roll && <p className="text-red-500 text-sm mt-1">{errors.roll}</p>}
              </div>
              <div className="flex-1">
                <label className="block text-white mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-black border border-yellow-400/70 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Enter Name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-white mb-2">Branch</label>
                <select
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-black border border-yellow-400/70 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
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
                {errors.branch && <p className="text-red-500 text-sm mt-1">{errors.branch}</p>}
              </div>
              <div className="flex-1">
                <label className="block text-white mb-2">Year of Study</label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-black border border-yellow-400/70 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="">Select Year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
                {errors.year && <p className="text-red-500 text-sm mt-1">{errors.year}</p>}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-white mb-2">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-black border border-yellow-400/70 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Enter Age"
                />
                {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
              </div>
              <div className="flex-1">
                <label className="block text-white mb-2">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-black border border-yellow-400/70 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">Mobile Number</label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-black border border-yellow-400/70 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter Mobile Number"
              />
              {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
            </div>
          </div>

          {/* Project Details Section */}
          <div className="bg-zinc-900/60 rounded-xl p-6 shadow-md border border-zinc-800">
            <h2 className="text-xl font-semibold text-yellow-300 mb-4">Project Details</h2>
            <div>
              <label className="block text-white mb-2">Brief Description of Project</label>
              <textarea
                rows="6"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-black border border-yellow-400/70 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Describe your project in detail..."
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="px-8 py-3 bg-yellow-400 text-black font-bold rounded-xl shadow-lg hover:bg-yellow-300 hover:scale-105 transform transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
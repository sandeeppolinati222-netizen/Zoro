
import React from 'react';
import { ProjectInput } from '../types';

interface InputFormProps {
  onGenerate: (input: ProjectInput) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onGenerate, isLoading }) => {
  const [formData, setFormData] = React.useState<ProjectInput>({
    name: '',
    type: 'Residential House',
    size: '',
    budget: '',
    location: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 max-w-2xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900">Project Blueprint</h2>
        <p className="text-slate-500 mt-2">Enter your project details to generate a comprehensive AI-powered report.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Project Name</label>
          <input
            required
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Modern Coastal Villa"
            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Project Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
          >
            <option>Residential House</option>
            <option>Commercial Office</option>
            <option>Renovation</option>
            <option>Industrial Warehouse</option>
            <option>Retail Space</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Size (Sq Ft)</label>
          <input
            required
            name="size"
            value={formData.size}
            onChange={handleChange}
            placeholder="e.g. 2,500"
            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Target Budget (rupees)</label>
          <input
            required
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            placeholder="e.g. 450,000"
            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">Location</label>
        <input
          required
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="e.g. Austin, Texas"
          className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">Project Description & Special Requirements</label>
        <textarea
          required
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your vision, materials preferences, or any specific constraints..."
          className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all ${
          isLoading 
          ? 'bg-slate-400 cursor-not-allowed' 
          : 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-200'
        }`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            <span>Analyzing Project Parameters...</span>
          </div>
        ) : 'Generate Intelligent Plan'}
      </button>

      <p className="text-xs text-center text-slate-400">
        AI-generated reports provide high-level approximations. Professional verification is recommended.
      </p>
    </form>
  );
};

export default InputForm;

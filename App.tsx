
import React, { useState } from 'react';
import InputForm from './components/InputForm';
import ReportDashboard from './components/ReportDashboard';
import { generateConstructionReport } from './services/geminiService';
import { ConstructionReport, ProjectInput } from './types';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<ConstructionReport | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (input: ProjectInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await generateConstructionReport(input);
      setReport(result);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please check your API key.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetProject = () => {
    setReport(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">Structura<span className="text-blue-600">AI</span></span>
          </div>
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-500">
            <a href="#" className="hover:text-blue-600 transition">Solutions</a>
            <a href="#" className="hover:text-blue-600 transition">Case Studies</a>
            <a href="#" className="hover:text-blue-600 transition">Pricing</a>
            <button className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition">Get Started</button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow bg-slate-50">
        {!report ? (
          <div className="py-20 px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
                Architect Your Future with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Precision</span>
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Structura AI transforms vague project ideas into comprehensive, actionable construction blueprints in seconds.
              </p>
            </div>
            
            <InputForm onGenerate={handleGenerate} isLoading={isLoading} />
            
            {error && (
              <div className="mt-8 max-w-2xl mx-auto p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm text-center font-medium">
                {error}
              </div>
            )}

            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-center">
              <div>
                <div className="w-12 h-12 bg-white shadow-sm border border-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Instant Scheduling</h3>
                <p className="text-slate-500 text-sm">Automated phase breakdown and critical path analysis based on historical benchmarks.</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-white shadow-sm border border-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-green-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Cost Precision</h3>
                <p className="text-slate-500 text-sm">Intelligent market-adjusted cost estimations for materials and skilled labor.</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-white shadow-sm border border-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-amber-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Risk Mitigation</h3>
                <p className="text-slate-500 text-sm">Advanced risk identification and mitigation strategies tailored to your location.</p>
              </div>
            </div>
          </div>
        ) : (
          <ReportDashboard report={report} onReset={resetProject} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              </div>
              <span className="text-lg font-bold text-slate-900 tracking-tight">Structura<span className="text-blue-600">AI</span></span>
            </div>
            <p className="text-slate-500 text-sm max-w-sm">
              Empowering developers and homeowners with AI-driven insights to build smarter, faster, and more sustainably.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Product</h4>
            <ul className="text-sm text-slate-500 space-y-2">
              <li><a href="#" className="hover:text-blue-600 transition">Reporting</a></li>
              <li><a href="#" className="hover:text-blue-600 transition">Integrations</a></li>
              <li><a href="#" className="hover:text-blue-600 transition">API Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Company</h4>
            <ul className="text-sm text-slate-500 space-y-2">
              <li><a href="#" className="hover:text-blue-600 transition">About Us</a></li>
              <li><a href="#" className="hover:text-blue-600 transition">Legal</a></li>
              <li><a href="#" className="hover:text-blue-600 transition">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center text-slate-400 text-xs">
          <p>© 2024 Structura AI Technologies. All rights reserved.</p>
          <p className="mt-2 md:mt-0 italic">AI-Powered Planning Engine v1.4.2</p>
        </div>
      </footer>
    </div>
  );
};

export default App;

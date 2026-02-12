
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, LineChart, Line 
} from 'recharts';
import { ConstructionReport } from '../types';

interface ReportDashboardProps {
  report: ConstructionReport;
  onReset: () => void;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

const ReportDashboard: React.FC<ReportDashboardProps> = ({ report, onReset }) => {
  const costData = report.costs.map(c => ({ name: c.category, value: c.estimatedAmount }));
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Project Analysis Report</h1>
          <p className="text-slate-500 mt-2 max-w-2xl">{report.projectOverview}</p>
        </div>
        <button 
          onClick={onReset}
          className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold transition"
        >
          Start New Plan
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-sm font-medium">Estimated Total Cost</p>
          <p className="text-3xl font-bold text-blue-600 mt-1">${report.totalEstimatedCost.toLocaleString()}</p>
          <div className="mt-4 text-xs text-slate-400 italic font-medium">*Approximate valuation</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-sm font-medium">Estimated Duration</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">{report.totalDurationWeeks} Weeks</p>
          <p className="text-xs text-green-600 font-semibold mt-2">Optimized Timeline</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-sm font-medium">Primary Risk Level</p>
          <p className={`text-3xl font-bold mt-1 ${
            report.risks.some(r => r.severity === 'High') ? 'text-red-600' : 'text-amber-500'
          }`}>
            {report.risks.some(r => r.severity === 'High') ? 'High Attention' : 'Manageable'}
          </p>
          <p className="text-xs text-slate-500 mt-2">{report.risks.length} Identified risks</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Cost Breakdown */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Cost Distribution</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={costData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {costData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Estimated Cost']}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Timeline Chart */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Phase Timeline</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={report.timeline}
                margin={{ left: 40, right: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" label={{ value: 'Weeks', position: 'insideBottom', offset: -5 }} />
                <YAxis dataKey="phaseName" type="category" width={100} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar 
                  dataKey="endWeek" 
                  fill="#3b82f6" 
                  radius={[0, 4, 4, 0]}
                  name="Completion Week"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Phases */}
      <section>
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Project Execution Phases</h3>
        <div className="space-y-4">
          {report.phases.map((phase, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded">Phase {idx + 1}</span>
                <h4 className="text-lg font-bold text-slate-900 mt-2">{phase.name}</h4>
                <p className="text-sm text-slate-500 mt-1">{phase.durationWeeks} Weeks</p>
              </div>
              <div className="md:w-3/4">
                <p className="text-slate-700 mb-4">{phase.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {phase.tasks.map((task, tIdx) => (
                    <div key={tIdx} className="flex items-center space-x-2 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                      <span>{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Materials & Risks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Materials List */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Key Materials Estimation</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="px-4 py-3">Item</th>
                  <th className="px-4 py-3">Quantity</th>
                  <th className="px-4 py-3">Est. Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {report.materials.map((mat, mIdx) => (
                  <tr key={mIdx}>
                    <td className="px-4 py-4">
                      <div className="font-medium text-slate-900">{mat.item}</div>
                      <div className="text-xs text-slate-400">{mat.category}</div>
                    </td>
                    <td className="px-4 py-4 text-slate-600">
                      {mat.estimatedQuantity} {mat.unit}
                    </td>
                    <td className="px-4 py-4 font-semibold text-slate-900">
                      ${mat.estimatedCost.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Risks */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Risk Assessment</h3>
          <div className="space-y-4">
            {report.risks.map((risk, rIdx) => (
              <div key={rIdx} className="p-4 rounded-xl border border-slate-50 bg-slate-50/50">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                    risk.severity === 'High' ? 'bg-red-100 text-red-600' : 
                    risk.severity === 'Medium' ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'
                  }`}>
                    {risk.severity} Risk
                  </span>
                </div>
                <p className="font-bold text-slate-800 text-sm">{risk.risk}</p>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  <span className="font-semibold text-slate-900">Mitigation:</span> {risk.mitigation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sustainability & Optimizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-3xl border border-green-100">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-green-500 text-white rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
            </div>
            <h3 className="text-2xl font-bold text-green-900">Sustainability Index</h3>
          </div>
          <div className="space-y-4">
            {report.sustainability.map((item, sIdx) => (
              <div key={sIdx} className="bg-white/80 backdrop-blur p-4 rounded-2xl border border-green-200/50 shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-green-800">{item.feature}</h4>
                  <span className="text-green-600 font-bold">+{item.score} Efficiency</span>
                </div>
                <p className="text-sm text-green-700/80">{item.benefit}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-3xl border border-blue-100">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-blue-500 text-white rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <h3 className="text-2xl font-bold text-blue-900">Optimization Strategies</h3>
          </div>
          <div className="space-y-4">
            {report.optimizations.map((opt, oIdx) => (
              <div key={oIdx} className="bg-white/80 backdrop-blur p-4 rounded-2xl border border-blue-200/50 shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-blue-800">{opt.suggestion}</h4>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                    opt.difficulty === 'Easy' ? 'bg-blue-100 text-blue-600' : 
                    opt.difficulty === 'Medium' ? 'bg-indigo-100 text-indigo-600' : 'bg-purple-100 text-purple-600'
                  }`}>
                    {opt.difficulty} implementation
                  </span>
                </div>
                <p className="text-sm text-blue-700/80">{opt.impact}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final Disclaimer */}
      <footer className="text-center text-slate-400 text-sm max-w-2xl mx-auto pt-8 border-t border-slate-100">
        This report is generated by Structura AI using advanced predictive models. 
        Construction environments are dynamic; actual costs and timelines may vary by 15-25% 
        based on market conditions, weather, and site-specific complexities.
      </footer>
    </div>
  );
};

export default ReportDashboard;

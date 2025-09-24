import React from 'react';
import { TrendingUp, Activity, Users, BarChart3, User, Settings, Bell, Zap, RefreshCw } from 'lucide-react';

const Dashboard = () => {
  // Sample data for demonstration
  const kpiData1 = [
    { title: 'Total Revenue', value: '$124,532', change: '+12.5%', trend: 'up', icon: TrendingUp },
    { title: 'Active Users', value: '8,429', change: '+3.2%', trend: 'up', icon: Users }
  ];

  const kpiData2 = [
    { title: 'Conversion Rate', value: '3.24%', change: '-0.8%', trend: 'down', icon: BarChart3 },
    { title: 'Performance Score', value: '94.2', change: '+2.1%', trend: 'up', icon: Activity }
  ];

  const inputFields = [
    { label: 'Project Name', placeholder: 'Enter project name...' },
    { label: 'Description', placeholder: 'Brief description...' },
    { label: 'Budget', placeholder: 'Enter budget amount...' },
    { label: 'Timeline', placeholder: 'Expected completion...' }
  ];

  const ideasHistory = [
    { title: 'AI-Powered Analytics', date: '2 days ago', status: 'In Progress' },
    { title: 'Mobile App Redesign', date: '1 week ago', status: 'Completed' },
    { title: 'Customer Portal', date: '2 weeks ago', status: 'Planning' },
    { title: 'Performance Optimization', date: '3 weeks ago', status: 'Review' }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 w-full">
        <div className="flex items-center justify-between max-w-full mx-auto">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <Settings className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6 w-full">
        <div className="grid grid-cols-1 xl:grid-cols-1 gap-6">
          {/* Left Column - Dashboard */}
          <div className="space-y-6">
            {/* Profile Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">John Doe</h2>
                <p className="text-gray-600 mb-3">Product Manager</p>
                <div className="flex justify-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-800">
                    Active Profile
                  </span>
                </div>
              </div>
            </div>

            {/* Summary Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary Section</h3>
              <div className="space-y-3 text-gray-600">
                <p>Welcome to your dashboard! Here's a quick overview of your recent activity and key performance metrics.</p>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-indigo-600">24</div>
                    <div className="text-sm text-gray-500">Projects</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-teal-600">98%</div>
                    <div className="text-sm text-gray-500">Uptime</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Health Check + Regenerate */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Health Check + Regenerate</h3>
                <button className="flex items-center space-x-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors">
                  <RefreshCw className="w-4 h-4" />
                  <span>Regenerate</span>
                </button>
              </div>

              {/* KPI Grid 1 */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-4">KPI Grid 1</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {kpiData1.map((kpi, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <kpi.icon className="w-5 h-5 text-indigo-500" />
                        <span className={`text-sm font-medium ${
                          kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {kpi.change}
                        </span>
                      </div>
                      <h5 className="text-sm text-gray-600 mb-1">{kpi.title}</h5>
                      <p className="text-xl font-bold text-gray-900">{kpi.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* KPI Grid 2 */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-4">KPI Grid 2</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {kpiData2.map((kpi, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <kpi.icon className="w-5 h-5 text-indigo-500" />
                        <span className={`text-sm font-medium ${
                          kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {kpi.change}
                        </span>
                      </div>
                      <h5 className="text-sm text-gray-600 mb-1">{kpi.title}</h5>
                      <p className="text-xl font-bold text-gray-900">{kpi.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Extras */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Extras</h4>
                <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h5 className="font-medium text-indigo-900">Advanced Analytics</h5>
                      <p className="text-sm text-indigo-700">Deep insights and reporting tools</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
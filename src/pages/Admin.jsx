import React from 'react';
import SideNavbar from '../components/SideNavbar';
import SubNavbar from '../components/SubNavbar';

function Admin() {
  return (
    <>
      <SubNavbar/>
      <div className="flex h-screen bg-[#F8F4F0]">
        <SideNavbar />
        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-[#8B7355] to-[#6F5B41] rounded-2xl shadow-lg p-6 mb-6 text-white">
            <h1 className="text-3xl font-bold mb-2">Welcome back, Admin! 👋</h1>
            <p className="text-[#F5E6D3] text-lg">
              Here's what's happening with your store today.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {/* Total Products Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-[#8B7355] hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Total Products</h3>
                  <p className="text-3xl font-bold text-gray-800 mt-2">24</p>
                  <p className="text-sm text-green-600 mt-1 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    +12% from last month
                  </p>
                </div>
                <div className="p-3 bg-[#F5E6D3] rounded-xl">
                  <svg className="w-8 h-8 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Pending Orders Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-[#E74C3C] hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Pending Orders</h3>
                  <p className="text-3xl font-bold text-gray-800 mt-2">12</p>
                  <p className="text-sm text-orange-600 mt-1 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Need attention
                  </p>
                </div>
                <div className="p-3 bg-red-50 rounded-xl">
                  <svg className="w-8 h-8 text-[#E74C3C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Total Users Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-[#3498DB] hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Total Users</h3>
                  <p className="text-3xl font-bold text-gray-800 mt-2">156</p>
                  <p className="text-sm text-green-600 mt-1 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    +8 new today
                  </p>
                </div>
                <div className="p-3 bg-blue-50 rounded-xl">
                  <svg className="w-8 h-8 text-[#3498DB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {/* Revenue Card */}
            <div className="bg-white rounded-2xl shadow-lg p-5 text-center hover:shadow-xl transition-all duration-300">
              <div className="p-3 bg-green-50 rounded-xl inline-flex mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-gray-500">Revenue</h3>
              <p className="text-xl font-bold text-gray-800 mt-1">$12,426</p>
            </div>

            {/* Conversion Rate */}
            <div className="bg-white rounded-2xl shadow-lg p-5 text-center hover:shadow-xl transition-all duration-300">
              <div className="p-3 bg-purple-50 rounded-xl inline-flex mb-3">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-gray-500">Conversion</h3>
              <p className="text-xl font-bold text-gray-800 mt-1">3.2%</p>
            </div>

            {/* Satisfaction Rate */}
            <div className="bg-white rounded-2xl shadow-lg p-5 text-center hover:shadow-xl transition-all duration-300">
              <div className="p-3 bg-yellow-50 rounded-xl inline-flex mb-3">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-gray-500">Satisfaction</h3>
              <p className="text-xl font-bold text-gray-800 mt-1">94%</p>
            </div>

            {/* Active Sessions */}
            <div className="bg-white rounded-2xl shadow-lg p-5 text-center hover:shadow-xl transition-all duration-300">
              <div className="p-3 bg-indigo-50 rounded-xl inline-flex mb-3">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-gray-500">Active Now</h3>
              <p className="text-xl font-bold text-gray-800 mt-1">42</p>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Recent Activity</h2>
              <button className="text-sm text-[#8B7355] hover:text-[#6F5B41] font-semibold">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {[
                { action: 'New order placed', user: 'John Doe', time: '2 min ago', type: 'order' },
                { action: 'Product added', user: 'Sarah Wilson', time: '1 hour ago', type: 'product' },
                { action: 'User registered', user: 'Mike Johnson', time: '2 hours ago', type: 'user' },
                { action: 'Payment received', user: 'Emily Brown', time: '3 hours ago', type: 'payment' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className={`p-2 rounded-full ${
                    activity.type === 'order' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'product' ? 'bg-green-100 text-green-600' :
                    activity.type === 'user' ? 'bg-purple-100 text-purple-600' :
                    'bg-yellow-100 text-yellow-600'
                  }`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={
                        activity.type === 'order' ? "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" :
                        activity.type === 'product' ? "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" :
                        activity.type === 'user' ? "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" :
                        "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1"
                      } />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                    <p className="text-xs text-gray-500">by {activity.user}</p>
                  </div>
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Admin;
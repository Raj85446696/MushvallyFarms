import React from 'react';

function Unauthorized() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center">
              <svg 
                className="w-10 h-10 text-red-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>

          {/* Content */}
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-slate-900">
              Access Denied
            </h1>
            
            <p className="text-slate-600 leading-relaxed">
              You don't have permission to access this page. Please contact your administrator 
              if you believe this is an error.
            </p>

            {/* Status Code */}
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-50 border border-red-200">
              <span className="text-sm font-medium text-red-700">
                Error 403: Unauthorized
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 space-y-3">
            <button 
              onClick={() => window.history.back()}
              className="w-full bg-slate-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-slate-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
            >
              Go Back
            </button>
            
            <button 
              onClick={() => window.location.href = '/'}
              className="w-full border border-slate-300 text-slate-700 py-3 px-4 rounded-lg font-medium hover:bg-slate-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
            >
              Return to Homepage
            </button>
          </div>
        </div>

        {/* Support Text */}
        <div className="text-center">
          <p className="text-sm text-slate-500">
            Need help?{' '}
            <a 
              href="mailto:support@example.com" 
              className="text-slate-700 hover:text-slate-900 underline transition-colors duration-200"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Unauthorized;
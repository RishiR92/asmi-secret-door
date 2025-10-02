import { useState } from 'react';
import { Search, TrendingUp, UserPlus, Send, Building } from 'lucide-react';

const PersonBackgroundDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Deep insights on your network.",
      content: "search"
    },
    {
      title: "Deep insights on your network.",
      content: "insights"
    }
  ];

  const handleCardTap = () => {
    setCurrentStep(currentStep === 0 ? 1 : 0);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="w-full max-w-[400px] mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold" style={{ color: 'var(--text-high)' }}>
            {steps[currentStep].title}
          </h2>
        </div>

        {/* Phone Demo */}
        <div 
          className="rounded-3xl p-4 w-full cursor-pointer transition-transform active:scale-95"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--text-high)', border: '1px solid' }}
          onClick={handleCardTap}
        >
          {/* Status Bar */}
          <div className="flex justify-between items-center text-sm mb-4" style={{ color: 'var(--text-high)' }}>
            <span>3:40</span>
            <div className="flex space-x-1">
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--text-high)' }}></div>
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--text-high)' }}></div>
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--text-high)' }}></div>
            </div>
          </div>

          {currentStep === 0 ? (
            // Search Step
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-high)' }}>Network Research</h3>
              </div>
              
              <div className="rounded-xl p-3 flex items-center space-x-3" style={{ backgroundColor: 'var(--bg-primary)' }}>
                <Search size={16} style={{ color: 'var(--text-secondary)' }} />
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Updates on Alex Rivera?</span>
              </div>

              <div className="rounded-xl p-3" style={{ backgroundColor: 'var(--bg-surface)' }}>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--text-secondary)' }}>
                    <span style={{ color: 'var(--bg-primary)' }} className="text-sm font-bold">A</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-high)' }}>Asmi</p>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Running deep research...</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl p-3" style={{ backgroundColor: 'var(--text-high)', opacity: 0.9 }}>
                <p className="text-sm text-center" style={{ color: 'var(--bg-primary)' }}>Updates on Alex Rivera?</p>
              </div>
            </div>
          ) : (
            // Network Insights Step - Consolidated Profile Card
            <div className="space-y-4">
              <div className="rounded-xl p-3" style={{ backgroundColor: 'var(--bg-primary)' }}>
                <p className="text-sm" style={{ color: 'var(--text-high)' }}>Alex Rivera - CEO at FinScale</p>
              </div>

              {/* Single Consolidated Card */}
              <div className="rounded-xl p-4 space-y-4" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'rgba(255, 255, 255, 0.1)', border: '1px solid' }}>
                {/* Profile Header */}
                <div className="flex items-start space-x-3 pb-3" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--text-secondary)' }}>
                    <span className="font-bold text-lg" style={{ color: 'var(--bg-primary)' }}>A</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm" style={{ color: 'var(--text-high)' }}>Alex Rivera</h4>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>CEO @ FinScale</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <Building size={10} style={{ color: 'var(--text-secondary)' }} />
                      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Ex-Stripe PM, MIT, Built 2 fintech unicorns</p>
                    </div>
                  </div>
                </div>

                {/* Recent Activity - Inline Style */}
                <div className="space-y-2">
                  <p className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Recent Activity</p>
                  
                  {/* Funding - Minimal Design */}
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 rounded-lg" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
                      <TrendingUp size={12} style={{ color: '#3B82F6' }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs" style={{ color: 'var(--text-high)' }}>
                        <span className="font-semibold">$50M Series B</span>
                        <span style={{ color: 'var(--text-secondary)' }}> led by Andreessen Horowitz</span>
                      </p>
                    </div>
                  </div>

                  {/* COO Hire - Minimal Design */}
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 rounded-lg" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)' }}>
                      <UserPlus size={12} style={{ color: '#F59E0B' }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs" style={{ color: 'var(--text-high)' }}>
                        <span className="font-semibold">Jennifer Park</span>
                        <span style={{ color: 'var(--text-secondary)' }}> joined as COO (Ex-Stripe Operations VP)</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Strategic Insight - Subtle Callout */}
                <div className="rounded-lg p-3" style={{ backgroundColor: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                  <p className="text-xs font-medium mb-1" style={{ color: 'var(--accent-positive)' }}>💡 Strategic Opportunity</p>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>With new funding and COO, they're scaling fast. Perfect time to strengthen relationship and explore partnerships.</p>
                </div>

                {/* Action Buttons - Clean Layout */}
                <div className="space-y-2 pt-2" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <button className="w-full rounded-lg px-4 py-2.5 flex items-center justify-center space-x-2 transition-opacity hover:opacity-80" style={{ backgroundColor: 'var(--accent-positive)' }}>
                    <Send size={14} style={{ color: 'var(--bg-primary)' }} />
                    <span className="text-sm font-medium" style={{ color: 'var(--bg-primary)' }}>Send Congratulations</span>
                  </button>
                  <button className="w-full rounded-lg px-4 py-2.5 flex items-center justify-center space-x-2 transition-opacity hover:opacity-80" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <UserPlus size={14} style={{ color: 'var(--text-secondary)' }} />
                    <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Request COO Introduction</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center space-x-2 mt-6">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className="h-2 rounded-full transition-all"
              style={{ 
                backgroundColor: index === currentStep ? 'var(--accent-positive)' : 'var(--text-secondary)',
                width: index === currentStep ? '24px' : '8px'
              }}
            />
          ))}
        </div>

        <p className="text-xs text-center mt-4" style={{ color: 'var(--text-secondary)' }}>
          Automatic research on high-value connections in your network
        </p>
      </div>
    </div>
  );
};

export default PersonBackgroundDemo;

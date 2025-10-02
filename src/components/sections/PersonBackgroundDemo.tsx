import { TrendingUp, UserPlus, Send, Building } from 'lucide-react';

const PersonBackgroundDemo = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="w-full max-w-[400px] mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold" style={{ color: 'var(--text-high)' }}>
            Deep intel on your network.
          </h2>
        </div>

        {/* Phone Demo */}
        <div 
          className="border rounded-3xl overflow-hidden shadow-2xl p-4 w-full"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'rgba(255, 255, 255, 0.12)' }}
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

          {/* Network Insights - Consolidated Profile Card */}
          <div className="space-y-4">
              <div className="rounded-xl p-3" style={{ backgroundColor: 'var(--bg-primary)' }}>
                <p className="text-sm" style={{ color: 'var(--text-high)' }}>Alex Rivera - CEO at FinScale</p>
              </div>

              {/* Single Consolidated Card */}
              <div className="rounded-xl p-4 space-y-4" style={{ backgroundColor: 'var(--bg-surface)' }}>
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
                    <div className="p-1.5 rounded-lg" style={{ backgroundColor: 'transparent' }}>
                      <TrendingUp size={12} style={{ color: 'var(--text-secondary)' }} />
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
                    <div className="p-1.5 rounded-lg" style={{ backgroundColor: 'transparent' }}>
                      <UserPlus size={12} style={{ color: 'var(--text-secondary)' }} />
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
                <div className="rounded-lg p-3 border" style={{ borderColor: 'rgba(255, 255, 255, 0.1)', borderLeft: '2px solid var(--accent-positive)' }}>
                  <p className="text-xs font-medium mb-1" style={{ color: 'var(--accent-positive)' }}>💡 Strategic Opportunity</p>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>With new funding and COO, they're scaling fast. Perfect time to strengthen relationship and explore partnerships.</p>
                </div>

                {/* Action Buttons - Clean Layout */}
                <div className="space-y-2 pt-2" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <button className="w-full rounded-lg px-4 py-2.5 flex items-center justify-center space-x-2 transition-opacity hover:opacity-80 border" style={{ backgroundColor: 'transparent', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                    <Send size={14} style={{ color: 'var(--accent-positive)' }} />
                    <span className="text-sm font-medium" style={{ color: 'var(--accent-positive)' }}>Send Congratulations</span>
                  </button>
                  <button className="w-full rounded-lg px-4 py-2.5 flex items-center justify-center space-x-2 transition-opacity hover:opacity-80 border" style={{ backgroundColor: 'transparent', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <UserPlus size={14} style={{ color: 'var(--text-secondary)' }} />
                    <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Request COO Introduction</span>
                  </button>
                </div>
              </div>
            </div>
        </div>

        <p className="text-xs text-center mt-6" style={{ color: 'var(--text-secondary)' }}>
          Automatic research on high-value connections in your network
        </p>
      </div>
    </div>
  );
};

export default PersonBackgroundDemo;

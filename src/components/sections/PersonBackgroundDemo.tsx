
import { useState } from 'react';
import { Search, User, Building, Lightbulb } from 'lucide-react';
import FundingCard from './person-background-demo/FundingCard';
import COOHireCard from './person-background-demo/COOHireCard';
import NetworkActions from './person-background-demo/NetworkActions';

const PersonBackgroundDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Deep insights on your network.",
      content: "search",
      icon: <Lightbulb style={{ color: 'var(--accent-positive)' }} size={20} />
    },
    {
      title: "Deep insights on your network.",
      content: "insights",
      icon: <Lightbulb style={{ color: 'var(--accent-positive)' }} size={20} />
    }
  ];

  const handleCardTap = () => {
    setCurrentStep(currentStep === 0 ? 1 : 0);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="w-full max-w-[400px] mx-auto px-4 py-8">
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

              <div className="border rounded-xl p-3" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--text-secondary)' }}>
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
            // Network Insights Step - Alex Rivera profile
            <div className="space-y-4">
              <div className="rounded-xl p-3" style={{ backgroundColor: 'var(--bg-primary)' }}>
                <p className="text-sm" style={{ color: 'var(--text-high)' }}>Alex Rivera - CEO at FinScale</p>
              </div>

              <div className="border rounded-xl p-4" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--text-secondary)' }}>
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--text-secondary)' }}>
                    <span className="font-bold text-lg" style={{ color: 'var(--bg-primary)' }}>A</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm" style={{ color: 'var(--text-high)' }}>Alex Rivera</h4>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>CEO @ FinScale</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Building size={12} style={{ color: 'var(--text-secondary)' }} className="mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-medium" style={{ color: 'var(--text-high)' }}>Background</p>
                      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Ex-Stripe PM, MIT, Built 2 fintech unicorns</p>
                    </div>
                  </div>
                  
                  <FundingCard 
                    amount="50M"
                    round="Series B"
                    lead="Andreessen Horowitz"
                  />

                  <COOHireCard 
                    name="Jennifer Park"
                    previousRole="Ex-Stripe Operations VP"
                  />
                  
                  <div className="rounded-lg p-2 border" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--text-secondary)' }}>
                    <p className="text-xs font-medium" style={{ color: 'var(--accent-positive)' }}>💡 Strategic Opportunity</p>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>With new funding and COO, they're scaling fast. Perfect time to strengthen relationship and explore partnerships.</p>
                  </div>
                </div>
              </div>

              <NetworkActions />
            </div>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center space-x-2 mt-6">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className="w-2 h-2 rounded-full transition-all"
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

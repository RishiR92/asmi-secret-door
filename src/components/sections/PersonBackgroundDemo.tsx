
import { useState } from 'react';
import { Search, User, Building, Lightbulb } from 'lucide-react';
import MobileOptimizedSection from './MobileOptimizedSection';
import FundingCard from './person-background-demo/FundingCard';
import COOHireCard from './person-background-demo/COOHireCard';
import NetworkActions from './person-background-demo/NetworkActions';

const PersonBackgroundDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Deep insights on your network.",
      content: "search",
      icon: <Lightbulb className="text-purple-400" size={20} />
    },
    {
      title: "Deep insights on your network.",
      content: "insights",
      icon: <Lightbulb className="text-purple-400" size={20} />
    }
  ];

  const handleCardTap = () => {
    setCurrentStep(currentStep === 0 ? 1 : 0);
  };

  return (
    <MobileOptimizedSection maxWidth="sm">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            {steps[currentStep].icon}
          </div>
          <h2 className="text-2xl font-bold text-white leading-tight">
            {steps[currentStep].title}
          </h2>
        </div>

        {/* Phone Demo */}
        <div 
          className="bg-gray-900 rounded-3xl p-4 mx-auto max-w-xs cursor-pointer transition-transform hover:scale-105"
          onClick={handleCardTap}
        >
          {/* Status Bar */}
          <div className="flex justify-between items-center text-white text-sm mb-4">
            <span>3:40</span>
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
          </div>

          {currentStep === 0 ? (
            // Search Step
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white mb-4">Network Research</h3>
              </div>
              
              <div className="bg-gray-800 rounded-xl p-3 flex items-center space-x-3">
                <Search size={16} className="text-gray-400" />
                <span className="text-gray-300 text-sm">Updates on Alex Rivera?</span>
              </div>

              <div className="bg-purple-600/20 border border-purple-500/30 rounded-xl p-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">A</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Asmi</p>
                    <p className="text-purple-300 text-xs">Running deep research...</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-500 rounded-2xl p-3">
                <p className="text-white text-sm text-center">Updates on Alex Rivera?</p>
              </div>
            </div>
          ) : (
            // Network Insights Step - Alex Rivera profile
            <div className="space-y-4">
              <div className="bg-gray-800 rounded-xl p-3">
                <p className="text-white text-sm">Alex Rivera - CEO at FinScale</p>
              </div>

              <div className="bg-purple-600/20 border border-purple-500/30 rounded-xl p-4">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">A</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-semibold text-sm">Alex Rivera</h4>
                    <p className="text-purple-300 text-xs">CEO @ FinScale</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Building size={12} className="text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-300 text-xs font-medium">Background</p>
                      <p className="text-gray-400 text-xs">Ex-Stripe PM, MIT, Built 2 fintech unicorns</p>
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
                  
                  <div className="bg-yellow-500/10 rounded-lg p-2 border border-yellow-500/20">
                    <p className="text-yellow-300 text-xs font-medium">💡 Strategic Opportunity</p>
                    <p className="text-gray-300 text-xs">With new funding and COO, they're scaling fast. Perfect time to strengthen relationship and explore partnerships.</p>
                  </div>
                </div>
              </div>

              <NetworkActions />
            </div>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center space-x-2">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentStep ? 'bg-purple-400 w-6' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>

        <p className="text-gray-500 text-xs text-center">
          Automatic research on high-value connections in your network
        </p>
      </div>
    </MobileOptimizedSection>
  );
};

export default PersonBackgroundDemo;

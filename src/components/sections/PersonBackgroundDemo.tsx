import { Calendar, FileText, CreditCard, Bell } from 'lucide-react';

const PersonBackgroundDemo = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="w-full max-w-[400px] mx-auto py-8">
        {/* WhatsApp-style chat interface */}
        <div 
          className="rounded-2xl overflow-hidden shadow-2xl w-full"
          style={{ backgroundColor: '#0B141A' }}
        >
          {/* WhatsApp Header */}
          <div className="px-4 py-3 flex items-center space-x-3" style={{ backgroundColor: '#202C33' }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg" style={{ backgroundColor: '#00A884' }}>
              A
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white text-sm">Asmi</h3>
              <p className="text-xs text-gray-400">online</p>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="p-4 space-y-3 min-h-[500px]" style={{ backgroundColor: '#0B141A' }}>
            {/* User Message */}
            <div className="flex justify-end">
              <div className="px-4 py-2.5 rounded-lg rounded-tr-sm max-w-[85%]" style={{ backgroundColor: '#005C4B' }}>
                <span className="text-sm text-white">
                  Send me my kid's school updates every Saturday at 11 AM. If anything urgent — like fees, missed homework, or schedule changes — tell me right away.
                </span>
              </div>
            </div>

            {/* Asmi Message 1 - Header */}
            <div className="flex justify-start">
              <div className="px-4 py-2.5 rounded-lg rounded-tl-sm max-w-[85%]" style={{ backgroundColor: '#1F2C34' }}>
                <span className="text-sm text-white font-medium">🏫 Greenfield School Weekly Update</span>
              </div>
            </div>

            {/* Asmi Message 2 - Homework */}
            <div className="flex justify-start">
              <div className="px-4 py-2.5 rounded-lg rounded-tl-sm max-w-[85%]" style={{ backgroundColor: '#1F2C34' }}>
                <div className="flex items-start space-x-2">
                  <FileText size={16} style={{ color: '#00A884', flexShrink: 0 }} className="mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-white">2 homeworks due</p>
                    <p className="text-xs text-gray-400 mt-0.5">Math worksheet & Science project</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Asmi Message 3 - PTM */}
            <div className="flex justify-start">
              <div className="px-4 py-2.5 rounded-lg rounded-tl-sm max-w-[85%]" style={{ backgroundColor: '#1F2C34' }}>
                <div className="flex items-start space-x-2">
                  <Calendar size={16} style={{ color: '#FBB024', flexShrink: 0 }} className="mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-white">1 PTM on Tuesday</p>
                    <p className="text-xs text-gray-400 mt-0.5">Parent-Teacher Meeting at 4:30 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Asmi Message 4 - Fee Payment (with action) */}
            <div className="flex justify-start">
              <div className="px-4 py-2.5 rounded-lg rounded-tl-sm max-w-[85%]" style={{ backgroundColor: '#1F2C34' }}>
                <div className="flex items-start space-x-2">
                  <CreditCard size={16} style={{ color: '#EF4444', flexShrink: 0 }} className="mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-white">Fee payment link attached</p>
                    <p className="text-xs text-gray-400 mt-0.5">Deadline - 28th Oct</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Asmi Message 5 - Action Prompt */}
            <div className="flex justify-start">
              <div className="px-4 py-2.5 rounded-lg rounded-tl-sm max-w-[85%]" style={{ backgroundColor: '#1F2C34' }}>
                <div className="flex items-start space-x-2">
                  <Bell size={16} style={{ color: '#00A884', flexShrink: 0 }} className="mt-0.5" />
                  <p className="text-sm text-white">Want me to set a reminder for Monday?</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-center mt-6" style={{ color: 'var(--text-secondary)' }}>
          Auto-compiled from school emails and calendar
        </p>
      </div>
    </div>
  );
};

export default PersonBackgroundDemo;

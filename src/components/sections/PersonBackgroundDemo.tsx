import { Calendar, FileText, CreditCard, Bell } from 'lucide-react';

const PersonBackgroundDemo = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="w-full max-w-[400px] mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold" style={{ color: 'var(--text-high)' }}>
            Your family assistant - same chat, zero missed updates.
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

          {/* User Prompt & School Update */}
          <div className="space-y-4">
              {/* User Message */}
              <div className="flex justify-end">
                <div className="px-4 py-3 rounded-2xl rounded-tr-sm max-w-xs shadow-lg" style={{ background: 'linear-gradient(135deg, var(--accent-positive), #2EC56A)' }}>
                  <span className="text-sm font-light" style={{ color: 'var(--bg-primary)' }}>
                    Send me my kid's school updates every Saturday at 11 AM. If anything urgent — like fees, missed homework, or schedule changes — tell me right away.
                  </span>
                </div>
              </div>

              {/* School Update Card */}
              <div className="rounded-xl p-4 space-y-4" style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                {/* Header */}
                <div className="flex items-center space-x-2 pb-3" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <span className="text-lg">🏫</span>
                  <h4 className="font-semibold text-sm" style={{ color: 'var(--text-high)' }}>Greenfield School Weekly Update</h4>
                </div>

                {/* Update Items */}
                <div className="space-y-3">
                  {/* Homework */}
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-lg flex-shrink-0" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                      <FileText size={14} style={{ color: 'var(--accent-positive)' }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium" style={{ color: 'var(--text-high)' }}>2 homeworks due</p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>Math worksheet & Science project</p>
                    </div>
                  </div>

                  {/* PTM */}
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-lg flex-shrink-0" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                      <Calendar size={14} style={{ color: '#FBB024' }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium" style={{ color: 'var(--text-high)' }}>1 PTM on Tuesday</p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>Parent-Teacher Meeting at 4:30 PM</p>
                    </div>
                  </div>

                  {/* Fee Payment */}
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-lg flex-shrink-0" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                      <CreditCard size={14} style={{ color: '#EF4444' }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium" style={{ color: 'var(--text-high)' }}>Fee payment link attached</p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>Deadline - 28th Oct</p>
                    </div>
                  </div>
                </div>

                {/* Action Prompt */}
                <div className="rounded-lg p-3 flex items-center space-x-2" style={{ backgroundColor: 'rgba(46, 197, 106, 0.1)', border: '1px solid rgba(46, 197, 106, 0.2)' }}>
                  <Bell size={14} style={{ color: 'var(--accent-positive)' }} />
                  <p className="text-xs" style={{ color: 'var(--text-high)' }}>Want me to set a reminder for Monday?</p>
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

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Eye, Share2, Trash2, Download, X, AlertTriangle, Check } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface PrivacySettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PrivacySettings {
  dataCollection: {
    analytics: boolean;
    crashReports: boolean;
    usageStats: boolean;
  };
  sharing: {
    allowSharing: boolean;
    shareWithContacts: boolean;
    shareAchievements: boolean;
    shareProgress: boolean;
  };
  dataRetention: {
    autoDelete: boolean;
    retentionDays: number;
    deleteOnUninstall: boolean;
  };
  notifications: {
    connectionReminders: boolean;
    achievementAlerts: boolean;
    wellnessCheckins: boolean;
  };
}

export const PrivacySettings: React.FC<PrivacySettingsProps> = ({ isOpen, onClose }) => {
  const [privacySettings, setPrivacySettings] = useLocalStorage<PrivacySettings>('mindhaven-privacy-settings', {
    dataCollection: {
      analytics: false,
      crashReports: true,
      usageStats: false
    },
    sharing: {
      allowSharing: true,
      shareWithContacts: false,
      shareAchievements: true,
      shareProgress: false
    },
    dataRetention: {
      autoDelete: false,
      retentionDays: 90,
      deleteOnUninstall: true
    },
    notifications: {
      connectionReminders: true,
      achievementAlerts: true,
      wellnessCheckins: false
    }
  });

  const [activeTab, setActiveTab] = useState<'privacy' | 'sharing' | 'data'>('privacy');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const updateSettings = (section: keyof PrivacySettings, key: string, value: boolean | number) => {
    setPrivacySettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const exportData = () => {
    const allData = {
      sessions: JSON.parse(localStorage.getItem('mindhaven-sessions') || '[]'),
      progress: JSON.parse(localStorage.getItem('mindhaven-progress') || '{}'),
      contacts: JSON.parse(localStorage.getItem('mindhaven-support-contacts') || '[]'),
      moodAnalysis: JSON.parse(localStorage.getItem('mindhaven-mood-analysis-logs') || '[]'),
      customTracks: JSON.parse(localStorage.getItem('mindhaven-custom-audio-tracks') || '[]'),
      audioSettings: JSON.parse(localStorage.getItem('mindhaven-audio-settings') || '{}'),
      settings: privacySettings,
      exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(allData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mindhaven-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const deleteAllData = () => {
    const keysToDelete = [
      'mindhaven-sessions',
      'mindhaven-progress',
      'mindhaven-support-contacts',
      'mindhaven-mood-analysis-logs',
      'mindhaven-custom-audio-tracks',
      'mindhaven-audio-settings',
      'mindhaven-privacy-settings'
    ];

    keysToDelete.forEach(key => localStorage.removeItem(key));
    setShowDeleteConfirm(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-2 rounded-full">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Privacy & Control</h3>
                <p className="text-sm text-gray-600">Manage your data and privacy preferences</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
            {[
              { id: 'privacy', label: 'Privacy', icon: Shield },
              { id: 'sharing', label: 'Sharing', icon: Share2 },
              { id: 'data', label: 'Data Control', icon: Eye }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'privacy' | 'sharing' | 'data')}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-4">
            {activeTab === 'privacy' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h4 className="font-medium text-gray-800 mb-3">Data Collection</h4>
                
                <SettingToggle
                  title="Anonymous Analytics"
                  description="Help improve MindHaven by sharing anonymous usage data"
                  checked={privacySettings.dataCollection.analytics}
                  onChange={(checked) => updateSettings('dataCollection', 'analytics', checked)}
                />
                
                <SettingToggle
                  title="Crash Reports"
                  description="Automatically send crash reports to help fix bugs"
                  checked={privacySettings.dataCollection.crashReports}
                  onChange={(checked) => updateSettings('dataCollection', 'crashReports', checked)}
                />
                
                <SettingToggle
                  title="Usage Statistics"
                  description="Track app usage patterns to improve user experience"
                  checked={privacySettings.dataCollection.usageStats}
                  onChange={(checked) => updateSettings('dataCollection', 'usageStats', checked)}
                />

                <h4 className="font-medium text-gray-800 mb-3 mt-6">Notifications</h4>
                
                <SettingToggle
                  title="Connection Reminders"
                  description="Gentle reminders to reach out to your support network"
                  checked={privacySettings.notifications.connectionReminders}
                  onChange={(checked) => updateSettings('notifications', 'connectionReminders', checked)}
                />
                
                <SettingToggle
                  title="Achievement Alerts"
                  description="Notifications when you achieve wellness milestones"
                  checked={privacySettings.notifications.achievementAlerts}
                  onChange={(checked) => updateSettings('notifications', 'achievementAlerts', checked)}
                />
                
                <SettingToggle
                  title="Wellness Check-ins"
                  description="Daily prompts to log your mood and feelings"
                  checked={privacySettings.notifications.wellnessCheckins}
                  onChange={(checked) => updateSettings('notifications', 'wellnessCheckins', checked)}
                />
              </motion.div>
            )}

            {activeTab === 'sharing' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h4 className="font-medium text-gray-800 mb-3">Sharing Preferences</h4>
                
                <SettingToggle
                  title="Allow Sharing"
                  description="Enable sharing your progress with others"
                  checked={privacySettings.sharing.allowSharing}
                  onChange={(checked) => updateSettings('sharing', 'allowSharing', checked)}
                />
                
                <SettingToggle
                  title="Share with Contacts"
                  description="Allow your support contacts to see your wellness status"
                  checked={privacySettings.sharing.shareWithContacts}
                  onChange={(checked) => updateSettings('sharing', 'shareWithContacts', checked)}
                />
                
                <SettingToggle
                  title="Share Achievements"
                  description="Automatically share wellness milestones"
                  checked={privacySettings.sharing.shareAchievements}
                  onChange={(checked) => updateSettings('sharing', 'shareAchievements', checked)}
                />
                
                <SettingToggle
                  title="Share Progress"
                  description="Allow sharing your overall wellness progress"
                  checked={privacySettings.sharing.shareProgress}
                  onChange={(checked) => updateSettings('sharing', 'shareProgress', checked)}
                />

                <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-indigo-600 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-indigo-800">Privacy First</h5>
                      <p className="text-sm text-indigo-700 mt-1">
                        Your personal information is never shared without your explicit consent. 
                        All sharing is anonymous and focuses on encouraging wellness habits.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'data' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h4 className="font-medium text-gray-800 mb-3">Data Retention</h4>
                
                <SettingToggle
                  title="Auto-delete Old Data"
                  description="Automatically remove old session data after a set period"
                  checked={privacySettings.dataRetention.autoDelete}
                  onChange={(checked) => updateSettings('dataRetention', 'autoDelete', checked)}
                />

                {privacySettings.dataRetention.autoDelete && (
                  <div className="ml-4 p-4 bg-gray-50 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Retention Period: {privacySettings.dataRetention.retentionDays} days
                    </label>
                    <input
                      type="range"
                      min="30"
                      max="365"
                      step="30"
                      value={privacySettings.dataRetention.retentionDays}
                      onChange={(e) => updateSettings('dataRetention', 'retentionDays', Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>30 days</span>
                      <span>1 year</span>
                    </div>
                  </div>
                )}
                
                <SettingToggle
                  title="Delete on Uninstall"
                  description="Remove all local data when the app is uninstalled"
                  checked={privacySettings.dataRetention.deleteOnUninstall}
                  onChange={(checked) => updateSettings('dataRetention', 'deleteOnUninstall', checked)}
                />

                <h4 className="font-medium text-gray-800 mb-3 mt-6">Data Management</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <motion.button
                    onClick={exportData}
                    className="flex items-center justify-center space-x-2 p-4 bg-indigo-50 border border-indigo-200 rounded-lg text-indigo-700 hover:bg-indigo-100 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Download className="w-5 h-5" />
                    <span>Export Data</span>
                  </motion.button>
                  
                  <motion.button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="flex items-center justify-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 hover:bg-red-100 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Trash2 className="w-5 h-5" />
                    <span>Delete All Data</span>
                  </motion.button>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-yellow-800">Data Privacy Notice</h5>
                      <p className="text-sm text-yellow-700 mt-1">
                        All your data is stored locally on your device. MindHaven does not 
                        collect or store personal information on external servers unless 
                        explicitly enabled by you.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Delete Confirmation Modal */}
          <AnimatePresence>
            {showDeleteConfirm && (
              <motion.div
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-red-100 rounded-full">
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800">Delete All Data</h4>
                  </div>
                  
                  <p className="text-gray-600 mb-6">
                    This action will permanently delete all your wellness data, including sessions, 
                    progress, contacts, and settings. This cannot be undone.
                  </p>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={deleteAllData}
                      className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-600 transition-colors"
                    >
                      Delete Everything
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const SettingToggle: React.FC<{
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}> = ({ title, description, checked, onChange }) => (
  <label className="flex items-start justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
    <div className="flex-1 mr-4">
      <div className="font-medium text-gray-800">{title}</div>
      <div className="text-sm text-gray-600">{description}</div>
    </div>
    <div className="relative">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <div className={`w-12 h-6 rounded-full transition-colors ${checked ? 'bg-indigo-500' : 'bg-gray-300'}`}>
        <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${checked ? 'translate-x-6' : 'translate-x-0.5'} mt-0.5`} />
      </div>
    </div>
  </label>
);

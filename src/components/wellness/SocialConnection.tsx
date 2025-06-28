import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, Mail, Share2, Heart, Users, X, Plus, AlertTriangle } from 'lucide-react';
import { GameSession, UserProgress } from '../../types/wellness-advanced';
import { useSoundEffects } from '../../hooks/useSoundEffects';

interface Contact {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  whatsapp?: string;
  relationship: string;
  isEmergency: boolean;
  autoMessageEnabled: boolean;
  preferredMethod: 'phone' | 'whatsapp' | 'email' | 'sms';
  createdAt: string;
}

interface SocialConnectionProps {
  sessions: GameSession[];
  progress: UserProgress;
  currentStressLevel: number;
  onClose: () => void;
}

// Storage key constant
const CONTACTS_STORAGE_KEY = 'mindhaven-support-contacts';

export const SocialConnection: React.FC<SocialConnectionProps> = ({
  sessions,
  progress,
  currentStressLevel,
  onClose
}) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [showAddContact, setShowAddContact] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [connectionPrompts, setConnectionPrompts] = useState(0);
  const [lastPromptTime, setLastPromptTime] = useState<Date | null>(null);
  const [autoMessageSettings, setAutoMessageSettings] = useState({
    enabled: true,
    threshold: 3,
    customMessage: "Hi! I've been thinking about you. Hope you're doing well. Would love to catch up when you have time. 💙"
  });
  const [isLoading, setIsLoading] = useState(true);
  const sounds = useSoundEffects();

  // Enhanced localStorage functions
  const saveContactsToStorage = (contactsToSave: Contact[]) => {
    try {
      const dataToSave = JSON.stringify(contactsToSave);
      localStorage.setItem(CONTACTS_STORAGE_KEY, dataToSave);
      
      // Verify the save worked immediately
      const verification = localStorage.getItem(CONTACTS_STORAGE_KEY);
      if (verification !== dataToSave) {
        throw new Error('Storage verification failed');
      }
      
      console.log('✅ Contacts saved successfully:', contactsToSave.length, 'contacts');
      return true;
    } catch (error) {
      console.error('❌ Error saving contacts:', error);
      alert('Unable to save contacts. Please check your browser storage settings.');
      return false;
    }
  };

  const loadContactsFromStorage = () => {
    try {
      setIsLoading(true);
      
      // Try multiple storage keys for backward compatibility
      const storageKeys = [CONTACTS_STORAGE_KEY, 'wellness-contacts', 'stresssmash-support-contacts'];
      let savedContacts = null;
      
      for (const key of storageKeys) {
        const data = localStorage.getItem(key);
        if (data) {
          savedContacts = JSON.parse(data);
          console.log(`📥 Loaded contacts from ${key}:`, savedContacts);
          
          // If we found data in old key, migrate it
          if (key !== CONTACTS_STORAGE_KEY) {
            localStorage.setItem(CONTACTS_STORAGE_KEY, data);
            localStorage.removeItem(key); // Clean up old key
            console.log('🔄 Migrated contacts to new storage key');
          }
          break;
        }
      }
      
      if (savedContacts && Array.isArray(savedContacts)) {
        // Validate contact structure
        const validContacts = savedContacts.filter(contact => 
          contact && 
          typeof contact === 'object' && 
          contact.id && 
          contact.name && 
          contact.relationship
        );
        
        console.log('✅ Valid contacts loaded:', validContacts.length);
        setContacts(validContacts);
        return validContacts;
      } else {
        console.log('📭 No valid contacts found in storage');
        setContacts([]);
        return [];
      }
    } catch (error) {
      console.error('❌ Error loading contacts:', error);
      setContacts([]);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Load contacts on component mount
  useEffect(() => {
    console.log('🔄 Component mounted, loading contacts...');
    loadContactsFromStorage();
  }, []);

  // Save contacts whenever the contacts array changes (but not on initial load)
  useEffect(() => {
    if (!isLoading && contacts.length >= 0) {
      console.log('💾 Contacts changed, saving to storage...');
      saveContactsToStorage(contacts);
    }
  }, [contacts, isLoading]);

  // Monitor stress levels and trigger connection prompts
  useEffect(() => {
    if (currentStressLevel >= 7 && (!lastPromptTime || Date.now() - lastPromptTime.getTime() > 3600000)) {
      setLastPromptTime(new Date());
    }
  }, [currentStressLevel, lastPromptTime]);

  const addContact = (contactData: Omit<Contact, 'id' | 'createdAt'>) => {
    const newContact: Contact = {
      ...contactData,
      id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString()
    };
    
    console.log('➕ Adding new contact:', newContact);
    
    setContacts(prevContacts => {
      const updatedContacts = [...prevContacts, newContact];
      console.log('📝 Updated contacts array:', updatedContacts);
      return updatedContacts;
    });
    
    setShowAddContact(false);
    sounds.success();
    
    // Show confirmation with contact count
    setTimeout(() => {
      const currentCount = contacts.length + 1;
      alert(`✅ Contact "${newContact.name}" saved successfully!\n\nYou now have ${currentCount} support contact${currentCount === 1 ? '' : 's'}.`);
    }, 100);
  };

  const removeContact = (contactId: string) => {
    console.log('🗑️ Removing contact with ID:', contactId);
    
    const contactToRemove = contacts.find(c => c.id === contactId);
    if (contactToRemove) {
      setContacts(prevContacts => {
        const updatedContacts = prevContacts.filter(c => c.id !== contactId);
        console.log('📝 Contacts after removal:', updatedContacts);
        return updatedContacts;
      });
      
      sounds.notification();
      
      // Show confirmation
      setTimeout(() => {
        alert(`🗑️ Contact "${contactToRemove.name}" has been removed.`);
      }, 100);
    }
  };

  const initiateConnection = (contact: Contact) => {
    const message = `Hi ${contact.name}! I'm reaching out because I could use some support right now. Would you be available for a quick chat?`;
    
    try {
      switch (contact.preferredMethod) {
        case 'whatsapp':
          if (contact.whatsapp) {
            let cleanNumber = contact.whatsapp.replace(/\D/g, '');
            
            if (cleanNumber.startsWith('0')) {
              cleanNumber = '91' + cleanNumber.substring(1);
            } else if (cleanNumber.length === 10 && !cleanNumber.startsWith('91')) {
              cleanNumber = '91' + cleanNumber;
            }
            
            const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
          } else {
            alert('WhatsApp number not available for this contact');
          }
          break;
        case 'phone':
          if (contact.phone) {
            window.open(`tel:${contact.phone}`);
          } else {
            alert('Phone number not available for this contact');
          }
          break;
        case 'email':
          if (contact.email) {
            const subject = 'Checking In - Need Support';
            const emailUrl = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
            window.open(emailUrl, '_blank');
          } else {
            alert('Email address not available for this contact');
          }
          break;
        case 'sms':
          if (contact.phone) {
            const smsUrl = `sms:${contact.phone}?body=${encodeURIComponent(message)}`;
            window.open(smsUrl);
          } else {
            alert('Phone number not available for this contact');
          }
          break;
        default:
          alert('Contact method not configured');
      }
      
      sounds.notification();
    } catch (error) {
      console.error('Error initiating connection:', error);
      alert('Unable to open contact method. Please check your device settings.');
    }
  };

  const declineConnection = () => {
    const newPromptCount = connectionPrompts + 1;
    setConnectionPrompts(newPromptCount);
    
    if (autoMessageSettings.enabled && newPromptCount >= autoMessageSettings.threshold) {
      triggerAutoMessage();
      setConnectionPrompts(0);
    }
  };

  const triggerAutoMessage = () => {
    const emergencyContacts = contacts.filter(c => c.isEmergency && c.autoMessageEnabled);
    
    emergencyContacts.forEach(contact => {
      const message = autoMessageSettings.customMessage;
      
      try {
        switch (contact.preferredMethod) {
          case 'whatsapp':
            if (contact.whatsapp) {
              let cleanNumber = contact.whatsapp.replace(/\D/g, '');
              if (cleanNumber.startsWith('0')) {
                cleanNumber = '91' + cleanNumber.substring(1);
              } else if (cleanNumber.length === 10 && !cleanNumber.startsWith('91')) {
                cleanNumber = '91' + cleanNumber;
              }
              window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`, '_blank');
            }
            break;
          case 'email':
            if (contact.email) {
              window.open(`mailto:${contact.email}?subject=${encodeURIComponent('Thinking of You')}&body=${encodeURIComponent(message)}`, '_blank');
            }
            break;
          case 'sms':
            if (contact.phone) {
              window.open(`sms:${contact.phone}?body=${encodeURIComponent(message)}`);
            }
            break;
        }
      } catch (error) {
        console.error('Error sending auto-message:', error);
      }
    });
  };

  const shareAchievement = (type: 'progress' | 'session' | 'streak') => {
    let shareText = '';
    
    switch (type) {
      case 'progress':
        shareText = `I've completed ${progress.totalSessions} wellness sessions and I'm feeling great! 🌟 Taking care of my mental health one day at a time. #MentalHealthMatters #WellnessJourney`;
        break;
      case 'session':
        shareText = `Just finished a stress-relief session and feeling much better! 😌 Small steps towards better mental wellness. #StressRelief #SelfCare`;
        break;
      case 'streak':
        shareText = `${progress.streakDays} days of consistent wellness practice! 🔥 Building healthy habits for my mental health. #HealthyHabits #MentalWellness`;
        break;
    }

    try {
      if (navigator.share) {
        navigator.share({
          title: 'Wellness Progress',
          text: shareText,
          url: window.location.origin
        }).catch(error => {
          console.error('Error sharing:', error);
          navigator.clipboard.writeText(shareText).then(() => {
            alert('Copied to clipboard! You can now paste it in WhatsApp, SMS, or any social media app.');
          });
        });
      } else {
        navigator.clipboard.writeText(shareText).then(() => {
          sounds.success();
          alert('Copied to clipboard! You can now paste it in WhatsApp, SMS, or any social media app.');
        }).catch(error => {
          console.error('Error copying to clipboard:', error);
          alert(`Share this message:\n\n${shareText}`);
        });
      }
    } catch (error) {
      console.error('Error in share function:', error);
      alert(`Share this message:\n\n${shareText}`);
    }
  };

  const forceReloadContacts = () => {
    console.log('🔄 Force reloading contacts...');
    const reloaded = loadContactsFromStorage();
    alert(`🔄 Contacts reloaded!\n\nFound ${reloaded.length} contact${reloaded.length === 1 ? '' : 's'} in storage.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-3 rounded-full text-white mr-4">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Social Support</h2>
                <p className="text-gray-600">Connect with your support network</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* High stress level prompt */}
          {currentStressLevel >= 7 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-4 mb-4"
            >
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-800">High Stress Detected</h3>
                  <p className="text-red-700 text-sm mb-3">
                    It looks like you're experiencing high stress. Consider reaching out to someone you trust.
                  </p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        if (contacts.length > 0) {
                          const randomContact = contacts[Math.floor(Math.random() * contacts.length)];
                          initiateConnection(randomContact);
                        } else {
                          setShowAddContact(true);
                        }
                      }}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
                    >
                      {contacts.length > 0 ? 'Connect Now' : 'Add Contact'}
                    </button>
                    <button
                      onClick={declineConnection}
                      className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
                    >
                      Not Now
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-4">
            <motion.button
              onClick={() => setShowAddContact(true)}
              className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white p-4 rounded-lg flex items-center justify-center space-x-2 hover:from-indigo-600 hover:to-blue-600 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus className="w-5 h-5" />
              <span>Add Contact</span>
            </motion.button>
            
            <motion.button
              onClick={() => setShowShareModal(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-lg flex items-center justify-center space-x-2 hover:from-purple-600 hover:to-pink-600 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Share2 className="w-5 h-5" />
              <span>Share Progress</span>
            </motion.button>
          </div>
        </div>

        {/* Support Contacts */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Support Contacts</h3>
            <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
              {contacts.length} contact{contacts.length === 1 ? '' : 's'}
            </span>
          </div>

          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto mb-2"></div>
              <p className="text-gray-600">Loading contacts...</p>
            </div>
          ) : contacts.length === 0 ? (
            <div className="text-center py-8">
              <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h4 className="text-lg font-medium text-gray-600 mb-2">No contacts yet</h4>
              <p className="text-gray-500 mb-4">Add people you trust to build your support network</p>
              <button
                onClick={() => setShowAddContact(true)}
                className="bg-indigo-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-600 transition-colors"
              >
                Add Your First Contact
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {contacts.map((contact) => (
                <motion.div
                  key={contact.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-gray-800">{contact.name}</h4>
                        {contact.isEmergency && (
                          <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-medium">
                            Emergency
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{contact.relationship}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        {contact.phone && (
                          <span className="flex items-center">
                            <Phone className="w-3 h-3 mr-1" />
                            {contact.phone.substring(0, 3)}***{contact.phone.substring(contact.phone.length - 3)}
                          </span>
                        )}
                        {contact.email && (
                          <span className="flex items-center">
                            <Mail className="w-3 h-3 mr-1" />
                            {contact.email.split('@')[0].substring(0, 3)}***@{contact.email.split('@')[1]}
                          </span>
                        )}
                        {contact.whatsapp && (
                          <span className="flex items-center">
                            <MessageCircle className="w-3 h-3 mr-1" />
                            WhatsApp
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <motion.button
                        onClick={() => initiateConnection(contact)}
                        className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-200 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Connect
                      </motion.button>
                      <button
                        onClick={() => removeContact(contact.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {contacts.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={forceReloadContacts}
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                🔄 Refresh Contacts
              </button>
            </div>
          )}
        </div>

        {/* Add Contact Modal */}
        <AnimatePresence>
          {showAddContact && (
            <AddContactModal
              onAdd={addContact}
              onClose={() => setShowAddContact(false)}
            />
          )}
        </AnimatePresence>

        {/* Share Modal */}
        <AnimatePresence>
          {showShareModal && (
            <ShareModal
              progress={progress}
              onShare={shareAchievement}
              onClose={() => setShowShareModal(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Add Contact Modal Component
const AddContactModal: React.FC<{
  onAdd: (contact: Omit<Contact, 'id' | 'createdAt'>) => void;
  onClose: () => void;
}> = ({ onAdd, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    whatsapp: '',
    relationship: '',
    isEmergency: false,
    autoMessageEnabled: false,
    preferredMethod: 'whatsapp' as 'phone' | 'whatsapp' | 'email' | 'sms'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.relationship.trim()) {
      alert('Please enter at least the name and relationship');
      return;
    }

    if (!formData.phone && !formData.email && !formData.whatsapp) {
      alert('Please enter at least one contact method');
      return;
    }

    onAdd(formData);
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">Add Support Contact</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter contact name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Relationship *</label>
            <select
              value={formData.relationship}
              onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select relationship</option>
              <option value="Family">Family</option>
              <option value="Friend">Friend</option>
              <option value="Partner">Partner</option>
              <option value="Therapist">Therapist</option>
              <option value="Counselor">Counselor</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
            <input
              type="tel"
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="WhatsApp number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Email address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Contact Method</label>
            <select
              value={formData.preferredMethod}
              onChange={(e) => setFormData({ ...formData, preferredMethod: e.target.value as 'phone' | 'whatsapp' | 'email' | 'sms' })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="whatsapp">WhatsApp</option>
              <option value="phone">Phone Call</option>
              <option value="sms">SMS</option>
              <option value="email">Email</option>
            </select>
          </div>

          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isEmergency}
                onChange={(e) => setFormData({ ...formData, isEmergency: e.target.checked })}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Emergency contact</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.autoMessageEnabled}
                onChange={(e) => setFormData({ ...formData, autoMessageEnabled: e.target.checked })}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Enable auto-messages</span>
            </label>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-600 transition-colors"
            >
              Add Contact
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

// Share Modal Component
const ShareModal: React.FC<{
  progress: UserProgress;
  onShare: (type: 'progress' | 'session' | 'streak') => void;
  onClose: () => void;
}> = ({ progress, onShare, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">Share Your Progress</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-gray-600 mb-6 text-sm">
          Share your wellness journey with friends and family to inspire and motivate each other.
        </p>

        <div className="space-y-3">
          <motion.button
            className="w-full bg-green-50 border border-green-200 p-4 rounded-lg text-left hover:bg-green-100 transition-colors"
            onClick={() => {
              onShare('progress');
              onClose();
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="font-medium text-green-800">Overall Progress</div>
            <div className="text-sm text-green-600">{progress.totalSessions} wellness sessions completed</div>
          </motion.button>
          
          <motion.button
            className="w-full bg-blue-50 border border-blue-200 p-4 rounded-lg text-left hover:bg-blue-100 transition-colors"
            onClick={() => {
              onShare('session');
              onClose();
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="font-medium text-blue-800">Recent Session</div>
            <div className="text-sm text-blue-600">Share your latest wellness activity</div>
          </motion.button>
          
          <motion.button
            className="w-full bg-purple-50 border border-purple-200 p-4 rounded-lg text-left hover:bg-purple-100 transition-colors"
            onClick={() => {
              onShare('streak');
              onClose();
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="font-medium text-purple-800">Daily Streak</div>
            <div className="text-sm text-purple-600">{progress.streakDays} days of consistent practice</div>
          </motion.button>
        </div>
        
        <div className="mt-4 p-3 bg-indigo-50 rounded-lg">
          <p className="text-sm text-indigo-800">
            💡 <strong>Tip:</strong> Your message will be copied to clipboard. You can then paste it in WhatsApp, SMS, or any social media app to share with friends and family.
          </p>
        </div>
        
        <button
          onClick={onClose}
          className="w-full mt-4 bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
      </motion.div>
    </motion.div>
  );
};

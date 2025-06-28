// Helper functions for handling popup blockers
export const isPopupBlocked = (error: any): boolean => {
  return (
    error?.code === 'auth/popup-blocked' ||
    error?.code === 'auth/popup-closed-by-user' ||
    error?.message?.includes('popup') ||
    error?.message?.includes('blocked')
  );
};

export const getPopupBlockerMessage = (): string => {
  return `
    Popup was blocked by your browser. 
    Please allow popups for this site or click the button again.
    The page will redirect you to complete authentication.
  `;
};

// Check if browser supports popups
export const canUsePopups = (): boolean => {
  try {
    const popup = window.open('', '_blank', 'width=1,height=1');
    if (popup) {
      popup.close();
      return true;
    }
    return false;
  } catch {
    return false;
  }
};

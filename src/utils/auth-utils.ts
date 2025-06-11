
export const getCurrentUser = async () => {
  // Mock user data for development
  return {
    id: '1',
    email: 'faithful@orthodox-echoes.com',
    user_metadata: {
      full_name: 'Orthodox Believer'
    }
  };
};

export const logout = async () => {
  // Mock logout for development
  console.log('User logged out');
  return Promise.resolve();
};

export const getUsername = async () => {
  // Mock username for development
  return 'Orthodox Believer';
};

export const getLastLogin = async () => {
  // Mock last login for development
  return new Date();
};

export const formatLastLogin = (date: Date | null) => {
  if (!date) return 'Never';
  return date.toLocaleDateString();
};

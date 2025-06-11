
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
  // Mock logout function for development
  console.log('User logged out');
};

export const getUsername = (user: any) => {
  return user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
};

export const getLastLogin = (user: any) => {
  // Mock last login date
  return new Date();
};

export const formatLastLogin = (date: Date) => {
  return date.toLocaleDateString();
};


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

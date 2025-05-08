
// Check if the user is authenticated
export const isAuthenticated = (): boolean => {
  const adminStatus = localStorage.getItem('orthodoxEchoesAdmin');
  return adminStatus === 'true';
};

// Check if the user is an admin
export const isAdmin = (): boolean => {
  const isAdmin = localStorage.getItem('orthodoxEchoesIsAdmin');
  return isAdmin === 'true';
};

// Get the current authenticated username
export const getUsername = (): string => {
  return localStorage.getItem('orthodoxEchoesAdminUser') || 'Guest';
};

// Get the last login date
export const getLastLogin = (): Date | null => {
  const lastLoginStr = localStorage.getItem('orthodoxEchoesLastLogin');
  return lastLoginStr ? new Date(lastLoginStr) : null;
};

// Format the last login time/date for display
export const formatLastLogin = (date: Date | null): string => {
  if (!date) return 'Never';
  
  // If login was today, show time
  const today = new Date();
  if (date.toDateString() === today.toDateString()) {
    return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }
  
  // Otherwise show date
  return date.toLocaleDateString();
};

// Logout the user
export const logout = (): void => {
  localStorage.removeItem('orthodoxEchoesAdmin');
  localStorage.removeItem('orthodoxEchoesAdminUser');
  localStorage.removeItem('orthodoxEchoesLastLogin');
  localStorage.removeItem('orthodoxEchoesIsAdmin');
};

// Login the user
export const login = (username: string, isAdmin: boolean = false): void => {
  localStorage.setItem('orthodoxEchoesAdmin', 'true');
  localStorage.setItem('orthodoxEchoesAdminUser', username);
  localStorage.setItem('orthodoxEchoesIsAdmin', isAdmin ? 'true' : 'false');
  
  // Record login timestamp
  const now = new Date();
  localStorage.setItem('orthodoxEchoesLastLogin', now.toISOString());
};

// Check if the password is correct for admin
export const checkPassword = (password: string): boolean => {
  // Admin password check - this would normally be server-side!
  return password === 'Donovan';
};

// Register a new user
export const registerUser = (username: string, password: string): void => {
  // Get existing users from localStorage
  const users = JSON.parse(localStorage.getItem('orthodoxEchoesUsers') || '{}');
  
  // Add the new user
  users[username] = {
    username,
    password,
    createdAt: new Date().toISOString()
  };
  
  // Save back to localStorage
  localStorage.setItem('orthodoxEchoesUsers', JSON.stringify(users));
  
  // Log in the new user
  login(username, false);
};

// Get all registered users (for admin dashboard)
export const getRegisteredUsers = (): any[] => {
  const users = JSON.parse(localStorage.getItem('orthodoxEchoesUsers') || '{}');
  return Object.values(users);
};

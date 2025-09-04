// Simple frontend-only auth utilities
export const getAuthenticatedUser = () => {
  const userData = localStorage.getItem("fra-user");
  return userData ? JSON.parse(userData) : null;
};

export const isAuthenticated = () => {
  return getAuthenticatedUser() !== null;
};

export const logout = () => {
  localStorage.removeItem("fra-user");
};

export type UserRole = 'ministry' | 'district' | 'forest' | 'revenue' | 'planning' | 'ngo';
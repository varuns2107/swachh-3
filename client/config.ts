// API Configuration
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://swachh-saathi.onrender.com";

export const API_ENDPOINTS = {
  predict: `${API_BASE_URL}/predict`,
  adminStats: `${API_BASE_URL}/admin/stats`,
  adminIssues: `${API_BASE_URL}/admin/issues`,
  adminHighPriority: `${API_BASE_URL}/admin/issues/high`,
  adminCriticalAreas: `${API_BASE_URL}/admin/areas/critical`,
  areaHealth: `${API_BASE_URL}/area-health`,
  adminResolve: (issueId: number) => `${API_BASE_URL}/admin/resolve/${issueId}`,
};

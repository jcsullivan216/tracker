// Service/Agency color schemes - consistent across Users and Buyers
export const serviceColors = {
  'Army': { bg: '#1a2e1a', border: '#22c55e', text: '#4ade80', badge: '#166534' },
  'Air Force': { bg: '#1a1a2e', border: '#3b82f6', text: '#60a5fa', badge: '#1e40af' },
  'Space Force': { bg: '#1e1a2e', border: '#8b5cf6', text: '#a78bfa', badge: '#5b21b6' },
  'Navy': { bg: '#1a2a2e', border: '#0ea5e9', text: '#38bdf8', badge: '#0369a1' },
  'Marine Corps': { bg: '#2e1a1a', border: '#ef4444', text: '#f87171', badge: '#b91c1c' },
  'SOCOM': { bg: '#2e2a1a', border: '#f59e0b', text: '#fbbf24', badge: '#b45309' },
  'CYBERCOM': { bg: '#1a2e2e', border: '#14b8a6', text: '#2dd4bf', badge: '#0f766e' },
  'Joint': { bg: '#2e1a2e', border: '#d946ef', text: '#e879f9', badge: '#a21caf' },
  'STRATCOM': { bg: '#2e1a2e', border: '#ec4899', text: '#f472b6', badge: '#be185d' },
  'NSA': { bg: '#1a1a1a', border: '#71717a', text: '#a1a1aa', badge: '#3f3f46' },
  'OSD': { bg: '#1e293b', border: '#64748b', text: '#94a3b8', badge: '#475569' },
  'DARPA': { bg: '#1a1a2e', border: '#818cf8', text: '#a5b4fc', badge: '#4f46e5' },
  'Consortium': { bg: '#2e2a1a', border: '#fbbf24', text: '#fde047', badge: '#a16207' },
  'DOE': { bg: '#1a2e2a', border: '#34d399', text: '#6ee7b7', badge: '#059669' },
  'INDOPACOM': { bg: '#2e1a1e', border: '#f43f5e', text: '#fb7185', badge: '#be123c' },
  'CENTCOM': { bg: '#2e251a', border: '#d97706', text: '#fbbf24', badge: '#92400e' },
  'EUCOM': { bg: '#1a1e2e', border: '#6366f1', text: '#818cf8', badge: '#4338ca' },
  'SPACECOM': { bg: '#1e1a2e', border: '#a855f7', text: '#c084fc', badge: '#7c3aed' },
};

// Engagement status configuration
export const statusConfig = {
  'not-engaged': { label: 'Not Engaged', color: '#1a1a2e', border: '#2d2d44', textColor: '#6b7280' },
  'contacted': { label: 'Contacted', color: '#1e3a5f', border: '#2563eb', textColor: '#60a5fa' },
  'engaged': { label: 'Engaged', color: '#1a2e1a', border: '#16a34a', textColor: '#4ade80' },
  'deployed': { label: 'Deployed', color: '#2e1a2e', border: '#a855f7', textColor: '#c084fc' },
  'contract': { label: 'Under Contract', color: '#1a2e2e', border: '#06b6d4', textColor: '#22d3ee' },
  'on-ice': { label: 'On Ice', color: '#1e293b', border: '#475569', textColor: '#94a3b8' },
};

// Kanban columns (active statuses for pipeline view)
export const kanbanColumns = ['contacted', 'engaged', 'deployed', 'contract', 'on-ice'];

// Default color scheme for unknown services
const defaultColors = { bg: '#1a1a2e', border: '#6b7280', text: '#9ca3af', badge: '#374151' };

// Get color scheme for a service
export const getServiceColor = (service) => serviceColors[service] || defaultColors;

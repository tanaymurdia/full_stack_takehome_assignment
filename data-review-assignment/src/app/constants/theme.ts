export const colors = {
  // Error states
  critical: {
    bg: 'bg-red-900/20',
    text: 'text-red-400',
    border: 'border-red-500/30',
    hover: 'hover:bg-red-500/30',
    solid: 'bg-red-500',
  },
  warning: {
    bg: 'bg-amber-900/20',
    text: 'text-amber-400',
    border: 'border-amber-500/30',
    hover: 'hover:bg-amber-500/30',
    solid: 'bg-amber-500',
  },
  valid: {
    bg: 'bg-emerald-900/20',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
    hover: 'hover:bg-emerald-500/30',
    solid: 'bg-emerald-500',
  },
  
  // Primary UI colors (based on valid/emerald)
  primary: {
    bg: 'bg-emerald-600',
    bgHover: 'hover:bg-emerald-500',
    bgActive: 'active:bg-emerald-700',
    text: 'text-emerald-50',
    border: 'border-emerald-500',
    shadow: 'shadow-emerald-500/10',
    gradient: {
      from: 'from-emerald-600',
      to: 'to-emerald-500',
    },
  },
  
  // Surface colors
  surface: {
    bg: 'bg-gray-900',
    bgHover: 'hover:bg-gray-800',
    bgActive: 'active:bg-gray-950',
    border: 'border-white/10',
    text: 'text-gray-300',
    textMuted: 'text-gray-400',
  },
};

export const scrollbarStyles = `
  scrollbar-thin
  scrollbar-track-gray-800/50
  scrollbar-thumb-emerald-600/50
  hover:scrollbar-thumb-emerald-500/50
  active:scrollbar-thumb-emerald-700/50
`;

export const commonStyles = {
  button: {
    primary: `
      px-4 py-2
      ${colors.primary.bg} ${colors.primary.text}
      rounded-full
      text-xs
      hover:scale-105 ${colors.primary.bgHover}
      transition-all duration-300 
      shadow-lg ${colors.primary.shadow}
      active:scale-95
    `,
    secondary: `
      px-3 py-1.5
      ${colors.surface.bg} ${colors.surface.text}
      rounded-lg
      text-xs
      ${colors.surface.bgHover}
      transition-colors
      border ${colors.surface.border}
    `,
  },
  card: `
    bg-surface-mixed/20 
    backdrop-blur-xl 
    rounded-3xl 
    p-8 
    shadow-2xl 
    transition-all 
    duration-500 
    border ${colors.surface.border}
  `,
  table: {
    container: `
      overflow-x-auto 
      overflow-y-auto 
      max-h-[70vh]
      ${scrollbarStyles}
    `,
    header: `
      px-6 py-4 
      text-left text-xs
      font-medium 
      ${colors.surface.text}
      cursor-pointer 
      group 
      hover:bg-white/5 
      transition-colors
    `,
    cell: `
      px-6 py-3
      text-xs
      transition-all 
      duration-200
      relative
      overflow-hidden
    `,
    statusBadge: `
      px-2 py-1 
      rounded-full 
      text-xs
      inline-block
    `,
  },
  actionButton: `
    relative px-4 py-2 text-xs
    h-[32px]
    min-w-[120px]
    rounded-lg
    transition-all duration-300
    overflow-hidden
    bg-gray-900/50 backdrop-blur-sm
    border border-white/10
    hover:bg-gray-800/50
  `,
};

// Combine error styles
export const severityStyles = {
  critical: `${colors.critical.bg} ${colors.critical.text} ${colors.critical.border}`,
  warning: `${colors.warning.bg} ${colors.warning.text} ${colors.warning.border}`,
  valid: `${colors.valid.bg} ${colors.valid.text} ${colors.valid.border}`,
};

export const fieldValidityStyle = `${colors.valid.bg} ${colors.valid.text} ${colors.valid.border} opacity-50`;
export const TURF_ISSUES = ['Pet Odor', 'Matted/Flat Turf', 'General Cleaning Needed', 'All of The Above', 'Other'] as const;
export const TIMELINE_OPTIONS = ['As soon as possible', 'Within the next week', 'Within the next month', 'Just browsing'] as const;
export const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

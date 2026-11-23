// PRISHA XPRESS PVT. LTD. - COMMON DATE FILTER UTILITY FOR ADMIN DASHBOARDS
// SUPPORTS: 'All Time', 'Today', 'This Week' (Last 7 Days), 'This Month' (Current Calendar Month)

export type DateRangeFilter = 'all' | 'today' | 'week' | 'month';

export const DATE_FILTER_OPTIONS: { id: DateRangeFilter; label: string }[] = [
  { id: 'all', label: 'All Time' },
  { id: 'today', label: 'Today' },
  { id: 'week', label: 'This Week' },
  { id: 'month', label: 'This Month' },
];

export const isWithinDateRange = (dateString?: string, range: DateRangeFilter = 'all'): boolean => {
  if (range === 'all' || !dateString) return true;
  const itemDate = new Date(dateString);
  if (isNaN(itemDate.getTime())) return true;

  const now = new Date();

  if (range === 'today') {
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    return itemDate.getTime() >= startOfToday;
  }

  if (range === 'week') {
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).getTime();
    return itemDate.getTime() >= sevenDaysAgo;
  }

  if (range === 'month') {
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
    return itemDate.getTime() >= startOfMonth;
  }

  return true;
};

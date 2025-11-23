export type StatsSummary = {
  totalReviewed: number;
  totalReviewedToday: number;
  totalReviewedThisWeek: number;
  totalReviewedThisMonth: number;
  approvedPercentage: number;
  rejectedPercentage: number;
  requestChangesPercentage: number;
  averageReviewTime: number;
};

export type ActivityData = {
  date: string;
  approved: number;
  rejected: number;
  requestChanges: number;
};

export type DecisionsData = {
  approved: number;
  rejected: number;
  requestChanges: number;
};

export type CategoriesChart = Record<string, number>;

export type StatsPeriod = 'today' | 'week' | 'month' | 'custom';

export type StatsParams = {
  period?: StatsPeriod;
  startDate?: string;
  endDate?: string;
};


export type ModeratorStats = {
  totalReviewed: number;
  todayReviewed: number;
  thisWeekReviewed: number;
  thisMonthReviewed: number;
  averageReviewTime: number;
  approvalRate: number;
};

export type Moderator = {
  id: number;
  name: string;
  email: string;
  role: string;
  statistics: ModeratorStats;
  permissions: string[];
};


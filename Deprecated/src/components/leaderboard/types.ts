export type LeaderboardType = 'all-time' | 'weekly' | 'daily';

export interface LeaderboardArrayItem {
  wallet: string;
  win_cntp: number;
  bio?: string;
}

export default interface Leaderboard {
  allTime: LeaderboardArrayItem[],
  weekly: LeaderboardArrayItem[],
  daily: LeaderboardArrayItem[],
  monthly: LeaderboardArrayItem[],
}
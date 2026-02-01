/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Swachh Saathi API Types - Based on Flask Backend
 */
export type IssueCategory =
  | "waste"
  | "water"
  | "air"
  | "transport"
  | "energy"
  | "sanitation"
  | "noise";
export type PriorityLevel = "low" | "medium" | "high";
export type TrustLevel = "low" | "medium" | "high";

export interface PredictRequest {
  text: string;
  location: string; // "lat,lon"
}

export interface PredictResponse {
  duplicate: boolean;
  id: number;
  category: IssueCategory;
  authority: string;
  priority: PriorityLevel;
  trust_level: TrustLevel;
  supporters: number;
  actions: string[];
  message: string;
}

export interface AdminStatsResponse {
  total_issues: number;
  open_issues: number;
  resolved_issues: number;
  high_priority_issues: number;
}

export interface AreaHealthItem {
  area: string;
  health_score: number;
  color: "green" | "yellow" | "red";
  total_issues: number;
  resolved_issues: number;
}

export interface Issue {
  id: number;
  category: IssueCategory;
  lat: number;
  lon: number;
  count: number;
  priority: PriorityLevel;
  trust_level: TrustLevel;
  status: "open" | "resolved";
  created_at: string;
}

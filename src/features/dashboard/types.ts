export type MetricKey = "event_p95_ms" | "chart_render_ms" | "legacy_api_match_rate";

export type DashboardMetric = { key: MetricKey; label: string; value: number; unit: string; target: number };
export type WorkflowEvent = { id: string; title: string; status: string; severity: "low" | "medium" | "high"; updatedAt: string };
export type TrendPoint = { day: string; value: number };

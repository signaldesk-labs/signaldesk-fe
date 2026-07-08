import { Activity, CheckCircle2, ShieldAlert } from "lucide-react";
import { useEffect, useRef } from "react";
import { renderTrend } from "../chart/d3-trend";
import { useDashboard } from "./hooks";

const fallback = {
  metrics: [
    { key: "open_incidents", label: "open incidents", value: 24, unit: "cases", target: 30 },
    { key: "triage_p95_ms", label: "triage p95", value: 168, unit: "ms", target: 220 },
    { key: "legacy_sync_rate", label: "legacy sync", value: 98, unit: "%", target: 95 }
  ],
  events: [
    { id: "sec-1042", title: "Suspicious login burst", status: "triaging", severity: "high", updatedAt: "2026-07-08" },
    { id: "sec-1037", title: "Payment webhook anomaly", status: "assigned", severity: "medium", updatedAt: "2026-07-08" },
    { id: "sec-1028", title: "Legacy report sync check", status: "resolved", severity: "low", updatedAt: "2026-07-07" }
  ],
  trend: [{ day: "Mon", value: 31 }, { day: "Tue", value: 26 }, { day: "Wed", value: 39 }, { day: "Thu", value: 22 }, { day: "Fri", value: 18 }],
} as const;

export const Dashboard = () => {
  const query = useDashboard();
  const data = query.data ?? fallback;
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current) renderTrend(svgRef.current, [...data.trend]);
  }, [data.trend]);

  return (
    <main className="shell">
      <section className="header">
        <div>
          <p>Frontend / Product Engineer project</p>
          <h1>SignalDesk</h1>
          <span>Security operators need one consistent event workflow across React dashboards and a jQuery legacy report.</span>
        </div>
        <CheckCircle2 aria-hidden />
      </section>
      <section className="metrics">
        {data.metrics.map((metric) => (
          <article key={metric.key}>
            <Activity aria-hidden />
            <strong>{metric.value}{metric.unit}</strong>
            <span>{metric.label}</span>
          </article>
        ))}
      </section>
      <section className="workbench">
        <div>
          <h2>Live workflow</h2>
          {data.events.map((event) => (
            <button key={event.id} className={event.severity}>
              <ShieldAlert aria-hidden />
              <span>{event.title}</span>
              <small>{event.status} · {event.updatedAt}</small>
            </button>
          ))}
        </div>
        <svg ref={svgRef} role="img" aria-label="D3 trend chart" />
      </section>
    </main>
  );
};

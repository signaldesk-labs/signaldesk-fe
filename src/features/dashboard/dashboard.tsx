import { Activity, CheckCircle2, ShieldAlert } from "lucide-react";
import { useEffect, useRef } from "react";
import { renderTrend } from "../chart/d3-trend";
import { useDashboard } from "./hooks";

const fallback = {
  metrics: [
    { key: "event_p95_ms", label: "event p95 ms", value: 184, unit: "ms", target: 220 },
    { key: "chart_render_ms", label: "chart render ms", value: 92, unit: "%", target: 90 },
    { key: "legacy_api_match_rate", label: "legacy api match rate", value: 37, unit: "events", target: 30 },
  ],
  events: [
    { id: "evt-1", title: "event triage", status: "requested", severity: "high", updatedAt: "2026-07-08" },
    { id: "evt-2", title: "saved filters", status: "approved", severity: "medium", updatedAt: "2026-07-08" },
  ],
  trend: [{ day: "Mon", value: 12 }, { day: "Tue", value: 18 }, { day: "Wed", value: 33 }, { day: "Thu", value: 27 }, { day: "Fri", value: 41 }],
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

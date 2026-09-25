import type { SVGProps } from "react";

const paths: Record<string, string> = {
  grid: "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z",
  box: "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16zM3.3 7 12 12l8.7-5M12 22V12",
  search: "m21 21-4.34-4.34M19 10.5a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0Z",
  plus: "M12 5v14M5 12h14",
  chevron: "m9 18 6-6-6-6",
  down: "m6 9 6 6 6-6",
  logout: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m7 14 5-5-5-5m5 5H9",
  edit: "M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z",
  trash: "M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6m4 4v6m6-6v6",
  close: "M18 6 6 18M6 6l12 12",
  menu: "M4 6h16M4 12h16M4 18h16",
  home: "m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-6v-6h-4v6H4a1 1 0 0 1-1-1z",
  chart: "M3 3v18h18M18 17V9m-5 8V5m-5 12v-4",
  filter: "M4 7h16M7 12h10m-7 5h4",
  arrowLeft: "m15 18-6-6 6-6M9 12h12",
  arrowRight: "m9 18 6-6-6-6m6 6H3",
  check: "m5 12 4 4L19 6",
  dots: "M5 12h.01M12 12h.01M19 12h.01",
  package: "m12 3 9 5-9 5-9-5zm-9 5v9l9 5 9-5V8m-9 5v9",
  sparkles: "m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Zm7 11 .9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14Z",
  arrow: "M7 17 17 7M7 7h10v10",
  sliders: "M4 21v-7m0-4V3m8 18v-9m0-4V3m8 18v-5m0-4V3M2 14h4m4-6h4m4 8h4",
  clock: "M12 8v4l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  image: "M4 4h16v16H4zM8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm11.5 6-5-5L5 20",
};

export function Icon({ name, size = 18, ...props }: SVGProps<SVGSVGElement> & { name: keyof typeof paths; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d={paths[name]} /></svg>;
}

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const InteractiveChart = () => {
  const { weeklyChartData, formatDZD } = useApp();
  const [timeRange, setTimeRange] = useState('هذا الأسبوع');
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // SVG Dimensions
  const width = 600;
  const height = 240;
  const paddingX = 40;
  const paddingY = 30;

  const maxVal = 800000;

  // Chart data reversed for RTL display if needed, or structured from Saturday to Friday
  // In the mockup: Right is السبت, Left is الجمعة (RTL natural flow: Saturday -> Sunday -> Monday -> Tuesday -> Wednesday -> Thursday -> Friday)
  const data = weeklyChartData;

  const getY = (val) => {
    return height - paddingY - (val / maxVal) * (height - 2 * paddingY);
  };

  const getX = (index) => {
    const step = (width - 2 * paddingX) / (data.length - 1);
    // RTL layout: index 0 (السبت) is at the right, index 6 (الجمعة) is at the left
    return width - paddingX - index * step;
  };

  // Generate smooth SVG curve path for quoteAmount (dashed line with dots)
  const pointsQuote = data.map((d, i) => ({ x: getX(i), y: getY(d.quoteAmount) }));
  const pointsCollected = data.map((d, i) => ({ x: getX(i), y: getY(d.collectedAmount) }));

  // Helper to make smooth cubic bezier line
  const makeSmoothPath = (pts) => {
    if (pts.length === 0) return '';
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i];
      const p1 = pts[i + 1];
      const cp1x = p0.x + (p1.x - p0.x) / 2;
      const cp1y = p0.y;
      const cp2x = p0.x + (p1.x - p0.x) / 2;
      const cp2y = p1.y;
      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p1.x} ${p1.y}`;
    }
    return d;
  };

  const quotePath = makeSmoothPath(pointsQuote);
  const collectedPath = makeSmoothPath(pointsCollected);
  const collectedAreaPath = `${collectedPath} L ${pointsCollected[pointsCollected.length - 1].x} ${height - paddingY} L ${pointsCollected[0].x} ${height - paddingY} Z`;

  const yLabels = [
    { label: '800K', val: 800000 },
    { label: '600K', val: 600000 },
    { label: '400K', val: 400000 },
    { label: '200K', val: 200000 },
    { label: '0', val: 0 },
  ];

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-soft">
      {/* Header with Title and Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <h3 className="text-base font-extrabold text-slate-900">العروض والتحصيل</h3>
          <div className="relative">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="appearance-none bg-slate-100/90 text-slate-700 font-bold text-xs pl-7 pr-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-200/70 cursor-pointer outline-none focus:ring-2 focus:ring-brand-500/20"
            >
              <option value="هذا الأسبوع">هذا الأسبوع</option>
              <option value="هذا الشهر">هذا الشهر</option>
              <option value="هذا العام">هذا العام</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Legends */}
        <div className="flex items-center gap-5 text-xs font-bold text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-6 h-0.5 border-b-2 border-dashed border-blue-400 inline-block" />
            <span>قيمة العروض (دج)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-2.5 bg-brand-600 rounded-sm inline-block shadow-sm" />
            <span>المبالغ المحصلة (دج)</span>
          </div>
        </div>
      </div>

      {/* SVG Chart */}
      <div className="relative w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-56 sm:h-64 select-none overflow-visible"
        >
          <defs>
            <linearGradient id="blueGradientArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>

          {/* Grid lines and Y Labels */}
          {yLabels.map((item, idx) => {
            const y = getY(item.val);
            return (
              <g key={idx}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="#f1f5f9"
                  strokeWidth="1.2"
                />
                <text
                  x={paddingX - 10}
                  y={y + 4}
                  textAnchor="end"
                  fill="#94a3b8"
                  fontSize="10"
                  fontFamily="Cairo"
                  fontWeight="600"
                >
                  {item.label}
                </text>
              </g>
            );
          })}

          {/* Bars for Collected Amount */}
          {data.map((d, i) => {
            const x = getX(i);
            const y = getY(d.collectedAmount);
            const barWidth = 20;
            const isHovered = hoveredIndex === i;

            return (
              <g
                key={`bar-${i}`}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="cursor-pointer"
              >
                <rect
                  x={x - barWidth / 2}
                  y={y}
                  width={barWidth}
                  height={height - paddingY - y}
                  rx="4"
                  fill="url(#barGradient)"
                  opacity={isHovered ? "1" : "0.75"}
                  className="transition-all duration-200"
                />
              </g>
            );
          })}

          {/* Area Fill for Collected line */}
          <path d={collectedAreaPath} fill="url(#blueGradientArea)" />

          {/* Smooth Solid Blue Line for Collected */}
          <path
            d={collectedPath}
            fill="none"
            stroke="#2563eb"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Smooth Dashed Blue Line for Quotes */}
          <path
            d={quotePath}
            fill="none"
            stroke="#60a5fa"
            strokeWidth="2"
            strokeDasharray="4 4"
            strokeLinecap="round"
          />

          {/* Interactive Dots for Quotes and Collected */}
          {data.map((d, i) => {
            const x = getX(i);
            const yQuote = getY(d.quoteAmount);
            const yColl = getY(d.collectedAmount);
            const isHovered = hoveredIndex === i;

            return (
              <g
                key={`dot-${i}`}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="cursor-pointer"
              >
                {/* Quote dot */}
                <circle
                  cx={x}
                  cy={yQuote}
                  r={isHovered ? 5 : 3.5}
                  fill="#60a5fa"
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="transition-all"
                />
                
                {/* Collected dot */}
                <circle
                  cx={x}
                  cy={yColl}
                  r={isHovered ? 6 : 4}
                  fill="#1d4ed8"
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="transition-all"
                />

                {/* X Axis Day Label */}
                <text
                  x={x}
                  y={height - 8}
                  textAnchor="middle"
                  fill={isHovered ? "#0f172a" : "#64748b"}
                  fontSize="11"
                  fontFamily="Cairo"
                  fontWeight={isHovered ? "800" : "600"}
                >
                  {d.day}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Interactive Tooltip on hover */}
        {hoveredIndex !== null && (
          <div
            className="absolute top-2 bg-slate-900/95 text-white text-xs p-2.5 rounded-xl shadow-elevated border border-slate-700 pointer-events-none transition-all z-10"
            style={{
              right: `${((width - getX(hoveredIndex)) / width) * 100}%`,
              transform: 'translateX(50%)'
            }}
          >
            <p className="font-bold text-slate-300 mb-1 text-center">{data[hoveredIndex].day}</p>
            <div className="flex items-center justify-between gap-3 text-[11px] text-blue-300">
              <span>قيمة العروض:</span>
              <span className="font-bold text-white">{formatDZD(data[hoveredIndex].quoteAmount)}</span>
            </div>
            <div className="flex items-center justify-between gap-3 text-[11px] text-emerald-300 mt-0.5">
              <span>المحصلة:</span>
              <span className="font-bold text-white">{formatDZD(data[hoveredIndex].collectedAmount)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

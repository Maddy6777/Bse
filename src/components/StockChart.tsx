import React, { useState, useMemo } from 'react';
import { BarChart3, LineChart as LineIcon, CandlestickChart, Maximize2, RefreshCw } from 'lucide-react';

interface ChartDataPoint {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface StockChartProps {
  title: string;
  basePrice: number;
  isPositive?: boolean;
  timeframe?: string;
  onTimeframeChange?: (tf: string) => void;
  height?: number;
}

export const StockChart: React.FC<StockChartProps> = ({
  title,
  basePrice,
  isPositive = true,
  height = 360,
}) => {
  const [activeTf, setActiveTf] = useState<string>('1D');
  const [chartType, setChartType] = useState<'line' | 'area' | 'candle'>('area');
  const [hoveredPoint, setHoveredPoint] = useState<ChartDataPoint | null>(null);
  const [hoverX, setHoverX] = useState<number | null>(null);

  // Generate realistic intraday / historical chart data based on timeframe & base price
  const chartData = useMemo(() => {
    const pointsCount = activeTf === '1D' ? 40 : activeTf === '1W' ? 35 : activeTf === '1M' ? 30 : 45;
    const data: ChartDataPoint[] = [];
    let currentPrice = basePrice * (activeTf === '1D' ? 0.993 : activeTf === '1W' ? 0.975 : 0.94);
    
    const startTime = activeTf === '1D' ? 9 * 60 + 15 : 0; // 09:15 AM
    
    for (let i = 0; i < pointsCount; i++) {
      const stepPct = (Math.sin(i * 0.4) * 0.003) + (Math.random() - 0.46) * 0.005;
      const open = currentPrice;
      const change = currentPrice * stepPct;
      const close = i === pointsCount - 1 ? basePrice : currentPrice + change;
      const high = Math.max(open, close) + Math.abs(currentPrice * (Math.random() * 0.004));
      const low = Math.min(open, close) - Math.abs(currentPrice * (Math.random() * 0.004));
      const volume = Math.floor(25000 + Math.random() * 180000 + (i % 5 === 0 ? 150000 : 0));
      
      let timeLabel = '';
      if (activeTf === '1D') {
        const totalMinutes = startTime + Math.floor((i / pointsCount) * 375); // 375 mins = 6.25 hrs
        const h = Math.floor(totalMinutes / 60);
        const m = totalMinutes % 60;
        timeLabel = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
      } else if (activeTf === '1W') {
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
        timeLabel = `${days[Math.floor((i / pointsCount) * 5)] || 'Fri'} ${10 + (i % 5)}:00`;
      } else if (activeTf === '1M') {
        timeLabel = `${i + 1} Sep`;
      } else {
        timeLabel = `Month ${Math.floor(i / 4) + 1}`;
      }

      data.push({ time: timeLabel, open, high, low, close, volume });
      currentPrice = close;
    }
    return data;
  }, [basePrice, activeTf]);

  // Determine min and max for price scaling
  const { minPrice, maxPrice, maxVolume } = useMemo(() => {
    let min = Infinity;
    let max = -Infinity;
    let maxVol = 0;
    chartData.forEach(p => {
      if (p.low < min) min = p.low;
      if (p.high > max) max = p.high;
      if (p.volume > maxVol) maxVol = p.volume;
    });
    // add small padding
    const pad = (max - min) * 0.08 || 5;
    return { minPrice: min - pad, maxPrice: max + pad, maxVolume: maxVol };
  }, [chartData]);

  // Dimensions
  const svgWidth = 800;
  const svgHeight = height;
  const chartHeight = svgHeight * 0.72;
  const volumeHeight = svgHeight * 0.20;
  const volumeTop = chartHeight + 15;
  const paddingLeft = 10;
  const paddingRight = 75;

  const getX = (index: number) => {
    return paddingLeft + (index / (chartData.length - 1)) * (svgWidth - paddingLeft - paddingRight);
  };

  const getY = (price: number) => {
    return chartHeight - ((price - minPrice) / (maxPrice - minPrice)) * (chartHeight - 20) + 10;
  };

  const getVolY = (vol: number) => {
    const h = (vol / maxVolume) * (volumeHeight - 10);
    return volumeTop + volumeHeight - h;
  };

  // SVG Line path
  const linePath = useMemo(() => {
    if (chartData.length === 0) return '';
    return chartData.reduce((acc, curr, idx) => {
      const x = getX(idx);
      const y = getY(curr.close);
      return `${acc} ${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
    }, '');
  }, [chartData, minPrice, maxPrice]);

  // Area path
  const areaPath = useMemo(() => {
    if (chartData.length === 0) return '';
    const startX = getX(0);
    const endX = getX(chartData.length - 1);
    return `${linePath} L ${endX.toFixed(1)},${chartHeight} L ${startX.toFixed(1)},${chartHeight} Z`;
  }, [linePath, chartData, chartHeight]);

  const priceColor = isPositive ? '#16a34a' : '#dc2626';
  const priceColorLight = isPositive ? 'rgba(22, 163, 74, 0.12)' : 'rgba(220, 38, 38, 0.12)';

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, (clientX - paddingLeft) / (rect.width - paddingLeft - paddingRight)));
    const index = Math.round(ratio * (chartData.length - 1));
    if (chartData[index]) {
      setHoveredPoint(chartData[index]);
      setHoverX(getX(index));
    }
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
    setHoverX(null);
  };

  // Price ticks on Y axis
  const priceTicks = [
    maxPrice,
    maxPrice - (maxPrice - minPrice) * 0.25,
    maxPrice - (maxPrice - minPrice) * 0.5,
    maxPrice - (maxPrice - minPrice) * 0.75,
    minPrice,
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 flex flex-col justify-between">
      {/* Chart Top Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black font-mono-nums text-slate-900 tracking-tight">
                {hoveredPoint
                  ? hoveredPoint.close.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                  : basePrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className={`text-xs font-bold font-mono-nums ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                {isPositive ? '+0.59%' : '-0.44%'}
              </span>
            </div>
          </div>
          {hoveredPoint && (
            <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-slate-200 text-[11px] font-mono-nums text-slate-600">
              <span>Time: <strong className="text-slate-800">{hoveredPoint.time}</strong></span>
              <span>H: <strong className="text-slate-800">{hoveredPoint.high.toFixed(2)}</strong></span>
              <span>L: <strong className="text-slate-800">{hoveredPoint.low.toFixed(2)}</strong></span>
              <span>Vol: <strong className="text-slate-800">{hoveredPoint.volume.toLocaleString('en-IN')}</strong></span>
            </div>
          )}
        </div>

        {/* Timeframe & Chart Type Selectors */}
        <div className="flex items-center gap-2">
          {/* Chart Type Toggle */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setChartType('area')}
              className={`p-1.5 rounded text-xs transition-colors cursor-pointer ${
                chartType === 'area' ? 'bg-white text-[#002b5b] shadow-xs font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Area Chart"
            >
              <BarChart3 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setChartType('line')}
              className={`p-1.5 rounded text-xs transition-colors cursor-pointer ${
                chartType === 'line' ? 'bg-white text-[#002b5b] shadow-xs font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Line Chart"
            >
              <LineIcon className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setChartType('candle')}
              className={`p-1.5 rounded text-xs transition-colors cursor-pointer ${
                chartType === 'candle' ? 'bg-white text-[#002b5b] shadow-xs font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Candlestick Chart"
            >
              <CandlestickChart className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Timeframe buttons */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
            {['1D', '1W', '1M', '1Y', '5Y'].map(tf => (
              <button
                key={tf}
                onClick={() => setActiveTf(tf)}
                className={`px-2.5 py-1 rounded font-semibold transition-all cursor-pointer ${
                  activeTf === tf
                    ? 'bg-[#002b5b] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full overflow-hidden mt-2 select-none">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={priceColor} stopOpacity="0.28" />
              <stop offset="90%" stopColor={priceColor} stopOpacity="0.01" />
            </linearGradient>
          </defs>

          {/* Horizontal Grid lines & Price Labels */}
          {priceTicks.map((p, i) => {
            const y = getY(p);
            return (
              <g key={i}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={svgWidth - paddingRight}
                  y2={y}
                  stroke="#e2e8f0"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <text
                  x={svgWidth - paddingRight + 8}
                  y={y + 3}
                  fill="#64748b"
                  fontSize="10"
                  fontFamily="JetBrains Mono"
                  textAnchor="start"
                >
                  {p.toLocaleString('en-IN', { maximumFractionDigits: 1 })}
                </text>
              </g>
            );
          })}

          {/* Volume separator label */}
          <line
            x1={paddingLeft}
            y1={volumeTop - 5}
            x2={svgWidth - paddingRight}
            y2={volumeTop - 5}
            stroke="#cbd5e1"
            strokeWidth="1"
          />
          <text
            x={paddingLeft + 4}
            y={volumeTop + 8}
            fill="#94a3b8"
            fontSize="9"
            fontWeight="bold"
            fontFamily="JetBrains Mono"
          >
            VOL (SHARES)
          </text>

          {/* Volume bars */}
          {chartData.map((d, i) => {
            const x = getX(i);
            const y = getVolY(d.volume);
            const barH = volumeTop + volumeHeight - y;
            const isBarGreen = d.close >= d.open;
            return (
              <rect
                key={`vol-${i}`}
                x={x - 2.5}
                y={y}
                width={5}
                height={barH}
                fill={isBarGreen ? 'rgba(22, 163, 74, 0.45)' : 'rgba(220, 38, 38, 0.45)'}
              />
            );
          })}

          {/* Chart Rendering Mode */}
          {chartType === 'area' && (
            <>
              <path d={areaPath} fill="url(#areaGradient)" />
              <path d={linePath} fill="none" stroke={priceColor} strokeWidth="2.2" strokeLinejoin="round" />
            </>
          )}

          {chartType === 'line' && (
            <path d={linePath} fill="none" stroke={priceColor} strokeWidth="2.2" strokeLinejoin="round" />
          )}

          {chartType === 'candle' && (
            <g>
              {chartData.map((d, i) => {
                const x = getX(i);
                const openY = getY(d.open);
                const closeY = getY(d.close);
                const highY = getY(d.high);
                const lowY = getY(d.low);
                const isGreen = d.close >= d.open;
                const candleColor = isGreen ? '#16a34a' : '#dc2626';
                const bodyTop = Math.min(openY, closeY);
                const bodyHeight = Math.max(2, Math.abs(openY - closeY));

                return (
                  <g key={`candle-${i}`}>
                    {/* Wick */}
                    <line x1={x} y1={highY} x2={x} y2={lowY} stroke={candleColor} strokeWidth="1.2" />
                    {/* Real body */}
                    <rect
                      x={x - 3}
                      y={bodyTop}
                      width={6}
                      height={bodyHeight}
                      fill={candleColor}
                    />
                  </g>
                );
              })}
            </g>
          )}

          {/* Crosshair when hovered */}
          {hoverX !== null && hoveredPoint !== null && (
            <g>
              {/* Vertical line */}
              <line
                x1={hoverX}
                y1={10}
                x2={hoverX}
                y2={volumeTop + volumeHeight}
                stroke="#64748b"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              {/* Price dot on line */}
              <circle
                cx={hoverX}
                cy={getY(hoveredPoint.close)}
                r="4.5"
                fill="#002b5b"
                stroke="#ffffff"
                strokeWidth="2"
              />
              {/* Bottom Time Badge */}
              <rect
                x={hoverX - 25}
                y={svgHeight - 16}
                width={50}
                height={14}
                fill="#002b5b"
                rx="3"
              />
              <text
                x={hoverX}
                y={svgHeight - 5}
                fill="#ffffff"
                fontSize="9"
                fontWeight="bold"
                fontFamily="JetBrains Mono"
                textAnchor="middle"
              >
                {hoveredPoint.time}
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Footer Info / Market Breadcrumbs */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-500 font-mono-nums">
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Feed: Real-time BFX High-Speed Broadcast</span>
        </div>
        <div>
          <span>52W High: <strong className="text-slate-800">{(basePrice * 1.08).toFixed(2)}</strong></span>
          <span className="mx-1.5">·</span>
          <span>52W Low: <strong className="text-slate-800">{(basePrice * 0.78).toFixed(2)}</strong></span>
        </div>
      </div>
    </div>
  );
};

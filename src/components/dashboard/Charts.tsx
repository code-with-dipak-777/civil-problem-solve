"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useEffect, useState } from 'react';

export function IssueTypeDistribution() {
  const [donutData, setDonutData] = useState<{ name: string; value: number; color: string }[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/issues')
      .then(res => res.json())
      .then(data => {
        const issues = Array.isArray(data) ? data : data.data || [];
        const categoryMap: Record<string, number> = {};
        issues.forEach((issue: any) => {
          const cat = issue.category || 'Other';
          categoryMap[cat] = (categoryMap[cat] || 0) + 1;
        });
        const colorMap: Record<string, string> = {
          'Garbage': '#10b981',
          'Pothole': '#ef4444',
          'Streetlight': '#f97316',
          'Water': '#3b82f6',
          'Other': '#8b5cf6',
        };
        const chartData = Object.entries(categoryMap).map(([name, value]) => ({
          name,
          value,
          color: colorMap[name] || '#6b7280',
        }));
        setDonutData(chartData);
      })
      .catch(err => console.error(err));
  }, []);

  const total = donutData.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="glass-card rounded-3xl border border-white/5 overflow-hidden h-full flex flex-col">
      <div className="p-5 border-b border-white/5 bg-card/50">
        <h3 className="font-semibold text-white">Issue Type Distribution</h3>
      </div>

      <div className="p-4 flex-1 flex flex-col sm:flex-row items-center justify-center gap-6">
        {donutData.length === 0 ? (
          <p className="text-sm text-muted-foreground">No data available</p>
        ) : (
          <>
            <div className="h-40 w-40 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {donutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold text-white">{total}</span>
                <span className="text-[10px] text-muted-foreground uppercase">Total</span>
              </div>
            </div>

            <div className="space-y-3 w-full sm:w-auto">
              {donutData.map((item) => {
                const percentage = total > 0 ? ((item.value / total) * 100).toFixed(1) : '0';
                return (
                  <div key={item.name} className="flex items-center justify-between gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: item.color }} />
                      <span className="text-white/90 font-medium">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white">{item.value}</span>
                      <span className="text-muted-foreground text-xs w-10 text-right">({percentage}%)</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

import { geoMercator, geoPath } from 'd3-geo';
import jharkhandGeoJson from '@/data/jharkhand.json';

// Add human-readable aliases
const aliases: Record<string, string> = {
  'Purba Singhbhum': 'East Singhbhum',
  'Pashchim Singhbhum': 'West Singhbhum',
  'Hazaribag': 'Hazaribagh',
  'Saraikela Kharsawan': 'Seraikela Kharsawan'
};

export function TopDistrictsChart() {
  const [districtIssues, setDistrictIssues] = useState<Record<string, number>>({});

  useEffect(() => {
    fetch('http://localhost:5000/api/stats/district')
      .then(res => res.json())
      .then(data => {
        const stats = Array.isArray(data) ? data : data.data || [];
        const map: Record<string, number> = {};
        stats.forEach((d: any) => {
          // Map display names back to GeoJSON names for matching
          const geoName = Object.entries(aliases).find(([, v]) => v === d.district)?.[0] || d.district;
          map[geoName] = d.pending || 0;
          map[d.district] = d.pending || 0;
        });
        setDistrictIssues(map);
      })
      .catch(err => console.error(err));
  }, []);

  // Setup d3 geo projection
  const width = 500;
  const height = 500;
  
  // Create projection and fit it exactly to our GeoJSON data with extra bottom padding to shift map up
  const projection = geoMercator().fitExtent([[40, 20], [width - 40, height - 100]], jharkhandGeoJson as any);
  const pathGenerator = geoPath().projection(projection);

  return (
    <div className="glass-card rounded-3xl border border-white/5 overflow-hidden h-full flex flex-col relative">
      <div className="p-5 border-b border-white/5 bg-card/50 flex justify-between items-center z-10">
        <h3 className="font-semibold text-white">Issues by District (Jharkhand)</h3>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div><span className="text-white/80 font-medium">Open Issues</span></div>
          <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500"></div><span className="text-white/50">Clear</span></div>
        </div>
      </div>
      
      <div className="flex-1 relative bg-gradient-to-br from-[#03111F] to-[#0a2038] flex items-center justify-center p-2 sm:p-6 overflow-hidden min-h-[450px]">
        {/* Abstract Topo Grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        
        <div className="relative w-full max-w-[550px] aspect-square drop-shadow-2xl mt-[-20px]">
          <svg viewBox={`0 0 ${width} ${height}`} className="absolute inset-0 w-full h-full filter drop-shadow-[0_0_15px_rgba(16,185,129,0.15)] overflow-visible">
            {jharkhandGeoJson.features.map((feature, i) => {
              const districtName = feature.properties.NAME_2 || (feature.properties as any).district;
              const displayName = aliases[districtName] || districtName;
              const issues = districtIssues[districtName] || districtIssues[displayName] || 0;
              const hasIssues = issues > 0;
              
              // Calculate centroid for placing markers
              const centroid = pathGenerator.centroid(feature as any);
              const [cx, cy] = centroid;

              return (
                <g key={districtName} className="group transition-all duration-300">
                  {/* District Polygon */}
                  <path 
                    d={pathGenerator(feature as any) || ""} 
                    fill={hasIssues ? "rgba(239, 68, 68, 0.15)" : "rgba(16, 185, 129, 0.05)"} 
                    stroke={hasIssues ? "rgba(239, 68, 68, 0.4)" : "rgba(16, 185, 129, 0.3)"} 
                    strokeWidth="1.5" 
                    className={`transition-colors duration-300 cursor-pointer ${hasIssues ? 'hover:fill-red-500/20' : 'hover:fill-emerald-500/20'}`}
                  />
                  
                  {/* Ping Animation for issues */}
                  {hasIssues && (
                    <circle cx={cx} cy={cy} r="6" className="fill-red-500 opacity-50 animate-ping" />
                  )}
                  
                  {/* Marker Dot */}
                  <circle 
                    cx={cx} 
                    cy={cy} 
                    r={hasIssues ? "4" : "3"} 
                    className={`transition-all duration-300 cursor-pointer group-hover:r-[6] ${hasIssues ? 'fill-red-500 stroke-[#03111F] stroke-2' : 'fill-emerald-500/50 hover:fill-emerald-400'}`} 
                  />

                  {/* HTML Overlay for Tooltips and Labels (using foreignObject to render HTML) */}
                  <foreignObject x={cx - 75} y={cy - 60} width="150" height="120" className="pointer-events-none overflow-visible">
                    <div className="w-full h-full relative flex flex-col items-center justify-center">
                      
                      {/* Premium Tooltip */}
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#051726]/95 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] text-white px-3 py-2 rounded-xl backdrop-blur-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all group-hover:-translate-y-2 z-30">
                        <div className="font-bold text-sm">{displayName}</div>
                        <div className={`text-xs mt-1 font-medium ${hasIssues ? 'text-red-400' : 'text-emerald-400'}`}>
                          {hasIssues ? `${issues} Active Complaints` : 'No Active Complaints'}
                        </div>
                      </div>
                      
                      {/* Always-on Label */}
                      <span className={`absolute top-[65px] text-[8px] sm:text-[9px] font-semibold drop-shadow-[0_2px_2px_rgba(0,0,0,1)] px-1 rounded backdrop-blur-sm whitespace-nowrap transition-colors ${hasIssues ? 'text-white bg-black/60' : 'text-white/40 group-hover:text-white/80 group-hover:bg-black/40'}`}>
                        {displayName}
                      </span>
                      
                    </div>
                  </foreignObject>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}

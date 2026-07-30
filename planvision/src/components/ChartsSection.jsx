import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Legend,
    Cell
} from "recharts";
import { TrendingUp, Plane, Sparkles, Activity } from "lucide-react";

function ChartsSection({ theme }) {
    const areaData = [
        { name: "Jan", Admissoes: 4, Desligamentos: 1 },
        { name: "Fev", Admissoes: 6, Desligamentos: 2 },
        { name: "Mar", Admissoes: 8, Desligamentos: 1 },
        { name: "Abr", Admissoes: 5, Desligamentos: 3 },
        { name: "Mai", Admissoes: 10, Desligamentos: 2 },
        { name: "Jun", Admissoes: 12, Desligamentos: 3 }
    ];

    const barData = [
        { name: "Logística", Dias: 45 },
        { name: "Atendimento", Dias: 60 },
        { name: "Vendas", Dias: 30 },
        { name: "RH", Dias: 15 },
        { name: "TI", Dias: 25 },
        { name: "Operações", Dias: 80 }
    ];

    const isDark = theme === "dark";
    const gridColor = isDark ? "rgba(148, 163, 184, 0.12)" : "rgba(226, 232, 240, 0.8)";
    const labelColor = isDark ? "#94A3B8" : "#64748B";
    const tooltipBg = isDark ? "rgba(14, 15, 25, 0.95)" : "#FFFFFF";
    const tooltipBorder = isDark ? "rgba(139, 92, 246, 0.3)" : "#E2E8F0";
    const tooltipTextColor = isDark ? "#F8FAFC" : "#1F2937";
    const primaryColor = "#8B5CF6";
    const primaryGlow = "#A855F7";

    // Custom Glassmorphic Tooltip
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{
                    background: tooltipBg,
                    color: tooltipTextColor,
                    padding: "12px 16px",
                    borderRadius: "14px",
                    fontSize: "0.85rem",
                    backdropFilter: "blur(12px)",
                    boxShadow: isDark ? "0 12px 30px rgba(0,0,0,0.6)" : "0 10px 25px rgba(0,0,0,0.1)",
                    border: `1px solid ${tooltipBorder}`
                }}>
                    <p style={{ fontWeight: 700, marginBottom: "8px", color: isDark ? "#ffffff" : "#0f172a" }}>
                        {label}
                    </p>
                    {payload.map((pld, index) => (
                        <div key={index} style={{ display: "flex", alignItems: "center", gap: "8px", margin: "4px 0" }}>
                            <span style={{
                                width: "8px",
                                height: "8px",
                                borderRadius: "50%",
                                backgroundColor: pld.color || pld.fill
                            }} />
                            <span style={{ color: isDark ? "#94A3B8" : "#64748B" }}>{pld.name}:</span>
                            <strong style={{ color: isDark ? "#F8FAFC" : "#1F2937" }}>
                                {pld.value} {pld.name === "Dias" ? "dias" : "colaboradores"}
                            </strong>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <section className="charts-section">
            {/* CHART 1: EVOLUÇÃO OPERACIONAL */}
            <div className="chart-card">
                <div className="chart-header-container">
                    <div className="chart-header">
                        <div className="chart-icon-box purple">
                            <TrendingUp size={20} />
                        </div>
                        <div>
                            <h3>Evolução Operacional</h3>
                            <p className="chart-subtitle">Admissões vs Desligamentos acumulados</p>
                        </div>
                    </div>
                    <div className="chart-badge purple">
                        <Sparkles size={14} />
                        <span>+12 Admissões</span>
                    </div>
                </div>

                <div style={{ width: "100%", height: 290 }}>
                    <ResponsiveContainer>
                        <AreaChart
                            data={areaData}
                            margin={{ top: 15, right: 15, left: -20, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="colorAdmissoes" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={primaryColor} stopOpacity={0.45}/>
                                    <stop offset="95%" stopColor={primaryColor} stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorDesligamentos" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.45}/>
                                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                            <XAxis dataKey="name" stroke={labelColor} fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke={labelColor} fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip 
                                content={<CustomTooltip />} 
                                cursor={{ stroke: primaryGlow, strokeWidth: 1, strokeDasharray: "4 4" }} 
                            />
                            <Legend verticalAlign="top" height={36} iconType="circle" />
                            <Area
                                name="Admissões"
                                type="monotone"
                                dataKey="Admissoes"
                                stroke={primaryColor}
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorAdmissoes)"
                            />
                            <Area
                                name="Desligamentos"
                                type="monotone"
                                dataKey="Desligamentos"
                                stroke="#EF4444"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorDesligamentos)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* CHART 2: DISTRIBUIÇÃO DE FÉRIAS POR SETOR */}
            <div className="chart-card">
                <div className="chart-header-container">
                    <div className="chart-header">
                        <div className="chart-icon-box emerald">
                            <Plane size={20} />
                        </div>
                        <div>
                            <h3>Distribuição de Férias por Setor</h3>
                            <p className="chart-subtitle">Total de dias acumulados por departamento</p>
                        </div>
                    </div>
                    <div className="chart-badge emerald">
                        <Activity size={14} />
                        <span>255 Dias Totais</span>
                    </div>
                </div>

                <div style={{ width: "100%", height: 290 }}>
                    <ResponsiveContainer>
                        <BarChart
                            data={barData}
                            margin={{ top: 15, right: 15, left: -20, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="barGradientEmerald" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#10B981" />
                                    <stop offset="100%" stopColor="#059669" />
                                </linearGradient>
                                <linearGradient id="barGradientPurple" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#A855F7" />
                                    <stop offset="100%" stopColor="#7C3AED" />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                            <XAxis dataKey="name" stroke={labelColor} fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke={labelColor} fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip 
                                content={<CustomTooltip />} 
                                cursor={{ fill: isDark ? "rgba(139, 92, 246, 0.08)" : "rgba(0, 0, 0, 0.04)", radius: 10 }}
                            />
                            <Bar
                                name="Dias"
                                dataKey="Dias"
                                radius={[10, 10, 0, 0]}
                                maxBarSize={42}
                            >
                                {barData.map((entry, index) => (
                                    <Cell 
                                        key={`cell-${index}`} 
                                        fill={index === barData.length - 1 ? "url(#barGradientPurple)" : "url(#barGradientEmerald)"} 
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </section>
    );
}

export default ChartsSection;

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Menu from "../components/Menu";
import WelcomeBanner from "../components/WelcomeBanner";
import KPICard from "../components/KPICard";
import ModuleCard from "../components/ModuleCard";
import QuickActions from "../components/QuickActions";
import ActivityTable from "../components/ActivityTable";
import Footer from "../components/Footer";
import ChartsSection from "../components/ChartsSection";

// Subpages
import Admissions from "./Admissions";
import Vacations from "./Vacations";
import DaysOff from "./DaysOff";
import Movements from "./Movements";
import Resignations from "./Resignations";
import Planning from "./Planning";
import Reports from "./Reports";

import {
    UserPlus,
    Plane,
    CalendarDays,
    BriefcaseBusiness,
    UserRoundX,
    ArrowRightLeft,
    Percent,
    Activity
} from "lucide-react";

function Dashboard() {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [activeView, setActiveView] = useState("dashboard");
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "dark";
    });

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    };

    const renderActiveView = () => {
        switch (activeView) {
            case "admissions":
                return <Admissions />;
            case "vacations":
                return <Vacations />;
            case "days-off":
                return <DaysOff />;
            case "movements":
                return <Movements />;
            case "resignations":
                return <Resignations />;
            case "planning":
                return <Planning />;
            case "reports":
                return <Reports />;
            case "dashboard":
            default:
                return (
                    <>
                        <WelcomeBanner />

                        {/* KPIs */}

                        <section className="kpi-section">

                            <KPICard
                                title="Admissões"
                                value="12"
                                icon={<UserPlus />}
                                color="#2563EB"
                                onClick={() => setActiveView("admissions")}
                            />

                            <KPICard
                                title="Férias"
                                value="25"
                                icon={<Plane />}
                                color="#10B981"
                                onClick={() => setActiveView("vacations")}
                            />

                            <KPICard
                                title="Folgas"
                                value="18"
                                icon={<CalendarDays />}
                                color="#F59E0B"
                                onClick={() => setActiveView("days-off")}
                            />

                            <KPICard
                                title="Movimentações"
                                value="07"
                                icon={<ArrowRightLeft />}
                                color="#8B5CF6"
                                onClick={() => setActiveView("movements")}
                            />

                            <KPICard
                                title="Desligamentos"
                                value="03"
                                icon={<UserRoundX />}
                                color="#EF4444"
                                onClick={() => setActiveView("resignations")}
                            />

                            <KPICard
                                title="Absenteísmo"
                                value="1.8%"
                                icon={<Percent />}
                                color="#F97316"
                                onClick={() => setActiveView("reports")}
                            />

                            <KPICard
                                title="Eficiência"
                                value="94.2%"
                                icon={<Activity />}
                                color="#06B6D4"
                                onClick={() => setActiveView("planning")}
                            />

                        </section>

                        {/* Ações rápidas */}

                        <QuickActions onViewChange={setActiveView} />

                        {/* Gráficos Executivos */}

                        <ChartsSection theme={theme} />

                        {/* Módulos */}

                        <section className="modules-section">

                            <h2 className="section-title">

                                Módulos

                            </h2>

                            <div className="modules-grid">

                                <ModuleCard
                                    title="Admissões"
                                    description="Gerencie admissões de colaboradores."
                                    icon={<UserPlus />}
                                    onClick={() => setActiveView("admissions")}
                                />

                                <ModuleCard
                                    title="Férias"
                                    description="Controle de férias da operação."
                                    icon={<Plane />}
                                    onClick={() => setActiveView("vacations")}
                                />

                                <ModuleCard
                                    title="Folgas"
                                    description="Escalas e folgas."
                                    icon={<CalendarDays />}
                                    onClick={() => setActiveView("days-off")}
                                />

                                <ModuleCard
                                    title="Movimentações"
                                    description="Alterações operacionais."
                                    icon={<BriefcaseBusiness />}
                                    onClick={() => setActiveView("movements")}
                                />

                                <ModuleCard
                                    title="Desligamentos"
                                    description="Controle de desligamentos."
                                    icon={<UserRoundX />}
                                    onClick={() => setActiveView("resignations")}
                                />

                                <ModuleCard
                                    title="Transferências"
                                    description="Movimentação entre operações."
                                    icon={<ArrowRightLeft />}
                                    onClick={() => setActiveView("movements")}
                                />

                            </div>

                        </section>

                        {/* Tabela */}

                        <ActivityTable />
                    </>
                );
        }
    };

    return (

        <div className={`app ${theme}`}>

            <Menu 
                isCollapsed={sidebarCollapsed} 
                onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} 
                activeView={activeView}
                onChangeView={setActiveView}
            />

            <main className={`main-content ${sidebarCollapsed ? "collapsed" : ""}`}>

                <Header theme={theme} onToggleTheme={toggleTheme} />

                <div className="content">

                    {renderActiveView()}

                </div>

                <Footer />

            </main>

        </div>

    );

}

export default Dashboard;
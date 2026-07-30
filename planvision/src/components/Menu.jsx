import {
    LayoutDashboard,
    UserPlus,
    Plane,
    CalendarDays,
    BriefcaseBusiness,
    FileBarChart2,
    UserRoundX,
    ArrowRightLeft,
    ChevronLeft,
    ChevronRight
} from "lucide-react";

function Menu({ isCollapsed, onToggleCollapse, activeView, onChangeView }) {

    const handleNavClick = (view, e) => {
        e.preventDefault();
        if (onChangeView) {
            onChangeView(view);
        }
    };

    return (

        <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>

            <div>

                <div className="sidebar-header">
                    {!isCollapsed && (
                        <div className="sidebar-brand" style={{ cursor: 'pointer' }} onClick={(e) => handleNavClick("dashboard", e)}>
                            <svg className="sidebar-logo" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="3" y="3" width="8" height="8" rx="2" fill="#3B82F6"/>
                                <rect x="13" y="3" width="8" height="8" rx="2" fill="#8B5CF6"/>
                                <rect x="3" y="13" width="8" height="8" rx="2" fill="#10B981"/>
                                <rect x="13" y="13" width="8" height="8" rx="2" fill="#F59E0B"/>
                            </svg>
                            <h2>PlanVision</h2>
                        </div>
                    )}
                    {isCollapsed && (
                        <div className="sidebar-brand-collapsed" style={{ cursor: 'pointer' }} onClick={(e) => handleNavClick("dashboard", e)}>
                            <svg className="sidebar-logo" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="3" y="3" width="8" height="8" rx="2" fill="#3B82F6"/>
                                <rect x="13" y="3" width="8" height="8" rx="2" fill="#8B5CF6"/>
                                <rect x="3" y="13" width="8" height="8" rx="2" fill="#10B981"/>
                                <rect x="13" y="13" width="8" height="8" rx="2" fill="#F59E0B"/>
                            </svg>
                        </div>
                    )}
                    <button className="sidebar-toggle" onClick={onToggleCollapse}>
                        {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                    </button>
                </div>

                <nav>

                    <a 
                        href="#" 
                        className={activeView === "dashboard" ? "active" : ""}
                        onClick={(e) => handleNavClick("dashboard", e)}
                    >

                        <LayoutDashboard size={20} />

                        <span>Dashboard</span>

                    </a>

                    <a 
                        href="#" 
                        className={activeView === "admissions" ? "active" : ""}
                        onClick={(e) => handleNavClick("admissions", e)}
                    >

                        <UserPlus size={20} />

                        <span>Admissões</span>

                    </a>

                    <a 
                        href="#" 
                        className={activeView === "vacations" ? "active" : ""}
                        onClick={(e) => handleNavClick("vacations", e)}
                    >

                        <Plane size={20} />

                        <span>Férias</span>

                    </a>

                    <a 
                        href="#" 
                        className={activeView === "days-off" ? "active" : ""}
                        onClick={(e) => handleNavClick("days-off", e)}
                    >

                        <CalendarDays size={20} />

                        <span>Folgas</span>

                    </a>

                    <a 
                        href="#" 
                        className={activeView === "movements" ? "active" : ""}
                        onClick={(e) => handleNavClick("movements", e)}
                    >

                        <ArrowRightLeft size={20} />

                        <span>Movimentações</span>

                    </a>

                    <a 
                        href="#" 
                        className={activeView === "resignations" ? "active" : ""}
                        onClick={(e) => handleNavClick("resignations", e)}
                    >

                        <UserRoundX size={20} />

                        <span>Desligamentos</span>

                    </a>

                    <a 
                        href="#" 
                        className={activeView === "planning" ? "active" : ""}
                        onClick={(e) => handleNavClick("planning", e)}
                    >

                        <BriefcaseBusiness size={20} />

                        <span>Planejamento</span>

                    </a>

                    <a 
                        href="#" 
                        className={activeView === "reports" ? "active" : ""}
                        onClick={(e) => handleNavClick("reports", e)}
                    >

                        <FileBarChart2 size={20} />

                        <span>Relatórios</span>

                    </a>

                </nav>

            </div>

            <div className="sidebar-footer">

                <div className="user-card">

                    <div className="user-avatar">

                        R

                    </div>

                    <div className="user-info">

                        <strong>Renato</strong>

                        <span>Administrador</span>

                    </div>

                </div>

            </div>

        </aside>

    );

}

export default Menu;
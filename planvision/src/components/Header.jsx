import {
    Search,
    Bell,
    Settings,
    Sun,
    Moon
} from "lucide-react";

function Header({ theme, onToggleTheme }) {

    return (

        <header className="header">

            <div className="header-left">

                <h1>Dashboard</h1>

                <span>
                    Bem-vindo ao PlanVision
                </span>

            </div>

            <div className="header-right">

                <div className="search-box">

                    <Search size={18} />

                    <input
                        type="text"
                        placeholder="Pesquisar..."
                    />

                </div>

                <button className="header-icon" onClick={onToggleTheme} title={theme === "dark" ? "Modo Claro" : "Modo Escuro"}>

                    {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}

                </button>

                <button className="header-icon">

                    <Bell size={20} />

                </button>

                <button className="header-icon">

                    <Settings size={20} />

                </button>

                <div className="user-profile">

                    <div className="user-avatar">

                        R

                    </div>

                    <div className="user-details">

                        <strong>Renato</strong>

                        <span>Administrador</span>

                    </div>

                </div>

            </div>

        </header>

    );

}

export default Header;
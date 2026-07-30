import { CalendarDays, Sparkles, Activity } from "lucide-react";

function WelcomeBanner() {
    const data = new Date().toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric"
    });

    return (
        <section className="welcome-banner">
            {/* Background Glows */}
            <div className="banner-glow"></div>
            <div className="banner-grid-overlay"></div>
            
            {/* Left Info Content */}
            <div className="banner-content">
                <div className="banner-badge">
                    <Sparkles className="w-4 h-4 text-purple" />
                    <span>PAINEL PLANVISION</span>
                </div>

                <h2>
                    Olá, Renato 👋
                </h2>

                <p>
                    Acompanhe em tempo real os indicadores de <strong>admissões, férias, movimentações</strong> e toda a inteligência da sua operação.
                </p>

                <div className="banner-status-tag">
                    <Activity className="w-4 h-4 text-emerald" />
                    <span>Operação 100% Monitorada</span>
                </div>
            </div>

            {/* Right Date Card */}
            <div className="welcome-date">
                <div className="date-icon-circle">
                    <CalendarDays size={28} />
                </div>
                <span className="date-text">{data}</span>
            </div>
        </section>
    );
}

export default WelcomeBanner;
import {
    UserPlus,
    FilePlus2,
    Plane,
    CalendarPlus,
    ArrowRightLeft,
    FileBarChart2
} from "lucide-react";

function QuickActions({ onViewChange }) {

    const handleActionClick = (view) => {
        if (onViewChange) {
            onViewChange(view);
        }
    };

    return (

        <section className="quick-actions-section">

            <h2 className="section-title">

                Ações Rápidas

            </h2>

            <div className="quick-actions">

                <button onClick={() => handleActionClick("admissions")}>

                    <UserPlus size={20} />

                    Nova Admissão

                </button>

                <button onClick={() => handleActionClick("planning")}>

                    <FilePlus2 size={20} />

                    Nova Solicitação

                </button>

                <button onClick={() => handleActionClick("vacations")}>

                    <Plane size={20} />

                    Cadastro de Férias

                </button>

                <button onClick={() => handleActionClick("days-off")}>

                    <CalendarPlus size={20} />

                    Cadastro de Folgas

                </button>

                <button onClick={() => handleActionClick("movements")}>

                    <ArrowRightLeft size={20} />

                    Movimentações

                </button>

                <button onClick={() => handleActionClick("reports")}>

                    <FileBarChart2 size={20} />

                    Relatórios

                </button>

            </div>

        </section>

    );

}

export default QuickActions;
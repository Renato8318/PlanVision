import { useState } from "react";
import { Search, CalendarDays, Trash2, CheckCircle, X, Calendar } from "lucide-react";
import KPICard from "../components/KPICard";

function DaysOff() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("todos");
    const [showModal, setShowModal] = useState(false);

    // Initial Mock Data
    const [daysOff, setDaysOff] = useState([
        { id: 1, name: "Alan Kardec", dept: "Operações", date: "2026-07-25", type: "Escala Fim de Semana", status: "aprovado" },
        { id: 2, name: "Vanessa Neves", dept: "Tecnologia", date: "2026-07-29", type: "Banco de Horas", status: "aprovado" },
        { id: 3, name: "Daniela Soares", dept: "Operações", date: "2026-07-26", type: "Escala Fim de Semana", status: "pendente" },
        { id: 4, name: "Lucas Rocha", dept: "Operações", date: "2026-07-20", type: "Compensação Feriado", status: "concluido" },
        { id: 5, name: "Paula Dias", dept: "Recursos Humanos", date: "2026-07-27", type: "Férias/Pontes", status: "pendente" }
    ]);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        dept: "Operações",
        date: "",
        type: "Escala Fim de Semana",
        status: "pendente"
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddDayOff = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.date) return;

        const newDayOff = {
            id: Date.now(),
            ...formData
        };

        setDaysOff([newDayOff, ...daysOff]);
        setShowModal(false);
        setFormData({
            name: "",
            dept: "Operações",
            date: "",
            type: "Escala Fim de Semana",
            status: "pendente"
        });
    };

    const handleDelete = (id) => {
        if (window.confirm("Deseja realmente remover esta folga da escala?")) {
            setDaysOff(daysOff.filter(item => item.id !== id));
        }
    };

    const handleApprove = (id) => {
        setDaysOff(daysOff.map(item => {
            if (item.id === id) {
                return { ...item, status: item.status === "pendente" ? "aprovado" : "concluido" };
            }
            return item;
        }));
    };

    // Day of week formatter helper
    const getDayName = (dateStr) => {
        if (!dateStr) return "";
        const date = new Date(dateStr + 'T00:00:00');
        return date.toLocaleDateString('pt-BR', { weekday: 'long' })
            .replace(/^\w/, (c) => c.toUpperCase());
    };

    // Filter Logic
    const filteredDaysOff = daysOff.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              item.dept.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              item.type.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "todos" || item.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // KPI Counters
    const kpis = {
        total: daysOff.length,
        pending: daysOff.filter(i => i.status === "pendente").length,
        approved: daysOff.filter(i => i.status === "aprovado").length,
        completed: daysOff.filter(i => i.status === "concluido").length
    };

    return (
        <div className="fade-in">
            {/* Header */}
            <div className="subpage-header">
                <div className="subpage-title-area">
                    <div className="breadcrumb">
                        <span className="breadcrumb-link">Operação</span>
                        <span className="breadcrumb-separator">/</span>
                        <span>Folgas</span>
                    </div>
                    <h2>Escalas de Folgas</h2>
                    <p>Planeje e consulte as folgas regulamentares e compensações da semana.</p>
                </div>
                <button className="btn-primary" onClick={() => setShowModal(true)}>
                    <CalendarDays size={18} />
                    Escalar Folga
                </button>
            </div>

            {/* KPI Cards */}
            <section className="kpi-section">
                <KPICard title="Total Escala" value={kpis.total.toString()} icon={<CalendarDays />} color="#F59E0B" />
                <KPICard title="Solicitações Pendentes" value={kpis.pending.toString()} icon={<Calendar />} color="#EF4444" />
                <KPICard title="Aprovadas" value={kpis.approved.toString()} icon={<CheckCircle />} color="#10B981" />
                <KPICard title="Realizadas (Histórico)" value={kpis.completed.toString()} icon={<CheckCircle />} color="#6B7280" />
            </section>

            {/* Search and Filters */}
            <div className="controls-bar">
                <div className="search-input-wrapper">
                    <Search className="search-icon" size={18} />
                    <input 
                        type="text" 
                        placeholder="Buscar colaborador, setor ou justificativa..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="filter-tabs">
                    <button 
                        className={`filter-tab ${statusFilter === "todos" ? "active" : ""}`}
                        onClick={() => setStatusFilter("todos")}
                    >
                        Todos
                    </button>
                    <button 
                        className={`filter-tab ${statusFilter === "pendente" ? "active" : ""}`}
                        onClick={() => setStatusFilter("pendente")}
                    >
                        Pendente
                    </button>
                    <button 
                        className={`filter-tab ${statusFilter === "aprovado" ? "active" : ""}`}
                        onClick={() => setStatusFilter("aprovado")}
                    >
                        Aprovado
                    </button>
                    <button 
                        className={`filter-tab ${statusFilter === "concluido" ? "active" : ""}`}
                        onClick={() => setStatusFilter("concluido")}
                    >
                        Concluído
                    </button>
                </div>
            </div>

            {/* Table Listing */}
            <div className="activity-table">
                <table>
                    <thead>
                        <tr>
                            <th>Colaborador</th>
                            <th>Departamento</th>
                            <th>Data da Folga</th>
                            <th>Dia da Semana</th>
                            <th>Tipo de Folga</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDaysOff.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center" style={{ padding: '30px', color: 'var(--text-light)' }}>
                                    Nenhuma folga agendada.
                                </td>
                            </tr>
                        ) : (
                            filteredDaysOff.map((item) => (
                                <tr key={item.id}>
                                    <td style={{ fontWeight: 600 }}>{item.name}</td>
                                    <td>{item.dept}</td>
                                    <td>{new Date(item.date + 'T00:00:00').toLocaleDateString('pt-BR')}</td>
                                    <td>{getDayName(item.date)}</td>
                                    <td>{item.type}</td>
                                    <td>
                                        <span className={`status ${item.status}`}>
                                            {item.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="table-actions">
                                            {(item.status === "pendente" || item.status === "aprovado") && (
                                                <button 
                                                    className="action-btn btn-approve-action"
                                                    title={item.status === "aprovado" ? "Confirmar Folga Realizada" : "Aprovar Folga"}
                                                    onClick={() => handleApprove(item.id)}
                                                >
                                                    <CheckCircle size={16} />
                                                </button>
                                            )}
                                            <button 
                                                className="action-btn btn-delete-action"
                                                title="Remover Folga"
                                                onClick={() => handleDelete(item.id)}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Registration Modal Form */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <div className="modal-header">
                            <h3>Escalar Folga</h3>
                            <button className="modal-close-btn" onClick={() => setShowModal(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleAddDayOff}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="name">Colaborador</label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        name="name" 
                                        value={formData.name} 
                                        onChange={handleInputChange} 
                                        placeholder="Ex: Vanessa Neves" 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="dept">Departamento</label>
                                    <select id="dept" name="dept" value={formData.dept} onChange={handleInputChange}>
                                        <option value="Operações">Operações</option>
                                        <option value="Tecnologia">Tecnologia</option>
                                        <option value="Produto">Produto</option>
                                        <option value="Recursos Humanos">Recursos Humanos</option>
                                        <option value="Financeiro">Financeiro</option>
                                    </select>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="date">Data da Folga</label>
                                        <input 
                                            type="date" 
                                            id="date" 
                                            name="date" 
                                            value={formData.date} 
                                            onChange={handleInputChange} 
                                            required 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="type">Tipo de Folga</label>
                                        <select id="type" name="type" value={formData.type} onChange={handleInputChange}>
                                            <option value="Escala Fim de Semana">Escala Fim de Semana</option>
                                            <option value="Banco de Horas">Banco de Horas</option>
                                            <option value="Compensação Feriado">Compensação Feriado</option>
                                            <option value="Licença / Atestado">Licença / Atestado</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="status">Status</label>
                                    <select id="status" name="status" value={formData.status} onChange={handleInputChange}>
                                        <option value="pendente">Pendente (Aguardando Escala)</option>
                                        <option value="aprovado">Aprovado (Confirmado na Grade)</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn-outline" onClick={() => setShowModal(false)}>Cancelar</button>
                                <button type="submit" className="btn-primary">Registrar Folga</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DaysOff;

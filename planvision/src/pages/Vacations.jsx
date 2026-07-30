import { useState } from "react";
import { Search, Plane, Trash2, CheckCircle, X, Calendar } from "lucide-react";
import KPICard from "../components/KPICard";

function Vacations() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("todos");
    const [showModal, setShowModal] = useState(false);

    // Initial Mock Data
    const [vacations, setVacations] = useState([
        { id: 1, name: "Felipe Melo", dept: "Operações", start: "2026-08-01", end: "2026-08-30", days: 30, status: "aprovado" },
        { id: 2, name: "Juliana Costa", dept: "Tecnologia", start: "2026-08-10", end: "2026-08-24", days: 15, status: "analise" },
        { id: 3, name: "Bruno Alves", dept: "Financeiro", start: "2026-09-01", end: "2026-09-10", days: 10, status: "pendente" },
        { id: 4, name: "Patricia Lima", dept: "Produto", start: "2026-07-15", end: "2026-08-14", days: 30, status: "concluido" },
        { id: 5, name: "Carlos Henrique", dept: "Tecnologia", start: "2026-08-20", end: "2026-09-09", days: 20, status: "aprovado" }
    ]);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        dept: "Tecnologia",
        start: "",
        end: "",
        days: 30,
        status: "pendente"
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddVacation = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.start || !formData.end) return;

        // Calculate days between start and end
        const startDate = new Date(formData.start);
        const endDate = new Date(formData.end);
        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

        const newVacation = {
            id: Date.now(),
            ...formData,
            days: diffDays
        };

        setVacations([newVacation, ...vacations]);
        setShowModal(false);
        setFormData({
            name: "",
            dept: "Tecnologia",
            start: "",
            end: "",
            days: 30,
            status: "pendente"
        });
    };

    const handleDelete = (id) => {
        if (window.confirm("Deseja realmente cancelar este agendamento de férias?")) {
            setVacations(vacations.filter(item => item.id !== id));
        }
    };

    const handleApprove = (id) => {
        setVacations(vacations.map(item => {
            if (item.id === id) {
                return { ...item, status: item.status === "pendente" || item.status === "analise" ? "aprovado" : "concluido" };
            }
            return item;
        }));
    };

    // Filter Logic
    const filteredVacations = vacations.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              item.dept.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "todos" || item.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // KPI Counters
    const kpis = {
        active: vacations.filter(i => i.status === "aprovado").length,
        pending: vacations.filter(i => i.status === "pendente").length,
        review: vacations.filter(i => i.status === "analise").length,
        completed: vacations.filter(i => i.status === "concluido").length
    };

    return (
        <div className="fade-in">
            {/* Header */}
            <div className="subpage-header">
                <div className="subpage-title-area">
                    <div className="breadcrumb">
                        <span className="breadcrumb-link">Operação</span>
                        <span className="breadcrumb-separator">/</span>
                        <span>Férias</span>
                    </div>
                    <h2>Controle de Férias</h2>
                    <p>Monitore e gerencie os períodos de descanso e escalas de férias da equipe.</p>
                </div>
                <button className="btn-primary" onClick={() => setShowModal(true)}>
                    <Plane size={18} />
                    Agendar Férias
                </button>
            </div>

            {/* KPI Cards */}
            <section className="kpi-section">
                <KPICard title="Em Férias / Agendadas" value={kpis.active.toString()} icon={<Plane />} color="#10B981" />
                <KPICard title="Pendentes" value={kpis.pending.toString()} icon={<Calendar />} color="#F59E0B" />
                <KPICard title="Em Análise" value={kpis.review.toString()} icon={<Calendar />} color="#3B82F6" />
                <KPICard title="Concluídas" value={kpis.completed.toString()} icon={<CheckCircle />} color="#6B7280" />
            </section>

            {/* Search and Filters */}
            <div className="controls-bar">
                <div className="search-input-wrapper">
                    <Search className="search-icon" size={18} />
                    <input 
                        type="text" 
                        placeholder="Buscar por colaborador ou área..." 
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
                        className={`filter-tab ${statusFilter === "analise" ? "active" : ""}`}
                        onClick={() => setStatusFilter("analise")}
                    >
                        Em Análise
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
                            <th>Início</th>
                            <th>Fim</th>
                            <th>Dias Gozados</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredVacations.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center" style={{ padding: '30px', color: 'var(--text-light)' }}>
                                    Nenhum agendamento de férias encontrado.
                                </td>
                            </tr>
                        ) : (
                            filteredVacations.map((item) => (
                                <tr key={item.id}>
                                    <td style={{ fontWeight: 600 }}>{item.name}</td>
                                    <td>{item.dept}</td>
                                    <td>{new Date(item.start).toLocaleDateString('pt-BR')}</td>
                                    <td>{new Date(item.end).toLocaleDateString('pt-BR')}</td>
                                    <td style={{ fontWeight: 500 }}>{item.days} dias</td>
                                    <td>
                                        <span className={`status ${item.status}`}>
                                            {item.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="table-actions">
                                            {(item.status === "pendente" || item.status === "analise" || item.status === "aprovado") && (
                                                <button 
                                                    className="action-btn btn-approve-action"
                                                    title={item.status === "aprovado" ? "Mover para Concluído" : "Aprovar Férias"}
                                                    onClick={() => handleApprove(item.id)}
                                                >
                                                    <CheckCircle size={16} />
                                                </button>
                                            )}
                                            <button 
                                                className="action-btn btn-delete-action"
                                                title="Cancelar Férias"
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
                            <h3>Agendar Férias</h3>
                            <button className="modal-close-btn" onClick={() => setShowModal(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleAddVacation}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="name">Colaborador</label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        name="name" 
                                        value={formData.name} 
                                        onChange={handleInputChange} 
                                        placeholder="Ex: Carlos Silva" 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="dept">Departamento</label>
                                    <select id="dept" name="dept" value={formData.dept} onChange={handleInputChange}>
                                        <option value="Tecnologia">Tecnologia</option>
                                        <option value="Produto">Produto</option>
                                        <option value="Recursos Humanos">Recursos Humanos</option>
                                        <option value="Operações">Operações</option>
                                        <option value="Financeiro">Financeiro</option>
                                    </select>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="start">Data de Início</label>
                                        <input 
                                            type="date" 
                                            id="start" 
                                            name="start" 
                                            value={formData.start} 
                                            onChange={handleInputChange} 
                                            required 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="end">Data de Fim</label>
                                        <input 
                                            type="date" 
                                            id="end" 
                                            name="end" 
                                            value={formData.end} 
                                            onChange={handleInputChange} 
                                            required 
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="status">Status Inicial</label>
                                    <select id="status" name="status" value={formData.status} onChange={handleInputChange}>
                                        <option value="pendente">Pendente (Aguardando Aprovação)</option>
                                        <option value="analise">Em Análise (Validação RH)</option>
                                        <option value="aprovado">Aprovado / Agendado</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn-outline" onClick={() => setShowModal(false)}>Cancelar</button>
                                <button type="submit" className="btn-primary">Registrar Férias</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Vacations;

import { useState } from "react";
import { Search, UserPlus, Trash2, CheckCircle, X } from "lucide-react";
import KPICard from "../components/KPICard";

function Admissions() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("todos");
    const [showModal, setShowModal] = useState(false);

    // Initial Mock Data
    const [admissions, setAdmissions] = useState([
        { id: 1, name: "Gabriel Souza", role: "Desenvolvedor React", dept: "Tecnologia", manager: "Renato", date: "2026-08-01", status: "integração" },
        { id: 2, name: "Mariana Silva", role: "UX Designer", dept: "Produto", manager: "Ana Costa", date: "2026-08-05", status: "pendente" },
        { id: 3, name: "Rodrigo Santos", role: "Analista de RH", dept: "Recursos Humanos", manager: "Carlos Lima", date: "2026-08-10", status: "aprovado" },
        { id: 4, name: "Beatriz Oliveira", role: "Suporte Técnico", dept: "Operações", manager: "Patricia Souza", date: "2026-08-12", status: "analise" },
        { id: 5, name: "Luiza Santos", role: "Product Owner", dept: "Produto", manager: "Ana Costa", date: "2026-08-15", status: "pendente" }
    ]);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        dept: "Tecnologia",
        manager: "",
        date: "",
        status: "pendente"
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddAdmission = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.role || !formData.date || !formData.manager) return;

        const newAdmission = {
            id: Date.now(),
            ...formData
        };

        setAdmissions([newAdmission, ...admissions]);
        setShowModal(false);
        setFormData({
            name: "",
            role: "",
            dept: "Tecnologia",
            manager: "",
            date: "",
            status: "pendente"
        });
    };

    const handleDelete = (id) => {
        if (window.confirm("Deseja realmente cancelar este processo de admissão?")) {
            setAdmissions(admissions.filter(item => item.id !== id));
        }
    };

    const handleApprove = (id) => {
        setAdmissions(admissions.map(item => {
            if (item.id === id) {
                return { ...item, status: item.status === "pendente" || item.status === "analise" ? "aprovado" : "integração" };
            }
            return item;
        }));
    };

    // Filter Logic
    const filteredAdmissions = admissions.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              item.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              item.dept.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "todos" || item.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // KPI Counters
    const kpis = {
        total: admissions.length,
        pending: admissions.filter(i => i.status === "pendente").length,
        approved: admissions.filter(i => i.status === "aprovado").length,
        integration: admissions.filter(i => i.status === "integração").length
    };

    return (
        <div className="fade-in">
            {/* Header */}
            <div className="subpage-header">
                <div className="subpage-title-area">
                    <div className="breadcrumb">
                        <span className="breadcrumb-link">Gente & Gestão</span>
                        <span className="breadcrumb-separator">/</span>
                        <span>Admissões</span>
                    </div>
                    <h2>Processos de Admissão</h2>
                    <p>Acompanhe o onboarding, documentações e integrações de novos colaboradores.</p>
                </div>
                <button className="btn-primary" onClick={() => setShowModal(true)}>
                    <UserPlus size={18} />
                    Nova Admissão
                </button>
            </div>

            {/* KPI Cards specific to Admissions */}
            <section className="kpi-section">
                <KPICard title="Total em Fluxo" value={kpis.total.toString()} icon={<UserPlus />} color="#3B82F6" />
                <KPICard title="Pendentes" value={kpis.pending.toString()} icon={<UserPlus />} color="#F59E0B" />
                <KPICard title="Aprovadas" value={kpis.approved.toString()} icon={<CheckCircle />} color="#10B981" />
                <KPICard title="Em Integração" value={kpis.integration.toString()} icon={<UserPlus />} color="#8B5CF6" />
            </section>

            {/* Search and Filters */}
            <div className="controls-bar">
                <div className="search-input-wrapper">
                    <Search className="search-icon" size={18} />
                    <input 
                        type="text" 
                        placeholder="Buscar por colaborador, cargo ou área..." 
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
                        className={`filter-tab ${statusFilter === "integração" ? "active" : ""}`}
                        onClick={() => setStatusFilter("integração")}
                    >
                        Integração
                    </button>
                </div>
            </div>

            {/* Table Listing */}
            <div className="activity-table">
                <table>
                    <thead>
                        <tr>
                            <th>Colaborador</th>
                            <th>Cargo</th>
                            <th>Departamento</th>
                            <th>Gestor</th>
                            <th>Data de Início</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAdmissions.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center" style={{ padding: '30px', color: 'var(--text-light)' }}>
                                    Nenhuma admissão encontrada com os filtros aplicados.
                                </td>
                            </tr>
                        ) : (
                            filteredAdmissions.map((item) => (
                                <tr key={item.id}>
                                    <td style={{ fontWeight: 600 }}>{item.name}</td>
                                    <td>{item.role}</td>
                                    <td>{item.dept}</td>
                                    <td>{item.manager}</td>
                                    <td>{new Date(item.date).toLocaleDateString('pt-BR')}</td>
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
                                                    title={item.status === "aprovado" ? "Mover para Integração" : "Aprovar Admissão"}
                                                    onClick={() => handleApprove(item.id)}
                                                >
                                                    <CheckCircle size={16} />
                                                </button>
                                            )}
                                            <button 
                                                className="action-btn btn-delete-action"
                                                title="Cancelar Admissão"
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
                            <h3>Cadastrar Nova Admissão</h3>
                            <button className="modal-close-btn" onClick={() => setShowModal(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleAddAdmission}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="name">Nome Completo</label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        name="name" 
                                        value={formData.name} 
                                        onChange={handleInputChange} 
                                        placeholder="Ex: João da Silva" 
                                        required 
                                    />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="role">Cargo</label>
                                        <input 
                                            type="text" 
                                            id="role" 
                                            name="role" 
                                            value={formData.role} 
                                            onChange={handleInputChange} 
                                            placeholder="Ex: Scrum Master" 
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
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="manager">Gestor Responsável</label>
                                        <input 
                                            type="text" 
                                            id="manager" 
                                            name="manager" 
                                            value={formData.manager} 
                                            onChange={handleInputChange} 
                                            placeholder="Ex: Renato" 
                                            required 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="date">Data Prevista de Início</label>
                                        <input 
                                            type="date" 
                                            id="date" 
                                            name="date" 
                                            value={formData.date} 
                                            onChange={handleInputChange} 
                                            required 
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="status">Status Inicial</label>
                                    <select id="status" name="status" value={formData.status} onChange={handleInputChange}>
                                        <option value="pendente">Pendente (Aguardando Doc)</option>
                                        <option value="analise">Em Análise (Validação)</option>
                                        <option value="aprovado">Aprovado (Pronto para início)</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn-outline" onClick={() => setShowModal(false)}>Cancelar</button>
                                <button type="submit" className="btn-primary">Salvar Admissão</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Admissions;

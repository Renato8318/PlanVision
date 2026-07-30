import { useState } from "react";
import { Search, ArrowRightLeft, Trash2, CheckCircle, X, ChevronsUp } from "lucide-react";
import KPICard from "../components/KPICard";

function Movements() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("todos");
    const [showModal, setShowModal] = useState(false);

    // Initial Mock Data
    const [movements, setMovements] = useState([
        { id: 1, name: "Luciana Reis", dept: "Tecnologia", type: "Promoção", oldVal: "Dev Pleno", newVal: "Dev Sênior", date: "2026-08-01", status: "aprovado" },
        { id: 2, name: "Marcos Vinícius", dept: "Operações", type: "Transferência", oldVal: "Filial Sul", newVal: "Sede Centro", date: "2026-08-15", status: "analise" },
        { id: 3, name: "Amanda Dias", dept: "Produto", type: "Aumento Salarial", oldVal: "R$ 4.500", newVal: "R$ 5.200", date: "2026-08-01", status: "aprovado" },
        { id: 4, name: "Tiago Silva", dept: "Operações", type: "Promoção", oldVal: "Operador I", newVal: "Operador II", date: "2026-09-01", status: "pendente" },
        { id: 5, name: "Roberta Souza", dept: "Recursos Humanos", type: "Mudança de Cargo", oldVal: "Assistente RH", newVal: "Analista RH", date: "2026-08-10", status: "aprovado" }
    ]);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        dept: "Tecnologia",
        type: "Promoção",
        oldVal: "",
        newVal: "",
        date: "",
        status: "pendente"
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddMovement = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.oldVal || !formData.newVal || !formData.date) return;

        const newMovement = {
            id: Date.now(),
            ...formData
        };

        setMovements([newMovement, ...movements]);
        setShowModal(false);
        setFormData({
            name: "",
            dept: "Tecnologia",
            type: "Promoção",
            oldVal: "",
            newVal: "",
            date: "",
            status: "pendente"
        });
    };

    const handleDelete = (id) => {
        if (window.confirm("Deseja realmente excluir esta movimentação?")) {
            setMovements(movements.filter(item => item.id !== id));
        }
    };

    const handleApprove = (id) => {
        setMovements(movements.map(item => {
            if (item.id === id) {
                return { ...item, status: item.status === "pendente" || item.status === "analise" ? "aprovado" : "concluido" };
            }
            return item;
        }));
    };

    // Filter Logic
    const filteredMovements = movements.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              item.dept.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "todos" || item.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // KPI Counters
    const kpis = {
        total: movements.length,
        promotions: movements.filter(i => i.type === "Promoção").length,
        transfers: movements.filter(i => i.type === "Transferência").length,
        pending: movements.filter(i => i.status === "pendente").length
    };

    return (
        <div className="fade-in">
            {/* Header */}
            <div className="subpage-header">
                <div className="subpage-title-area">
                    <div className="breadcrumb">
                        <span className="breadcrumb-link">Gente & Gestão</span>
                        <span className="breadcrumb-separator">/</span>
                        <span>Movimentações</span>
                    </div>
                    <h2>Histórico & Registro de Movimentações</h2>
                    <p>Registre promoções, transferências e ajustes salariais de colaboradores.</p>
                </div>
                <button className="btn-primary" onClick={() => setShowModal(true)}>
                    <ArrowRightLeft size={18} />
                    Registrar Movimentação
                </button>
            </div>

            {/* KPI Cards */}
            <section className="kpi-section">
                <KPICard title="Total em Fluxo" value={kpis.total.toString()} icon={<ArrowRightLeft />} color="#8B5CF6" />
                <KPICard title="Promoções" value={kpis.promotions.toString()} icon={<ChevronsUp />} color="#10B981" />
                <KPICard title="Transferências" value={kpis.transfers.toString()} icon={<ArrowRightLeft />} color="#3B82F6" />
                <KPICard title="Pendentes" value={kpis.pending.toString()} icon={<ArrowRightLeft />} color="#F59E0B" />
            </section>

            {/* Search and Filters */}
            <div className="controls-bar">
                <div className="search-input-wrapper">
                    <Search className="search-icon" size={18} />
                    <input 
                        type="text" 
                        placeholder="Buscar por colaborador, setor ou tipo..." 
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
                </div>
            </div>

            {/* Table Listing */}
            <div className="activity-table">
                <table>
                    <thead>
                        <tr>
                            <th>Colaborador</th>
                            <th>Tipo</th>
                            <th>Departamento</th>
                            <th>De (Origem)</th>
                            <th>Para (Destino)</th>
                            <th>Efetivação</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMovements.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="text-center" style={{ padding: '30px', color: 'var(--text-light)' }}>
                                    Nenhuma movimentação registrada.
                                </td>
                            </tr>
                        ) : (
                            filteredMovements.map((item) => (
                                <tr key={item.id}>
                                    <td style={{ fontWeight: 600 }}>{item.name}</td>
                                    <td style={{ fontWeight: 500 }}>{item.type}</td>
                                    <td>{item.dept}</td>
                                    <td style={{ color: 'var(--text-light)' }}>{item.oldVal}</td>
                                    <td style={{ fontWeight: 500, color: 'var(--primary)' }}>{item.newVal}</td>
                                    <td>{new Date(item.date).toLocaleDateString('pt-BR')}</td>
                                    <td>
                                        <span className={`status ${item.status === 'aprovado' ? 'aprovado' : item.status === 'analise' ? 'analise' : 'pendente'}`}>
                                            {item.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="table-actions">
                                            {(item.status === "pendente" || item.status === "analise") && (
                                                <button 
                                                    className="action-btn btn-approve-action"
                                                    title="Aprovar Movimentação"
                                                    onClick={() => handleApprove(item.id)}
                                                >
                                                    <CheckCircle size={16} />
                                                </button>
                                            )}
                                            <button 
                                                className="action-btn btn-delete-action"
                                                title="Excluir Registro"
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
                            <h3>Registrar Movimentação</h3>
                            <button className="modal-close-btn" onClick={() => setShowModal(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleAddMovement}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="name">Colaborador</label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        name="name" 
                                        value={formData.name} 
                                        onChange={handleInputChange} 
                                        placeholder="Ex: Luciana Reis" 
                                        required 
                                    />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="type">Tipo de Movimentação</label>
                                        <select id="type" name="type" value={formData.type} onChange={handleInputChange}>
                                            <option value="Promoção">Promoção</option>
                                            <option value="Transferência">Transferência</option>
                                            <option value="Aumento Salarial">Aumento Salarial</option>
                                            <option value="Mudança de Cargo">Mudança de Cargo</option>
                                        </select>
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
                                        <label htmlFor="oldVal">De (Cargo/Filial/Salário Anterior)</label>
                                        <input 
                                            type="text" 
                                            id="oldVal" 
                                            name="oldVal" 
                                            value={formData.oldVal} 
                                            onChange={handleInputChange} 
                                            placeholder="Ex: Dev Pleno" 
                                            required 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="newVal">Para (Novo Cargo/Filial/Salário)</label>
                                        <input 
                                            type="text" 
                                            id="newVal" 
                                            name="newVal" 
                                            value={formData.newVal} 
                                            onChange={handleInputChange} 
                                            placeholder="Ex: Dev Sênior" 
                                            required 
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="date">Data de Efetivação</label>
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
                                        <label htmlFor="status">Status</label>
                                        <select id="status" name="status" value={formData.status} onChange={handleInputChange}>
                                            <option value="pendente">Pendente (Aguardando Aprovação)</option>
                                            <option value="analise">Em Análise (Aprov. Diretoria)</option>
                                            <option value="aprovado">Aprovado (Efetivado)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn-outline" onClick={() => setShowModal(false)}>Cancelar</button>
                                <button type="submit" className="btn-primary">Confirmar Movimentação</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Movements;

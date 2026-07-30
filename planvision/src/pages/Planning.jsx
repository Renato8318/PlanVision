import { useState } from "react";
import { Search, BriefcaseBusiness, Trash2, Plus, X, PlusCircle, MinusCircle } from "lucide-react";
import KPICard from "../components/KPICard";

function Planning() {
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);

    // Initial Mock Data
    const [planningList, setPlanningList] = useState([
        { id: 1, dept: "Tecnologia", targetHC: 45, currentHC: 42, budget: 93, color: "#3B82F6" },
        { id: 2, dept: "Produto", targetHC: 15, currentHC: 12, budget: 80, color: "#8B5CF6" },
        { id: 3, dept: "Operações", targetHC: 110, currentHC: 104, budget: 95, color: "#10B981" },
        { id: 4, dept: "Recursos Humanos", targetHC: 10, currentHC: 8, budget: 80, color: "#F59E0B" },
        { id: 5, dept: "Financeiro", targetHC: 6, currentHC: 6, budget: 100, color: "#EF4444" }
    ]);

    // Form State
    const [formData, setFormData] = useState({
        dept: "",
        targetHC: 10,
        currentHC: 5,
        budget: 50,
        color: "#3B82F6"
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: name === "dept" ? value : Number(value) });
    };

    const handleAddPlanning = (e) => {
        e.preventDefault();
        if (!formData.dept || formData.targetHC <= 0) return;

        // Auto assign colors
        const colors = ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B", "#EF4444", "#06B6D4", "#F97316"];
        const color = colors[planningList.length % colors.length];

        const newPlanning = {
            id: Date.now(),
            ...formData,
            color
        };

        setPlanningList([...planningList, newPlanning]);
        setShowModal(false);
        setFormData({
            dept: "",
            targetHC: 10,
            currentHC: 5,
            budget: 50,
            color: "#3B82F6"
        });
    };

    const handleDelete = (id) => {
        if (window.confirm("Deseja realmente remover esta meta de planejamento departamental?")) {
            setPlanningList(planningList.filter(item => item.id !== id));
        }
    };

    const adjustHeadcount = (id, field, amount) => {
        setPlanningList(planningList.map(item => {
            if (item.id === id) {
                const updatedVal = Math.max(0, item[field] + amount);
                return { 
                    ...item, 
                    [field]: updatedVal,
                    // keep budget aligned roughly
                    budget: field === 'currentHC' 
                        ? Math.min(120, Math.round((updatedVal / item.targetHC) * 100)) 
                        : item.budget
                };
            }
            return item;
        }));
    };

    // Filter Logic
    const filteredList = planningList.filter(item => {
        return item.dept.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // KPI Calculation
    const totalTarget = planningList.reduce((acc, curr) => acc + curr.targetHC, 0);
    const totalCurrent = planningList.reduce((acc, curr) => acc + curr.currentHC, 0);
    const openVacancies = Math.max(0, totalTarget - totalCurrent);
    const avgBudget = planningList.length > 0 
        ? Math.round(planningList.reduce((acc, curr) => acc + curr.budget, 0) / planningList.length) 
        : 0;

    return (
        <div className="fade-in">
            {/* Header */}
            <div className="subpage-header">
                <div className="subpage-title-area">
                    <div className="breadcrumb">
                        <span className="breadcrumb-link">Estratégia</span>
                        <span className="breadcrumb-separator">/</span>
                        <span>Planejamento</span>
                    </div>
                    <h2>Planejamento de Headcount (Capacity)</h2>
                    <p>Monitore a meta de quadro de funcionários (Target vs Actual) e orçamento alocado por departamento.</p>
                </div>
                <button className="btn-primary" onClick={() => setShowModal(true)}>
                    <Plus size={18} />
                    Novo Planejamento
                </button>
            </div>

            {/* KPI Cards */}
            <section className="kpi-section">
                <KPICard title="Headcount Planejado" value={totalTarget.toString()} icon={<BriefcaseBusiness />} color="#3B82F6" />
                <KPICard title="Headcount Atual" value={totalCurrent.toString()} icon={<BriefcaseBusiness />} color="#10B981" />
                <KPICard title="Vagas Abertas" value={openVacancies.toString()} icon={<PlusCircle />} color="#F59E0B" />
                <KPICard title="Orçamento Consumido" value={`${avgBudget}%`} icon={<BriefcaseBusiness />} color="#8B5CF6" />
            </section>

            {/* Search and Filters */}
            <div className="controls-bar">
                <div className="search-input-wrapper">
                    <Search className="search-icon" size={18} />
                    <input 
                        type="text" 
                        placeholder="Buscar por departamento..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* List of Planning Progress Cards */}
            <div className="planning-list">
                {filteredList.length === 0 ? (
                    <div className="planning-card text-center" style={{ padding: '40px', color: 'var(--text-light)' }}>
                        Nenhum planejamento departamental cadastrado.
                    </div>
                ) : (
                    filteredList.map((item) => {
                        const hcProgressPct = Math.min(100, Math.round((item.currentHC / item.targetHC) * 100));
                        return (
                            <div key={item.id} className="planning-card">
                                <div className="planning-card-header">
                                    <div className="planning-card-title">
                                        <span style={{ color: item.color, fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>DEPARTAMENTO</span>
                                        <h3>{item.dept}</h3>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--background)', padding: '6px 12px', borderRadius: '10px' }}>
                                            <span style={{ fontSize: '0.85rem' }}>Quadro:</span>
                                            <button onClick={() => adjustHeadcount(item.id, 'currentHC', -1)} style={{ background: 'transparent', color: 'var(--text-light)', display: 'flex' }}>
                                                <MinusCircle size={16} />
                                            </button>
                                            <strong style={{ fontSize: '0.9rem' }}>{item.currentHC}</strong>
                                            <button onClick={() => adjustHeadcount(item.id, 'currentHC', 1)} style={{ background: 'transparent', color: 'var(--text-light)', display: 'flex' }}>
                                                <PlusCircle size={16} />
                                            </button>
                                            <span style={{ color: 'var(--text-light)' }}>/</span>
                                            <button onClick={() => adjustHeadcount(item.id, 'targetHC', -1)} style={{ background: 'transparent', color: 'var(--text-light)', display: 'flex' }}>
                                                <MinusCircle size={16} />
                                            </button>
                                            <strong>{item.targetHC}</strong>
                                            <button onClick={() => adjustHeadcount(item.id, 'targetHC', 1)} style={{ background: 'transparent', color: 'var(--text-light)', display: 'flex' }}>
                                                <PlusCircle size={16} />
                                            </button>
                                        </div>
                                        <button 
                                            className="action-btn btn-delete-action"
                                            title="Excluir Planejamento"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>

                                <div className="planning-progress-info">
                                    <span>Preenchimento de Vagas</span>
                                    <strong>{hcProgressPct}% concluído</strong>
                                </div>
                                <div className="progress-bar-container">
                                    <div className="progress-bar-fill" style={{ width: `${hcProgressPct}%`, background: item.color }}></div>
                                </div>

                                <div className="planning-progress-info">
                                    <span>Orçamento Utilizado</span>
                                    <strong style={{ color: item.budget > 100 ? 'var(--danger)' : 'var(--text)' }}>
                                        {item.budget}% {item.budget > 100 ? "(Estourado)" : ""}
                                    </strong>
                                </div>
                                <div className="progress-bar-container">
                                    <div className="progress-bar-fill" style={{ width: `${Math.min(100, item.budget)}%`, background: item.budget > 100 ? 'var(--danger)' : 'var(--primary)' }}></div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Registration Modal Form */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <div className="modal-header">
                            <h3>Novo Planejamento</h3>
                            <button className="modal-close-btn" onClick={() => setShowModal(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleAddPlanning}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="dept">Nome do Departamento</label>
                                    <input 
                                        type="text" 
                                        id="dept" 
                                        name="dept" 
                                        value={formData.dept} 
                                        onChange={handleInputChange} 
                                        placeholder="Ex: Marketing" 
                                        required 
                                    />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="targetHC">Meta de Headcount (Target HC)</label>
                                        <input 
                                            type="number" 
                                            id="targetHC" 
                                            name="targetHC" 
                                            min="1"
                                            value={formData.targetHC} 
                                            onChange={handleInputChange} 
                                            required 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="currentHC">Headcount Atual (Actual HC)</label>
                                        <input 
                                            type="number" 
                                            id="currentHC" 
                                            name="currentHC" 
                                            min="0"
                                            value={formData.currentHC} 
                                            onChange={handleInputChange} 
                                            required 
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="budget">Consumo de Budget Inicial (%)</label>
                                    <input 
                                        type="number" 
                                        id="budget" 
                                        name="budget" 
                                        min="0"
                                        max="150"
                                        value={formData.budget} 
                                        onChange={handleInputChange} 
                                        required 
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn-outline" onClick={() => setShowModal(false)}>Cancelar</button>
                                <button type="submit" className="btn-primary">Criar Meta</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Planning;

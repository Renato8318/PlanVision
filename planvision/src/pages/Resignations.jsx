import { useState } from "react";
import { Search, UserRoundX, Trash2, CheckCircle, X, ClipboardList } from "lucide-react";
import KPICard from "../components/KPICard";

function Resignations() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("todos");
    const [showModal, setShowModal] = useState(false);
    const [selectedProcessId, setSelectedProcessId] = useState(1);

    // Initial Mock Data
    const [resignations, setResignations] = useState([
        { 
            id: 1, 
            name: "Ricardo Gomes", 
            dept: "Tecnologia", 
            type: "Pedido de Demissão", 
            date: "2026-07-31", 
            status: "pendente",
            tasks: [
                { id: 1, label: "Devolução de Equipamentos (Notebook/Acessórios)", completed: true },
                { id: 2, label: "Entrevista de Desligamento (Feedback)", completed: true },
                { id: 3, label: "Cálculo da Rescisão e Homologação", completed: false },
                { id: 4, label: "Revogação de Acessos (E-mail, VPN, Contas)", completed: false },
                { id: 5, label: "Baixa na CTPS (Carteira de Trabalho)", completed: false }
            ]
        },
        { 
            id: 2, 
            name: "Julio Nogueira", 
            dept: "Operações", 
            type: "Demissão sem Justa Causa", 
            date: "2026-07-28", 
            status: "concluido",
            tasks: [
                { id: 1, label: "Devolução de Equipamentos (Notebook/Acessórios)", completed: true },
                { id: 2, label: "Entrevista de Desligamento (Feedback)", completed: true },
                { id: 3, label: "Cálculo da Rescisão e Homologação", completed: true },
                { id: 4, label: "Revogação de Acessos (E-mail, VPN, Contas)", completed: true },
                { id: 5, label: "Baixa na CTPS (Carteira de Trabalho)", completed: true }
            ]
        },
        { 
            id: 3, 
            name: "Carla Pimentel", 
            dept: "Operações", 
            type: "Pedido de Demissão", 
            date: "2026-08-05", 
            status: "analise",
            tasks: [
                { id: 1, label: "Devolução de Equipamentos (Notebook/Acessórios)", completed: false },
                { id: 2, label: "Entrevista de Desligamento (Feedback)", completed: true },
                { id: 3, label: "Cálculo da Rescisão e Homologação", completed: false },
                { id: 4, label: "Revogação de Acessos (E-mail, VPN, Contas)", completed: false },
                { id: 5, label: "Baixa na CTPS (Carteira de Trabalho)", completed: false }
            ]
        }
    ]);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        dept: "Tecnologia",
        type: "Pedido de Demissão",
        date: "",
        status: "pendente"
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddResignation = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.date) return;

        const newResignation = {
            id: Date.now(),
            ...formData,
            tasks: [
                { id: 1, label: "Devolução de Equipamentos (Notebook/Acessórios)", completed: false },
                { id: 2, label: "Entrevista de Desligamento (Feedback)", completed: false },
                { id: 3, label: "Cálculo da Rescisão e Homologação", completed: false },
                { id: 4, label: "Revogação de Acessos (E-mail, VPN, Contas)", completed: false },
                { id: 5, label: "Baixa na CTPS (Carteira de Trabalho)", completed: false }
            ]
        };

        setResignations([newResignation, ...resignations]);
        setSelectedProcessId(newResignation.id);
        setShowModal(false);
        setFormData({
            name: "",
            dept: "Tecnologia",
            type: "Pedido de Demissão",
            date: "",
            status: "pendente"
        });
    };

    const handleDelete = (id) => {
        if (window.confirm("Deseja realmente excluir este processo de desligamento?")) {
            setResignations(resignations.filter(item => item.id !== id));
            if (selectedProcessId === id && resignations.length > 1) {
                const remaining = resignations.filter(item => item.id !== id);
                setSelectedProcessId(remaining[0].id);
            }
        }
    };

    const toggleTask = (processId, taskId) => {
        setResignations(resignations.map(proc => {
            if (proc.id === processId) {
                const updatedTasks = proc.tasks.map(task => {
                    if (task.id === taskId) {
                        return { ...task, completed: !task.completed };
                    }
                    return task;
                });
                
                // If all tasks are completed, set status to concluído
                const allCompleted = updatedTasks.every(t => t.completed);
                const status = allCompleted ? "concluido" : proc.status === "concluido" ? "pendente" : proc.status;

                return {
                    ...proc,
                    tasks: updatedTasks,
                    status
                };
            }
            return proc;
        }));
    };

    const handleCompleteAll = (id) => {
        setResignations(resignations.map(proc => {
            if (proc.id === id) {
                return {
                    ...proc,
                    status: "concluido",
                    tasks: proc.tasks.map(t => ({ ...t, completed: true }))
                };
            }
            return proc;
        }));
    };

    // Filter Logic
    const filteredResignations = resignations.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              item.dept.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "todos" || item.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // KPI Counters
    const kpis = {
        active: resignations.filter(i => i.status !== "concluido").length,
        resignations: resignations.filter(i => i.type === "Pedido de Demissão").length,
        dismissals: resignations.filter(i => i.type.includes("Demissão")).length,
        completed: resignations.filter(i => i.status === "concluido").length
    };

    // Get current selected item checklist
    const selectedProcess = resignations.find(p => p.id === selectedProcessId);

    return (
        <div className="fade-in">
            {/* Header */}
            <div className="subpage-header">
                <div className="subpage-title-area">
                    <div className="breadcrumb">
                        <span className="breadcrumb-link">Gente & Gestão</span>
                        <span className="breadcrumb-separator">/</span>
                        <span>Desligamentos</span>
                    </div>
                    <h2>Controle de Desligamentos (Offboarding)</h2>
                    <p>Gerencie o encerramento de contratos, devoluções de ativos e checklists rescisórios.</p>
                </div>
                <button className="btn-primary" onClick={() => setShowModal(true)}>
                    <UserRoundX size={18} />
                    Registrar Desligamento
                </button>
            </div>

            {/* KPI Cards */}
            <section className="kpi-section">
                <KPICard title="Processos Ativos" value={kpis.active.toString()} icon={<UserRoundX />} color="#EF4444" />
                <KPICard title="Pedidos de Demissão" value={kpis.resignations.toString()} icon={<ClipboardList />} color="#F59E0B" />
                <KPICard title="Demissões Iniciadas" value={kpis.dismissals.toString()} icon={<UserRoundX />} color="#3B82F6" />
                <KPICard title="Processos Concluídos" value={kpis.completed.toString()} icon={<CheckCircle />} color="#10B981" />
            </section>

            {/* Main content grid split (List left, checklist details right) */}
            <div className="charts-section" style={{ gridTemplateColumns: '1.4fr 1fr' }}>
                {/* List Table Card */}
                <div className="chart-card">
                    <div className="chart-header" style={{ justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <ClipboardList className="text-primary" />
                            <h3>Fluxo de Offboarding</h3>
                        </div>
                        <input 
                            type="text" 
                            placeholder="Pesquisar..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ 
                                padding: '6px 12px', 
                                border: '1px solid var(--border)', 
                                borderRadius: '8px', 
                                background: 'var(--background)',
                                color: 'var(--text)',
                                width: '160px',
                                fontSize: '0.8rem'
                            }}
                        />
                    </div>

                    <div className="activity-table" style={{ marginTop: '0', padding: '0', boxShadow: 'none', background: 'transparent' }}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Colaborador</th>
                                    <th>Tipo</th>
                                    <th>Progresso</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredResignations.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center" style={{ padding: '20px', color: 'var(--text-light)' }}>
                                            Nenhum processo em andamento.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredResignations.map((item) => {
                                        const completedTasks = item.tasks.filter(t => t.completed).length;
                                        const pct = Math.round((completedTasks / item.tasks.length) * 100);
                                        return (
                                            <tr 
                                                key={item.id} 
                                                onClick={() => setSelectedProcessId(item.id)}
                                                style={{ 
                                                    cursor: 'pointer',
                                                    background: selectedProcessId === item.id ? 'var(--surface-hover)' : ''
                                                }}
                                            >
                                                <td style={{ fontWeight: 600 }}>{item.name}</td>
                                                <td>{item.type}</td>
                                                <td>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <div style={{ width: '50px', background: 'var(--background)', height: '6px', borderRadius: '3px' }}>
                                                            <div style={{ width: `${pct}%`, background: 'var(--primary)', height: '100%', borderRadius: '3px' }}></div>
                                                        </div>
                                                        <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{completedTasks}/{item.tasks.length}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className={`status ${item.status === 'concluido' ? 'aprovado' : item.status === 'analise' ? 'analise' : 'pendente'}`}>
                                                        {item.status === 'concluido' ? 'CONCLUÍDO' : item.status === 'analise' ? 'EM ANÁLISE' : 'PENDENTE'}
                                                    </span>
                                                </td>
                                                <td>
                                                    <button 
                                                        className="action-btn btn-delete-action"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDelete(item.id);
                                                        }}
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Checklist Details Card */}
                <div className="chart-card">
                    {selectedProcess ? (
                        <>
                            <div className="chart-header" style={{ justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '15px' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>Checklist Rescisório</h3>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', margin: '0' }}>
                                        Acompanhamento de <strong>{selectedProcess.name}</strong> ({selectedProcess.dept})
                                    </p>
                                </div>
                                {selectedProcess.status !== "concluido" && (
                                    <button 
                                        className="btn-primary" 
                                        style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                                        onClick={() => handleCompleteAll(selectedProcess.id)}
                                    >
                                        Marcar Tudo
                                    </button>
                                )}
                            </div>

                            <div className="checklist-list">
                                {selectedProcess.tasks.map((task) => (
                                    <label 
                                        key={task.id} 
                                        className={`checklist-item ${task.completed ? "completed" : ""}`}
                                    >
                                        <input 
                                            type="checkbox" 
                                            checked={task.completed} 
                                            onChange={() => toggleTask(selectedProcess.id, task.id)}
                                        />
                                        <span>{task.label}</span>
                                    </label>
                                ))}
                            </div>

                            <div style={{ marginTop: '20px', padding: '12px', background: 'var(--background)', borderRadius: '10px', fontSize: '0.8rem', textAlign: 'left' }}>
                                <p style={{ color: 'var(--text)', marginBottom: '4px' }}>
                                    <strong>Tipo de Saída:</strong> {selectedProcess.type}
                                </p>
                                <p style={{ color: 'var(--text-light)', margin: '0' }}>
                                    <strong>Último dia previsto:</strong> {new Date(selectedProcess.date).toLocaleDateString('pt-BR')}
                                </p>
                            </div>
                        </>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-light)', padding: '40px' }}>
                            <ClipboardList size={40} style={{ marginBottom: '15px', opacity: 0.5 }} />
                            <p>Selecione um processo ao lado para ver o checklist.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Registration Modal Form */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <div className="modal-header">
                            <h3>Registrar Desligamento</h3>
                            <button className="modal-close-btn" onClick={() => setShowModal(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleAddResignation}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="name">Colaborador</label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        name="name" 
                                        value={formData.name} 
                                        onChange={handleInputChange} 
                                        placeholder="Ex: Ricardo Gomes" 
                                        required 
                                    />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="type">Tipo de Desligamento</label>
                                        <select id="type" name="type" value={formData.type} onChange={handleInputChange}>
                                            <option value="Pedido de Demissão">Pedido de Demissão</option>
                                            <option value="Demissão sem Justa Causa">Demissão sem Justa Causa</option>
                                            <option value="Demissão com Justa Causa">Demissão com Justa Causa</option>
                                            <option value="Término de Contrato Experiência">Término de Contrato</option>
                                            <option value="Rescisão por Acordo Comum">Acordo Comum</option>
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
                                        <label htmlFor="date">Data de Desligamento Prevista</label>
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
                                        <label htmlFor="status">Status Inicial</label>
                                        <select id="status" name="status" value={formData.status} onChange={handleInputChange}>
                                            <option value="pendente">Pendente (Iniciando)</option>
                                            <option value="analise">Em Análise (Aprov. Jurídica/RH)</option>
                                            <option value="concluido">Concluído</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn-outline" onClick={() => setShowModal(false)}>Cancelar</button>
                                <button type="submit" className="btn-primary">Criar Processo</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Resignations;

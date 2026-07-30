import { useState } from "react";
import { Search, FileText, Download, Play, RefreshCw, X, FileBarChart2 } from "lucide-react";
import KPICard from "../components/KPICard";

function Reports() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [progress, setProgress] = useState(0);

    // Initial Mock Data
    const [reports, setReports] = useState([
        { id: 1, title: "Relatório de Turnover - Q2 2026", desc: "Taxas de desligamento, motivos principais e custos rescisórios do trimestre.", format: "PDF", size: "2.4 MB", date: "2026-07-15" },
        { id: 2, title: "Planejamento Consolidado de Férias 2026", desc: "Grade geral e escalas de descanso de todas as equipes da operação.", format: "EXCEL", size: "1.1 MB", date: "2026-07-20" },
        { id: 3, title: "Fechamento Mensal de Headcount - Junho", desc: "Evolução do quadro de funcionários, contratações e gap de vagas.", format: "PDF", size: "1.8 MB", date: "2026-07-02" },
        { id: 4, title: "Análise de Absenteísmo & Folgas", desc: "Indicadores de faltas, atrasos, atestados e escala de folgas do mês anterior.", format: "PDF", size: "950 KB", date: "2026-07-10" }
    ]);

    // Generator parameters state
    const [genParams, setGenParams] = useState({
        type: "turnover",
        format: "PDF",
        range: "current-month"
    });

    const handleParamChange = (e) => {
        const { name, value } = e.target;
        setGenParams({ ...genParams, [name]: value });
    };

    const triggerGenerate = (e) => {
        e.preventDefault();
        setShowModal(false);
        setIsGenerating(true);
        setProgress(0);

        // Simulate progress bar loading
        let currentProg = 0;
        const interval = setInterval(() => {
            currentProg += 10;
            setProgress(currentProg);
            if (currentProg >= 100) {
                clearInterval(interval);
                
                // Add new generated report to list
                const titles = {
                    turnover: "Relatório Analítico de Turnover",
                    headcount: "Estudo de Capacity & Headcount",
                    vacations: "Escala e Saldo de Férias Operacional",
                    daysOff: "Relatório de Escalas de Folga Realizadas"
                };

                const rangeTexts = {
                    "current-month": "Mês Atual",
                    "last-month": "Mês Anterior",
                    "current-quarter": "Trimestre Atual"
                };

                const newReport = {
                    id: Date.now(),
                    title: `${titles[genParams.type]} - ${rangeTexts[genParams.range]}`,
                    desc: `Relatório gerado sob demanda contendo dados estatísticos de ${genParams.type}.`,
                    format: genParams.format,
                    size: genParams.format === "PDF" ? "1.5 MB" : "800 KB",
                    date: new Date().toISOString().split('T')[0]
                };

                setReports([newReport, ...reports]);
                setIsGenerating(false);
                alert("Relatório gerado com sucesso! Ele foi adicionado à lista para download.");
            }
        }, 200);
    };

    const handleDownload = (title) => {
        alert(`Iniciando download do arquivo: ${title}`);
    };

    // Filter Logic
    const filteredReports = reports.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              item.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              item.format.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
    });

    return (
        <div className="fade-in">
            {/* Header */}
            <div className="subpage-header">
                <div className="subpage-title-area">
                    <div className="breadcrumb">
                        <span className="breadcrumb-link">Estratégia</span>
                        <span className="breadcrumb-separator">/</span>
                        <span>Relatórios</span>
                    </div>
                    <h2>Relatórios Executivos & Exportações</h2>
                    <p>Acesse e exporte relatórios consolidados sobre headcount, absenteísmo, movimentações e desligamentos.</p>
                </div>
                <button 
                    className="btn-primary" 
                    onClick={() => setShowModal(true)}
                    disabled={isGenerating}
                >
                    {isGenerating ? <RefreshCw className="animate-spin" size={18} /> : <Play size={18} />}
                    {isGenerating ? "Gerando..." : "Gerar Relatório"}
                </button>
            </div>

            {/* KPI Cards */}
            <section className="kpi-section">
                <KPICard title="Total Exportados" value={reports.length.toString()} icon={<FileBarChart2 />} color="#3B82F6" />
                <KPICard title="Formatos PDF" value={reports.filter(r => r.format === 'PDF').length.toString()} icon={<FileText />} color="#EF4444" />
                <KPICard title="Formatos Excel" value={reports.filter(r => r.format === 'EXCEL').length.toString()} icon={<FileText />} color="#10B981" />
                <KPICard title="Acessos Recentes" value="28" icon={<Download />} color="#8B5CF6" />
            </section>

            {/* Progress Bar for simulation */}
            {isGenerating && (
                <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '20px', marginBottom: '25px', textAlign: 'left' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
                        <span>Gerando seu relatório sob demanda. Por favor, aguarde...</span>
                        <strong>{progress}%</strong>
                    </div>
                    <div className="progress-bar-container" style={{ marginBottom: '0' }}>
                        <div className="progress-bar-fill" style={{ width: `${progress}%`, background: 'var(--primary)' }}></div>
                    </div>
                </div>
            )}

            {/* Search and Filters */}
            <div className="controls-bar">
                <div className="search-input-wrapper">
                    <Search className="search-icon" size={18} />
                    <input 
                        type="text" 
                        placeholder="Buscar por nome do relatório ou descrição..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Reports Grid */}
            <div className="report-grid">
                {filteredReports.length === 0 ? (
                    <div className="planning-card text-center" style={{ gridColumn: '1 / -1', padding: '40px', color: 'var(--text-light)' }}>
                        Nenhum relatório encontrado com a busca digitada.
                    </div>
                ) : (
                    filteredReports.map((item) => (
                        <div key={item.id} className="report-card">
                            <div className="report-card-info">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                                    <FileText 
                                        size={24} 
                                        style={{ 
                                            color: item.format === "PDF" ? "var(--danger)" : "var(--success)" 
                                        }} 
                                    />
                                    <span 
                                        style={{ 
                                            fontSize: '0.7rem', 
                                            fontWeight: 700, 
                                            padding: '2px 6px', 
                                            background: 'var(--background)', 
                                            borderRadius: '4px',
                                            color: 'var(--text-light)'
                                        }}
                                    >
                                        {item.format}
                                    </span>
                                </div>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </div>
                            <div>
                                <div className="report-card-meta">
                                    <span>Tamanho: {item.size}</span>
                                    <span style={{ margin: '0 8px', opacity: 0.3 }}>|</span>
                                    <span>Criado em: {new Date(item.date + 'T00:00:00').toLocaleDateString('pt-BR')}</span>
                                </div>
                                <button 
                                    className="btn-outline" 
                                    style={{ width: '100%', justifyContent: 'center', padding: '8px' }}
                                    onClick={() => handleDownload(item.title)}
                                >
                                    <Download size={16} />
                                    Baixar Arquivo
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Generation Param Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <div className="modal-header">
                            <h3>Parâmetros de Geração do Relatório</h3>
                            <button className="modal-close-btn" onClick={() => setShowModal(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={triggerGenerate}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="type">Tipo de Relatório</label>
                                    <select id="type" name="type" value={genParams.type} onChange={handleParamChange}>
                                        <option value="turnover">Turnover e Custos Rescisórios</option>
                                        <option value="headcount">Capacity & Evolução de Headcount</option>
                                        <option value="vacations">Grade Consolidada de Férias</option>
                                        <option value="daysOff">Grade e Compensações de Folga</option>
                                    </select>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="format">Formato de Saída</label>
                                        <select id="format" name="format" value={genParams.format} onChange={handleParamChange}>
                                            <option value="PDF">Documento PDF (.pdf)</option>
                                            <option value="EXCEL">Planilha Excel (.xlsx)</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="range">Período de Referência</label>
                                        <select id="range" name="range" value={genParams.range} onChange={handleParamChange}>
                                            <option value="current-month">Mês Corrente</option>
                                            <option value="last-month">Mês Anterior</option>
                                            <option value="current-quarter">Q2 - Trimestre Corrente</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn-outline" onClick={() => setShowModal(false)}>Cancelar</button>
                                <button type="submit" className="btn-primary">
                                    <Play size={16} />
                                    Gerar Agora
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Reports;

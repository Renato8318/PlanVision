import React, { useState } from "react";
import { 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Sparkles,
  Activity,
  CheckCircle2,
  TrendingUp,
  Layers,
  ArrowRight,
  UserPlus,
  Plane,
  Clock,
  FileSpreadsheet,
  CalendarDays,
  ArrowRightLeft
} from "lucide-react";
import "./Login.css";

export default function Login({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="cyber-login-container">
      {/* HOLOGRAPHIC AURORA 3D BACKGROUND */}
      <div className="aurora-container">
        <div className="aurora-wave wave-1"></div>
        <div className="aurora-wave wave-2"></div>
        <div className="aurora-wave wave-3"></div>
      </div>

      {/* FLOATING LIGHT PARTICLES */}
      <div className="particles-container">
        <div className="particle p-1"></div>
        <div className="particle p-2"></div>
        <div className="particle p-3"></div>
        <div className="particle p-4"></div>
        <div className="particle p-5"></div>
        <div className="particle p-6"></div>
      </div>

      {/* FLOATING OPERATIONAL BACKGROUND BADGES */}
      <div className="bg-floating-elements">
        <div className="floating-badge badge-1">
          <UserPlus className="w-4 h-4 text-purple" />
          <span>+12 Admissões</span>
        </div>

        <div className="floating-badge badge-2">
          <Plane className="w-4 h-4 text-emerald" />
          <span>Escalas de Férias</span>
        </div>

        <div className="floating-badge badge-3">
          <Clock className="w-4 h-4 text-violet" />
          <span>Controle de Ponto</span>
        </div>

        <div className="floating-badge badge-4">
          <FileSpreadsheet className="w-4 h-4 text-cyan" />
          <span>Relatórios Power BI</span>
        </div>

        <div className="floating-badge badge-5">
          <ArrowRightLeft className="w-4 h-4 text-purple" />
          <span>Movimentações</span>
        </div>

        <div className="floating-badge badge-6">
          <CalendarDays className="w-4 h-4 text-amber" />
          <span>Gestão de Folgas</span>
        </div>
      </div>

      {/* MAIN CENTERED GLASS CONTAINER */}
      <main className="cyber-glass-card">
        {/* Top Accent Line */}
        <div className="card-top-bar"></div>

        <div className="glass-card-inner">
          {/* LEFT PANEL: LIVE OPERATION METRICS */}
          <div className="cyber-info-panel">
            <div className="brand-header">
              <div className="brand-icon-box">
                <Layers className="w-6 h-6" />
              </div>
              <span className="brand-title">PlanVision</span>
              <span className="live-status-pill">
                <span className="pulse-dot"></span>
                Operação Ativa
              </span>
            </div>

            <div className="info-main-content">
              <span className="cyber-tag font-mono">
                <Sparkles className="w-3.5 h-3.5 inline mr-1" />
                PLATAFORMA EXECUTIVA
              </span>
              
              <h1 className="info-heading">
                Inteligência & Controle <span>Operacional</span>
              </h1>

              <p className="info-subtext">
                Centralize indicadores de RH, férias, escalas e métricas de desempenho em um ambiente unificado e seguro.
              </p>

              {/* MINI WIDGETS GRID */}
              <div className="mini-widgets-grid">
                <div className="mini-widget">
                  <div className="widget-icon purple">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="widget-value">98.5%</span>
                    <span className="widget-label">SLA Monitorado</span>
                  </div>
                </div>

                <div className="mini-widget">
                  <div className="widget-icon emerald">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="widget-value">12</span>
                    <span className="widget-label">Admissões Mês</span>
                  </div>
                </div>

                <div className="mini-widget wide font-mono">
                  <div className="widget-icon violet">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div className="widget-flex-col">
                    <span className="widget-title-sm">Desempenho da Operação</span>
                    <div className="progress-bar-bg">
                      <div className="progress-bar-fill"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: ACCESS FORM */}
          <div className="cyber-form-panel">
            <div className="form-header">
              <h2>Acesse o Painel</h2>
              <p>Digite suas credenciais para continuar</p>
            </div>

            <form onSubmit={handleSubmit} className="cyber-form">
              <div className="input-group">
                <label>Usuário ou E-mail</label>
                <div className="field-container">
                  <User className="field-icon" />
                  <input
                    type="text"
                    placeholder="seu.usuario@planvision.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Senha</label>
                <div className="field-container">
                  <Lock className="field-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="eye-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Alternar senha"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button type="submit" className="cyber-submit-btn">
                <span>Entrar no Sistema</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="cyber-security-footer">
              <ShieldCheck className="w-4 h-4 text-purple" />
              <span>Conexão Criptografada SSL 256-bit</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

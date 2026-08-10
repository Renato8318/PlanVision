# 🚀 PlanVision - Painel Executivo & Dashboard Operacional

![PlanVision Banner](https://img.shields.io/badge/PlanVision-v1.0.0-8B5CF6?style=for-the-badge&logo=react&logoColor=white)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![CSS3](https://img.shields.io/badge/Design_System-Glassmorphism-A855F7?style=for-the-badge)

O **PlanVision** é uma plataforma moderna de gestão operacional e inteligência de negócios voltada para Recursos Humanos e operações corporativas. O sistema combina analytics visual avançado, controle de SLAs em tempo real e um design futurista em **Glassmorphic Dark/Light Mode**.

---

## ✨ Funcionalidades Principais

### 📊 Dashboard Executivo & Analytics
- **KPIs em Tempo Real**: Visualização imediata de Admissões, Férias, Folgas, Movimentações, Desligamentos, Absenteísmo e Taxa de Eficiência.
- **Gráficos Interativos**: Gráficos dinâmicos alimentados pela biblioteca Recharts para acompanhamento de tendências operacionais.
- **Banner de Boas-Vindas Dinâmico**: Saudação personalizada com data ao vivo e status da operação (`100% Monitorada`).

### 🛠️ Módulos de Gestão
- **👤 Admissões**: Controle completo de onboarding e cadastro de novos colaboradores.
- **🌴 Férias**: Agendamento, aprovações e balanço de férias operacionais.
- **📅 Folgas & Escalas**: Mapeamento de folgas e organização de turnos de trabalho.
- **🔄 Movimentações & Transferências**: Registro de alterações de cargos, promoções e setores.
- **🚪 Desligamentos**: Monitoramento de turnover e retenção de talentos.
- **📈 Relatórios & BI**: Indicadores consolidados e integração para relatórios gerenciais.

### 🎨 Experiência Visual & Design System
- **Login Cyber Glassmorphic 3D**: Tela de entrada centralizada com animações de **Névoa Holográfica Aurora 3D**, partículas de luz e mini-badges operacionais flutuantes.
- **Alternância de Tema (Dark / Light Mode)**: Suporte dinâmico entre o modo escuro (Obsidian & Roxo Neon) e o modo claro, com persistência automática no `localStorage`.
- **Layout Responsivo**: Totalmente adaptável para telas ultrawide, notebooks, tablets e smartphones.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Descrição |
| :--- | :--- |
| **React 19** | Biblioteca principal para construção da interface declarativa em componentes |
| **Vite 8** | Bundler e ambiente de desenvolvimento ultrarrápido com HMR |
| **Framer Motion** | Biblioteca para micro-interações e animações de entrada fluidas |
| **Lucide React & React Icons** | Conjunto de ícones vetoriais modernos |
| **Recharts** | Biblioteca de renderização de gráficos estatísticos interativos |
| **Date-fns** | Utilitário para manipulação e formatação de datas |
| **CSS3 Vanilla** | Variáveis CSS, Glassmorphism, animações `@keyframes` e suporte a temas |

---

## 📁 Estrutura do Projeto

```bash
planvision/
├── public/
├── src/
│   ├── assets/              # Assets estáticos e imagens
│   ├── components/          # Componentes reutilizáveis do Dashboard
│   │   ├── Header.jsx       # Cabeçalho com perfil, busca e seletor de temas
│   │   ├── Menu.jsx         # Sidebar de navegação principal
│   │   ├── WelcomeBanner.jsx# Hero section com status ao vivo
│   │   ├── KPICard.jsx      # Cards estatísticos com indicadores
│   │   ├── ModuleCard.jsx   # Cards para acesso aos módulos
│   │   ├── QuickActions.jsx # Botões de atalhos rápidos
│   │   ├── ActivityTable.jsx# Tabela de atividades recentes
│   │   ├── ChartsSection.jsx# Gráficos interativos (Recharts)
│   │   └── Footer.jsx       # Rodapé do aplicativo
│   ├── pages/               # Páginas e sub-visões da aplicação
│   │   ├── Dashboard.jsx    # Orquestrador do layout principal
│   │   ├── Login.jsx        # Tela de Login com Aurora 3D
│   │   ├── Admissions.jsx   # Módulo de Admissões
│   │   ├── Vacations.jsx    # Módulo de Férias
│   │   ├── DaysOff.jsx      # Módulo de Folgas
│   │   ├── Movements.jsx    # Módulo de Movimentações
│   │   ├── Resignations.jsx # Módulo de Desligamentos
│   │   ├── Planning.jsx     # Módulo de Planejamento
│   │   └── Reports.jsx      # Módulo de Relatórios BI
│   ├── styles/              # Arquivos CSS modulares
│   │   ├── globals.css      # Variáveis de tema e estilos globais
│   │   ├── header.css       # Estilos do cabeçalho
│   │   ├── menu.css         # Estilos do menu lateral
│   │   ├── cards.css        # Estilos dos KPIs e banners
│   │   ├── login.css        # Animações Aurora 3D e Glassmorphism
│   │   ├── table.css        # Estilos das tabelas
│   │   └── subpages.css     # Estilos das visões internas
│   ├── App.jsx              # Controle de autenticação e rotas
│   └── main.jsx             # Ponto de entrada da aplicação
├── package.json
└── README.md
```

---

## 🚦 Como Executar o Projeto

### Pré-requisitos
- **Node.js** (Versão 18.0 ou superior)
- **npm** ou **yarn**

### Passo a Passo

1. **Clonar o repositório**:
   ```bash
   git clone https://github.com/SeuUsuario/PlanVision-dashboard.git
   cd PlanVision-dashboard/planvision
   ```

2. **Instalar as dependências**:
   ```bash
   npm install
   ```

3. **Iniciar o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

4. **Acessar a aplicação**:
   Abra o seu navegador e acesse o endereço exibido no terminal:
   `http://localhost:5173`

---

## 👤 Autor

Renato Paiva Dev

Desenvolvido para **PlanVision** — Gestão inteligente e controle operacional em um só lugar.

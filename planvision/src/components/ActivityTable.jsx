function ActivityTable() {

    const data = [

        {
            colaborador: "João Silva",
            tipo: "Admissão",
            data: "15/06/2026",
            responsavel: "Renato Silva",
            status: "Aprovado"
        },

        {
            colaborador: "Maria Oliveira",
            tipo: "Férias",
            data: "20/06/2026",
            responsavel: "Ana Souza",
            status: "Em análise"
        },

        {
            colaborador: "Carlos Souza",
            tipo: "Movimentação",
            data: "28/06/2026",
            responsavel: "Marcos Lima",
            status: "Concluído"
        },

        {
            colaborador: "Fernanda Lima",
            tipo: "Folga",
            data: "30/06/2026",
            responsavel: "Renato Silva",
            status: "Pendente"
        }

    ];

    function statusClass(status) {

        switch (status) {

            case "Aprovado":
                return "status aprovado";

            case "Em análise":
                return "status analise";

            case "Concluído":
                return "status concluido";

            default:
                return "status pendente";

        }

    }

    return (

        <section className="activity-table">

            <h2>

                Últimas Solicitações

            </h2>

            <table>

                <thead>

                    <tr>

                        <th>Colaborador</th>

                        <th>Solicitação</th>

                        <th>Data</th>

                        <th>Responsável</th>

                        <th>Status</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        data.map((item, index) => (

                            <tr key={index}>

                                <td>

                                     {item.colaborador}

                                </td>

                                <td>

                                     {item.tipo}

                                </td>

                                <td>

                                     {item.data}

                                </td>

                                <td>

                                     {item.responsavel}

                                </td>

                                <td>

                                    <span className={statusClass(item.status)}>

                                        {item.status}

                                    </span>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </section>

    );

}

export default ActivityTable;
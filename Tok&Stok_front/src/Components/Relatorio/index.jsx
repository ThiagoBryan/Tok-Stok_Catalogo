import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import React from "react";
import api from "../../Service";
import Container from "@mui/material/Container";
import './styles.css'

const Relatorio = (props) => {


    const [produtos, setProdutos] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const getProdutos = async () => {

        if (props.filtroDeVideo === 'com-video') {
            const { data } = await api
                .get(`produtos/filtro/video=notnull?nome=${props.nome}&situacao=${props.situacao}&tendencia=${props.tendencia}&size=2001`)
            setProdutos(data);
            if (produtos) {
                setIsLoading(false);
            }
        }
        else if (props.filtroDeVideo === 'sem-video') {
            const { data } = await api
                .get(`produtos/filtro/video=null?nome=${props.nome}&situacao=${props.situacao}&tendencia=${props.tendencia}&size=2001`)
            setProdutos(data);
            if (produtos) {
                setIsLoading(false);
            }
        }
        else {
            const { data } = await api
                .get(`produtos/filtrar?nome=${props.nome}&situacao=${props.situacao}&tendencia=${props.tendencia}&size=2001`)
            setProdutos(data);
            if (produtos) {
                setIsLoading(false);
            }
        }
    }

    const handlePdf = async () => {
        setIsLoading(true)
        await getProdutos();

        if (produtos) {
            setTimeout(() => {
                const doc = new jsPDF('p', 'pt', 'a4');
                autoTable(doc, {
                    html: '#relatorio',
                    theme: 'grid',
                    pageBreak: 'always',
                    rowPageBreak: 'avoid',
                });

                doc.deletePage(1);

                doc.save(`Relátorio-${new Date().toLocaleDateString()}`);
            }, 1500);
        }
    }

    React.useEffect(() => {
        TableRelatorio();
    }, [props]);


    const TableRelatorio = () => {
        return (
            <Container style={{ alignItems: 'center', justifyContent: 'center' }}>
                <table id="relatorio">
                    <thead>
                        <tr>
                            <th>SKU</th>
                            <th>Produto</th>
                            <th>Situação</th>
                            <th>Tendência</th>
                            <th>Qtd.Vídeos</th>
                            <th>Nome Vídeo</th>
                        </tr>
                    </thead>
                    {produtos.content && produtos.content.map(prod => {
                        return (
                            <tbody key={prod.id}>
                                <tr>
                                    <td>{prod.id}</td>
                                    <td>{prod.nome}</td>
                                    <td>{prod.situacao.nome}</td>
                                    <td>{prod.tendencia.nome}</td>
                                    <td>{prod.quantidadeVideo}</td>
                                    <td>
                                        {prod.videos && prod.videos.map(vid => {
                                            return (
                                                <>
                                                    {prod.quantidadeVideo === 0 ? <span key={vid.id}>{`SEM VÍDEO`}</span> :
                                                        <>
                                                            <span key={vid.id}>{vid.nome}</span>
                                                            <br />
                                                            <span></span>
                                                            <br />
                                                        </>
                                                    }
                                                </>
                                            )
                                        })}
                                    </td>
                                </tr>
                            </tbody>
                        )
                    })}
                </table>
            </Container>
        )
    }

    return (
        <>
            {isLoading ?
                <>
                    <button className="exportar-btn-loading" onClick={handlePdf}>Exportar Relatório</button>
                    <TableRelatorio />
                </>
                :
                <>
                    <button className="exportar-btn" onClick={handlePdf}>Exportar Relatório</button>
                    <TableRelatorio />
                </>
            }

        </>
    )
}

export default Relatorio;
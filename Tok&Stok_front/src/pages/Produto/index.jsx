import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import TextoTitulo from "./../../Components/Titulo/index";
import "./Styled.jsx";
import { MyContainerSub } from "./Styled.jsx";
import { Button } from "@mui/material";
import Container from "@mui/material/Container";
import api from "../../Service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { FiEdit, FiSearch } from "react-icons/fi";
import { BiArrowBack } from "react-icons/bi";
import VLibras from "@djpfs/react-vlibras";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CircularProgress from "@mui/material/CircularProgress";
import "./style.css";
import Paper from "@mui/material/Paper";
import Relatorio from "../../Components/Relatorio";
import Swal from "sweetalert2";

const Produto = () => {
  const [nomeFiltrado, setNomeFiltrado] = useState("");
  const [filtroVideo, setFiltroVideo] = useState("TODOS");
  const [orderBy, setOrderBy] = useState("nome");
  const [size, setSize] = useState(10);
  const [sortDir, setSortDir] = useState("asc");
  const [produtos, setProdutos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [situacoes, setSituacoes] = useState([]);
  const [tendencias, setTendencias] = useState([]);

  const [situacaoFiltrada, setSituacaoFiltrada] = useState("");
  const [tendenciaFiltrada, setTendenciaFiltrada] = useState("");

  const [paginaAtual, setPaginaAtual] = useState(1);

  useEffect(() => {
    getTendencia();
    getSituacao();
    verificaFiltros();
  }, [
    paginaAtual,
    filtroVideo,
    orderBy,
    sortDir,
    size,
    nomeFiltrado,
    situacaoFiltrada,
    tendenciaFiltrada,
  ]);

  const handleFiltroSituacao = (e) => {
    if (e.currentTarget.value === "sem-filtro") {
      setSituacaoFiltrada("");
    } else {
      setSituacaoFiltrada(e.currentTarget.value);
    }
  };

  const handleFiltroTendencia = (e) => {
    if (e.currentTarget.value === "sem-filtro") {
      setTendenciaFiltrada("");
    } else {
      setTendenciaFiltrada(e.currentTarget.value);
    }
  };

  const handleOrdernacao = (e) => {
    if (e.currentTarget.value === "nome-desc") {
      setSortDir("desc");
      setOrderBy("nome");
    } else if (e.currentTarget.value === "nome") {
      setSortDir("asc");
      setOrderBy("nome");
    } else if (e.currentTarget.value === "id") {
      setSortDir("asc");
      setOrderBy("id");
    }
  };

  const verificaFiltros = async () => {
    if (filtroVideo === "TODOS") {
      filtrarProdutosPorNome();
    } else if (filtroVideo === "com-video") {
      getProdutoComVideo();
    } else if (filtroVideo === "sem-video") {
      getProdutoSemVideo();
    }
  };

  const getTendencia = async () => {
    const { data } = await api.get(`/tendencias/listar`);
    setTendencias(data);
  };

  const getSituacao = async () => {
    const { data } = await api.get(`/situacoes/listar`);
    setSituacoes(data);
  };

  const getProdutoSemVideo = async () => {
    setIsLoading(true);
    const { data } = await api.get(
      `produtos/filtro/video=null?nome=${nomeFiltrado}&situacao=${situacaoFiltrada}&tendencia=${tendenciaFiltrada}&page=${paginaAtual}&sort=${orderBy},${sortDir}&size=${size}`
    );
    setProdutos(data);
    if (produtos !== undefined) {
      setIsLoading(false);
      setPaginaAtual(1);
    }
  };

  const getProdutoComVideo = async () => {
    setIsLoading(true);
    const { data } = await api.get(
      `produtos/filtro/video=notnull?nome=${nomeFiltrado}&situacao=${situacaoFiltrada}&tendencia=${tendenciaFiltrada}&page=${paginaAtual}&sort=${orderBy},${sortDir}&size=${size}`
    );
    setProdutos(data);
    if (produtos !== undefined) {
      setIsLoading(false);
      setPaginaAtual(1);
    }
  };

  const filtrarProdutosPorNome = async () => {
    setIsLoading(true);
    const { data } = await api.get(
      `produtos/filtrar?nome=${nomeFiltrado}&situacao=${situacaoFiltrada}&tendencia=${tendenciaFiltrada}&page=${paginaAtual}&sort=${orderBy},${sortDir}&size=${size}`
    );
    setProdutos(data);
    if (produtos !== undefined) {
      setIsLoading(false);
    }
  };

  const handleChangePesquisa = (e) => {
    if (e.target.value.length !== 0) {
      setNomeFiltrado(e.target.value.toLowerCase());
      setPaginaAtual(1);
      setIsLoading(true);
    } else {
      setPaginaAtual(1);
      setIsLoading(true);
      setNomeFiltrado('');
    }
  };

  const AlertRelatorio = () => {
    return Swal.fire({
      icon: 'error',
      title: 'Ocorreu um erro ao gerar um relatório!',
      text: 'Verifique se os filtros estão retornando algum produto',
      color: 'black',
      fontWeight: "bold",
      confirmButtonColor: '#0A775A'
    });
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#064F3C",
      color: theme.palette.common.white,
      fontSize: 24,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 24,
    },
  }));


  return (
    <>
      <Container maxWidth="none" style={{ paddingTop: "30px", minHeight: '100vh' }}>
        <VLibras forceOnload={true}/>
        <TextoTitulo />
        <Button
          style={{
            fontSize: "24px",
            color: "#0A775A",
            fontWeight: "bold",
            float: 'right'
          }}
        >
          <BiArrowBack />
          VOLTAR
        </Button>
        <MyContainerSub>
          <div
            className="wrap"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div style={{ flexDirection: "row", display: "flex" }}>
              <div
                className="filtros"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <FilterAltIcon />
                {/* FILTRO POR EXISTENCIA DE VIDEOS */}
                <label for="wrap">filtros</label>
                <select
                  className="comSemVideo"
                  onChange={(e) => setFiltroVideo(e.currentTarget.value)}
                >
                  <option value="TODOS">Todos</option>
                  <option value="com-video">Com vídeo</option>
                  <option value="sem-video" on>
                    Sem vídeo
                  </option>
                </select>
                {/* FILTRO DE ORDENAÇÃO */}
                <select className="ordenacao" onChange={handleOrdernacao}>
                  <option value="nome">Nome A-Z</option>
                  <option value="nome-desc">Nome Z-A</option>
                  <option value="id" on>
                    SKU
                  </option>
                </select>
                {/* FILTRO TAMANHO DA PÁGINA */}
                <select
                  className="qtdPagina"
                  onChange={(e) => {setSize(e.currentTarget.value); setPaginaAtual(1)}}
                >
                  <option value={10}>10 por página</option>
                  <option value={20}>20 por página</option>
                  <option value={50}>50 por página</option>
                </select>
                {/* FILTRAR POR SITUACAO */}
                <select onChange={handleFiltroSituacao}>
                  <option value="sem-filtro">Situação</option>
                  {situacoes &&
                    situacoes.map((situ) => {
                      return <option key={situ.id} value={situ.nome}>{situ.nome}</option>;
                    })}
                </select>
                {/* FILTRAR POR TENDENCIA */}
                <select onChange={handleFiltroTendencia}>
                  <option value="sem-filtro">Tendências</option>
                  {tendencias &&
                    tendencias.map((tend) => {
                      return <option key={tend.id} value={tend.nome}>{tend.nome}</option>;
                    })}
                </select>
              </div>
            </div>
            <div className="search">
              <input
                type="text"
                className="searchTerm"
                placeholder="Busque por um produto"
                onChange={e => handleChangePesquisa(e)}
              />
              <button type="submit" className="searchButton">
                <FiSearch />
              </button>
              <div>
                {produtos.content && produtos.content.length < 1 ?
                  <button className="exportar-btn" onClick={AlertRelatorio}>Exportar Relatório</button>
                  :
                  <Relatorio
                    filtroDeVideo={filtroVideo}
                    tendencia={tendenciaFiltrada}
                    situacao={situacaoFiltrada}
                    nome={nomeFiltrado}
                    order={orderBy}
                    sortDir={sortDir}
                  />
                }
              </div>
            </div>
          </div>
        </MyContainerSub>
        <TableContainer
          component={Paper}
          style={{ backgroundColor: "transparent" }}
        >
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell
                  style={{
                    borderTopLeftRadius: "6px",
                    borderBottomLeftRadius: "6px",
                  }}
                />
                <StyledTableCell>
                  <strong>SKU</strong>
                </StyledTableCell>
                <StyledTableCell>
                  <strong>Nome do produto </strong>
                </StyledTableCell>
                <StyledTableCell>
                  <strong>Qtd. vídeos </strong>
                </StyledTableCell>
                <StyledTableCell>
                  <strong>Situações</strong>
                </StyledTableCell>
                <StyledTableCell
                  style={{
                    borderTopRightRadius: "6px",
                    borderBottomRightRadius: "6px",
                  }}
                >
                  <strong>Tendência </strong>
                </StyledTableCell>
              </TableRow>
            </TableHead>
            {isLoading === true ? (
              <CircularProgress
                style={{ margin: 100, marginLeft: '46vw', marginRight: '-46vw' }}
                color="success"
              />
            ) : produtos.content && produtos.content.length < 1 ? <h1>Nenhum produto foi encontrado</h1> : (
              produtos.content &&
              produtos.content.map((produto) => {
                return (
                  <TableBody key={produto.id}>
                    <TableRow sx={{':hover':{backgroundColor: 'rgba(151, 211, 163, 0.35);'}}}>
                      <StyledTableCell>
                        <Link
                          to="/EditarProduto"
                          state={{ id: produto.id }}
                          style={{
                            padding: "5px",
                            textDecoration: "none",
                            color: "#0A775A",
                            fontSize: "24px",
                          }}
                        >
                          <FiEdit />
                        </Link>
                      </StyledTableCell>
                      <StyledTableCell sx={{borderLeft: '1px solid rgba(208, 208, 208, 0.5)',}}>
                        {produto.id}
                        </StyledTableCell>
                      <StyledTableCell sx={{borderLeft: '1px solid rgba(208, 208, 208, 0.5)',}}>{produto.nome}</StyledTableCell>
                      <StyledTableCell sx={{borderLeft: '1px solid rgba(208, 208, 208, 0.5)',}}>
                        {produto.quantidadeVideo}
                      </StyledTableCell >
                      <StyledTableCell sx={{borderLeft: '1px solid rgba(208, 208, 208, 0.5)',}}>{produto.situacao.nome}</StyledTableCell>
                      <StyledTableCell sx={{borderLeft: '1px solid rgba(208, 208, 208, 0.5)',}}>
                        {produto.tendencia.nome}
                      </StyledTableCell>
                    </TableRow>
                  </TableBody>
                );
              })
            )}
          </Table>
        </TableContainer>
        <Pagination
          style={{ display: "flex", justifyContent: "center", marginTop: "1%" }}
          className="paginas"
          color="primary"
          onChange={(event, value) => setPaginaAtual(value)}
          count={produtos && produtos.totalPages}
          defaultPage={1}
          renderItem={(item) => (
            <PaginationItem
              style={{ fontSize: "24px" }}
              components={{
                previous: ArrowBackIcon,
                next: ArrowForwardIcon,
              }}
              {...item}
            />
          )}
        />
      </Container>
    </>
  );
};

export default Produto;

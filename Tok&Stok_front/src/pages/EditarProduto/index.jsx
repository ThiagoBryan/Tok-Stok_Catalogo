import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TextoTitulo from "./../../Components/Titulo/index";
import "./Styled.jsx";
import "./styles.css";
import { BoxInfoProduto } from "./Styled.jsx";
import { Button } from "@mui/material";
import VLibras from "@djpfs/react-vlibras";
import { BiArrowBack, BiVideoPlus } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { FiUpload, FiTrash2 } from "react-icons/fi";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ButtonBase from "@mui/material/ButtonBase";
import api from "../../Service";
import ModalDescricao from "../../Components/ModalDescricao";
import ModalExcluir from "../../Components/ModalExcluir";
import ModalCancelar from "../../Components/ModalCancelar";
import ModalSalvar from "../../Components/ModalSalvar";
import { FileUploader } from "react-drag-drop-files";
import CircularProgress from "@mui/material/CircularProgress";
import ModalVoltar from "../../Components/ModalVoltar";
import Swal from "sweetalert2";

const EditarProduto = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [produto, setProduto] = useState({});
  const [video, setVideo] = useState([]);
  const { id } = location.state;
  const [videosNovos, setVideosNovos] = useState([]);
  const [videosParaExcluir, setVideosParaExcluir] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSalvo, setIsSalvo] = useState(true);
  const [isTypeErro, setIsTypeErro] = useState(false);
  const [isAdicionando, setIsAdicionando] = useState(false);

  const fileTypes = ["MP4", "AVI", "MWV", "MOV", "QT", "AVCHD", "FLV", "SWF"];

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setIsAdicionando(false);
    setOpen(false);
    setVideo([]);
    setIsTypeErro(false);
  };

  const getProduto = async () => {
    const { data } = await api.get(`produtos/${id}`);
    setProduto(data);
    if (produto !== undefined) {
      setIsLoading(false);
    }
  };

  const deleteVideoArray = (id) => {
    setIsSalvo(false);
    setVideosParaExcluir([
      ...videosParaExcluir,
      produto.videos
        .filter((vid) => vid.id === id)
        .map((vid) => {
          return vid.id;
        }),
    ]);
    var indexArr = produto.videos
      .map((vid) => {
        return vid.id;
      })
      .indexOf(id);

    if (videosNovos.length > 0) {
      var indexArrVideosNovos = videosNovos
        .map((vidNovos) => {
          return vidNovos;
        })
        .indexOf(id);
      videosNovos.splice(indexArrVideosNovos, 1);
    }

    produto.videos.splice(indexArr, 1);
  };

  const deleteVideo = async (id) => {
    await api.delete(`videos/deletar/${id}`);
  };

  const atualizarPosicao = async (id, pos) => {
    setIsLoading(true);

    setIsSalvo(false);

    let videoEscolhido = produto.videos.filter((vid) => {
      return vid.id === id;
    });

    let posVideoEscolhido = videoEscolhido.map((vidEscolhido) => {
      return vidEscolhido.posicao;
    });

    let posicaoEscolhida = parseInt(pos);

    let indexPosicao = produto.videos
      .map((vid) => {
        return vid.posicao;
      })
      .indexOf(posicaoEscolhida);

    if (indexPosicao !== -1) {
      setIsLoading(true);
      let idVideoPosicaoExistente = produto.videos[indexPosicao].id;

      await api.put(
        `videos/atualizar/posicao/${idVideoPosicaoExistente}?posicao=${posVideoEscolhido}`
      );
      setIsLoading(false);
      window.location.reload(true);
    }
    await api.put(`videos/atualizar/posicao/${id}?posicao=${posicaoEscolhida}`);
    setIsLoading(false);
    window.location.reload(true);
  };

  const handleFile = (file) => {
    setVideo(file);
  };

  const handleSubmit = async (e) => {
    setIsAdicionando(true);
    setIsSalvo(false);
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", video);
    const response = await api.post(`videos/salvar?idProduto=${id}`, formData);
    setVideosNovos([...videosNovos, response.data]);
    setVideo([]);
    handleClose();
    if(video.length < 1){
      setIsAdicionando(false);
    }
    return Swal.fire({
      icon: "success",
      title: "Vídeo adicionado com sucesso!",
      text: "          ",
      color: "black",
      fontWeight: "bold",
      confirmButtonColor: "#0A775A",
    });
  };

  const handleCancelar = () => {
    videosNovos.map((vidNovos) => deleteVideo(vidNovos));
  };

  const handleSalvar = async () => {
    setIsSalvo(true);
    if (videosParaExcluir.length > 0) {
      videosParaExcluir.map((vids) => deleteVideo(vids));
    }
  };

  const ViewHandler = (props) => {
    if (props.file.length !== 0) {
      return (
        <div>
          Video Escolhido: {props.file.name}
          <br />
          Tamanho: {(props.file.size / 1048576).toFixed(2) + "MB"}
        </div>
      );
    } else if (isTypeErro === true) {
      return (
        <>
          <div>Arquivo em formato inválido!!!</div>
        </>
      );
    } else {
      return (
        <div style={{ cursor: "pointer", padding: "55px" }}>
          Arraste ou Clique Aqui!
        </div>
      );
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    setTimeout(() => {
      if (JSON.stringify(produto) === "{}" || videosNovos.length > 0) {
        getProduto();
      }
    }, 1000);
  }, [isLoading, produto, ModalDescricao, atualizarPosicao, videosNovos]);

  return (
    <>
      <Container
        maxWidth="none"
        style={{ paddingTop: "30px", minHeight: "100vh", overflow: "auto" }}
      >
        <VLibras forceOnload={true} />
        <div>
          <TextoTitulo />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <BoxInfoProduto>
            <div style={{ fontWeight: "bold" }}>Produto selecionado</div>
            {produto.nome}
            <div style={{ fontSize: "14px" }}>{produto.id}</div>
          </BoxInfoProduto>
          {isSalvo ? (
            <Button
              style={{
                fontSize: "24px",
                color: "#0A775A",
                fontWeight: "bold",
              }}
              onClick={() => navigate("/")}
            >
              <BiArrowBack />
              VOLTAR
            </Button>
          ) : (
            <ModalVoltar cancelar={handleCancelar} />
          )}
        </div>
        <Paper
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            p: 2,
            marginTop: 5,
            marginBottom: 5,
            maxWidth: 350,
            flexGrow: 1,
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "#1A2027" : "#f4f4f4",
          }}
        >
          <BiVideoPlus />
          <div>Carregar mais videos</div>
          <Button
            onClick={handleOpen}
            sx={{
              textDecoration: "none",
              ":hover": { backgroundColor: "#97D3A3" },
            }}
          >
            <IoMdAdd style={{ fontSize: "24px", color: "#0A775A" }} />
          </Button>
        </Paper>
        <div className="box">
          {isLoading ? (
            <CircularProgress style={{ margin: 100 }} color="success" />
          ) : produto.videos.length < 1 ? (
            <h1>Sem vídeos</h1>
          ) : (
            produto.videos.map((video) => {
              return (
                <>
                  <Paper
                    key={video.id}
                    sx={{
                      p: 2,
                      marginBottom: 5,
                      maxWidth: 500,
                      flexGrow: 1,
                      backgroundColor: (theme) =>
                        theme.palette.mode === "dark" ? "#1A2027" : "#f4f4f4",
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item>
                        <ButtonBase sx={{ width: 128, height: 128 }}>
                          <video
                            key={video.url}
                            alt="complex"
                            height="200"
                            width="300"
                            style={{
                              display: "block",
                              maxWidth: "100%",
                              maxHeight: "100%",
                            }}
                            controls
                          >
                            <source src={video.url} />
                          </video>
                        </ButtonBase>
                      </Grid>
                      <Grid item xs={12} sm container>
                        <div style={{ flexDirection: "column" }}>
                          <Typography
                            gutterBottom
                            variant="subtitle1"
                            component="div"
                          >
                            {video.nome}
                          </Typography>
                          <div>
                            Escolha uma opção
                            <select
                              key={video.posicao}
                              className="posicaoVideo"
                              onChange={(e) =>
                                atualizarPosicao(
                                  video.id,
                                  e.currentTarget.value
                                )
                              }
                            >
                              <option selected hidden>
                                Posiçao {video.posicao}
                              </option>
                              <option value="1">Posição 1</option>
                              <option value="2">Posição 2</option>
                              <option value="3">Posição 3</option>
                            </select>
                          </div>
                        </div>
                        <Grid item>
                          <Typography variant="body2">
                            <ModalExcluir
                              nomeVideo={video.nome}
                              excluir={() => deleteVideoArray(video.id)}
                            />
                            <ModalDescricao
                              id={video.id}
                              desc={video.descricao}
                              nome={video.nome}
                              url={video.url}
                            />
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                </>
              );
            })
          )}
        </div>
        <div className="botaoSalvarCancelar">
          <ModalSalvar salvar={handleSalvar} />
          <ModalCancelar cancelar={handleCancelar} />
        </div>
      </Container>

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={style}
          style={{
            backgroundColor: "#fff",
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
            borderRadius: "6px",
            borderColor: "transparent",
          }}
        >
          <form
            onDragEnter={(e) => e.preventDefault}
            style={{
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <FiUpload
              style={{
                fontSize: "24px",
                display: "flex",
                justifyContent: "center",
                padding: "10px",
                backgroundColor: "transparent",
              }}
            />
            <Typography
              id="modal-modal-title"
              style={{
                fontSize: "24px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <label
                for="fupload"
                className="control-label label-bordered"
                style={{
                  backgroundColor: "transparent",
                  color: "black",
                }}
              >
                <FileUploader
                  multiple={false}
                  handleChange={handleFile}
                  disabled={video.length !== 0 ? true : false}
                  name="file"
                  types={fileTypes}
                  hoverTitle={video}
                  handleClose
                  onTypeError={() => {
                    Swal.fire({
                      icon: "error",
                      title: "Formato do arquivo inválido!",
                      text: "",
                      color: "black",
                      confirmButtonColor: "#0A775A",
                    });
                    handleClose();
                  }}
                  children={<ViewHandler file={video} />}
                />
              </label>
            </Typography>{isAdicionando === true ? 
            <Button id="add" disabled>
              Adicionar
            </Button> 
            : 
            <Button id="add" onClick={handleSubmit}>
              Adicionar
            </Button>}
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default EditarProduto;

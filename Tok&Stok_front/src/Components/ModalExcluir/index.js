import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { FiTrash2 } from "react-icons/fi";



const ModalExcluir = (props) => {

    const [openExcluir, setOpenExcluir] = useState(false);
    let nomeDoVideo = props.nomeVideo;

    const handleOpenExcluir = () => setOpenExcluir(true);
    const handleCloseExcluir = () => setOpenExcluir(false);

    const style = {
        position: "absolute",
        top: "52%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: '30%',
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

    const verificaTamanhoNome = () => {
        if (nomeDoVideo.length > 12) {
            nomeDoVideo = nomeDoVideo.substring(0, 20) + "...";
            return nomeDoVideo;
        } else {
            return nomeDoVideo;
        }
    }

    const handleExcluir = () => {
        props.excluir();
    }

    return (
        <>
            <Typography variant="body2">
                <Button
                    sx={{
                        display: "flex",
                        color: "#0A775A",
                        fontWeight: "bold",
                        ":hover": { color: 'red' }
                    }}
                    onClick={handleOpenExcluir}
                >
                    <FiTrash2 style={{ marginRight: "10px" }} />{" "}
                    Excluir video
                </Button>
            </Typography>
            <Modal
                open={openExcluir}
                onClose={handleCloseExcluir}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Box
                    sx={style}
                    style={{
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                        borderRadius: "6px",
                        borderColor: "transparent",
                    }}
                >
                    <form
                        onDragEnter={(e) => e.stopImmediatePropagation()}
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex",
                            flexDirection: "column"
                        }}
                    >
                        <Typography
                            sx={{
                                color: (theme) =>
                                    theme.palette.mode === "dark" ? "#fff" : "#000",
                            }}
                            style={{
                                fontSize: "22px",
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            Deseja excluir - {verificaTamanhoNome()} ?
                        </Typography>
                        <div className="salvarCancelar">
                            <Button className="cancelar"
                                onClick={handleCloseExcluir}
                                sx={{
                                    fontWeight: "bold",
                                    color: '#fff',
                                    backgroundColor: '#064F3C',
                                    borderRadius: '6px',
                                    ':hover': { backgroundColor: '#0A775A' }
                                }}>
                                NÃO
                            </Button>
                            <Button className="salvar"
                                onClick={handleExcluir}
                                sx={{
                                    fontWeight: "bold",
                                    color: '#0A775A',
                                    backgroundColor: '#ffffff',
                                    border: "2px solid",
                                    borderColor: "#E8E8E8",
                                    borderRadius: '6px',
                                    ':hover': { backgroundColor: '#f4f4f4' }
                                }}>
                                SIM
                            </Button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </>
    )
}

export default ModalExcluir;
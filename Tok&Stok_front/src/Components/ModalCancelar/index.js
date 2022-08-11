import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


const ModalCancelar = (props) => {

    const navigate = useNavigate();
    const [openCancelar, setOpenCancelar] = useState(false);
    const handleOpenCancelar = () => setOpenCancelar(true);
    const handleCloseCancelar = () => setOpenCancelar(false);

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: '30%',
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

    const handleCancelar = () => {
        props.cancelar();
        navigate('/');
    }

    return (
        <>
            <Button className="cancelar"
                onClick={handleOpenCancelar}
                sx={{
                    marginLeft: 2,
                    fontWeight: "bold",
                    color: '#0A775A',
                    ':hover': { backgroundColor: 'rgba(98, 167, 120, 0.25)' }
                }}>
                CANCELAR
            </Button>
            <Modal
                open={openCancelar}
                onClose={handleCloseCancelar}
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
                                fontSize: "20px",
                                display: "flex",
                                justifyContent: "center",
                                fontWeight: "bold",
                                textAlign: "center"
                            }}>
                            Vídeos não vinculados ou alterações em andamento.
                        </Typography>
                        <Typography
                            sx={{
                                color: (theme) =>
                                    theme.palette.mode === "dark" ? "#fff" : "#000",
                            }}
                            style={{
                                fontSize: "20px",
                                display: "flex",
                                justifyContent: "center",
                            }}>
                            Deseja sair antes de salvar?
                        </Typography>
                        <div className="salvarCancelar">
                            <Button className="cancelar"
                                onClick={handleCloseCancelar}
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
                                onClick={handleCancelar}
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

export default ModalCancelar;
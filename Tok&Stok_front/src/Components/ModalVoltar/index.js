import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

const ModalVoltar = (props) => {

    const navigate = useNavigate();
    const [openVoltar, setOpenVoltar] = useState(false);
    const handleOpenVoltar = () => setOpenVoltar(true);
    const handleCloseVoltar = () => setOpenVoltar(false);

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

    const handleVoltar = () => {
        props.cancelar();
        navigate("/");
    }

    return (
        <>
            <Typography variant="body2">
                <Button
                    style={{
                        fontSize: "24px",
                        color: "#0A775A",
                        fontWeight: "bold",
                    }}
                    onClick={handleOpenVoltar}
                >
                    <BiArrowBack />
                    VOLTAR
                </Button>
            </Typography>
            <Modal
                open={openVoltar}
                onClose={handleCloseVoltar}
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
                            Deseja sair sem salvar as alterações?
                        </Typography>
                        <div className="salvarCancelar">
                            <Button className="cancelar"
                                onClick={handleCloseVoltar}
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
                                onClick={handleVoltar} 
                                sx={{
                                    fontWeight: "bold",
                                    color: '#0A775A',
                                    backgroundColor: '#ffffff',
                                    border: "1px solid",
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

export default ModalVoltar;
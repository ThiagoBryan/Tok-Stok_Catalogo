import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Swal from "sweetalert2";

const ModalSalvar = (props) => {

    const [openSalvar, setOpenSalvar] = useState(false);
    const handleOpenSalvar = () => setOpenSalvar(true);
    const handleCloseSalvar = () => setOpenSalvar(false);

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

    const handleSubmit = () => {
        props.salvar();
        handleCloseSalvar();
        Swal.fire({
            icon: "success",
            title: "Alterações salvas com sucesso!",
            text: "          ",
            color: "black",
            fontWeight: "bold",
            confirmButtonColor: "#0A775A",
          })
    }

    useEffect(() => {

    }, [props]);

    return (
        <>
            <Button className="cancelar"
                onClick={handleOpenSalvar}
                sx={{
                    color: '#fff',
                    fontWeight: "bold",
                    backgroundColor: '#064F3C',
                    borderRadius: '6px',
                    ':hover': { backgroundColor: '#0A775A' }
                }}>
                Salvar alterações
            </Button>
            <Modal
                open={openSalvar}
                onClose={handleCloseSalvar}
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
                                fontSize: "24px",
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            Deseja salvar?
                        </Typography>
                        <div className="salvarCancelar">
                            <Button onClick={handleCloseSalvar}
                                sx={{
                                    fontWeight: "bold",
                                    color: '#fff',
                                    backgroundColor: '#064F3C',
                                    borderRadius: '6px',
                                    ':hover': { backgroundColor: '#0A775A' }
                                }}>
                                NÃO
                            </Button>
                            <Button onClick={handleSubmit} 
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

export default ModalSalvar;
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { MdDescription } from "react-icons/md";
import api from "../../Service";

const ModalDescricao = (props) => {

    const [openDescricao, setOpenDescricao] = useState(false);
    const handleOpenDescricao = () => setOpenDescricao(true);
    const [descricao, setDescricao] = useState(props.desc);
    const [isEditando, setIsEditando] = useState(false);

    const handleCloseDescricao = () => {
        setIsEditando(false);
        setOpenDescricao(false);
        setDescricao(props.desc);
    };

    const handleSalvarDesc = async () => {
        const { data } = await api.put(`videos/atualizar/descricao/${props.id}?descricao=${descricao}`)
        handleCloseDescricao();
        window.location.reload();
    }

    const handleComecarEdicao = () => {
        setIsEditando(true);
    }

    const style = {
        position: "absolute",
        top: "52%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 550,
        bgcolor: "background.paper",
        border: "1px solid #000",
        boxShadow: 50,
        p: 10,
    };

    useEffect(() => {

    }, [isEditando]);

    return (
        <>
            <Button onClick={handleOpenDescricao} sx={{ color: "#0A775A", fontWeight: "bold", ":hover": { color: '#0288d1' } }}>
                <MdDescription style={{ marginRight: "10px" }} />
                Descrição
            </Button>
            <Modal
                sx={{ color: (theme) => theme.palette.mode === "dark" ? "#fff" : "#000" }}
                open={openDescricao}
                onClose={handleCloseDescricao}
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
                        borderRadius: "30px",
                        borderColor: "transparent",
                        flexDirection: "column",
                    }}
                >
                    <video
                        alt="complex"
                        height="250"
                        width="450"
                        controls
                        style={{
                            display: "block",
                            maxWidth: "100%",
                            maxHeight: "100%",
                            marginBottom: "05px",
                        }}
                    >
                        <source src={props.url} />
                    </video>
                    {isEditando ?
                        <>
                            <Button onClick={() => setIsEditando(false)}>Cancelar</Button>
                            <textarea
                                value={descricao}
                                style={{ height: "250px", width: "100%", resize: 'none', padding: '2%', fontSize: 18 }}
                                onChange={e => setDescricao(e.target.value)}
                            />
                        </>
                        :
                        <>
                            <Button onClick={handleComecarEdicao}>Editar Descrição</Button>
                            <textarea
                                disabled
                                value={props.desc}
                                style={{
                                    height: "250px",
                                    width: "100%",
                                    resize: 'none',
                                    padding: '2%',
                                    fontSize: 18,
                                    borderColor: 'none'
                                }}
                            />
                        </>
                    }
                    <div className="salvarCancelar">
                        <Button className="cancelar"
                            onClick={handleCloseDescricao}
                            sx={{
                                fontWeight: "bold",
                                color: '#fff',
                                backgroundColor: '#064F3C',
                                borderRadius: '6px',
                                ':hover': { backgroundColor: '#0A775A' }
                            }}>
                            CANCELAR
                        </Button>
                        <Button className="salvar"
                            onClick={handleSalvarDesc}
                            sx={{
                                fontWeight: "bold",
                                color: '#0A775A',
                                backgroundColor: '#ffffff',
                                border: "1px solid",
                                borderColor: "#E8E8E8",
                                borderRadius: '6px',
                                ':hover': { backgroundColor: '#f4f4f4' }
                            }}>
                            SALVAR
                        </Button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default ModalDescricao
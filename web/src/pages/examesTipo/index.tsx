import React, { useState, useEffect, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import Modal from "react-modal";
import { FiLogOut, FiPlus, FiX, FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";

import logo from "../../assets/logo.png";
import svgAccount from "../../assets/account.png";
import svgText from "../../assets/text.png";
import svgfiles from "../../assets/files-w.png";
import svgGroup from "../../assets/group.png";

import "./styles.css";
import swal from "sweetalert";

// interface evento {
//     name: string;
//     id: string;
//     criador_evento_id: string;
//     place: string;
//     likes: number;
//     dislikes: number;
//     picture_used: string;
//     bio: string;
//     created_at: string;
//     updated_at: string;
// }

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

Modal.setAppElement("body");

const Dashboard: React.FC = () => {
    const [nomeTipo, setNomeTipo] = useState("");
    const [valTipo, setValTipo] = useState("");
    const [razao, setRazao] = useState("");

    const history = useHistory();
    const userJWT = localStorage.getItem("userJWT");

    var subtitle: any;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = "#f00";
    }

    function closeModal() {
        setIsOpen(false);
    }

    async function handleTipoExame(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = {
            nome: nomeTipo,
            validade: valTipo,
        };
        try {
            if (!data.nome || !data.validade) {
                swal("Ops!", "Algo deu errado!", "error");
                return;
            }
            const respon = await api.post(`/tipoexame`, data, {
                headers: {
                    Authorization: `Bearer ${userJWT}`,
                },
            });
            console.log(respon);
            swal(
                "Tipo de Exame Registrado",
                "Registre agora um novo exame no botão Novo Exame",
                "success"
            );
            history.push("/exames");
        } catch (error) {
            console.log(error);
            swal("Ops!", "Algo deu errado!", "error");
        }
    }

    async function handleRazaoExame(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = {
            razao: razao,
        };
        try {
            if (!razao) {
                swal("Ops!", "Algo deu errado!", "error");
                return;
            }
            const respon = await api.post(`/razaoexame`, data, {
                headers: {
                    Authorization: `Bearer ${userJWT}`,
                },
            });
            console.log(respon);
            swal(
                "Razão de Exame Registrado",
                "Registre agora um novo exame no botão Novo Exame",
                "success"
            );
            history.push("/exames");
        } catch (error) {
            console.log(error);
            swal("Ops!", "Algo deu errado!", "error");
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push("/");
    }

    return (
        <div className="container-dashboard">
            <div className="sidebar">
                <img src={logo} alt="logo" className="logo-side" />
                <div className="side-list">
                    <Link to="/dashboard">
                        <img src={svgText} alt="icon"></img>Dashboard
                    </Link>
                    <Link to="/funcionarios">
                        <img src={svgGroup} alt="icon"></img>Funcionários
                    </Link>
                    <Link to="/exames" className="side-active">
                        <img src={svgfiles} alt="icon"></img>Exames
                    </Link>
                    <Link to="/conta">
                        <img src={svgAccount} alt="icon"></img>Conta
                    </Link>
                </div>
                <Link to="/" onClick={handleLogout} className="logout-side">
                    <FiLogOut></FiLogOut> Deslogar
                </Link>
            </div>
            <div className="main-section">
                <header className="header">
                    <div className="group-title">
                        <h2>Novo Tipo/Razão de Exame</h2>
                        <p>Cadastre um novo tipo ou razão de exame</p>
                    </div>
                    {/* <div className="buttons-header">
                        <button className="btn-primary" onClick={openModal}>
                            <FiPlus></FiPlus>Novo Exame
                        </button>
                    </div> */}
                </header>

                <div className="body-exame-tipo">
                    <form className="left-form" onSubmit={handleTipoExame}>
                        <h2>Tipo de Exame</h2>
                        <div className="row-modal">
                            <div className="modal-group">
                                <label htmlFor="name">Nome do Tipo</label>
                                <input
                                    type="text"
                                    value={nomeTipo}
                                    onChange={(e) =>
                                        setNomeTipo(e.target.value)
                                    }
                                />
                            </div>
                            <div className="modal-group">
                                <label htmlFor="name">Validade</label>
                                <input
                                    type="text"
                                    value={valTipo}
                                    onChange={(e) => setValTipo(e.target.value)}
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn-primary btn-modal">
                            Cadastrar Tipo
                        </button>
                    </form>
                    <form className="right-form" onSubmit={handleRazaoExame}>
                        <h2>Razão do Exame</h2>
                        <div className="row-modal">
                            <div className="modal-group">
                                <label htmlFor="name">Nome da Razão</label>
                                <input
                                    type="text"
                                    value={razao}
                                    onChange={(e) => setRazao(e.target.value)}
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn-primary btn-modal">
                            Cadastrar Razão
                        </button>
                        <Link to="/exames" className="btn-voltar">
                            <FiArrowLeft></FiArrowLeft>Voltar
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

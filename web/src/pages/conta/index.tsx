import React, { useState, useEffect, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import Modal from "react-modal";
import { FiLogOut, FiX, FiEdit } from "react-icons/fi";

import api from "../../services/api";

import logo from "../../assets/logo.png";
import svgAccount from "../../assets/account-w.png";
import svgText from "../../assets/text.png";
import svgfiles from "../../assets/files.png";
import svgGroup from "../../assets/group.png";
import profilePic from "../../assets/profille.png";

import "./styles.css";
import swal from "sweetalert";

interface Conta {
    id: string;
    nome: string;
    matricula: string;
}

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

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement("#yourAppElement");
Modal.setAppElement("body");

const Dashboard: React.FC = () => {
    // const [eventos, setEventos] = useState<evento[]>([]);
    const [idConta, setIdConta] = useState("");
    const [nome, setNome] = useState("");
    const [matricula, setMatricula] = useState("");
    const [obje, setObje] = useState<Conta>();

    const userJWT = localStorage.getItem("userJWT");
    const userID = localStorage.getItem("IdUser");

    const history = useHistory();

    useEffect(() => {
        async function loadData(): Promise<void> {
            const userJWT = await localStorage.getItem("userJWT");
            const userID = localStorage.getItem("IdUser");
            const response = await api.get(`/usuarios/${userID}`, {
                headers: {
                    Authorization: `Bearer ${userJWT}`,
                },
            });
            setObje(response.data);
            setIdConta(response.data.id);
            setNome(response.data.nome);
            setMatricula(response.data.matricula);
        }
        loadData();
    }, []);

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

    async function handleEditInfo(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            const respon = await api.post("/usuarios/avatar", {
                headers: {
                    Authorization: `Bearer ${userJWT}`,
                },
            });
            history.push("/conta");
        } catch (error) {
            console.log(error);
            swal("Ops!", "Algo deu errado", "error");
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
                    <Link to="/exames">
                        <img src={svgfiles} alt="icon"></img>Exames
                    </Link>
                    <Link to="/conta" className="side-active">
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
                        <h2>Conta</h2>
                        <p>Veja agora as suas informações</p>
                    </div>
                    {/* <button className="btn-primary" onClick={openModal}>
                        <FiEdit></FiEdit>Editar Informações
                    </button> */}
                </header>

                <div className="body-conta">
                    <div className="left-b">
                        <div className="column-a">
                            <p>Seu ID:</p>
                            <p>Nome: </p>
                            <p>Matricula: </p>
                        </div>
                        <div className="column-b">
                            <p>{idConta}</p>
                            <p>{nome}</p>
                            <p>{matricula}</p>
                        </div>
                    </div>

                    <div className="right-b">
                        <img src={profilePic} alt="Profile Pic" />
                        <button className="btn-profile" onClick={openModal}>
                            <FiEdit></FiEdit> Editar Foto
                        </button>
                    </div>
                    <Modal
                        isOpen={modalIsOpen}
                        // onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        contentLabel="Example Modal"
                        className="modal-container"
                    >
                        <form className="modal" onSubmit={handleEditInfo}>
                            <h2>CONTA</h2>
                            <p>Altere agora a sua imagem de profile</p>

                            <div className="modal-pic-container">
                                <img src={profilePic} alt="profile" />
                                <input
                                    type="file"
                                    className="custom-file-input"
                                ></input>
                            </div>
                            <button
                                type="submit"
                                className="btn-primary btn-modal"
                            >
                                Atualizar Informações
                            </button>

                            <button
                                onClick={closeModal}
                                className="btn-close-modal"
                            >
                                <FiX size={25}></FiX>
                            </button>
                        </form>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

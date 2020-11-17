import React, { useState, useEffect, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import Modal from "react-modal";
import {
    FiMapPin,
    FiPower,
    FiThumbsDown,
    FiThumbsUp,
    FiTrash2,
    FiLogOut,
    FiPlus,
    FiX,
    FiEdit,
} from "react-icons/fi";

import api from "../../services/api";

import logo from "../../assets/logo.png";
import svgAccount from "../../assets/account-w.png";
import svgText from "../../assets/text.png";
import svgfiles from "../../assets/files.png";
import svgGroup from "../../assets/group.png";
import profilePic from "../../assets/profille.png";

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

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement("#yourAppElement");
Modal.setAppElement("body");

const Dashboard: React.FC = () => {
    // const [eventos, setEventos] = useState<evento[]>([]);

    const history = useHistory();
    // const userJWT = localStorage.getItem("userJWT");

    // useEffect(() => {
    //     async function loadData(): Promise<void> {
    //         const userJWT = await localStorage.getItem("userJWT");
    //         const response = await api.get("/eventos", {
    //             headers: {
    //                 Authorization: `Bearer ${userJWT}`,
    //             },
    //         });
    //         setEventos(response.data);
    //     }
    //     loadData();
    // }, []);

    // useEffect(() => {
    //     async function loadData(): Promise<void> {
    //         const userJWT = await localStorage.getItem("userJWT");
    //         const response = await api.get("/eventos", {
    //             headers: {
    //                 Authorization: `Bearer ${userJWT}`,
    //             },
    //         });
    //         setEventos(response.data);
    //     }
    //     loadData();
    // }, [eventos]);

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

    // async function handleDeleteEvent(id: string, criador: any) {
    //     try {
    //         const user = localStorage.getItem("IdUser");
    //         console.log("user", user);
    //         console.log(criador);
    //         if (user == criador) {
    //             // const config = {
    //             //     data: {
    //             //         usuario_logged: criador,
    //             //     },
    //             // };

    //             const config = {
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     Authorization: `Bearer ${userJWT}`,
    //                 },
    //             };

    //             const usuario_logged = criador;
    //             console.log(config);
    //             const respoon = await api.delete(`/eventos/${id}`, config);
    //             setEventos(eventos.filter((even) => even.id !== id));
    //         }

    //         if (user != criador) {
    //             swal(
    //                 "Ops!",
    //                 "Only the creator of the event can delete it",
    //                 "error"
    //             );
    //         }
    //     } catch (err) {
    //         alert("Erro ao deletar o evento");
    //         console.log(err);
    //     }
    // }

    // async function handleLike(evento: string) {
    //     // e.preventDefault();

    //     const evento_id = evento;
    //     const usuario_id = localStorage.getItem("IdUser");

    //     const data = {
    //         evento_id,
    //         usuario_id,
    //     };

    //     try {
    //         console.log(data);
    //         const respon = await api.post("/likes", data, {
    //             headers: {
    //                 Authorization: `Bearer ${userJWT}`,
    //             },
    //         });
    //     } catch (error) {
    //         console.log(error);
    //         swal("Ops!", "Something went wrong", "error");
    //     }
    // }

    // async function handleDislike(evento: string) {
    //     // e.preventDefault();

    //     const evento_id = evento;
    //     const usuario_id = localStorage.getItem("IdUser");

    //     const data = {
    //         evento_id,
    //         usuario_id,
    //     };

    //     try {
    //         console.log(data);
    //         const respon = await api.post("/dislikes", data, {
    //             headers: {
    //                 Authorization: `Bearer ${userJWT}`,
    //             },
    //         });
    //     } catch (error) {
    //         console.log(error);
    //         swal("Ops!", "Something went wrong", "error");
    //     }
    // }

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
                    <button className="btn-primary" onClick={openModal}>
                        <FiEdit></FiEdit>Editar Informações
                    </button>
                </header>

                <div className="body-conta">
                    <div className="left-b">
                        <div className="column-a">
                            <p>Seu ID:</p>
                            <p>Nome: </p>
                            <p>CPF: </p>
                        </div>
                        <div className="column-b">
                            <p>0010</p>
                            <p>Vinicius</p>
                            <p>168.128.068.28</p>
                        </div>
                    </div>

                    <div className="right-b">
                        <img src={profilePic} alt="Profile Pic" />
                        <button className="btn-profile">
                            <FiEdit></FiEdit>
                            {" "}
                        Editar Foto
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

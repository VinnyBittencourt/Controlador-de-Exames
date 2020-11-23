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
} from "react-icons/fi";

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
                        <h2>Exames</h2>
                        <p>Todos os exames cadastrados no sistema</p>
                    </div>
                    <div className="buttons-header">
                        <Link to="/examestipo" className="btn-secondary">
                            <FiPlus></FiPlus>Novo Tipo/Razão
                        </Link>
                        <button className="btn-primary" onClick={openModal}>
                            <FiPlus></FiPlus>Novo Exame
                        </button>
                    </div>
                </header>
                <Modal
                    isOpen={modalIsOpen}
                    // onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    contentLabel="Example Modal"
                    className="modal-container"
                >
                    <div className="modal">
                        <h2>Resultado</h2>
                        <p className="text-modal">
                            O preço de venda do produto/serviço informado é de:
                        </p>
                        <p className="answer-modal">R$</p>
                        {/* <p className="text-modal">Sendo a porcentagem de:</p> */}
                        {/* <p className="answer-modal">{margemPorcentagem}%</p> */}

                        <button onClick={closeModal} className="btn-main">
                            Novo Produto
                        </button>
                        <button
                            onClick={closeModal}
                            className="btn-close-modal"
                        >
                            <FiX size={18}></FiX>
                        </button>
                    </div>
                </Modal>
                {/* <div className="list-container">
                    <div className="list-tit">
                        <p>ID do Exame</p>
                        <p>Nome do Funcionário</p>
                        <p>Tipo do Exame</p>
                        <p>Data do Exame</p>
                        <p>Vencimento</p>
                    </div>
                    <div className="list-conteudo">
                        <div className="list-item">
                            <p>0001</p>
                            <p>Vinicius</p>
                            <p>Tipo Sanguineo</p>
                            <p>11/05/2020</p>
                            <p>11/12/2020</p>
                        </div>
                        <div className="list-item">
                            <p>0001</p>
                            <p>Vinicius</p>
                            <p>Tipo Sanguineo</p>
                            <p>11/05/2020</p>
                            <p>11/12/2020</p>
                        </div>
                    </div>
                </div> */}
                <table className="tb-container">
                    <tr className="tb-tit">
                        <th>ID do Exame</th>
                        <th>Nome do Funcionário</th>
                        <th>Tipo do Exame</th>
                        <th>Data do Exame</th>
                        <th>Vencimento</th>
                    </tr>
                    <tr className="tb-item tb-first">
                        <td>0001</td>
                        <td>Vinicius</td>
                        <td>Sangue</td>
                        <td>11/05/2020</td>
                        <td>11/12/2020</td>
                    </tr>
                    <tr className="tb-item">
                        <td>0001</td>
                        <td>Vinicius</td>
                        <td>Sangue</td>
                        <td>11/05/2020</td>
                        <td>11/12/2020</td>
                    </tr>
                    <tr className="tb-item">
                        <td>0001</td>
                        <td>Vinicius</td>
                        <td>Sangue</td>
                        <td>11/05/2020</td>
                        <td>11/12/2020</td>
                    </tr>
                    <tr className="tb-item">
                        <td>0001</td>
                        <td>Vinicius</td>
                        <td>Sangue</td>
                        <td>11/05/2020</td>
                        <td>11/12/2020</td>
                    </tr>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;

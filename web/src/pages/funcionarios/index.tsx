import React, { useState, useEffect, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import Modal from "react-modal";
import { FiLogOut, FiPlus, FiX } from "react-icons/fi";

import api from "../../services/api";

import logo from "../../assets/logo.png";
import svgAccount from "../../assets/account.png";
import svgText from "../../assets/text.png";
import svgfiles from "../../assets/files.png";
import svgGroup from "../../assets/group-w.png";

import "./styles.css";
import swal from "sweetalert";

interface funcio {
    id: string;
    nome: string;
    cpf: string;
    funcao: string;
    telefone: string;
    email: string;
    avatar: string;
}

// interface funcion {
//     [
//         id: string,
//         nome: string,
//         cpf: string,
//         funcao: string,
//         telefone: string,
//         email: string,
//         avatar: string,
//     ]: any;
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
    const [funcionarios, setFuncionarios] = useState<funcio[]>([]);
    // const [idFunc, setIdFunc] = useState("");
    const [nomeFunc, setNomeFunc] = useState("");
    const [cpfFunc, setCpfFunc] = useState("");
    const [funcaoFunc, setFuncaoFunc] = useState("");
    const [telFunc, setTelFunc] = useState("");
    const [emailFunc, setEmailFunc] = useState("");

    const history = useHistory();
    const userJWT = localStorage.getItem("userJWT");

    useEffect(() => {
        async function loadData(): Promise<void> {
            const userJWT = await localStorage.getItem("userJWT");
            const response = await api.get("/funcionarios/", {
                headers: {
                    Authorization: `Bearer ${userJWT}`,
                },
            });
            if (response.data) {
                setFuncionarios(response.data);
            }
        }
        loadData();
    }, []);

    /* Modal */
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

    async function handleCadastroFunc(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = {
            nome: nomeFunc,
            cpf: cpfFunc,
            funcao: funcaoFunc,
            telefone: telFunc,
            email: emailFunc,
            avatar: "",
        };
        try {
            console.log(data);
            const respon = await api.post("/funcionarios", data, {
                headers: {
                    Authorization: `Bearer ${userJWT}`,
                },
            });
            console.log(respon);
            swal(
                "Registro Completo",
                "Um novo funcionário foi registrado!",
                "success"
            );
            history.push("/funcionarios");
            reloadp();
        } catch (err) {
            console.log(err);
            swal("Ops!", "Algo deu errado!", "error");
        }
    }

    function reloadp() {
        window.location.reload(false);
    }

    async function handleDeleteFunc(id_func: string) {
        try {
            await api.delete(`/funcionarios/${id_func}`, {
                headers: {
                    Authorization: `Bearer ${userJWT}`,
                },
            });
            reloadp();
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
                    <Link to="/funcionarios" className="side-active">
                        <img src={svgGroup} alt="icon"></img>Funcionários
                    </Link>
                    <Link to="/exames">
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
                        <h2>Funcionários</h2>
                        <p>
                            Lista de todos os funcionários cadastrados no
                            sistema
                        </p>
                    </div>
                    <button className="btn-primary" onClick={openModal}>
                        <FiPlus></FiPlus>Novo Funcionário
                    </button>
                </header>
                <Modal
                    isOpen={modalIsOpen}
                    // onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    contentLabel="Example Modal"
                    className="modal-container"
                >
                    <form className="modal" onSubmit={handleCadastroFunc}>
                        <h2>Funcionário</h2>
                        <p>Adicione agora um novo funcionário</p>
                        <div className="row-modal">
                            <div className="modal-group">
                                <label htmlFor="name">Nome</label>
                                <input
                                    type="text"
                                    value={nomeFunc}
                                    onChange={(e) =>
                                        setNomeFunc(e.target.value)
                                    }
                                />
                            </div>
                            <div className="modal-group">
                                <label htmlFor="name">CPF</label>
                                <input
                                    type="text"
                                    value={cpfFunc}
                                    onChange={(e) => setCpfFunc(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row-modal">
                            <div className="modal-group">
                                <label htmlFor="name">Função</label>
                                <input
                                    type="text"
                                    value={funcaoFunc}
                                    onChange={(e) =>
                                        setFuncaoFunc(e.target.value)
                                    }
                                />
                            </div>
                            <div className="modal-group">
                                <label htmlFor="name">Telefone</label>
                                <input
                                    type="text"
                                    value={telFunc}
                                    onChange={(e) => setTelFunc(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row-modal">
                            <div className="modal-group">
                                <label htmlFor="name">Email</label>
                                <input
                                    type="text"
                                    value={emailFunc}
                                    onChange={(e) =>
                                        setEmailFunc(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn-primary btn-modal">
                            Cadastrar Funcionário
                        </button>
                        <button
                            onClick={closeModal}
                            className="btn-close-modal"
                        >
                            <FiX size={25}></FiX>
                        </button>
                    </form>
                </Modal>
                <table className="tb-container">
                    <tr className="tb-tit">
                        <th>ID do Funcionario</th>
                        <th>Nome do Funcionário</th>
                        <th>CPF</th>
                        <th>Função</th>
                        <th>Telefone</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                    {funcionarios.map((func) => (
                        <tr className="tb-item tb-first" key={func.id}>
                            <td>{func.id}</td>
                            <td>{func.nome}</td>
                            <td>{func.cpf}</td>
                            <td>{func.funcao}</td>
                            <td>{func.telefone}</td>
                            <td>{func.email}</td>
                            <td className="btns-table">
                                <Link to={"/functionarios/edit/" + func.id}>
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDeleteFunc(func.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    );
};

export default Dashboard;

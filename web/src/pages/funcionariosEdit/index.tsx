import React, { useState, useEffect, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import Modal from "react-modal";
import { FiLogOut, FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";

import logo from "../../assets/logo.png";
import svgAccount from "../../assets/account.png";
import svgText from "../../assets/text.png";
import svgfiles from "../../assets/files.png";
import svgGroup from "../../assets/group-w.png";

import "./styles.css";
import swal from "sweetalert";

Modal.setAppElement("body");

const Dashboard: React.FC = () => {
    const [nomeFunc, setNomeFunc] = useState("");
    const [cpfFunc, setCpfFunc] = useState("");
    const [funcaoFunc, setFuncaoFunc] = useState("");
    const [telFunc, setTelFunc] = useState("");
    const [emailFunc, setEmailFunc] = useState("");

    const history = useHistory();
    const userJWT = localStorage.getItem("userJWT");
    const idParam = window.location.href.split("/").reverse()[0];

    useEffect(() => {
        async function loadData(): Promise<void> {
            const userJWT = await localStorage.getItem("userJWT");
            const response = await api.get(`/funcionarios/${idParam}`, {
                headers: {
                    Authorization: `Bearer ${userJWT}`,
                },
            });
            setNomeFunc(response.data.nome);
            setCpfFunc(response.data.cpf);
            setFuncaoFunc(response.data.funcao);
            setTelFunc(response.data.telefone);
            setEmailFunc(response.data.email);
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

    async function handleUpdateFunc(e: FormEvent<HTMLFormElement>) {
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
            if (
                !data.nome ||
                !data.cpf ||
                !data.funcao ||
                !data.telefone ||
                !data.email
            ) {
                swal("Ops!", "Algo deu errado!", "error");
                return;
            }
            const respon = await api.put(`/funcionarios/${idParam}`, data, {
                headers: {
                    Authorization: `Bearer ${userJWT}`,
                },
            });
            console.log(respon);
            swal(
                "Atualização Realizada",
                "Funcionário atualizado com sucesso!",
                "success"
            );
            history.push("/funcionarios");
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
                </header>

                <form className="body-funcedit" onSubmit={handleUpdateFunc}>
                    <div className="row-modal">
                        <div className="modal-group">
                            <label htmlFor="name">Nome</label>
                            <input
                                type="text"
                                value={nomeFunc}
                                onChange={(e) => setNomeFunc(e.target.value)}
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
                                onChange={(e) => setFuncaoFunc(e.target.value)}
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
                                onChange={(e) => setEmailFunc(e.target.value)}
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn-primary btn-modal">
                        Atualizar Funcionário
                    </button>
                    <Link to="/funcionarios" className="btn-voltar">
                        <FiArrowLeft></FiArrowLeft>Voltar
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Dashboard;

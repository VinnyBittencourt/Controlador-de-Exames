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
    const [idExame, setIdExame] = useState("");
    const [funcionaId, setFuncionaID] = useState("");
    const [razaoId, setRazaoID] = useState("");
    const [tipoId, setTipoID] = useState("");
    const [dataExam, setData] = useState("");
    const [venci, setVenci] = useState("");

    const history = useHistory();
    const userJWT = localStorage.getItem("userJWT");
    const idParam = window.location.href.split("/").reverse()[0];

    useEffect(() => {
        async function loadData(): Promise<void> {
            const userJWT = await localStorage.getItem("userJWT");
            const response = await api.get(`/exame/${idParam}`, {
                headers: {
                    Authorization: `Bearer ${userJWT}`,
                },
            });
            setIdExame(response.data.id);
            setFuncionaID(response.data.funcionario_id);
            setRazaoID(response.data.razaoExame_id);
            setTipoID(response.data.tipoExame_id);
            setData(response.data.data);
            setVenci(response.data.vencimento);
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
            funcionario_id: funcionaId,
            razaoExame_id: razaoId,
            tipoExame_id: tipoId,
            data: dataExam,
            vencimento: venci,
        };
        try {
            console.log(data);
            // if (
            //     !data.nome ||
            //     !data.cpf ||
            //     !data.funcao ||
            //     !data.telefone ||
            //     !data.email
            // ) {
            //     swal("Ops!", "Algo deu errado!", "error");
            //     return;
            // }
            const respon = await api.put(`/exame/${idParam}`, data, {
                headers: {
                    Authorization: `Bearer ${userJWT}`,
                },
            });
            console.log(respon);
            swal(
                "Atualização Realizada",
                "Exame atualizado com sucesso!",
                "success"
            );
            history.push("/exames");
        } catch (err) {
            console.log(err);
            swal("Ops!", "Algo deu errado!", "error");
        }
    }

    // function reloadp() {
    //     window.location.reload(false);
    // }

    // async function handleDeleteExam(id_func: string) {
    //     try {
    //         await api.delete(`/exame/${id_func}`, {
    //             headers: {
    //                 Authorization: `Bearer ${userJWT}`,
    //             },
    //         });
    //         reloadp();
    //     } catch (error) {
    //         console.log(error);
    //         swal("Ops!", "Algo deu errado!", "error");
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
                        <h2>Exames</h2>
                        <p>Edite agora o exame selecionado</p>
                    </div>
                </header>

                <form className="body-funcedit" onSubmit={handleUpdateFunc}>
                    <div className="row-modal">
                        <div className="modal-group">
                            <label htmlFor="name">Funcionario</label>
                            <input
                                type="text"
                                value={funcionaId}
                                onChange={(e) => setFuncionaID(e.target.value)}
                            />
                        </div>
                        <div className="modal-group">
                            <label htmlFor="name">Razão</label>
                            <input
                                type="text"
                                value={razaoId}
                                onChange={(e) => setRazaoID(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row-modal">
                        <div className="modal-group">
                            <label htmlFor="name">Tipo</label>
                            <input
                                type="text"
                                value={tipoId}
                                onChange={(e) => setTipoID(e.target.value)}
                            />
                        </div>
                        <div className="modal-group">
                            <label htmlFor="name">Data</label>
                            <input
                                type="text"
                                value={dataExam}
                                onChange={(e) => setData(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row-modal">
                        <div className="modal-group">
                            <label htmlFor="name">Email</label>
                            <input
                                type="text"
                                value={venci}
                                onChange={(e) => setVenci(e.target.value)}
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn-primary btn-modal">
                        Atualizar Exame
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

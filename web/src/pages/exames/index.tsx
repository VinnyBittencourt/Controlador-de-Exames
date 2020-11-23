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

interface funcio {
    id: string;
    nome: string;
}

interface razao {
    id: string;
    razao: string;
}

interface tipo {
    id: string;
    nome: string;
    validade: string;
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
    const [funcIDs, setFuncIDs] = useState<funcio[]>([]);
    const [razaoIDs, setRazaoIDs] = useState<razao[]>([]);
    const [tipoIDs, setTipoIDs] = useState<tipo[]>([]);
    const [dataExame, setDataExame] = useState("");
    const [venciExame, setVenciExame] = useState("");
    const [funcid, setFuncid] = useState("");
    const [razaoid, setRazaoid] = useState("");
    const [tipoid, setTipoid] = useState("");

    const history = useHistory();
    const userJWT = localStorage.getItem("userJWT");

    useEffect(() => {
        async function loadData(): Promise<void> {
            const userJWT = await localStorage.getItem("userJWT");
            const response = await api.get("/funcionarios", {
                headers: {
                    Authorization: `Bearer ${userJWT}`,
                },
            });
            setFuncIDs(response.data);

            const respons = await api.get("/razaoexame", {
                headers: {
                    Authorization: `Bearer ${userJWT}`,
                },
            });
            setRazaoIDs(respons.data);

            const respon = await api.get("/tipoexame", {
                headers: {
                    Authorization: `Bearer ${userJWT}`,
                },
            });
            setTipoIDs(respon.data);
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

    async function handleExame(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = {
            funcionario_id: funcid,
            razaoExame_id: razaoid,
            tipoExame_id: tipoid,
            data: dataExame,
            vencimento: venciExame,
        };
        try {
            console.log(data);
            // if (
            //     !data.funcionario_id ||
            // ) {
            //     swal("Ops!", "Algo deu errado!", "error");
            //     return;
            // }
            const respon = await api.post(`/exame`, data, {
                headers: {
                    Authorization: `Bearer ${userJWT}`,
                },
            });
            console.log(respon);
            swal(
                "Exame Registrado",
                "Exame cadastrado com sucesso!",
                "success"
            );
            history.push("/exames");
        } catch (err) {
            console.log(err);
            swal("Ops!", "Algo deu errado!", "error");
        }
    }

    function handleFuncio(valor: string) {
        setFuncid(valor);
    }

    function handleRaz(valor: string) {
        setRazaoid(valor);
    }

    function handleTips(valor: string) {
        setTipoid(valor);
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
                    <form className="modal" onSubmit={handleExame}>
                        <h2>Novo Exame</h2>
                        <p>Adicione agora um novo exame</p>
                        <div className="row-modal">
                            <div className="modal-group">
                                <label htmlFor="funcionarios">
                                    Funcionarios
                                </label>
                                <select
                                    name="funcionarios"
                                    onChange={(e) =>
                                        handleFuncio(e.target.value)
                                    }
                                >
                                    {funcIDs.map((funci) => (
                                        <option value={funci.id}>
                                            {funci.nome}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="modal-group">
                                <label htmlFor="razoes">Razão do Exame</label>
                                <select
                                    name="razoes"
                                    onChange={(e) => handleRaz(e.target.value)}
                                >
                                    {razaoIDs.map((raz) => (
                                        <option value={raz.id}>
                                            {raz.razao}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="row-modal">
                            <div className="modal-group">
                                <label htmlFor="tipos">Tipo do Exame</label>
                                <select
                                    name="tipos"
                                    onChange={(e) => handleTips(e.target.value)}
                                >
                                    {tipoIDs.map((tip) => (
                                        <option value={tip.id}>
                                            {tip.nome}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="modal-group">
                                <label htmlFor="meeting-time">
                                    Data do Exame
                                </label>
                                <input
                                    type="datetime-local"
                                    id="meeting-time"
                                    name="meeting-time"
                                    value={dataExame}
                                    onChange={(e) =>
                                        setDataExame(e.target.value)
                                    }
                                    min="2020-11-01T00:00"
                                />
                            </div>
                        </div>
                        <div className="row-modal">
                            <div className="modal-group">
                                <label htmlFor="vencimento">
                                    Data de Vencimento
                                </label>
                                <input
                                    type="datetime-local"
                                    id="vencimento"
                                    name="vencimento"
                                    value={venciExame}
                                    onChange={(e) =>
                                        setVenciExame(e.target.value)
                                    }
                                    min="2020-11-01T00:00"
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn-primary btn-modal">
                            Cadastrar Exame
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
                    {funcIDs.map((func) => (
                        <tr className="tb-item tb-first" key={func.id}>
                            <td>{func.id}</td>
                            <td>{func.nome}</td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    );
};

export default Dashboard;

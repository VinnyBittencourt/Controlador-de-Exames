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
import svgText from "../../assets/text-w.png";
import svgfiles from "../../assets/files.png";
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

interface exams {
    id: string;
    funcionario_id: string;
    razaoExame_id: string;
    tipoExame_id: string;
    data: string;
    vencimento: string;
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
    const [exames, setExames] = useState<exams[]>([]);
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

    useEffect(() => {
        async function loadData(): Promise<void> {
            const userJWT = await localStorage.getItem("userJWT");
            const response = await api.get("/exame/", {
                headers: {
                    Authorization: `Bearer ${userJWT}`,
                },
            });
            if (response.data) {
                setExames(response.data);
            }
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

    async function handleDeleteExam(id_func: string) {
        try {
            await api.delete(`/exame/${id_func}`, {
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

    function reloadp() {
        window.location.reload(false);
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
                    <Link to="/dashboard" className="side-active">
                        <img src={svgText} alt="icon"></img>Dashboard
                    </Link>
                    <Link to="/funcionarios">
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
                        <h2>Dashboard</h2>
                        <p>Exames para vencer</p>
                    </div>
                    <button className="btn-primary" onClick={openModal}>
                        <FiPlus></FiPlus>Novo Exame
                    </button>
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
                        <th>ID do Funcionário</th>
                        <th>ID da Razão</th>
                        <th>ID do Tipo</th>
                        <th>Data do Exame</th>
                        <th>Vencimento do Exame</th>
                        <th></th>
                    </tr>
                    {exames.map((exa) => (
                        <tr className="tb-item tb-first" key={exa.id}>
                            <td>{exa.id}</td>
                            <td>{exa.funcionario_id}</td>
                            <td>{exa.razaoExame_id}</td>
                            <td>{exa.tipoExame_id}</td>
                            <td>{exa.data}</td>
                            <td>{exa.vencimento}</td>
                            <td className="btns-table">
                                <Link to={"/funcionariosedit/" + exa.id}>
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDeleteExam(exa.id)}
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

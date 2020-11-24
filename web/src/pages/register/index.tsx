import React, { useState, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import swal from "sweetalert";

import api from "../../services/api";

import logo from "../../assets/logo.png";

const Register: React.FC = () => {
    const [nome, setNome] = useState("");
    const [matricula, setMatricula] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();

    async function handleRegister(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = {
            nome,
            matricula,
            password,
        };
        try {
            console.log(data);
            if (!data.matricula || !data.nome || !data.password) {
                swal("Ops!", "Algo deu errado!", "error");
                return;
            }

            if (data.password.length < 4) {
                swal(
                    "Ops!",
                    "A senha precisa ter mais de 4 characteres!",
                    "error"
                );
                return;
            }
            const respon = await api.post("/usuarios", data);
            console.log(respon);
            localStorage.setItem("IdUser", respon.data.id);
            localStorage.setItem("nameUser", respon.data.nome);
            swal(
                "Registro Completo",
                "Aproveite agora todos os recursos da plataforma!",
                "success"
            );
            history.push("/");
        } catch (err) {
            console.log(err);
            swal("Ops!", "Algo deu errado!", "error");
        }
    }

    return (
        <div className="login-container regi">
            <form className="login-box" onSubmit={handleRegister}>
                <img src={logo} alt="logo" />
                <h2>Registrar</h2>
                <div className="group-input">
                    <label htmlFor="nome">Nome</label>
                    <input
                        type="text"
                        name="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </div>
                <div className="group-input">
                    <label htmlFor="matricula">Matricula</label>
                    <input
                        type="text"
                        name="matricula"
                        value={matricula}
                        onChange={(e) => setMatricula(e.target.value)}
                    />
                </div>
                <div className="group-input">
                    <label htmlFor="Password">Password</label>
                    <input
                        type="password"
                        name="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Registrar</button>
                <div className="linkb-regi">
                    <Link to="/" className="link-regi">
                        <FiLogOut></FiLogOut>Voltar
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Register;

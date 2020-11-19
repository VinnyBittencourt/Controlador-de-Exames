import React, { useState, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";

import logo from "../../assets/logo.png";

import "./styles.css";

import api from "../../services/api";

const Login: React.FC = () => {
    const [matricula, setMatricula] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();

    async function handleLogin(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = {
            matricula,
            password,
        };
        try {
            const respon = await api.post("/sessions", data);
            console.log(respon);
            localStorage.setItem("IdUser", respon.data.user.id);
            localStorage.setItem("nameUser", respon.data.user.nome);
            localStorage.setItem("userJWT", respon.data.token);
            history.push("/dashboard");
        } catch (error) {
            console.log(error);
            swal("Ops!", "Matricula ou senha invalida", "error");
        }
    }

    return (
        <div className="login-container">
            <form className="login-box" onSubmit={handleLogin}>
                <img src={logo} alt="logo" />
                <h2>Login</h2>
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
                <button type="submit">login</button>
                <Link to="/register">Não possui uma conta?</Link>
            </form>
        </div>
    );
};

export default Login;

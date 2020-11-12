import React, { useState, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";

import logo from "../../assets/logo.png";

import "./styles.css";

import api from "../../services/api";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // const history = useHistory();

    async function handleLogin(e: FormEvent<HTMLFormElement>) {
        //     e.preventDefault();
        //     const data = {
        //         email,
        //         password,
        //     };
        //     try {
        //         const respon = await api.post("/sessions", data);
        //         console.log(respon);
        //         localStorage.setItem("IdUser", respon.data.user.id);
        //         localStorage.setItem("nameUser", respon.data.user.nome);
        //         localStorage.setItem("userJWT", respon.data.token);
        //         history.push("/dashboard");
        //     } catch (error) {
        //         console.log(error);
        //         swal("Ops!", "Invalid email or password!", "error");
        //     }
    }

    return (
        <div className="login-container">
            <form className="login-box">
                <img src={logo} alt="logo" />
                <h2>Login</h2>
                <div className="group-input">
                    <label htmlFor="matricula">Matricula</label>
                    <input type="text" name="matricula" />
                </div>
                <div className="group-input">
                    <label htmlFor="Password">Password</label>
                    <input type="password" name="Password" />
                </div>
                <button type="submit">login</button>
                <Link to="/register">Não possui uma conta?</Link>
            </form>
        </div>
    );
};

export default Login;

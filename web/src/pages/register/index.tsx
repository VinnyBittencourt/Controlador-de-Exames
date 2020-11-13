import React, { useState, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import swal from "sweetalert";

import api from "../../services/api";

import logo from "../../assets/logo.png";

const Register: React.FC = () => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();

    async function handleRegister(e: FormEvent<HTMLFormElement>) {
        // e.preventDefault();
        // const data = {
        //     nome,
        //     email,
        //     password,
        // };
        // try {
        //     console.log(data);
        //     const respon = await api.post("/usuarios", data);
        //     console.log(respon);
        //     localStorage.setItem("IdUser", respon.data.id);
        //     localStorage.setItem("nameUser", respon.data.nome);
        //     swal(
        //         "Registration complete",
        //         "Thanks for using the Event Manager service!",
        //         "success"
        //     );
        //     history.push("/dashboard");
        // } catch (err) {
        //     console.log(err);
        //     swal("Ops!", "Something went wrong", "error");
        // }
    }

    return (
        <div className="login-container regi">
            <form className="login-box">
                <img src={logo} alt="logo" />
                <h2>Registrar</h2>
                <div className="group-input">
                    <label htmlFor="matricula">Matricula</label>
                    <input type="text" name="matricula" />
                </div>
                <div className="group-input">
                    <label htmlFor="Password">Password</label>
                    <input type="password" name="Password" />
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

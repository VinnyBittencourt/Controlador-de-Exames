import React, { useState, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import swal from "sweetalert";

import api from "../../services/api";

const Register: React.FC = () => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();

    async function handleRegister(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const data = {
            nome,
            email,
            password,
        };
        try {
            console.log(data);
            const respon = await api.post("/usuarios", data);
            console.log(respon);
            localStorage.setItem("IdUser", respon.data.id);
            localStorage.setItem("nameUser", respon.data.nome);
            swal(
                "Registration complete",
                "Thanks for using the Event Manager service!",
                "success"
            );

            history.push("/dashboard");
        } catch (err) {
            console.log(err);
            swal("Ops!", "Something went wrong", "error");
        }
    }

    return (
        <div className="bigcontainer">
            <div className="right_container">
                <img src="" alt="logo" />
                <h1>Welcome to Event Manager</h1>
                <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam.
                </p>
            </div>
            <div className="left_container">
                <form className="form" onSubmit={handleRegister}>
                    <h1>Register.</h1>
                    <p>
                        Enter your information to create your personal account.
                    </p>
                    <div className="group-form">
                        <label htmlFor="email">Your name</label>
                        <input
                            type="text"
                            name="name"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>
                    <div className="group-form">
                        <label htmlFor="email">Your e-mail</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="group-form">
                        <label htmlFor="pass">Password</label>
                        <input
                            type="password"
                            name="pass"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">Register</button>
                </form>
                <Link className="signup" to="/">
                    Already have an account? <FiLogOut />
                </Link>
            </div>
        </div>
    );
};

export default Register;

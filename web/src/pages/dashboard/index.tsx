import React, { useState, useEffect, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import {
    FiMapPin,
    FiPower,
    FiThumbsDown,
    FiThumbsUp,
    FiTrash2,
} from "react-icons/fi";

import api from "../../services/api";

import "./styles.css";
import swal from "sweetalert";

interface evento {
    name: string;
    id: string;
    criador_evento_id: string;
    place: string;
    likes: number;
    dislikes: number;
    picture_used: string;
    bio: string;
    created_at: string;
    updated_at: string;
}

const Dashboard: React.FC = () => {
    const [eventos, setEventos] = useState<evento[]>([]);

    const history = useHistory();
    const userJWT = localStorage.getItem("userJWT");

    useEffect(() => {
        async function loadData(): Promise<void> {
            const userJWT = await localStorage.getItem("userJWT");
            const response = await api.get("/eventos", {
                headers: {
                    Authorization: `Bearer ${userJWT}`,
                },
            });
            setEventos(response.data);
        }
        loadData();
    }, []);

    useEffect(() => {
        async function loadData(): Promise<void> {
            const userJWT = await localStorage.getItem("userJWT");
            const response = await api.get("/eventos", {
                headers: {
                    Authorization: `Bearer ${userJWT}`,
                },
            });
            setEventos(response.data);
        }
        loadData();
    }, [eventos]);

    async function handleDeleteEvent(id: string, criador: any) {
        try {
            const user = localStorage.getItem("IdUser");
            console.log("user", user);
            console.log(criador);
            if (user == criador) {
                // const config = {
                //     data: {
                //         usuario_logged: criador,
                //     },
                // };

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userJWT}`,
                    },
                };

                const usuario_logged = criador;
                console.log(config);
                const respoon = await api.delete(`/eventos/${id}`, config);
                setEventos(eventos.filter((even) => even.id !== id));
            }

            if (user != criador) {
                swal(
                    "Ops!",
                    "Only the creator of the event can delete it",
                    "error"
                );
            }
        } catch (err) {
            alert("Erro ao deletar o evento");
            console.log(err);
        }
    }

    async function handleLike(evento: string) {
        // e.preventDefault();

        const evento_id = evento;
        const usuario_id = localStorage.getItem("IdUser");

        const data = {
            evento_id,
            usuario_id,
        };

        try {
            console.log(data);
            const respon = await api.post("/likes", data, {
                headers: {
                    Authorization: `Bearer ${userJWT}`,
                },
            });
        } catch (error) {
            console.log(error);
            swal("Ops!", "Something went wrong", "error");
        }
    }

    async function handleDislike(evento: string) {
        // e.preventDefault();

        const evento_id = evento;
        const usuario_id = localStorage.getItem("IdUser");

        const data = {
            evento_id,
            usuario_id,
        };

        try {
            console.log(data);
            const respon = await api.post("/dislikes", data, {
                headers: {
                    Authorization: `Bearer ${userJWT}`,
                },
            });
        } catch (error) {
            console.log(error);
            swal("Ops!", "Something went wrong", "error");
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push("/");
    }

    return (
        <div className="center dashboard_container">
            <header>
                <h1>All Events</h1>
                <div className="right_header">
                    <Link className="Link_event" to="/newevent">
                        New event
                    </Link>
                    <button className="quit" onClick={handleLogout}>
                        <FiPower size={18} color="#6A2BB4"></FiPower>
                    </button>
                </div>
            </header>
            <div className="card_container">
                {eventos
                    .sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
                    .map((evento) => (
                        <div className="card" key={evento.id}>
                            <img src="" alt={evento.name} />
                            <h2>{evento.name}</h2>
                            <p className="card_text">{evento.bio}</p>
                            <div className="box-card">
                                <FiMapPin></FiMapPin>
                                <p>{evento.place}</p>
                            </div>
                            <div className="group-likes">
                                <button
                                    className="like"
                                    onClick={() => handleLike(evento.id)}
                                >
                                    <FiThumbsUp></FiThumbsUp> {evento.likes}{" "}
                                    Likes
                                </button>
                                <button
                                    className="dislike"
                                    onClick={() => handleDislike(evento.id)}
                                >
                                    <FiThumbsDown></FiThumbsDown>{" "}
                                    {evento.dislikes} Dislikes
                                </button>
                            </div>
                            <button
                                className="trash-ico"
                                type="button"
                                onClick={() =>
                                    handleDeleteEvent(
                                        evento.id,
                                        evento.criador_evento_id
                                    )
                                }
                            >
                                <FiTrash2 size={15}></FiTrash2>
                            </button>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Dashboard;

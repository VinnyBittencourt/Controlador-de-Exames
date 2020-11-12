import React, { useState, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import swal from "sweetalert";

import imgfestival from "../../assets/download.jpg";

import api from "../../services/api";

import "./styles.css";

const NewEvent: React.FC = () => {
    const [name, setName] = useState("");
    const [place, setPlace] = useState("");
    const [picture_used, setPicture] = useState();
    const [bio, setBio] = useState("");

    const history = useHistory();

    async function handleNewEvent(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const criador_evento_id = localStorage.getItem("IdUser");
        const userJWT = localStorage.getItem("userJWT");

        const data = {
            criador_evento_id,
            name,
            place,
            bio,
            picture_used,
        };
        // const form_data = new FormData();
        // form_data.append("picture_used", picture_used);

        try {
            console.log(data);
            const respon = await api.post("/eventos", data, {
                headers: {
                    Authorization: `Bearer ${userJWT}`,
                },
            });
            console.log(respon);
            swal(
                "New Event registration complete",
                "Go back to the dashboard to check it out!",
                "success"
            );
            history.push("/dashboard");
        } catch (error) {
            console.log(error);
            swal("Ops!", "Something went wrong", "error");
        }
    }

    function fileSelecetedHandler(event: any) {
        console.log(event.target.files[0]);
        setPicture(event.target.files[0]);
    }

    return (
        <div className="center dashboard_container">
            <header>
                <h1>New Event</h1>
                <Link to="/dashboard" className="Link">
                    <FiArrowLeft></FiArrowLeft>Go back
                </Link>
            </header>
            <div className="event_container">
                <form className="form-event" onSubmit={handleNewEvent}>
                    <h1>New Event.</h1>
                    <div className="group-form">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="group-form">
                        <label htmlFor="place">Place</label>
                        <input
                            type="text"
                            name="place"
                            value={place}
                            onChange={(e) => setPlace(e.target.value)}
                        />
                    </div>
                    <div className="group-form">
                        <label htmlFor="info">Information</label>
                        <textarea
                            name="info"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </div>
                    <div className="group-form">
                        <label htmlFor="pic">Picture</label>
                        <input
                            type="file"
                            name="pic"
                            className="file_input"
                            onChange={(e) => fileSelecetedHandler(e)}
                        />
                    </div>
                    <button type="submit">Add Event</button>
                </form>
            </div>
        </div>
    );
};

export default NewEvent;

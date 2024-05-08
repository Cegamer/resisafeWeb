import React, { useState, useEffect } from "react";
import "./ContactForm.css";
import api from "../../Utils/Api";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    idcontacto: 0,
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    console.log(JSON.stringify(formData))
    e.preventDefault();
    try {
      const response = await fetch(`${api}/Contacto`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("Se ha enviado su mensaje");
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
     
    }
  };

  return (
    <div style={{ maxWidth: "99%" }}>
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="wrapper">
            <div className="row no-gutters">
              <div className="col-lg-8 col-md-7 order-md-last d-flex align-items-stretch">
                <div className="contact-wrap w-100 p-md-5 p-4">
                    <h3 className="mb-4">Contáctanos</h3>
                    {errorMessage && (
                      <div className="alert alert-danger" role="alert">
                        {errorMessage}
                      </div>
                    )}
                    {successMessage && (
                      <div className="alert alert-success" role="alert">
                        {successMessage}
                      </div>
                    )}
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="label" htmlFor="name">
                              Nombre
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="nombre"
                              id="name"
                              placeholder="Nombre"
                              value={formData.nombre}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="label" htmlFor="email">
                              Email
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              name="email"
                              id="email"
                              placeholder="Email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label className="label" htmlFor="subject">
                              Asunto
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="asunto"
                              id="subject"
                              placeholder="Asunto"
                              value={formData.asunto}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label className="label" htmlFor="#">
                              Mensaje
                            </label>
                            <textarea
                              name="mensaje"
                              className="form-control"
                              id="message"
                              cols="30"
                              rows="4"
                              placeholder="Mensaje"
                              value={formData.mensaje}
                              onChange={handleChange}
                              required
                            ></textarea>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <input
                              type="submit"
                              value="Enviar Mensaje"
                              className="btn btn-primary"
                              onClick={handleSubmit}
                            />
                          </div>
                        </div>
                      </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-5 d-flex align-items-stretch">
                <div className="info-wrap bg-primary w-100 p-md-5 p-4">
                  <h3></h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;

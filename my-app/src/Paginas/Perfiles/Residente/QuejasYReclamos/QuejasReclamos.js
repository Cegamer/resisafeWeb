import React, { useState } from "react";
import "./RegistarVisitantes.css";
import { InputCard } from "../../../../Components/InputCard/Index";
import { handlePostData } from "../../../../Utils/handlePostData";

const QuejasReclamos = () => {
  const [values, setValues] = React.useState({
    idquejasReclamos: 0,
    idTipo: 0,
    quejaReclamo: "",
    idConjunto: 0,
  });


  const [textoQueja, setTextoQueja] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const options = [
    { key: '1', value: 'Problemas de mantenimiento' },
    { key: '2', value: 'Servicios comunitarios deficientes' },
    { key: '3', value: 'Ruido excesivo' },
    { key: '4', value: 'Problemas de seguridad' },
    { key: '5', value: 'Inconvenientes con las instalaciones' }
  ];
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const [error, setError] = React.useState("");

  const handleRegistarVisitante = async (event) => {
    event.preventDefault();
    const selectedOptionObject = options.find(option => option.key === selectedOption);

    const data = {
      ...values,
      idquejasReclamos: 0,
      idTipo: selectedOptionObject.key,
      quejaReclamo: textoQueja,
      idConjunto: localStorage.getItem("ActualConjuntoId"),
    };

    await handlePostData(event, data, "/QuejasReclamos");
  };

  const handleTextareaChange = (event) => {
    setTextoQueja(event.target.value);
  };
  return (
    <div>
      <h1>Poner Queja o Reclamo</h1>
      <label htmlFor="selector" className="selector-label">Selecciona una opción:</label>
      <select id="selector" value={selectedOption} onChange={handleSelectChange} className="selector-dropdown">
        <option value="">Selecciona una opción</option>
        {options.map(option => (
          <option key={option.key} value={option.key}>{option.value}</option>
        ))}
      </select>
      {selectedOption && <p className="selected-option">Seleccionaste: {options.find(option => option.key === selectedOption)?.value}</p>}
      {selectedOption && <p className="selected-key">Key de la opción seleccionada: {selectedOption}</p>}

      <form onSubmit={handleRegistarVisitante}>
      
      <textarea 
        value={textoQueja}
        onChange={handleTextareaChange}
        placeholder="Escribe tu mensaje aquí..."
        className="textarea"
      />
              <button type="submit" className="boton-guardar">
          Guardar
        </button>
      </form>
    </div>
  );
};
export default QuejasReclamos;

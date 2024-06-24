import React, { useState } from 'react';
import './Recuperar.css';
import { Link } from 'react-router-dom';

function Recuperar() {
  const [nombre, setNombre] = useState('');
  const [documento, setDocumento] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para simular la recuperación de contraseña
    if (nombre === 'Sara' && documento === '1017062044') {
      setContrasena('123'); // Simulamos que la contraseña es esta
      setMensaje('Tu contraseña es: 123');
    } else {
      setMensaje('No se encontraron coincidencias. Por favor, verifica tu nombre y documento.');
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Recuperar Contraseña</h1>
        <p>{mensaje}</p>
        <div className="input-box">
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="input-box">
          <input
            type="text"
            placeholder="Documento"
            value={documento}
            onChange={(e) => setDocumento(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn">Recuperar Contraseña</button>
        <Link to="/" className="return-link">REGRESAR</Link>
      </form>
      {contrasena && <p className="contrasena-info">Tu contraseña es: {contrasena}</p>}

    </div>
  );
}

export default Recuperar;

import React, { useState } from 'react';
import './IndexJefe.css';  // Asegúrate de que el archivo CSS está correctamente vinculado

function Indexjefe() {
  const [showDamasDropdown, setShowDamasDropdown] = useState(false);
  const [showCaballeroDropdown, setShowCaballeroDropdown] = useState(false);

// Función para manejar el cierre de sesión con confirmación
const handleLogout = () => {
  const confirmLogout = window.confirm("¿Está seguro que desea cerrar sesión?");
  if (confirmLogout) {
    console.log("Cerrando sesión...");
    localStorage.removeItem('userToken');
    localStorage.setItem('sessionClosed', 'true');
    window.location.replace('/');
  }
};
  

  return (
    <div>
      <nav className="navbar">
        <div className="brand-logo">
          Sport<span className="brand-highlight">Line</span>
        </div>
        <ul>
          <li onClick={() => setShowDamasDropdown(!showDamasDropdown)}>
            <a href="#dama">Damas</a>
            {showDamasDropdown && (
              <div className="dropdown-content">
                <a href="/AdidasDamasj">Adidas</a>
                <a href="/NikeDamasj">Nike</a>
                <a href="/FilaDamasj">Fila</a>
                <a href="/Jordandamasj">Jordan</a>
              </div>
            )}
          </li>
          <li onClick={() => setShowCaballeroDropdown(!showCaballeroDropdown)}>
            <a href="#caballero">Caballero</a>
            {showCaballeroDropdown && (
              <div className="dropdown-content">
                <a href="/AdidasCaballerosj">Adidas</a>
                <a href="/NikeCaballerosj">Nike</a>
                <a href="/FilaCaballerosj">Fila</a>
                <a href="JordanCaballerosj">Jordan</a>
              </div>
            )}
          </li>
          <li><a href="/Usuarios">Usuarios</a></li>
        </ul>
        <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
      </nav>
      <div className="banner-container">
        <img src="../img/banner3.png" alt="Banner" className="banner"/>
      </div>
    </div>
  );
}

export default Indexjefe;

import React, { useState, useEffect } from 'react';
import './IndexBodega.css';

function IndexBodega() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showDamasDropdown, setShowDamasDropdown] = useState(false);
  const [showCaballeroDropdown, setShowCaballeroDropdown] = useState(false);
  const [paused, setPaused] = useState(false);

  const slides = [
    '../img/Banner.jpeg',
    '../img/banner2.png',
    '../img/banner3.png',
    '../img/banner4.png'
  ];

  // Cambiar slide automáticamente cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        setCurrentSlide((prevSlide) =>
          prevSlide === slides.length - 1 ? 0 : prevSlide + 1
        );
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [paused, slides.length]);

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

  // Función para cambiar manualmente el slide
  const handleSetSlide = (index) => {
    setCurrentSlide(index);
    setPaused(true); // Pausar el ciclo automático
    setTimeout(() => setPaused(false), 5000); // Reanudar el ciclo automáticamente después de 5 segundos
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
                <a href="/AdidasDamasB">Adidas</a>
                <a href="/NikeDamasB">Nike</a>
                <a href="/FilaDamasB">Fila</a>
                <a href="/JordandamasB">Jordan</a>
              </div>
            )}
          </li>
          <li onClick={() => setShowCaballeroDropdown(!showCaballeroDropdown)}>
            <a href="#caballero">Caballero</a>
            {showCaballeroDropdown && (
              <div className="dropdown-content">
                <a href="/AdidasCaballerosB">Adidas</a>
                <a href="/NikeCaballerosB">Nike</a>
                <a href="/FilaCaballerosB">Fila</a>
                <a href="/JordanCaballerosB">Jordan</a>
              </div>
            )}
          </li>
          <li><a href="Bodegas">Bodega</a></li>
        </ul>
        <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
      </nav>
      <div className="banner-container">
        <img src={slides[currentSlide]} alt="Banner" className="banner" />
        <div className="banner-navigation">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`nav-button ${index === currentSlide ? 'active' : ''}`}
              onClick={() => handleSetSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default IndexBodega;
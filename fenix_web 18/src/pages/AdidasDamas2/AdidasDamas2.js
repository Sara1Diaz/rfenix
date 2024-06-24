import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './AdidasDamas2.css';

const SizeButton = ({ size, selectedSize, handleSizeSelect }) => {
  return (
    <button
      className={`size-button ${selectedSize === size ? 'selected' : ''}`}
      onClick={() => handleSizeSelect(size)}
    >
      {size}
    </button>
  );
};

const AdidasDamas1 = () => {
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(100);
  const [price, setPrice] = useState(320.00); // Precio inicial

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setPrice(59.99);
  };

  return (
    <div className="container">
      <h1 className="title"> Adidas Damas</h1>
      <div className="content">
        <div className="carousel-container">
          <Link to="/adidasdamasb" className="back-link">Volver atrás</Link>
          <Carousel 
            showArrows={true} 
            dynamicHeight={true} 
            infiniteLoop={true} 
            useKeyboardArrows={true} 
            autoPlay={true} 
            interval={3000}
            showThumbs={false}
          >
            <div>
              <img src="../img/damas/adidas/TENIS FORUM BONEGA/1.png" alt="Imagen 1" className="carousel-image" />
            </div>
            <div>
              <img src="../img/damas/adidas/TENIS FORUM BONEGA/2.png" alt="Imagen 2" className="carousel-image" />
            </div>
            <div>
              <img src="../img/damas/adidas/TENIS FORUM BONEGA/3.png" alt="Imagen 3" className="carousel-image" />
            </div>
            <div>
              <img src="../img/damas/adidas/TENIS FORUM BONEGA/4.png" alt="Imagen 4" className="carousel-image" />
            </div>
          </Carousel>
        </div>
        <div className="details">
          <h2 className="product-title">TENIS FORUM BONEGA</h2>
          <p><strong>Precio:</strong> ${price.toFixed(2)}</p>
          <div className="size-container">
            <p><strong>Tallas disponibles:</strong></p>
            <div className="size-buttons">
              {['36', '37', '38', '39', '40'].map(size => (
                <SizeButton
                  key={size}
                  size={size}
                  selectedSize={selectedSize}
                  handleSizeSelect={handleSizeSelect}
                />
              ))}
            </div>
          </div>
          <div className="quantity-container">
            <p><strong>Cantidad:</strong> {quantity}</p>
          </div>
          <div className="description">
            <h3 className="description-title">Descripción</h3>
            <p className="description-content">Transforma tu estilo con los inconfundibles tenis adidas Forum Bonega. Elevándose sobre una audaz suela plataforma, añaden proporciones expresivas a una de nuestras siluetas clásicas de baloncesto. El emblemático detalle en X presenta un estampado monocromático del Trifolio en relieve sutil, aportando un toque de vanguardia. Combinado con las 3 Rayas en contraste, ofrece infinitas posibilidades para crear looks únicos y versátiles. </p>
          </div>
          <div className="specifications">
            <h3 className="specifications-title">Especificaciones</h3>
            <ul className="specifications-content">
              <li>Color: Blanco y </li>
              <li>Género: Mujer</li>
              <li>Material exterior: Cuero sintético</li>
              <li>Suela: Caucho</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdidasDamas1;

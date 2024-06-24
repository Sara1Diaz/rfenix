import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './AdidasCaballeros1.css';

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



const AdidasCaballeros1 = () => {
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity] = useState(100);
  const [price, setPrice] = useState(120.00); // Precio inicial

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setPrice(59.99);
  };


  return (
    <div className="container">
      <h1 className="title">Adidas Caballeros</h1>
      <div className="content">
        <div className="carousel-container">
          <Link to="/adidascaballerosb" className="back-link">Volver atrás</Link>
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
              <img src="../img/caballeros/adidas/Tarjeta 1/lado 1.jpeg" alt="Imagen 1" className="carousel-image" />
            </div>
            <div>
              <img src="../img/caballeros/adidas/Tarjeta 1/lado 2.png" alt="Imagen 2" className="carousel-image" />
            </div>
            <div>
              <img src="../img/caballeros/adidas/Tarjeta 1/lado 3.png" alt="Imagen 3" className="carousel-image" />
            </div>
            <div>
              <img src="../img/caballeros/adidas/Tarjeta 1/lado 4.png"alt="Imagen 4" className="carousel-image" />
            </div>
          </Carousel>
        </div>
        <div className="details">
          <h2 className="product-title">ZAPATILLAS BOOST</h2>
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
            <label><strong>Cantidad:</strong></label>{quantity}
          </div>
          <div className="description">
            <h3 className="description-title">Descripción</h3>
            <p className="description-content">Este producto, hecho con una serie de materiales reciclados, cuenta con un exterior que incorpora al menos un 50 % de contenido reciclado. .</p>
          </div>
          <div className="specifications">
            <h3 className="specifications-title">Especificaciones</h3>
            <ul className="specifications-content">
            <li> <strong>Material exterior:</strong>malla</li>
                <li> <strong>Material interior:</strong> textil</li>
                <li> <strong>Material de la suela:</strong> goma</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}



export default AdidasCaballeros1;

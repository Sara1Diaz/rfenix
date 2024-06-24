import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './FilaCaballeros1.css';

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



const FilaCaballeros1 = () => {
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(100);
  const [price, setPrice] = useState(200.00); // Precio inicial

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setPrice(59.99);
  };


  return (
    <div className="container">
      <h1 className="title">Fila Caballeros</h1>
      <div className="content">
        <div className="carousel-container">
          <Link to="/filacaballerosb" className="back-link">Volver atrás</Link>
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
              <img src="../img/caballeros/Fila/Tarjeta 1/lado 1.png"  alt="Imagen 1" className="carousel-image" />
            </div>
            <div>
              <img src="../img/caballeros/Fila/Tarjeta 1/lado 2.png" alt="Imagen 2" className="carousel-image" />
            </div>
            <div>
              <img src="../img/caballeros/Fila/Tarjeta 1/lado 3 .png" alt="Imagen 3" className="carousel-image" />
            </div>

          </Carousel>
        </div>
        <div className="details">
          <h2 className="product-title">Tenis Naster Bla-gri</h2>
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
            <p className="description-content">Este estilo informal cuenta con una capellada compuesta 100% por materiales sinteticos que te haran lucir con gran estilo en tu día a día, el contraste de colores le da un toque casual y deportivo, interior textil y plantilla </p>
          </div>
          <div className="specifications">
            <h3 className="specifications-title">Especificaciones</h3>
            <ul className="specifications-content">
            <li> <strong>Ajuste clásico</strong></li>
                <li> <strong>Sistema de amarre de cordones</strong> </li>
                <li> <strong>Suela: </strong>Caucho </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}


export default FilaCaballeros1;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './JordanDamas4.css';

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

const  JordanDamas4 = () => {
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(100);
  const [price, setPrice] = useState(480.00); // Precio inicial

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setPrice(100000); // Precio cuando se selecciona una talla
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    setQuantity(newQuantity);
  };

  return (
    <div className="container">
      <h1 className="title">Jordan Damas</h1>
      <div className="content">
        <div className="carousel-container">
          <Link to="/JordandamasB" className="back-link">Volver atrás</Link>
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
              <img src="../img/damas/jordan/Air Jordan 1 Mid/1.PNG" alt="Imagen 1" className="carousel-image" />
            </div>
            <div>
              <img src="../img/damas/jordan/Air Jordan 1 Mid/3.PNG" alt="Imagen 2" className="carousel-image" />
            </div>
            <div>
              <img src="../img/damas/jordan/Air Jordan 1 Mid/2.PNG" alt="Imagen 3" className="carousel-image" />
            </div>
            
          </Carousel>
        </div>
        <div className="details">
          <h2 className="product-title">Air Jordan 1 Mid</h2>
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
            <p><strong>Cantidad:</strong></p>{quantity}

          </div>
          <div className="description">
            <h3 className="description-title">Descripción</h3>
            <p className="description-content">zapatillas tipo bota las mas vendidas hoy en dia con colores espectaculares y seimpre lucen bien  </p>
          </div>
          <div className="specifications">
            <h3 className="specifications-title">Especificaciones</h3>
            <ul className="specifications-content">
              <li>Color:  azul cielo</li>
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

export default JordanDamas4;


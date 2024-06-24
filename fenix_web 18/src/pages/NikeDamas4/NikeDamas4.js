import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './NikeDamas4.css';

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

const  NikeDamas4= () => {
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(100);
  const [price, setPrice] = useState(120.00); // Precio inicial

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setPrice(59.99); // Precio cuando se selecciona una talla
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    setQuantity(newQuantity);
  };

  return (
    <div className="container">
      <h1 className="title">Nike Damas</h1>
      <div className="content">
        <div className="carousel-container">
          <Link to="/NikeDamasB" className="back-link">Volver atrás</Link>
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
              <img src="../img/damas/nike/Nike Vomero/lado derecho.jpeg" alt="Imagen 1" className="carousel-image" />
            </div>
            <div>
              <img src="../img/damas/nike/Nike Vomero/atras.jpeg" alt="Imagen 2" className="carousel-image" />
            </div>
            <div>
              <img src="../img/damas/nike/Nike Vomero/abajo.jpeg" alt="Imagen 3" className="carousel-image" />
            </div>
            <div>
             
            </div>
          </Carousel>
        </div>
        <div className="details">
          <h2 className="product-title">Nike Vomero </h2>
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
            <p className="description-content">zapatillas deportivas super comodas y confortantes perfectas para correr </p>
          </div>
          <div className="specifications">
            <h3 className="specifications-title">Especificaciones</h3>
            <ul className="specifications-content">
              <li>Color:blancas con tono azul</li>
              <li>Género: Mujer</li>
              <li>Material exterior:cuero sintetico</li>
              <li>Suela: Caucho</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NikeDamas4;


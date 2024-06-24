import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import './AdidasDamas3.css';

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

const AdidasDamas3 = () => {
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(100);
  const [price, setPrice] = useState(150.00); // Precio inicial

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
              <img src="../img/damas/adidas/TENIS CONTINENTAL VULC/1.png" alt="Imagen 1" className="carousel-image" />
            </div>
            <div>
              <img src="../img/damas/adidas/TENIS CONTINENTAL VULC/2.png" alt="Imagen 2" className="carousel-image" />
            </div>
            <div>
              <img src="../img/damas/adidas/TENIS CONTINENTAL VULC/3.png" alt="Imagen 3" className="carousel-image" />
            </div>
            <div>
              <img src="../img/damas/adidas/TENIS CONTINENTAL VULC/4.png" alt="Imagen 4" className="carousel-image" />
            </div>
          </Carousel>
        </div>
        <div className="details">
          <h2 className="product-title">TENIS CONTINENTAL VULC</h2>
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
            <p className="description-content">El estilo casual de los tenis Continental Vulc te transporta al pasado. Este modelo combina la funcionalidad del gimnasio con la libertad del skate. Su diseño en suave gamuza proporciona una sensación aterciopelada al tacto. </p>
          </div>
          <div className="specifications">
            <h3 className="specifications-title">Especificaciones</h3>
            <ul className="specifications-content">
              <li>Color: grises</li>
              <li>Género: Mujer</li>
              <li>Material exterior: terciopelo</li>
              <li>Suela: Suela de caucho vulcanizada</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdidasDamas3;


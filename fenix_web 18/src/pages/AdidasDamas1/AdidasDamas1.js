import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './AdidasDamas1.css';

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
  const [price, setPrice] = useState(190.00); // Precio inicial

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
      <h1 className="title">Adidas Damas</h1>
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
              <img src="../img/damas/adidas/TENIS HOOPS 3.0 BOLD/angulo.png" alt="Imagen 1" className="carousel-image" />
            </div>
            <div>
              <img src="../img/damas/adidas/TENIS HOOPS 3.0 BOLD/atras.png" alt="Imagen 2" className="carousel-image" />
            </div>
            <div>
              <img src="../img/damas/adidas/TENIS HOOPS 3.0 BOLD/de lado.png" alt="Imagen 3" className="carousel-image" />
            </div>
            <div>
              <img src="../img/damas/adidas/TENIS HOOPS 3.0 BOLD/parado.png" alt="Imagen 4" className="carousel-image" />
            </div>
          </Carousel>
        </div>
        <div className="details">
          <h2 className="product-title">TENIS HOOPS 3.0 BOLD</h2>
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
            <p className="description-content">estos tenis adidas tienen un forro interno de malla para ofrecer una comodidad excepcional durante todo el día. Las 3 Rayas resaltan sobre la parte superior de cuero sintético para un toque adicional de estilo sutil. La suela de caucho tiene un poco más de altura para un acabado moderno. </p>
          </div>
          <div className="specifications">
            <h3 className="specifications-title">Especificaciones</h3>
            <ul className="specifications-content">
              <li>Color: Blanco y rosa</li>
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

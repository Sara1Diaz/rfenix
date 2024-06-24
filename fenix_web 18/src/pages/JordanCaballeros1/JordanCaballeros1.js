import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './JordanCaballeros1.css';

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


const JordanCaballeros1= () => {
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(100);
  const [price, setPrice] = useState(350.00); // Precio inicial

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setPrice(59.99);
  };


  return (
    <div className="container">
      <h1 className="title">Jordan Caballeros</h1>
      <div className="content">
        <div className="carousel-container">
          <Link to="/jordancaballerosb" className="back-link">Volver atrás</Link>
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
              <img src="../img/caballeros/Jordan/Tarjeta 1/lado 1.png"  alt="Imagen 1" className="carousel-image" />
            </div>
            <div>
              <img src="../img/caballeros/Jordan/Tarjeta 1/lado 2.png" alt="Imagen 2" className="carousel-image" />
            </div>
            <div>
              <img src="../img/caballeros/Jordan/Tarjeta 1/lado 3 .png" alt="Imagen 3" className="carousel-image" />
            </div>

          </Carousel>
        </div>
        <div className="details">
          <h2 className="product-title">Air Jordan 1 Retro High OG</h2>
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
            <p className="description-content">Esta versión de los AJ1 reinventa el primer modelo exclusivo de Mike con una nueva combinación de colores. Los materiales premium, la amortiguación suave y el cuello acolchado en el tobillo brindan máximo soporte y rinden homenaje a los tenis que lo iniciaron todo. </p>
          </div>
          <div className="specifications">
            <h3 className="specifications-title">Especificaciones</h3>
            <ul className="specifications-content">
            <li> <strong>Ajuste clásico con bota </strong></li>
            <li> <strong>Sistema de amarre de cordones</strong> </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JordanCaballeros1;


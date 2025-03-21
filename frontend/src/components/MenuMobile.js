import React, { useState } from 'react';
import '../styles/components/_MenuMobile.scss';

const MenuMobile = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="menu-mobile">
            <div className="menu-mobile__logo">LOGO EMPRESA</div>
            <div className={`menu-mobile__hamburguer ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <div className="hamburguer-line"></div>
                <div className="hamburguer-line"></div>
                <div className="hamburguer-line"></div>
            </div>
            <div className={`menu-mobile__items ${isMenuOpen ? 'open' : ''}`}>
                <div className="menu-mobile__item">Inicio</div>
                <div className="menu-mobile__item">Item menú 2</div>
                <div className="menu-mobile__item">Item menú 3</div>
                <div className="menu-mobile__item">Item menú 4</div>
                <div className="menu-mobile__item">Item menú 5</div>
                <div className="menu-mobile__item">Item menú 6</div>
            </div>
        </div>
    );
};

export default MenuMobile;
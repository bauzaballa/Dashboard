import React from 'react';
import axios from 'axios';
import '../styles/components/_Menu.scss';

import home from '../assets/icons/item1.png';
import item2 from '../assets/icons/item2.png';
import item3 from '../assets/icons/item3.png';
import item4 from '../assets/icons/item4.png';
import item5 from '../assets/icons/item5.png';
import item6 from '../assets/icons/item6.png';
import notificationIcon from '../assets/icons/notification.png';
import logoutIcon from '../assets/icons/sesion.png';

const Menu = () => {
    const handleReadVentas = async () => {
        try {
            const response = await axios.get('/api/ventas');
            console.log('Ventas:', response.data);
        } catch (error) {
            console.error('Error al obtener las ventas:', error);
        }
    };

    const handleReadGastos = async () => {
        try {
            const response = await axios.get('/api/gastos');
            console.log('Gastos:', response.data);
        } catch (error) {
            console.error('Error al obtener los gastos:', error);
        }
    };

    return (
        <div className="menu">
            <div className="menu__logo">
                <div className='logoEmpresa'></div>
                <span>LOGO EMPRESA</span>
                <img src={notificationIcon} alt="Notificaciones" />
            </div>
            <div className="menu__items">
                <div className="menu__item active">
                    <img src={home} alt="Inicio" />
                    <span>Inicio</span>
                </div>
                <div className="menu__item" onClick={handleReadVentas}>
                    <img src={item2} alt="Leer Ventas" />
                    <span>Leer Ventas</span>
                </div>
                <div className="menu__item" onClick={handleReadGastos}>
                    <img src={item3} alt="Leer Gastos" />
                    <span>Leer Gastos</span>
                </div>
                <div className="menu__item">
                    <img src={item4} alt="Item menú 4" />
                    <span>Item menú 4</span>
                </div>
                <div className="menu__item">
                    <img src={item5} alt="Item menú 5" />
                    <span>Item menú 5</span>
                </div>
                <div className="menu__item">
                    <img src={item6} alt="Item menú 6" />
                    <span>Item menú 6</span>
                </div>
            </div>
            <div className="menu__logout">
                <img src={logoutIcon} alt="Cerrar sesión" />
                <span>Cerrar sesión</span>
            </div>
        </div>
    );
};

export default Menu;
import React, { useState, useEffect } from 'react';
import Menu from './Menu';
import MenuMobile from './MenuMobile';
import Metricas from './Metricas';
import '../styles/components/_MainContainer.scss';

const MainContainer = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="main-container">
            {isMobile ? <MenuMobile /> : <Menu />}
            <Metricas />
        </div>
    );
};

export default MainContainer;
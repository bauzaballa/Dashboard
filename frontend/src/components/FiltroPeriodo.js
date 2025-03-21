import React from 'react';

const FiltroPeriodo = ({ periodo, onChange }) => {
    return (
        <div className='contenedor-periodo'>
            <select value={periodo} onChange={(e) => onChange(e.target.value)}>
                <option value="año">Anual</option>
                <option value="mes">Mensual</option>
            </select>
        </div>
    );
};

export default FiltroPeriodo;
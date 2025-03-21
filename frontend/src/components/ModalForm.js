import React, { useState, useEffect } from 'react';
import '../styles/components/_ModalForm.scss';

const ModalForm = ({ isOpen, onClose, onSubmit, initialData, mode }) => {
    const [formData, setFormData] = useState(initialData);

    useEffect(() => {
        setFormData(initialData);
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <form onSubmit={handleSubmit}>
                    <label>
                        Monto ARS:
                        <input
                            type="number"
                            name="monto_ars"
                            value={formData.monto_ars}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Monto USD:
                        <input
                            type="number"
                            name="monto_usd"
                            value={formData.monto_usd}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Fecha:
                        <input
                            type="date"
                            name="fecha"
                            value={formData.fecha}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Moneda:
                        <select
                            name="moneda"
                            value={formData.moneda}
                            onChange={handleChange}
                        >
                            <option value="ARS">ARS</option>
                            <option value="USD">USD</option>
                        </select>
                    </label>
                    <button type="submit">{mode === 'create' ? 'Crear' : 'Actualizar'}</button>
                </form>
            </div>
        </div>
    );
};

export default ModalForm;
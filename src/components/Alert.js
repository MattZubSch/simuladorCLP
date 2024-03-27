import React from 'react';
import { useNavigate } from 'react-router-dom';

const Alert = ({ message, redirectPath }) => {
    const navigate = useNavigate()
    

  const handleConfirm = () => {
    // Redirige a la página especificada al confirmar
    navigate(redirectPath)
  };

  const handleCancel = () => {
    // Puedes agregar lógica adicional si es necesario
  };

  return (
    <Alert>
        <dialog>
        <p>{message}</p>
        <button onClick={handleConfirm}>Confirmar</button>
        <button onClick={handleCancel}>Cancelar</button>
        </dialog>
    </Alert>
  );
};

export default Alert;
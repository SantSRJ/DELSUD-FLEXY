import React, { useState } from "react";
import styles from "./Form.css";
import icono from "../../assets/miIcono.png";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"; 

export const Form = () => {
  //Creación de los diferentes estados para los input
  const [imagen, setImagen] = useState(null);
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [errores, setErrores] = useState({});
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const [formulario, setFormulario] = useState({
    imagen: "",
    nombreApellido: "",
    telefono: "",
    email: "",
    contrasena: "",
  });

  //Control del icono del ojo para ver u ocultar la password
  const toggleMostrarContrasena = () => {
    setMostrarContrasena((prevMostrarContrasena) => !prevMostrarContrasena);
  };
  //Control de la carga de imagen 
  const handleImagenChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrores({ imagen: 'Por favor, selecciona un archivo de imagen válido.' });
        setImagen(null); // Limpiar la imagen en caso de error
        return;
      }
      const maxSize = 1024 * 1024; // 1MB
      if (file.size > maxSize) {
        setErrores({ imagen: 'La imagen es demasiado grande. Por favor, selecciona una imagen más pequeña.' });
        return;
      }
      const reader = new FileReader();

      reader.onload = (e) => {
        setImagen(e.target.result);
        setErrores({}); // Limpiar errores al cargar la imagen con éxito
      };
      reader.readAsDataURL(file);
    }
  };
  
  //AQUÍ COMIENZAN LAS VALIDACIONES
  const validarContrasena = (contrasena) => {
    return contrasena.length >= 8;
  };
  const validarTelefono = (telefono) => {
    
    // Validar que el teléfono tenga al menos 10 dígitos
    return /^\d{10,}$/.test(telefono);
  };
  
  const validarFormulario = () => {
    const nuevosErrores = {};
    
    // Validar nombre y apellido
    if (!formulario.nombreApellido.trim()) {
      nuevosErrores.nombreApellido = 'El nombre y apellido son requeridos.';
    } else if (
      !/^[a-zA-Z\s]+$/.test(formulario.nombreApellido)//Solo acepta Strings sin numeros ni simbolos
    ) {
      nuevosErrores.nombreApellido = 'El nombre y apellido ingresado no es válido';
    }
    
    // Validar email
    if (!formulario.email.trim()) {
      nuevosErrores.email = 'El email es requerido.';
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(formulario.email)//Reconoce la falta del @ y debe continuar luego de ese simbolo
    ) {
      nuevosErrores.email = 'El email ingresado no es válido.';
    }
    
    // Validar teléfono
    if (!validarTelefono(formulario.telefono)) {
      nuevosErrores.telefono = 'El teléfono debe tener al menos 10 dígitos.';
    } //Validar telefono es un regex de minimo 10 digitos, sino se cumple el requisito, el codigo entiende que no se valida el telefono y lanza el mensaje de error.
    
    // Validar contraseña
    if (!validarContrasena(formulario.contrasena)) {
      nuevosErrores.contrasena = 'La contraseña debe tener al menos 8 caracteres.';
    }//Funciona de manera similar que la validacion del telefono, solo que aqui se permiten mezclar letras, numeros, simbolos, mayusculas y minusculas.
    
    // Actualizar el estado de errores
    setErrores(nuevosErrores);

    // Devolver verdadero si no hay errores, funcion necesaria para validar el formulario
    return Object.keys(nuevosErrores).length === 0;
  };
  
  //Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //Reseteo del formulario si la validacion es positiva
    if (validarFormulario()) {
      setRegistroExitoso(true);
      // Reiniciar el formulario
      setFormulario({
        imagen: '',
        nombreApellido: '',
        telefono: '',
        email: '',
        contrasena: '',
      });
      // Limpiar los errores
      setErrores({});
      alert('Se ha registrado con éxito');
    } else {
      console.log('Formulario inválido');
    };
  };

  return (
    <div className="title-container" style={ styles }>
      <form className="formulario-container" onSubmit={handleSubmit}>
        <div className="encabezado">
          <h1 className="title">¡Bienvenido!</h1>
          <h3 className="title">Convertite ahora en un agente Flexy.</h3>
          <div className="profile-upload-button">
          <button className="button-img" type="button" >
          {imagen ? (
            <img className="profile-image" src={imagen} alt="imagen de perfil" />
            ) : (
          <label htmlFor="input-imagen">
            <img className="profile-image" src={icono} alt="imagen icono" />
          </label>
            )}
          </button>
            <input
              id="input-imagen"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImagenChange}
            />
            <p className="span-img" style={{ color: errores.imagen ? '#FF0000' : 'inherit' }}>{errores.imagen ? errores.imagen : 'Subí tu foto de perfil'}</p>
          </div>
        </div>
      
        <div className="campo">
          <label htmlFor="nombreApellido">
            <input
              type="text"
              id="nombreApellido"
              name="nombreApellido"
              placeholder="   Nombre y Apellido"
              value={formulario.nombreApellido}
              onChange={handleChange}
              required
            />
          </label>
          {errores.nombreApellido && <span>{errores.nombreApellido}</span>}
        </div>

        <div className="campo">
          <label htmlFor="telefono">
            <input
              type="number"
              id="telefono"
              name="telefono"
              placeholder="   +54 01 0200 000"
              value={formulario.telefono}
              onChange={handleChange}
              required
            />
          </label>
          {errores.telefono && <span>{errores.telefono}</span>}
        </div>

        <div className="campo">
          <label htmlFor="email">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="   hola@tuemail.com"
              value={formulario.email}
              onChange={handleChange}
              required
            />
          </label>
          {errores.email && <span>{errores.email}</span>}
        </div>

        <div className="campo">
          <label htmlFor="contrasena">
            <input
              type={mostrarContrasena ? 'text' : 'password'}
              id="contrasena"
              name="contrasena"
              placeholder="   Ingresá tu contraseña"
              value={formulario.contrasena}
              onChange={handleChange}
              required
            />
            <div className="icono-ojo" onClick={toggleMostrarContrasena}>
              {mostrarContrasena ? (
                <AiOutlineEye />
                ) : (
                <AiOutlineEyeInvisible />
              )}
            </div>
          </label>
          {errores.contrasena && <span>{errores.contrasena}</span>}
        </div>
        <div className="campo">
          <div className="footer-form">
            <span className="span-register1">Debe tener al menos 8 caracteres.</span>
            <span className="span-register3">¿Olvidaste tu contraseña?</span>
            <button className="register" type="submit">Registrate</button>
            <span className="span-register2">¿Ya tenés una cuenta? <a href="/login">Iniciá sesión</a></span>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Form;
export const validate = (formData: any) => {
    const errors: { [key: string]: string } = {};
  
    // Expresiones regulares para validación
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    const phoneRegex = /^\d{10}$/;
  
    // Validación de cada campo
    if (!emailRegex.test(formData.email)) {
      errors.email = 'Ingrese un correo electrónico válido';
    }
    if (!passwordRegex.test(formData.password)) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres y contener al menos un número, una letra mayúscula y una minúscula';
    }
    
    if (!phoneRegex.test(formData.phone)) {
      errors.phone = 'Ingrese un número de teléfono válido de 10 dígitos';
    }
   
  
    return errors;
  };
  
export default validate;
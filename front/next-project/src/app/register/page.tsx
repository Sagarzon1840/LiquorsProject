'use client'
import React from "react";
//HOOKS
import { useState} from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
//INTERFACES DATOS
import { Register} from "@/interfaces/interfaz";
//FUNCION PARA VALIDAR FORM.
import validate from "@/utils/validate";



const RegisterComponent: React.FC = (): React.ReactNode => {
  //ESTADOS
  const [formData, setFormData] = useState<Register>({
    name: '',
    email: '',
    password: '',
  });

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  //EVENT HANDLER LLENADO DE INPUTS
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    //VALIDACION DE ERRORES DE INPUTS
    const newErrors = validate({ ...formData, [name]: value }); //--> envio obeto que contiene los datos del form actualizados
    setErrors({ ...errors, [name]: newErrors[name] || '' }); //--> actualiza el estado de errores con los errores encontrados, de no haber 
                                                                // errores se establece cadena vacia.
  };

  //EVENT HANDLER ENVIO FORMULARIO 
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    //registerUser(formData, setIsSuccess, setErrors, router, errors, setIsLoading); --> FUNCION ASYNC API: Hace POST API, se encarga de setear estados, 
    setTimeout(() => {
      router.push("/");
    }, 3000)
  };

  return (
    <div className="flex justify-center items-center  text-center pt-32 pb-32 bg-white">
        <div className="justify-start justmt-0 mr-32">
          <h1 className="pb-8 text-gray-600 text-6xl font-normal">Unite a </h1><p className="text-wine pb-8 font-Lato text-6xl">Liquors</p>
        </div>

        <div className="rounded border border-wine">
          <form className="justify-end p-12" onSubmit={handleSubmit}>

            <div className="pb-2">
              <input
                className="w-full p-3 rounded border border-gray-400 outline-none hover:border-wine hover:ring-1 hover:ring-wine focus:border-wine focus:ring-2 focus:ring-wine transition duration-200"
                type="text"
                value={formData.name}
                name="name"
                placeholder="Nombre"
                onChange={handleChange}
              />
            </div>

            <div className="pb-2">
              <input
                className=" p-3 rounded border w-full border-gray-400 outline-none hover:border-wine hover:ring-1 hover:ring-wine focus:border-wine focus:ring-2 focus:ring-wine transition duration-200"
                type="text"
                value={formData.email}
                name="email"
                placeholder="Email"
                onChange={handleChange}
              />
            </div>

            <div className="pb-2">
              <input
                className=" p-3 rounded border border-gray-400 w-full outline-none hover:border-wine hover:ring-1 hover:ring-wine focus:border-wine focus:ring-2 focus:ring-wine transition duration-200"
                type="password"
                value={formData.password}
                name="password"
                placeholder="*******"
                onChange={handleChange}
              />
            </div>

            <div className="text-center">
              <button
                className={`inline-block mt-7 cursor-pointer w-full max-w-xs p-4 rounded-lg ${ !(formData.email.trim() && formData.password.trim()) ? 'opacity-60 pointer-events-none' : ''} bg-wine text-white text-lg mt-0 hover:brightness-110 transition duration-200`}
                type="submit"
                disabled={
                    isLoading ||
                    Object.values(formData).some((value) => !value.trim()) ||
                    Object.values(errors).some((error) => !!error)
                }
              >
                {isLoading ? 'Enviando...' : 'Registrarse'}
              </button>
            </div>
            {isSuccess && <span>¡Registro exitoso!</span>}
           {!isSuccess && errors.submit && <span>{errors.submit}</span>}
          </form>
        </div>      
    </div>
  );
};

export default RegisterComponent;
'use client'
import React from "react";
//HOOKS
import { useState} from "react";
import { useRouter } from "next/navigation";
//INTERFACES DATOS
import { Register} from "@/interfaces/interfaz";
//FUNCION PARA VALIDAR FORM.
import validate from "@/utils/validate";
//FUNCION REGISTRO FIREBASE
import registerUserFirebase from "@/utils/registerFirebase";
//FIREBASE CONFIGS
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


const RegisterComponent: React.FC = (): React.ReactNode => {
  //ESTADOS
  const [formData, setFormData] = useState<Register>({
    name: '',
    email: '',
    password: '',
  });

  //ojo con modularizar esta config, me dio problemas.
  const firebaseConfig = {
    apiKey: "AIzaSyDqE_jxE5V0OgwbwLCLON_EjnroiQZyIgo",
    authDomain: "liquors-12b23.firebaseapp.com",
    projectId: "liquors-12b23",
    storageBucket: "liquors-12b23.appspot.com",
    messagingSenderId: "713998563348",
    appId: "1:713998563348:web:65bb9301a4c0ea78b00f01"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [registerToken, setToken] = useState('')

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
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    registerUserFirebase(formData, auth, createUserWithEmailAndPassword, setIsSuccess, setErrors, router, errors, setIsLoading, setToken )
    }

    console.log(registerToken);
    

  return (
    <div className="flex justify-center items-center text-center pt-32 pb-32 bg-white">
        <div className="justify-start justmt-0 mr-32">
          <h1 className="pb-8 text-gray-600 text-6xl font-normal">Unite a </h1><p className="text-wine pb-8 font-Lato text-6xl">Liquors</p>
        </div>

        <div className="rounded border border-wine">
          <form className="justify-end w-96  text-sm p-12" onSubmit={handleSubmit}>

            <div className="pb-2">
              <input
                className="w-full p-3 rounded border border-gray-400 outline-none hover:border-wine hover:ring-1 hover:ring-wine focus:border-wine  focus:ring-wine transition duration-200"
                type="text"
                value={formData.name}
                name="name"
                placeholder="Nombre"
                onChange={handleChange}
              />
              {errors.name && <p className=" max-w-full">{errors.name}</p>}

            </div>

            <div className="pb-2">
              <input
                className={`p-3 rounded border  w-full ${errors.email ? 'border-red-700' : 'border-gray-400'} outline-none hover:border-wine hover:ring-1 hover:ring-wine focus:border-wine  focus:ring-wine transition duration-200`}
                type="text"
                value={formData.email}
                name="email"
                placeholder="Email"
                onChange={handleChange}
              />
              {errors.email && <p className=" text-gray-500 max-w-full">{errors.email}</p>}

            </div>

            <div className="pb-2  max-w-xs">
              <input
                className=" p-3 rounded border border-gray-400 w-full outline-none hover:border-wine hover:ring-1 hover:ring-wine focus:border-wine  focus:ring-wine transition duration-200"
                type="password"
                value={formData.password}
                name="password"
                placeholder="*******"
                onChange={handleChange}
              />
              {errors.password && <p className="text-gray-500 max-w-full">{errors.password}</p>}
            </div>

            <div className="text-center">
              <button
                className={`inline-block mt-7 cursor-pointer w-full max-w-full p-3 rounded-lg ${
                  !(formData.email.trim() && formData.password.trim()) || Object.values(errors).some((error) => !!error)
                    ? 'opacity-60 pointer-events-none'
                    : ''
                } bg-wine text-white text-lg mt-0 hover:brightness-110 transition duration-200`}
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
            {isSuccess && <span className="inline-block mt-2 rounded bg-green-500 text-white p-2">¡Registro exitoso!</span>}
           {!isSuccess && errors.submit && <span className="inline-block cursor-pointer w-1/5 rounded bg-red-500 text-white p-2 mt-2">{errors.submit}</span>}
          </form>
        </div>      
    </div>
  );
};

export default RegisterComponent;
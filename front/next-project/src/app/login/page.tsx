'use client'
import React from "react";
//HOOKS
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
//INTERFACES
import { Login } from "@/interfaces/interfaz";

import loginUserFireBase from "@/utils/loginFireBase";

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword} from "firebase/auth";


const LoginComponent: React.FC = (): React.ReactNode => {
  //ESTADOS
  const [formData, setFormData] = useState<Login>({
    email: '',
    password: '',
  });

  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const router = useRouter();
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorState, setError] = useState(null);

  //EVENT HANDLER LLENADO DE INPUTS
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  //EVENT HANDLER ENVIO FORMULARIO 
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    loginUserFireBase(formData, auth, signInWithEmailAndPassword, setIsSuccess, setError, router, setIsLoading);
  };

  
  return (
    <div className="flex justify-center items-center  text-center pt-32 pb-32 bg-white">
        <div className="justify-start justmt-0 mr-32">
          <h1 className="pb-8 text-gray-600 text-6xl font-normal">Unite a </h1><p className="text-wine pb-8 font-Lato text-6xl">Liquors</p>
        </div>

        <div className="rounded border border-wine">
          <form className="justify-end w-96  bg-white p-12" onSubmit={handleSubmit}>
            <div className="pb-2">
              <input
                className="w-full p-3 rounded border border-gray-400 outline-none hover:border-wine hover:ring-1 hover:ring-wine focus:border-wine focus:ring-2 focus:ring-wine transition duration-200"
                type="text"
                value={formData.email}
                name="email"
                placeholder="Email"
                onChange={handleChange}
              />
            </div>

            <div className="pb-2">
              <input
                className="w-full p-3 rounded border border-gray-400 outline-none hover:border-wine hover:ring-1 hover:ring-wine focus:border-wine focus:ring-2 focus:ring-wine transition duration-200"
                type="password"
                value={formData.password}
                name="password"
                placeholder="*******"
                onChange={handleChange}
              />
            </div>

            <div className="inline-block pb-8 pt-5">
              ¿Aún no te registraste? <br/><br/>
              <Link href='/register'>
                <span className="text-black hover:text-yellow-400 transition-colors duration-100">Registrarse</span>
              </Link><br/>
            </div>

            <div className="text-center">
              <button
                className={`inline-block cursor-pointer w-full max-w-xs p-4 rounded-lg ${ !(formData.email.trim() && formData.password.trim()) ? 'opacity-60 pointer-events-none' : ''} bg-wine text-white text-lg mt-0 hover:brightness-110 transition duration-200`}
                type="submit"
                disabled={
                  isLoading ||
                  !(formData.email.trim() && formData.password.trim())
                }
              >
                {isLoading ? 'Enviando...' : 'Iniciar Sesión'}
              </button>
            </div>
            {isSuccess && <p className="inline-block mt-2 rounded bg-green-500 text-white p-2">¡Login exitoso! <br/> redirigiendo a home...</p>}
            {errorState && <p className="inline-block cursor-pointer w-1/5 rounded bg-red-500 text-white p-2 mt-2">{errorState}</p>}
          </form>
        </div>      
    </div>
  );
};

export default LoginComponent;
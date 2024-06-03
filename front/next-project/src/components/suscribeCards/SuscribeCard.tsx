import React from "react";

const SuscribeCard = () => {
  return (
    <div className="max-w-sm w-full bg-white rounded-xl shadow-md overflow-hidden my-4 bg-opacity-85">
      <div className="p-8">
        <h2 className="block mt-1 text-2xl leading-tight font-semibold text-gray-900">
          Suscríbete a la Membresía Premium
        </h2>
        <p className="mt-2 text-gray-600">
          Disfruta de todas las ventajas exclusivas y contenido premium solo
          para miembros. ¡No te lo pierdas!
        </p>
        <ul className="mt-4 text-gray-600 list-disc list-inside">
          <li>Acceso ilimitado a todos los artículos</li>
          <li>Descuentos exclusivos en productos</li>
          <li>Soporte prioritario 24/7</li>
          <li>Invitaciones a eventos especiales</li>
        </ul>
        <div className="mt-6">
          <span className="block text-3xl font-bold text-gray-900">
            $49.99/mes
          </span>
          <div className="align-center">
            <button className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-200">
              Suscribirse Ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuscribeCard;

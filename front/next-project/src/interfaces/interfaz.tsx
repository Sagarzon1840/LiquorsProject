export interface Login {
    email: string,
    password: string;
}

export interface Register {
    name: string,
    email: string;
    password: string;
}

//AUN FALTA CONFIRMAR QUE CARACT. DE PRODUCTO ENVIARA EL BACK.
export interface IProduct {
    id: number,
    name: string,
    description: string,
    price: number | string,
    category: string;
    image: string;
}

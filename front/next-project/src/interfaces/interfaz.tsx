export interface Login {
  email: string;
  password: string;
}

export interface Register {
  name: string;
  email: string;
  password: string;
}

//AUN FALTA CONFIRMAR QUE CARACT. DE PRODUCTO ENVIARA EL BACK.
export interface IProduct {
  id: string;
  name: string;
  description: string;
  imgUrl: string;
  category: string;
  abv: number;
  brand: string;
  country: string;
  size: string;
  userId: string;
}

export interface IReview {
  id: number;
  rate: number;
  comment: string;
  user: string;
}

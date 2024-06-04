export interface Login {
  email: string;
  password: string;
}

export interface Register {
  name: string;
  email: string;
  password: string;
}

export interface Product {
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

export interface ProductsState {
  data: Product[];
}

export interface IReview {
  id: number;
  rate: number;
  comment: string;
  user: string;
}

export interface ITeamMember {
  id: number;
  name: string;
  role: string;
  img: string;
  GitHub: string;
  LinkedIn: string;
}

export interface IRecommendation {
  title: string;
  description: string;
  image: string;
  color: string;
  link: string;
}

export interface ProductFiltered {
  item: string;
}

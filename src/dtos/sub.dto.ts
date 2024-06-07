import { PaymentSearch } from "mercadopago/dist/clients/payment/search/types";

export interface SubDto extends PaymentSearch {
  status?: string;

}

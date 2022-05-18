import {IToy} from "../toys/toy";

export interface IOffer {
  id: number;
  toy: IToy;
  city: string;
  offerType: string;
  price: string;
  deliveryOption: string;
}

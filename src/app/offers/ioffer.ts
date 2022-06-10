import {IToy} from "../toys/toy";

export interface IOffer {
  id: number | null,
  toy: IToy,
  city: string,
  offerType: string,
  price: string,
  description: string,
  deliveryOption: string
  userId: number
}

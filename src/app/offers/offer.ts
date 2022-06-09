import {IToy} from "../toys/toy";

export class Offer {

  constructor(
    public id?: number,
    public toy?: IToy,
    public city: string = '',
    public offerType?: string,
    public price?: string,
    public description?: string,
    public deliveryOption?: string) {}
}




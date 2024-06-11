import { Injectable } from "@nestjs/common";


@Injectable()
export class PayPalService {

    constructor(){}

    createOrder() {
        throw new Error('Method not implemented.');
    }

    cancelOrder() {
        throw new Error('Method not implemented.');
    }

    captureOrder() {
        throw new Error('Method not implemented.');
    }


}
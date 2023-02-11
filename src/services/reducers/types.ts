import {TIngredientContent, TOrder} from "../../utils/types";


export interface burgerContent {
    bun?: TIngredientContent;
    main: Array<TIngredientContent>
}

export type TOrders = {
    connected: boolean;
    orders: Array<TOrder>
}
type TCurrentOrder = { orderId: number }


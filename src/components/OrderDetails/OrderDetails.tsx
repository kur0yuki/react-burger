import ScrollableList from "../ScrollableList/ScrollableList";
import styles from "./OrderDetails.module.css";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {FC} from "react";
import {TIngredientData} from "../../utils/types";

export type TOrderDetail = {
    order: {
        name: string
        status: string
        updatedAt: string
        number: number
    };
    info: {
        dict: Array<TIngredientData>
        price: number
    } | null
}
const OrderDetails: FC<TOrderDetail> = ({order, info}) => {
    if (!info) return null; //TODO check
    const array = Object.values(info.dict);
    //console.log(array);

    const Element: FC<{el: TIngredientData&{cnt: number}}> = ({el}) => (
        <article className={`${styles.centeredRow} ${styles.spacedRow} mr-2`}>
            <div className={'text text_type_main-default '+styles.centeredRow}>
                <img src={el.image_mobile} className={styles.image+' mr-4'} />
                {el.name}
            </div>
            <div className={'text text_type_digits-default '+styles.centeredRow}>
                {el.cnt} x {el.price}&nbsp;<CurrencyIcon type={"primary"}/>
            </div>
        </article>);
    return (
        <section className={styles.OrderDetails}>
            <p className={'text mb-10 text_type_digits-default ' + styles.textCentered}>#{order.number}</p>
            <h2 className={'text mb-3 text_type_main-medium'}>{order.name}</h2>
            <p className={'text mb-15 text_type_main-default'}>{order.status}</p>
            <p className={'text mb-6 text_type_main-medium'}>Состав:</p>
            <ScrollableList array={array} Element={Element} maxHeight={312}/> /*TODO check*/
            <div className={styles.centeredRow +' pt-10 '+styles.spacedRow}>
                <p className={'text text_type_main-default text_color_inactive'}>
                    <FormattedDate date={new Date(order.updatedAt)}/>
                </p>
                <p className={`text text_type_digits-default ${styles.centeredRow}`}>{info.price}&nbsp; <CurrencyIcon
                    type={"primary"}/></p>
            </div>

        </section>)
};

export default OrderDetails

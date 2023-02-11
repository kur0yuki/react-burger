import styles from './FeedElement.module.css'
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {FC} from "react";
import {TOrder} from "../../utils/types";

const FeedElement: FC<{ order: TOrder; info: { icons: Array<string>; price: number } }> = ({order, info}) => {
    if (!info) {
        return null
    }
    const {icons, price} = info
    const maxZIdx = icons.length;

    return (<article className={`${styles.container} p-6`}>
        <div className={styles.row}>
            <p className={'text text_type_digits-default'}>#{order.number}</p>
            <p className={'text text_type_main-default text_color_inactive'}><FormattedDate date={new Date(order.updatedAt)} /></p>
        </div>
        <h2 className={'text text_type_main-medium'}>{order.name}</h2>
        <div className={styles.row}>
            <div className={styles.icons}>{icons.map((icon: string, idx: number) => {
                return <img src={icon} alt={icon} className={styles.icon} key={idx} style={{left: -24-96*idx, zIndex:maxZIdx-idx}} />
            })}</div>
            <p className={`text text_type_digits-default ${styles.row}`}>{price} <CurrencyIcon type={"primary"}/></p>
        </div>

    </article>)
}

export default FeedElement

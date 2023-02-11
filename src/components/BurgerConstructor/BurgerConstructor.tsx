import React, {FC, ReactNode, useMemo} from 'react';
import styles from './BurgerConstructor.module.css'
import appStyles from '../App/App.module.css'
import {Button, ConstructorElement, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from '../../services/hooks';
import {useDrop} from "react-dnd";
import ContentItem from "./ContentItem/ContentItem";
import Order from "../Order/Order";
import {addAction, addBunAction, makeOrderAction, reorderAction} from "../../services/actions/actions";
import {v4 as uuid} from 'uuid';
import {getCookie} from "../../utils/api";
import {useHistory} from "react-router";
import {TIngredientContent, TIngredientData, TIngredientRaw} from "../../utils/types";


const BurgerConstructor: FC<{ openModal: (content: ReactNode) => void }> = (props) => {
    const {bun, mains} = useSelector<{bun: TIngredientData|null; mains: Array<TIngredientContent>}>(store => ({
        bun: store.contents.bun,
        mains: store.contents.main,
    }));

    const dispatch = useDispatch();
    const history = useHistory();

    const [{isOver}, drop] = useDrop<TIngredientContent & { reorder?: boolean; index: number }, any, { isOver: boolean }>({
        accept: ["bun", "sauce", "main"],
        collect: (monitor) => ({isOver: monitor.isOver()}),
        drop: (item, monitor) => {
            if (item.type === 'bun') {
                //dispatch({type: "ADD_BUN", payload: item})
                dispatch(addBunAction(item));
                return
            }
            if (monitor.didDrop()) return;
            if (item.reorder) {
                dispatch(reorderAction(-1, item.index));
                return
            }
            //dispatch({type: "ADD", payload: item})
            dispatch(addAction({...item, uuid: uuid()}))
        }
    });


    const price = useMemo(() => {
        return ((bun ? bun.price : 0) * 2 + mains.reduce((price: number, item: TIngredientRaw) => price + item.price, 0))
    }, [bun, mains]);

    const getIngArray = ():Array<string> => {
        if (!bun) return []
        return [bun._id].concat(mains.map((ing: TIngredientRaw) => ing._id)).concat(bun?._id)
    }

    function onOrder() {
        const hasToken = getCookie('accessToken');

        if (!hasToken) {
            history.push('/login')
        } else {
            dispatch(makeOrderAction(getIngArray()));
            props.openModal(<Order/>)
        }
    }


    return (<section className={`${styles.BurgerConstructor}`} ref={drop}>
        <div className={styles.container}>
            {bun && <ConstructorElement type="top"
                                        isLocked={true}
                                        text={bun.name + " (верх)"}
                                        price={bun.price}
                                        thumbnail={bun.image_mobile}/>}
            <div className={styles.scrollableWindow}>
                {mains.map((ing: TIngredientContent, index: number) => (
                    <ContentItem key={ing.uuid} ing={ing} index={index}/>)
                )}
            </div>
            {bun && <ConstructorElement type="bottom"
                                        isLocked={true}
                                        text={bun.name + " (низ)"}
                                        price={bun.price}
                                        thumbnail={bun.image_mobile}/>}
        </div>
        <div className={`${appStyles.row} mt-10 `}>
            <div className={`${appStyles.price} mr-10`}>
                <p className='text text_type_digits-medium'>{price}</p>
                <CurrencyIcon type={"primary"}/>
            </div>
            <Button type="primary" size="medium" htmlType="submit"
                    onClick={onOrder}>
                Оформить заказ
            </Button>
        </div>
    </section>)
}

BurgerConstructor.propTypes = {
    openModal: PropTypes.func.isRequired
};
export default BurgerConstructor;

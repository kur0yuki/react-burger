import styles from "../BurgerConstructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useRef} from "react";
import {useDrag, useDrop} from "react-dnd";
import {useDispatch} from "react-redux";
import {addAtAction, removeAction, reorderAction} from "../../../services/actions/actions";
import {v4 as uuid} from "uuid";

export default function ContentItem({ing, index}) {
    const dispatch = useDispatch();
    const ref = useRef(null);
    const [{handlerId, isOver}, drop] = useDrop({
        accept: ["main", "sauce"],
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
                isOver: monitor.isOver()
            }
        },
        drop(item, monitor) {
            if (!ref.current) {
                return
            }
            if (item.index === undefined) {
                dispatch(addAtAction(index, {...item, uuid: uuid()}));
                //dispatch({type: "ADD_AT", payload: {item, index}})
                return
            }
            const dragIndex = item.index;

            //dispatch({type: "CHANGE_ORDER", payload: {dragIndex, index}})
            dispatch(reorderAction(index, dragIndex))
        },
    });

    const [, drag] = useDrag({
        type: "main",
        item: {index, reorder: true}
    });
    drag(drop(ref));
    return (
        <article draggable ref={ref} className={styles.article}
                 style={{
                     opacity: isOver ? 0.5 : 1,
                     borderBottom: isOver ? '3px solid white' : 'none'
                 }}>
            <DragIcon type="primary"/>
            <ConstructorElement
                text={ing.name}
                price={ing.price}
                thumbnail={ing.image_mobile}
                handleClose={() => {
                    dispatch(removeAction(index, ing._id))
                }}
            />
        </article>
    )
}

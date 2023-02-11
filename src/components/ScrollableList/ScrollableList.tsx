import styles from "./ScrollableList.module.css";
import {FC, useRef} from "react";

type TListProps = {
    array: Array<{ _id: string }>
    Element: FC<any>
    maxHeight?: number
}
const ScrollableList: FC<TListProps> = ({array, Element, maxHeight}) => {
    const ref = useRef<HTMLElement | null>(null);
    let height = 300;
    if (ref?.current) {
        height = !isNaN(window.innerHeight - ref?.current?.offsetTop) ? (window.innerHeight - ref?.current?.offsetTop) : 300
    }

    return (
        <section  ref={ref} className={styles.scrollableList} style={{maxHeight: maxHeight?maxHeight:height}} >
            {array.map((el, idx: number) => (<Element key={el._id || idx} el={el}/>))}
        </section>
    )
}

export default ScrollableList

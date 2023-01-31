import styles from "./ScrollableList.module.css";
import {useRef} from "react";

function ScrollableList({array, Element, maxHeight}) {
    const ref = useRef()
    const height = typeof (window.innerHeight-ref?.current?.offsetTop)==='number'?window.innerHeight-ref?.current?.offsetTop:100

    return (
        <section  ref={ref} className={styles.scrollableList} style={{maxHeight: maxHeight?maxHeight:height}} >
            {array.map(el => (<Element key={el._id} el={el} />))}
        </section>
    )
}

export default ScrollableList

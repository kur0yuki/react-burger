import styles from "./ScrollableList.module.css";
import {useRef} from "react";

function ScrollableList({array, Element, maxHeight}) {
    const ref = useRef()
    const offset = ref?.current?.offsetTop

    return (
        <section  ref={ref} className={styles.scrollableList} style={{maxHeight: maxHeight?maxHeight:(window.innerHeight-offset)}} >
            {array.map(el => (<Element key={el._id} el={el} />))}
        </section>
    )
}

export default ScrollableList

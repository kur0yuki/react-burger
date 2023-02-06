import styles from "./ScrollableList.module.css";
import {useRef} from "react";

function ScrollableList({array, Element, maxHeight}) {
    const ref = useRef()
    const height = !isNaN(window.innerHeight-ref?.current?.offsetTop)?(window.innerHeight-ref?.current?.offsetTop):300

    return (
        <section  ref={ref} className={styles.scrollableList} style={{maxHeight: maxHeight?maxHeight:height}} >
            {array.map((el, idx) => (<Element key={el._id||idx} el={el} />))}
        </section>
    )
}

export default ScrollableList

import styles from "./ScrollableList.module.css";
import {useRef} from "react";

function ScrollableList({array, Element}) {
    const ref = useRef()
    const offset = ref?.current?.offsetTop

    return (
        <section  ref={ref} className={styles.scrollableList} style={{maxHeight: window.innerHeight-offset}} >
            {array.map(el => (<Element key={el._id} el={el} />))}
        </section>
    )
}

export default ScrollableList

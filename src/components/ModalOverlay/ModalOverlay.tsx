import styles from './ModalOverlay.module.css'
import PropTypes from "prop-types";
import {FC} from "react";

const ModalOverlay: FC<{
    onClose: () => void
}> = ({onClose}) => {

    return (<div className={styles.overlay} onClick={onClose}/>)
};

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired
};

export default ModalOverlay

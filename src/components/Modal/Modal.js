import ReactDOM from 'react-dom';
import {useCallback, useEffect} from "react";
import styles from './Modal.module.css';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from "prop-types";

function Modal(props) {
    const root = document.getElementById("modal-root");

    const onClose = props.onClose;
    const handleBgClick = useCallback((ev) => {
        if (Array.from(ev.target.classList).some(cl => cl.includes('modalOverlay'))) {
            onClose()
        }
    }, [onClose]);

    const handleEsc = useCallback(ev => {
        if (ev.key === 'Esc') {
            onClose()
        }
    }, [onClose]);

    useEffect(() => {
        if (props.isVisible) {
            document.addEventListener('click', handleBgClick);
            document.addEventListener('keypress', handleEsc)
        } else {
            document.removeEventListener('click', handleBgClick);
            document.removeEventListener('keypress', handleEsc)
        }
    }, [props.isVisible, handleBgClick, handleEsc]);

    return ReactDOM.createPortal(
        (<div className={styles.modalOverlay}>
            <div className={`${styles.modalWindow} p-10 ${props.isVisible ? "" : styles.invisible}`}>
                <div className={styles.titleRow}>
                    <h1 className="text text_type_main-medium">{props.title}</h1>
                    <CloseIcon type="primary" onClick={props.onClose}/>
                </div>
                {props.content}
            </div>
        </div>),
        root
    );
}

Modal.propTypes = {
    title: PropTypes.string,
    content: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired
};
export default Modal

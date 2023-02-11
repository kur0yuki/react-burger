import ReactDOM from 'react-dom';
import {ReactNode, useCallback, useEffect} from "react";
import styles from './Modal.module.css';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from "../ModalOverlay/ModalOverlay";

type Tprops = {
    onClose: () => void;
    isVisible: boolean;
    title: string;
    content: ReactNode //TODO check
}
const Modal = (props: Tprops) => {
    const root = document.getElementById("modal-root");


    const onClose = props.onClose;

    const handleEsc = useCallback((ev: KeyboardEvent) => {
        if (ev?.key === 'Escape') {
            onClose()
        }
    }, [onClose]);

    useEffect(() => {
        if (props.isVisible) {
            document.addEventListener('keydown', handleEsc)
        }
        return ()=> {
            document.removeEventListener('keydown', handleEsc)
        }
    }, [props.isVisible, handleEsc]);

    if (!root) return null;
    return ReactDOM.createPortal(
        (<div className={styles.modal}>
            <div className={`${styles.modalWindow} p-10 ${props.isVisible ? "" : styles.invisible}`}>
                <div className={styles.titleRow}>
                    <h1 className="text text_type_main-medium">{props.title}</h1>
                    <CloseIcon type="primary" onClick={props.onClose}/>
                </div>
                {props.content}
            </div>
            <ModalOverlay onClose={props.onClose}/>
        </div>),
        root
    );
}

export default Modal

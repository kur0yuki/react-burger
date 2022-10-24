import React from 'react';
import {CurrencyIcon, LockIcon, DeleteIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './ConstructorIngredient.module.css'
import appStyles from '../../App.module.css'

class ConstructorIngredient extends React.Component {
    render() {
        return (
            <div className={`${appStyles.row} ${styles.container} mr-2`}>
                {(this.props.type !== 'bun') && (<DragIcon type="primary"/>)}
                <article key={this.props.id} className={`${this.props.type} ${styles.article} pt-4 pl-2 pr-2 pb-3`}>
                    <img src={this.props.image_mobile}/>
                    <p className={`text text_type_main-default name ${styles.name}`}>{this.props.name}</p>
                    <div className={appStyles.price}>
                        <p className='text text_type_digits-default'>{this.props.price}</p>
                        <CurrencyIcon/>
                    </div>
                    {(this.props.type !== 'bun') ?
                        (<DeleteIcon type="primary"/>) :
                        (<LockIcon type="secondary"/>)
                    }
                </article>
            </div>
        )
    }
}

export default ConstructorIngredient;
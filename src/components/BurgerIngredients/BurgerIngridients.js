import React from 'react';
import {Tab, Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import './BurgerIngridients.css'

class BurgerIngridients extends React.Component {
    render() {
        return <div className='BurgerIngridients'>
            <h2 className='section-title'>Соберите бургер</h2>
            <div className="tabs">
                <Tab active={true} value={0} onClick={0}>Булки</Tab>
                <Tab active={false} value={0} onClick={0}>Булки</Tab>
                <Tab active={false} value={0} onClick={0}>Булки</Tab>
            </div>
            <div className='ingridientsWindow'>
                <h2 className="type">Булки</h2>
                {this.props.data.filter(thing => thing.type==="bun").map(bun=>{
                    return <article className="article" key={bun.id}>
                        <img src={bun.image} alt="булочка" className="md-8"/>
                        <div className="price mb-1">
                            <p className='text text_type_digits-default'>{bun.price}</p>
                            <CurrencyIcon type="primary" />
                        </div>
                        <p className="text">{bun.name}</p>
                        <Counter count={1} size="default" />
                    </article>
                })}
                <h2 className="type">Соусы</h2>
                {this.props.data.filter(thing => thing.type==="sauce").map(bun=>{
                    return <article className="article" key={bun.id}>
                        <img src={bun.image} alt="булочка" className="md-8"/>
                        <div className="price mb-1">
                            <p className='text text_type_digits-default'>{bun.price}</p>
                            <CurrencyIcon type="primary" />
                        </div>
                        <p className="text">{bun.name}</p>

                    </article>
                })}
                <h2 className="type">Котлетка</h2>
                {this.props.data.filter(thing => thing.type==="main").map(bun=>{
                    return <article className="article" key={bun.id}>
                        <img src={bun.image} alt="булочка" className="md-8"/>
                        <div className="price  mb-1">
                            <p className='text text_type_digits-default'>{bun.price}</p>
                            <CurrencyIcon type="primary" />
                        </div>
                        <p className="text">{bun.name}</p>

                    </article>
                })}
            </div>
        </div>
    }
}
export default BurgerIngridients;
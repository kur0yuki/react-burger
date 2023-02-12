import styles from './Ingredient.module.css'
import {useSelector} from "../../services/hooks";
import {FC} from "react";

const Ingredient: FC = () => {
    const currIng = useSelector(store => store.currentIngredient);
    if (!currIng) return null;
    const {ing} = currIng;
    return (
        <article className={styles.ingredient}>
            <img src={ing.image_large} alt={ing.name} className='mb-4'/>
            <div className={styles.tableBlock}>
                <h2 className='text_type_main-medium text mb-8'>{ing.name}</h2>
                <table className={`${styles.table} text_color_inactive text text_type_main-default`}>
                    <thead>
                    <tr>
                        <th>Калории,ккал</th>
                        <th>Белки, г</th>
                        <th>Жиры, г</th>
                        <th>Углеводы, г</th>
                    </tr>
                    </thead>
                    <tbody className='text text_type_digits-default'>
                    <tr>
                        <td>{ing.calories}</td>
                        <td>{ing.proteins}</td>
                        <td>{ing.fat}</td>
                        <td>{ing.carbohydrates}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </article>
    )
};

export default Ingredient

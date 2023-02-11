import {useDispatch, useSelector} from "../services/hooks";
import {useEffect} from "react";
import {SET_CURRENT_INGREDIENT} from "../services/constants";
import {useLocation} from "react-router-dom";
import Ingredient from "../components/Ingredient/Ingrefient";
import styles from './styles.module.css'

export default function IngredientPage() {
    const dispatch = useDispatch();
    const location = useLocation();
    const ing_id = location.pathname.split('/')[2];
    const {data} = useSelector(store => (store.ingredients));
    const curIng = useSelector(store => store.currentIngredient);
    const ing = curIng?.ing;

    /*useEffect(() => {
        dispatch(getIngredientsAction())
    }, []);*/


    useEffect(() => {
        const cur_ing = data.find(ing => ing._id === ing_id);
        dispatch({type: SET_CURRENT_INGREDIENT, payload: cur_ing})
    }, [data]);

    return (<article className={styles.centered + ' mt-20'}>
        <h1 className={'text_color_primary text text_type_main-medium mb-6 ' + styles.centeredText}>Детали
            ингредиента</h1>
        {ing && <Ingredient/>}
    </article>)
}

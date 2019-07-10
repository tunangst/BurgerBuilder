import React from 'react';

import styles from './Burger.module.css';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
    let listIngredients = props.ingredients.map((ing, index) => {
        return <BurgerIngredient key={ing + index} type={ing} />;
    });

    if (listIngredients.length === 0) {
        listIngredients = <p>Please build your burger from the ground up!</p>
    }

    return (
        <div className={styles.Burger}>
            {listIngredients}
        </div>
    );
}

export default Burger;
import React from 'react';

import styles from './Order.module.css';

const order = (props) => {
    let ingredientCount = 0;
    const ingredients = props.ingredients.map(ing => {
        ingredientCount++;
        return <li className={styles.ingredient} key={ingredientCount}>{ing}</li>;
    });
    return (
        <div className={styles.order}>
            <p>Ingredients:</p>
            <ul className={styles.list}>
                {ingredients}
            </ul>
            <p>Price: <strong>${props.price.toFixed(2)}</strong></p>
        </div>
    );
};

export default order;
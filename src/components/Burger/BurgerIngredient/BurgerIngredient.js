import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './BurgerIngredient.module.css';

class BurgerIngredient extends Component {
    render() {
        let ingredient = null;
        switch (this.props.type) {
            case ('bun-bottom'):
                ingredient = <div className={styles.BunBottom}></div>;
                break;
            case ('bun-top'):
                ingredient = (
                    <div className={styles.BunTop}>
                        <div className={styles.Seeds1}></div>
                        <div className={styles.Seeds2}></div>
                    </div>
                );
                break;
            case ('patty'):
                ingredient = <div className={styles.Patty}></div>;
                break;
            case ('cheese'):
                ingredient = <div className={styles.Cheese}></div>;
                break;
            case ('lettuce'):
                ingredient = <div className={styles.Lettuce}></div>;
                break;
            case ('bacon'):
                ingredient = <div className={styles.Bacon}></div>;
                break;
            default:
                ingredient = null;
        }

        return ingredient;
    }
}

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
}

export default BurgerIngredient;
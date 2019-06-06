import React from 'react';

import styles from './BuildControl.module.css';

const buildControl = (props) => (
    <div className={styles.BuildControl}>
        <button
            className={styles.Less}
            onClick={props.removed}
            disabled={props.disabled}
        >
            Less
        </button>
        <div className={styles.Label}>{props.ingredientLabel}</div>
        <button
            className={styles.More}
            onClick={props.added}
        >
            more
        </button>
    </div>
)
export default buildControl;
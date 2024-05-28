import React from 'react'

import styles from './notFoundBlock.module.scss'

const NotFoundBlock = () => {
    return (
        <div className={styles.root}>
            <h2>
                <span>😕</span>
                <br />
                Ничего не найдено :(
            </h2>
        </div>
    )
}

export default NotFoundBlock

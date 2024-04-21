import React from 'react'
import ReactPaginate from 'react-paginate'

import styles from './Pagination.module.scss'

const Pagination = ({ onChangePage, setIndexCategories }) => {
    const onChangePageHandler = selectPageNumber => {
        onChangePage(selectPageNumber)
        setIndexCategories()
    }

    return (
        <>
            <ReactPaginate
                className={styles.root}
                breakLabel='...'
                nextLabel='>'
                onPageChange={event => onChangePageHandler(event.selected)}
                pageRangeDisplayed={8}
                pageCount={3}
                previousLabel='<'
                renderOnZeroPageCount={null}
            />
        </>
    )
}

export default Pagination

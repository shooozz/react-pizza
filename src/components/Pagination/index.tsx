import React from 'react'
import ReactPaginate from 'react-paginate'

import styles from './Pagination.module.scss'

type PaginationProps = {
    onChangePage: any
    setIndexCategories: any
}

const Pagination: React.FC<PaginationProps> = ({ onChangePage, setIndexCategories }) => {
    const onChangePageHandler = (selectPageNumber: number) => {
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
            />
        </>
    )
}

export default Pagination

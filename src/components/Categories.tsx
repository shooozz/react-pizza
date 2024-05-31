import React from 'react'
import { useDispatch } from 'react-redux'
// import { useWhyDidYouUpdate } from 'ahooks'

import { setSearchValue, setCategoryId } from '../redux/slices/filterSlice'

type CategoriesProps = {
    value: number
}

const categoriesList = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
const Categories: React.FC<CategoriesProps> = React.memo(({ value }) => {
    // useWhyDidYouUpdate('Categories', { value })
    const dispatch = useDispatch()

    const onClickCategoryHandler = (index: number) => {
        dispatch(setCategoryId(index))
        dispatch(setSearchValue(''))
    }

    return (
        <div className='categories'>
            <ul>
                {categoriesList.map((category, index) => (
                    <li key={index} onClick={() => onClickCategoryHandler(index)} className={value === index ? 'active' : ''}>
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    )
})

export default Categories

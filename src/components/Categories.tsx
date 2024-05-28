import React from 'react'

type CategoriesProps = {
    value: number
    onClickCategory: any
    onChangeCategory: any
}

const Categories: React.FC<CategoriesProps> = ({ value, onClickCategory, onChangeCategory }) => {
    const categoriesList = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

    const onClickCategoryHandler = (index: number) => {
        onClickCategory(index)
        onChangeCategory()
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
}

export default Categories

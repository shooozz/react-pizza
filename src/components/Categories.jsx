import React from 'react'

function Categories({ value, onClickCategory, onChangeCategory }) {
    const categoriesList = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

    const onClickCategoryHandler = index => {
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

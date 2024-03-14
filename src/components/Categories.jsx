import React from 'react'

function Categories({ value, onClickCategory }) {
    const categoriesList = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

    return (
        <div className="categories">
            <ul>
                {categoriesList.map((category, index) => (
                    <li key={index} onClick={() => onClickCategory(index)} className={value === index ? 'active' : ''}>
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Categories

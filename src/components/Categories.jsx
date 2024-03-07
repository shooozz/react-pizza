import React from 'react'

function Categories() {
    const [activeIndexCategories, setActiveIndexCategories] = React.useState(0)

    const categoriesList = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

    const setActiveClass = index => {
        setActiveIndexCategories(index)
    }
    return (
        <div className="categories">
            <ul>
                {categoriesList.map((category, index) => (
                    <li
                        key={index}
                        onClick={() => setActiveClass(index)}
                        className={activeIndexCategories === index ? 'active' : ''}
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Categories

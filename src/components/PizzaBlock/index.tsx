import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { addItem } from '../../redux/cart/slice'
import { selectCartItemById } from '../../redux/cart/selector'
import { CartItemState } from '../../redux/cart/types'

const typePizzaName = ['тонкое', 'традиционное']

type PizzaBlockProps = {
    id: string
    imageUrl: string
    title: string
    types: number[]
    sizes: number[]
    price: number
}

const PizzaBlock: React.FC<PizzaBlockProps> = ({ id, imageUrl, title, types, sizes, price }) => {
    const dispatch = useDispatch()
    const cartItem = useSelector(selectCartItemById(Number(id)))
    const addedCount = cartItem ? cartItem.count : 0

    let [countPizzas, setCountPizzas] = React.useState(0)
    let [activeTypePizza, setActiveTypePizza] = React.useState(types[0])
    let [activeSizePizza, setActiveSizePizza] = React.useState(0)

    const onClickAdd = () => {
        const item: CartItemState = {
            id,
            title,
            imageUrl,
            price,
            type: typePizzaName[activeTypePizza],
            sizes: sizes[activeSizePizza],
            count: 0
        }
        setCountPizzas(++countPizzas)
        dispatch(addItem(item))
    }

    // console.log(types)

    return (
        <div className='pizza-block-wrapper'>
            <div className='pizza-block'>
                <Link key={id} to={`/pizza/${id}`}>
                    <img className='pizza-block__image' src={imageUrl} alt='Pizza' />
                    <h4 className='pizza-block__title'>{title}</h4>
                </Link>
                <div className='pizza-block__selector'>
                    <ul>
                        {types.map((typeId, index) => (
                            <li key={index} onClick={() => setActiveTypePizza(typeId)} className={activeTypePizza === typeId ? 'active' : ''}>
                                {typePizzaName[typeId]}
                            </li>
                        ))}
                    </ul>
                    <ul>
                        {sizes.map((pizzaSize, index) => (
                            <li key={index} onClick={() => setActiveSizePizza(index)} className={activeSizePizza === index ? 'active' : ''}>
                                {pizzaSize}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='pizza-block__bottom'>
                    <div className='pizza-block__price'>от {price}</div>
                    <button onClick={onClickAdd} className='button button--outline button--add'>
                        <svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
                            <path
                                d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 
                                5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 
                                7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
                                fill='white'
                            />
                        </svg>
                        <span>Добавить</span>
                        {addedCount > 0 && <i>{addedCount}</i>}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PizzaBlock

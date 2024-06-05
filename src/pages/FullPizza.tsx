import React from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'

import { API_KEY } from '../redux/store'

const FullPizza: React.FC = () => {
    const [pizza, setPizza] = React.useState<{
        imageUrl: string
        title: string
        price: number
    }>()
    //  Следующий код мог быть задан как начальное состояние стейта
    //     {
    //     imageUrl: '',
    //     title: '',
    //     price: 0
    // }
    const { id } = useParams()
    const navigate = useNavigate()

    React.useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get('https://api.airtable.com/v0/appeSnv5U5vIOIJCq/reactPizza0?filterByFormula=%7Bid%7D%3D' + id, {
                    headers: {
                        Authorization: `Bearer ${API_KEY}`
                    }
                })
                setPizza(data.records[0].fields)
            } catch (error) {
                alert(error)
                navigate('/')
            } finally {
            }
        }

        fetchPizza()
    }, [id])

    // Т.к. начальное состояние undefined , нам нужно делать проверку ! ! !
    if (!pizza) {
        return <div>Loading...</div>
    }
    return (
        <div className='container full-pizza'>
            <div className='full-pizza__title'>
                <img src={pizza.imageUrl} alt={pizza.title} />
                <h2>{pizza.title}</h2>
            </div>
            <div className='full-pizza__subtitle'>
                <p>
                    <b>{pizza.title}</b> THE BEST and here must be description. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis facere
                    consequuntur dolorem asperiores, natus laborum quod. Consectetur ipsa alias natus, consequatur placeat, eius, harum quam laudantium
                    perspiciatis illo debitis dolore.
                </p>
                <h4>{pizza.price} RUB</h4>

                <Link to='/' className='button button--black'>
                    <span>Вернуться назад</span>
                </Link>
            </div>
        </div>
    )
}

export default FullPizza

import React from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

import { API_KEY } from '../redux/store'

const FullPizza = () => {
    const [pizza, setPizza] = React.useState()
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

    if (!pizza) {
        return <div>Loading...</div>
    }
    return (
        <div className='container'>
            <img src={pizza.imageUrl} alt={pizza.title} />
            <h2>{pizza.title}</h2>
            <p>
                <b>{pizza.title}</b> THE BEST and here must be description. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis facere
                consequuntur dolorem asperiores, natus laborum quod. Consectetur ipsa alias natus, consequatur placeat, eius, harum quam laudantium perspiciatis
                illo debitis dolore.
            </p>
            <h4>{pizza.price} RUB</h4>
        </div>
    )
}

export default FullPizza

import {useContext, useState} from 'react'
import OrderContext from '../components/OrderContext';
import attachNamesAndPrices from './attachNamesAndPrices';
import calculateOrderTotal from './calculateOrderTotal';
import formatMoney from './formatMoney';

const usePizza = ({pizzas, values}) => {
    // 1. Create state to hold our order
    // State has gone to the Provider Context 
    // const [order, setOrder ] = useState([]);
    const [order, setOrder] = useContext(OrderContext);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    // 2. Make a function to add things to order
    const addToOrder = (orderedPizza) => {
        setOrder([...order, orderedPizza]);
    }
    // 3. Make a function to remove things from order
    const removeFromOrder = (index) => {
        setOrder([
            // everything before removing the item we want to remove
            ...order.slice(0, index),
            // everything after removing the item we want to remove
            ...order.slice(index+1),
        ])
    }

    // Submit Order Handler
    const submitOrder = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        // Gather all the data from the form
        const body = {
            order: attachNamesAndPrices(order, pizzas),
            total: formatMoney(calculateOrderTotal(order, pizzas)),
            name: values.name,
            email: values.email,
            mapleSyrup: values.mapleSyrup,
        }
        // 4. Send this data to a serverless function when they checkout
        const res = await fetch(`${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })

        const text = JSON.parse(await res.text())
        
        // Check if everything worked
        if( res.status >= 400 && res.status < 600 ) {
            setLoading(false);
            setError(text.message);
        } else {
            setLoading(false);
            setMessage("Success! Please Come on down for your pizza");
        }
    }



    return {
        order,
        addToOrder,
        removeFromOrder,
        error,
        loading,
        message,
        submitOrder,
    }
}

export default usePizza

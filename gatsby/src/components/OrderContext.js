import React , {createContext, useState} from 'react'

// Create an Order Context
const OrderContext = createContext();

export const OrderProvider = ({children}) => {
    // We need to stick the state of the order in here
    const [order, setOrder] = useState([]);
    return <OrderContext.Provider value={[order, setOrder]}>
        {children}
    </OrderContext.Provider>

}


export default OrderContext

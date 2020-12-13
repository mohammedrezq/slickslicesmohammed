import calculatePizzaPrice from './calculatePizzaPrice';

const calculateOrderTotal = (order, pizzas) => {

    // 1. Loop over each item in the order
    const total = order.reduce((runningTotal, singleOrder) => {
        // 2. Calc the the total for the order
        const pizza = pizzas.find(singlePizza => singlePizza.id === singleOrder.id);
        // 3. Add that total to the running total
        return runningTotal + calculatePizzaPrice(pizza.price, singleOrder.size);
    }, 0)
    
    return (
        total
    )
}

export default calculateOrderTotal

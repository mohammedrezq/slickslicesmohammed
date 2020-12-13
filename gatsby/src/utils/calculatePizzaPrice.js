const Sizes = {
    S: 0.75,
    M: 1,
    L: 1.5
}

const calculatePizzaPrice = (cents, size) => {
    return (
        cents * Sizes[size]
    )
}

export default calculatePizzaPrice

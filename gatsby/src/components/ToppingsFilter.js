import React from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'
import styled from 'styled-components';

const ToppingsStyles = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 4rem;
    a {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-gap: 0 1rem;
        align-items: center;
        padding:5px;
        background: var(--grey);
        border-radius: 2px;
        font-size: clamp(1.5rem, 1.4vw, 2.5rem);
        .count {
            background: #fff;
            padding: 2px 5px;
        }
        &[aria-current="page"] {
            background: var(--yellow)
        }
    } 
`;

const countPizzasInToppings = (pizzas) => {
    // Return the pizzas with counts 
    const counts = pizzas.map(pizza => pizza.toppings).flat().reduce((acc, topping) => {
        // Check if this is an existing topping
        const existingTopping = acc[topping.id];
        if(existingTopping) {
            // if it is , increment by 1
            //acc[topping.id] = acc[topping.id] +  1; /* Shortcut for it */
            existingTopping.count += 1;
        } else {
            // otherwise create a new entry in our acc, and set it to one
            acc[topping.id] = {
                id: topping.id,
                name: topping.name,
                count: 1,
            }
            
        }
        return acc;
    }, {});

    // sort them based on their count

    const sortedToppings = Object.values(counts).sort((a,b) => b.count - a.count);
    return sortedToppings;
}

const ToppingsFilter = ({activeTopping}) => {
    // Get a list of all toppings
    // Get a list of all pizzas with all their toppings
    const { toppings, pizzas } = useStaticQuery(graphql`
    query {
       toppings:  allSanityTopping {
        nodes{
        name
        id
        vegetarian
        }
    }
    pizzas : allSanityPizza {
        nodes {
            toppings {
                name
                id
            }
        }
    }
}
    `)

    // console.clear();
    // console.log({toppings, pizzas})
    // count how many pizzas are in each topping
    const toppingsWithCount = countPizzasInToppings(pizzas.nodes);
    // console.log(toppingsWithCount);
    // Loop over the list of the toppings and display the topping and the count of pizzas in that topping

    // Link it up . . . ...
    return (
        <ToppingsStyles>
            <Link to="/pizzas">
                <span className="name">All</span>
                <span className="count">{pizzas.nodes.length}</span>
            </Link>
            {toppingsWithCount.map((topping, i) => (
                <Link to={`/topping/${topping.name}`} key={topping + i} className={topping.name === activeTopping ? 'active': ''} >
                    <span className="name">{topping.name}</span>
                    <span className="count">{topping.count}</span>
                    </Link>
            ))}
        </ToppingsStyles>
    )
}

export default ToppingsFilter
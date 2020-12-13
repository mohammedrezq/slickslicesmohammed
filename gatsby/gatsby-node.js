import path from 'path';
import fetch from 'isomorphic-fetch'

const turnPizzasIntoPages =async ({graphql, actions}) => {

    // 1. Get a template for this page
    const pizzaTemplate = path.resolve('./src/templates/Pizza.js');

    // 2. Query all pizzas
    const { data } = await graphql(`
        query {
            pizzas: allSanityPizza {
                nodes {
                    name
                    slug {
                        current
                    }
                }
            } 
        }
    `)
    // 3. Loop over each pizza and create a page for that pizza 
        data.pizzas.nodes.forEach(pizza => {
            actions.createPage({
                // What is the url for this new page
                path: `pizza/${pizza.slug.current}`,
                component: pizzaTemplate,
                context: {
                    slug: pizza.slug.current
                }
            });
        })
}

const turnToppingsIntoPage = async ({graphql, actions}) => {
    // 1. Get the template
    const toppingTemplate = path.resolve('./src/pages/pizzas.js');
    // 2. Query all the toppings
    const { data } = await graphql(`
        query {
            toppings: allSanityTopping {
                nodes {
                    name
                    id
                }
            }
        }
    `)
    // 3. Create page for the topping
    data.toppings.nodes.forEach(topping => {
        const {createPage} = actions;
        createPage({
            path: `topping/${topping.name}`,
            component: toppingTemplate,
            context: {
                topping: topping.name,

                // TODO Regex for topping
                toppingRegex: `/${topping.name}/i`,
            }
        })
    })

    // 4. Pass topping data to pizza.js
    
}

async function fetchBeersAndTurnIntoNodes({actions, createNodeId, createContentDigest}) {
    // 1. Fetch a list of beers
    const res = await fetch('https://www.sampleapis.com/beers/api/ale');
    const beers = await res.json();
    // 2. Loop over each one
    for (const beer of beers) {
        // Create a node for each beer
        // const nodeContent = JSON.stringify(beer);
        const nodeMeta = {
            id: createNodeId(`beer-${beer.name}`),
            parent: null,
            children: [],
            internal: {
                type: 'Beer',
                mediaType: 'application/json',
                contentDigest: createContentDigest(beer),
            }
        };

        // 3. Create  a node for that beer
        actions.createNode({
            ...beer,
            ...nodeMeta
        })
    }
}

async function turnSlicematersIntoPages({graphql, actions}) {
    // 1. Query all slicemasters
    const { data } = await graphql(`
        query {
            slicemasters: allSanityPerson {
                totalCount
                nodes {
                    name
                    id
                    slug {
                        current
                    }


                }
            }
        }
    `)
    // TODO: 2. Turn each slicemaster into their own page
        data.slicemasters.nodes.forEach(slicemaster => {
            actions.createPage({
                component: path.resolve('./src/templates/Slicemaster.js'),
                path:`/slicemaster/${slicemaster.slug.current}`,
                context: {
                    name: slicemaster.name,
                    slug: slicemaster.slug.current,
                }
            })
        })
    // 3. Figure how many page there are based on how many slicemaster there are and how many per page!

    const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
    const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);
    // 4. Loop from 1 to n - and create the pages for them
    Array.from({ length: pageCount}).forEach((_,i) => {
        actions.createPage({
            path:`/slicemasters/${i+1}`,
            component: path.resolve('./src/pages/slicemasters.js'),
            // This data is pass to the template when we create it
            context: {
                skip: i * pageSize,
                currentPage: i + 1,
                pageSize,
            },
        })
    })


}

export async function sourceNodes(params) {
    // Fetch list of beers and source them into Gatsby API
    await Promise.all([
        fetchBeersAndTurnIntoNodes(params)
    ])
}

export async function createPages (params) {
    // Create pages dynamically

    // 1. Pizzas

    //Wait for all promises to be resolved before finishing this function
    await Promise.all([
        turnPizzasIntoPages(params),
        turnToppingsIntoPage(params),
        turnSlicematersIntoPages(params),
    ])
    // 2. Toppings
    // 3. Slicemasters
}
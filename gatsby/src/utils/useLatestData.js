import { useEffect, useState } from "react"

const gql = String.raw;

const deets = `
   name
    _id
   image {
       asset {
         url 
        metadata {lqip}
          }
   		}
`

const useLatestData = () => {

    // Hot Slices
    const [hotSlices, setHotSlices] = useState()
    // Slicemasters
    const [slicemasters, setSlicemasters] = useState()

    // use sideeffect to fetch data from the graphql endpoint

    useEffect(()=>{
        // when the component loads fetch the data
        fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: gql`
                query {
                    StoreSettings(id:"downtown") {
                      name
                        slicemaster{
                          ${deets}
                          }
                        hotslices{
                         ${deets}
                        }
                  }
                }
                `,
                })
        }).then(res => res.json().then(res => {
            // TODO check for errors
            // Set the data to state
            setHotSlices(res.data.StoreSettings.hotslices);
            setSlicemasters(res.data.StoreSettings.slicemaster);
            // console.log(res.data.StoreSettings.slicemaster);
            // console.log(res.data.StoreSettings.hotslices);
        })).catch(err =>{
          console.log("Hey an error");
          console.log(err)
        })
    }, [])

    return {
            hotSlices,
            slicemasters,
        }
    
}

export default useLatestData

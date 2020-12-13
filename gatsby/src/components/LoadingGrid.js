import React from 'react'
import { ItemStyles, ItemsGrid } from '../styles/Grids'

const LoadingGrid = ({ count }) => {
    return (
        <ItemsGrid>
           {Array.from( {length: count}, (_,i)=>{
               return (
                   <ItemStyles key={i}>
                       <p>
                           <span className="mark">Loading...</span>
                       </p>
                       <img  src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAECAQAAADsOj3LAAAADklEQVR42mNkgANGQkwAAJoABWH6GPAAAAAASUVORK5CYII=" className="loading" alt="loading" width="500" height="400" />
                   </ItemStyles>
               )
           } )}
        </ItemsGrid>
    )
}

export default LoadingGrid

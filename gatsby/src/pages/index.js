import React from 'react';
import ItemGrid from '../components/ItemGrid';
import LoadingGrid from '../components/LoadingGrid';
import { HomePageGrid, ItemsGrid } from '../styles/Grids';
import useLatestData from '../utils/useLatestData';


function CurrentlySlicing( {slicemasters} ) {
  // console.log(slicemasters);
  return <div>
    <h2 className="center">
      <span className="mark tilt">Slicemasters On</span>
    </h2>
      <p>Standing by, ready to slice you up!</p>
    {!slicemasters && <LoadingGrid count={4}/>}
    {slicemasters&& !slicemasters?.length && <p>No one is working right now!</p>}
    {slicemasters?.length && <ItemGrid items={slicemasters} /> }
  </div>
}

function HotSlices( {hotslices} ) {
  return <div>
        <h2 className="center">
      <span className="mark tilt">Hot Slices</span>
    </h2>
      <p>Come on by, buy a slice !</p>
    {!hotslices &&<LoadingGrid count={4}/> }
    {hotslices && !hotslices?.length && <p>Nothing available currently!</p>}
    {hotslices?.length && <ItemGrid items={hotslices} /> }
  </div>
}

const HomePage = (props) => {
  const {hotSlices, slicemasters} = useLatestData();
  return (
    <div className="center">
        <h1>The Best Pizza Downtown!</h1>
        <p>Open 11am to 11pm Every Single Day</p>
        <HomePageGrid>
          <CurrentlySlicing slicemasters={slicemasters} />
          <HotSlices hotslices={hotSlices} />
        </HomePageGrid>
    </div>
  )
}

export default HomePage;

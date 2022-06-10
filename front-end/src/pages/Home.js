import React from 'react';
import Header from '../components/Header'
import CollectProvider from '../context/CollectProvider';
import Body from '../components/Body';

function Home() {
  return (
    <CollectProvider>
      <Header />
      <Body />
    </CollectProvider>
  );
}

export default Home;

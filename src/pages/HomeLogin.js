import React from 'react'
import Advice from '../components/homepage/Advice';
import Header from '../components/homepage/Header';
import Heading from '../components/homepage/Content';

function HomeLogin() {
  return (
    <div>
      <div class="containerss">
        <Header login='true' />
        <Heading />
      </div>
      <Advice />
    </div>
  )
}

export default HomeLogin

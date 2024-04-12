'use client'
// useMemo
// a hook that memoizes a value and returns the same value untill any of the dependencies in the dependency array changes.
import { useMemo, useState } from 'react';

import { initialItems } from './utils';

interface DemoProps {}

function Demo({}: DemoProps) {

  console.log('Demo rendered');

  const [count, setCount] = useState(0);
  const [items] = useState(initialItems);

//   const selectedItem = items.find((item) => item.isSelected)

  const selectedItem = useMemo(
    () => items.find((item) => item.isSelected)
  , [items])

//   const selectedItem = useMemo(
//     () => items.find((item) => item.id === count)
//   , [count, items])
  
  

  console.log('Demo rendered-ed');

  return (
    <div className='tutorial'>
      <h1>Count: {count}</h1>
      <h1>Selected Item: {selectedItem?.id}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default Demo;
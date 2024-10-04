 import { useState } from "react"

function App(){
  const [inputvalue, setinputvalue] = useState(1)
  const [counter, setcounter] = useState(0)
  let count = 0;
  for(let i=1; i<=inputvalue; i++){
    count = count + i;
  }
return <div>
  
  <input onChange={function(e){setinputvalue(Number(e.target.value));}} type="number"
  placeholder="Find the sum from 1 to n"/> <br />Sum from 1 to {inputvalue} is {count} <br />
<button onClick={()=>{setcounter(counter+1)}}>Counter{counter}</button>
</div>


}

export default App;  

//In the above code there is an issue- The whole app re renders when the counter button is clicked, this also re renders the input thing which does not need to re render when the value in it remains same.
// As for loop here is an expensive process we need to save our computation energy and do something about it

















//Another aproach here is using the UseEffect, but this aslo has another problem
import { useEffect, useState } from "react";

function App(){
  const [counter, setTcounter] = useState(0);
  const [inputvalue, setInputvalue] = useState(0);
  const [finalVlaue, setFinalvalue] = useState(0);

useEffect(()=>{
  let count = 0;
  for(let i=1; i<= inputvalue; i++){ 
    count = count + i
  } 
  setFinalvalue(count)},
  [inputvalue])  // dependency array, makes sure that only when the input value changes it renders otherwise not


return <div>
  <input type="number" placeholder="Your number here" onChange={function(e){setInputvalue(e.target.value)}}/> <br />
  sum from 1 to {inputvalue} is {finalVlaue}; <br />
  <button onClick={()=> {setTcounter(counter+1)}}>Counter {counter}</button>
</div>
 

};

export default App;

// issue with the above code - In React, when you update any state using setState, it causes the component to re-render. This includes:
//When setInputvalue is called, it updates inputvalue and triggers a render.
//The useEffect then runs, calculates a new sum, and calls setFinalValue, which again triggers a render.
















// Here we will use memoization to save our energy and make ourt code more optimized

import React, { useState, useEffect, useMemo } from "react";

function App() {
  const [counter, setCounter] = useState(0);
  const [inputValue, setInputValue] = useState(0);

  // Use useMemo to memoize the calculated sum
  const finalValue = useMemo(() => {
    let count = 0;
    for (let i = 1; i <= inputValue; i++) {
      count = count + i;
    }
    return count;
  }, [inputValue]); 

  return (
    <div>
      <input
        type="number"
        onChange={(e) => setInputValue(Number(e.target.value))}
        placeholder="Find the sum from 1 to n"
      />
      <br />
      Sum from 1 to {inputValue} is {finalValue}
      <br />
      <button onClick={() => setCounter(counter + 1)}>Counter {counter}</button>
    </div>
  );
}

export default App;


// Purpose:
//useMemo is used to memoize a computed value, meaning it only recalculates the value when its dependencies change.
//When to Use:
//When you have an expensive computation that you want to avoid recalculating on every render unless certain inputs change.

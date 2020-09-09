import React, { useState, useEffect } from 'react';  
  
function Practice() {  
  const [count, setCount] = useState(0);  
  
  // Similar to componentDidMount and componentDidUpdate:  
  useEffect(() => {  
    // Update the document title using the browser API  
    document.title = `You clicked ${count} times`;  
  });  
  
  return (  
    <div>  
      <p>You clicked {count} times</p>  
      <button onClick={() => setCount(count + 1)}>  
        Click me  
      </button>  
    </div>  
  );  
}  
export default Practice;  
































// import React, { useState } from 'react'

// export default function Practice() {

//      var curVal=0;
//    const [val, setVal] = useState(curVal);

//    const Increament=()=>{
//       for(let i=1; i<=10;i++)
//       {
//           setVal((prevVal)=>prevVal+1)
//       }
//    }

//     return (
//         <div>
//             <p>{val}</p>
//     <button onClick={()=>setVal(val+1)}>click{val} times</button> &nbsp;
//             <button onClick={Increament}>increment by 10</button> &nbsp;
//             <button onClick={()=>setVal(curVal)}>Reset</button>
//             {/* <button></button> */}
//         </div>
//     )
// }

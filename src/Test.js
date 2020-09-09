import React ,{useState} from 'react'

function Test() {
    const [val,setVal]=useState('')
   const handleData=e=>{
e.preventDefault()
addButton()
// alert(val)
    }
function addButton(){
    for(let i=0;i<val;i++){
    var html ='<button class="btn btn-mute border" disabled id=u'+i+' onclick={this.bluebutton}>'+ "button"+i +' </button>'

document.getElementById('sona').insertAdjacentHTML('beforeend',html)
    }
    random()
}
function random(){
var n=Math.floor(Math.random()*10)
const new_id='u'+n;
console.log(new_id)

if(n<val){
document.getElementById(new_id).style.backgroundColor='red';
document.getElementById(new_id).removeAttribute('disabled');
document.getElementById(new_id).onclick={bluebutton }
// bluebutton()
}
else random()
}

 function bluebutton(){
   // document.getElementById(new_id).style.backgroundColor='blue';  
console.log('done')
}

    return (
        <div>
            <form onSubmit={handleData}>
                <label> enter the data</label>
            <input type='text' value={val} onChange={e=>setVal(e.target.value)}/>
            <button type='submit'>submit</button>
            </form>
            <div id='sona'> </div>
            <p id='c'></p>
        </div>
    )
}

export default Test
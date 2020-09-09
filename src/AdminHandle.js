import React, { Component } from 'react'

export class AdminHandle extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             AllViewApp:[],
              days: '',
              disable:true
        }
    }
    
    componentDidMount(){
        var arr=JSON.parse(localStorage.getItem('leaveData'))
        this.setState({
            AllViewApp:arr
        })
    }
    approveLeave=(e)=>{

        var person=e.target.value
        var arr=JSON.parse(localStorage.getItem('leaveData'))

        for(var i=0; i<arr.length;i++){

            if(arr[i].AppId==person){
                arr[i].status="Approved"
                this.setState({
                    AllViewApp:arr
                })
                break;
            }
        }
        localStorage.setItem('leaveData',JSON.stringify(arr))
    }

    rejectLeave=(e)=>{
        
        var person=e.target.value
        var arr=JSON.parse(localStorage.getItem('leaveData'))
      //  var disable=true
        for(var i=0; i<arr.length;i++){
            if(arr[i].AppId==person){
                arr[i].status='Rejected'
                this.setState({
                    AllViewApp:arr
                })
                break;
            }
        }
        localStorage.setItem('leaveData',JSON.stringify(arr))
    }
    signOut=()=>{
       this.props.history.push('/')
    }

    allDetails=()=>{
  this.props.history.push('/detail')
    }

    renderingApplication=(e)=>{
       
        return this.state.AllViewApp.map((app,index)=>{
            const{name,AppId,from,to,status,cnt}=app
            if(status==='Approved' || status==='Rejected'){
            var disable=true 
            }
            return(
            <tr key={index}>
            <td>{index+1}</td>
            <td>{name}</td>
            <td>{from}</td>
            <td>{to}</td>
            <td>{cnt}</td>
            <td>{status}</td>
            <td>
                <button id='deco' className='btn btn-primary'value={AppId} onClick={this.approveLeave} disabled={disable}>Approve</button>&nbsp;&nbsp;&nbsp;
                <button id='deco' className='btn btn-danger' value={AppId} onClick={this.rejectLeave} disabled={disable}>Reject</button>  
            </td>
           
            </tr>
            )
        })
    }

    
    render() {
        return (
            <div className='container'>
                <h4 id='text'>Welcome Admin</h4>
                <center>
                    <h5 className='text-success' id='leavetext'>Leave Summury</h5>
                    <button id='deco' className='btn btn-primary right' onClick={this.signOut}>Sign Out</button> 
                      <br></br><br></br><br></br>
                    <button id='deco' className='btn btn-primary right'  onClick={this.allDetails} >Employee Details</button>
                    <br></br><br></br>
                    <table className='table table-hover striped m-5' border='1'>

                    <tr className='center'>
     <th scope='col'>Sr.No</th>
       <th scope='col' >UserName</th>
       <th scope='col'>From</th>
       <th scope='col'>To</th>
       <th scope='col'>No Of Leaves</th>
       <th scope='col'>Status</th>
       <th scope='col'>Action</th>
       
                 </tr>
                 {this.renderingApplication()}
     
                    </table>
                </center>
            </div>
        )
    }
}

export default AdminHandle

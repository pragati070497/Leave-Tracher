import React, { Component } from 'react'

export class UserDetails extends Component {

    
     UserDetail=[]
     UserDetail=JSON.parse(localStorage.getItem('UserData'))
     
    leavesDetail=[]
    leavesDetail=JSON.parse(localStorage.getItem('leaveData'))

    leave=0
  tpayment=0
  rleave=0
  initialLeavs=10

    constructor(props) {
        super(props)
    
        this.state = {
    initialPayment: '',
    totalBal:''
        }
    }
  
    renderingUserDetails=()=>{
       
      return this.UserDetail.map((user,index)=>{
    const{Email,FirstName, isAdmin,profile}=user
    
    this.leave=0
    this.rleave=0
    this.leavesDetail.map((a)=>{
        const{userId,cnt,status}=a
        if(userId===Email){
            if(status==='Approved'){
                if(profile==='HR'){
                    this.state.initialPayment='40000'
                    this.leave = cnt+this.leave
                  if(this.leave<=10)
                  {
                    this.tpayment='40000'
                    this.state.initialPayment='40000'
                  this.rleave= this.initialLeavs-this.leave
                  }
                  else{
                    this.rleave= this.initialLeavs-this.leave
                     this.tpayment=this.state.initialPayment-(((this.state.initialPayment)/30)*this.leave)
                  }
                            
                }
               else  if(profile==='Developer'){
                     this.state.initialPayment='30000'
                     this.leave = cnt+this.leave
               if(this.leave<=10)
               {
                this.tpayment='30000'
                this.state.initialPayment='30000'
                 this.rleave= this.initialLeavs-this.leave
               }
              else{
                this.rleave= this.initialLeavs-this.leave
                   this.tpayment=this.state.initialPayment-(((this.state.initialPayment)/30)*this.leave)
                  }
               }
             else if(profile==='Manager'){
                     this.state.initialPayment='50000'
                     this.leave = cnt+this.leave
               if(this.leave<=10)
                {
                    this.tpayment='50000'
                    this.state.initialPayment='50000'
                   this.rleave= this.initialLeavs-this.leave
                }
                 else{
                    this.rleave= this.initialLeavs-this.leave
                  this.tpayment=this.state.initialPayment-(((this.state.initialPayment)/30)*this.leave)
                    }
             }
         }  
     }
  })
  
        if(this.leave==0){
        this.rleave=10
        }
    

   if(isAdmin===false){
   
   return(    
       <tr key={index}>
           <td>{index+1}</td>
           <td>{FirstName}</td> 
           <td>{Email}</td>
           <td>{this.leave}</td>  
           <td>{this.rleave}</td>
           <td>{this.state.initialPayment}</td>
           <td>{this.tpayment}</td>
       </tr>
         )
       }
    })
 }

back=()=>{
    this.props.history.push('/admin')
}
        
logOut=()=>{
    this.props.history.push('/')
}
    render() {
        return (
            <div className='container'>
                <h4 className=''  style={{color: 'green'}} id='leavetext'>Employee Details</h4><br></br><br></br>
                <button id='deco' className='right btn btn-primary' onClick={this.logOut}>Log Out</button><br></br><br></br><br></br>
           
                <table border='1'   >
                
                    <tr>
                    <th>Sr. No</th>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Approved Leaves</th>
                    <th>Remaining Leaves</th>
                    <th>Payment</th>
                    <th>Total Balance</th>
                    </tr>
                    {this.renderingUserDetails()}
                </table>
                <br></br>
                <button id='deco' className=' btn btn-primary ' onClick={this.back} >Back</button>
            </div>
        )
    }
}

export default UserDetails



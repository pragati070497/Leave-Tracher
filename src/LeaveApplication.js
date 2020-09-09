import React, { Component, Profiler } from 'react'

export class LeaveApplication extends Component {

    tpayment=0
    initialPayment=0
    leave=0
    rleave=10
    inleave=10
    userData=[]
    userData=JSON.parse(localStorage.getItem('UserData'))

    constructor(props) {
        super(props)
    
        this.state = {
             currentUsersDetail:{},
             from:'',
             to: '',
             leaveApp:[],
             curDate :'',
             uniqueId:'',
             index:'',
             disable:true,
             cnt:0,
             rleave:10
        }
    }

    componentWillMount=()=>{
        const {params}=this.props.match;
        const userId=params.id
        console.log(userId)
        const details=JSON.parse(localStorage.getItem('UserData'))

        details.map(user=>{
           
        if(userId===user.Email){
            this.setState({
                currentUsersDetail: user
            })
          }
        })
//   console.log(this.state.currentUsersDetail)
       var leaveAppCurrentUser=JSON.parse(localStorage.getItem('leaveData'))
       var arr=[]
       if(leaveAppCurrentUser==null){
           leaveAppCurrentUser=[]
       }
       else{
           leaveAppCurrentUser.map(app=>{
               if(userId==app.userId){
                   arr.push(app)
               }
           })

           this.setState({
            leaveApp:arr
           })
       }
    }

    dateValid=()=>{
        var today= new Date;
        var dd= String(today.getDate()).padStart(2,0)
        var mm= String(today.getMonth()+1).padStart(2,0)
        var yyyy=today.getFullYear()
     today=yyyy+'-'+mm+'-'+dd

     this.setState({
         curDate:today
     })
    }

    componentDidMount(){
        this.dateValid()
    }

    applyData=()=>{
        
        const fromDate=this.state.from
        const toDate=this.state.to
        const Status='pending'
        const email= this.state.currentUsersDetail.Email
        const val= Math.floor(1000+Math.random()*9000)
        const FirstName=this.state.currentUsersDetail.FirstName

        var leaveApp=JSON.parse(localStorage.getItem('leaveData'))
        const firstDate = new Date(fromDate);
        const secondDate = new Date(toDate);

        var  diffInTime= secondDate.getTime()-firstDate.getTime()
        var diffDays=(diffInTime/(1000*3600*24))+2

        if(leaveApp==null)
        {
            leaveApp=[]
        }

        var userApplication={
            AppId:val,
            name:FirstName,
            userId:email,
            from:fromDate,
            to:toDate,
            status:Status,
            cnt:diffDays
        }
 
        if(this.status=='Approved'){
      this.rleave=(this.rleave-this.cnt)
        }
    if(this.state.from!=null && this.state.to){
        leaveApp.push(userApplication)
        localStorage.setItem('leaveData',JSON.stringify(leaveApp))
    }
    else{
        alert('please insert the date')
    }

       var arr=JSON.parse(localStorage.getItem('leaveData'))
        var newArr=[]
         arr.map(a=>{
            if(a.userId==this.state.currentUsersDetail.Email){
                newArr.push(a)
            }
        })
    
        this.setState({
            leaveApp:newArr,
            from:'',
            to:''
        }) 
    }

    updateData=()=>{
    
        this.setState({
         disable:!this.state.disable
     })
       var arr=JSON.parse(localStorage.getItem('leaveData')) 
    for(var i=0;i<arr.length;i++){
        if(arr[i].AppId==this.state.uniqueId){
            arr[i].from=this.state.from
            arr[i].to=this.state.to
            break;
        }
       alert("Leave Update Successfull")
    }
  
    localStorage.setItem('leaveData', JSON.stringify(arr))
    var newArr=[]
    arr.map(a=>{
        if(a.userId==this.state.currentUsersDetail.Email){
            newArr.push(a)
        }
    })
    this.setState({
        leaveApp:newArr,
        from:'',
         to:''
    })
    }

    
    onChange=e=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    deleteApp=(e)=>{

        var leaveApp=JSON.parse(localStorage.getItem('leaveData'))
        const deleteData=e.target.value
        console.log(deleteData)

        for(var i=0;i<leaveApp.length;i++){
            
            var user=leaveApp[i]

            if(user.AppId==deleteData){

                leaveApp.splice(i,1)
            }
        }
        localStorage.setItem('leaveData',JSON.stringify(leaveApp))
         
        var arr=JSON.parse(localStorage.getItem('leaveData'))
   var newArr=[]
   arr.map((a)=>{
       if(a.userId==this.state.currentUsersDetail.Email){
            newArr.push(a)
       }
   })

   this.setState({
    leaveApp:newArr
   })
    }

    editApp=(e)=>{

        const editData=e.target.value
        this.setState({
            uniqueId:editData,
            disable: !this.state.disable
        })
        let arr=JSON.parse(localStorage.getItem('leaveData'))
        for(var i=0;i<=arr.length;i++){
            if(arr[i].AppId==editData){
                this.setState({
                    from:arr[i].from,
                    to:arr[i].to,
                    index:i
                })
               break;
            }
        }
    }


    renderingApplication=()=>{

        this.rleave=0
       this.leave=0

    return this.state.leaveApp.map((app,index)=>{
       const {AppId,from,to,status,cnt,name}=app

       if(status==='Rejected' || status==='Approved'){
           var disable=true
       }
       
   this.userData.map((user)=>{
    const  {FirstName}=user 

    if(status==='Approved'){
    if(FirstName===name){
        this.leave=cnt+this.leave
        this.rleave=this.inleave-this.leave
     }
   }
 })

       return(
           <tr key={index}>
               <td>{index+1}</td>
              <td>{from}</td>
               <td>{to}</td>
               <td>{status}</td>
       <td><button className='btn btn-success' value={AppId} disabled={disable} onClick={this.editApp}>Edit</button></td>
       <td><button className='btn btn-danger' value={AppId} disabled={disable} onClick={this.deleteApp}>Delete</button></td>
           </tr>
       )
    })
    }


    signOut=()=>{
        this.props.history.push('/')
    }
    
    render() {
    
        return (
            <div className='container '>
                <h4 id='leavetext'>Welcome {this.state.currentUsersDetail.FirstName}</h4><br></br>
              
            <h6 className='right' style={{color:'navy'}}>  Your Total Remaining Leaves Are {this.rleave}</h6><br></br><br></br>
         
                <button className='btn btn-primary right' type='button' onClick={this.signOut}>Sign Out</button><br></br> <br></br><br></br>
               <label className='left'><h6 style={{color:'black'}}>From</h6></label>
               <input type='date' style={{color:'grey'}} name='from' value={this.state.from} onChange={this.onChange}  min={this.state.curDate}/>

                <label className='left'><h6 style={{color:'black'}}>To</h6></label>
               <input type='date' style={{color:'grey'}} name='to' value={this.state.to} onChange={this.onChange} min={this.state.from}/>  
    
         <button  className='btn btn-primary' onClick={this.applyData} disabled={!this.state.disable}>Apply</button>&nbsp;&nbsp;&nbsp;
         <button  className='btn btn-primary' onClick={this.updateData}  disabled={this.state.disable}>Update</button>

         <center>
        <table className='table table-hover striped m-5' border='1'>
     <tr>
    <th scope='col'>Sr.No</th>
    <th scope='col'>From</th>
    <th scope='col'>To</th>
    <th scope='col'>Status</th>
    <th scope='col'>Edit</th>
    <th scope='col'>Delete</th>
    </tr>
    {this.renderingApplication()}
     </table>

         </center>
            </div>
        )
    }
}
export default LeaveApplication





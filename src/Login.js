import React, { Component } from 'react'

export class Login extends Component {

    allUsersData=[]
    allUsersData=  JSON.parse(localStorage.getItem('UserData'))

    constructor(props) {
        super(props)

        this.state = {
            Uname: '',
            password: '',
            hidden:true
        }

        this.toggle=this.toggle.bind(this)

        this.inputRef=React.createRef()
    }

    componentDidMount(){
        this.inputRef.current.focus()
    }
   
    toggle=(e)=>{
        this.setState({
            hidden:!this.state.hidden
        })
        if(this.state.hidden===true)
{
    document.getElementById('pas').type='password'
}        
        else{
    document.getElementById('pas').type='text'

        }
        e.preventDefault()
    }
    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    checkUserValid = () => {
        const Uname = this.state.Uname
        const password = this.state.password
         var flag=0

        for (var user of this.allUsersData) {

            if (Uname === user.Email && password === user.password && user.isAdmin === true) {
                
                flag=1                
            }
             if (Uname === user.Email && password === user.password && user.isAdmin === false) {
              flag=2
                 
            }
           
        }
        if(flag==1){
            this.props.history.push('/admin')
        }
        else if(flag==2){
            alert('Login Successfull')
                this.props.history.push(`/leaveApp/${Uname}`)
        }else{
            alert('login failed')
        }
    }
    signUp = () => {
        this.props.history.push('/signup')
    }

    render() {
        return (
            <div className='container form-group'>
                <center>
                <div className='page'>
                    <h4 className='text text-black 'id='text' >Login Page</h4>
                    <div>
                        <form autoComplete='off' className='m-5 col-md-6'>
                            <div className='row'>
                                <div className='input-field col s12'>
                                    <input ref={this.inputRef} className='text text-white' type='email' name='Uname' 
                                    value={this.state.Uname} onChange={this.onChange}
                                     className='form-control validate' placeholder='User Name' />
                                </div>
                            </div><br/>

                            <div className='row'>
                                <div className='input-field col s12 '>
                                    <input type='password' name='password' id='pas' 
                                     value={this.state.password} onChange={this.onChange}
                                      className='form-control validate' placeholder='password' />
                                    <button className='left' onClick={this.toggle}><i class="fa fa-eye-slash"
                                     aria-hidden="true"></i>
                                    </button>
                                    </div>
   </div>                  
<br></br>
                            <button id='deco' className='btn btn-primary' onClick={this.checkUserValid}>Login</button>&nbsp;&nbsp;&nbsp;
                            <button id='deco' className='btn btn-primary' onClick={this.signUp}>Sign Up</button>
                        </form>
                    </div>
                    </div>
                </center>
            </div>
        )
    }
}

export default Login

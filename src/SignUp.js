import React, { Component } from 'react'

export class SignUp extends Component {

    constructor(props) {
        super(props)

        this.state = {
            FirstName: '',
            Email: '',
            confirmPassward: '',
            passward: '',

            FirstNameErr: '',
            EmailErr: '',
            passwardErr: '',
            confirmPasswardErr: ''
        }
        this.inputRef=React.createRef();
    }

    componentDidMount(){
        this.inputRef.current.focus();
    }

    validForm = () => {

        var isValid = true;

        if (this.state.FirstName.length === 0) {
            this.setState({
                FirstNameErr: 'First name should not be empty..'
            })
            isValid = false;
        }
        else if (this.state.FirstName.length > 1) {
            this.setState({
                FirstNameErr: ''
            })
            isValid = true;
        }
        if (!this.state.Email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) {
            this.setState({
                EmailErr: 'Please Enter valid mail id..'
            })
            isValid = false;
        }
        else if (this.state.Email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) {
            this.setState({
                EmailErr: ''
            })
            isValid = true;
        }

        if (!this.state.passward.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)) {
            this.setState({
                passwardErr: 'PassWord contain atleast 1 special symbol, 1 capital letter and 8 character '
            })
            isValid = false;
        }
        else if (this.state.passward.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)) {
            this.setState({
                passwardErr: ''
            })
            isValid = true;
        }
        if (this.state.confirmPassward != this.state.passward) {
            this.setState({
                confirmPasswardErr: 'password not matching.. '
            })
            isValid = false;
        }
        else if (this.state.confirmPassward = this.state.passward) {
            this.setState({
                confirmPasswardErr: ''
            })
            isValid = true;
        }
        return isValid;
    }


    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitData = e => {
        
        const validForm = this.validForm()
        var allUserDetail = JSON.parse(localStorage.getItem('UserData'))
        var email = true

        if (allUserDetail != null) {
            allUserDetail.map(ud => {
                if (ud.Email == this.state.Email) {
                    email = false
                }
            })
        }
        if (allUserDetail === null) {
            allUserDetail = []

            if (validForm == true) {
                const Udata = {
                    isAdmin: false,
                    FirstName: this.state.FirstName,
                    Email: this.state.Email,
                   password: this.state.passward,
                    confirmPassward: this.state.confirmPassward,
                    profile: document.getElementById('pro').value
                }
                allUserDetail.push(Udata)
                localStorage.setItem('UserData', JSON.stringify(allUserDetail))

                alert('Sign Up Successfull')
            }
        }
       else  if (allUserDetail != null) {
            if (validForm == true) {
                if (email == true) {
                    const Udata = {
                        isAdmin: false,
                        FirstName: this.state.FirstName,
                        Email: this.state.Email,
                       password: this.state.passward,
                        confirmPassward: this.state.confirmPassward,
                        profile: document.getElementById('pro').value
                    }
                    // console.log(Udata.profile)
                    allUserDetail.push(Udata)
                    localStorage.setItem('UserData', JSON.stringify(allUserDetail))
                    this.props.history.push('/')
                    alert('Sign Up Successfull')
               
                }
                else {
                    alert('Email  is already register')
                }
           }
       }
       this.props.history.push('/login')
    }

    render() {
        return (
            <div className='container form-group' >
                <form autoComplete='off' >
                    <div className='col-md-10 form-group'>
                        <label className='float-left' style={{color:'black'}}><h6>First Name :
                         <span aria-hidden='true' style={{ color: 'red' }}>*</span></h6></label>
                        <input ref={this.inputRef}  style={{ color: 'black' }} type="text" name='FirstName' value={this.state.FirstName}
                         onChange={this.onChange} placeholder='First Name' />
                        <pre style={{ color: 'red' }}>{this.state.FirstNameErr}</pre>
                    </div>

                    <div className='col-md-10 form-group'>
                        <label className='float-left' style={{color:'black'}}><h6 >Email Id :
                         <span aria-hidden='true' style={{ color: 'red' }}>*</span></h6></label>
                        <input  style={{ color: 'back' }} type="text" name='Email' value={this.state.Email}
                         onChange={this.onChange} placeholder='Mail ' />
                        <pre style={{ color: 'red' }}>{this.state.EmailErr}</pre>
                    </div>

                    <div className='col-md-10 form-group'>
                        <label className='float-left' style={{color:'black'}}><h6>passward :
                         <span aria-hidden='true' style={{ color: 'red' }}>*</span></h6></label>
                        <input  style={{ color: 'black' }} type="password" name='passward' value={this.state.passward}
                         onChange={this.onChange} placeholder='passward' />
                        <pre style={{ color: 'red' }}>{this.state.passwardErr}</pre>
                    </div>

                    <div className='col-md-10 form-group'>
                        <label className='float-left' style={{color:'black'}}><h6>Confirm passward :
                         <span aria-hidden='true' style={{ color: 'red' }}>*</span></h6></label>
                        <input  style={{ color: 'black' }}  type="password" name='confirmPassward'
                         value={this.state.confirmPassward} onChange={this.onChange} placeholder='Confirm passward' />
                        <pre style={{ color: 'red' }}>{this.state.confirmPasswardErr}</pre>
                    </div>

 
                          <div className='col-md-10 form-group'>  
                          <label className='float-left' style={{color:'black'}}><h6>profile :</h6></label>
                        <select className="form-control" id='pro' name='profile' value={this.state.profile} onChange={this.onChange}  >  
                        <option selected disabled >Select your profile</option>
                        <option>HR</option>  
                         <option>Developer</option>  
                          <option>Manager</option>    
                           </select>  
                          </div>  
              <br></br>

                    <button id='deco' type='button' className='btn btn-primary center' onClick={this.submitData} >Submit</button>

                 </form>
             </div>
        )
    }
}

export default SignUp;

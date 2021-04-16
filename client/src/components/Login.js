import React, { Component } from 'react'
import Predict from './Predict';
import '../App.css';
import WelcomePage from './WelcomePage-motion.jsx';
import Dictaphone from './Dictaphone';
import { data } from 'autoprefixer';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import Header from './Header';
import Footer from './Footer';
import Left from './Left'

export default class Login extends Component {
    constructor(props){   // 초기 설정
        super(props);
        this.state={
            userNum:"",
            name:"",
            isLogin:false,
        }
        this.GetVoiceValue = this.GetVoiceValue.bind(this);
    }
 
componentDidMount(){
    try {
        setTimeout(() => {
            document.getElementById("btnLogin").click()     
        }, 10000);
           
    } catch (error) {
        
    }
    
    // setTimeout(() => {
    //     document.getElementById("btnLogin").click()     
    // }, 14000);
}




    GetVoiceValue(data1) {
        console.log("가져온 값"+data1);
        this.setState(
            {
                userNum : data1,            
            } );
    }
   
    handleLogin = e =>{
        e.preventDefault() //페이징 이동 없게
        console.log("버튼이 누렸어요")
        const login_info={
            method:"POST",
            body: JSON.stringify(this.state),
            headers:{
                "Content-Type":"application/json"
            }
        };
        fetch("/api/login",login_info).then(res => {
            return res.json();
        })
        .then(json=> {
            console.log(json[0])
            console.log("checkpoint1")
            if(json[0]!= undefined){
                window.localStorage.setItem("userInfo",JSON.stringify(json))
                this.setState(
                    {
                        userNum : json[0].usernum,
                        name:json[0].name,
                        isLogin:true
                    } );
                    // var confirm_test = window.confirm(this.state.name+"님이 맞으신가요?");
                    console.log(this.state.isLogin)


            }
            else {
                alert("아이디 혹은 비밀번호를 확인하세요");
            }
       
        });}

    handleuserNum = e =>{
        this.setState(
            {
                userNum: e.target.value
            
            })}

            // haha = e =>{
            //  window.confirm("You are not Hair Loss")   
            // }



    render() {
        return (
            <>
            <Header/>
            <Left></Left>
            {/* HEADER */}
            <div className="Content">
            <div className="LoginPage"> 
                <Dictaphone GetVoiceValue= {this.GetVoiceValue}/>
                {
                    this.state.isLogin ===false ?  (  
                        <div className="form">
                        <form className="LoginForm" onSubmit={this.handleLogin}>
                        <div>User KEY</div><br></br>
                        <input  type="text" value={this.state.userNum||""} onChange={this.handleuserNum.bind(this)}></input><br></br>
                        <button class="btn btn-primary" id="btnLogin" type="submit">로그인</button>
                        {/* <button class="btn btn-primary" id="btnLogin2" onClick={this.haha()}>누르기</button> */}
                        </form>
                    </div>) : (<div><Predict name={this.state.name} userNum={this.state.userNum} isLogin={this.state.isLogin}></Predict></div>)
                }
              
            </div>
                <Footer/>
                {/* Footer */}
                </div>
            </>
        )
    }
    }

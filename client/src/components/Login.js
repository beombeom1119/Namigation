import React, { Component } from 'react'
import Predict from './Predict';
import '../App.css';
import WelcomePage from './WelcomePage-motion.jsx';
import Dictaphone from './Dictaphone';
import Header from './Header';
import Footer from './Footer';
import QrReader from 'react-qr-scanner'


export default class Login extends Component {
    constructor(props) {   // 초기 설정
        super(props);
        this.state = {
            userNum: "",
            name: "",
            isLogin: false,
            delay: 100,
            result: 'No result',
        }
        this.GetVoiceValue = this.GetVoiceValue.bind(this);
        this.handleScan = this.handleScan.bind(this)
    }

    componentDidMount() {

    }

    handleScan(data) {
        this.setState({
            result: 4566,
        })
    }
    handleError(err) {
        console.error(err)
    }




    GetVoiceValue(data1) {
        console.log("가져온 값" + data1);
        this.setState(
            {
                userNum: data1,
            });
    }

    handleLogin = e => {
        e.preventDefault() //페이징 이동 없게
        console.log("버튼이 누렸어요")
        const login_info = {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                "Content-Type": "application/json"
            }
        };
        fetch("/api/login", login_info).then(res => {
            return res.json();
        })
            .then(json => {
                console.log(json[0])
                console.log("checkpoint1")
                if (json[0] != undefined) {
                    window.localStorage.setItem("userInfo", JSON.stringify(json))
                    this.setState(
                        {
                            userNum: json[0].usernum,
                            name: json[0].name,
                            isLogin: true
                        });
                    console.log(this.state.isLogin)


                }
                else {
                    alert("아이디 혹은 비밀번호를 확인하세요");
                }

            });
    }




    handleuserNum = e => {
        this.setState(
            {
                userNum: e.target.value

            })
    }

 

    render() {
        const previewStyle = {
            height: 240,
            width: 320,
          }
      
        return (
            <>
                <Header />
                {/* <Left></Left> */}
                {/* HEADER */}
                <div className="Content">
                    <div className="LoginPage">
                        {
                            this.state.isLogin === false ? (
                                <div className="Login-form">
                                    <form className="LoginForm" onSubmit={this.handleLogin}>
                                        <div id="title">Namigation</div>
                                        <br></br>
                                        <QrReader
                                         delay={this.state.delay}
                                        style={previewStyle}
                                        onError={this.handleError}
                                        onScan={this.handleScan}
                                        />
                                        <h6>(QR 코드를 보여주세요)</h6>
                                        <p>{this.state.result}</p>
                                        <div><input id="LoginInput" type="text" value={this.state.result} onChange={this.handleuserNum.bind(this)} placeholder="제공받은 유저키를 입력해주세요"></input><button class="btn btn-primary" id="btnLogin" type="submit">로그인</button></div>
                                        {/* <button class="btn btn-primary" id="btnLogin2" onClick={this.haha()}>누르기</button> */}
                                    </form>
                                </div>) : (<div><Predict name={this.state.name} userNum={this.state.userNum} isLogin={this.state.isLogin}></Predict></div>)
                        }
                        <Dictaphone GetVoiceValue={this.GetVoiceValue} />
                    </div>
                    <Footer />
                    {/* Footer */}
                </div>
            </>
        )
    }
}

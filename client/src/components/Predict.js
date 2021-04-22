import React, { Component, Fragment } from 'react'
import { post } from 'axios';
import Table from './Table1'
import '../App.css';
import WelcomePage from './WelcomePage-motion';
import html2canvas from 'html2canvas';
import $ from 'jquery';

export default class Predict extends Component {
    static defaultProps = {
        isLogin:"",
        name:"",
      }
    constructor(props){
    super(props);
    this.state={
        userNum: this.props.userNum,
        high : "",
        middle : "",
        low : "",
        good : "",
        isLogin: null
    }
    this.handleValueChange = this.handleValueChange.bind(this)   
    this.addpredict = this.addpredict.bind(this) 
}


stateRefresh=() => {
    console.log("checkpoin4")
    this.setState(
        {
            predict:"",
            completed:0
        }
    );
  
    this.callApi().then(res=> this.setState({predict:res})).catch(err=> console.log(err))
}

handleFormPredict=(e) =>{
    this.downImg()
    e.preventDefault()
    console.log("checkpoint2")
    // this.addresult()
    // .then((response)=> {
    //     console.log("!!!!!!!"+response.data);
    // })
    this.addpredict()
    .then((response)=> {
        console.log("!!!!!!!"+response.data);
    })
    // this.setState(
    //     {
    //     depth : "",
    //     distance : "",
    //     userNum:"",
    //     }
    // )
    alert("전송완료!")
}



downImg(){
    console.log("이거 했다.")
    html2canvas($("#WebCam")[0]).then(function(canvas){
        var myImage = canvas.toDataURL();
        var link = document.createElement("a")
        link.download = "image\저장할 파일명.png";
        link.href = myImage;
        document.body.appendChild(link);
        link.click();
    });
    
}


// downloadURI= (uri, name1)=> {
//     var link = document.createElement("a")
//     link.download = name1;
//     link.href = uri;
//     document.body.appendChild(link);
//     link.click();
//   }



handleValueChange=(e) => {
    console.log("checkpoint1")
   let nextState={};
   nextState[e.target.name] = e.target.value;
   this.setState(nextState)  
}

    addpredict= () => {
        const url ='/api/predict';
        const formData = new FormData();
        formData.append('userNum',this.props.userNum);
        formData.append('high',this.state.high*100);
        formData.append('middle',this.state.middle*100);
        formData.append('low',this.state.low*100);
        formData.append('good',this.state.good*100);
        const config = {
            headers:{
                'content-type' : 'multipart/form-data'
            }
        }
        return post(url,formData,config);
        }


        //////시작 ////////
        addresult= () => {
            const url ='/api/result/:userNum';
            const formData = new FormData();
            formData.append('userNum',this.props.userNum);
            const config = {
                headers:{
                    'content-type' : 'multipart/form-data'
                }
            }
            return post(url,formData,config);
            }

        //////삭제///////



       

    GetTeachValue = (data1,data2,data3,data4) => {
        this.setState({
            high : data1,
            middle : data2,
            low : data3,
            good : data4,
        })}

    render() {
        return (
            <div className="PredictPage">
                {
                    this.props.isLogin===true ? (              
                    <div className="form">
                        <h1>{this.props.isLogin}</h1>
                        <h6>
                            {this.props.name}님이 로그인 하셨습니다~</h6>
                        <WelcomePage GetTeachValue= {this.GetTeachValue}/>
                        <form onSubmit={this.handleFormPredict}>
                       <input id="HighClass" type="text" name ="high"value={"고위험 : "+this.state.high*100} onChange={this.handleValueChange} placeholder="High"></input>
                        <input type="text" id="MiddleClass" name ="middle" value={"위험 : "+this.state.middle*100} onChange={this.handleValueChange} placeholder="Middle"></input>
                        <input type="text" id="LowClass" name ="low" value={"경고 : "+this.state.low*100} onChange={this.handleValueChange} placeholder="Low"></input>
                        <input type="text" id="GoodClass" name ="good" value={"좋음 : "+this.state.good*100} onChange={this.handleValueChange} placeholder="Good"></input>
                        <input type="hidden" value={this.props.name} ></input>
                        <button type="submit">제출</button>
                        </form>
                        {/* <button type="text" onClick={function(){
                            this.props.isLogin = false
                        }}>이전으로</button>  이거 해결하기*/} 
        </div>) : 
        (<div>로그인 해주세요~</div>)
                }
                {/* <Table name={this.props.name} userNum ={this.state.userNum}> name={this.props.name}</Table> */}
            </div>
        ) 
    }
}

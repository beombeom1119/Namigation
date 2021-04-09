import React, { Component, Fragment } from 'react'
import { post } from 'axios';
import Table from './Table1'
import '../App.css';
import WelcomePage from './WelcomePage-motion';

export default class Predict extends Component {
    static defaultProps = {
        isLogin:"",
        name:"",
      }
    constructor(props){
    super(props);
    this.state={
        userNum: this.props.userNum,
        depth : "",
        distance : "",
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
    e.preventDefault()
    console.log("checkpoint2")
    this.addresult()
    .then((response)=> {
        console.log("!!!!!!!"+response.data);
    })
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
        formData.append('distance',this.state.distance);
        formData.append('depth',this.state.depth);
        const config = {
            headers:{
                'content-type' : 'multipart/form-data'
            }
        }
        return post(url,formData,config);
        }

    addresult= () => {
        const url ='/api/result';
        const formData = new FormData();
        formData.append('userNum',this.props.userNum);
        formData.append('distance',this.state.distance);
        formData.append('depth',this.state.depth);
        const config = {
            headers:{
                'content-type' : 'multipart/form-data'
            }
        }
        return post(url,formData,config);
        
    }

    GetTeachValue = (data1,data2) => {
        this.setState({
            depth : data1,
            distance : data2,
        })}

    render() {
        return (
            <div className="PredictPage">
                {
                    this.props.isLogin===true ? (              
                    <div className="form">
                        <h1>{this.props.isLogin}</h1>
                        <h3>{this.props.name}님이 로그인 하셨습니다~</h3>
                        <WelcomePage GetTeachValue= {this.GetTeachValue}/>
                        <form onSubmit={this.handleFormPredict}>
                        <input type="text" id="FirstClass" name ="depth"value={this.state.depth} onChange={this.handleValueChange} placeholder="깊이"></input>
                        <input type="text" id="SecondClass" name ="distance" value={this.state.distance} onChange={this.handleValueChange} placeholder="너비"></input>
                        <input type="hidden" value={this.props.name} ></input>
                        <button type="submit">제출</button>
                        </form>
                        {/* <button type="text" onClick={function(){
                            this.props.isLogin = false
                        }}>이전으로</button>  이거 해결하기*/} 
        </div>) : 
        (<div>로그인 해주세요~</div>)
                }
                <Table name={this.props.name} userNum ={this.state.userNum}> name={this.props.name}</Table>
            </div>
        ) 
    }
}

import React, { Component } from 'react'
import ResultTable from './TableBody'
import { get } from 'axios';
import '../App.css';

export default class Table extends Component {
    constructor(props){
        super(props);
        this.state={
            userNum: this.props.userNum,
            name: this.props.name,
        }
    }
    
    stateRefresh= () => {           //state 초기화 
        this.setState(
          {
            result:'',
            completed:0
            
          });
          this.callApi().then(res=> this.setState({result:res})) 
          .catch(err=> console.log(err));
         
      }

      componentDidMount() {
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
        this.timer = setInterval(this.progress,20);
        this.callApi().then(res=> this.setState({result:res})) 
        .catch(err=> console.log(err));    // 가져온 JSON값을 customers에 저장
      }
      
      callApi = async() =>{
        const response = await fetch('/api/result');  //server.js 에 있는 /api/customers JSON값을 가져온다
        const body = await response.json();
        console.log(body)
        return body;
        
      }
      
    

    
        

     
    
    render() {
        return (
            <div>
             {this.state.userNum} {this.state.name}
             <br></br>
             <br></br><br></br><br></br><br></br><br></br><br></br>
        <tablehead>
          <tablecell>번호</tablecell>
          <tablecell>유저넘버</tablecell>
          <tablecell>깊이</tablecell>
          <tablecell>길이</tablecell>
          <tablecell>날짜</tablecell>
        </tablehead>
        <tablebody>
        {this.state.result ? this.state.result.map(result=> {return (<ResultTable key = {result.id} id = {result.id} userNum = {result.userNum} depth={result.depth} distance={result.distance} date={result.date} >  </ResultTable>)
        }): (<div>zxczx</div>)
        
        } </tablebody>

            </div>
        )
    }
}

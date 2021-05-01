import React,{Component} from 'react';
import './App.css';
import {withStyles} from '@material-ui/core/styles';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter, Route, Switch, Link  } from 'react-router-dom';
import Table1 from './components/Table1';
import Predict from './components/Predict';
import Qrcode from './components/Qrcode';


const styles = theme => ({
  root : {
    width : '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX:"auto"
  },
    table:{
      minWidth:1080
    },
    progress:{
      margin : theme.spacing.unit*2
    }
})






class App extends Component{

  constructor(props)     
  {
    super(props);
    this.state={
      customers:'',
      completed:0
    }
  }

  stateRefresh= () => {           //state 초기화 
    this.setState(
      {
        customers:'',
        completed:0
      });
      this.callApi().then(res=> this.setState({customers:res})) 
      .catch(err=> console.log(err+"에러"));

  }


  
  componentDidMount() {
    this.timer = setInterval(this.progress,20);
    this.callApi().then(res=> this.setState({customers:res})) 
    .catch(err=> console.log(err));    // 가져온 JSON값을 customers에 저장
  }
  
  callApi = async() =>{
    const response = await fetch('/api/predict');  //server.js 에 있는 /api/customers JSON값을 가져온다
    const body = await response.json();
    return body;
  }

  // callApi1 = async() =>{
  //   const response = await fetch('/api/result');  //server.js 에 있는 /api/customers JSON값을 가져온다
  //   const body = await response.json();
  //   return body;
  // }


 

  progress = () => {
    const {completed} =this.state;
    this.setState({ completed: completed>=100? 0 : completed+1});
  }

  
  render()
  
  {
    const {classes} =this.props;
    return(
      <>
     <div>
     </div>
      {/* <Login></Login> */}
     
      <BrowserRouter>
    <Switch>
    <Route exact path="/" component={Login}/>
     <Route path="/predict" component={Predict}/>
     <Route path="/qrcode" component={Qrcode}/>
    </Switch>
  </BrowserRouter>
  <div>
     </div>
      </>
    );
  }
}


export default withStyles(styles)(App);

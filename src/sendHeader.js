import React from 'react';
import axios from 'axios'
import { config} from "./sendAuthHeader";

class SendHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
          employees : []
      
        }

      
       
    }
    
     
    componentDidMount(){
     localStorage.setItem('auth-token','sfsad@kfdg(sdd8gkjsadg0sgf.sdfg43grgkgsf.aaaaaaaaaaaaaaaa')
      axios.get('http://dummy.restapiexample.com/api/v1/employees',{
        headers: config
      })
      .then(result=>{console.log(result)})
      .catch(error=>{console.log(error)})
      
    }
    render() {

      return(
        
        <h1>sfsd</h1>
      )
    }
  }


export default SendHeader;
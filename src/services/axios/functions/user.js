import axios from 'axios';



export  async function  novoUser(data){
    await axios.post('http://localhost:8080/User',{
        data
    }).then(function(response){
         return true;
      })
      .catch(function(error){
          return false;
      })
}





export  async function  GetUser(){
    await axios.get('http://localhost:8080/User').then(response=>{
          return response.data;
      })
      .catch(function(error){
          return false;
      })
}
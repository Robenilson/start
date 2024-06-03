import React ,{useState}from 'react';
import Card from'../../components/Card';
import { login } from "../../services/UsuarioService";
import Menu from '../../components/menu';
import 'bootstrap/dist/css/bootstrap.min.css';
import { jwtDecode } from 'jwt-decode';
import {useUser} from  "../../services/context/UserContext";


const Login = () => {
    const { setUser } = useUser();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

  
  
    const LogarUsuario = async () => {
      if (email == null || email == "") {
        console.log('erro')      
        return;
      } 
      if (password == null || password == "") {      
        console.log('erro')
        return;
      }
  

     // console.log(email,password )
      
      const vRetorno = await login({ email: email, senha: password });
      console.log('User Data:', vRetorno);
      const userData = jwtDecode(vRetorno);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      console.log('token decode:', userData);
      console.log('User email:', userData.email);
      console.log('User Roles:', userData.Role);

      const LogarUsuario = async ({ email, senha }) => {
        const vRetorno = await login({ email: email, senha: senha });
        console.log('User Data2:', vRetorno);
        if (vRetorno.status && vRetorno.status === 200) {
            // Login bem-sucedido
            console.log('Login bem-sucedido:', vRetorno.data);
        } else {
            // Tratamento de erro
            console.error('Falha no login:', vRetorno.message);
        }
    };
  
    }
  
  
      
   
    return (
       

        
    <Card>
       
        <div className="card-header ">Login</div>
            <div className="card-body ">              
              <form  >
                <div className="form-group ">
                  <label >Email</label>
                  <input type="email" className="form-control my-2 mb-4" id="email"    value={email || ''}    onChange={(e) => setEmail(e.target.value)}   placeholder="Seu email" />              
                </div>
                <div className="form-group">
                  <label >Senha</label>
                  <input type="password" className="form-control my-2  mb-4" id="password"  value={password || ''}   onChange={(e) => setPassword(e.target.value)}  placeholder="Sua senha" />
                </div>                
                <div className="form-group text-center  m-0 mb-1">
                <button type="button"   onClick={ LogarUsuario}  class="btn btn-primary">Entrar</button>
                </div>             
                <div className="form-group text-center">            
               </div>               
              </form>
            </div>
            
    </Card> 
    
     
    );
};

export default Login;

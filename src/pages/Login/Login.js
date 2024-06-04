import React ,{useState}from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from'../../components/Card';
import { login } from "../../services/UsuarioService";
import { useNavigate } from 'react-router-dom';
import  {urls} from"../../services/static/js/urls";
import { jwtDecode } from 'jwt-decode';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);





    const navigate = useNavigate();

  
    const handleSubmit = async (e) => {
      e.preventDefault();
      /*
      const vRetorno = await login({ email: email, senha: password });
      const userData = jwtDecode(vRetorno);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));*/
      navigate(urls.userDados);
      
      
    }
  
  
      
   
    return (
       

        
    <Card>
       
        <div className="card-header ">Login</div>
            <div className="card-body ">              
              <form   onSubmit={handleSubmit} >
                <div className="form-group ">
                  <label >Email</label>
                  <input type="email" className="form-control my-2 mb-4" id="email"    value={email || ''}    onChange={(e) => setEmail(e.target.value)}   placeholder="Seu email" />              
                </div>
                <div className="form-group">
                  <label >Senha</label>
                  <input type="password" className="form-control my-2  mb-4" id="password"  value={password || ''}   onChange={(e) => setPassword(e.target.value)}  placeholder="Sua senha" />
                </div>                
                <div className="form-group text-center  m-0 mb-1">
                <button type="submit"     class="btn btn-primary">Entrar</button>
                </div>             
                <div className="form-group text-center">            
               </div>               
              </form>
            </div>
            
    </Card> 
    
     
    );
};

export default Login;

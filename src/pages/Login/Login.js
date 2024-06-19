import React ,{useState}from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from'../../components/Card';
import { login } from "../../services/UsuarioService";
import { useNavigate } from 'react-router-dom';
import  {urls} from"../../services/static/js/urls";
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);





    const navigate = useNavigate();

  
    const [user, setUser] = useState(null)
  

  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError('');
        //const vRetorno = await login({ email: email, senha: password });

       const vRetorno = (await axios.post("https://localhost:7276/login?email=naruto%40adm.com&password=12345")).data;
        

      try {
  
        if (typeof vRetorno === 'string') {
          const userData = jwtDecode(vRetorno);
          userData.token = vRetorno; 
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
        } else {
          throw new Error('Token inválido recebido do servidor');
        }
      } catch (error) {
        setError('Erro ao realizar login: ' + error.message);
      } finally {
        setLoading(false);
      }
      navigate(urls.userDados);

    };
  
  
      
   
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

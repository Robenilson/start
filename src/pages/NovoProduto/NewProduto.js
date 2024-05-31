import ModalComponet from '../../components/ModalComponet';
import  Menu  from'../../components/menu';
import Card from'../../components/Card';



function NewProduto() {   
      return (
        <Menu>
           <Card>
                <div className="card-header ">Novo Produto</div>
                <div className="card-body ">
                  <form>
                    <div className="form-group ">
                      <label htmlFor="email ">Nome do Produto</label>
                      <input type="email" className="form-control my-2 mb-4" id="email"    placeholder="Nome do Produto" />
                    
                    </div>

                    <div className="form-group">
                      <label htmlFor="password">Valor </label>
                      <input type="number" step="0.01"  name="quantity" min="0.01" className="form-control my-2  mb-4"    placeholder="R$0,00" />
                    </div>   






                 
                 
                 
                 
                 
                    <div className="form-group row text-center">
                       
                       <div className="col-sm-6   mb-3 "  >  
                       
                       <label >
                                <input   className="form-check-input"
                                type="radio" 
                                name="option" 
                                value="cliente" 
                                />
                                Servicio por  Hora 
                            </label>

                     
                       </div>
                       <div className="col-sm-6 mb-3">

                           
                       <label >
                                <input   className="form-check-input"
                                type="radio" 
                                name="option" 
                                value="Adnimistrador" 

                                />
                                Produto Venda Unidade
                            </label>
                       </div>
                       </div>
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                    <div   className="  row text-center" >
                        <div  >

                        </div>

                       
                        <div  >
                     
                        </div>                       
                      
                    </div> 


















                  <div className="form-group text-center  m-0 mb-1">
                  </div>             
                  <div className="form-group text-center">
                    <button    className=" btn btn-primary btn-block ">Entrar</button>
                   </div>               
                  </form>   
                </div>
                </Card>
                </Menu>
      );
    }
    
    export default NewProduto;




export function serviceRetornarConfig(method, url, data) {
    const user = localStorage.getItem('user');
    const token = user ? JSON.parse(user).token : null;
    if (!token) {
        console.error('Token não encontrado');
    }
  
      return {
        method: method,
        url: url,
        headers: {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${token}`
         },
        timeout: 180000,
        data: data,
    };
}




export function serviceRetornarErro(error) {
    if (error.response) {
        // Erros de resposta do servidor (status code 4xx, 5xx)
        return {
            status: error.response.status,
            message: error.response.data.message || 'Erro desconhecido no servidor',
            data: error.response.data
        };
    } else if (error.request) {
        // Erros de requisição sem resposta (problemas de rede, por exemplo)
        return {
            status: null,
            message: 'Sem resposta do servidor. Por favor, tente novamente.',
            data: null
        };
    } else {
        // Outros tipos de erros
        return {
            status: null,
            message: error.message,
            data: null
        };
    }
}
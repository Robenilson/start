


export function serviceRetornarConfig(method, url, data) {
      return {
        method: method,
        url: url,
        headers: {},
        timeout: 180000,
        data: data,
    };
}

export const TenetId  = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    // Verifica se user e user.TenantId existem antes de retornar a query string
    return (user && user.TenantId) ? `${user.TenantId}` : '';
};




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
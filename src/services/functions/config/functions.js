
export function serviceRetornarConfig(method, url, data, authorization) {
    return {
        method: method,
        url: url,
        headers: {
          //  "Content-Type": "application/json",
        //    Authorization: authorization ? "Bearer " + authService.getToken() : "",
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
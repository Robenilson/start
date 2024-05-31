import * as authService from "../AuthService";
//import https from 'https-browserify';
//import './webpack.config';


/*
// Configuração do agente HTTPS
const agent = new https.Agent({
  rejectUnauthorized: false, // Desativa a verificação de certificado SSL (apenas para desenvolvimento)
});
*/
/*
export function serviceRetornarErro(error) {
  console.log("serviceRetornarErro");
  console.log(error);

  if (error.response.status === 401) {
    authService.setSessaoExpirada();
    authService.usuarioLogout();
    window.location.reload(false);
  }

  return {
    HasError: true,
    Message: informarErroGenerico(),
    Object: null,
  };
}*/

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
/*
export function serviceRetornarConfig(method, url, data, authorization) {
  return {
    method: method,
    url: url +"?email="+data.email+'&password='+data.senha ,
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization ? "Bearer " + authService.getToken() : "",
    },
    timeout: 180000,
    data: data,
  };
}
*/

export function serviceRetornarConfig(method, url, data, authorization) {
    return {
        method: method,
        url: url + "?email=" + data.email + "&password=" + data.senha,
        headers: {
            "Content-Type": "application/json",
            Authorization: authorization ? "Bearer " + authService.getToken() : "",
        },
        timeout: 180000,
        data: data,
    };
}


export function isNullOrEmpty(value) {
  if (value == null || value === "") {
    return true;
  } else {
    return false;
  }
}

export function informarCampoMessage(value) {
  return "Favor informar o campo '" + value + "'.";
}

export function informarErroGenerico() {
  return "Ocorreu um erro, favor entrar em contato com o administrador do sistema.";
}

export function stringToDateDMY(string, separator) {
  var d = string.split(separator)[0];
  var m = string.split(separator)[1];
  var y = string.split(separator)[2];

  return new Date(y, m - 1, d);
}
export function getDaysInMonth(y, m) {
  //mes de 1 a 12
  return m === 2
    ? y & 3 || (!(y % 25) && y & 15)
      ? 28
      : 29
    : 30 + ((m + (m >> 3)) & 1);
}

export function getLastDayInMonth(y, m) {
  //mes de 1 a 12
  var d = getDaysInMonth(y, m);

  return new Date(y, m - 1, d);
}

export function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function onKeyDownOnlyNumbers(e) {
  const acceptThisSymbols = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "Backspace",
    "ArrowLeft",
    "ArrowRight",
    "Enter",
    "Control",
    "v",
    "V",
  ];
  !acceptThisSymbols.includes(e.key) && e.preventDefault();
}

export function onChangeOnlyNumbers(e) {
  return e.target.value.replace(/\D/g, "");
}

export function leftPad(number, targetLength) {
  var output = number + "";
  while (output.length < targetLength) {
    output = "0" + output;
  }
  return output;
}

export function removeLeftZeros(text) {
  return text.replace(/^0+/, "");
}

export function verificaREBipadoColaborador(texto) {
  if (texto.length >= 12 && texto.includes("001001")) {
    return texto.replace("001001", "").replace(/^0+/, "");
  } else {
    return false;
  }
}

export function arrayRemove(listaObjetos, objetoRemover) {
  var objRemoveAux = null;

  listaObjetos.forEach((item, index) => {
    if (item.c_id == objetoRemover.c_id) {
      objRemoveAux = item;
    }
  });

  const novaLista = listaObjetos.filter((objeto) => objeto !== objRemoveAux);

  return [...novaLista];
}

export function arrayAdd(listaObjetos, objetoAdd) {
  return [...listaObjetos, objetoAdd];
}

export function getDataHora() {
  // Obtém a data e hora atual
  var dataAtual = new Date();

  // Obtém os componentes da data e hora
  var dia = dataAtual.getDate();
  var mes = dataAtual.getMonth() + 1; // Os meses começam em zero, então é necessário adicionar 1
  var ano = dataAtual.getFullYear();
  var hora = dataAtual.getHours();
  var minutos = dataAtual.getMinutes();
  var segundos = dataAtual.getSeconds();

  // Formata os componentes com zeros à esquerda, se necessário
  dia = dia < 10 ? "0" + dia : dia;
  mes = mes < 10 ? "0" + mes : mes;
  hora = hora < 10 ? "0" + hora : hora;
  minutos = minutos < 10 ? "0" + minutos : minutos;
  segundos = segundos < 10 ? "0" + segundos : segundos;

  // Cria a string formatada
  var dataHoraFormatada =
    dia + "/" + mes + "/" + ano + " " + hora + ":" + minutos + ":" + segundos;

  return dataHoraFormatada;
}

export function getDataHoraString() {
  // Obtém a data e hora atual
  var dataAtual = new Date();

  // Obtém os componentes da data e hora
  var dia = dataAtual.getDate();
  var mes = dataAtual.getMonth() + 1; // Os meses começam em zero, então é necessário adicionar 1
  var ano = dataAtual.getFullYear();
  var hora = dataAtual.getHours();
  var minutos = dataAtual.getMinutes();
  var segundos = dataAtual.getSeconds();

  // Formata os componentes com zeros à esquerda, se necessário
  dia = dia < 10 ? "0" + dia : dia;
  mes = mes < 10 ? "0" + mes : mes;
  hora = hora < 10 ? "0" + hora : hora;
  minutos = minutos < 10 ? "0" + minutos : minutos;
  segundos = segundos < 10 ? "0" + segundos : segundos;

  // Cria a string formatada
  var dataHoraFormatada =
    dia + "_" + mes + "_" + ano + "_" + hora + "_" + minutos + "_" + segundos;

  return dataHoraFormatada;
}

export function tratarNomeAutores(texto) {
  // Use uma expressão regular para substituir todos os números por uma string vazia.
  texto = texto.replace(/[0-9]/g, "");
  texto = texto.replace("*", "");
  texto = texto.replace(",,", ",");
  return texto;
}

export function dataCitacaoVancouver() {
  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const dataAtual = new Date();
  const ano = dataAtual.getFullYear();
  const mes = meses[dataAtual.getMonth()];
  const dia = dataAtual.getDate();

  return `${ano} ${mes} ${dia}`;
}

export function dataCitacaoABTN() {
  const meses = [
    "jan.",
    "fev.",
    "mar.",
    "abr.",
    "maio",
    "jun.",
    "jul.",
    "ago.",
    "set.",
    "out.",
    "nov.",
    "dez.",
  ];

  const dataAtual = new Date();
  const ano = dataAtual.getFullYear();
  const mes = meses[dataAtual.getMonth()];
  const dia = dataAtual.getDate();

  return `${dia} ${mes} ${ano}`;
}

export function converterData(data) {
  // Crie um objeto Date a partir da string de data original
  const dataOriginal = new Date(data);

  // Extraia os componentes de data e hora
  const dia = String(dataOriginal.getDate()).padStart(2, "0");
  const mes = String(dataOriginal.getMonth() + 1).padStart(2, "0");
  const ano = dataOriginal.getFullYear();
  const horas = String(dataOriginal.getHours()).padStart(2, "0");
  const minutos = String(dataOriginal.getMinutes()).padStart(2, "0");
  const segundos = String(dataOriginal.getSeconds()).padStart(2, "0");

  // Crie a string no formato desejado
  const dataFormatada = `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;

  return dataFormatada;
}

export function validarEmail(email) {
  // Expressão regular para validar o formato de um endereço de e-mail
  const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  // Testa o e-mail com a expressão regular e retorna true se for válido, caso contrário, retorna false
  return regex.test(email);
}

export function validarCPF(cpf) {
  // Remove caracteres especiais (pontos e hífens) do CPF
  cpf = cpf.replace(/[.-]/g, "");

  // Verifica se o CPF tem 11 dígitos
  if (cpf.length !== 11) {
    return false;
  }

  // Realiza o cálculo dos dígitos verificadores
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  const digito1 = 11 - (soma % 11);

  if (digito1 === 10 || digito1 === 11) {
    digito1 = 0;
  }

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  const digito2 = 11 - (soma % 11);

  if (digito2 === 10 || digito2 === 11) {
    digito2 = 0;
  }

  // Verifica se os dígitos calculados são iguais aos dígitos informados no CPF
  if (
    parseInt(cpf.charAt(9)) === digito1 &&
    parseInt(cpf.charAt(10)) === digito2
  ) {
    return true;
  }

  return false;
}

export function isVisible(el) {
  const rect = el.getBoundingClientRect();
  const vWidth = window.innerWidth || document.documentElement.clientWidth;
  const vHeight = window.innerHeight || document.documentElement.clientHeight;
  const efp = function (x, y) {
    return document.elementFromPoint(x, y);
  };
  // Return false if it's not in the viewport
  if (
    rect.right < 0 ||
    rect.bottom < 0 ||
    rect.left > vWidth ||
    rect.top > vHeight
  ) {
    return false;
  }
  // Return true if any of its four corners are visible
  return (
    el.contains(efp(rect.left, rect.top)) ||
    el.contains(efp(rect.right, rect.top)) ||
    el.contains(efp(rect.right, rect.bottom)) ||
    el.contains(efp(rect.left, rect.bottom))
  );
}

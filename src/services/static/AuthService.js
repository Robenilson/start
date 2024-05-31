import jwt_decode from "jwt-decode";
import axios from "axios";
import { endPoints } from "../static/js/endpoints";
import * as functions from "../static/js/functions";

export function usuarioAutenticado() {
  var user = JSON.parse(sessionStorage.getItem("user"));
  if (user) {
    return true;
  } else {
    return false;
  }
}

export function setUsuario(user) {
  if (user) sessionStorage.setItem("user", JSON.stringify(user));
}

export function setSessaoExpirada() {
  sessionStorage.setItem("sessaoExpirada", JSON.stringify(true));
}

export function getSessaoExpirada() {
  var status = sessionStorage.getItem("sessaoExpirada");

 

  if (status) return true;
  else return false;
}

export function deleteSessaoExpirada() {
  sessionStorage.removeItem("sessaoExpirada");
}

export function usuarioTemPermissao(rolesPermissionadas) {
  var permissoesUsuario = usuarioPermissoes();

  if (
    //percorre lista de roles permissionadas e verifica se o usuário possui uma delas
    rolesPermissionadas.some((permission) => {
      return permissoesUsuario.includes(permission);
    })
  ) {
    return true;
  } else {
    return false;
  }
}

export function usuarioLogout() {
  sessionStorage.removeItem("user");
}

export function getUsuario() {
  return JSON.parse(sessionStorage.getItem("user"));
}

export function getToken() {
  var { token } = getUsuario();
  return token;
}

export function usuarioPermissoes() {
  var { tipo } = getUsuario();
  var retorno = [tipo];
  return retorno;
}

export function getUsuarioNome() {
  var { nome } = getUsuario();
  return nome;
}

export function getUsuarioEmail() {
  var { email } = getUsuario();
  return email;
}

export function getUsuarioFoto() {
  var { Foto } = getUsuario();
  return Foto;
}

export function getRe() {
  var { RE } = getUsuario();
  return RE;
}

export function getTipoColaborador() {
  var { TipoColaborador } = getUsuario();
  return TipoColaborador;
}

export function getCodigoEmpresa() {
  var { CodigoEmpresa } = getUsuario();
  return CodigoEmpresa;
}

export function getCargoColaborador() {
  var { Tipo } = getUsuario();
  return Tipo;
}

export function getTipoEvolucao() {
  var { TipoEvolucao } = getUsuario();
  return TipoEvolucao;
}

export function getCdPessoaFisicaUsuario() {
  var { Cod_Pessoa_Fisica } = getUsuario();
  return Cod_Pessoa_Fisica;
}

export function getNmConselhoUsuario() {
  var { Conselho } = getUsuario();
  return Conselho;
}

export function getCdProfissionalUsuario() {
  var { Cod_Profissional } = getUsuario();
  return Cod_Profissional;
}

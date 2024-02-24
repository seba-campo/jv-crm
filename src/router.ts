import { Router } from "@vaadin/router";
import { deployState } from "./state";

const root = document.querySelector(".root-container");
const router = new Router(root);

// Check if is deployed...
const actualUrl = window.location.origin;
if(actualUrl.startsWith("https://seba-campo.github.io")){
  console.log("PROD")
  deployState.setDeployedStatus(true)
}
if(actualUrl.startsWith("http://localhost")){
  console.log("DEV")  
  deployState.setDeployedStatus(false)
}

const cs = deployState.getState();

if(cs.deployed){
  router.setRoutes([
    {path: '/jv-crm/', component: 'login-page'},
    {path: '/jv-crm/cliente', component: 'cliente-page'},
    {path: '/jv-crm/empresa', component: 'empresa-page'},
    {path: '/jv-crm/expired', component: 'session-expired'}
  ]);
}
if(!cs.deployed){
  router.setRoutes([
    {path: '/', component: 'login-page'},
    {path: '/cliente', component: 'cliente-page'},
    {path: '/empresa', component: 'empresa-page'},
    {path: '/expired', component: 'session-expired'}
  ]);
}
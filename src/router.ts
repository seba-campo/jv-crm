import { Router } from "@vaadin/router";
import { deployState } from "./state";

const root = document.querySelector(".root-container");
const router = new Router(root);

// Check if is deployed...
const actualUrl = window.location.origin;
if(actualUrl.startsWith("https://seba-campo.github.io")){
  deployState.setDeployedStatus(true)
}
if(actualUrl.startsWith("http://localhost")){
  console.log("DEV")  
  deployState.setDeployedStatus(false)
}

const cs = deployState.getState();

if(cs.deployed){
  router.setRoutes([
    {path: '/jv-crm/', component: 'welcome-page'},
    {path: '/jv-crm/', component: 'game-room-page'},
    {path: '/jv-crm/', component: 'play-page'},
    {path: '/jv-crm/', component: 'results-page'}
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
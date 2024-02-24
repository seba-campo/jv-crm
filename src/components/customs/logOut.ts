import { Router } from "@vaadin/router";
import { deployState } from "../../state";

class LogOut extends HTMLElement{
    shadow = this.attachShadow({mode: "open"});
    constructor(){
        super();
        this.render();
    }
    connectedCallback(){
        // Se va a ejecutar cuando se corra el component
    }
    render(){
        const div = document.createElement("div");
        const style = document.createElement("style");
        const titleInAttr = this.getAttribute("title")
        div.innerHTML = /*html*/`
            <div class="root">
                <div class="div-button">
                    <p class="p-button">Cerrar sesión</p>
                </div>
            </div>
        `
        
        style.textContent = /*css*/`        
        .root{
            display: flex;
            width: 100%;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            margin: 15px 0;
            cursor: pointer;
        }

        .div-button{
            width: 110px;;
            height: 40px;
            display: flex;
            justify-content: center;
            background-color: #e42323;
            border-radius: 5px;
            align-items: center;
            margin-bottom: 15px;
        }

        .p-button{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            font-size: 15px;
            font-weight: 700;
            color: white;
            text-align: center;
        }
        `
        
        const buttonEl = div.querySelector(".div-button") as HTMLElement;
        const deployedStatus = deployState.getState().deployed;
        buttonEl.addEventListener("click", ()=>{
            if(!deployedStatus){
                Router.go("/");
            }
            else{
                Router.go("/jv-crm/")
            }
            localStorage.clear();
        })

        div.appendChild(style);
        this.shadow.appendChild(div)
    }
}

customElements.define("log-out", LogOut);
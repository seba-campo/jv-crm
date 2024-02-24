import { Router } from "@vaadin/router";
import { deployState } from "../state";

class SessionExpired extends HTMLElement{
    shadow = this.attachShadow({mode: "open"});
    constructor(){
        super();
        this.render();
    }
    connectedCallback(){
        // Se va a ejecutar cuando se corra la /page
    }
    render(){
        const div = document.createElement("div");
        const style = document.createElement("style");
        const image = require("url:../assets/denied.png")

        div.innerHTML = /*html*/`
            <div class="root-expired">
                <div class="top-text-div">
                    <p class="top-p">
                        Sesion expirada, vuelva a ingresar
                    </p>
                </div>
                
                <div class="image-div">
                </div>

                <div class="button-div">
                    <button class="login-btn">Ingresar</button>
                </div>
            </div>
        `
        
        style.textContent = /*css*/`
            .root-expired{
                width: 100vw;
                height: 100vh;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            .top-text-div{
                width: 100vw;
                height: 50px;
                margin: 45px 0;
                text-align: center;
                display: flex;
                align-items: center;
                justify-content: center
            }

            .top-p{
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                font-size: 35px;
                font-weight: 350;
                margin: 0;
            }

            .image-div{
                width: 400px;
                height: 360px;
                background-image: url(${image});
                background-size: 500px;
                background-repeat: no-repeat;
                background-position: center
            }

            .button-div{
                width: 150px;
            }

            .login-btn{
                cursor: pointer;
                height: 42px;
                width: 150px;
                padding: 6px 24px;
                font-size: 18px;
                color: #fff;
                border-radius: 5px;
                border: none;
                background-color: #5C9902;
            }
        `

        const loginBtnEl = div.querySelector(".login-btn") as HTMLButtonElement;

        loginBtnEl.addEventListener("click", ()=>{
            // Borrar el local storage del sitio
            localStorage.clear();
            // Enviar al login
            const deployedStatus = deployState.getState().deployed;
            if(!deployedStatus){
                Router.go("/")
            }
            else{
                Router.go("/jv-crm/")
            }
        })

        div.appendChild(style)
        this.shadow.appendChild(div);
    }
}

customElements.define("session-expired", SessionExpired);
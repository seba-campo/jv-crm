import { API_URL } from "../../state";
import { Router } from "@vaadin/router";
import { state, deployState } from "../../state";
import * as crypto from "crypto-browserify";



class CreateHorse extends HTMLElement{
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

        div.innerHTML = /*html*/`
            <div class="root">
                <div class="container-title">
                    <page-title title="Crear caballo"></page-title>               
                </div>
                
            </div>
        `
        
        style.textContent = /*css*/`        
        .root{
            display: flex;
            width: 80vw;
            height: 100vh;
            justify-content: flex-start;
            align-items: center;
            flex-direction: column;
        }

        .container-title{
            width: 100%;
            height: 60px;
        }
        `

        div.appendChild(style)
        this.shadow.appendChild(div);
    }
}

customElements.define("create-horse", CreateHorse);
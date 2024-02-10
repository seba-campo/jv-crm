import { API_URL } from "../state";
import { Router } from "@vaadin/router";
import { state, deployState } from "../state";
import * as crypto from "crypto-browserify";



class ClientMainComponent extends HTMLElement{
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
        
        const userName = "Karina"

        div.innerHTML = `
            <div class="client-bar-root">
                <div class="bar-header">
                    <p>Hola ${userName}</p>
                </div>
                
                <div class="bar-options">
                    <div class="option mis-abonos">
                        <p>Mis Abonos</p>
                        <p>></p>
                        <div class="abonos-options">
                            <div>
                        </div>
                    </div>
                    <div class="option mis-pagos">
                        <p>Mis Pagos</p>
                    </div>
                    <div class="option mis-datos">
                        <p>Mis datos</p>
                    </div>
                </div>
            </div>

            <div class="main-container">
                <!-- Aca van los componentes que cada option dispare -->
            </div>
        `
        
        style.textContent = `
        `

        div.appendChild(style)
        this.shadow.appendChild(div);
    }
}

customElements.define("client-component", ClientMainComponent);
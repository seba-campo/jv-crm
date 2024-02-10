import { API_URL } from "../state";
import { Router } from "@vaadin/router";
import { state, deployState } from "../state";
import * as crypto from "crypto-browserify";

class Empresa extends HTMLElement{
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

        const lsMail = localStorage.getItem("loginMailSaved");

        div.innerHTML = `
            <div class="root-empresa">
                <admin-component></admin-component>
            </div>
        `
        
        style.textContent = `
            
        `

        div.appendChild(style)
        this.shadow.appendChild(div);
    }
}

customElements.define("empresa-page", Empresa);
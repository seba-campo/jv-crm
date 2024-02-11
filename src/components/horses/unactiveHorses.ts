import { API_URL } from "../../state";
import { Router } from "@vaadin/router";
import { state, deployState } from "../../state";
import * as crypto from "crypto-browserify";



class UnactiveHorses extends HTMLElement{
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
            <div>
                HOLA DESDE UNACTIVE HORSE
            </div>
        `
        
        style.textContent = `
        `

        div.appendChild(style)
        this.shadow.appendChild(div);
    }
}

customElements.define("unactive-horses", UnactiveHorses);
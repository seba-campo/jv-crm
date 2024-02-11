import { Router } from "@vaadin/router";
import { state, deployState } from "../../state";

class AllHorses extends HTMLElement{
    shadow = this.attachShadow({mode: "open"});
    constructor(){
        super();
        this.render();
    }
    async connectedCallback(){
        const caballos = await state.getAllHorses();
        console.log(caballos)
    }
    render(){
        const div = document.createElement("div");
        const style = document.createElement("style");

        div.innerHTML = /*html*/`
            <div>
                HOLA DESDE ALL HORSES
            </div>
        `
        
        style.textContent = `
        `

        div.appendChild(style)
        this.shadow.appendChild(div);
    }
}

customElements.define("all-horses", AllHorses);
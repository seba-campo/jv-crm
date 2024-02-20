import { state } from "../state";

class Cliente extends HTMLElement{
    shadow = this.attachShadow({mode: "open"});
    constructor(){
        super();
    }
    async connectedCallback(){
        const usereEmail = state.getState().userClientData.email;
        state.getUserInfo(usereEmail)
        .then(()=>{
            this.render();
        })
        // Se va a ejecutar cuando se corra la /page
    }
    render(){
        const div = document.createElement("div");
        const style = document.createElement("style");

        const lsMail = localStorage.getItem("loginMailSaved");

        div.innerHTML = `
            <div class="root-cliente">
                <client-component></client-component>
            </div>
        `
        
        style.textContent = `
            
        `

        div.appendChild(style)
        this.shadow.appendChild(div);
    }
}

customElements.define("cliente-page", Cliente);
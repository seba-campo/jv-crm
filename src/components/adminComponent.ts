import { API_URL } from "../state";
import { Router } from "@vaadin/router";
import { state, deployState } from "../state";
import * as crypto from "crypto-browserify";
import { log } from "console";



class AdminMainComponent extends HTMLElement{
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
        <div class="root">
            <div class="admin-bar-root">
                <div class="bar-header">
                    <p>Hola ${userName}</p>
                </div>
                

                <div class="bar-options">
                    <div class="option caballos" id="0">
                        <div class="option-wrapper">
                            <p>Caballos</p>
                            <p>></p>
                        </div>
                        <div class="caballos-options extras">
                            <div>
                                <p>Agregar caballo</p>
                            </div>
                            <div>
                                <p>Caballos activos</p>
                            </div>
                            <div>
                                <p>Caballos inactivos</p>
                            </div>
                            <div>
                                <p>Todos los registros</p>
                            </div>
                        </div>
                    </div>

                    <div class="option clientes" id="1">
                        <div class="option-wrapper">
                            <p>Clientes</p>
                            <p>></p>
                        </div>
                        <div class="clientes-options extras">
                            <div>
                                <p>Agregar cliente</p>
                            </div>
                            <div>
                                <p>Clientes activos</p>
                            </div>
                            <div>
                                <p>Clientes inactivos</p>
                            </div>
                            <div>
                                <p>Todos los registros</p>
                            </div>
                        </div>
                    </div>

                    <div class="option servicios" id="2">
                        <div class="option-wrapper">
                            <p>Servicios</p>
                            <p>></p>
                        </div>
                        <div class="servicios-options extras">
                            <div>
                                <p>Cargar servicio</p>
                            </div>
                            <div>
                                <p>Servicios pendientes</p>
                            </div>
                            <div>
                                <p>Todos los registros</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div class="main-container">
                <!-- Aca van los componentes que cada option dispare -->
            </div>
        </div>
        `
        
        style.textContent = `
        .root{
            display: flex;
            font-family: 'Assistant', sans-serif;
        }

        .admin-bar-root{
            display: flex; 
            flex-direction: column;
            width: 20vw;
            height: 100vh;
        }

        .main-container{
            background-color: #f8fbf8;
            width: 80vw;
            height: 100vh;
        }

        .option-wrapper{
            display: flex;
            justify-content: space-between;
        }

        .option{
            background-color: transparent;
            border-radius: 0 10px 10px 0;
            margin-right: 15px;
            padding: 0 15px 0 15px;
            font-size: 16px;
            font-weight: 800;
        }
        
        .option-selected{
            background-color: #3498db; 
            color: #fff
        }

        .extras{
            display: none
        }
        `

        const caballosOption = div.querySelector(".caballos") as HTMLDivElement;
        const clientesOption = div.querySelector(".clientes") as HTMLDivElement;
        const serviciosOption = div.querySelector(".servicios") as HTMLDivElement;

        const optionsBar =  div.querySelector(".bar-options") as HTMLDivElement;

        caballosOption.addEventListener("click", ()=>{
            this.selectOption(caballosOption, optionsBar)
        })
        clientesOption.addEventListener("click", ()=>{
            this.selectOption(clientesOption, optionsBar)
        })
        serviciosOption.addEventListener("click", ()=>{
            this.selectOption(serviciosOption, optionsBar)
        })


        div.appendChild(style)
        this.shadow.appendChild(div);
    }
    selectOption(o: HTMLDivElement, d: HTMLElement){
        const caballosOption = d.querySelector(".caballos") as HTMLDivElement;
        const clientesOption = d.querySelector(".clientes") as HTMLDivElement;
        const serviciosOption = d.querySelector(".servicios") as HTMLDivElement;

        const objetiveClassString = o.className.toString();
        const objetiveClass = objetiveClassString.split(" ")[1];

        switch(objetiveClass){
            case "caballos":
                caballosOption.classList.add("option-selected");
                clientesOption.classList.remove("option-selected")
                serviciosOption.classList.remove("option-selected")
        }

    }
}

customElements.define("admin-component", AdminMainComponent);
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
        const chevRight = require("url:../assets/chevron-right.svg");
        const chevDown = require("url:../assets/chevron-down.svg");


        div.innerHTML = /*html*/`
        <div class="root">
            <div class="admin-bar-root">
                
                <div class="bar-options">
                    <div class="bar-header">
                        <p>Panel administrador</p>
                    </div>

                    <div class="option clientes" id="1">
                        <div class="option-wrapper">
                            <p>Clientes</p>
                            <img class="chev-clientes" src="${chevRight}">
                        </div>
                        <div class="clientes-options extras">
                            <div class="agregar-cliente">
                                <p>Agregar cliente</p>
                            </div>
                            <div class="buscar-cliente">
                                <p>Buscar cliente</p>
                            </div>
                            <div class="all-clientes">
                                <p>Todos los clientes</p>
                            </div>
                        </div>
                    </div>

                    <div class="option caballos" id="0">
                        <div class="option-wrapper">
                            <p>Caballos</p>
                            <img class="chev-caballos" src="${chevRight}">                          
                        </div>
                        <div class="caballos-options extras">
                            <div class="crear-caballo">
                                <p>Agregar caballo</p>
                            </div>
                            <div class="caballos-activos">
                                <p>Caballos activos</p>
                            </div>
                            <div class="all-horses">
                                <p>Todos los registros</p>
                            </div>
                        </div>
                    </div>

                    <div class="option servicios" id="2">
                        <div class="option-wrapper">
                            <p>Servicios</p>
                            <img class="chev-servicios" src="${chevRight}">
                        </div>
                        <div class="servicios-options extras">
                            <div class="crear-servicio">
                                <p >Cargar servicio</p>
                            </div>
                            <div class="servicios-pendientes">
                                <p>Servicios pendientes</p>
                            </div>
                            <div class="all-services">
                                <p>Todos los registros</p>
                            </div>
                        </div>
                    </div>

                </div>

                <log-out class="log-out-btn"></log-out>
            </div>

            <div class="main-container">
                <!-- Aca van los componentes que cada option dispare -->
            </div>
        </div>
        `
        
        style.textContent = /*css*/`
        .root{
            display: flex;
            font-family: 'Assistant', sans-serif;
        }

        .admin-bar-root{
            display: flex; 
            flex-direction: column;
            justify-content: space-between;
            width: 20vw;
            height: 100vh;
        }
        @media(min-width: 1100px){
            .admin-bar-root{
                width: 15vw;
            }
        }

        .main-container{
            background-color: #f8fbf8;
            width: 80vw;
            height: 100vh;
        }

        .bar-header{
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 15px 0 35px 0;
        }

        .option-wrapper{
            display: flex;
            justify-content: space-between;
        }

        .option{
            background-color: transparent;
            border-radius: 0 10px 10px 0;
            margin: 5px 15px 5px 0;
            padding: 0 15px 10px 15px;
            font-size: 16px;
            font-weight: 800;
            transition: 0.3s linear

        }
        
        .option-selected{
            background-color: #5C9902; 
            color: #fff;
        }

        .extras{
            display: none;
            font-weight: 500;
            cursor: pointer
        }

        .main-container{
            width: 80vw;
        }
        @media(min-width: 1100px){
            .main-container{
                width: 85vw;
            }
        }

        `

        const caballosOption = div.querySelector(".caballos") as HTMLDivElement;
        const clientesOption = div.querySelector(".clientes") as HTMLDivElement;
        const serviciosOption = div.querySelector(".servicios") as HTMLDivElement;

        const mainContainer = div.querySelector(".main-container") as HTMLDivElement
        

        // Subopciones de cada menu
        const extraOptionsCaballos = div.querySelector(".caballos-options") as HTMLDivElement
        const extraOptionsClientes = div.querySelector(".clientes-options") as HTMLDivElement
        const extraOptionsServicios = div.querySelector(".servicios-options") as HTMLDivElement
        const optionsBar =  div.querySelector(".bar-options") as HTMLDivElement;
        
        const chevClientes = div.querySelector(".chev-clientes") as HTMLImageElement;
        const chevCaballos = div.querySelector(".chev-caballos") as HTMLImageElement;
        const chevServicios = div.querySelector(".chev-servicios") as HTMLImageElement;

        caballosOption.addEventListener("click", ()=>{
            caballosOption.classList.add("option-selected");
            clientesOption.classList.remove("option-selected");
            serviciosOption.classList.remove("option-selected");

            // MOSTRAR LAS OTRAS OPCIONES
            extraOptionsCaballos.style.display = "block";
            extraOptionsClientes.style.display = "none";
            extraOptionsServicios.style.display = "none";
            // CAMBIAR EL AFTER
            chevCaballos.src = chevDown;
            // 
            chevClientes.src = chevRight;
            chevServicios.src = chevRight;

        })
        clientesOption.addEventListener("click", ()=>{
            caballosOption.classList.remove("option-selected");
            clientesOption.classList.add("option-selected");
            serviciosOption.classList.remove("option-selected");
            // MOSTRAR LAS OTRAS OPCIONES
            extraOptionsCaballos.style.display = "none";
            extraOptionsClientes.style.display = "block";
            extraOptionsServicios.style.display = "none";
            // CAMBIAR EL AFTER
            chevClientes.src = chevDown;
            // 
            chevCaballos.src = chevRight;
            chevServicios. src = chevRight;
        })
        serviciosOption.addEventListener("click", ()=>{
            caballosOption.classList.remove("option-selected");
            clientesOption.classList.remove("option-selected");
            serviciosOption.classList.add("option-selected");
            // MOSTRAR LAS OTRAS OPCIONES
            extraOptionsCaballos.style.display = "none";
            extraOptionsClientes.style.display = "none";
            extraOptionsServicios.style.display = "block";
            // CAMBIAR EL AFTER
            chevServicios.src = chevDown;
            // 
            chevCaballos.src = chevRight;
            chevClientes.src = chevRight;
        })


        //CREAR CABALLO
        const crearCaballoDiv = div.querySelector(".crear-caballo");
        crearCaballoDiv.addEventListener("click", ()=>{
            mainContainer.innerHTML = '<create-horse></create-horse>';
        })

        //CABALLOS ACTIVOS
        const caballosActivosDiv = div.querySelector(".caballos-activos");
        caballosActivosDiv.addEventListener("click", ()=>{
            mainContainer.innerHTML = '<active-horses></active-horses>';
        })
        
        //TODOS LOS CABALLOS
        const allCaballosDiv = div.querySelector(".all-horses");
        allCaballosDiv.addEventListener("click", ()=>{
            mainContainer.innerHTML = '<all-horses></all-horses>';
        })

        //CREAR CLIENTE
        const crearClienteDiv = div.querySelector(".agregar-cliente");
        crearClienteDiv.addEventListener("click", ()=>{
            mainContainer.innerHTML = '<create-client></create-client>';
        })

        //CREAR CLIENTE
        const modificarClienteDiv = div.querySelector(".buscar-cliente");
        modificarClienteDiv.addEventListener("click", ()=>{
            mainContainer.innerHTML = '<search-client></search-client>';
        })

        //TODOS LOS CLIENTES
        const allClientesDiv = div.querySelector(".all-clientes");
        allClientesDiv.addEventListener("click", ()=>{
            mainContainer.innerHTML = '<all-clients></all-clients>';
        })

        //CREAR SERVICIO
        const crearServicioDiv = div.querySelector(".crear-servicio");
        crearServicioDiv.addEventListener("click", ()=>{
            mainContainer.innerHTML = '<create-service></create-service>';
        })

        const serviciosPendientesDiv = div.querySelector(".servicios-pendientes");
        serviciosPendientesDiv.addEventListener("click", ()=>{
            console.log("hola")
            mainContainer.innerHTML = '<pending-services></pending-services>';
        })

        const allServicesDiv = div.querySelector(".all-services");
        allServicesDiv.addEventListener("click", ()=>{
            console.log("hola")
            mainContainer.innerHTML = '<all-services></all-services>';
        })

        div.appendChild(style)
        this.shadow.appendChild(div);
    }
}

customElements.define("admin-component", AdminMainComponent);
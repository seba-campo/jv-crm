import { API_URL } from "../../state";
import { Router } from "@vaadin/router";
import { state, deployState } from "../../state";
import * as crypto from "crypto-browserify";
import { info, log } from "console";



class SearchClient extends HTMLElement{
    shadow = this.attachShadow({mode: "open"});
    constructor(){
        super();
        this.render();
    }
    connectedCallback(){
        // state.subscribe((cs)=>{
        //     console.log("el state cambió, voy a re-renderizarme")
        //     this.render()
        // })
    }
    clienteEncontrado: any
    caballosDelCliente: any
    serviciosDelCliente: any
    render(){
        const div = document.createElement("div");
        const style = document.createElement("style");

        console.log(this.clienteEncontrado)
        console.log(this.caballosDelCliente)
        console.log(this.serviciosDelCliente)

        div.innerHTML = /*html*/`
            <div class="root">
                <div class="root-title"><page-title title="Buscar cliente"></page-title></div>

                <div class="search-options">

                    <div class="by-dni-tel-container">
                        <div class="option-container">
                            <label for="dni">Por dni</label>
                            <input class="option-search-input search-dni" name="dni" type="number" placeholder="Dni">
                        </div>
                        
                        <div class="option-container">
                            <label for="telefono">Por telefono</label>
                            <input class="option-search-input search-telefono" name="telefono" type="number" placeholder="Telefono">
                        </div>
                    </div>

                    <div class="search-nombre-apellido-div">
                        <div class="option-container nombre-apellido-div">
                            <label for="nombre-apellido">Por nombre y apellido</label>
                            <input class="option-search-input search-nombre-apellido-input" name="nombre-apellido" type="text" placeholder="Nombre y apellido">
                        </div>
                    </div>

                    <div class="options-add">
                        <button class="search-client">Buscar</button>
                    </div>
                </div>

                <div class="root-title"><page-title title="Resultado de busqueda"></page-title></div>

                <div class="search-result-container">
                    <div class="tabla-cliente"></div>
                    <div class="tabla-caballos"></div>
                    <div class="tabla-servicios"></div>
                    <div class="loader-container">
                        <div class="loader"></div>
                    </div>
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
            overflow:auto;
        }
        @media(min-width: 1100px){
            .root{
                width: 85vw;
            }
        }

        .root-title{
            width: 100%;
            height: 60px;
            margin-bottom: 15px;
        }

        .search-options{
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            flex-direction: column;
            width: 400px;
            min-height: 300px;
            max-height: 340px;
            margin-bottom: 10px;
        }

        .by-dni-tel-container{
            width: 400px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .search-dni{
            width: 150px;
        }

        .search-telefono{
            width: 150px;
        }

        .search-nombre-apellido-div{
            width: 400px;
            display: flex; 
            justify-content: center;
            align-items: center;
        }

        .nombre-apellido-div{
            width: 400px;
        }
        .search-nombre-apellido-input{
            width: 350px;
        }

        .option-container{
            flex-shrink: 0;
            border-radius: 5px;
            display: flex; 
            flex-direction: column;
            justify-content: flex-start
        }
        
        .option-search-input{
            padding: 11px 14px;
            font-size: 15px;
            line-height: 20px;
            margin: 0;
            border: 1px solid black;
            border-radius: 5px;
            background-color: #eeeeee;
            color: inherit;
            text-align: inherit;
            transition: .3s ease;
        }
        .option-search-input:hover{
            background-color: #dedede;
        }

        .option-search-input:focus{
            outline: none;
        }
        

        .option-add{
            border-radius: 5px;
            border: 1px solid #73963e;
        }
        
        .search-client{
            cursor: pointer;
            width: 140px;
            height: 42px;
            padding: 6px 24px;
            font-size: 18px;
            color: #fff;
            border-radius: 5px;
            border: none;
            background-color: #5C9902;
        }

        /* SEARCH RESULTS */
        .search-result-container{
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-content: center;
            margin-bottom: 40px; 
        }

        .client-info-container{
            display: flex;
            width: 75vw;
            flex-wrap:wrap;
            justify-content: space-evenly;
            align-items: center;
        }

        .table-header{
            font-size: 25px;
            font-weight: 800;
            color:  #5C9902;
            margin: 20px 0 0 0;
        }

        /* LOADER */
        .loader-container{
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 30px;
            width: 80vw;
            height: 40px;
        }

        .loader {
            display: none;
            border: 5px solid #f3f3f3; /* Light grey */
            border-top: 5px solid #3498db; /* Blue */
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1.5s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        /* ESTILOS TABLAS  */
        .table{
            border: 1px solid #e4e4e4;
            border-radius: 8px;
            width: 75vw;
        }

        .table-head{
            background-color: #ededed;
            color: #566686;
            height: 60px;
            font-weight: 600;
            line-height: 16px;

            font-size: 18px;
            border-bottom: 2px solid #e4e4e4;
        }

        th{
            text-align: start;
            padding: 0 10px;
        }

        td{
            border-bottom: 2px solid #e4e4e4;
            font-size: 17px;
            height: 38px;
            padding: 0 10px;
        }
        tr{
            border-spacing: 0px;
            border-collapse: collapse
        }
        tr:hover{
            transition: .2s ease-in-out;
            background-color: #0d80f217;
        }
        `

        const inputDniEl = div.querySelector(".search-dni") as HTMLInputElement
        const inputTelEl = div.querySelector(".search-telefono") as HTMLInputElement
        const inputNombreApellidoEl = div.querySelector(".search-nombre-apellido-input") as HTMLInputElement;
        const buttonSearch = div.querySelector(".search-client") as HTMLButtonElement;

        buttonSearch.addEventListener("click", async ()=>{
            const nombre = inputNombreApellidoEl.value.split(" ")[0];
            const apellido = inputNombreApellidoEl.value.split(" ")[1];
            // state.clearClientInfo();
            
            const searchQuery = {
                dni: inputDniEl.value,
                telefono: inputTelEl.value,
                nombre,
                apellido
            }

            const tablaClienteEl = div.querySelector(".tabla-cliente") as HTMLElement;
            tablaClienteEl.innerHTML = "";
            const tablaCaballosEl = div.querySelector(".tabla-caballos") as HTMLElement;
            tablaCaballosEl.innerHTML = "";
            const tablaServiciosEl = div.querySelector(".tabla-servicios") as HTMLElement;
            tablaServiciosEl.innerHTML = "";


            const loaderEl = div.querySelector(".loader") as HTMLElement;

            if(searchQuery.dni.length != 0){
                loaderEl.style.display = "block"
                // limpiar state
                // Traer info del cliente 
                state.getClientDataBy("dni", {dni: parseInt(searchQuery.dni)})
                .then(()=>{
                    const infoDelCliente = state.getState().clientInformation.clientData;
                    // console.log(infoDelCliente)
                    // Formatearla en HTML
                    var htmlClientTemplate = `
                    <div class="tabla-cliente">
                            <p class="table-header">Cliente</p>
                            <table class="table" cellspacing="0" cellpadding="0">
                                <thead class="table-head">
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Apellido</th>
                                        <th>Estado</th>
                                        <th>Dni</th>
                                        <th>Telefono</th>
                                    </tr>
                                </thead>
                                <tr>
                                    <td>${infoDelCliente.nombre}</td>
                                    <td>${infoDelCliente.apellido}</td>
                                    <td>${infoDelCliente.estado}</td>
                                    <td>${infoDelCliente.dni}</td>
                                    <td>${infoDelCliente.telefono}</td>
                                </tr>
                            </table>
                        </div>
                    `
                    // Agregarla a su container
                    tablaClienteEl.innerHTML += htmlClientTemplate;

                    // BUSCAR CABALLOS A SU NOMBRE
                    state.getHorsesFromClient(infoDelCliente.id)
                    .then(()=>{
                        const clientHorsesState = state.getState().clientInformation.clientHorses;
                        var htmlClientHorsesTemplate = `
                            <p class="table-header">Caballos del cliente</p>
                            <table class="table" cellspacing="0" cellpadding="0">
                                <thead class="table-head">
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Pelaje</th>
                                        <th>Abono</th>
                                        <th>Ingreso</th>
                                        <th>Egreso</th>
                                        <th>Libreta</th>
                                        <th>Observaciones</th>
                                    </tr>
                                </thead>
                                    ${
                                        clientHorsesState.map((h)=>{
                                            return `
                                            <tr>
                                                <td>${h.nombre}</td>
                                                <td>${h.pelaje}</td>
                                                <td>${h.abono}</td>
                                                <td>${h.ingreso}</td>
                                                <td>${h.egreso == null ? ' - ' : h.egreso}</td>
                                                <td>${h.libreta}</td>
                                                <td>${h.obs}</td>
                                            </tr>
                                            `
                                        })
                                    }     
                            </table>
                        `
                        tablaCaballosEl.innerHTML += htmlClientHorsesTemplate;

                        state.getServicesFromUserId(infoDelCliente.id)
                        .then(()=>{
                            const clientServicesState = state.getState().clientInformation.clientServices;
                            var htmlClientHorsesTemplate = `
                                <p class="table-header">Servicios del cliente</p>
                                <table class="table" cellspacing="0" cellpadding="0">
                                    <thead class="table-head">
                                        <tr>
                                            <th>Tipo</th>
                                            <th>Subtipo</th>
                                            <th>Costo</th>
                                            <th>Estado</th>
                                            <th>Fecha servicio</th>
                                            <th>Obs</th>
                                        </tr>
                                    </thead>
                                        ${
                                            clientServicesState.map((s)=>{
                                                return `
                                                <tr>
                                                    <td>${s.tipo}</td>
                                                    <td>${s.subTipo}</td>
                                                    <td>${s.costo}</td>
                                                    <td>${s.estado}</td>
                                                    <td>${s.fechaServicio}</td>
                                                    <td>${s.obs}</td>
                                                </tr>
                                                `
                                            })
                                        }
                                </table>
                            `
                            tablaServiciosEl.innerHTML += htmlClientHorsesTemplate
                            loaderEl.style.display = "none"
                            const generalTableEl = div.querySelectorAll(".table") as NodeList;
                            generalTableEl.forEach((t: HTMLElement)=>{
                                console.log(t.previousSibling.remove())
                            })
                        })
                    })
                })
                
            }
            else if(searchQuery.telefono.length != 0){
                loaderEl.style.display = "block"
                // limpiar state
                // Traer info del cliente 
                state.getClientDataBy("tel", {telefono: parseInt(searchQuery.telefono)})
                .then(()=>{
                    const infoDelCliente = state.getState().clientInformation.clientData;
                    // console.log(infoDelCliente)
                    // Formatearla en HTML
                    var htmlClientTemplate = `
                    <div class="tabla-cliente">
                            <p class="table-header">Cliente</p>
                            <table class="table" cellspacing="0" cellpadding="0">
                                <thead class="table-head">
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Apellido</th>
                                        <th>Estado</th>
                                        <th>Dni</th>
                                        <th>Telefono</th>
                                    </tr>
                                </thead>
                                <tr>
                                    <td>${infoDelCliente.nombre}</td>
                                    <td>${infoDelCliente.apellido}</td>
                                    <td>${infoDelCliente.estado}</td>
                                    <td>${infoDelCliente.dni}</td>
                                    <td>${infoDelCliente.telefono}</td>
                                </tr>
                            </table>
                        </div>
                    `
                    // Agregarla a su container
                    tablaClienteEl.innerHTML += htmlClientTemplate;

                    // BUSCAR CABALLOS A SU NOMBRE
                    state.getHorsesFromClient(infoDelCliente.id)
                    .then(()=>{
                        const clientHorsesState = state.getState().clientInformation.clientHorses;
                        var htmlClientHorsesTemplate = `
                            <p class="table-header">Caballos del cliente</p>
                            <table class="table" cellspacing="0" cellpadding="0">
                                <thead class="table-head">
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Pelaje</th>
                                        <th>Abono</th>
                                        <th>Ingreso</th>
                                        <th>Egreso</th>
                                        <th>Libreta</th>
                                        <th>Observaciones</th>
                                    </tr>
                                </thead>
                                    ${
                                        clientHorsesState.map((h)=>{
                                            return `
                                            <tr>
                                                <td>${h.nombre}</td>
                                                <td>${h.pelaje}</td>
                                                <td>${h.abono}</td>
                                                <td>${h.ingreso}</td>
                                                <td>${h.egreso == null ? ' - ' : h.egreso}</td>
                                                <td>${h.libreta}</td>
                                                <td>${h.obs}</td>
                                            </tr>
                                            `
                                        })
                                    }     
                            </table>
                        `
                        tablaCaballosEl.innerHTML += htmlClientHorsesTemplate;

                        state.getServicesFromUserId(infoDelCliente.id)
                        .then(()=>{
                            const clientServicesState = state.getState().clientInformation.clientServices;
                            var htmlClientHorsesTemplate = `
                                <p class="table-header">Servicios del cliente</p>
                                <table class="table" cellspacing="0" cellpadding="0">
                                    <thead class="table-head">
                                        <tr>
                                            <th>Tipo</th>
                                            <th>Subtipo</th>
                                            <th>Costo</th>
                                            <th>Estado</th>
                                            <th>Fecha servicio</th>
                                            <th>Obs</th>
                                        </tr>
                                    </thead>
                                        ${
                                            clientServicesState.map((s)=>{
                                                return `
                                                <tr>
                                                    <td>${s.tipo}</td>
                                                    <td>${s.subTipo}</td>
                                                    <td>${s.costo}</td>
                                                    <td>${s.estado}</td>
                                                    <td>${s.fechaServicio}</td>
                                                    <td>${s.obs}</td>
                                                </tr>
                                                `
                                            })
                                        }
                                </table>
                            `
                            tablaServiciosEl.innerHTML += htmlClientHorsesTemplate
                            loaderEl.style.display = "none"
                            const generalTableEl = div.querySelectorAll(".table") as NodeList;
                            generalTableEl.forEach((t: HTMLElement)=>{
                                console.log(t.previousSibling.remove())
                            })
                        })
                    })
                })
            }
            else if(searchQuery.nombre.length != 0 && searchQuery.apellido.length != 0){
                loaderEl.style.display = "block"
                // limpiar state
                // Traer info del cliente 
                state.getClientDataBy("nombre", {
                    nombre: searchQuery.nombre, 
                    apellido: searchQuery.apellido
                })
                .then(()=>{
                    const infoDelCliente = state.getState().clientInformation.clientData;
                    // console.log(infoDelCliente)
                    // Formatearla en HTML
                    var htmlClientTemplate = `
                    <div class="tabla-cliente">
                            <p class="table-header">Cliente</p>
                            <table class="table" cellspacing="0" cellpadding="0">
                                <thead class="table-head">
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Apellido</th>
                                        <th>Estado</th>
                                        <th>Dni</th>
                                        <th>Telefono</th>
                                    </tr>
                                </thead>
                                <tr>
                                    <td>${infoDelCliente.nombre}</td>
                                    <td>${infoDelCliente.apellido}</td>
                                    <td>${infoDelCliente.estado}</td>
                                    <td>${infoDelCliente.dni}</td>
                                    <td>${infoDelCliente.telefono}</td>
                                </tr>
                            </table>
                        </div>
                    `
                    // Agregarla a su container
                    tablaClienteEl.innerHTML += htmlClientTemplate;

                    // BUSCAR CABALLOS A SU NOMBRE
                    state.getHorsesFromClient(infoDelCliente.id)
                    .then(()=>{
                        const clientHorsesState = state.getState().clientInformation.clientHorses;
                        var htmlClientHorsesTemplate = `
                            <p class="table-header">Caballos del cliente</p>
                            <table class="table" cellspacing="0" cellpadding="0">
                                <thead class="table-head">
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Pelaje</th>
                                        <th>Abono</th>
                                        <th>Ingreso</th>
                                        <th>Egreso</th>
                                        <th>Libreta</th>
                                        <th>Observaciones</th>
                                    </tr>
                                </thead>
                                    ${
                                        clientHorsesState.map((h)=>{
                                            return `
                                            <tr>
                                                <td>${h.nombre}</td>
                                                <td>${h.pelaje}</td>
                                                <td>${h.abono}</td>
                                                <td>${h.ingreso}</td>
                                                <td>${h.egreso == null ? ' - ' : h.egreso}</td>
                                                <td>${h.libreta}</td>
                                                <td>${h.obs}</td>
                                            </tr>
                                            `
                                        })
                                    }     
                            </table>
                        `
                        tablaCaballosEl.innerHTML += htmlClientHorsesTemplate;

                        state.getServicesFromUserId(infoDelCliente.id)
                        .then(()=>{
                            const clientServicesState = state.getState().clientInformation.clientServices;
                            var htmlClientHorsesTemplate = `
                                <p class="table-header">Servicios del cliente</p>
                                <table class="table" cellspacing="0" cellpadding="0">
                                    <thead class="table-head">
                                        <tr>
                                            <th>Tipo</th>
                                            <th>Subtipo</th>
                                            <th>Costo</th>
                                            <th>Estado</th>
                                            <th>Fecha servicio</th>
                                            <th>Obs</th>
                                        </tr>
                                    </thead>
                                        ${
                                            clientServicesState.map((s)=>{
                                                return `
                                                <tr>
                                                    <td>${s.tipo}</td>
                                                    <td>${s.subTipo}</td>
                                                    <td>${s.costo}</td>
                                                    <td>${s.estado}</td>
                                                    <td>${s.fechaServicio}</td>
                                                    <td>${s.obs}</td>
                                                </tr>
                                                `
                                            })
                                        }
                                </table>
                            `
                            tablaServiciosEl.innerHTML += htmlClientHorsesTemplate
                            loaderEl.style.display = "none"
                            const generalTableEl = div.querySelectorAll(".table") as NodeList;
                            generalTableEl.forEach((t: HTMLElement)=>{
                                console.log(t.previousSibling.remove())
                            })
                        })
                    })
                })            
            }
            else{
                console.log("no hay search")
            }

        })
        div.appendChild(style)
        this.shadow.appendChild(div);
    }
}

customElements.define("search-client", SearchClient);
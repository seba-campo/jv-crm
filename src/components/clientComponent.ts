import { state } from "../state";
class ClientMainComponent extends HTMLElement{
    shadow = this.attachShadow({mode: "open"});
    constructor(){
        super();
    }
    async connectedCallback(){
        const userName = state.getState().userClientData.nombre;
        const userId = state.getState().userClientData.id;
        this.userName = userName
        this.userId = userId

        await state.getServicesFromUserId(this.userId)
        await state.getHorsesFromClient(this.userId)

        console.log(state.getState())
        this.render();
    }
    userName: string;
    userId: number;
    async render(){
        const div = document.createElement("div");
        const style = document.createElement("style");

        div.innerHTML = `
        <div class="client-bar-root">
            <div class="bar-header">
                <p class="bar-header-p">Hola ${this.userName}</p>
            </div>

            <div class="main-container">
                <div class="tabla-caballos"></div>
                <div class="tabla-servicios"></div>
                <div class="loader-container">
                <div class="loader"></div>
            </div>

            <log-out></log-out>
        </div>
        `
        
        style.textContent = /*css*/`
            .client-bar-root{
                display: flex;
                flex-direction:column;
                justify-content:flex-start;
                align-items: center;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            }

            .bar-header{
                width: 100vw;
                height: 60px;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .bar-header-p{
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                font-size: 25px;
                font-weight: 600;
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
        
        const tablaCaballosEl = div.querySelector(".tabla-caballos") as HTMLElement;
        tablaCaballosEl.innerHTML = "";
        const tablaServiciosEl = div.querySelector(".tabla-servicios") as HTMLElement;
        tablaServiciosEl.innerHTML = "";


        const loaderEl = div.querySelector(".loader") as HTMLElement;

        loaderEl.style.display = "block"
        
        const clientHorsesState = state.getState().clientInformation.clientHorses;
        console.log(clientHorsesState)
        var htmlClientHorsesTemplate = `
            <p class="table-header">Caballos a su nombre</p>
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

        const clientServicesState = state.getState().clientInformation.clientServices;
        var htmlClientHorsesTemplate = `
            <p class="table-header">Servicios a su nombre</p>
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

        div.appendChild(style)
        this.shadow.appendChild(div);
        })
    }
}

customElements.define("client-component", ClientMainComponent);
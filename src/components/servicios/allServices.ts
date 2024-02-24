import { state, deployState } from "../../state";

class AllServices extends HTMLElement{
    shadow = this.attachShadow({mode: "open"});
    constructor(){
        super();
    }
    listaDeServicios: any
    async connectedCallback(){
        const caballos = await state.getAllServices();
        this.listaDeServicios = JSON.stringify(caballos)
        this.render()
    }
    render(){
        const div = document.createElement("div");
        const style = document.createElement("style");

        const listaDeServiciosJSON = JSON.parse(this.listaDeServicios.split(","));

        div.innerHTML = /*html*/`
            <div class="root">

                <div class="root-title"><page-title title="Todos los caballos"></page-title></div>

                <div class="table-container">
                    <div class="table-options">
                        <div class="options-search">
                            <input class="option-search-input" type="text" placeholder="Buscar servicio">
                        </div>
    
                        <div class="options-add">
                            <button class="add-service-btn">Agregar nuevo Servicio</button>
                        </div>
                    </div>
                    <table class="table" cellspacing="0" cellpadding="0">
                        <thead class="table-head">
                            <tr>
                                <th>Cliente</th>
                                <th>Tipo</th>
                                <th>SubTipo</th>
                                <th>Costo</th>
                                <th>Estado</th>
                                <th>Fecha de carga</th>
                                <th>Observaciones</th>
                            </tr>
                        </thead>
                        ${
                            listaDeServiciosJSON.map((e)=>{
                                return `
                                    <tr>
                                        <td>${e.nombreCliente}</td>
                                        <td>${e.tipo}</td>
                                        <td>${e.subTipo}</td>
                                        <td>${e.costo}</td>
                                        <td>${e.estado}</td>
                                        <td>${e.fechaServicio}</td>
                                        <td>${e.obs}</td>
                                    </tr>
                                `
                            })
                        }
                    </table>
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

        .root-title{
            width: 100%;
            height: 60px;
            margin-bottom: 15px;
        }

        .table-container{
            width: 75vw;
            font-family: 'Roboto', sans-serif;
        }


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

        .table-options{
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 70px;
            margin-bottom: 10px;
        }

        .options-search{
            width: 380px;
            flex-shrink: 0;
            border-radius: 5px;
            border: 2px solid black;    
        }
        
        .option-search-input{
            padding: 11px 14px;
            font-size: 15px;
            line-height: 20px;
            width: 100%;
            margin: 0;
            border: 0;
            background-color: transparent;
            color: inherit;
            text-align: inherit;
        }
        .option-search-input:focus{
            outline: none;
            border: none;
        }

        .option-add{
            border-radius: 5px;
            border: 1px solid #73963e;
        }
        
        .add-service-btn{
            cursor: pointer;
            height: 42px;
            padding: 6px 24px;
            font-size: 18px;
            color: #fff;
            border-radius: 5px;
            border: none;
            background-color: #5C9902;
        }
        `
        const tableEl = div.querySelector(".table") as HTMLElement;
        tableEl.previousSibling.remove()

        const addHorseButton = div.querySelector(".add-service-btn") as HTMLButtonElement;

        addHorseButton.addEventListener("click", ()=>{
            const rootMainContainerPath = document.querySelector("body").querySelector("empresa-page").shadowRoot.querySelector("admin-component").shadowRoot.querySelector(".main-container")
            rootMainContainerPath.innerHTML = "<create-service></create-service>"
        })

        div.appendChild(style)
        this.shadow.appendChild(div);
    }
}

customElements.define("all-services", AllServices);
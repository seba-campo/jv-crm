import { Router } from "@vaadin/router";
import { state, deployState } from "../../state";

class AllHorses extends HTMLElement{
    shadow = this.attachShadow({mode: "open"});
    constructor(){
        super();
    }
    listaDeCaballos: any
    async connectedCallback(){
        const caballos = await state.getAllHorses();
        this.listaDeCaballos = JSON.stringify(caballos)
        this.render()
    }
    render(){
        const div = document.createElement("div");
        const style = document.createElement("style");

        const listaDeCaballosJSON = JSON.parse(this.listaDeCaballos.split(","));

        div.innerHTML = /*html*/`
            <div class="root">

                <div class="div-title">
                    <p class="p-title">Todos los Caballos</p>
                </div>

                <div class="table-container">
                    <div class="table-options">
                        <div class="options-search">
                            <input class="option-search-input" type="text" placeholder="Buscar caballo">
                        </div>
    
                        <div class="options-add">
                            <button class="option-add-btn">Agregar nuevo Caballo</button>
                        </div>

                    </div>
                    <table class="table">
                        <tr>
                            <th>Nombre</th>
                            <th>Pelaje</th>
                            <th>Abono</th>
                            <th>Fecha Ingreso</th>
                            <th>Fecha Egreso</th>
                            <th>Observaciones</th>
                        </tr>
                        ${
                            listaDeCaballosJSON.map((e)=>{
                                console.log(e)
                                return `
                                    <tr>
                                        <td>${e.nombre}</td>
                                        <td>${e.pelaje}</td>
                                        <td>${e.abono}</td>
                                        <td>${e.ingreso}</td>
                                        <td>${e.egreso ? '' : e.egreso}</td>
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
        table, th, td {
            border:1px solid black;
        }
        
        .root{
            display: flex;
            width: 80vw;
            height: 100vh;
            justify-content: flex-start;
            align-items: center;
            flex-direction: column;
        }

        .div-title{
            width: 100%;
            height: 70px;
            border-bottom: 1px solid #2a2929;
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }

        .p-title{
            margin: 0 32px;
            font-size: 20px;
            font-weight: 500;
        }

        .table-container{
            width: 75vw
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
            border: 1px solid black;    
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
        
        .option-add-btn{
            cursor: pointer;
            height: 42px;
            padding: 6px 24px;
            font-size: 18px;
            color: #e6f2ff;
            border-radius: 5px;
            border: none;
            background-color: #73963e;
        }

        .table{
            width: 70vw;
        }
        `

        div.appendChild(style)
        this.shadow.appendChild(div);
    }
}

customElements.define("all-horses", AllHorses);
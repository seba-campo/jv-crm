import { API_URL } from "../../state";
import { Router } from "@vaadin/router";
import { state, deployState } from "../../state";
import * as crypto from "crypto-browserify";



class ModifyClient extends HTMLElement{
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
            <div class="root">
                <div class="root-title"><page-title title="Modificar cliente"></page-title></div>

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
            height: 350px;
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
        `

        div.appendChild(style)
        this.shadow.appendChild(div);
    }
}

customElements.define("modify-client", ModifyClient);
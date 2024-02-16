import { API_URL } from "../../state";
import { Router } from "@vaadin/router";
import { state, deployState } from "../../state";
import * as crypto from "crypto-browserify";



class CreateClient extends HTMLElement{
    shadow = this.attachShadow({mode: "open"});
    constructor(){
        super();
        this.render()
    }
    async connectedCallback(){
    }
    render(){
        const div = document.createElement("div");
        const style = document.createElement("style");

        div.innerHTML = /*html*/`
            <div class="root">
                <div class="container-title">
                    <page-title title="Agregar cliente nuevo"></page-title>               
                </div>

                <div class="form-root">
                    <form action="" class="form">
                        <div class="form-div-input">
                            <label for="nombre">Nombre:</label>
                            <input class="form-input-text name-input" type="text" name="nombre" id="">
                        </div>
                        <div class="form-div-input">
                            <label for="pelaje">Apellido:</label>
                            <input class="form-input-text apellido-input" type="text" name="pelaje" id="">
                        </div>
                        <div class="form-div-input">
                            <label for="pelaje">Telefono contacto:</label>
                            <input class="form-input-text tel-input" type="number" min="99999999" name="pelaje" id="">
                        </div>
                        <div class="form-div-input">
                            <label for="pelaje">Dni:</label>
                            <input class="form-input-text dni-input" type="dni" min="99999999" name="pelaje" id="">
                        </div>
                        
                        <div class="pop-up-msj" id="msj-success">
                            <form-message status="200">Cliente creado correctamente</form-message>
                        </div>
                            
                        <div class="pop-up-msj" id="msj-error">
                            <form-message status="500">Error al crear</form-message>
                        </div>

                        <div class="form-div-input">
                            <button class="submit-btn">Crear</button>
                        </div>
                    </form>

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
            font-family: 'Roboto', sans-serif;
        }

        .container-title{
            width: 100%;
            height: 60px;
        }
        
        .form-root{
            height: 100vh;
            width: 80vw;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
        }

        .form{
            display: flex;
            justify-content: space-around;
            align-items: center;
            flex-direction: column;

        }
        
        .form-div-input{
            display: flex;
            height: 50px;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: flex-start;
            margin: 15px 0 ;
        }

        .form-input-text{
            width: 243px;
            height: 28px;
            font-size: 17px;
        }

        .submit-btn{
            justify-self: center;
            cursor: pointer;
            height: 42px;
            width: 245px;
            padding: 6px 24px;
            font-size: 18px;
            color: #fff;
            border-radius: 5px;
            border: none;
            background-color: #5C9902;
        }

        select {
            display:flex;
            flex-direction: column;
            position:relative;
            width:250px;
            height:28px;
            font-size: 17px;
            justify-content: center;
            align-items: center
        }

        option {
            padding:0 30px 0 10px;
            min-height:40px;
            display:flex;
            align-items:center;
            border-top:#222 solid 1px;
            position:absolute;
            top:0;
            width: 100%;
            pointer-events:none;
            order:2;
            z-index:1;
            transition:background .4s ease-in-out;
            box-sizing:border-box;
            overflow:hidden;
            white-space:nowrap;
        }

        label{
            font-size: 18px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

        }

        select:focus option {
            position:relative;
            pointer-events:all;
        }

        input:checked + label {
            order: 1;
            z-index:2;
            background:#666;
            border-top:none;
            position:relative;
        }

        input:checked + label:after {
            content:'';
            width: 0; 
            height: 0; 
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-top: 5px solid white;
            position:absolute;
            right:10px;
            top:calc(50% - 2.5px);
            pointer-events:none;
            z-index:3;
        }

        input:checked + label:before {
            position:absolute;
            right:0;
            height: 40px;
            width: 40px;
            content: '';
            background:#666;
        }

        .pop-up-msj{
            width: 100px;
            height: 50px;
        }

        #msj-error{
            display: none;
        }

        #msj-success{
            display: none;
        }
        `

        const formEl = div.querySelector(".form") as HTMLFormElement;

        formEl.addEventListener("submit", async (e)=>{
            e.preventDefault();

            const nombre = div.querySelector(".name-input") as HTMLInputElement;
            const apellido = div.querySelector(".apellido-input") as HTMLInputElement;
            const dni = div.querySelector(".dni-input") as HTMLSelectElement;
            const tel = div.querySelector(".tel-input") as HTMLSelectElement;


            const newClientData = {
                nombre: nombre.value,
                apellido: apellido.value,
                telefono: parseInt(tel.value),
                dni: parseInt(dni.value)
            };

            const successMsj = div.querySelector("#msj-success") as HTMLDivElement;
            const errorMsj = div.querySelector("#msj-error") as HTMLDivElement;

            if(newClientData.nombre.length != 0){
                if(newClientData.apellido.length != 0){
                    state.createClient(newClientData)
                    .then((res)=>{
                        successMsj.style.display = "flex"
                        console.log("Realizado")
                        setTimeout(()=>{
                            successMsj.style.display = "none"
                        }, 9000)
                    })
                    .catch((e)=>{
                        errorMsj.style.display = "flex"
                        console.log("No se pudo crear")
                        setTimeout(()=>{
                            errorMsj.style.display = "none"
                        }, 9000)
                    });
                }
            }else{
                errorMsj.style.display = "flex"
                        console.log("No se pudo crear")
                        setTimeout(()=>{
                            errorMsj.style.display = "none"
                        }, 9000)
            }
        })
        div.appendChild(style)
        this.shadow.appendChild(div);
    }
}

customElements.define("create-client", CreateClient);
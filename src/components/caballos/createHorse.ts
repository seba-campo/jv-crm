import { API_URL } from "../../state";
import { Router } from "@vaadin/router";
import { state, deployState } from "../../state";
import * as crypto from "crypto-browserify";



class CreateHorse extends HTMLElement{
    shadow = this.attachShadow({mode: "open"});
    constructor(){
        super();
    }
    clientes: any
    async connectedCallback(){
        // Se va a ejecutar cuando se corra el component
        // Traer todos los clientes;
        try{
            const clientes = await state.getAllClientes();
            this.clientes =  JSON.stringify(clientes);
        }
        catch{
            
        }
        this.render();
    }
    render(){
        const div = document.createElement("div");
        const style = document.createElement("style");

        const clientesSplitted = JSON.parse(this.clientes.split(","));

        div.innerHTML = /*html*/`
            <div class="root">
                <div class="container-title">
                    <page-title title="Crear caballo"></page-title>               
                </div>

                <div class="form-root">
                    <form action="" class="form">
                        <div class="form-div-input">
                            <label for="nombre">Nombre:</label>
                            <input class="form-input-text name-input" type="text" name="nombre" id="">
                        </div>
                        <div class="form-div-input">
                            <label for="pelaje">Pelaje:</label>
                            <input class="form-input-text pelaje-input" type="text" name="pelaje" id="">
                        </div>
                        <div class="form-div-input">
                            <label for="propietario">Propietario:</label>
                            <select name="propietario" class="propietario-sel">
                                ${
                                    clientesSplitted.map((c)=>{
                                        return `<option value='${c.id}'>${c.nombre} ${c.apellido}</option>`
                                    })
                                }
                                
                            </select>
                        </div>
                        <div class="form-div-input">
                            <label for="libreta">Libreta:</label>
                            <select name="libreta" id="" class="libreta-sel">
                                <option id="libreta-si" value="true">Tiene</option>
                                <option id="libreta-no" value="false">No tiene</option>
                            </select>
                        </div>
                        <div class="form-div-input">
                            <label for="abono">Abono:</label>
                            <select name="abono" id="" class="abono-sel">
                                <option value="campo">Campo</option>
                                <option value="box">Box</option>
                            </select>
                        </div>
                        <div class="form-div-input">
                            <label for="obs">Observaciones:</label>
                            <input class="form-input-text obs-input" type="text" name="obs" id="">
                        </div>

                        <div class="pop-up-msj" id="msj-success">
                            <form-message status="200">Caballo creado correctamente</form-message>
                        </div>
                            
                        <div class="pop-up-msj" id="msj-error">
                            <form-message status="500">Error al crear caballo</form-message>
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

        .form{
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;
        }
        
        .form-root{
            height: 100vh;
            width: 80vw;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
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
            const pelaje = div.querySelector(".pelaje-input") as HTMLInputElement;
            const idPropietario = div.querySelector(".propietario-sel") as HTMLSelectElement;
            const libreta = div.querySelector(".libreta-sel") as HTMLSelectElement;
            const abono = div.querySelector(".abono-sel") as HTMLSelectElement;
            const obs = div.querySelector(".obs-input") as HTMLInputElement;

            const successMsj = div.querySelector("#msj-success") as HTMLDivElement;
            const errorMsj = div.querySelector("#msj-error") as HTMLDivElement;

            const newHorseData = {
                nombre: nombre.value,
                pelaje: pelaje.value,
                idPropietario: parseInt(idPropietario.value),
                libreta: JSON.parse(libreta.value),
                abono: abono.value,
                obs: obs.value,
            };

            state.createHorse(newHorseData)
            .then((res)=>{
                successMsj.style.display = "flex"
                console.log("Realizado")
                setTimeout(()=>{
                    successMsj.style.display = "none"
                }, 9000)
            })
            .catch((e)=>{
                console.log(e)
                errorMsj.style.display = "flex"
                console.log("No se pudo crear")
                setTimeout(()=>{
                    errorMsj.style.display = "none"
                }, 9000)
            })
        })

        div.appendChild(style)
        this.shadow.appendChild(div);
    }
}

customElements.define("create-horse", CreateHorse);
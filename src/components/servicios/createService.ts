import { API_URL } from "../../state";
import { Router } from "@vaadin/router";
import { state, deployState } from "../../state";
import * as crypto from "crypto-browserify";



class CreateService extends HTMLElement{
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
            console.log("Sesion expirada");
            Router.go("/expired")
        }
        finally{
            this.render();
        }
    }
    render(){
        const div = document.createElement("div");
        const style = document.createElement("style");

        const clientesSplitted = JSON.parse(this.clientes.split(","));

        div.innerHTML = /*html*/`
            <div class="root">
                <div class="container-title">
                    <page-title title="Cargar servicio a cliente"></page-title>               
                </div>

                <div class="form-root">
                    <form action="" class="form">
                        <div class="form-div-input">
                            <label for="propietario">Cliente:</label>
                            <select name="propietario" class="propietario-sel">
                                ${
                                    clientesSplitted.map((c)=>{
                                        return `<option value='${c.id}/${c.nombre} ${c.apellido}'>${c.nombre} ${c.apellido}</option>`
                                    })
                                }
                                
                            </select>
                        </div>
                        <!-- <div class="form-div-input">
                            <label for="nombre">Tipo de servicio:</label>
                            <input class="form-input-text name-input" type="text" name="nombre" id="">
                        </div> -->
                        <div class="form-div-input">
                            <label for="servicio">Tipo de servicio:</label>
                            <select name="servicio" id="" class="servicio-sel">
                                <option value="herrería">Herrería</option>
                                <option value="veterinaria">Veterinaria</option>
                                <option value="insumos">Insumos</option>
                                <option value="entrenamiento">Entrenamiento</option>
                                <option value="clases">Clases</option>
                                <option value="adicionales">Adicionales</option>
                            </select>
                        </div>
                        <div class="form-div-input">
                            <label for="subtipo">Sub-tipo de servicio:</label>
                            <input class="form-input-text subtipo-input" type="text" name="subtipo" id="">
                        </div>
                        <div class="form-div-input">
                            <label for="costo">Costo $:</label>
                            <input class="form-input-text costo-input" type="number" name="costo" id="">
                        </div>
                        <div class="form-div-input">
                            <label for="estado">Estado:</label>
                            <select name="estado" id="" class="estado-sel">
                                <option id="pendiente" value="pendiente">Pendiente</option>
                                <option id="finalizado" value="finalizado">Finalizado</option>
                            </select>
                        </div>
                        <!-- <div class="form-div-input">
                            <label for="abono">Abono:</label>
                            <select name="abono" id="" class="abono-sel">
                                <option value="campo">Campo</option>
                                <option value="box">Box</option>
                            </select>
                        </div> -->
                        <div class="form-div-input">
                            <label for="obs">Observaciones:</label>
                            <textarea class="form-input-text obs-input" type="text" cols="40" rows="5" name="obs" id=""></textarea>
                        </div>

                        <div class="form-messages">
                            <div class="success-div">
                                <form-message status="200">Creado correctamente</form-message>
                            </div>
                            <div class="error-div">
                                <form-message status="500">No se pudo crear</form-message>
                            </div>
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

        .form-messages{
            display: flex;
            align-items: center;
            flex-direction: column
        }
        
        .success{
            display: none;
        }

        .error{
            display: none;
        }
        `

        const formEl = div.querySelector(".form") as HTMLFormElement;

        formEl.addEventListener("submit", async (e)=>{
            e.preventDefault();

            const cliente = div.querySelector(".propietario-sel") as HTMLInputElement;
            const tipoServicio = div.querySelector(".servicio-sel") as HTMLInputElement;
            const subTipoServicio = div.querySelector(".subtipo-input") as HTMLSelectElement;
            const costo = div.querySelector(".costo-input") as HTMLInputElement;
            const estado = div.querySelector(".estado-sel") as HTMLSelectElement;
            const obs = div.querySelector(".obs-input") as HTMLSelectElement;

            const newService = {
                idCliente: cliente.value.split("/")[0],
                nombreCliente: cliente.value.split("/")[1],
                tipo: tipoServicio.value,
                subTipo: subTipoServicio.value,
                costo: parseInt(costo.value),
                estado: estado.value,
                obs: obs.value,
            };

            // const newHorseCreation = await state.createHorse(newService);
            console.log(newService)

            try{
                const newServiceTransaction = await state.createNewService(newService)
            }
            catch(e){
                console.error(e)
                const errorMessage = div.querySelector(".error-div") as HTMLElement;
                errorMessage.style.display = "flex"
                setTimeout(()=>{
                    errorMessage.style.display = "none"
                }, 9000)
            }
            finally{
                const successMessage = div.querySelector(".success-div") as HTMLElement;
                successMessage.style.display = "flex"
                setTimeout(()=>{
                    successMessage.style.display = "none"
                }, 9000)
            }
            
        })

        div.appendChild(style)
        this.shadow.appendChild(div);
    }
}

customElements.define("create-service", CreateService);
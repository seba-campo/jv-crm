import { Router } from "@vaadin/router";
import { state, deployState } from "../state";

class Login extends HTMLElement{
    shadow = this.attachShadow({mode: "open"});
    constructor(){
        super();
        this.render();
    }
    connectedCallback(){
        // Se va a ejecutar cuando se corra la /page
    }
    render(){
        const div = document.createElement("div");
        const style = document.createElement("style");

        const lsMail = localStorage.getItem("loginMailSaved");

        div.innerHTML = `
            <div class="login-root">
                <div class="login-box">
                    <div class="login-box__title">
                        <p class="login-p">INGRESAR</p>
                    </div>

                    <form class="login-form">
                        <div class="inputs-div">
                            <input class="input" id="email" type="text" placeholder="email" default='${lsMail}'>
                            <input class="input" id="password" type="password" placeholder="">
                        </div>

                        <div class="login-form__submit">
                            <button class="submit">INGRESAR</button>
                        </div>
                    </form>

                    <div>
                        <label for="remember-check">Recordar Mail</label>
                        <input type="checkbox" name="remember-check">
                    </div>
                    
                </div>
            </div>
        `
        
        style.textContent = `
            .login-root{
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                widht: 100vw;
                font-family: 'Assistant', sans-serif;
            }

            .login-box{
                background-color: #5C9902;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                align-items: center;
                width: 75vw;
                height: 45vh;
                border-radius: 5px;
                box-shadow: 5px 15px 19px -5px rgba(0,0,0,0.41);
                -webkit-box-shadow: 5px 15px 19px -5px rgba(0,0,0,0.41);
                -moz-box-shadow: 5px 15px 19px -5px rgba(0,0,0,0.41);
            }

            .login-p{
                color: #FAFAFA;
                font-size: 30px;
                font-weight: 600;
            }

            .login-form{
                height: 180px;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                align-items: center
            }

            .inputs-div{
                display: flex; 
                flex-direction: column;
                justify-content: space-between;
                height: 130px;
                width: 60vw; 
            }

            .custom_input {
                display: flex;
                align-items: center;
                position: relative;
            }
            
            .input {
                font-size: 18px;
                width: 55vw;
                padding: 5px 10px;
                outline: none;
                background: #142101;
                color: #F5F5F5;
                border-radius: 2px;
            }
          
            .input::placeholder {
                color: #B8B8B8;
            }

            .submit{
                background-color: #e7e7e7;
                width: 58vw;
                margin: 20px 0;
                color: #080707;
                font-family: Trebuchet MS;
                font-size: 17px;
                font-weight: 800;
                font-style: normal;
                text-decoration: none;
                padding: 14px 15px;
                border: 0px solid #000;
                border-radius: 5px;
                display: inline-block;
            }
            .submit:hover{
                background-color: #eaeaea;
            }
            .submit:active{
                transform: scale(0.95);
            }

        `

        // const 

        

        div.appendChild(style)
        this.shadow.appendChild(div);
    }
}

customElements.define("login-page", Login);
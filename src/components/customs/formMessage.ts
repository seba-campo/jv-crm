class FormMessage extends HTMLElement{
    constructor(){
        super();
        this.render();
    }
    connectedCallback(){
        // Se va a ejecutar cuando se corra el component
    }
    render(){
        const style = document.createElement("style");
        const statusInAttr = this.getAttribute("status")
        const message = this.textContent;

        switch (statusInAttr){
            case "200":
                this.innerHTML = /*html*/`
                <div class="root-msj">
                    <div class="div-msj success">
                        <p class="p">${message}</p>
                    </div>
                </div>
                 `
                break
            case "500":
                this.innerHTML = /*html*/`
                <div class="root-msj">
                    <div class="div-msj error">
                        <p class="p">${message}</p>
                    </div>
                </div>
                 `
                break
        }
        
        style.textContent = /*css*/`        
        .root-msj{
            height: 40px;
            width: 100px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-direction: column;
        }

        .div-msj{
            width: 245px;
            height: 40px;
            border-radius: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 15px;
        }

        .error{
            background-color: #E23636;
            color: #FFF
        }

        .success{
            background-color: #61D161;
        }

        .p{
            margin: 0 30px;
            font-size: 18px;
            font-weight: 500;
            text-align: center
        }
        `
        this.appendChild(style);
    }
}

customElements.define("form-message", FormMessage);
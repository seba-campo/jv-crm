class PageTitle extends HTMLElement{
    constructor(){
        super();
        this.render();
    }
    connectedCallback(){
        // Se va a ejecutar cuando se corra el component
    }
    render(){
        const style = document.createElement("style");
        const titleInAttr = this.getAttribute("title")
        console.log(titleInAttr)

        this.innerHTML = /*html*/`
            <div class="root-page-title">
                <div class="div-title">
                    <p class="p-title">${titleInAttr}</p>
                </div>
            </div>
        `
        
        style.textContent = /*css*/`        
        .root-page-title{
            display: flex;
            width: 80vw;
            height: 100vh;
            justify-content: flex-start;
            align-items: center;
            flex-direction: column;
        }

        .div-title{
            width: 100%;
            height: 60px;
            border-bottom: 2px solid #e4e4e4;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-bottom: 15px;
        }

        .p-title{
            margin: 0 30px;
            font-size: 20px;
            font-weight: 500;
        }
        `
        this.appendChild(style);
    }
}

customElements.define("page-title", PageTitle);
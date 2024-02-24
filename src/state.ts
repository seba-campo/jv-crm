import * as jwt from "jsonwebtoken"
import { Horse } from "./types";
import { Router } from "@vaadin/router";
import { error } from "console";

export const API_URL = process.env.PROD_API_URL;
const SECRET = process.env.SECRET; 
export const deployState = {
    data:{
        deployed: false
    },
    setState(newState) {
    this.data = newState;
    },
    getState(){
    return this.data;
    },
    setDeployedStatus(status : boolean){
    const cs = this.getState();
    cs.deployed = status
    this.setState(cs)
    },
};

export const state = {
    data:{
        userToken: "",
        userType: "",
        clientInformation:{
            clientData: {},
            clientHorses: [],
            clientServices: [],
        },
        userClientData:{
            nombre: "",
            email: "",
            id: "",
        }
    },
    listeners: [],
    // USUARIOS-----------
    async getUserInfo(email){
        return fetch (API_URL+"/auth/info/"+email,{
            mode: "cors",
            method: "GET",
            headers:{
                "Content-Type": "application/json"
              },
        })
        .then((res)=>{return res.json()})
        .then((data)=>{
            // console.log("seteado el fullname", data.fullName)
            this.setUserName(data.fullName)
            this.setUserClientId(data.idCliente)
            // return data
        })
    },
    async authUser(email, password){
        const userData = {
            email,
            password
        }
        return fetch (API_URL+"/auth/token",{
            mode: "cors",
            method: "POST",
            body: JSON.stringify(userData),
            headers:{
                "Content-Type": "application/json"
              },
        })
        .then((res)=>{return res.json()})
        .then((data)=>{
            this.decodeToken(data.token)
            return data.token;
        })
    },
    // CLIENTS ----------
    async getClientDataBy(type: string, cInfo){
        const authKey = this.sessionAuthParser();
        switch(type){
            case "dni":
                await fetch(API_URL+"/clientes/buscar/dni/"+cInfo.dni, {
                    mode: "cors",
                    method:"GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: authKey
                    }
                })
                .then((res)=>{return res.json()})
                .then((data)=>{
                    this.setClientInfo(data)
                    return data;
                });
                break
            case "tel":
                await fetch(API_URL+"/clientes/buscar/telefono/"+cInfo.telefono, {
                    mode: "cors",
                    method:"GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: authKey
                    }
                })
                .then((res)=>{return res.json()})
                .then((data)=>{
                    this.setClientInfo(data)
                    return data;
                });
                break
            case "nombre":
            await fetch(API_URL+"/clientes/buscar/nombre/"+cInfo.nombre+"/"+cInfo.apellido, {
                mode: "cors",
                method:"GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authKey
                }
            })
            .then((res)=>{return res.json()})
            .then((data)=>{
                this.setClientInfo(data)
                return data;
            });
            break
        }
    },
    async createClient(data){
        const authKey = this.sessionAuthParser();
        const {nombre, apellido, telefono, dni,} = data;
        
        const newClient = {
            nombre,
            apellido,
            telefono,
            dni
        }

        await fetch(API_URL+"/clientes", {
            mode: "cors",
            method:"POST",
            body: JSON.stringify(newClient),
            headers: {
                "Content-Type": "application/json",
                Authorization: authKey
            }
        })
        .then((res)=>{
            if(res.status == 200){
                return res.json()
            }
            else if(res.status == 500){
                throw "error"
            }
        })  
        .then((data)=>{
            return data;
        });
    },
    async getAllClientes(){
        const authKey = this.sessionAuthParser();
        return fetch(API_URL+"/clientes",{
            mode: "cors",
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                Authorization: authKey
              },
        })
        .then((res)=>{return res.json()})
        .then((data)=>{
            return data;
        })
    },
    async getActiveClients(){
        const authKey = this.sessionAuthParser();
        return fetch(API_URL+"/clientes",{
            mode: "cors",
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                Authorization: authKey
              },
        })
        .then((res)=>{return res.json()})
        .then((data)=>{
            return data;
        })
    },
    // ------CABALLOS-------
    async getHorsesFromClient(clientId:number){
        const authKey = this.sessionAuthParser();
        await fetch(API_URL+"/caballos/"+clientId, {
            mode: "cors",
            method:"GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: authKey
            }
        })
        .then((res)=>{
            return res.json()
        })
        .then((data)=>{
            this.setClientHorses(data)
            return data;
        });
    },
    async createHorse(data){
        const authKey = this.sessionAuthParser();
        const {nombre, pelaje, idPropietario, libreta, abono, obs} = data;
        const newHorse = {
            nombre,
            pelaje,
            idPropietario,
            libreta,
            abono,
            obs
        }

        await fetch(API_URL+"/caballos", {
            mode: "cors",
            method:"POST",
            body: JSON.stringify(newHorse),
            headers: {
                "Content-Type": "application/json",
                Authorization: authKey
            }
        })
        .then((res)=>{
            if(res.status == 200){
                return res.json()
            }
            else if(res.status == 500){
                throw "error"
            }
        })
        .then((data)=>{
            return data;
        });
    },
    async getAllHorses(){
        const authKey = this.sessionAuthParser();

        return fetch(API_URL+"/caballos",{
            mode: "cors",
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                Authorization: authKey
              },
        })
        .then((res)=>{return res.json()})
        .then((data)=>{
            return data;
        })
    },
    async getActiveHorses(){
        const authKey = this.sessionAuthParser();

        return fetch(API_URL+"/caballos/activos/all",{
            mode: "cors",
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                Authorization: authKey
              },
        })
        .then((res)=>{return res.json()})
        .then((data)=>{
            return data;
        })
    },
    // SERVICIOS----------
    async createNewService(data){
        const authKey = this.sessionAuthParser();
        const {tipo, idCliente, nombreCliente, subTipo, costo, estado, obs} = data;
        const newServiceData = {
            tipo,
            idCliente,
            nombreCliente,
            subTipo,
            costo,
            estado,
            obs
        }

        await fetch(API_URL+"/servicio", {
            mode: "cors",
            method:"POST",
            body: JSON.stringify(newServiceData),
            headers: {
                "Content-Type": "application/json",
                Authorization: authKey
            }
        })
        .then((res)=>{
            if(res.status == 200){
                return res.json()
            }
            else if(res.status == 500){
                throw "error"
            }
        })
        .then((data)=>{
            return data;
        });
    },
    async getAllServices(){
        const authKey = this.sessionAuthParser();
        return fetch(API_URL+"/servicio",{
            mode: "cors",
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                Authorization: authKey
              },
        })
        .then((res)=>{return res.json()})
        .then((data)=>{
            return data;
        })
    },
    async getPendingServices(){
        const authKey = this.sessionAuthParser();

        return fetch(API_URL+"/servicio/pendiente", {
            mode: "cors",
            method:"GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: authKey
            }
        })
        .then((res)=>{return res.json()})
        .then((data)=>{
            console.log(data)
            return data;
        });
    },
    async getServicesFromUserId(userId: number){    
        const authKey = this.sessionAuthParser();

        await fetch(API_URL+"/servicio/"+userId, {
            mode: "cors",
            method:"GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: authKey
            }
        })
        .then((res)=>{return res.json()})
        .then((data)=>{
            this.setClientServices(data)
            return data;
        });
    },
    // UTILS-------------
    decodeToken(token: any){
        const tokenDecoded = jwt.decode(token) as any
        // Se setea en el LS
        localStorage.setItem("userData", JSON.stringify({
            userToken: token,
            type: tokenDecoded.type
        }))
        // Se setea en state
        this.setUserType(tokenDecoded.type);
    },
    subscribe(callback: (any) => any) {
        // recibe callbacks para ser avisados posteriormente
        this.listeners.push(callback);
    },
    setState(newState){
        const cs = this.getState();
        this.data = newState;
        for(var cb of this.listeners){
          cb(cs);
        }
    },
    getState() {
        return this.data;
    },
    setUserType(newUserType: string){
        const cs = this.getState();
        cs.userType = newUserType;
        this.setState(cs);
    },
    sessionAuthParser(){
        var authStringReturn = "bearer ";
        const cs = this.getState();
        const userDataLs = JSON.parse(localStorage.getItem("userData"));

        if(cs.userToken != ""){
            authStringReturn += cs.userToken
            return authStringReturn
        }
        else{
            if(userDataLs != null || userDataLs != undefined){
                authStringReturn += userDataLs.userToken
                return authStringReturn
            }
            else{
                console.log("Error inesperado, no se encontró token de validacion, vuelva a loguearse")
                const deployedStatus = deployState.getState().deployed
                if(!deployedStatus){
                    Router.go("/expired")
                }
                else{
                    Router.go("/jv-crm/expired")
                }
            }
        };
    },
    setUserName(name){
        const cs = this.getState();
        cs.userClientData.nombre = name;
        this.setState(cs) 
    },
    setUserEmail(email){
        const cs = this.getState();
        cs.userClientData.email = email;
        this.setState(cs) 
    },
    setUserClientId(id){
        const cs = this.getState();
        cs.userClientData.id = id;
        this.setState(cs) 
    },
    setClientInfo(data){
        const cs = this.getState();
        cs.clientInformation.clientData = data;
        this.setState(cs)
    },
    clearClientInfo(){
        const cs = this.getState();
        cs.clientInformation = {
            clientData: {},
            clientHorses: [],
            clientServices: []
        }
        this.setState(cs)
    },
    setClientHorses(data){
        const cs = this.getState();
        cs.clientInformation.clientHorses = data;
        this.setState(cs)
    },
    setClientServices(data){
        const cs = this.getState();
        cs.clientInformation.clientServices = data;
        this.setState(cs)
    }
};
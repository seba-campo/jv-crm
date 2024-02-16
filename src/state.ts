import * as jwt from "jsonwebtoken"
import { Horse } from "./types";
// "https://jvcrm-prod.up.railway.app"

export const API_URL = process.env.PROD_API_URL;


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
        userType: ""
    },
    listeners: [],
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
    // ------CABALLOS-------
    async createHorse(data){
        const authKey = this.checkSessionAuth();
        const {nombre, pelaje, idPropietario, libreta, abono, obs} = data;
        const newHorse = {
            nombre,
            pelaje,
            idPropietario,
            libreta,
            abono,
            obs
        }

        fetch(API_URL+"/caballos", {
            mode: "cors",
            method:"POST",
            body: JSON.stringify(newHorse),
            headers: {
                "Content-Type": "application/json",
                Authorization: authKey
            }
        })
        .then((res)=>{return res.json()})
        .then((data)=>{
            return data;
        });
    },
    async getAllHorses(){
        return fetch(API_URL+"/caballos",{
            mode: "cors",
            method: "GET",
            headers:{
                "Content-Type": "application/json"
              },
        })
        .then((res)=>{return res.json()})
        .then((data)=>{
            return data;
        })
    },
    async getActiveHorses(){
        return fetch(API_URL+"/caballos/activos/all",{
            mode: "cors",
            method: "GET",
            headers:{
                "Content-Type": "application/json"
              },
        })
        .then((res)=>{return res.json()})
        .then((data)=>{
            return data;
        })
    },
    // CLIENTS ----------
    async createClient(data){
        const authKey = this.checkSessionAuth();
        const {nombre, apellido, telefono, dni,} = data;
        
        const newClient = {
            nombre,
            apellido,
            telefono,
            dni
        }

        fetch(API_URL+"/clientes", {
            mode: "cors",
            method:"POST",
            body: JSON.stringify(newClient),
            headers: {
                "Content-Type": "application/json",
                Authorization: authKey
            }
        })
        .then((res)=>{return res.json()})
        .then((data)=>{
            return data;
        });
    },
    async getAllClientes(){
        const authKey = this.checkSessionAuth();
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
        const authKey = this.checkSessionAuth();
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
    checkSessionAuth(){
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
                throw "Sesion expirada"
            }
        };
    }
};
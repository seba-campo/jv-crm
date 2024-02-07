import * as jwt from "jsonwebtoken"


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

    decodeToken(token){
        const tokenDecoded = jwt.decode(token) as any
        // Se setea en el LS
        localStorage.setItem("userData", JSON.stringify({
            userToken: token,
            type: tokenDecoded.type
        }))
        // Se setea en state
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
        this.setState();
    }
};
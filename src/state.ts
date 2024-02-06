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
    
};
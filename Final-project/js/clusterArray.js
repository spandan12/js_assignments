class ClusterArray{
    constructor(){
        this.structure = [];
    }

    addValue(val){

        this.structure.push(val);
    }

    getArray(){

        return this.structure;
    }

    union(array){
        this.structure = [...new Set([...array, ...this.structure])];

    }


}
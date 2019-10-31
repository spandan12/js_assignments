class SideLegend{
    constructor(NoOfClusters, zoomEffects, kmeans){
        this.kmeans = kmeans;
        this.noOfClusters = NoOfClusters;
        this.legend = document.getElementsByClassName('legends')[0];
        this.information = document.getElementsByClassName('algorithm-Information')[0];
        this.legendLi = [];
        this.informationLi = [];
        this.zoomEffects = zoomEffects;
        this.updateState = 'check';
        this.algorithm = 'kMeans';
        
        this.draw();
    }



    updateAlgorithm(algorithm){
        this.algorithm = algorithm;
    }

    updateZoomEffects(zoomEffects){
        this.zoomEffects = zoomEffects;
    }

    updateKMeans(kmeans){
        this.kmeans = kmeans;
    }

    updateClusterNumber(NoOfClusters){
        this.noOfClusters = NoOfClusters;
    }

    draw(){ 
        this.drawLegends();
        this.drawInformation();
    }

    remove(){
        let parentElement = document.querySelector('.legends');
        let children = parentElement.children;
        console.log(children.length);
        
        for(let i = 0; i < children.length; i++){
            parentElement.removeChild(children[i]);
        }


    }

    drawLegends(){
        this.counter++;
        for(let i = 0; i < VALUE_OF_K; i++){
            let element = document.createElement('li');
            element.setAttribute('id', `legend${i}`);
            this.legendLi.push(element);
            this.legend.appendChild(element);

            let innerElements = [];
            let element1 =  document.createElement('div');
            element1.setAttribute('class', 'colorSpan');
            element1.style.backgroundColor = COLORS[i];
            innerElements.push(element1);
            document.querySelectorAll('.legends li')[i].appendChild(element1);

            let element2 =  document.createElement('div');
            element2.setAttribute('class', 'clusterText');
            element2.innerHTML = 'cluster ' + (i+1);
            innerElements.push(element2);
            document.querySelectorAll('.legends li')[i].appendChild(element2);
        }
    }

    drawInformation(){
        let element = document.createElement('li');
        element.innerHTML = 'SSE:  '+ Math.trunc(this.kmeans.getSumofSquaredError() * 1000) / 1000 + '   sq. unit';
        this.informationLi.push(element);
        this.information.appendChild(element);

        let element1 = document.createElement('li');
        element1.innerHTML = 'No of Iterations: '+ '  '+ this.kmeans.getNoOfIterations();
        this.informationLi.push(element1);
        this.information.appendChild(element1);

        let element2 = document.createElement('li');
        element2.innerHTML = 'Value of K:'+ '  '+ this.kmeans.getValueOfK();
        this.informationLi.push(element2);
        this.information.appendChild(element2);
    }

    update(){
        // let currentAlgorithm = algorithm;
        // console.log(this.algorithm);
        if(this.algorithm == 'DBSCAN'){
            let algorithmDOM = document.querySelector('.algorithm-Information');
            algorithmDOM.style.display = 'none';

        }

        else{
            let algorithmDOM = document.querySelector('.algorithm-Information');
            algorithmDOM.style.display = 'block';

        }
        this.currentState = this.zoomEffects.getState();
        if(this.currentState == 'ZoomIn' && this.updateState == 'check'){
            
            this.updateState = 'uncheck';
            let index = this.zoomEffects.getclickedCluster();
            let arrayIndex = this.noOfClusters;
            let noOfChildren = document.querySelector('.legends').children.length;
            if(arrayIndex > noOfChildren){
                arrayIndex = VALUE_OF_K;
            }
            for(let i = 0; i < VALUE_OF_K; i++){
                
                if(i != index){
                    let element = document.getElementById(`legend${i}`);
                    this.legend.removeChild(element);
                    
                }
            }
            
           
            let firstElement = document.querySelector('.algorithm-Information li');
            firstElement.innerHTML  = 'SSE:  '+ Math.trunc(this.kmeans.getIndividualSSE(index) * 1000) / 1000 + '   sq. unit';
            let secondElement =  document.querySelectorAll('.algorithm-Information li')[1];
            secondElement.style.display = 'none';
            let thirdElement =  document.querySelectorAll('.algorithm-Information li')[2];
            thirdElement.style.display = 'none';
            let element3 = document.createElement('li');
            // console.log()
            element3.innerHTML = 'No of Points:'+ '  '+ this.zoomEffects.findClusterPoints(index).length;
            this.informationLi.push(element3);
            this.information.appendChild(element3);
            
        }

        else if((this.currentState == 'ZoomOut' || this.currentState == 'Hovered') && this.updateState == 'uncheck'){
            let lastElement = document.querySelector('.legends li');
            this.legend.removeChild(lastElement);

            this.drawLegends();
            let firstElement = document.querySelector('.algorithm-Information li');
            firstElement.innerHTML  = 'SSE:  '+ Math.trunc(this.kmeans.getSumofSquaredError() * 1000) / 1000 + '   sq. unit';
            let secondElement =  document.querySelectorAll('.algorithm-Information li')[1];
            secondElement.style.display = 'block';
            let thirdElement =  document.querySelectorAll('.algorithm-Information li')[2];
            thirdElement.style.display = 'block';
            let fourthElement = document.querySelectorAll('.algorithm-Information li')[3];
            this.information.removeChild(fourthElement);
            this.informationLi.splice(3,0);
            this.updateState = 'check';
            
        }

    }

}
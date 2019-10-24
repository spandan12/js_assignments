class SideLegend{
    constructor(kmeans, zoomEffects){
        this.kmeans = kmeans;
        this.valueofK = this.kmeans.getValueOfK();
        this.legend = document.getElementsByClassName('legends')[0];
        this.information = document.getElementsByClassName('algorithm-Information')[0];
        this.legendLi = [];
        this.informationLi = [];
        this.zoomEffects = zoomEffects;
        this.updateState = 'check';
        this.draw();
    }

    draw(){ 
        this.drawLegends();
        this.drawInformation();
    }

    drawLegends(){
        for(let i = 0; i < this.valueofK; i++){
            let element = document.createElement('li');
            element.setAttribute('id', `legend${i}`);
            this.legendLi.push(element);
            this.legend.appendChild(element);

            let innerElements = [];
            let element1 =  document.createElement('div');
            element1.setAttribute('class', 'colorSpan');
            element1.style.backgroundColor = COLORS[i];
            element1.style.height = '2.5%';
            element1.style.width = '20%';
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
        this.currentState = this.zoomEffects.getState();
        // console.log(this.currentState);
        if(this.currentState == 'ZoomIn' && this.updateState == 'check'){
            this.updateState = 'uncheck';
            let index = this.zoomEffects.getclickedCluster();
           
            for(let i = 0; i < this.valueofK; i++){
                
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
            this.updateState = 'check';
        }

    }

}
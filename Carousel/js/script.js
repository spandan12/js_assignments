var container= document.getElementsByClassName('Container')[0];
Object.assign(container.style,{
    position:'relative',
    marginLeft:'200px',
    height : '300px',
    width:'800px',
    overflow:'hidden'
});


var selects;
var wrapper=document.getElementsByClassName('wrapper')[0];
// console.log(wrappers[0]);

Object.assign(wrapper.style,{
    position : 'absolute',
    left : '0px',
    top : '50px',
    // overflow : 'hidden',
    // width : '800px',
    height : '300px'
});


function loadfunction(){
    idr=event.srcElement.id;
    wrapper.style.left=`${parseInt(idr)*-800}px`;
    console.log(idr);
    for(i=0;i<(selects.length);i++){
        if(i==parseInt(idr)){
            Object.assign(selects[i].style,{
                color: 'green',
                backgroundColor : 'green'
            });
        }
        else{
            Object.assign(selects[i].style,{
                color: 'white',
                backgroundColor : 'white'
            });
        }
    }    
}



selectControl=document.createElement('div');
selectControl.classList.add('selectControl');
container.appendChild(selectControl);
Object.assign(selectControl.style,{
    position : 'absolute',
    left:'300px',
    top : '250px',
});



for(i=0;i<(wrapper.children.length);i++){
    // images[i].classList.add('image'+(i+1));
    butto=document.createElement('button');
    butto.innerHTML= 'O'+'';
    var str= `${i+1}`;
    butto.setAttribute("id",i);
    Object.assign(butto.style,{
        marginLeft:'10px',
        marginRight: '10px',
        // backgroundColor:'Transparent',
        backgroundColor: 'white',
        border: 'none',
        borderRadius: '50%',
        color: 'white'
    });
    butto.setAttribute("onclick","loadfunction()");
    selectControl.appendChild(butto);
}

selects=selectControl.children;
console.log(selects);
// selects[0].setAttribute("onclick","loadfunction1()");

imageadded=document.createElement('img');
// imageadded.classList.add("lastimage");
imageadded.src="./images/1.jpg";
wrapper.appendChild(imageadded); 

console.log(wrapper.children);
var images=wrapper.children;

for(i=0;i<(images.length);i++){
    images[i].classList.add('image'+(i+1));
    Object.assign(images[i].style,{
        position : 'absolute',
        left : `${i*800}px`,
        width:'800px',
        height:'300px'
    });
}




// console.log(images)
var wrapper_position;

var intervalauto;



function automatic(){

    
    intervalauto = setInterval(function() {
        var str =wrapper.style.left;
        wrapper_position=parseInt((str.substring(0,str.length-2)));
        if(wrapper_position == -3980){
            wrapper.style.left=`${0}px`;
            wrapper_position=wrapper.style.left;
        }
        // document.getElementById('button1').style.display='none';

        var old_wrapper_position= wrapper_position;
        if((wrapper_position % 800)==0){
            
            var start = new Date().getTime();
            var end = start;
            while(end < start + 2000) {
                console.log('show');                
                end = new Date().getTime();
                
           }
        }
        // document.getElementById("button1").style.display='block';
        

        wrapper.style.left=`${wrapper_position-20}px`;
        // counter++;
    }, 25);
}

function stopautomatic(){
    clearInterval(intervalauto);
    var stop_position=Math.round(wrapper_position/800);
    wrapper.style.left=`${stop_position*800}px`;

}

function slideleft(){
    clearInterval(intervalauto);
    var counter=0;
    
    var interval = setInterval(function() {
        
        var str =wrapper.style.left;
        wrapper_position=parseInt((str.substring(0,str.length-2)));
        // console.log(wrapper_position);

        //for cyclic
        if(wrapper_position == -3920){
            wrapper.style.left=`${0}px`;
            wrapper_position=wrapper.style.left;
            // console.log(wrapper.style.left);
            // clearInterval(interval);
        }
        wrapper.style.left=`${wrapper_position-80}px`;
        // console.log(wrapper.style.left);
        counter++;
        if(counter==10){
            clearInterval(interval);
        }
    }, 100);
}

function slideright(){
    clearInterval(intervalauto);
    var counter=0;
    
    var interval = setInterval(function() {
        var str =wrapper.style.left;
        wrapper_position=parseInt((str.substring(0,str.length-2)));
        // console.log(wrapper_position);
        if(wrapper_position == 0){
            wrapper.style.left=`${-3920}px`;
            wrapper_position=wrapper.style.left;
        }
        wrapper.style.left=`${wrapper_position+80}px`;
        counter++;
        if(counter==10){
            clearInterval(interval);
        }
    }, 100);
}






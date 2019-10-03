;(function(){

    function Carousel(parentELement){
        this.parentELement=parentELement;
        this.wrapper=null;
        this.left=null;
        this.right=null;
        this.images=[];
        this.selectorWrapper=null;
        this.selectors=[];
        this.imageWidth=null;
        this.imageHeight=null;
        this.imagecount=null;
        
        

        this.init = function(){
            
            this.wrapper=this.parentELement.getElementsByClassName('wrapper')[0];
            this.left= document.createElement('button');
            this.left.innerHTML= '<';
            this.left.classList.add("left");

            this.right= document.createElement('button');
            this.right.innerHTML= '>';
            this.right.classList.add("right");

            this.selectorWrapper = document.createElement('div');
            this.selectorWrapper.classList.add("selector-wrapper");

            this.images=this.wrapper.children;
            this.imagecount=this.images.length;
            this.imageWidth=this.images[0].width;
            this.imageHeight=this.images[0].height;

            this.setParentProperty();
            this.setWrapperProperty();
            this.appendNewImage();
            this.setImagePositions();
            this.setButtonProperty();
            

            this.parentELement.appendChild(this.left);
            this.parentELement.appendChild(this.right);
            this.parentELement.appendChild(this.selectorWrapper);

            
        }.bind(this);

        this.setParentProperty= function(){
            console.log('gmail');
            Object.assign(this.parentELement.style,{
                position:'relative',
                overflow:'hidden'
            });
        }.bind(this);

        this.setWrapperProperty= function(){
            Object.assign(this.wrapper.style,{
                position : 'absolute',
                left: '0px',
                top: '0px'
            });

        }.bind(this);
        
        this.appendNewImage = function(){
            imageadded=document.createElement('img');
            source=this.images[0].src;
            imageadded.src=`${source}`;
            this.wrapper.appendChild(imageadded);
        }.bind(this);

        this.setImagePositions = function(){
            for(i=0;i<(this.imagecount);i++){
                Object.assign(this.images[i].style,{
                    position : 'absolute',
                    left : `${i*this.imageWidth}px`,
                });
            }
        }.bind(this);

        this.setButtonProperty = function(){
            Object.assign(this.left.style,{
                fontSize: '20px',
                // height: '60px',
                // width: '45px',
                color : 'black',
                fontWeight : 'bold',
                border: 'none',
                color: 'white',
                top: '150px',
                position: 'absolute',
                cursor: 'pointer',
                backgroundColor: 'Transparent'
            });

            Object.assign(this.right.style,{
                fontSize: '20px',
                // height: '60px',
                // width: '45px',
                color : 'black',
                fontWeight : 'bold',
                border: 'none',
                color: 'white',
                top: '150px',
                right: '0px',
                // left: '330px',
                position: 'absolute',
                cursor: 'pointer',
                backgroundColor: 'Transparent'
            });
        }
    }

    var container1 = document.getElementsByClassName('Container')[0];
    carousel = new Carousel(container1);
    carousel.init();
})()


import Phaser from 'phaser'
import { sharedInstance as events } from './EventListener'
 export default class controlDePersonaje // exporto clase control de personaje
 {
    ////// velocidad /// 
    private velocidad:any
    ////
   private scene: Phaser.Scene
	private Player: Phaser.Physics.Matter.Sprite
   private animacionDePersonaje : any 
   private cursor? :Phaser.Input.InputPlugin
   private basuraJuntada?:any
  
   
   // pongo any porque no se como definirlo 
   constructor ( escena:Phaser.Scene,personaje:Phaser.Physics.Matter.Sprite,animacion:any)
    {
     
     this.velocidad=15;
      //this.cursor=cursor
      this.scene = escena
		this.Player =personaje
      this.animacionDePersonaje=animacion
      this.animacionDePersonaje.setDataEnabled();
      this.animacionDePersonaje.data.set ('animacion','parado')
      

      this.Player.setDataEnabled();
      this.Player.setFriction(0,0)

      this.Player.data.set('caminadoX', false);
      this.Player.data.set('caminandoY', false);
      this.Player.data.set('conObjeto', false);
      this.Player.data.set('mouseX', this.Player.x);
      this.Player.data.set('mouseY', this.Player.y);
      this.Player.data.set('X',0);
      this.Player.data.set('Y',0);
      this.Player.setVisible(false)
      this.CreaAnimaciones()
      

            //////////////////// control de colisiones ///////////////////

      
        







                //////////////////sale de colision//////////////////////
              this.Player.setOnCollideEnd((data: MatterJS.ICollisionPair) => {
                
                
                const bodyA = data.bodyB as MatterJS.BodyType
                const gameObjectA = bodyA.gameObject
                const spriteA = gameObjectA as Phaser.Physics.Matter.Sprite
                const typeA = spriteA?.getData('tipo')
                if (typeA) {
                if (typeA =='tachoVerde'||typeA =='tachoAzul'||typeA=='tachoRojo'||typeA=='tachoAmarillo') {
                 
                  spriteA.data.set('colisionando', false)
                  spriteA.setScale(0.3)

                  console.log("salió de colision con tacho ++ "+ typeA )

                }

                }
                //// controlo si sale de colision con basura ////

                if (this.Player.getData('conObjeto') == false) 
                  
                { 

                const bodyB = data.bodyB as MatterJS.BodyType
                const gameObjectB = bodyB.gameObject
                this.basuraJuntada = gameObjectB as Phaser.Physics.Matter.Sprite ///// basura 	
                const typeB = this.basuraJuntada?.getData('tipo')// si el personaje colisiona con basura
               

                if (typeB =='papel'||typeB == 'plastico'||typeB == 'metal'){

                   this.basuraJuntada.setData('colisionando',false);
                   this.basuraJuntada.removeInteractive()

                }
               // console.log('salió de colision con ' + typeB) 
              

              
              //  if (){ 
              //  }

              }

              })


                ////////// cuando colisiona con algun objeto //////////

          
              

               

             
                this.Player.setOnCollide((data: MatterJS.ICollisionPair) => {        
                 
                 
                  if (this.Player.getData('conObjeto') == false) 
                  
              {  

                    const bodyB = data.bodyB as MatterJS.BodyType
                    const gameObjectB = bodyB.gameObject
                    this.basuraJuntada = gameObjectB as Phaser.Physics.Matter.Sprite ///// basura 	                
                    const typeB = this.basuraJuntada?.getData('tipo')// si el personaje colisiona con basura
                   console.log('colissiono con basura ' + typeB)

                   // const basura= this.basuraJuntada.getData('levantado')
                   this.basuraJuntada.setData('colisionando',true);

                      if(typeB){

                          /// aca controlo si esta en colision y si el tipo es de papel , plastico o metal 
                        if ((this.basuraJuntada.getData('colisionando')==true) && (typeB =='papel'||typeB =='plastico'||typeB =='metal'))
                         {

                   /*       this.basuraJuntada.setInteractive()   
                                         
                          this.basuraJuntada.on('pointerdown',                      
                           () => {  
                           
                          */ 
                            this.basuraJuntada.setData('levantado', true)
                            this.Player.data.set('conObjeto',true)  
                         
                    /*     
                          } );
*/
                        }
                     

                         
                         }
                
              
              }


            if ( this.Player.getData('conObjeto') == true ) {

              const bodyA = data.bodyB as MatterJS.BodyType
              const gameObjectA = bodyA.gameObject
              const spriteA = gameObjectA as Phaser.Physics.Matter.Sprite
              spriteA.setData('colisionando',true)

              const typeA = spriteA.getData('tipo')


              if( typeA=='tachoVerde'||typeA=='tachoRojo'||typeA=='tachoAzul' ){

                spriteA.setScale(0.4)
              console.log("colisiono con tacho "+ typeA )
               
  
            //  this.basuraJuntada.destroy()
  
  
            spriteA.setInteractive()

                spriteA.on('pointerdown',
  
                () =>{

                  
                  if(this.basuraJuntada?.getData('tipo')=='plastico'&& typeA == 'tachoVerde'&& spriteA.getData('colisionando')==true)
                  {
                    this.controlBasura(spriteA)
                   
                    events.emit('PlasticoReciclado')

                    console.log ('suma puntos')
                    
                    
             
                  }

                  else if(this.basuraJuntada?.getData('tipo')=='metal'&& typeA == 'tachoRojo'&& spriteA.getData('colisionando')==true)
                  {
                    this.controlBasura(spriteA)
                    events.emit('MetalReciclado')
                    console.log ('suma puntos')
                    
                    
               
                  }

                  else if(this.basuraJuntada?.getData('tipo')=='papel'&& typeA == 'tachoAzul'&& spriteA.getData('colisionando')==true)
                  {
             
                    this.controlBasura(spriteA)
                    events.emit('PapelReciclado')
                    console.log ('suma puntos')
                    
                  
                  }
                  else {

                    
                   // spriteA.removeInteractive()

                  }


             }); 
  
              }
             
            

             }


              }
              ) /// esta funcion solo detecta que el personaje colisiono con algo
              
           
    }
        

    public setX(x){
      this.Player.data.set('mouseX', x);
    }
    public setY(y){
      this.Player.data.set('mouseY', y);
    }

    public setCaminarX (x){
      this.Player.data.set('caminandoX', x);
    }

    public setCaminarY (y){
      this.Player.data.set('caminandoY', y);
    }

    public animacion (){

      this.animacionDePersonaje

    }
      ////////// animaciones ////////// 

    private CreaAnimaciones () {
   

      this.animacionDePersonaje.anims.create({
			key: 'parado',
			frames: [{ key: 'animPlayer', frame: 'parado.png'}]
		})

      this.animacionDePersonaje.anims.create({
			key: 'camina',
			frames: this.animacionDePersonaje.anims.generateFrameNames('animPlayer', {
				start: 1,
				end: 2,
				prefix: 'caminaDeFrente',
				suffix: '.png'
			}),
			frameRate: 5,
         repeat: -1
		})


      this.animacionDePersonaje.anims.create({
			key: 'caminaIzquierda',
			frames: this.animacionDePersonaje.anims.generateFrameNames('animPlayer', {
				start: 2,
				end: 3,
				prefix: 'caminarDeLado',
				suffix: '.png'
			}),
			frameRate: 5,
         repeat: -1
		})

    this.animacionDePersonaje.anims.create({
			key: 'caminaDerecha',
			frames: this.animacionDePersonaje.anims.generateFrameNames('animPlayer', {
				start: 2,
				end: 3,
				prefix: 'caminarDeLado',
				suffix: '.png'
			}),
      
			frameRate: 5,
         repeat: -1
		})

    this.animacionDePersonaje.anims.create({
			key: 'caminaArriba',
			frames: this.animacionDePersonaje.anims.generateFrameNames('animPlayer', {
				start: 1,
				end: 3,
				prefix: 'detras',
				suffix: '.png'
			}),
			frameRate: 5,
         repeat: -1
		})

   
   
    }

    
    public getX(){
      return this.Player.getData('X')
    }

    public getY(){
      return this.Player.getData('Y')
    }




    public moverPersonaje (){
      
      /////// controles de variables /////
     if (this.Player.body.velocity.x>15){
      this.Player.setVelocityX(15)
     }
     if (this.Player.body.velocity.y>15){
      this.Player.setVelocityY(15)
     }

      //console.log('controla al romperse'+this.Player.getData('conObjeto') )






            /////////////////////////////// mueve la basura con el personaje

      if (this.basuraJuntada?.getData('levantado')==true){
        this.basuraJuntada.x=this.Player.x
        this.basuraJuntada.y=this.Player.y
      }
      else {
        this.Player.data.set('conObjeto', false)
      }

      /////////// seteo los valores de x e y///////////

    
      this.Player.data.set('X',this.Player.x);
      this.Player.data.set('Y',this.Player.y);

   
      ////////////////////// animaciones /////////

      this.animacionDePersonaje.x=this.Player.x
      this.animacionDePersonaje.y=this.Player.y
      
       if(this.Player.body.velocity.x>0 ){

         this.compruebaAnim('caminaDerecha')
         this.animacionDePersonaje.flipX = true
    
       }

       else if(this.Player.body.velocity.x < 0){
        this.compruebaAnim('caminaIzquierda')
        this.animacionDePersonaje.flipX = false
       
                  
       }

       else if(this.Player.body.velocity.y>0){

        this.compruebaAnim('camina')
        this.Player.data.set ('caminandoY', false)
     

         }
      
      else if(this.Player.body.velocity.y<0){

        this.compruebaAnim('caminaArriba')
        this.Player.data.set ('caminandoY', false)
         }  
           
      else if (this.Player.body.velocity.y==0 && this.Player.body.velocity.x== 0)
      {
       
        this.animacionDePersonaje.play('parado')
       

         }


   //////////// actualización  de  movimiento ////////// 
     //  const velocidad = 15;

       if (!this.Player){

           return
       }
       
       ///// manejo del mersonaje X ////

         if (this.Player.x<0 ) {
            this.Player.setVelocityX(0);
            this.Player.x=0 
           
           

             }
         else if (this.Player.x>1800 ) {
               this.Player.x=1800
               this.Player.setVelocityX(0);
             
         }
    
       if( this.Player.x < this.Player.data.get ('mouseX') && this.Player.body.velocity.x<0 ){
           this.Player.setVelocityX(0);
       
       }

       else if(this.Player.x > this.Player.data.get ('mouseX') && this.Player.body.velocity.x>0 ){
           this.Player.setVelocityX(0);
          
       }
      
       if(this.Player.x < this.Player.data.get ('mouseX') && this.Player.data.get('caminandoX')==true){
           
        this.muevePlayerX(this.velocidad,false)
        
       }
       else if(this.Player.x > this.Player.data.get ('mouseX') && this.Player.data.get('caminandoX')==true){
           
        this.muevePlayerX(-this.velocidad,false)
        

       }

       if (this.Player.y<350 ) {
        
         this.Player.setVelocityY(0)
         this.Player.y=350
       

     }
     else if (this.Player.y>1920 ) {
         
         this.Player.setVelocityY(0);
         this.Player.y=1920
        

     }

       if( this.Player.y < this.Player.data.get ('mouseY') && this.Player.body.velocity.y<0 ){
           this.Player.setVelocityY(0)
       
          
       }

       else if(this.Player.y > this.Player.data.get ('mouseY') && this.Player.body.velocity.y>0 ){
           this.Player.setVelocityY(0);
         
          
       }
      
       if(this.Player.y < this.Player.data.get ('mouseY') && this.Player.data.get('caminandoY')==true){
        this.muevePlayerY(this.velocidad,false)
       
           
         
       }
       else if(this.Player.y > this.Player.data.get ('mouseY') && this.Player.data.get('caminandoY')==true){
        
        this.muevePlayerY(-this.velocidad,false)
      }
 
    }
    compruebaAnim (animaciones) {

      if(this.animacionDePersonaje.anims.currentAnim.key!= animaciones){
        this.animacionDePersonaje.play(animaciones) 
        }

     }

     muevePlayerY(velocidad,Camina){
      this.Player.setVelocityY(velocidad);
      this.Player.data.set ('caminandoY', Camina)
     }

     muevePlayerX(velocidad,Camina){
      this.Player.setVelocityX(velocidad);
      this.Player.data.set ('caminandoX', Camina)
     }

     controlBasura(objeto) {
     
      console.log ('control de basura se ejecuto')
      //this.basuraJuntada.setData('levantado', false)
      this.Player.data.set('conObjeto', false)   
      this.basuraJuntada?.destroy()
      //objeto.removeInteractive()
     
     
     }

 }
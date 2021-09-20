import Phaser from 'phaser'

 export default class controlDePersonaje // exporto clase control de personaje
 {
      
   private scene: Phaser.Scene
	private Player: Phaser.Physics.Matter.Sprite
   private animacionDePersonaje : any 
   private cursor? :Phaser.Input.InputPlugin
   
   // pongo any porque no se como definirlo 
   constructor ( escena:Phaser.Scene,personaje:Phaser.Physics.Matter.Sprite,animacion:any)
    {
      //this.cursor=cursor
      this.scene = escena
		this.Player =personaje
      this.animacionDePersonaje=animacion
      this.animacionDePersonaje.setDataEnabled();
      this.animacionDePersonaje.data.set ('animacion','parado')
      

      this.Player.setDataEnabled();

      this.Player.data.set('caminadoX', false);
      this.Player.data.set('caminandoY', false);
      this.Player.data.set('conObjeto', false);
      this.Player.data.set('mouseX', this.Player.x);
      this.Player.data.set('mouseY', this.Player.y);
      this.Player.setVisible(false)
      this.CreaAnimaciones()

      //////// control de colisiones ///////

       ///////// colision////
         this.Player.setOnCollide((data: MatterJS.ICollisionPair) => {
        const body = data.bodyB as MatterJS.BodyType
        const gameObject = body.gameObject
        const sprite = gameObject as Phaser.Physics.Matter.Sprite
			  const type = sprite.getData('tipo') ///acacorroboro si tiene un dato con nobre tipo 
        
        console.log("colisiono con basura "+ type )}
        )  /// esta funcion solo detecta que el personaje colisiono con algo

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
     /* this.animacionDePersonaje.anims.create({
			key: 'camina',
			frames: this.animacionDePersonaje.generateFrameNumbers(' ', { start: 0, end:1 }),   
			frameRate: 10,
         repeat: -1
		})*/

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
			key: 'caminaizquierda',
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
    public moverPersonaje (){

      
                  ////////////////////// animaciones /////////
      this.animacionDePersonaje.x=this.Player.x
      this.animacionDePersonaje.y=this.Player.y
      
       if(this.Player.body.velocity.x>0 ){
         if(this.animacionDePersonaje.anims.currentAnim.key!= 'caminaDerecha'){
          this.animacionDePersonaje.play('caminaDerecha')
          this.animacionDePersonaje.flipX = true
         }
    
       }
       else if(this.Player.body.velocity.x<0){
        if(this.animacionDePersonaje.anims.currentAnim.key!= 'caminaizquierda'){
          this.animacionDePersonaje.play('caminaizquierda')
         this.animacionDePersonaje.flipX = false
        }
         
          
       }

       else if(this.Player.body.velocity.y>0){
        if(this.animacionDePersonaje.anims.currentAnim.key!= 'camina')
        {
         this.Player.data.set ('caminandoY', false)
         this.animacionDePersonaje.play('camina')
        }

         }
      
      else if(this.Player.body.velocity.y<0){
         if(this.animacionDePersonaje.anims.currentAnim.key!= 'caminaArriba')
        {
         this.Player.data.set ('caminandoY', false)
         this.animacionDePersonaje.play('caminaArriba')
        }
   
         }  
           
      else if (this.Player.body.velocity.y==0 && this.Player.body.velocity.x== 0)
      {
         this.animacionDePersonaje.play('parado')
       

         }

   //////////// actualización  de  movimiento ////////// 
       const velocidad = 15;

       if (!this.Player){

           return
       }
       
       ///// manejo del mersonaje X ////

         if (this.Player.x<100 ) {
            this.Player.x=100 
            this.Player.setVelocityX(0);
           

             }
         else if (this.Player.x>1200 ) {
               this.Player.x=1200
               this.Player.setVelocityX(0);
             
         }
     
       if( this.Player.x < this.Player.data.get ('mouseX') && this.Player.body.velocity.x<0 ){
           this.Player.setVelocityX(0);
         
          
       }

       else if(this.Player.x > this.Player.data.get ('mouseX') && this.Player.body.velocity.x>0 ){
           this.Player.setVelocityX(0);
         
          
       }
      
       if(this.Player.x < this.Player.data.get ('mouseX') && this.Player.data.get('caminandoX')==true){
           this.Player.setVelocityX(velocidad);
          this.Player.data.set ('caminandoX', false);
         
          
          
       }
       else if(this.Player.x > this.Player.data.get ('mouseX') && this.Player.data.get('caminandoX')==true){
           this.Player.setVelocityX(-velocidad);
          this.Player.data.set ('caminandoX', false)

       }

       if (this.Player.y<241 ) {
         this.Player.y=241 
         this.Player.setVelocityY(0)
       

     }
     else if (this.Player.y>860 ) {
         this.Player.y=860
         this.Player.setVelocityY(0);
        

     }

       if( this.Player.y < this.Player.data.get ('mouseY') && this.Player.body.velocity.y<0 ){
           this.Player.setVelocityY(0)
       
          
       }

       else if(this.Player.y > this.Player.data.get ('mouseY') && this.Player.body.velocity.y>0 ){
           this.Player.setVelocityY(0);
         
          
       }
      
       if(this.Player.y < this.Player.data.get ('mouseY') && this.Player.data.get('caminandoY')==true){
           this.Player.setVelocityY(velocidad);
           this.Player.data.set ('caminandoY', false)
           
         
       }
       else if(this.Player.y > this.Player.data.get ('mouseY') && this.Player.data.get('caminandoY')==true){
           this.Player.setVelocityY(-velocidad);
           this.Player.data.set ('caminandoY', false)
          
          

       }
       

    }


 }
import Phaser from 'phaser'


export default class carritos //extends Phaser.Scene


{

    private Escena?:Phaser.Scene
    private carrito?:Phaser.Physics.Matter.Sprite
    private Tipo?:string
    private CX?:any
    private CY?:any
    private inicioX?:number
    private finX?:number
    private AnimCarrito?:any

	constructor(escena:Phaser.Scene,carritos:any,tipo:string,inicio:number,fin:number,Anim:any)
	{
	

        this.Escena=escena
        this.carrito=carritos
        this.AnimCarrito=Anim
        this.Tipo=tipo
        this.inicioX=inicio
        this.finX=inicio+fin
        this.carrito?.setDataEnabled();
        this.carrito?.data.set('inicio', false);
        
       // this.Basura.setVelocityX(1)

        this.carrito?.setFriction(0,0)
        this.carrito?.setScale(0.65,0.4)
        this.carrito?.setVelocityX(1)
        this.carrito?.setDepth(8)
        this.carrito?.setFixedRotation()

        ///// anim carrito//// 
        this.AnimCarrito?.setScale(0.3)
        
        this.AnimCarrito?.anims.create({
            key: 'caminar',
            frames: this.AnimCarrito?.anims.generateFrameNumbers('animacionCarrito', { start:0, end: 3 }),
            frameRate: 3,
            repeat: -1
        });
       


        /////// seteo de información /////////
/*
        this.Basura.setDataEnabled()
        this.Basura.data.set('levantado', false);
        this.Basura.data.set('tipo',tipoBasura);
        this.Basura.setData('colisionando',false);
        

        this.Basura.data.set('seleccionado',false)// si esta seleccionado 
        
        */
      
       

	}


 //// siempre el inicio tiene que ser menos que el fin
    public mueveCarritosX(){
       /// prueba
       this.AnimCarrito.x=this.carrito!.x
       this.AnimCarrito.y=this.carrito!.y-80
       
       if ( !this.AnimCarrito.anims.isPlaying) {
           this.AnimCarrito.play('caminar')
       }

        if ((this.carrito!.x<this.inicioX! )) {
            this.carrito?.data.set('inicio', true);
            
        } 
        else if ((this.carrito!.x>this.finX! )) {

            this.carrito?.data.set('inicio', false);
        }


        if ( this.carrito!.getData('inicio')==true){
        this.carrito!.x+=Phaser.Math.Between(2,5)
        this.AnimCarrito.flipX=false
        }

        else if( this.carrito!.getData('inicio')==false) {
            this.carrito!.x-=Phaser.Math.Between(2,5)
            this.AnimCarrito.flipX=true
        }

    }

    
   


}



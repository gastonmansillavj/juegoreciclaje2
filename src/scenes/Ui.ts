import Phaser from 'phaser'
import { sharedInstance as events } from './EventListener'
export default class Ui extends Phaser.Scene
{

   
    private txtTiempo?: Phaser.GameObjects.Text
    private temporizador?:any
    private TiempoJuego = 0 
    private Tiempo = 0
    private barraRoja?:any
    private alturaBarra=0;
    
    

	constructor()
	{
		super('Ui')

        



	}

	preload()
    {

        this.load.image('btnPlay', 'imagenes/botones/botonPlay.png')
        this.load.image('fondoBarra', 'imagenes/sprites/FondoBarra.png')
        this.load.image('fondoGrisBarra', 'imagenes/sprites/fondoGrisBarra.png')
        this.load.image('barraRoja', 'imagenes/sprites/barraRoja.png')
     

    }

    create()
    {
        ////// variables iniciales ///////

        this.TiempoJuego = 0 
        this.alturaBarra=0

        //////////////////////////////////
          this.add.image(1750,330,'fondoBarra').setScale(1,0.8)
          this.add.image(1750,800,'fondoBarra')
          this.add.image(1780,800,'fondoGrisBarra')

          //////// barra /////////
       
        this.barraRoja= this.add.image(1780,996,'barraRoja');
        this.barraRoja.displayOriginY=388;
        this.barraRoja.displayHeight= this.alturaBarra;
       
       


         ////// boton menu ///////
         const Volver = this.add.image(1750,50, 'btnPlay').setScale(0.5);
         Volver.setInteractive()
         Volver.on('pointerdown', () => this.scene.start('Opciones') );

         const TxtReiniciar=this.add.text(1680,20, 'Menu ', {
            font: "50px Arial",
            align: "center",
            stroke: "#de77ae",
            strokeThickness: 10
        });
        

         /////// texto de tiempo //////// 


    
       this.txtTiempo = this.add.text(1647,150, 'Tiempo: ', {
            font: "40px Arial",
            align: "center",
            stroke: "#de77ae",
            strokeThickness: 10
        });
      
    
       // this.txtTiempo.setText('0')
    
           /// temporizador ///// 
      this.temporizador = this.time.addEvent({ delay: 1000, callback: this.cadaSegundo , callbackScope: this, loop: true });
      //////// control de eventos ///////
      events.on('BasuraDestruida', this.restaBarra, this)
        
    }
    
    update () {


            //////// evento de juego terminado////////
            events.on('TerminaJuego', ()=> this.TerminaJuego(), this)


        //console.log(this.Tiempo)
        this.txtTiempo?.setText('Tiempo: '+this.TiempoJuego)

        if (this.alturaBarra>=388) {

            this.alturaBarra=388
            events.emit('Pierde')
            
        }
        this.barraRoja.displayHeight= this.alturaBarra;
        

    }
 
    cadaSegundo(){

        this.TiempoJuego = this.TiempoJuego + 1
     

    }

    restaBarra (){
       this.alturaBarra=this.alturaBarra+30
    }

    TerminaJuego() {
        this.TiempoJuego = 0
        this.alturaBarra =0
    }


}

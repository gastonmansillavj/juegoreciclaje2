import Phaser from 'phaser'

/////api traductora/////// 
import { DE_DE, EN_US, ES_AR, PT_BR } from '~/enums/languages'
import { FETCHED, FETCHING, READY, TODO } from '~/enums/status'
import { getTranslations, getPhrase } from '~/services/translations'
/////////////

import { sharedInstance as events } from './EventListener'
export default class Ui extends Phaser.Scene
{

   
    private txtTiempo?: Phaser.GameObjects.Text
    private temporizador?:any
    private TiempoJuego = 0 
    private Tiempo = 0
    private barraRoja1?:any
    private barraRoja2?:any
    private barraRoja3?:any
    private barraRoja4?:any
    private barraRoja5?:any
    private barraRoja6?:any
    
    private alturaBarra=0;
    private BarraPuntos:any
    private AlturaBarraPuntos:number=0
    private Nivel?:string

    /////////// escena //////
    private Escena?:Phaser.Scene

    //////api traductora //////
    private idioma:any
    private updatedTextInScene
    private wasChangedLanguage = TODO
    private tradMenu = 'Menu'
    private tradTiempo='Tiempo'
    private txtMenu:any
    

    
    
    

	constructor(escena:Phaser.Scene)
	{
		super('Ui')

        this.Escena=escena



	}

	preload()
    {

        this.load.image('btnPlay', 'imagenes/botones/botonPlay.png')
        this.load.image('fondoBarra', 'imagenes/sprites/FondoBarra.png')
        this.load.image('fondoGrisBarra', 'imagenes/sprites/fondoGrisBarra.png')
        this.load.image('BarraPuntos', 'imagenes/sprites/BarraAmarilla.png')
        this.load.image('BarraGris', 'imagenes/sprites/BarraGris.png')
        this.load.image('barraRoja', 'imagenes/sprites/barraRoja.png')

        ////////////////////// Relleno  //////////////////////////////
        this.load.image('relleno1', 'imagenes/sprites/cesto_basura0.png')
        this.load.image('relleno2', 'imagenes/sprites/cesto_basura1.png')
        this.load.image('relleno3', 'imagenes/sprites/cesto_basura2.png')
        this.load.image('relleno4', 'imagenes/sprites/cesto_basura3.png')
        this.load.image('relleno5', 'imagenes/sprites/cesto_basura4.png')
        this.load.image('relleno6', 'imagenes/sprites/cesto_basura5.png')
        /////////////////////// estrellas ///////////
        this.load.image('estrellaSola', 'imagenes/sprites/estrella.png')
        this.load.image('estrellaLinea', 'imagenes/sprites/estrella_barra.png')
        

    }

    create()
    {
        ////// variables iniciales ///////

        this.TiempoJuego = 0 
        this.alturaBarra = 0
        this.AlturaBarraPuntos = 0

        //////////////////////////////////
          this.add.image(1750,330,'fondoBarra').setScale(1,0.8)//fondo naranja transparente
          this.add.image(1750,800,'fondoBarra') //// fondo naranja transparente     
          this.add.image(1750,800,'BarraGris').setScale(1,0.8)


     

          //////// barra Roja /////////
       
        this.barraRoja1= this.add.image(1750,380,'relleno1').setScale(0.45).setVisible(true);
        this.barraRoja2= this.add.image(1750,380,'relleno2').setScale(0.45).setVisible(false);
        this.barraRoja3= this.add.image(1750,380,'relleno3').setScale(0.45).setVisible(false);
        this.barraRoja4= this.add.image(1750,380,'relleno4').setScale(0.45).setVisible(false);
        this.barraRoja5= this.add.image(1750,380,'relleno5').setScale(0.45).setVisible(false);
        this.barraRoja6= this.add.image(1750,372,'relleno6').setScale(0.45).setVisible(false);
     

        /////////// Barra Puntos //////// 
        this.BarraPuntos= this.add.image(1750,1020,'BarraPuntos')
        .setScale(1,0.8)
        this.BarraPuntos.displayOriginY=553;

        ////////// estrellas //////// 
        this.add.image(1750,600,'estrellaSola').setScale(0.2)
        this.add.image(1750,700,'estrellaLinea').setScale(0.4)
        this.add.image(1750,800,'estrellaLinea').setScale(0.4)
        this.add.image(1750,900,'estrellaLinea').setScale(0.4)
     
        ///////// control de nivel//////
        events.on('Nivel1', ()=>{this.NivelActual('Nivel1')}, this)
        events.on('Nivel2', ()=>{this.NivelActual('Nivel2')}, this)
        events.on('Nivel3', ()=>{this.NivelActual('Nivel3')}, this)
        events.on('Nivel4', ()=>{this.NivelActual('Nivel4')}, this)
        events.on('Nivel5', ()=>{this.NivelActual('Nivel5')}, this)
       
         ////// boton menu ///////
         const Volver = this.add.image(1750,50, 'btnPlay').setScale(0.25,0.3);
         Volver.setInteractive()
         Volver.on('pointerdown', () => this.scene.pause(this.Nivel) );
         Volver.on('pointerdown', () => this.scene.switch('Opciones') );

        this.txtMenu=this.add.text(1680,20, getPhrase(this.tradMenu), {
            font: "50px Arial",
            align: "center",
            stroke: "#de77ae",
            strokeThickness: 10
        });
        

         /////// texto de tiempo //////// 


    
       this.txtTiempo = this.add.text(1647,150, getPhrase(this.tradTiempo+" :"), {
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
      events.on('PlasticoReciclado', this.SumaBarraPuntos, this)
      events.on('MetalReciclado', this.SumaBarraPuntos, this)
      events.on('PapelReciclado', this.SumaBarraPuntos, this)
           
    }
    
    update () {
        
        ///// api traductora //// 
        
 //console.log(this.updatedTextInScene)
 //console.log('idioma'+this.idioma)
 if(this.wasChangedLanguage === FETCHED){
    this.wasChangedLanguage = READY;
    this.txtMenu?.setText(getPhrase(this.tradMenu));
    this.txtTiempo?.setText(getPhrase(this.tradTiempo));
   
}


            //////// evento de juego terminado////////
            events.on('TerminaJuego', ()=> this.TerminaJuego(), this)


        //console.log(this.Tiempo)
        this.txtTiempo?.setText(getPhrase(this.tradTiempo)+" :"+this.TiempoJuego)

        if(this.alturaBarra==0) {
           this.barraRoja1.setVisible(true)
           this.animaBasura(this.barraRoja2)
     
        }
        else if (this.alturaBarra==1) {
            this.barraRoja1.setVisible(false)
            this.barraRoja2.setVisible(true)
            this.animaBasura(this.barraRoja3)
        }
        else if (this.alturaBarra==2) {
            this.barraRoja2.setVisible(false)
            this.barraRoja3.setVisible(true)
            this.animaBasura(this.barraRoja4)
        }
        else if (this.alturaBarra==3) {
            this.barraRoja3.setVisible(false)
            this.barraRoja4.setVisible(true)
            this.animaBasura(this.barraRoja5)
        }
        else if (this.alturaBarra==4) {
            this.barraRoja4.setVisible(false)
            this.barraRoja5.setVisible(true)
            this.animaBasura(this.barraRoja6)
        }
        else if (this.alturaBarra==5) {
            this.barraRoja5.setVisible(false)
            this.barraRoja6.setVisible(true)
            
            
        }
        else if (this.alturaBarra==6) {
            
            events.emit('Pierde')
        }

       
       // this.barraRoja.displayHeight= this.alturaBarra;
        this.BarraPuntos.displayHeight=this.AlturaBarraPuntos;
        

    }
 
    cadaSegundo(){

        this.TiempoJuego = this.TiempoJuego + 1
     

    }

    restaBarra (){
       this.alturaBarra+=1
       this.cameras.main.shake(200,0.005)
       events.emit('Sacude')
     
     
  
    }
  SumaBarraPuntos (){
   this.AlturaBarraPuntos+=30
     }

    TerminaJuego() {
        this.TiempoJuego = 0
        this.alturaBarra =0
    }

    NivelActual(nivel){

      this.Nivel=nivel
     
    }

    animaBasura(Barra){
        this.tweens.add({
            targets: Barra,
           // alpha: { from: 0, to: 1 },
            scale:{ from: 0.43, to: 0.45 },
            ease: 'Cubic',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 500,
            repeat: -1,            // -1: infinity
            yoyo: true
        });
    }


}

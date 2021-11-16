import Phaser from 'phaser'

        /////api traductora/////// 
import { DE_DE, EN_US, ES_AR, PT_BR } from '~/enums/languages'
import { FETCHED, FETCHING, READY, TODO } from '~/enums/status'
import { getTranslations, getPhrase } from '~/services/translations'
                //////////

import ControlDeEscenas from './ControlDeEscenas';
import { sharedInstance as events } from './EventListener'
export default class Niveles extends Phaser.Scene
{
    private Cscena?: ControlDeEscenas
    private Escenas?:any
    private MusicaMenu?:any
    private EstadoMusica:any
                                                                                                                                                                         s//// este juego fue programado por Gaston Mansilla, artista Candela Rodiguez y sonido Sofia Perassi/////
    /////////////////////////
    /// textos////// 
    private TxtNivel1?:Phaser.GameObjects.Text
    private TxtNivel2?:Phaser.GameObjects.Text
    private TxtNivel3?:Phaser.GameObjects.Text
    private TxtNivel4?:Phaser.GameObjects.Text
      
    //////api traductora //////
  
    private wasChangedLanguage = TODO
    private tradTxtNivel1 = 'Nivel 1'
    private tradTxtNivel2 = 'Nivel 2'
    private tradTxtNivel3 = 'Nivel 3'
    private tradTxtNivel4 = 'Nivel 4'
  
	constructor()
	{
		super('Niveles')
        
	}

	preload()
    {

        this.load.image('btnPlay', 'imagenes/botones/botonPlay.png')
        this.load.image('btnVolver', 'imagenes/botones/botonflecha.png')
        this.load.image('fondoN2', 'imagenes/sprites/fondo_NIVEL2.png')
        this.load.image('fondotran', 'imagenes/sprites/fondo_NIVEL2.png')
        this.load.audio('musicaMenu', 'musica/menu.mp3');
        this.Cscena = new ControlDeEscenas()

          
        
    }

    create()
    {      
        ////// musica /////
       
        this.MusicaMenu=this.sound.add('musicaMenu')
               
        this.EstadoMusica=localStorage.getItem('musica')
        
        console.log('musica'+this.EstadoMusica)
          if( this.EstadoMusica=='1'){
               this.MusicaMenu.play()
               this.MusicaMenu.setVolume(0.5)
              
               
             }


        //// local storage ////
        this.Escenas = this.getLocal()

       
     //   console.log(this.Escenas)

        const Fondo2=this.add.image(960,540, 'fondoN2').setScale(1.2);
        this.tweens.add({
            targets: Fondo2,
           // alpha: { from: 0, to: 1 },
           x:{ from: 800, to: 1100 },
           y:{ from:440, to: 650 },
            //ease: 'Cubic',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 20000,
            repeat: -1,            // -1: infinity
            yoyo: true
        });

        
         ///nivel 1///
    const   Nivel1 = this.add.image(960,140, 'btnPlay').setScale(0.8,0.8);
            Nivel1.setInteractive()
            Nivel1.on('pointerdown', () => {
                if (this.Escenas>=1) {
                    this.MusicaMenu?.stop()
                    this.scene.start('Nivel1')
                }
               
         
             //  this.Cscena.compruebaNiveles('Nivel1')
/*

                this.Cscena.CargarEscena(0)
                this.scene.manager.scenes[1].controladorEscena = this.Cscena;
                this.scene.stop(this.scene.manager.scenes[3])
                this.scene.start('Nivel1')
        */
            });

              events.on('Nivel1', ()=>{this.PlayNivel('Nivel1')}, this)  

//////////////////////////////////////////////////////   
    
    this.TxtNivel1=this.add.text(810,90, getPhrase(this.tradTxtNivel1), {
        font: "100px Arial",
        align: "center",
        stroke: "#de77ae",
        strokeThickness: 10
    });
    this.TxtNivel1.x= Nivel1.x-(this.TxtNivel1.width/2)

            ///// nivel 2 ///

    const   Nivel2 = this.add.image(960,390, 'btnPlay').setScale(0.8,0.8); 
       
        if (this.Escenas>=2) { 

            Nivel2.setInteractive()
        }
        else {
            Nivel2.setTint(0xC0c0c0)
        }

        Nivel2.on('pointerdown', () => {

                if (this.Escenas>=2) {
                    this.MusicaMenu?.stop()
                    this.scene.start('Nivel2')
                }
               
               
             });
          

    
    this.TxtNivel2=this.add.text(810,340, getPhrase(this.tradTxtNivel2), {
        font: "100px Arial",
        align: "center",
        stroke: "#de77ae",
        strokeThickness: 10
    });
    this.TxtNivel2.x= Nivel1.x-(this.TxtNivel2.width/2)
           /// nivel 3 ////
    const   Nivel3 = this.add.image(960,640, 'btnPlay').setScale(0.8,0.8);
    if (this.Escenas>=3) { 

        Nivel3.setInteractive()
    }
    else {
        Nivel3.setTint(0xC0c0c0)
    }
            Nivel3.on('pointerdown', () => {
               
                    this.MusicaMenu?.stop()
                    this.scene.start('Nivel3')
                
             
            } );

    this.TxtNivel3=this.add.text(810,590, getPhrase(this.tradTxtNivel3), {
        font: "100px Arial",
        align: "center",
        stroke: "#de77ae",
        strokeThickness: 10
    });
    this.TxtNivel3.x= Nivel1.x-(this.TxtNivel3.width/2)
            /// nivel 4/////
    const   Nivel4 = this.add.image(960,890, 'btnPlay').setScale(0.8,0.8);
    if (this.Escenas>=4) { 

        Nivel4.setInteractive()
    }
    else {
        Nivel4.setTint(0xC0c0c0)
    }
            Nivel4.on('pointerdown', () =>  {
                
                    this.MusicaMenu?.stop()
                    this.scene.start('Nivel3')
                
               
        });
    
    this.TxtNivel4=this.add.text(810,840, getPhrase(this.tradTxtNivel4), {
        font: "100px Arial",
        align: "center",
        stroke: "#de77ae",
        strokeThickness: 10
    });

    this.TxtNivel4.x= Nivel1.x-(this.TxtNivel4.width/2)
            /// nivel 5///
   /* const   Nivel5 = this.add.image(960,940, 'btnPlay').setScale(0.8,0.8);
            Nivel5.setInteractive()
            Nivel5.on('pointerdown', () => this.scene.start('Nivel5') );

  */
            /// volver ////
    const   Volver = this.add.image(100,70, 'btnVolver').setScale(0.4);
            Volver.setInteractive()
            Volver.on('pointerdown', () => {
                
                this.scene.start('Menu')
                this.MusicaMenu?.stop()
            
            } );

       
        
    }

    update (){
        ///// api traductora //// 
        
            // console.log(this.updatedTextInScene)
            if(this.wasChangedLanguage === FETCHED){
                this.wasChangedLanguage = READY;
               
                this.TxtNivel1?.setText(getPhrase(this.tradTxtNivel1));
                this.TxtNivel2?.setText(getPhrase(this.tradTxtNivel2));
                this.TxtNivel3?.setText(getPhrase(this.tradTxtNivel3));
                this.TxtNivel4?.setText(getPhrase(this.tradTxtNivel4));
               
            }
    }


   
            getLocal(){
                
                return localStorage.getItem('NivelDesbolqueado') || '1';
                
            };




    /////////// metodos eventos //////
    PlayNivel (nivel) {
        this.scene.start(nivel)
    }
   
}

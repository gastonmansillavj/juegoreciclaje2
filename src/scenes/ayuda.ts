import Phaser from 'phaser'

/////api traductora/////// 
import { DE_DE, EN_US, ES_AR, PT_BR } from '~/enums/languages'
import { FETCHED, FETCHING, READY, TODO } from '~/enums/status'
import { getTranslations, getPhrase } from '~/services/translations'

export default class Ayuda extends Phaser.Scene
{

    private MusicaMenu?:any
    private EstadoMusica?:any
     //////api traductora //////
     
     private updatedTextInScene
     private wasChangedLanguage = TODO
     private tradintruc1 = 'Instrucciones 1'
     private tradintruc2 = 'Instrucciones 2'
     private tradintruc3 = 'Instrucciones 3'

     private txtInstruc1:any
     private txtInstruc2:any
     private txtInstruc3:any

     private idioma:any

	constructor()
	{
		super('Ayuda')
	}

	preload()

    {   
        this.load.image('fondoN2', 'imagenes/sprites/fondo_NIVEL2.png')
        this.load.image('btnVolver', 'imagenes/botones/botonflecha.png')
        this.load.image('ayuda', 'imagenes/ayuda.png')
        this.load.image('ayudaA', 'imagenes/ayuda_aleman.png')
        this.load.image('ayudaB', 'imagenes/ayuda_portugues.png')
        this.load.image('ayudaI', 'imagenes/ayuda_ingles.png')
        ///////// musica /////////
        this.load.audio('musicaMenu', 'musica/menu.mp3');
        this.load.audio('boton', 'musica/boton.mp3');

        
    }

    create()
    {   

        const Fondo2=this.add.image(960,540, 'fondoN2').setScale(1.2);
       const fondoAyuda= this.add.image(960,540,'ayuda').setScale(0.9).setVisible(false)
       const fondoAyudaA= this.add.image(960,540,'ayudaA').setScale(0.9).setVisible(false)
       const fondoAyudaB= this.add.image(960,540,'ayudaB').setScale(0.9).setVisible(false)
       const fondoAyudaI= this.add.image(960,540,'ayudaI').setScale(0.9).setVisible(false)
 
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

        this.EstadoMusica=localStorage.getItem('musica')
        this.MusicaMenu=this.sound.add('musicaMenu')

        console.log(this.EstadoMusica)
          if( this.EstadoMusica=='1'){

              // this.MusicaMenu.play()
               this.MusicaMenu.setVolume(0.5)
               this.MusicaMenu.setLoop(true)
              
               
             }
         const SoundBoton = this.sound.add('boton')

        
        const   Volver = this.add.image(100,70, 'btnVolver').setScale(0.4);
        Volver.setInteractive()
        Volver.on('pointerdown', () => {
            if (this.EstadoMusica=='1') {
                SoundBoton.play()
                this.MusicaMenu.stop()
            }
            this.scene.start('Menu')} );
    
            this.idioma = localStorage.getItem('idioma')

        if(this.idioma == 'espaniol') {
            fondoAyuda.setVisible(true)
        }
        else if(this.idioma == 'ingles') {
            fondoAyudaI.setVisible(true)
        }
        else if(this.idioma == 'aleman') {
            fondoAyudaA.setVisible(true)
        }
        else if(this.idioma == 'brasilero') {
            fondoAyudaB.setVisible(true)
        }

        
        // this.txtInstruc1=this.add.text(500,450, getPhrase(this.tradintruc1), {
        //     font: "100px Arial",
        //     align: "center",
        //     stroke: "#de77ae",
        //     strokeThickness: 10
        // });
        // this.txtInstruc2=this.add.text(1000,450,getPhrase(this.tradintruc2), {
        //     font: "100px Arial",
        //     align: "center",
        //     stroke: "#de77ae",
        //     strokeThickness: 10
        // });
        // this.txtInstruc3=this.add.text(1500,450,getPhrase(this.tradintruc3), {
        //     font: "100px Arial",
        //     align: "center",
        //     stroke: "#de77ae",
        //     strokeThickness: 10
        // });



    }
    update (){

        // if(this.wasChangedLanguage === FETCHED){
        //     this.wasChangedLanguage = READY;
        //     this.txtInstruc1.setText(getPhrase(this.tradintruc1));
        //     this.txtInstruc2.setText(getPhrase(this.tradintruc2));
        //     this.txtInstruc3.setText(getPhrase(this.tradintruc3));
        // }
    }


    
}

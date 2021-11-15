import Phaser from 'phaser'

     /////api traductora/////// 
     import { DE_DE, EN_US, ES_AR, PT_BR } from '~/enums/languages'
     import { FETCHED, FETCHING, READY, TODO } from '~/enums/status'
     import { getTranslations, getPhrase } from '~/services/translations'
                     //////////

import Nivel1 from './Nivel1';
import { sharedInstance as events } from './EventListener'

export default class Opciones extends Phaser.Scene
{

    private Nivel?:any
     //////api traductora //////
  
     private wasChangedLanguage = TODO
     private tradMenu = 'Menu'
     private tradResume = 'Reanudar'
     private tradRestart = 'Reiniciar'
     
        ////////////////

     private TxtReiniciar:any
     private TxtReanudar:any
     private TxtMenu:any
    
	constructor()
	{
		super('Opciones')
	}

	preload()
    {

        this.load.image('btnPlay', 'imagenes/botones/botonPlay.png')


    }

    create()
    {                

        
        /////////// manda nivel ///////// 
        if (this.scene.isPaused('Nivel1')){
            this.compruebaNivel('Nivel1')
            console.log('Nivel1')
            }
        if (this.scene.isPaused('Nivel2')){
                this.compruebaNivel('Nivel2')
                console.log('Nivel2')
        }
        if (this.scene.isPaused('Nivel3')){
            this.compruebaNivel('Nivel3')
            console.log('Nivel3')
        }
        if (this.scene.isPaused('Nivel4')){
            this.compruebaNivel('Nivel4')
            console.log('Nivel4')
        }
        if (this.scene.isPaused('Nivel5')){
            this.compruebaNivel('Nivel5')
            console.log('Nivel2')
        }    


            /// Reanudar ///

        const   Reanudar = this.add.image(960,screen.height*1/3, 'btnPlay').setScale(0.8,0.8);
            Reanudar.setInteractive()
            Reanudar.on('pointerdown', () =>{ 
                this.scene.resume(this.Nivel)
                this.scene.wake('Ui') 
                this.scene.stop()
            
            } );
         
    
            this.TxtReanudar=this.add.text(740,Reanudar.y, getPhrase(this.tradResume), {
                    font: "100px Arial",
                    align: "center",
                    stroke: "#de77ae",
                    strokeThickness: 10
                });
            this.TxtReanudar.y=Reanudar.y-this.TxtReanudar.height/2

            ///// ayuda///
/*
    const   Ayuda = this.add.image(960,340, 'btnPlay').setScale(0.8,0.8);
            //Ayuda.setInteractive()
            //Ayuda.on('pointerdown', () => this.scene.start('Ayuda') );
            const TxtAyuda=this.add.text(810,280, 'Ayuda ', {
                font: "100px Arial",
                align: "center",
                stroke: "#de77ae",
                strokeThickness: 10
            });
           
            /// Sonido ///

            const   Sonido = this.add.image(960,540, 'btnPlay').setScale(0.8,0.8);
            //Sonido.setInteractive()
            //Sonido.on('pointerdown', () => this.scene.start('Nivel1') );
            const TxtSonido=this.add.text(810,480, 'sonido ', {
                font: "100px Arial",
                align: "center",
                stroke: "#de77ae",
                strokeThickness: 10
            });
*/
            /// Reiniciar/////
    const   Reiniciar = this.add.image(960,screen.height*2/3, 'btnPlay').setScale(0.8,0.8);

               Reiniciar.setInteractive()
               Reiniciar.on('pointerdown', () => {
                   this.scene.stop('Ui')
                   events.emit('DetieneMusica')
                   this.scene.start(this.Nivel)
                   this.scene.stop()
                
                } )
             

               this.TxtReiniciar=this.add.text(760,Reiniciar.y, getPhrase(this.tradRestart), {
                font: "100px Arial",
                align: "center",
                stroke: "#de77ae",
                strokeThickness: 10
              
            });

            this.TxtReiniciar.y=Reiniciar.y-this.TxtReiniciar.height/2
            /// menu///
    const   MenuInicio = this.add.image(960,screen.height*3/3, 'btnPlay').setScale(0.8,0.8);
            MenuInicio.setInteractive()
            MenuInicio.on('pointerdown', () => {
                events.emit('DetieneMusica')
                this.scene.stop('Ui')
                this.scene.stop(this.Nivel)
                this.scene.start('Menu')
                this.scene.stop()
            } )
          

            

           this.TxtMenu=this.add.text(810,MenuInicio.y,  getPhrase(this.tradMenu), {
                font: "100px Arial",
                align: "center",
                stroke: "#de77ae",
                strokeThickness: 10
            });
            this.TxtMenu.y=MenuInicio.y-this.TxtMenu.height/2
          
   


    }
    update (){

        if(this.wasChangedLanguage === FETCHED){
            this.wasChangedLanguage = READY;
           
            this.TxtReiniciar?.setText(getPhrase(this.tradRestart));
            this.TxtMenu?.setText(getPhrase(this.tradMenu));
            this.TxtReanudar?.setText(getPhrase(this.tradResume));
            
           
        }
    }

    compruebaNivel (nivel) {

        this.Nivel=nivel

    }


}


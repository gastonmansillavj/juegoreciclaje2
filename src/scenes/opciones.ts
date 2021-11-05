import Phaser from 'phaser'
import Nivel1 from './Nivel1';
import { sharedInstance as events } from './EventListener'

export default class Opciones extends Phaser.Scene
{

    private Nivel?:any
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

        const   Reanudar = this.add.image(960,140, 'btnPlay').setScale(0.8,0.8);
            Reanudar.setInteractive()
            Reanudar.on('pointerdown', () => this.scene.resume(this.Nivel) );
            Reanudar.on('pointerdown', () => this.scene.wake('Ui') );
            Reanudar.on('pointerdown', () => this.scene.stop() );
    
            const TxtReanudar=this.add.text(740,80, 'Reanudar ', {
                    font: "100px Arial",
                    align: "center",
                    stroke: "#de77ae",
                    strokeThickness: 10
                });

            ///// ayuda///

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

            /// Reiniciar/////
    const   Reiniciar = this.add.image(960,740, 'btnPlay').setScale(0.8,0.8);

               Reiniciar.setInteractive()
               Reiniciar.on('pointerdown', () => this.scene.stop('Ui') )
               Reiniciar.on('pointerdown', () => this.scene.start(this.Nivel) )
               Reiniciar.on('pointerdown', () => this.scene.stop() );

               const TxtReiniciar=this.add.text(760,680, 'Reiniciar ', {
                font: "100px Arial",
                align: "center",
                stroke: "#de77ae",
                strokeThickness: 10
            });
            /// menu///
    const   MenuInicio = this.add.image(960,940, 'btnPlay').setScale(0.8,0.8);
            MenuInicio.setInteractive()
            MenuInicio.on('pointerdown', () => this.scene.stop('Ui') )
            MenuInicio.on('pointerdown', () => this.scene.stop(this.Nivel) )
            MenuInicio.on('pointerdown', () => this.scene.start('Menu') )
            MenuInicio.on('pointerdown', () => this.scene.stop() )

            

            const TxtMenu=this.add.text(810,880, 'Menu', {
                font: "100px Arial",
                align: "center",
                stroke: "#de77ae",
                strokeThickness: 10
            });
          
   


    }

    compruebaNivel (nivel) {

        this.Nivel=nivel

    }


}


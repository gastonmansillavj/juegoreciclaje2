import Phaser from 'phaser'

export default class Opciones extends Phaser.Scene
{
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
            /// Reanudar ///

        const   Reanudar = this.add.image(960,140, 'btnPlay').setScale(1.2,1);
            Reanudar.setInteractive()
            Reanudar.on('pointerdown', () => this.scene.start('Nivel1') );
    
            const TxtReanudar=this.add.text(740,80, 'Reanudar ', {
                    font: "100px Arial",
                    align: "center",
                    stroke: "#de77ae",
                    strokeThickness: 10
                });

            ///// ayuda///

    const   Ayuda = this.add.image(960,340, 'btnPlay').setScale(1.2,1);
            //Ayuda.setInteractive()
            //Ayuda.on('pointerdown', () => this.scene.start('Ayuda') );
            const TxtAyuda=this.add.text(810,280, 'Ayuda ', {
                font: "100px Arial",
                align: "center",
                stroke: "#de77ae",
                strokeThickness: 10
            });
           
            /// Sonido ///

            const   Sonido = this.add.image(960,540, 'btnPlay').setScale(1.2,1);
            //Sonido.setInteractive()
            //Sonido.on('pointerdown', () => this.scene.start('Nivel1') );
            const TxtSonido=this.add.text(810,480, 'sonido ', {
                font: "100px Arial",
                align: "center",
                stroke: "#de77ae",
                strokeThickness: 10
            });

            /// Reiniciar/////
    const   Reiniciar = this.add.image(960,740, 'btnPlay').setScale(1.2,1);

              //  Reiniciar.setInteractive()
               // Reiniciar.on('pointerdown', () => this.scene.start('Nivel1') );

               const TxtReiniciar=this.add.text(760,680, 'Reiniciar ', {
                font: "100px Arial",
                align: "center",
                stroke: "#de77ae",
                strokeThickness: 10
            });
            /// menu///
    const   MenuInicio = this.add.image(960,940, 'btnPlay').setScale(1.2,1);
            MenuInicio.setInteractive()
            MenuInicio.on('pointerdown', () => this.scene.start('Menu') );

            const TxtMenu=this.add.text(810,880, 'Menu', {
                font: "100px Arial",
                align: "center",
                stroke: "#de77ae",
                strokeThickness: 10
            });
          
   


    }
}


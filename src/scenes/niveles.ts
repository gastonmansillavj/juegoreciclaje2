import Phaser from 'phaser'

export default class Niveles extends Phaser.Scene
{
	constructor()
	{
		super('Niveles')
	}

	preload()
    {

        this.load.image('btnPlay', 'imagenes/botones/botonPlay.png')


    }

    create()
    {       ///nivel 1///
    const   Nivel1 = this.add.image(960,140, 'btnPlay');
            Nivel1.setInteractive()
            Nivel1.on('pointerdown', () => this.scene.start('Nivel1') );
    
    const TxtNivel1=this.add.text(810,80, 'Nivel 1 ', {
        font: "100px Arial",
        align: "center",
        stroke: "#de77ae",
        strokeThickness: 10
    });

            ///// nivel 2 ///

    const   Nivel2 = this.add.image(960,340, 'btnPlay');
            Nivel2.setInteractive()
            Nivel2.on('pointerdown', () => this.scene.start('Nivel1') );
    
    const TxtNivel2=this.add.text(810,280, 'Nivel 2 ', {
        font: "100px Arial",
        align: "center",
        stroke: "#de77ae",
        strokeThickness: 10
    });
           /// nivel 3 ////
    const   Nivel3 = this.add.image(960,540, 'btnPlay');
            Nivel3.setInteractive()
            Nivel3.on('pointerdown', () => this.scene.start('Nivel1') );

    const TxtNivel3=this.add.text(810,480, 'Nivel 3 ', {
        font: "100px Arial",
        align: "center",
        stroke: "#de77ae",
        strokeThickness: 10
    });
            /// nivel 4/////
    const   Nivel4 = this.add.image(960,740, 'btnPlay');
            Nivel4.setInteractive()
            Nivel4.on('pointerdown', () => this.scene.start('Nivel1') );
    
    const TxtNivel4=this.add.text(810,680, 'Nivel 4', {
        font: "100px Arial",
        align: "center",
        stroke: "#de77ae",
        strokeThickness: 10
    });
            /// nivel 5///
    const   Nivel5 = this.add.image(960,940, 'btnPlay');
            Nivel5.setInteractive()
            Nivel5.on('pointerdown', () => this.scene.start('Nivel1') );

    const TxtNivel5=this.add.text(810,880, 'Nivel 5 ', {
        font: "100px Arial",
        align: "center",
        stroke: "#de77ae",
        strokeThickness: 10
    });
            /// volver ////
    const   Volver = this.add.image(100,50, 'btnPlay').setScale(0.5);
            Volver.setInteractive()
            Volver.on('pointerdown', () => this.scene.start('Menu') );
        
    }
}

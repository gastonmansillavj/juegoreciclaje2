import Phaser from 'phaser'

export default class Ayuda extends Phaser.Scene
{
	constructor()
	{
		super('Ayuda')
	}

	preload()
    {
        

       
        
    }

    create()
    {
       

    const   Volver = this.add.image(1820,50, 'btnPlay').setScale(0.5);
            Volver.setInteractive()
            Volver.on('pointerdown', () => this.scene.start('Menu') );

    const TxtAyuda=this.add.text(500,450, 'Escena de ayuda', {
        font: "100px Arial",
        align: "center",
        stroke: "#de77ae",
        strokeThickness: 10
    });

    }

    
}

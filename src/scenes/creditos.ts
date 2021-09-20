import Phaser from 'phaser'

export default class Creditos extends Phaser.Scene
{
	constructor()
	{
		super('Creditos')
	}

	preload()
    {
        

       
        

    }

    create()
    {
        

    const   Volver = this.add.image(1820,50, 'btnPlay').setScale(0.5);
            Volver.setInteractive()
            Volver.on('pointerdown', () => this.scene.start('Menu') );


    const TxtCreditos=this.add.text(400,450, 'integrantes del equipo 7 ', {
        font: "100px Arial",
        align: "center",
        stroke: "#de77ae",
        strokeThickness: 10
    });
    }
}

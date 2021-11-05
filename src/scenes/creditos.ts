import Phaser from 'phaser'

export default class Creditos extends Phaser.Scene
{
	constructor()
	{
		super('Creditos')
	}

	preload()
    {
        this.load.image('btnVolver', 'imagenes/botones/botonflecha.png')
        this.load.image('fondoN2', 'imagenes/sprites/fondo_NIVEL2.png')
       
        

    }

    create()
    {
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
        const   Volver = this.add.image(100,70, 'btnVolver').setScale(0.4);
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

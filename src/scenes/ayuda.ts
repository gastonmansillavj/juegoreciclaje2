import Phaser from 'phaser'

export default class Ayuda extends Phaser.Scene
{
	constructor()
	{
		super('Ayuda')
	}

	preload()
    {    this.load.image('fondoN2', 'imagenes/sprites/fondo_NIVEL2.png')
        this.load.image('btnVolver', 'imagenes/botones/botonflecha.png')
        this.load.image('ayuda', 'imagenes/ayuda.png')

        
    }

    create()
    {   

        const Fondo2=this.add.image(960,540, 'fondoN2').setScale(1.2);
       const fondoAyuda= this.add.image(960,540,'ayuda').setScale(0.9)
 
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
    


    const TxtAyuda=this.add.text(500,450, 'Escena de ayuda', {
        font: "100px Arial",
        align: "center",
        stroke: "#de77ae",
        strokeThickness: 10
    });

    }

    
}

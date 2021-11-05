import Phaser from 'phaser'

export default class Gana extends Phaser.Scene
{
	constructor()
	{
		super('Gana')
	}

	preload()
    {

        this.load.image('btnPlay', 'imagenes/botones/botonPlay.png')
        this.load.image('fondoN2', 'imagenes/sprites/fondo_NIVEL2.png')
       
    }

    create()
    {
        const Fondo2=this.add.image(960,540, 'fondoN2')
        .setScale(1.2)
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
       
          const  BtnPlay = this.add.image(960,840, 'btnPlay').setScale(0.8);
             BtnPlay.setInteractive()
             BtnPlay.on('pointerdown', () => this.scene.start('Niveles') );

            //  textos 
            const TxtPlay=this.add.text(BtnPlay.x-100,BtnPlay.y-50, 'Niveles', {
            font: "70px Arial",
            align: "center",
            stroke: "#de77ae",
            strokeThickness: 10,
            

            })
            const TxtGanaste=this.add.text(680,330, 'Ganaste', {
                font: "180px Arial",
                align: "center",
                stroke: "#de77ae",
                strokeThickness: 30
                }); 
            this.tweensEjercicios(TxtGanaste)
           
            
               

   


    }

    tweensEjercicios(Txt) {

        this.tweens.add({
            targets: Txt,
           // alpha: { from: 0, to: 1 },
            scale:{ from: 0.8, to: 1.2 },
            displayOriginX:90,
            // alpha: '+=1',
            // alpha: { from: 0, to: 1 },
            // alpha: { start: 0, to: 1 },  
            // alpha: { start: value0, from: value1, to: value2 },  
            // alpha: function(target, key, value, targetIndex, totalTargets, tween)  { return newValue; },
            // alpha: {
            //      getActive: function (target, key, value, targetIndex, totalTargets, tween) { return newValue; },
            //      getStart: function (target, key, value, targetIndex, totalTargets, tween) { return newValue; },
            //      getEnd: function (target, key, value, targetIndex, totalTargets, tween) { return newValue; }
            // },
            ease: 'Cubic',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 500,
            repeat: -1,            // -1: infinity
            yoyo: true
        });
  
    }
}

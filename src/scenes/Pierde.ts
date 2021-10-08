import Phaser from 'phaser'

export default class Pierde extends Phaser.Scene
{
	constructor()
	{
		super('Pierde')
	}

	preload()
    {

        this.load.image('btnPlay', 'imagenes/botones/botonPlay.png')
       
    }

    create()
    {

         // this.add.image(960,540,'fondo').setScale(1.2)
          const  BtnPlay = this.add.image(960,840, 'btnPlay');
             BtnPlay.setInteractive()
             BtnPlay.on('pointerdown', () => this.scene.switch('Menu') );


            //  textos 
            const TxtPlay=this.add.text(870,400, 'PERDISTE', {
            font: "70px Arial",
            align: "center",
            stroke: "#de77ae",
            strokeThickness: 10
            }); 

   


    }
}

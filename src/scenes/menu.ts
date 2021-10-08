import Phaser from 'phaser'

export default class Menu extends Phaser.Scene
{
	constructor()
	{
		super('Menu')
	}

	preload()
    {

        this.load.image('btnPlay', 'imagenes/botones/botonPlay.png')
        this.load.image('fondo', 'imagenes/sprites/menuFondo.png')
        

        

    }

    create()
    {

            this.add.image(960,540,'fondo').setScale(1.2)
            const  BtnPlay = this.add.image(960,840, 'btnPlay');
             BtnPlay.setInteractive()
             BtnPlay.on('pointerdown', () => this.scene.switch('Niveles') );


    //  textos 
    const TxtPlay=this.add.text(870,800, 'Jugar', {
        font: "70px Arial",
        align: "center",
        stroke: "#de77ae",
        strokeThickness: 10
    }); 

    const   Creditos = this.add.image(1360,840, 'btnPlay').setScale(0.7);
            Creditos.setInteractive()
            Creditos.on('pointerdown', () => this.scene.start('Creditos') );

    const TxtCreditos=this.add.text(1230,800, 'Creditos', {
        font: "70px Arial",
        align: "center",
        stroke: "#de77ae",
        strokeThickness: 10
    });


    const   Ayuda = this.add.image(560,840, 'btnPlay').setScale(0.7);
            Ayuda.setInteractive()
            Ayuda.on('pointerdown', () => this.scene.start('Ayuda') );

    const TxtAyuda=this.add.text(470,800, 'Ayuda', {
        font: "70px Arial",
        align: "center",
        stroke: "#de77ae",
        strokeThickness: 10
    });
        
    
    const   Sonido = this.add.image(1820,50, 'btnPlay').setScale(0.5);
            //Sonido.setInteractive()
           // Sonido.on('pointerdown', () => this.scene.start('Creditos') );
    const   Idioma = this.add.image(100,50, 'btnPlay').setScale(0.5);
           //Idioma.setInteractive()
          // Idioma.on('pointerdown', () => this.scene.start('Creditos') );



    }
}

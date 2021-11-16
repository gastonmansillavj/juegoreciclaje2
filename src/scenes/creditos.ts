import Phaser from 'phaser'

export default class Creditos extends Phaser.Scene
{

    private EstadoMusica?:any
	constructor()
	{
		super('Creditos')
	}

	preload()
    {

        this.load.image('btnVolver', 'imagenes/botones/botonflecha.png')
        this.load.image('fondoN2', 'imagenes/sprites/fondo_NIVEL2.png')
         ///////// musica /////////
         this.load.audio('musicaMenu', 'musica/menu.mp3');
         this.load.audio('boton', 'musica/boton.mp3');
 
       
        

    }

    create()
    {   
        //////////////////
        this.EstadoMusica=localStorage.getItem('musica')
        /////////////////
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
        
        const SoundBoton = this.sound.add('boton')
        const   Volver = this.add.image(100,70, 'btnVolver').setScale(0.4);
        Volver.setInteractive()
        Volver.on('pointerdown', () => {
            
            if (this.EstadoMusica=='1') {
                SoundBoton.play()
              
            }
            this.scene.start('Menu')

        
        });


        const TxtCreditos=this.add.text(75,450, 'Programador\n Mansilla Gastón', {
            font: "65px Arial",
            align: "center",
            stroke: "#de77ae",
            strokeThickness: 10
        });

        const TxtProgramador=this.add.text(650,450, 'Artista\n Rodriguez Candela', {
            font: "65px Arial",
            align: "center",
            stroke: "#de77ae",
            strokeThickness: 10
        });

        const TxtArtista=this.add.text(1270,450, 'Sonido y traducción\n Sofía Perassi', {
            font: "65px Arial",
            align: "center",
            stroke: "#de77ae",
            strokeThickness: 10
        });

        const TxtSonido=this.add.text(screen.width/2+100,150, 'Creditos', {
            font: "100px Arial",
            align: "center",
            stroke: "#de77ae",
            strokeThickness: 10
        });
    }
}

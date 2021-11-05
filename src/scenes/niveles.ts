import Phaser from 'phaser'
import ControlDeEscenas from './ControlDeEscenas';
import { sharedInstance as events } from './EventListener'
export default class Niveles extends Phaser.Scene
{
    private Cscena?: ControlDeEscenas
    private Escenas?:any
	constructor()
	{
		super('Niveles')
        
	}

	preload()
    {

        this.load.image('btnPlay', 'imagenes/botones/botonPlay.png')
        this.load.image('btnVolver', 'imagenes/botones/botonflecha.png')
        this.load.image('fondoN2', 'imagenes/sprites/fondo_NIVEL2.png')
        this.load.image('fondotran', 'imagenes/sprites/fondo_NIVEL2.png')
      
        this.Cscena = new ControlDeEscenas()

          
        
    }

    create()
    {      
        
        //// local storage ////
        this.Escenas = this.getLocal()
        console.log(this.Escenas)

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

        
         ///nivel 1///
    const   Nivel1 = this.add.image(960,140, 'btnPlay').setScale(0.8,0.8);
            Nivel1.setInteractive()
            Nivel1.on('pointerdown', () => {
                
                this.scene.start('Nivel1')
             //  this.Cscena.compruebaNiveles('Nivel1')
/*

                this.Cscena.CargarEscena(0)
                this.scene.manager.scenes[1].controladorEscena = this.Cscena;
                this.scene.stop(this.scene.manager.scenes[3])
                this.scene.start('Nivel1')
        */
            });

              events.on('Nivel1', ()=>{this.PlayNivel('Nivel1')}, this)  

//////////////////////////////////////////////////////   
    
    const TxtNivel1=this.add.text(810,80, 'Nivel1', {
        font: "100px Arial",
        align: "center",
        stroke: "#de77ae",
        strokeThickness: 10
    });

            ///// nivel 2 ///

    const   Nivel2 = this.add.image(960,340, 'btnPlay').setScale(0.8,0.8);
           
    if(this.Escenas>=2){
        Nivel2.setInteractive()
       }
  
           
            Nivel2.on('pointerdown', () => {

                this.scene.start('Nivel2');

             });
          

    
    const TxtNivel2=this.add.text(810,280, 'Nivel 2 ', {
        font: "100px Arial",
        align: "center",
        stroke: "#de77ae",
        strokeThickness: 10
    });
           /// nivel 3 ////
    const   Nivel3 = this.add.image(960,540, 'btnPlay').setScale(0.8,0.8);
            Nivel3.setInteractive()
            Nivel3.on('pointerdown', () => this.scene.start('Nivel3') );

    const TxtNivel3=this.add.text(810,480, 'Nivel 3 ', {
        font: "100px Arial",
        align: "center",
        stroke: "#de77ae",
        strokeThickness: 10
    });
            /// nivel 4/////
    const   Nivel4 = this.add.image(960,740, 'btnPlay').setScale(0.8,0.8);
            Nivel4.setInteractive()
            Nivel4.on('pointerdown', () =>  this.scene.start('Nivel4'));
    
    const TxtNivel4=this.add.text(810,680, 'Nivel 4', {
        font: "100px Arial",
        align: "center",
        stroke: "#de77ae",
        strokeThickness: 10
    });
            /// nivel 5///
    const   Nivel5 = this.add.image(960,940, 'btnPlay').setScale(0.8,0.8);
            Nivel5.setInteractive()
            Nivel5.on('pointerdown', () => this.scene.start('Nivel5') );

    const TxtNivel5=this.add.text(810,880, 'Nivel 5 ', {
        font: "100px Arial",
        align: "center",
        stroke: "#de77ae",
        strokeThickness: 10
    });
            /// volver ////
    const   Volver = this.add.image(100,70, 'btnVolver').setScale(0.4);
            Volver.setInteractive()
            Volver.on('pointerdown', () => this.scene.start('Menu') );
        
    }


   
            getLocal(){
                
                return localStorage.getItem('NivelDesbolqueado') || '1';
                
            };




    /////////// metodos eventos //////
    PlayNivel (nivel) {
        this.scene.start(nivel)
    }
   
}

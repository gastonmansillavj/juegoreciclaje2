import Phaser from 'phaser'

export default class Menu extends Phaser.Scene
{
    private Cinta?:Phaser.GameObjects.Image
    private BtnJugar?:Phaser.GameObjects.Image
    private BtnAyuda?:Phaser.GameObjects.Image
    private BtnCreditos?:Phaser.GameObjects.Image
    private txtPlay?:Phaser.GameObjects.Text
    private txtAyuda?:Phaser.GameObjects.Text
    private txtCreditos?:Phaser.GameObjects.Text
    private MusicaMenu?:Phaser.Sound.BaseSound
    private EstadoMusica?:any


	constructor()
	{
		super('Menu')
	}

	preload()
    {

        this.load.image('btnPlay', 'imagenes/botones/botonPlay.png')
        this.load.image('titulo', 'imagenes/botones/TITULO.png')
        this.load.image('btnSonido', 'imagenes/botones/botonsonido.png')
        this.load.image('btnNoSonido', 'imagenes/botones/boton_no_sonido.png')
        this.load.image('btnIdioma', 'imagenes/botones/botonidioma.png')
        this.load.image('fondo', 'imagenes/sprites/menufond.png')
        this.load.image('personajeMenu','imagenes/sprites/personajemenu.png')
        this.load.image('cintaVerde', 'imagenes/sprites/cinadelmenu.png');
        this.load.audio('musicaMenu', 'musica/menu.mp3');

    }

    create()
    {
        
        //////musica /////////

        const BtnNoSonido=this.add.image(1820,100,'btnNoSonido').setVisible(false).setDepth(10).setScale(0.15)
        this.MusicaMenu=this.sound.add('musicaMenu')
               
        this.EstadoMusica=localStorage.getItem('musica')
          if( this.EstadoMusica=='1'){
               this.MusicaMenu.play()
               
             }
 
        console.log(this.getLocal('NivelDesbolqueado'));
           //////// fondo ///////
          
        this.add.image(960,540,'fondo').setScale(1.2)
        this.add.image(1260,640,'personajeMenu').setScale(0.9)
        const titulo = this.add.image(1160,140,'titulo')
        
        
        this.tweens.add({
            targets: titulo,
           // alpha: { from: 0, to: 1 },
            scale:{ from: 0.9, to: 1 },
           // angle:{ from: -1, to: 1 },
           // displayOriginX:90,
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
           // ease: 'Cubic',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 1000,
            repeat: -1,            // -1: infinity
            yoyo: true
        });
        
        ////////// boton jugar //////// 
        this.BtnJugar = this.add.image(300,580, 'btnPlay').setScale(0.4,0.4);
        this.BtnJugar.setVisible(false)
        this.BtnJugar.on('pointerdown', () => this.MusicaMenu?.stop() );
        this.BtnJugar.on('pointerdown', () => this.scene.start('Niveles') );

        ////////// boton creditos //////////
        this.BtnCreditos = this.add.image(300,690, 'btnPlay').setScale(0.4,0.4);
        this.BtnCreditos.setVisible(false)
        this.BtnCreditos.on('pointerdown', () => this.MusicaMenu?.stop() );
        this.BtnCreditos.on('pointerdown', () => this.scene.start('Creditos') );


        /////////// boton ayuda //////////
            
        this.BtnAyuda = this.add.image(300,800, 'btnPlay').setScale(0.4,0.4);
        this.BtnAyuda.setVisible(false)
        this.BtnAyuda.on('pointerdown', () => this.MusicaMenu?.stop());
        this.BtnAyuda.on('pointerdown', () => this.scene.start('Ayuda') );
      
     
    ///////////////  textos //////////////////
        this.txtPlay=this.add.text(300,535, 'Jugar', {
            font: "70px Arial",
            align: "center",
            stroke: "#de77ae",
            strokeThickness: 10
        }); 
        this.txtPlay.setVisible(false)

    

        this.txtCreditos=this.add.text(300,645, 'Creditos', {
            font: "70px Arial",
            align: "center",
            stroke: "#de77ae",
            strokeThickness: 10
        });
        this.txtCreditos.setVisible(false)


       this.txtAyuda=this.add.text(300,755, 'Ayuda', {
            font: "70px Arial",
            align: "center",
            stroke: "#de77ae",
            strokeThickness: 10
        });
        this.txtAyuda.setVisible(false)
            
              /////// CintaVerde////// 
              this.Cinta = this.add.image( 300,-900,'cintaVerde').setScale(1.1,1)
              this.Cinta.displayOriginY=0;

        const   Sonido = this.add.image(1820,100, 'btnSonido').setScale(0.15);
                Sonido.setInteractive()
                Sonido.on('pointerdown', ()=>{
               
                    if (this.EstadoMusica=='1'){
                        this.EstadoMusica='0'
                        this.MusicaMenu?.stop();
                        localStorage.setItem('musica','0');
                        BtnNoSonido.setVisible(true)
                        
                       // this.MusicaMenu?.stop();
                       // console.log(this.EstadoMusica)
                        
                    }
                    else if(this.EstadoMusica=='0'){
                        this.EstadoMusica='1'
                        localStorage.setItem('musica','1');
                        this.MusicaMenu?.play() 
                        BtnNoSonido.setVisible(false)
                    }
                });

        const   Idioma = this.add.image(1820,200, 'btnIdioma').setScale(0.15);
            //Idioma.setInteractive()
            // Idioma.on('pointerdown', () => this.scene.start('Creditos') );



    }

    update (){
        
        this.txtPlay!.x=this.BtnJugar!.x-100
        this.txtAyuda!.x=this.BtnAyuda!.x-100
        this.txtCreditos!.x=this.BtnCreditos!.x-130


        if (this.Cinta!.y<-100) {
             this.Cinta!.y+=15
            }
        else {
            if ( this.BtnAyuda!.x<600) {
                this.BtnAyuda!.x+=15
                this.BtnJugar!.x+=15
                this.BtnCreditos!.x+=15
                this.BtnJugar?.setVisible(true)
                this.BtnAyuda?.setVisible(true)
                this.BtnCreditos?.setVisible(true)

                this.txtPlay!.setVisible(true)
                this.txtAyuda!.setVisible(true)
                this.txtCreditos!.setVisible(true)
               
        
            }
            else {
               
                this.BtnJugar?.setInteractive()
                this.BtnCreditos?.setInteractive()
                this.BtnAyuda?.setInteractive()
            }
        

       }

    }



    textos (texto,posicionX:number) {
        this.txtPlay!.setVisible(true)
        this.txtPlay!.x=posicionX

    }

   /// local storage ///
   getLocal(lc){

    return localStorage.getItem(lc);

    };


    cambiaMusica (){


        console.log(this.EstadoMusica)
        
        if (this.EstadoMusica=='1'){
            this.MusicaMenu?.stop()
            localStorage.setItem('musica', "0");
        }
        else if(this.EstadoMusica=='0'){
            this.MusicaMenu?.play() 
            localStorage.setItem('musica', "1");
        }
       
    }

   

}

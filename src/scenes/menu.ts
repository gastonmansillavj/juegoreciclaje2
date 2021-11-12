import Phaser from 'phaser'
//// events listener////
import { sharedInstance as events } from './EventListener'

/////api traductora/////// 
import { DE_DE, EN_US, ES_AR, PT_BR } from '~/enums/languages'
import { FETCHED, FETCHING, READY, TODO } from '~/enums/status'
import { getTranslations, getPhrase } from '~/services/translations'

export default class Menu extends Phaser.Scene
{
    private Cinta?:Phaser.GameObjects.Image
    private BtnJugar?:Phaser.GameObjects.Image
    private BtnAyuda?:Phaser.GameObjects.Image
    private BtnCreditos?:Phaser.GameObjects.Image
    private txtPlay?:Phaser.GameObjects.Text
    private txtAyuda?:Phaser.GameObjects.Text
    private txtCreditos?:Phaser.GameObjects.Text
    private MusicaMenu?:any
    private EstadoMusica?:any
    private btnIdioma:any
    
    //////api traductora //////
    private idioma:any
    private updatedTextInScene
    private wasChangedLanguage = TODO
    private tradTxtJugar = 'Jugar'
    private tradTxtAyuda = 'Ayuda'
    private tradTxtCreditos = 'Creditos'
 //// pantalll completa    
    private estadoPantalla:any
    private txtrotar:any
    private Rotar:any
    private Toca:any
    private ControlFullScreen:any


    /////////
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
        this.load.image('bTnExpandir', 'imagenes/sprites/boton_expandir.png')
        this.load.image('bTnContraer', 'imagenes/sprites/boton_contraer.png')
        this.load.image('rotar', 'imagenes/sprites/rotar_pantalla.png') 
        this.load.image('tocaPantalla', 'imagenes/sprites/TOCAR_PANTALLA.png')
        this.load.image('personajeMenu','imagenes/sprites/personajemenu.png')
        this.load.image('cintaVerde', 'imagenes/sprites/cinadelmenu.png');
        this.load.audio('musicaMenu', 'musica/menu.mp3');
        

    }

    create()
    {
        
        this.ControlFullScreen=localStorage.getItem('estadoPantalla');
        
        this.Rotar=this.add.image(980,540,'rotar').setDepth(11).setScale(1.1,1.1)//.setVisible(false)

        /////// idioma ///////
        this.idioma = localStorage.getItem('idioma')
        console.log(this.idioma+'este es el idioma')
        //////musica /////////

        const BtnNoSonido=this.add.image(1820,100,'btnNoSonido').setVisible(false).setDepth(10).setScale(0.15)
        this.MusicaMenu=this.sound.add('musicaMenu')
               
        this.EstadoMusica=localStorage.getItem('musica')

        console.log(this.EstadoMusica)
          if( this.EstadoMusica=='1'){
               this.MusicaMenu.play()
               this.MusicaMenu.setVolume(0.5)
               this.MusicaMenu.setLoop(true)
               BtnNoSonido.setVisible(false)
               
             }
 
        console.log('musica '+this.getLocal('musica'));
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
        this.txtPlay=this.add.text(300,535,  getPhrase(this.tradTxtJugar), {
            font: "70px Arial",
            align: "center",
            stroke: "#de77ae",
            strokeThickness: 10
        }); 
        this.txtPlay.x=this.BtnJugar.x-(this.txtPlay.width/2)
        this.txtPlay.setVisible(false)

    

        this.txtCreditos=this.add.text(300,645, getPhrase(this.tradTxtCreditos), {
            font: "70px Arial",
            align: "center",
            stroke: "#de77ae",
            strokeThickness: 10
        });
        this.txtCreditos.x=this.BtnCreditos.x-(this.txtCreditos.width/2)
        this.txtCreditos.setVisible(false)


       this.txtAyuda=this.add.text(300,755, getPhrase(this.tradTxtAyuda), {
            font: "70px Arial",
            align: "center",
            stroke: "#de77ae",
            strokeThickness: 10
        });
        this.txtAyuda.x=this.BtnAyuda.x-(this.txtAyuda.width/2)
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
                        this.MusicaMenu?.setVolume(0.5) 
                        BtnNoSonido.setVisible(false)
                    }
                });

        this.btnIdioma = this.add.image(1820,200, 'btnIdioma').setScale(0.15);
        this.btnIdioma.setInteractive()
        this.btnIdioma.on('pointerdown', () =>this.seleccionDeIdioma());
                 
            /////// full screen///
        const   pantalla = this.add.image(1820,300, 'bTnExpandir').setScale(0.15);
        pantalla.setInteractive()
        pantalla.on('pointerdown', () => this.scale.startFullscreen() );
        
        // this.txtrotar=this.add.text(300,645, 'rote la pantalla', {
        //     font: "150px Arial",
        //     align: "center",
        //     stroke: "#de77ae",
        //     strokeThickness: 10
        // });
   
       
        this.Toca = this.add.image(950,540, 'tocaPantalla').setVisible(true);
        this.Toca.on('pointerdown', () => {
            this.Toca.setVisible(false)   
            this.Toca.removeInteractive()         
            const temporizador = this.time.addEvent({ delay: 1000, callback: ()=>this.scale.startFullscreen(), callbackScope: this, loop:false });
            localStorage.setItem('estadoPantalla','2')        
        });
        
        if (this.ControlFullScreen=='2') {
            this.Toca.setVisible(false)   
            this.Toca.removeInteractive() 
        }
        ///este evento reinicia la escena cuando cargo
        events.on('reinicia', this.Reinicia, this)
           
     
    }

    update (){
     
            this.estadoPantalla=navigator.userAgent.match(/Android/i)?.index
            console.log(this.estadoPantalla)
            if (this.estadoPantalla==undefined) {
                //this.txtrotar.setVisible(false)
                this.Rotar.setVisible(false)
                this.Toca.setInteractive()
               
            }
        if (this.estadoPantalla==20) {
            
         if (screen.orientation.angle==180||screen.orientation.angle==0) {

              // this.txtrotar.setVisible(true)
               this.Rotar.setVisible(true)
            
         
        }
         else  if (screen.orientation.angle==-90||screen.orientation.angle==90)
         {
                //this.txtrotar.setVisible(false)
               this.Rotar.setVisible(false)
               this.Toca.setInteractive()
             
         
         }

        }

        ///// api traductora //// 
        
 //console.log(this.updatedTextInScene)
 //console.log('idioma'+this.idioma)
 if(this.wasChangedLanguage === FETCHED){
    this.wasChangedLanguage = READY;
    this.txtPlay?.setText(getPhrase(this.tradTxtJugar));
    this.txtAyuda?.setText(getPhrase(this.tradTxtAyuda));
    this.txtCreditos?.setText(getPhrase(this.tradTxtCreditos));
}
        
this.txtPlay!.x=this.BtnJugar!.x-(this.txtPlay!.width/2)
this.txtAyuda!.x=this.BtnAyuda!.x-(this.txtAyuda!.width/2)
this.txtCreditos!.x=this.BtnCreditos!.x-(this.txtCreditos!.width/2)


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
    /// traductor ////
    async getTranslations(language){
        this.wasChangedLanguage = FETCHING
        await getTranslations(language)
        this.wasChangedLanguage = FETCHED
        // si solo se tiene un menu para elegir las opciones de idiomas conviene cargar aca la misma
        // this.scene.start('play')
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
    seleccionDeIdioma(){
          //////// traduccion///
          console.log('entro')
          console.log ('idioma afuera '+this.idioma)

          if (this.idioma == 'espaniol'){   
            this.getTranslations(EN_US)
            this.idioma='ingles'
            localStorage.setItem('idioma','ingles');
            console.log('se ejecuto ing ')
           // location.reload() 
       
          }

          else if (this.idioma=='ingles'){
            this.getTranslations(PT_BR)
            this.idioma='brasilero'
            localStorage.setItem('idioma','brasilero');   
          //  location.reload()  
            console.log('se ejecuto br ')
          
          }
          
          else if (this.idioma=='brasilero'){
            this.getTranslations(DE_DE)
            this.idioma ='aleman'
            localStorage.setItem('idioma','aleman');    
           // location.reload() 
            console.log('se ejecuto alem ')
      
          }

          else if (this.idioma =='aleman'){
            this.getTranslations(ES_AR)
            this.idioma ='espaniol' 
            localStorage.setItem('idioma','espaniol');          
            //location.reload()  
           console.log('se ejecuto esp ')
          }

         
    }
    Reinicia(){
        location.reload() 
    }

    

   

}

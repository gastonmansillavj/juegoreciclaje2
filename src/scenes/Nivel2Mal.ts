import Phaser from 'phaser'
import controlDePersonaje from './controlDePersonaje' // importo la clase control de personaje
import controlDeBasura from './controlDeBasura' // importo la clase control de basura
import ControlCinta from './ControlCinta'
import Ui from './Ui'
import { sharedInstance as events } from './EventListener'

export default class Nivel2 extends Phaser.Scene

{
    private topeCinta?:any
    private Player? : controlDePersonaje  /// porque este signo ? o este !
    private hitBox? : any
    private basura:any
    private playerAnim:any
    private tachoVerde:any
    private TiempoJuego = 0;
    private temporizador:any
    private TxtTiempo?:Ui
    private objBasura?:any
    private objetosDelMapa?:any 
    private map2?:any
    private spawnBasuraX?:any
    private spawnBasuraY?:any
    private tiempoSpawnBaura:number=0
    private tachos?:Phaser.Physics.Matter.Sprite
    private Basura?:Phaser.Physics.Matter.Sprite

    /////// puntos tachos ///// 
    private txtTachoVerde?: any
    private txtTachoRojo?: any
    private txtTachoAzul?: any
    private txtTachoAmarillo?: any
    private ptsTachoVerde=0
    private ptsTachoRojo=0
    private ptsTachoAzul=0
    private ptsTachoAmarillo=0
    private estadoJuego:string='Jugar'

   

	constructor()
	{
		super('Nivel2')
              
	}

	preload()
    {
        this.load.image('tiles2', 'imagenes/fondo.png');
        this.load.tilemapTiledJSON('tilemap2','imagenes/Nivel2.json')

        this.load.image('PlayerHitBox', 'imagenes/sprites/PlayerHitBox.png');
        this.load.spritesheet('basura','imagenes/sprites/basura.png',{  frameWidth : 128 ,  frameHeight : 128  })
        this.load.image('botella','imagenes/sprites/BotellaAzul.png')
        this.load.image('papelBollo','imagenes/sprites/papelBollo.png')
        this.load.image('lataAzul','imagenes/sprites/lataAzul.png')
        this.load.atlas('animPlayer','imagenes/sprites/animacionPersonaje/animacionesPersonajes.png','imagenes/sprites/animacionPersonaje/animacionesPersonajes.json')
        this.load.image('tachoVerde', 'imagenes/sprites/cestoVerde.png');
        this.load.image('tachoAmarillo', 'imagenes/sprites/cestoAmarillo.png');
        this.load.image('tachoRojo', 'imagenes/sprites/cestoRojo.png');
        this.load.image('tachoAzul', 'imagenes/sprites/cestoAzul.png');
        this.load.audio('musicaMenu', 'musica/musicaFondo.mp3');
        this.load.image('cinta', 'imagenes/sprites/cinta.png');
        
      
        

    }

   create()
    {   /////// variables al iniciar la escena //////
        this.estadoJuego='Jugar'
        this.ptsTachoVerde=0
        this.ptsTachoRojo=0
        this.ptsTachoAzul=0
        this.ptsTachoAmarillo=0
        this.TiempoJuego = 0

       

        /////// sonidos///
       //let musicaFondo=this.sound.add('musicaMenu').play()
        
        ////////// mapa///////
        
        this.map2= this.make.tilemap({key:'tilemap2'}) /// tiene que estar seleccionada en tiled la opcion empotrar en mapa y ponerle nombre.
        const tileset2=this.map2.addTilesetImage('fondo','tiles2')/// mapa 1 se llama el nombre del conjunto de patrones en tiled
        const fondo = this.map2.createLayer('background', tileset2) //background es el nombre de la capa en tiled
        
        //fondo.setY(-1024)// el fondo quedaba muy abajo por eso hice esto 

        ////////////////////////////////////////////////////////
        this.objetosDelMapa = this.map2.getObjectLayer('objetos');
        this.objetosDelMapa.objects.forEach(objData =>{
            const {x=0,y=0,name} = objData
            switch (name)
            {
                case 'spawnPersonaje':
                    
                {  
                    this.hitBox = this.matter.add.sprite(x,y,'PlayerHitBox',this.playerAnim)
                    .setFixedRotation() 
                    this.playerAnim=this.add.sprite(x,y,'animPlayer')
                    .setScale(1.5)
              
                    this.Player = new controlDePersonaje (this,this.hitBox,this.playerAnim)
               
                  this.cameras.main.startFollow(this.hitBox)
                  this.cameras.main.setZoom(1.3)
                  this.cameras.main.setBounds(0, 0, 1920, 1920)

                    break                 
     
                }

                case 'spawnBasura':
                    
                {
                    this.spawnBasuraX=x
                    this.spawnBasuraY=y+20
                 
                   break                 
                }

                case 'cinta':
                    
                    {
                        this.add.sprite(x+310,y+70,'cinta')
                        .setScale(1.5,0.7)
                     
                       break                 
                    }

                case 'tachoVerde':
                    
                {
                    const tacho = this.matter.add.sprite(x, y, 'tachoVerde', undefined, {
                    isStatic: true,
                    isSensor: true

                })
                .setScale(0.3)
                .setData('tipo','tachoVerde')
                .setData('colisionando',false)

                        break                 
                }

                case 'tachoAzul':
                
                    {
                        const tacho = this.matter.add.sprite(x, y, 'tachoAzul', undefined, {
                        isStatic: true,
                        isSensor: true

                    })
                    .setScale(0.3)
                    .setData('tipo','tachoAzul')
                    .setData('colisionando',false)
                    this.add.sprite(x,y,'papelBollo').setScale(0.5)

                   

                            break                 
            
                    }

                case 'tachoAmarillo':
            
                    {
                        const tacho = this.matter.add.sprite(x, y, 'tachoAmarillo', undefined, {
                        isStatic: true,
                        isSensor: true

                    })
                    .setScale(0.3)
                    .setData('tipo','tachoAmarillo')
                    .setData('colisionando',false)
                            break                 
            
                    }


                case 'tachoRojo':
        
                    {
                  
                       this.tachos = this.matter.add.sprite(x, y,'tachoRojo', undefined, {
                        isStatic: true,
                        isSensor: true
                    })
                   .setScale(0.3)
                   .setData('tipo','tachoRojo')
                   .setData('colisionando',false)
                   this.add.sprite(x,y,'lataAzul').setScale(0.5)
                   
                    
                   
                    break                 
            
                    }

                    case 'finCinta':
            
                    {
                        const finCinta = this.matter.add.sprite(x, y, 'tachoAmarillo', undefined, {
                        isStatic: true,
                        isSensor: true

                    })
                  
                    .setScale(0.3)
                    .setData('tipo','finCinta')
                  
                    this.topeCinta= new ControlCinta (finCinta)
                    
                            break                 
            
                    }
              
            }
            
        
        })
           
     
        ///////////// player //////////
    const pointer = this.input.activePointer;

    this.input.on('pointerdown', ()=>{

     //   console.log ( "x="+pointer.x + "y="+pointer.y)
       this.Player?.setX(pointer.worldX)
       this.Player?.setY(pointer.worldY)
       this.Player?.setCaminarX (true)
       this.Player?.setCaminarY (true)

   
      });
      /////// temporizador ////////

      this.temporizador = this.time.addEvent({ delay: 1000, callback: this.cadaSegundo , callbackScope: this, loop: true });
      
      this.TxtTiempo= new Ui ()

 
        /////////////////////tiempo ///////////////////////////////
        this.tiempoSpawnBaura = this.TiempoJuego + 3



        //////////// tachos ////////// 

        this.txtTachoVerde=this.add.text(100,900, 'Verde: ', {
            font: "50px Arial",
            align: "center",
            stroke: "#de77ae",
            strokeThickness: 10
        });


        this.txtTachoAmarillo=this.add.text(400,900, 'Amarillo: ', {
            font: "50px Arial",
            align: "center",
            stroke: "#de77ae",
            strokeThickness: 10
        });

        this.txtTachoRojo=this.add.text(650,900, 'Rojo: ', {
            font: "50px Arial",
            align: "center",
            stroke: "#de77ae",
            strokeThickness: 10
        });

        this.txtTachoAzul=this.add.text(950,900, 'Azul:', {
            font: "50px Arial",
            align: "center",
            stroke: "#de77ae",
            strokeThickness: 10
        });

          ///////// scena ///////

            
          if (!this.scene.launch('Ui')){
            this.scene.launch('Ui')
         }


            //////////// events listener ///////// 
            events.removeAllListeners();
            events.on('PlasticoReciclado', ()=> this.sumaPuntos('PlasticoReciclado'), this)
            events.on('MetalReciclado',()=> this.sumaPuntos('MetalReciclado'), this)
            events.on('PapelReciclado', ()=> this.sumaPuntos('PapelReciclado'), this)
            events.on('Pierde', this.Pierde, this)
            
           

    }

    update ()
    
    {
        console.log ('nivel2')
       
     
        ////// textos tachos ////// 
        this.txtTachoAmarillo.text = 'Pts: '+ this.ptsTachoAmarillo
        this.txtTachoRojo.text = 'Pts: '+ this.ptsTachoRojo
        this.txtTachoAzul.text = 'Pts: '+ this.ptsTachoAzul
        this.txtTachoVerde.text = 'Pts: '+ this.ptsTachoVerde




      
 ///////////////////////////////////////////////////////////////////////////////

            ////////// texto de tiempo/////////
      // this.TxtTiempo.text= "tiempo : " + this.TiempoJuego
        
        if (this.estadoJuego=='Jugar') {

             this.Player?.moverPersonaje ()
                                        // llama al metodo mover persoanje de la clase player
        
        if (this.tiempoSpawnBaura < this.TiempoJuego){
            
            const numero=Phaser.Math.Between(1,3)
            
            if (numero==1) {
               
                this.creaBasura('papel','papelBollo')
                          
            }
            else if  (numero==2) {

                this.creaBasura('plastico','basura')

             }

             else  {

                this.creaBasura( 'metal','lataAzul')

               
             }

           this.tiempoSpawnBaura=this.tiempoSpawnBaura+5
           

        }
        
        if (this.ptsTachoAmarillo>=100||this.ptsTachoRojo>=100||this.ptsTachoVerde>=100||this.ptsTachoAzul>=100) {

            console.log('gana2',this.ptsTachoAmarillo,this.ptsTachoAzul,this.ptsTachoRojo,this.ptsTachoVerde)
            this.estadoJuego='Gana'
            
            
        }

        }

        else if (this.estadoJuego=='Gana') {

            this.terminaJuego()                          
            this.scene.start('Gana')

        }

        else if (this.estadoJuego=='Pierde') {
            
            this.terminaJuego()                 
            this.scene.start('Pierde')

        }

      

    }

    cadaSegundo(){

        this.TiempoJuego = this.TiempoJuego + 1
       
        

    }

    creaBasura (tipo,sprite){
        const tipoBasura = tipo
        this.objBasura = new controlDeBasura(this,this.matter.add.sprite(this.spawnBasuraX, this.spawnBasuraY, sprite, undefined, {
            isSensor: true       
        }),tipo)
    }


    sumaPuntos (evento) {
       
        console.log(evento)
        switch (evento) {
           
            case 'PlasticoReciclado':

                this.ptsTachoVerde = this.ptsTachoVerde + 50
       
                break;

            case 'MetalReciclado':

                this.ptsTachoRojo=this.ptsTachoRojo+50
        
                break;
            case 'PapelReciclado':

                this.ptsTachoAzul =this.ptsTachoAzul+50
        
                break;

          
    
        }

        //this.ptsTachoAzul =this.ptsTachoAzul+50
        
    }

    Pierde (){

        this.estadoJuego='Pierde'

    }

    terminaJuego (){
        
      
        this.scene.stop('Ui')
        this.scene.stop('Nivel2')
        events.emit('TerminaJuego')
      

    } 



}

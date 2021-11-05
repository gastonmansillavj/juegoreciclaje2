import Phaser from 'phaser'
import controlDePersonaje from './controlDePersonaje' // importo la clase control de personaje
import controlDeBasura from './controlDeBasura' // importo la clase control de basura
import ControlCinta from './ControlCinta'
import Ui from './Ui'
import Opciones from './opciones'
import { sharedInstance as events } from './EventListener'
import ControlDeEscenas from './ControlDeEscenas'
import cinta from './cinta'

export default class Nivel2 extends Phaser.Scene

{
   // public controladorEscena:ControlDeEscenas
    public Nivel?:any
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
    private map?:any
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

   ////// particulas //
   private particlesRecu:any
   private pointerX:any
   private pointerY:any

	constructor()
	{
		super('Nivel2')
      
       // this.controladorEscena = new ControlDeEscenas(this);
	}
   


	preload()
    {
        this.load.image('tiles', 'imagenes/fondo.png');
        this.load.image('lineasPiso', 'imagenes/sprites/lineasPiso.png');
        this.load.tilemapTiledJSON('tilemap2','imagenes/Nivel2.json')// para cambiar el mapa cambia el nombre a 2 o 3 y asi

        this.load.image('PlayerHitBox', 'imagenes/sprites/PlayerHitBox.png');
        
         ////// basura ///////
       
         this.load.image('botellaAzul','imagenes/sprites/BotellaAzul.png')
         this.load.image('botellaVerde','imagenes/sprites/BotellaVerde.png')
         this.load.image('banana','imagenes/sprites/banana.png')
         this.load.image('papelBollo','imagenes/sprites/papelBollo.png')
         this.load.image('lataAzul','imagenes/sprites/lataAzul.png')
         this.load.image('lataRoja','imagenes/sprites/lataRoja.png')
         this.load.image('lataVerde','imagenes/sprites/lataVerde.png')
         this.load.image('bolsaCarton','imagenes/sprites/bolsaCarton.png')
         this.load.image('diario','imagenes/sprites/diario.png')
         this.load.image('manzana','imagenes/sprites/manzana.png')
         this.load.image('manzanaComida','imagenes/sprites/manzanaComida.png')
         this.load.image('papel','imagenes/sprites/papel.png')
         this.load.image('pez','imagenes/sprites/pez.png')
         this.load.image('cascaraBanana','imagenes/sprites/cascaraBanana.png')
 
         /////////////////

        this.load.atlas('animPlayer','imagenes/sprites/animacionPersonaje/animacionesPersonajes.png','imagenes/sprites/animacionPersonaje/animacionesPersonajes.json')
        this.load.image('tachoVerde', 'imagenes/sprites/cestoVerde.png');
        this.load.image('tachoAmarillo', 'imagenes/sprites/cestoAmarillo.png');
        this.load.image('tachoRojo', 'imagenes/sprites/cestoRojo.png');
        this.load.image('tachoAzul', 'imagenes/sprites/cestoAzul.png');
        this.load.audio('musicaMenu', 'musica/musicaFondo.mp3');
        this.load.image('cinta', 'imagenes/sprites/cinta.png');

         ///// cinta ///// 
         this.load.spritesheet('cinta2', 'imagenes/sprites/cinta2.png', { frameWidth: 1000, frameHeight:240 });///cinta
       
        
        /// camion
        this.load.image('camion', 'imagenes/sprites/camion.png');
        this.load.image('tubo', 'imagenes/sprites/tubodondesalebasura.png');
        ///caja
        this.load.image('caja', 'imagenes/sprites/caja.png'); 

         /// fondo n2
         this.load.image('fondoN2', 'imagenes/sprites/fondo_NIVEL2.png')

         ///////// particulas //////
        this.load.image('partReciclaje', 'imagenes/sprites/reciclaje.png')
         
         
         /////// precarga ///// 
         const FondoN2=this.add.image(960,540, 'fondoN2').setScale(1.2);
         const TxtCargando=this.add.text(800,450, 'Cargando', {
            font: "100px Arial",
            align: "center",
            stroke: "#de77ae",
            strokeThickness: 30
        });
        this.tweens.add({
            targets: FondoN2,
           // alpha: { from: 0, to: 1 },
           x:{ from: 800, to: 1100 },
           y:{ from:440, to: 650 },
            //ease: 'Cubic',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 20000,
            repeat: -1,            // -1: infinity
            yoyo: true
        });

         this.load.on('progress', function (value) {
           FondoN2
           TxtCargando
           console.log(value)
             
         });
         
         this.load.on('fileprogress', function (file) {
             console.log(file)
         });
         this.load.on('complete', function () {
             console.log('termino')
             FondoN2.destroy()
             TxtCargando.destroy()
            
         });
      
        

    }

   create()
    {   
        
        /////// variables al iniciar la escena //////
        
        this.estadoJuego='Jugar'
        this.ptsTachoVerde=0
        this.ptsTachoRojo=0
        this.ptsTachoAzul=0
        this.ptsTachoAmarillo=0
        this.TiempoJuego = 0
     

       

        /////// sonidos///
       //let musicaFondo=this.sound.add('musicaMenu').play()
        
        ////////// mapa///////
        
        this.map= this.make.tilemap({key:'tilemap2'}) /// tiene que estar seleccionada en tiled la opcion empotrar en mapa y ponerle nombre.     
        const tileset=this.map.addTilesetImage('fondo','tiles')/// mapa 1 se llama el nombre del conjunto de patrones en tiled
        const fondo2 = this.map.createLayer('background', tileset) //background es el nombre de la capa en tiled
        
        const lineas=this.map.addTilesetImage('lineasPiso','lineasPiso')
        const lineasPiso = this.map.createLayer('lineas', lineas)
        
        // parede //////

      //  const pared=this.map.addTilesetImage('fondo','tiles')
        //const Paredes = this.map.createLayer('pared', pared)
       // Paredes.setCollisionByProperty({collide:true})
       // const lineas=this.map.addTilesetImage('lineasPiso','lineasPiso')
       // const lineasPiso = this.map.createLayer('lineas', lineas)
        //fondo.setY(-1024)// el fondo quedaba muy abajo por eso hice esto 
       // this.matter.world.convertTilemapLayer(Paredes)
        ////////////////////////////////////////////////////////
        this.objetosDelMapa = this.map.getObjectLayer('objetos');
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
                    
                { this.matter.add.sprite(x-130,y-30,'tubo', undefined,{
                    isStatic: true
                })
                .setScale(0.5,0.5)
                .setDepth(7)
                this.spawnBasuraX=x
                this.spawnBasuraY=y+20
                   break                 
                }

                case 'cinta':
                    
                    {
                        new cinta (this,this.add.sprite(x+310,y+70,'cinta2')).playCinta()
                     
                       break                 
                    }

                case 'tachoVerde':
                    
                {
                    const tacho = this.matter.add.sprite(x, y, 'tachoVerde', undefined, {
                    //isStatic: true
                    isSensor: true

                })
                .setScale(0.3)
                .setData('tipo','tachoVerde')
                .setData('colisionando',false)

                        break                 
                }

                case 'tachoAzul':/// en realidad es amarillo
                
                    {
                        const tacho = this.matter.add.sprite(x, y, 'tachoAmarillo', undefined, {
                        //isStatic: true//,
                       isSensor: true

                    })
                    .setScale(0.3)
                    .setData('tipo','tachoAzul')
                    .setData('colisionando',false)
                   

                   

                            break                 
            
                    }

              


                case 'tachoRojo':
        
                    {
                  
                       this.tachos = this.matter.add.sprite(x, y,'tachoRojo', undefined, {
                        //isStatic: true//,
                        isSensor: true
                    })
                   .setScale(0.3)
                   .setData('tipo','tachoRojo')
                   .setData('colisionando',false)
                 
                   
                    
                   
                    break                 
            
                    }
                    case 'baseTachos':
                    
                        {
                            const Base = this.matter.add.sprite(x, y, 'tachoVerde', undefined, {
                           isStatic: true
                            //isSensor: true
                        
        
                        })
                        .setScale(0.27)
                        .setVisible(false)
                       // .setData('tipo','tachoVerde')
                       // .setData('colisionando',false)
        
                                break                 
                        }

                    
                case 'cajas':
        
                    {
                  
                       this.tachos = this.matter.add.sprite(x, y,'caja', undefined, {
                        isStatic: true//,
                      //  isSensor: true
                    })
                   .setScale(0.3)
                   //.setData('tipo','tachoRojo')
                  // .setData('colisionando',false)
                
                    
                   
                    break                 
            
                    }



                    case 'finCinta':
            
                    {
                        const finCinta = this.matter.add.sprite(x, y, 'camion', undefined, {
                            isStatic: true//,
                            //isSensor: true
    
                        })
                      
                        .setScale(0.7)
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
        this.pointerX=pointer.worldX
        this.pointerY=pointer.worldY
         this.Player?.setX( this.pointerX)
         this.Player?.setY(this.pointerY)
         this.Player?.setCaminarX (true)
         this.Player?.setCaminarY (true)
  
     
        });
      /////// temporizador ////////

      this.temporizador = this.time.addEvent({ delay: 1000, callback: this.cadaSegundo , callbackScope: this, loop: true });
      
      this.TxtTiempo= new Ui (this)

 
        /////////////////////tiempo ///////////////////////////////
        this.tiempoSpawnBaura = this.TiempoJuego + 3



        //////////// tachos ////////// 
/*
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
*/
          ///////// scena ///////

            
          if (!this.scene.launch('Ui')){
            this.scene.launch('Ui')
         }

        
            //////////// events listener ///////// 
           events.removeAllListeners();
           events.on('PlasticoReciclado', this.sumaPuntos, this)
           events.on('MetalReciclado',this.sumaPuntos, this)
           events.on('PapelReciclado', this.sumaPuntos, this)

           events.on('Pierde', this.Pierde, this)
           

           
    /////// particulas /// 
    this.particlesRecu = this.add.particles('partReciclaje').setDepth(9)
    
    }

    update ()
    
    {
          
        events.emit('Nivel2')
 
        ////// textos tachos ////// 
     /*   this.txtTachoAmarillo.text = 'Pts: '+ this.ptsTachoAmarillo
        this.txtTachoRojo.text = 'Pts: '+ this.ptsTachoRojo
        this.txtTachoAzul.text = 'Pts: '+ this.ptsTachoAzul
        this.txtTachoVerde.text = 'Pts: '+ this.ptsTachoVerde
*/
        
       

 
      
 ///////////////////////////////////////////////////////////////////////////////

            ////////// texto de tiempo/////////
      // this.TxtTiempo.text= "tiempo : " + this.TiempoJuego
        
        if (this.estadoJuego=='Jugar') {

             this.Player?.moverPersonaje ()
                                        // llama al metodo mover persoanje de la clase player
            if (this.tiempoSpawnBaura < this.TiempoJuego){

                const numero=Phaser.Math.Between(0,2)
                
                if (numero==1) {
                    const numero=Phaser.Math.Between(0,4)
                    if(numero==0) {
                        this.creaBasura('papel','banana')
                    }
                    else if(numero==1) {
                        this.creaBasura('papel','manzana')
                    }
                    else if(numero==2) {
                        this.creaBasura('papel','cascaraBanana')
                    }

                    else if(numero==3) {
                        this.creaBasura('papel','pez')
                    }

                    else {
                        this.creaBasura('papel','manzanaComida')
                    }
                        // no recuperable
                                
                }
                else if  (numero==2) {
                    
                    const numero=Phaser.Math.Between(0,4)
                
                    if (numero==0) {

                    this.creaBasura('plastico','botellaVerde')/// plastico
                    
                    }
                    else if (numero==1) {

                        this.creaBasura('plastico','botellaAzul')/// plastico
                        
                    }
                    else if (numero==2) {

                        this.creaBasura('plastico','lataAzul')/// plastico
                            
                    }
                    else if (numero==3) {

                        this.creaBasura('plastico','lataRoja')/// plastico
                            
                    }

                    else {

                        this.creaBasura('plastico','lataVerde')/// plastico
                            
                    }


                    }

                    else  {

                    const numero=Phaser.Math.Between(0,3)
                
                    if (numero==0) {

                        this.creaBasura( 'metal','papelBollo') /// papel
                    
                    }
                    else if (numero==1) {

                        this.creaBasura( 'metal','papel') /// papel
                    
                    }
                    else if (numero==2) {

                        this.creaBasura( 'metal','diario') /// papel
                    
                    }
                    else  {

                        this.creaBasura( 'metal','bolsaCarton') /// papel
                    
                    }
                    
                    

                    
                    }

                this.tiempoSpawnBaura=this.tiempoSpawnBaura+5
                

            }
                                        
        if (this.ptsTachoAmarillo>=150||this.ptsTachoRojo>=150||this.ptsTachoVerde>=150||this.ptsTachoAzul>=150) {

            console.log('gana1',this.ptsTachoAmarillo,this.ptsTachoAzul,this.ptsTachoRojo,this.ptsTachoVerde)
            this.estadoJuego='Gana'

        }

        }

        else if (this.estadoJuego=='Gana') {

            this.terminaJuego()  
           // this.controladorEscena.SiguienteNivel('Nivel2')
            this.SetLocal('2')
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

    sumaPuntos () {
        console.log('esta sumando')
         this.ptsTachoVerde = this.ptsTachoVerde + 50
 
 
          ///// pruba particulas /////
          const emitter = this.particlesRecu.createEmitter
          ({
             // lifespan :100 //,
             // quantity: 1,
              //maxParticles:10
              x:-200,
             y:-200,  
              angle: { min: 0, max: 360 },
              scale:{ start:0.1, end:0.3},      
          });
         
          emitter.setSpeed(100)
         // emitter.setBlendMode(Phaser.BlendModes.ADD)
          emitter.emitParticleAt(this.pointerX,this.pointerY,8)
  
      }

    Pierde (){

        this.estadoJuego='Pierde'

    }

    terminaJuego (){
        
      
        this.scene.stop('Ui')
        this.scene.stop('Nivel1')
       
        events.emit('TerminaJuego')
        
    } 


public set _controladorEscena(v : ControlDeEscenas) {
 //   this.controladorEscena = v;
}


            /// local storage ///
            SetLocal(escena:string){
              
                localStorage.setItem('NivelDesbolqueado',escena);
            };


}

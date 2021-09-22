import Phaser from 'phaser'
import controlDePersonaje from './controlDePersonaje' // importo la clase control de personaje
import controlDeBasura from './controlDeBasura' // importo la clase control de basura

export default class Nivel1 extends Phaser.Scene

{
    
    private Player? : controlDePersonaje  /// porque este signo ? o este !
    private hitBox? : any
    private basura:any
    private playerAnim:any
    private tachoVerde:any
    private TiempoJuego = 0;
    private temporizador:any
    private TxtTiempo:any
    private objBasura?:any
    private objetosDelMapa?:any 
    private map?:any
    private spawnBasuraX?:any
    private spawnBasuraY?:any
    private tiempoSpawnBaura?:number
    private tachos?:Phaser.Physics.Matter.Sprite

    private Basura?:Phaser.Physics.Matter.Sprite
   

	constructor()
	{
		super('Nivel1')
        
	}

	preload()
    {
        this.load.image('tiles', 'imagenes/fondo.png');
        console.log(this.load.tilemapTiledJSON('tilemap','imagenes/nivel1.json'))
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
    {
       

        /////// sonidos///
       let musicaFondo=this.sound.add('musicaMenu').play()
        
        ////////// mapa///////
        
        this.map= this.make.tilemap({key:'tilemap'}) /// tiene que estar seleccionada en tiled la opcion empotrar en mapa y ponerle nombre.
        const tileset=this.map.addTilesetImage('mapa1','tiles')/// mapa 1 se llama el nombre del conjunto de patrones en tiled
        const fondo = this.map.createLayer('background', tileset) //background es el nombre de la capa en tiled
        
        fondo.setY(-1024)// el fondo quedaba muy abajo por eso hice esto 

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
                        this.matter.add.sprite(x+210,y+70,'cinta', undefined, {
                            isStatic: true,
                            isSensor: true
        
                        })
                        .setScale(1.1,0.7)
                     
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
              
            }
            
        
        })

     
        ///////////// player //////////
    const pointer = this.input.activePointer;

    this.input.on('pointerdown', ()=>{

       this.Player?.setX(pointer.x)
       this.Player?.setY(pointer.y)
       this.Player?.setCaminarX (true)
       this.Player?.setCaminarY (true)

   
      });
      /////// temporizador ////////

      this.temporizador = this.time.addEvent({ delay: 1000, callback: this.cadaSegundo , callbackScope: this, loop: true });
      
        this.TxtTiempo=this.add.text(850,20, 'Tiempo: ', {
        font: "50px Arial",
        align: "center",
        stroke: "#de77ae",
        strokeThickness: 10
    });



       //////////////////////// boton de menu //////////////////

        const Volver = this.add.image(1820,50, 'btnPlay').setScale(0.5);
            Volver.setInteractive()
            Volver.on('pointerdown', () => this.scene.start('Opciones') );

            const TxtReiniciar=this.add.text(1750,20, 'Menu ', {
                font: "50px Arial",
                align: "center",
                stroke: "#de77ae",
                strokeThickness: 10
            });
        /////////////////////tiempo ///////////////////////////////
        this.tiempoSpawnBaura = this.TiempoJuego + 3


    }

    update ()
    
    {
      
        

      

            ////////// texto de tiempo/////////
        this.TxtTiempo.text= "tiempo : " + this.TiempoJuego
        
        
        this.Player?.moverPersonaje ()
                                        // llama al metodo mover persoanje de la clase player
        
        if (this.tiempoSpawnBaura==this.TiempoJuego){
            const numero=Phaser.Math.Between(1,3)
            if (numero==1) {
                const tipoBasura = 'papel'
                this.objBasura = new controlDeBasura(this,this.matter.add.sprite(this.spawnBasuraX, this.spawnBasuraY, 'papelBollo', undefined, {
                    isSensor: true       
                }),tipoBasura)
                
            }
            else if  (numero==2) {

                const tipoBasura = 'plastico'
                this.objBasura = new controlDeBasura(this,this.matter.add.sprite(this.spawnBasuraX, this.spawnBasuraY, 'basura', undefined, {
                    isSensor: true       
                }),tipoBasura)
             }

             else  {

                const tipoBasura = 'metal'
                this.objBasura = new controlDeBasura(this,this.matter.add.sprite(this.spawnBasuraX, this.spawnBasuraY, 'lataAzul', undefined, {
                    isSensor: true       
                }),tipoBasura)
             }

           this.tiempoSpawnBaura=this.tiempoSpawnBaura+5
           

        }
        
     
        
        

        

    }

    cadaSegundo(){

        this.TiempoJuego = this.TiempoJuego + 1

    }



}

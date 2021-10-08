import Phaser from 'phaser'


export default class controlDeBasura extends Phaser.Scene


{

    private Escena?:Phaser.Scene
    private Basura?:Phaser.Physics.Matter.Sprite
    private TipoBasura?:string
    private botella?:any
    private BX?:any
    private BY?:any

	constructor(escena:Phaser.Scene,basura:Phaser.Physics.Matter.Sprite,tipoBasura:string)
	{
		super('controlDeBasura')

        this.Escena=escena
        this.Basura=basura
        this.TipoBasura=tipoBasura
       // this.Basura.setVelocityX(1)

        this.Basura.setFriction(0,0)
        this.Basura.setScale(0.7)
        this.Basura.setVelocityX(5)
        /////// seteo de información /////////

        this.Basura.setDataEnabled()
        this.Basura.data.set('levantado', false);
        this.Basura.data.set('tipo',tipoBasura);
        this.Basura.setData('colisionando',false);
        

        this.Basura.data.set('seleccionado',false)// si esta seleccionado 
        
        
      
       

	}

    



}



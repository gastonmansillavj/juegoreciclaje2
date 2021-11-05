import Phaser from 'phaser'


export default class cinta //extends Phaser.Scene


{

    private Escena?:Phaser.Scene
    private cinta?:any

	constructor(escena:Phaser.Scene,cinta:any)
	{
	

        this.Escena=escena
        this.cinta=cinta
      

        ///// anim cinta//// 
        this.cinta?.setScale(1.5,0.7)
        this.cinta?.anims.create({
            key: 'caminar',
            frames: this.cinta?.anims.generateFrameNumbers('cinta2', { start:0, end: 1 }),
            frameRate: 2,
            repeat: -1
        });
       



	}

    public playCinta(){
        this.cinta.play('caminar')
    }


    
   


}



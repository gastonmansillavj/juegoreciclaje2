import Phaser from 'phaser'
import { sharedInstance as events } from './EventListener'
export default class ControlCinta 

{
    private FinCinta?: any

    constructor ( fincinta:any ){

    this.FinCinta= fincinta

    this.FinCinta.setOnCollide((data: MatterJS.ICollisionPair) => {

        const bodyA = data.bodyB as MatterJS.BodyType
        const gameObjectA = bodyA.gameObject
        const spriteA = gameObjectA as Phaser.Physics.Matter.Sprite 
        const typeB=spriteA.getData('tipo')
        const estado=spriteA.getData('levantado')
        if ( (typeB =='papel'||typeB == 'plastico'||typeB == 'metal')&&(estado==false)){
        events.emit('BasuraDestruida')
        spriteA.destroy()
        console.log("destruye basura " )

        }
        

      })

    }
		
   

    
}

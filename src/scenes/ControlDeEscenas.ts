 
import { sharedInstance as events } from './EventListener'
export default class ControlDeEscenas {

 //private _Scena:Array <any>
 private _EscenaActual:any
 private _EscenasTotales: Array = ['Nivel1']
 private _EscenaEncontrada:any


 constructor() {

     //this._EscenasTotales=['Nivel1']
     
     //this._Scena=new Array <any> ();
     //this._Scena.push(escena)

 }




   

       private SiguienteNivel (NuevaEscena:string){
           
            if (this._EscenasTotales.every ( element => element != NuevaEscena ))

            {
                 this._EscenasTotales.push(NuevaEscena)
                 console.log('esto es el push '+ this._EscenasTotales)
            }

         // this._EscenasTotales.push(NuevaEscena)
          //console.log('esto es el push '+ this._EscenasTotales)
        }



 public compruebaNiveles(Nivel:string) {
     console.log (this._EscenasTotales)
    this._EscenasTotales.forEach ( function(element) 
  
        {
        
            if (element===Nivel) {
                console.log(` se encontro el nivel ${Nivel}`)
                events.emit(Nivel)
                
            }
            else {
                console.log(`no se encontro el nivel ${Nivel}`)
            }
        }

    })


 

    

     
     
 }

/*
 public CargarEscena(EscenaActual:number) {

    this._EscenaActual=EscenaActual
    
    this.llamarEscena()
 }
 private llamarEscena(){
   // console.log(this._Scena.length)
   ///console.log (this._Scena[this._EscenaActual].scene.key)
    // console.log (this._Scena[this._EscenaActual])
    
    this._Scena[this._EscenaActual].scene.start(this._Scena[this._EscenaActual].scene.key)
 }
 */


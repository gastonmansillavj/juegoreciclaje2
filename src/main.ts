import Phaser from 'phaser'

////api ////
import 'regenerator-runtime/runtime'
//////////

import Menu from './scenes/menu'
import Ui from './scenes/Ui'
import Nivel1 from './scenes/Nivel1'
import Nivel2 from './scenes/Nivel2'
import Nivel3 from './scenes/Nivel3'
import Nivel4 from './scenes/Nivel4'
import Nivel5 from './scenes/Nivel5'
import Niveles from './scenes/niveles'
import Ayuda from './scenes/ayuda'
import Opciones from './scenes/opciones'
import Creditos from './scenes/creditos'
import ControlCinta from './scenes/ControlCinta'
import Gana from './scenes/Gana'
import Pierde from './scenes/Pierde'



const config: Phaser.Types.Core.GameConfig = {
	scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH, //centramos el juego a la mitad de la ventana del navegador.
        width:1920, //1920///ancho de la pantalla.
        height:1080, //1080///alto de la pantalla.
      },
    physics: {
        default: 'matter',
        matter: {
            gravity: { y: 0 },
            debug: false
        }
    },
	scene: [Menu,Nivel1,Nivel2,Nivel3,Nivel4,Nivel5,Niveles,Ayuda,Opciones,Creditos,Ui,Pierde,Gana]
}

export default new Phaser.Game(config)

localStorage.setItem('NivelDesbolqueado', "2");
localStorage.setItem('musica', "1");
localStorage.getItem('idioma')||'espaniol';
localStorage.setItem('estadoPantalla','0');

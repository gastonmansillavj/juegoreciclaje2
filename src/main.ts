import Phaser from 'phaser'

import Menu from './scenes/menu'
import Ui from './scenes/Ui'
import Nivel1 from './scenes/Nivel1'
import Nivel2 from './scenes/Nivel2'
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
            debug: true
        }
    },
	scene: [Menu,Nivel1,Nivel2,Niveles,Ayuda,Opciones,Creditos,Ui,Gana,Pierde]
}

export default new Phaser.Game(config)

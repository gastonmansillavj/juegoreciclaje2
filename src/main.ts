import Phaser from 'phaser'

import Menu from './scenes/menu'
import Nivel1 from './scenes/nivel1'
import Niveles from './scenes/niveles'
import Ayuda from './scenes/ayuda'
import Opciones from './scenes/opciones'
import Creditos from './scenes/creditos'

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
	scene: [Menu,Nivel1,Niveles,Ayuda,Opciones,Creditos]
}

export default new Phaser.Game(config)

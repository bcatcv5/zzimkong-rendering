import * as THREE from 'three';

import { UIPanel, UIText } from './libs/ui.js';
import { UIBoolean } from './libs/ui.three.js';

function MenubarRight( editor ) {

	const strings = editor.strings;

	const container = new UIPanel();
	container.setClass( 'menu right' );

	//full screen view
	const view = new UIPanel();
	view.setClass( 'title' );
	view.setTextContent( strings.getKey( 'menubar/view' ) );
	view.onClick( function () {

		if ( document.fullscreenElement === null ) {

			document.documentElement.requestFullscreen();

		} else if ( document.exitFullscreen ) {

			document.exitFullscreen();

		}

		// Safari

		if ( document.webkitFullscreenElement === null ) {

			document.documentElement.webkitRequestFullscreen();

		} else if ( document.webkitExitFullscreen ) {

			document.webkitExitFullscreen();

		}

	});
	
	container.add( view );

	//autosave
	const autosave = new UIBoolean( editor.config.getKey( 'autosave' ), strings.getKey( 'menubar/status/autosave' ) );
	autosave.text.setColor( '#cccccc' );
	autosave.onChange( function () {

		const value = this.getValue();

		editor.config.setKey( 'autosave', value );

		if ( value === true ) {

			editor.signals.sceneGraphChanged.dispatch();

		}

	} );
	container.add( autosave );

	editor.signals.savingStarted.add( function () {

		autosave.text.setTextDecoration( 'underline' );

	} );

	editor.signals.savingFinished.add( function () {

		autosave.text.setTextDecoration( 'none' );

	} );

	//version
	const version = new UIText( 'ver.' + THREE.REVISION );
	version.setClass( 'version' );
	container.add( version );

	return container;

}

export { MenubarRight };

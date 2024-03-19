import { UIPanel, UIBreak, UIText } from './libs/ui.js';

function ViewportInfo( editor ) {

	const signals = editor.signals;
	const strings = editor.strings;

	const container = new UIPanel();
	container.setId( 'info' );
	container.setPosition( 'absolute' );
	container.setLeft( '15px' );
	container.setTop( '15px' );
	container.setFontSize( '15px' );
	container.setColor( '#CFCFCF' );

	const objectsText  = new UIText( '0' ).setTextAlign( 'right' ).setWidth( '60px' ).setMarginRight( '6px' );
	const frametimeText = new UIText( '0' ).setTextAlign( 'right' ).setWidth( '60px' ).setMarginRight( '6px' );

	container.add( objectsText, new UIText( strings.getKey( 'viewport/info/objects' ) ), new UIBreak() );

	signals.objectAdded.add( update );
	signals.objectRemoved.add( update );
	//signals.geometryChanged.add( update );
	signals.sceneRendered.add( updateFrametime );


	function update() {

		const scene = editor.scene;

		let objects = 0, vertices = 0, triangles = 0;

		for ( let i = 0, l = scene.children.length-1; i < l; i ++ ) {

			const object = scene.children[ i ];

			object.traverseVisible( function ( object ) {

				objects ++;
		} 
			);

		}

		objectsText.setValue( objects.format() );
	}

	function updateFrametime( frametime ) {

		frametimeText.setValue( Number( frametime ).toFixed( 2 ) );

	}

	return container;

}

export { ViewportInfo };

import { UIPanel, UISelect } from './libs/ui.js';
import { UIBoolean } from './libs/ui.three.js';

function ViewportControls( editor ) {

	const signals = editor.signals;
	const strings = editor.strings;

	const container = new UIPanel();
	container.setPosition( 'absolute' );
	container.setRight( '10px' );
	container.setTop( '10px' );
	container.setColor( '#CFCFCF' );

	// grid

	const gridCheckbox = new UIBoolean( true, strings.getKey( 'viewport/controls/grid' ) );
	gridCheckbox.onChange( function () {

		signals.showGridChanged.dispatch( this.getValue() );

	} );
	container.add( gridCheckbox );

	// helpers

	const helpersCheckbox = new UIBoolean( true, strings.getKey( 'viewport/controls/helpers' ) );
	helpersCheckbox.onChange( function () {

		signals.showHelpersChanged.dispatch( this.getValue() );

	} );
	container.add( helpersCheckbox );

	return container;

}

export { ViewportControls };

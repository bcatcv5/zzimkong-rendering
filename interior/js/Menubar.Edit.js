//import { Box3, Vector3 } from 'three';

import { UIPanel, UIRow, UIHorizontalRule } from './libs/ui.js';

import { AddObjectCommand } from './commands/AddObjectCommand.js';
import { RemoveObjectCommand } from './commands/RemoveObjectCommand.js';
import { clone } from '../../examples/jsm/utils/SkeletonUtils.js';

function MenubarEdit( editor ) {

	const strings = editor.strings;

	const container = new UIPanel();
	container.setClass( 'menu' );

	const title = new UIPanel();
	title.setClass( 'title' );
	title.setTextContent( strings.getKey( 'menubar/edit' ) );
	container.add( title );

	const options = new UIPanel();
	options.setClass( 'options' );
	container.add( options );

	// Undo

	const undo = new UIRow();
	undo.setClass( 'option' );
	undo.setTextContent( strings.getKey( 'menubar/edit/undo' ) );
	undo.onClick( function () {

		editor.undo();

	} );
	options.add( undo );

	// Redo

	const redo = new UIRow();
	redo.setClass( 'option' );
	redo.setTextContent( strings.getKey( 'menubar/edit/redo' ) );
	redo.onClick( function () {

		editor.redo();

	} );
	options.add( redo );

	editor.signals.historyChanged.add( function () {

		const history = editor.history;

		undo.setClass( 'option' );
		redo.setClass( 'option' );

		if ( history.undos.length == 0 ) {

			undo.setClass( 'inactive' );

		}

		if ( history.redos.length == 0 ) {

			redo.setClass( 'inactive' );

		}

	} );

	// ---

	options.add( new UIHorizontalRule() );

	let option = new UIRow();

	// Clone

	option = new UIRow();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/edit/clone' ) );
	option.onClick( function () {

		let object = editor.selected;

		if ( object === null || object.parent === null ) return; // avoid cloning the camera or scene

		object = clone( object );

		editor.execute( new AddObjectCommand( editor, object ) );

	} );
	options.add( option );

	// Delete

	option = new UIRow();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/edit/delete' ) );
	option.onClick( function () {

		const object = editor.selected;

		if ( object !== null && object.parent !== null ) {

			editor.execute( new RemoveObjectCommand( editor, object ) );

		}

	} );
	options.add( option );

	return container;

}

export { MenubarEdit };

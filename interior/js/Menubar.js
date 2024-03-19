import { UIPanel } from './libs/ui.js';

import { MenubarEdit } from './Menubar.Edit.js';
import { MenubarLeft } from './Menubar.Left.js';
import { MenubarRight } from './Menubar.Right.js';


function Menubar( editor ) {

	const container = new UIPanel();
	container.setId( 'menubar' );

	container.add( new MenubarLeft( editor ) );
	container.add( new MenubarEdit( editor ) );
	container.add( new MenubarRight( editor ) );

	return container;

}

export { Menubar };

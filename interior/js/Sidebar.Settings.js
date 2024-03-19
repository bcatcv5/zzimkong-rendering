import { UIPanel, UIRow, UISelect, UISpan, UIText } from './libs/ui.js';
import { SidebarSettingsShortcuts } from './Sidebar.Settings.Shortcuts.js';

function SidebarSettings( editor ) {

	const config = editor.config;
	const strings = editor.strings;

	const container = new UISpan();

	const settings = new UIPanel();
	settings.setBorderTop( '0' );
	settings.setPaddingTop( '0px' );
	container.add( settings );

	// language

	container.add( new SidebarSettingsShortcuts( editor ) );
	return container;

}

export { SidebarSettings };

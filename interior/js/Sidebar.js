import { UITabbedPanel, UISpan } from './libs/ui.js';

import { SidebarProject } from './Sidebar.Project.js';
import { SidebarSettings } from './Sidebar.Settings.js';

function Sidebar( editor ) {

	const container = new UITabbedPanel();
	container.setId( 'sidebar' );

	const project = new SidebarProject( editor );
	const settings = new SidebarSettings( editor );

	return container;

}

export { Sidebar };

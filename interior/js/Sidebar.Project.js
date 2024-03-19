import { UISpan } from './libs/ui.js';
import { SidebarProjectRenderer } from './Sidebar.Project.Renderer.js';

function SidebarProject( editor ) {

	const container = new UISpan();

	container.add( new SidebarProjectRenderer( editor ) );

	return container;

}

export { SidebarProject};

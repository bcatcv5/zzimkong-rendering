import { UIPanel, UIRow, UIHorizontalRule } from './libs/ui.js';

function MenubarLeft(editor) {
    const strings = editor.strings;

    const container = new UIPanel();
    container.setClass('menu');

    // New button
    const newButton = new UIPanel();
    newButton.setClass('title');
    newButton.setTextContent(strings.getKey('menubar/file/new'));
    newButton.onClick(function() {
        if (confirm('Any unsaved data will be lost. Are you sure?')) {
            editor.clear();
        }
    });
    container.add(newButton);

    // Export PLY button
    const exportPLYButton = new UIPanel();
    exportPLYButton.setClass('title');
    exportPLYButton.setTextContent(strings.getKey('menubar/file/export/ply'));
    exportPLYButton.onClick(async function() {
        const { PLYExporter } = await import('three/addons/exporters/PLYExporter.js');

        const exporter = new PLYExporter();

        exporter.parse(editor.scene, function(result) {
            editor.utils.saveArrayBuffer(result, 'model.ply');
        });
    });
    container.add(exportPLYButton);

    return container;
}

export { MenubarLeft };

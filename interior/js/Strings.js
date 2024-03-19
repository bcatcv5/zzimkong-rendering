function Strings( config ) {

	//const language = config.getKey( 'language' );

	const values = {
		'menubar/file': 'File',
		'menubar/file/new': '초기화하기',
		'menubar/file/export/ply': '내보내기',

		'menubar/edit': '편집',
		'menubar/edit/undo': '되돌리기 (ctrl/cmd+z)',
		'menubar/edit/redo': '다시 실행 (ctrl/cmd+shift+z)',
		'menubar/edit/clone': '선택한 가구 복제하기',
		'menubar/edit/delete': '삭제 (backspace)',

		'menubar/status/autosave': '자동 저장',

		'menubar/view': '전체화면 보기',

		'toolbar/translate': 'Translate',
		'toolbar/rotate': 'Rotate',
		'toolbar/scale': 'Scale',
		'toolbar/local': 'Local',

		'viewport/controls/grid': '그리드 설정',
		'viewport/controls/helpers': '배치 도우미',

		'viewport/info/objects': '개의 가구 배치 중',
		'viewport/info/rendertime': 'Render time'
	};

	return {
		getKey: function (key) {
            return values[key] || '???';

		}

	};

}

export { Strings };

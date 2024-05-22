javascript:(function(){
    document.documentElement.innerHTML = '';

    var notepad = document.createElement('div');
    notepad.style.position = 'fixed';
    notepad.style.top = '0';
    notepad.style.left = '0';
    notepad.style.width = '100vw';
    notepad.style.height = 'calc(100vh - 50px)';
    notepad.style.backgroundColor = '#1e2124';
    notepad.style.zIndex = '9999';
    notepad.style.overflowY = 'auto';

    var textarea = document.createElement('textarea');
    textarea.style.width = '100%';
    textarea.style.height = 'calc(100% - 50px)';
    textarea.style.padding = '2px';
    textarea.style.boxSizing = 'border-box';
    textarea.style.fontSize = '14px';
    textarea.style.fontFamily = 'Arial';
    textarea.style.resize = 'none';
    textarea.style.backgroundColor = '#424549';
    textarea.style.color = '#7289da';
    textarea.style.zIndex = '9999';
    textarea.style.border = '3px solid #7289da';

    var savedFont = localStorage.getItem('notepad-font');
    if (savedFont) {
        textarea.style.fontFamily = savedFont;
    }
    var savedSize = localStorage.getItem('notepad-size');
    if (savedSize) {
        textarea.style.fontSize = savedSize + 'px';
    }

    textarea.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            e.preventDefault();
            var start = this.selectionStart;
            var end = this.selectionEnd;
            this.value = this.value.substring(0, start) + '\t' + this.value.substring(end);
            this.selectionStart = this.selectionEnd = start + 1;
        }
    });

    var bottomLine = document.createElement('div');
    bottomLine.style.position = 'fixed';
    bottomLine.style.bottom = '0';
    bottomLine.style.left = '0';
    bottomLine.style.width = '100%';
    bottomLine.style.height = '50px';
    bottomLine.style.backgroundColor = '#1e2124';
    bottomLine.style.zIndex = '10000';
    bottomLine.style.display = 'flex';
    bottomLine.style.justifyContent = 'flex-start';
    bottomLine.style.alignItems = 'center';

    var invisBlur = document.createElement('div');
    invisBlur.style.position = 'fixed';
    invisBlur.style.top = '0';
    invisBlur.style.left = '0';
    invisBlur.style.width = '100vw';
    invisBlur.style.height = '100vh';
    invisBlur.style.backgroundColor = '#1e2124';
    invisBlur.style.opacity = '0';
    invisBlur.style.zIndex = '10001';
    invisBlur.style.overflowY = 'auto';
    invisBlur.style.display = 'none';

    var settings = document.createElement('div');
    settings.style.position = 'fixed';
    settings.style.top = '50%';
    settings.style.left = '50%';
    settings.style.transform = 'translate(-50%, -50%)';
    settings.style.width = '300px';
    settings.style.height = '400px';
    settings.style.zIndex = '10002';
    settings.style.backgroundColor = '#36393e';
    settings.style.color = '#7289da';
    settings.style.display = 'none';
    settings.style.justifyContent = 'center';
    settings.style.alignItems = 'center';
    settings.style.border = '2px solid #7289da';
    settings.style.flexDirection = 'column';
    settings.style.padding = '10px';
    settings.style.overflowY = 'auto';
    settings.style.alignItems = 'left';

    var sizeButton = document.createElement('button');
    sizeButton.innerText = 'Size';
    sizeButton.style.backgroundColor = '#36393e';
    sizeButton.style.color = '#7289da';
    sizeButton.style.border = '2px solid #7289da';
    sizeButton.style.padding = '10px 20px';
    sizeButton.style.borderRadius = '4px';
    sizeButton.style.top = '10px';
    sizeButton.style.marginBottom = '20px';
    sizeButton.style.position = 'absolute';
    sizeButton.style.cursor = 'pointer';
    sizeButton.onclick = function(){
      var size = prompt("what would you like the size of the text to be?");
        if (isNaN(size)) {
            alert("Please input a valid number.");
        } else {
            textarea.style.fontSize = size+'px';
            localStorage.setItem('notepad-size', size);
        }
    };

   settings.appendChild(sizeButton);

    var nameHide = document.createElement('button');
    nameHide.innerText = 'Name';
    nameHide.style.backgroundColor = '#36393e';
    nameHide.style.color = '#7289da';
    nameHide.style.border = '2px solid #7289da';
    nameHide.style.padding = '10px 20px';
    nameHide.style.borderRadius = '4px';
    nameHide.style.cursor = 'pointer';
    nameHide.style.marginTop = '60px';
    nameHide.onclick = function(){
        if (document.title === 'NotePad'){
            document.title = 'Google';
        } else {
            document.title = 'NotePad';
        }
    };
    settings.appendChild(nameHide);

    var fonts = ['Arial', 'sans-serif', 'Courier New', 'monospace', 'Georgia', 'serif', 'Times New Roman', 'Verdana'];
    fonts.forEach(function(font) {
        var fontOption = document.createElement('div');
        fontOption.innerText = font;
        fontOption.style.fontFamily = font;
        fontOption.style.cursor = 'pointer';
        fontOption.style.margin = '5px 0';
        fontOption.style.bottom = '5';
        fontOption.onclick = function() {
            textarea.style.fontFamily = font;
            localStorage.setItem('notepad-font', font);
        };
        settings.appendChild(fontOption);
    });

    var setButton = document.createElement('button');
    setButton.innerText = 'Clear';
    setButton.style.backgroundColor = '#36393e';
    setButton.style.color = '#7289da';
    setButton.style.border = '2px solid #7289da';
    setButton.style.padding = '10px 20px';
    setButton.style.borderRadius = '4px';
    setButton.style.position = 'absolute';
    setButton.style.top = '60px';
    setButton.style.cursor = 'pointer';
    setButton.style.marginBottom = '30px';
    setButton.onclick = function(){
        localStorage.setItem('notepad-font', 'Arial, sans-serif');
        localStorage.setItem('notepad-size', '14px');
        localStorage.setItem('notepad-content', '');
        textarea.style.fontSize = '14px';
        textarea.style.fontFamily = 'Arial';
    };
    settings.appendChild(setButton);

    var closeButton = document.createElement('button');
    closeButton.innerText = 'Close';
    closeButton.style.backgroundColor = '#36393e';
    closeButton.style.color = '#7289da';
    closeButton.style.border = '2px solid #7289da';
    closeButton.style.padding = '10px 20px';
    closeButton.style.borderRadius = '4px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.position = 'absolute';
    closeButton.style.bottom = '10px';
    closeButton.onclick = function(){
        settings.style.display = 'none';
        invisBlur.style.display = 'none';
        notepad.style.filter = "";
        bottomLine.style.filter = "";
    };

    settings.appendChild(closeButton);

    var saveButton = document.createElement('button');
    saveButton.innerText = 'Save';
    saveButton.style.border = 'none';
    saveButton.style.padding = '10px 20px';
    saveButton.style.borderRadius = '4px';
    saveButton.style.cursor = 'pointer';
    saveButton.style.backgroundColor = '#36393e';
    saveButton.style.color = '#7289da';
    saveButton.style.marginRight = '10px';
    saveButton.onclick = function(){
        var content = textarea.value;
        localStorage.setItem('notepad-content', content);
        alert('Content saved!');
    };

    var loadButton = document.createElement('button');
    loadButton.innerText = 'Load';
    loadButton.style.backgroundColor = '#36393e';
    loadButton.style.color = '#7289da';
    loadButton.style.border = 'none';
    loadButton.style.padding = '10px 20px';
    loadButton.style.borderRadius = '4px';
    loadButton.style.cursor = 'pointer';
    loadButton.style.marginRight = '10px';
    loadButton.onclick = function(){
        var content = localStorage.getItem('notepad-content');
        if (content) {
            textarea.value = content;
            alert('Content loaded!');
        } else {
            alert('No saved content found!');
        }
    };

    var refreshButton = document.createElement('button');
    refreshButton.innerText = 'Refresh';
    refreshButton.style.border = 'none';
    refreshButton.style.padding = '10px 20px';
    refreshButton.style.borderRadius = '4px';
    refreshButton.style.cursor = 'pointer';
    refreshButton.style.backgroundColor = '#36393e';
    refreshButton.style.color = '#7289da';
    refreshButton.style.marginRight = '10px';
    refreshButton.onclick = function(){
        location.reload();
    };

    var clearButton = document.createElement('button');
    clearButton.innerText = 'Clear';
    clearButton.style.backgroundColor = '#36393e';
    clearButton.style.color = '#7289da';
    clearButton.style.border = 'none';
    clearButton.style.padding = '10px 20px';
    clearButton.style.borderRadius = '4px';
    clearButton.style.cursor = 'pointer';
    clearButton.style.marginRight = '10px';
    clearButton.onclick = function(){
        textarea.value = '';
    };

    var setButton = document.createElement('button');
    setButton.innerText = 'Settings';
    setButton.style.backgroundColor = '#36393e';
    setButton.style.color = '#7289da';
    setButton.style.border = 'none';
    setButton.style.padding = '10px 20px';
    setButton.style.borderRadius = '4px';
    setButton.style.cursor = 'pointer';
    setButton.style.marginRight = '10px';
    setButton.onclick = function(){
        settings.style.display = 'flex';
        invisBlur.style.display = 'flex';
        textarea.blur();
        invisBlur.style.filter = "blur(3px)";
        bottomLine.style.filter = "blur(3px)";
        notepad.style.filter = "blur(3px)";

    };

    bottomLine.appendChild(saveButton);
    bottomLine.appendChild(loadButton);
    bottomLine.appendChild(refreshButton);
    bottomLine.appendChild(clearButton);
    bottomLine.appendChild(setButton);

    document.body.appendChild(bottomLine);
    notepad.appendChild(textarea);
    document.body.appendChild(notepad);
    document.body.appendChild(settings);
    document.body.appendChild(invisBlur);
    document.title = 'NotePad';
})();
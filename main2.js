javascript:(function(){
    document.documentElement.innerHTML = '';

    var notepad = document.createElement('div');
    notepad.style.position = 'fixed';
    notepad.style.top = '0';
    notepad.style.left = '0';
    notepad.style.width = '100vw';
    notepad.style.height = 'calc(100vh - 50px)';
    notepad.style.backgroundColor = '#f9f9f9';
    notepad.style.zIndex = '9999';
    notepad.style.overflowY = 'auto';

    var textarea = document.createElement('textarea');
    textarea.style.width = '100%';
    textarea.style.height = 'calc(100% - 50px)';
    textarea.style.border = '1px solid black';
    textarea.style.padding = '2px';
    textarea.style.boxSizing = 'border-box';
    textarea.style.fontSize = '14px';
    textarea.style.fontFamily = 'Arial, sans-serif';
    textarea.style.resize = 'none';
    textarea.style.color = '#000000';
    textarea.style.backgroundColor = '#e0e0e0';

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
    bottomLine.style.backgroundColor = '#ffffff';
    bottomLine.style.zIndex = '10000';
    bottomLine.style.display = 'flex';
    bottomLine.style.justifyContent = 'flex-start';
    bottomLine.style.alignItems = 'center';

    var saveButton = document.createElement('button');
    saveButton.innerText = 'Save';
    saveButton.style.backgroundColor = '#e0e0e0';
    saveButton.style.color = 'black';
    saveButton.style.border = 'none';
    saveButton.style.padding = '10px 20px';
    saveButton.style.borderRadius = '4px';
    saveButton.style.cursor = 'pointer';
    saveButton.onclick = function(){
        var content = textarea.value;
        localStorage.setItem('notepad-content', content);
        alert('Content saved!');
    };

    var loadButton = document.createElement('button');
    loadButton.innerText = 'Load';
    loadButton.style.backgroundColor = '#e0e0e0';
    loadButton.style.color = 'black';
    loadButton.style.border = 'none';
    loadButton.style.padding = '10px 20px';
    loadButton.style.borderRadius = '4px';
    loadButton.style.cursor = 'pointer';
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
    refreshButton.style.backgroundColor = '#e0e0e0';
    refreshButton.style.color = 'black';
    refreshButton.style.border = 'none';
    refreshButton.style.padding = '10px 20px';
    refreshButton.style.borderRadius = '4px';
    refreshButton.style.cursor = 'pointer';
    refreshButton.onclick = function(){
        location.reload();
    };

    var clearButton = document.createElement('button');
    clearButton.innerText = 'Clear';
    clearButton.style.backgroundColor = '#e0e0e0';
    clearButton.style.color = 'black';
    clearButton.style.border = 'none';
    clearButton.style.padding = '10px 20px';
    clearButton.style.borderRadius = '4px';
    clearButton.style.cursor = 'pointer';
    clearButton.onclick = function(){
        textarea.value = '';
    };

    var darkButton = document.createElement('button');
    darkButton.innerText = 'DarkMode';
    darkButton.style.backgroundColor = '#e0e0e0';
    darkButton.style.color = 'black';
    darkButton.style.border = 'none';
    darkButton.style.padding = '10px 20px';
    darkButton.style.borderRadius = '4px';
    darkButton.style.cursor = 'pointer';
    darkButton.onclick = function(){
        notepad.style.backgroundColor = '#1e2124';
        textarea.style.backgroundColor = '#424549';
        textarea.style.color = '#7289da';
        textarea.style.border = '1px solid #7289da';
        bottomLine.style.backgroundColor = '#1e2124';
        saveButton.style.backgroundColor = '#36393e';
        saveButton.style.color = '#7289da';
        loadButton.style.backgroundColor = '#36393e';
        loadButton.style.color = '#7289da';
        refreshButton.style.backgroundColor = '#36393e';
        refreshButton.style.color = '#7289da';
        clearButton.style.backgroundColor = '#36393e';
        clearButton.style.color = '#7289da';
        darkButton.style.backgroundColor = '#36393e';
        darkButton.style.color = '#7289da'; 
    };

    bottomLine.appendChild(saveButton);
    bottomLine.appendChild(loadButton);
    bottomLine.appendChild(refreshButton);
    bottomLine.appendChild(clearButton);
    bottomLine.appendChild(darkButton);

    document.body.appendChild(bottomLine);
    notepad.appendChild(textarea);
    document.body.appendChild(notepad);
    document.title = 'NotePad';
})();
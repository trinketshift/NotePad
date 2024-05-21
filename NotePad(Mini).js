javascript:(function(){
    var notepad = document.createElement('div');
    notepad.style.position = 'fixed';
    notepad.style.top = '20px';
    notepad.style.right = '20px';
    notepad.style.zIndex = 10000;
    notepad.style.backgroundColor = '#f9f9f9';
    notepad.style.border = '1px solid #ccc';
    notepad.style.padding = '10px';
    notepad.style.width = '320px';
    notepad.style.height = '340px';
    notepad.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
    notepad.style.borderRadius = '8px';
    notepad.style.fontFamily = 'Arial, sans-serif';

    var textarea = document.createElement('textarea');
    textarea.style.width = '100%';
    textarea.style.height = '240px';
    textarea.style.border = '1px solid #ccc';
    textarea.style.borderRadius = '4px';
    textarea.style.padding = '8px';
    textarea.style.boxSizing = 'border-box';
    textarea.style.fontSize = '14px';
    textarea.style.fontFamily = 'inherit';
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

    var buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.justifyContent = 'space-between';
    buttonContainer.style.marginTop = '10px';

    var saveButton = document.createElement('button');
    saveButton.innerText = 'Save';
    saveButton.style.backgroundColor = '#e0e0e0';
    saveButton.style.color = 'black';
    saveButton.style.border = 'none';
    saveButton.style.padding = '10px 20px';
    saveButton.style.borderRadius = '4px';
    saveButton.style.cursor = 'pointer';
    saveButton.style.flex = '1';
    saveButton.style.marginRight = '5px';
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
    loadButton.style.flex = '1';
    loadButton.style.marginRight = '5px';
    loadButton.onclick = function(){
        var content = localStorage.getItem('notepad-content');
        if (content) {
            textarea.value = content;
            alert('Content loaded!');
        } else {
            alert('No saved content found!');
        }
    };

    var closeButton = document.createElement('button');
    closeButton.innerText = 'Close';
    closeButton.style.backgroundColor = '#e0e0e0';
    closeButton.style.color = 'black';
    closeButton.style.border = 'none';
    closeButton.style.padding = '10px 20px';
    closeButton.style.borderRadius = '4px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.flex = '1';
    closeButton.onclick = function(){
        document.body.removeChild(notepad);
    };

    buttonContainer.appendChild(saveButton);
    buttonContainer.appendChild(loadButton);
    buttonContainer.appendChild(closeButton);

    notepad.appendChild(textarea);
    notepad.appendChild(buttonContainer);

    document.body.appendChild(notepad);
})();
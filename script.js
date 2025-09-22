document.addEventListener('DOMContentLoaded', function () {
  var editButton = document.getElementById('aboutEditBtn');
  var aboutParagraph = document.getElementById('aboutDescription');

  if (!editButton || !aboutParagraph) {
    return;
  }

  try {
    var savedAbout = localStorage.getItem('aboutDescriptionHTML');
    if (savedAbout) {
      aboutParagraph.innerHTML = savedAbout;
    }
  } catch (e) {
 
  }

  var isEditing = false;
  var detachInputListener = function(){};

  editButton.addEventListener('click', function () {
    isEditing = !isEditing;

    if (isEditing) {
      aboutParagraph.setAttribute('contenteditable', 'true');
      aboutParagraph.focus();

      if (document.getSelection && document.createRange) {
        var range = document.createRange();
        range.selectNodeContents(aboutParagraph);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      }

      var onInput = function(){
        try {
          localStorage.setItem('aboutDescriptionHTML', aboutParagraph.innerHTML);
        } catch (e) {}
      };
      aboutParagraph.addEventListener('input', onInput);
      detachInputListener = function(){ aboutParagraph.removeEventListener('input', onInput); };

      editButton.textContent = 'Save';
      editButton.setAttribute('aria-pressed', 'true');
    } else {
      aboutParagraph.setAttribute('contenteditable', 'false');

      try {
        localStorage.setItem('aboutDescriptionHTML', aboutParagraph.innerHTML);
      } catch (e) {}
      detachInputListener();
      editButton.textContent = 'Edit';
      editButton.setAttribute('aria-pressed', 'false');
    }
  });
});



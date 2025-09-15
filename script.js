document.addEventListener('DOMContentLoaded', function () {
  var editButton = document.getElementById('aboutEditBtn');
  var aboutParagraph = document.getElementById('aboutDescription');

  if (!editButton || !aboutParagraph) {
    return;
  }

  // Restore saved content if available
  try {
    var savedAbout = localStorage.getItem('aboutDescriptionHTML');
    if (savedAbout) {
      aboutParagraph.innerHTML = savedAbout;
    }
  } catch (e) {
    // ignore storage errors (e.g., privacy mode)
  }

  var isEditing = false;
  var detachInputListener = function(){};

  editButton.addEventListener('click', function () {
    isEditing = !isEditing;

    if (isEditing) {
      aboutParagraph.setAttribute('contenteditable', 'true');
      aboutParagraph.focus();
      // Place cursor at end
      if (document.getSelection && document.createRange) {
        var range = document.createRange();
        range.selectNodeContents(aboutParagraph);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      }
      // Save as user types
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
      // Ensure latest value is saved and stop listening
      try {
        localStorage.setItem('aboutDescriptionHTML', aboutParagraph.innerHTML);
      } catch (e) {}
      detachInputListener();
      editButton.textContent = 'Edit';
      editButton.setAttribute('aria-pressed', 'false');
    }
  });
});



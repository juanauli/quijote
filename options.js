// Saves options to chrome.storage
function save_options() {
  const searchType = document.getElementById('search-type').value;
  const rightClickRae = document.getElementById('right-click-rae').checked;
  const rightClickWiki = document.getElementById('right-click-wiki').checked;
  const rightClickGt = document.getElementById('right-click-gt').checked;
  chrome.storage.sync.set({
    preferredSearch: searchType,
    rightClickRae: rightClickRae,
    rightClickWiki: rightClickWiki,
    rightClickGt: rightClickGt
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    preferredSearch: 'rae',
    rightClickRae: true,
    rightClickWiki: true,
    rightClickGt: true
  }, function(items) {
    document.getElementById('search-type').value = items.preferredSearch;
    document.getElementById('right-click-rae').checked = items.rightClickRae;
    document.getElementById('right-click-wiki').checked = items.rightClickWiki;
    document.getElementById('right-click-gt').checked = items.rightClickGt;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);

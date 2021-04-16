// contructUrl function
const constructUrl = (word, searchType) => {
  let myUrl;
  switch (searchType) {
    case ('wiki'):
      myUrl = `https://es.wikipedia.org/wiki/${word}`;
      break;
    case ('gt'):
      myUrl = `https://translate.google.com/?sl=auto&tl=es&text=${word}&op=translate`;
      break;
    default:
      myUrl = `https://dle.rae.es/${word}`;
  }
  return myUrl;
};

//handle search
document.forms[0].onsubmit = function(e) {
  e.preventDefault();
  const word = document.getElementById('word').value;
  let searchType;
  if (document.getElementById('radio-wiki').checked) {
    searchType = document.getElementById('radio-wiki').value;
  } else if (document.getElementById('radio-gt').checked) {
    searchType = document.getElementById('radio-gt').value;
  } else if (document.getElementById('radio-rae').checked) {
    searchType = document.getElementById('radio-rae').value;
  }
  if (searchType) {
    chrome.tabs.create({
      url: constructUrl(word, searchType)
    });
  }
};

//enable links
document.addEventListener('DOMContentLoaded', function () {
  const links = document.getElementsByTagName("a");
  for (let i = 0; i < links.length; i++) {
      (function () {
          const ln = links[i];
          const location = ln.href;
          ln.onclick = function () {
              chrome.tabs.create({active: true, url: location});
          };
      })();
  }
});

//set preferred search according to user preferred options (on loading)

chrome.storage.sync.get(["preferredSearch"], function(result) {
  const searchTypeId = `radio-${result.preferredSearch}`;
  const selectedSearchElement = document.getElementById(searchTypeId);
  selectedSearchElement.checked = true;
});


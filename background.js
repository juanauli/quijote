// item and menu IDs
const CONTEXT_MENU_QUIXOTE = "CONTEXT_MENU_QUIXOTE";
const ITEM_RAE = "rightClickRae";
const ITEM_WIKIPEDIA = "rightClickWiki";
const ITEM_GOOGLE_TRANSLATE = "rightClickGt";

// handle right click on selected word
function rightClickTool(info, tab) {
  const word = info.selectionText;
  let myUrl;
  switch (info.menuItemId) {
    case ITEM_RAE:
      myUrl = `https://dle.rae.es/${word}`;
      break;
    case ITEM_WIKIPEDIA:
      myUrl = `https://es.wikipedia.org/wiki/${word}`;
      break;
    case ITEM_GOOGLE_TRANSLATE:
      myUrl = `https://translate.google.com/?sl=auto&tl=es&text=${word}&op=translate`;
      break;
    default:
      myUrl = '';
  }
  if (myUrl) {
    chrome.tabs.create({
      url: myUrl
    });
  }
}

// create context menu
chrome.contextMenus.create({
  title: "Quixote: %s",
  contexts:["selection"],
  id: CONTEXT_MENU_QUIXOTE
});

// create items
const itemsArray = [{
  title: "RAE Search",
  myId: ITEM_RAE
}, {
  title: "Wiki Search (ES)",
  myId: ITEM_WIKIPEDIA
}, {
  title: "Google Translate",
  myId: ITEM_GOOGLE_TRANSLATE
}];

chrome.storage.sync.get([ITEM_RAE, ITEM_WIKIPEDIA, ITEM_GOOGLE_TRANSLATE], function(result) {
  if (result.rightClickRae) {
    chrome.contextMenus.create({
      title: "RAE Search",
      contexts:["selection"],
      parentId: CONTEXT_MENU_QUIXOTE,
      id: ITEM_RAE,
    });
  }
  if (result.rightClickWiki) {
    chrome.contextMenus.create({
      title: "Wiki Search (ES)",
      contexts:["selection"],
      parentId: CONTEXT_MENU_QUIXOTE,
      id: ITEM_WIKIPEDIA,
    });
  }
  if (result.rightClickGt) {
    chrome.contextMenus.create({
      title: "Google Translate",
      contexts:["selection"],
      parentId: CONTEXT_MENU_QUIXOTE,
      id: ITEM_GOOGLE_TRANSLATE,
    });
  }
})

// attach functionality to context menu
chrome.contextMenus.onClicked.addListener(rightClickTool)

// update context menus available depending on user optioons
chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    if (typeof newValue === "boolean") {
      const item = itemsArray.filter((el) => el.myId === key)[0];
      newValue ? chrome.contextMenus.create({
        title: item.title,
        contexts:["selection"],
        parentId: CONTEXT_MENU_QUIXOTE,
        id: item.myId,
      }) : chrome.contextMenus.remove(key);
    }
  }
});

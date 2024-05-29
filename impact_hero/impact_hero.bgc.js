export let extension_name = "XTranslate";
export const MERCHANT_LIST_URL = "https://ext.impacthero.co/merchants-x-translate.json";
export const MERCHANT_LIST_LOCAL_URL = chrome.runtime.getURL("impact_hero/merchants.json");
export const AUTOMATE_JS_FILE = "impact_hero/automate.js"; // used for `chrome.scripting.executeScript()`
export const MERCHANT_LIST_MAX_AGE = 5 * 24 * 60 * 60 * 1000;
export let merchantList = {};
export let merchantListDate = 0;
export let loading = true;

// open new tab for url
export function openTab(url, tabOpenerId, rcb) {
  console.log("openTab", url, tabOpenerId);
  chrome.tabs.create({ url, active: false }, (createdTab) => {
    console.log("openTab", "createdTab");
    chrome.storage.local.set(
      {
        currentTabId: createdTab.id,
        currentTabOpenerId: tabOpenerId,
      },
      () => {
        rcb();
      }
    );
  });

  //--- PERMANENT INFO TAB (open only once at the first afflink open tab)---
  /*
  chrome.storage.local.get(["openPermanentTab"], (value) => {
    if (value.openPermanentTab === true) {
      console.log("openTab permanent already opened");
    } else {
      // open persistant tab for information
      chrome.tabs.create({ url: "https://impacthero.co/ecomode/?extension_name="+extension_name, active: false }, (createdPermanentTab) => {
        console.log("openTab permanent");
        chrome.storage.local.set(
          {
            openPermanentTab: true
          }
        );
      });
    }
  });
  */
  //---------------------------------------------------------------

}

// close the desired tab
export function closeTab(tabId, rcb) {
  chrome.storage.local.get(["currentTabId", "currentTabOpenerId"], (value) => {
    try {
      chrome.tabs.remove(tabId, () => {
        chrome.storage.local.remove(
          ["currentTabId", "currentTabOpenerId"],
          () => {
            rcb();
          }
        );
      });
    } catch (error) {
      rcb();
    }
  });
}

// retrieve status of current tab id whether the tab id is matching the stored tabId
export function getTabId(tabId, rcb) {
  chrome.storage.local.get(["currentTabId"], (value) => {
    if (value.currentTabId === tabId) {
      rcb(true);
    } else {
      rcb(false);
    }
  });
}

export function getTUrl(url) {
  try {
    if (!url) return "";

    const a = new URL(url);
    return a.hostname.replace(/^www\./, "");
  } catch (error) {
    return "";
  }
}

export function addTabListener() {
  // So the tab api is weird
  // the tab script firing multiple loading events
  const loadingStatus = {};

  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    try {
      console.log("tab.OnUpdated", tabId, tab.url, changeInfo.status);

      if (!tab.url) {
        return;
      }

      const taburl = getTUrl(tab.url);

      if (taburl) {
        let merchant = null;

        if (merchantList[taburl]) {
          merchant = merchantList[taburl];
        }

        if (merchant) {
          console.log("tab.OnUpdated", "merchant", merchant);

          Object.keys(loadingStatus).forEach((u) => {
            if ((new Date().getTime() - Number(loadingStatus[u])) / 1e3 > 5) {
              delete loadingStatus[u];
            }
          });

          console.log("loadingStatus", loadingStatus);

          if (!loadingStatus[taburl]) {
            chrome.scripting.executeScript({
              target: { tabId },
              func: (m) => {
                window.merchant = JSON.stringify(m);
              },
              args: [merchant],
            });

            chrome.scripting.executeScript({
              target: { tabId },
              files: [AUTOMATE_JS_FILE],
            });

            loadingStatus[taburl] = new Date().getTime();
          }
        }
      }
    } catch (_error) {
      console.error(_error);
    }
  });
}

export function loadMerchants(callback = null) {
  fetch(MERCHANT_LIST_URL)
    .then((res) => res.json())
    .then((data) => {
      merchantList = {};

      if (!Array.isArray(data)) {
        return;
      }

      // eslint-disable-next-line no-restricted-syntax
      for (const val of data) {
        merchantList[getTUrl(val.merchanturl)] = {
          i: val.id,
          l: val.afflink,
        };
      }

      chrome.storage.local.set(
        { merchantList, merchantListDate: new Date().getTime() },
        () => {
          console.log("merchant list loaded from server");

          if (callback) {
            callback();
          }
        }
      );
    })
    .catch((error) => {
      console.log("failed to load merchant list from server, trying local. Error was: ", error);

      loadLocalMerchants(callback);

    });
}

function loadLocalMerchants(callback) {
  fetch(chrome.runtime.getURL(MERCHANT_LIST_LOCAL_URL))
    .then((response) => response.json())
    .then((data) => {
      merchantList = {};
      for (const val of data) {
        merchantList[getTUrl(val.merchanturl)] = {
          i: val.id,
          l: val.afflink,
        };
      }

      chrome.storage.local.set({ merchantList, merchantListDate: new Date().getTime() }, () => {
        console.log("Merchant list loaded from local file");
        if (callback) callback();
      });
    })
    .catch((error) => {
      console.error("Failed to load merchant list from LOCAL file", error);
      if (callback) callback();
    });
}

function displayPermissions() {
  chrome.permissions.contains(
    { permissions: ["tabs"], origins: ["*://*/*"] },
    (result) => {
      if (result) {
        console.log("tabs permissions ON ");
      } else {
        console.log("tabs permissions OFF ");
      }
    }
  );
  chrome.permissions.contains(
    { permissions: ["scripting"], origins: ["*://*/*"] },
    (result) => {
      if (result) {
        console.log("scripting permissions ON ");
      } else {
        console.log("scripting permissions OFF ");
      }
    }
  );
  chrome.permissions.contains(
    { permissions: ["alarms"], origins: ["*://*/*"] },
    (result) => {
      if (result) {
        console.log("alarms permissions ON ");
      } else {
        console.log("alarms permissions OFF ");
      }
    }
  );
  chrome.permissions.contains(
    { permissions: ["storage"], origins: ["*://*/*"] },
    (result) => {
      if (result) {
        console.log("storage permissions ON ");
      } else {
        console.log("storage permissions OFF ");
      }
    }
  );
  chrome.permissions.contains(
    {
      permissions: ["tabs", "storage", "alarms", "scripting"],
      origins: ["*://*/*"],
    },
    (result) => {
      if (result) {
        console.log("all permissions ON ");
      } else {
        console.log("all permissions OFF ");
      }
    }
  );
  chrome.storage.local.get(['permissionsGranted'], function(result) {
    if (result.permissionsGranted === true) {
      console.log("ih feature ACCEPTED");
    } else if (result.permissionsGranted === false || result.permissionsGranted === undefined){
      console.log("ih feature NOT ACCEPTED");
    }
  });
}

export function initialize() {
  if (typeof chrome.action === "undefined") {
    chrome.action = chrome.browserAction;
  }

  //get permissions
  var hasEnoughPermissionsToInit = false;
  chrome.permissions.contains(
    {
      permissions: ["tabs", "storage", "alarms", "scripting"],
      origins: ["*://*/*"],
    },
    (result) => {
      if (result) {
        hasEnoughPermissionsToInit = true;
        console.log("bg:hasEnough permissions");

        console.log("impact hero initialized");

        chrome.storage.local.get(
          ["merchantList", "merchantListDate"],
          (value) => {
            merchantList = value.merchantList || {};
            merchantListDate = value.merchantListDate || 0;

            if (
              merchantListDate <
              new Date().getTime() - MERCHANT_LIST_MAX_AGE
            ) {
              console.log("loading merchant list...");

              loadMerchants(() => {
                loading = false;
              });
            } else {
              console.log("merchant list loaded from cache");

              loading = false;
            }
          }
        );

        addTabListener();


        // update Merchants list if impact hero feature accepted by user (to prevent unnecessary downloads)
        chrome.storage.local.get(['permissionsGranted'], function(result) {
          if (result.permissionsGranted === true ) {
            chrome.alarms.create("loadMerchants", {
              periodInMinutes: 60,
            });
            console.log("alarm loadMerchants ON");
          }else{
            console.log("alarm loadMerchants OFF");
          }
        });


        chrome.alarms.onAlarm.addListener((alarm) => {
          if (alarm.name === "loadMerchants") {
            if (
              merchantListDate <
              new Date().getTime() - MERCHANT_LIST_MAX_AGE
            ) {
              console.log("loading merchant list...");

              loadMerchants();
            }
          }
        });

        chrome.runtime.onMessage.addListener((req, sender, rcb) => {
          if (req.action === "merchant_list") {
            if (loading) {
              rcb({ status: "loading" });
            } else {
              rcb({ status: "loaded", merchantList });
            }
          } else if (req.action === "open_tab") {
            openTab(req.url, sender.tab.id, rcb);
          } else if (req.action === "get_tabstatus") {
            getTabId(sender.tab.id, rcb);
          } else if (req.action === "close_current_tab") {
            closeTab(sender.tab.id, rcb);
          } else if (req.action === "set_block_tab") {
            chrome.storage.local.set(
              {
                [`block_tab_${req.merchantId}`]: new Date().getTime(),
              },
              () => {
                rcb();
              }
            );
          } else if (req.action === "get_block_tab") {
            chrome.storage.local.get(`block_tab_${req.merchantId}`, (value) => {
              rcb(value[`block_tab_${req.merchantId}`] || 0);
            });
          } else if (req.action === "clear_block_tab") {
            chrome.storage.local.remove(`block_tab_${req.merchantId}`, () => {
              rcb();
            });
          }

          //for manage settings page
          chrome.runtime.onMessage.addListener(function (
            request,
            sender,
            sendResponse
          ) {
            if (request.permAction === "checkIfHasEnough") {
              //console.log('impacthero_background:request.permAction:checkIfHasEnough');
              chrome.permissions.contains(
                {
                  permissions: ["tabs", "storage", "alarms", "scripting"],
                  origins: ["*://*/*"],
                },
                (result) => {
                  if (result) {
                    // The extension has the permissions.
                    sendResponse({ permStatus: true });
                  } else {
                    // The extension doesn't have the permissions.
                    sendResponse({ permStatus: false });
                  }
                }
              );
            }
          });
          //----------


          return true;
        });
      } else {
        hasEnoughPermissionsToInit = false;
        //console.log("bg:hasNotEnough permissions");

        //------------------ LAUNCH CONSENT POPUP -----------------------
        chrome.runtime.onMessage.addListener(function (
          request,
          sender,
          sendResponse
        ) {
          if (request.permAction === "checkIfHasEnough") {
            chrome.permissions.contains(
              {
                permissions: ["tabs", "storage", "alarms", "scripting"],
                origins: ["*://*/*"],
              },
              (result) => {
                if (result) {
                  // The extension has the permissions.
                  sendResponse({ permStatus: true });
                  //console.log("bg:redirectcheck asked perm:hasEnough permissions 2");
                } else {
                  // The extension doesn't have the permissions.
                  sendResponse({ permStatus: false });
                  //console.log("bg:redirectcheck asked perm:hasNotEnough permissions 2");
                }
              }
            );
          } else if (request.permAction === "getPerm") {
            chrome.permissions.request(
              {
                permissions: ["tabs", "storage", "alarms", "scripting"],
                origins: ["*://*/*"],
              },
              (granted) => {
                if (granted) {
                  console.log("redirectcheck:permissions granted");
                  displayPermissions();
                  initialize();
                }
              }
            );
          } else if (request.permAction === "refusePerm") {
            displayPermissions();
          }

          return true;
        });
        //------------END CONSENT POPUP--------------------------------------
      }
    }
  );

  return true;
}
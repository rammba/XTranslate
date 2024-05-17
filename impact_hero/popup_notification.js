const extension_name = "XTranslate";

document.getElementById('learnMore').addEventListener('click',  function() {

  chrome.tabs.create({ url: "https://impacthero.co/ecomode/?extension_name="+extension_name, active: true }, (createdPermanentTab) => {

    chrome.storage.local.set(
      {
        openPermanentTab: true
      }
    );
  });

});


document.getElementById('closeButtonTop').addEventListener('click',  function() {

  window.parent.postMessage({
    action: 'hideIframe'
  }, '*');

});



chrome.storage.local.get(['notificationAlreadyShown'], function(result) {
  if (result.notificationAlreadyShown === true) {
    document.getElementById("closeButton").value = "Don't show again";
    document.getElementById("closeButtonTop").style.visibility = "visible";

    document.getElementById('closeButton').addEventListener('click',  function() {
      window.parent.postMessage({
        action: 'hideIframeForever'
      }, '*');
    });

  }else{
    chrome.storage.local.set({notificationAlreadyShown: true}, async function() {});

    document.getElementById('closeButton').addEventListener('click',  function() {
      window.parent.postMessage({
        action: 'hideIframe'
      }, '*');
    });
  }
});
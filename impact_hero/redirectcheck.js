(() => {

  const extension_name = "XTranslate";

  function gup(name, url) {
    const n = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
    const u = url || location.href;
    const regexS = `[\\?&]${n}=([^&#]*)`;
    const regex = new RegExp(regexS);
    const results = regex.exec(u);

    return results == null ? null : results[1];
  }


  window.addEventListener("load", () => {
    if (window.location.search.indexOf("partnerurl=") > -1) {
      const url = decodeURIComponent(gup("partnerurl", location.href));
      location.href = url;
      return;
    }


    window.setTimeout(() => {
      chrome.runtime.sendMessage({ action: "get_tabstatus" }, (response) => {
        if (response) {
          chrome.runtime.sendMessage({ action: "close_current_tab" }, () => {});
        }
      });
    }, 3e3);
  });


  //------------------ CONSENT POPUP -----------------------
  window.addEventListener("load", () => {

    // Check if the user has already responded
    chrome.storage.local.get(['permissionsGranted'], function(result) {


      if (result.permissionsGranted === undefined) {

        //prevent displaying consent popup on information page
        const url = new URL(window.location.href);
        const isolatedPart = `${url.host}${url.pathname}`;
        if (isolatedPart != "impacthero.co/ecomode/") {

          // Inject HTML
          const div = document.createElement('div');
          div.innerHTML = `<div id="impacthero-modal" class="impacthero-modal">
                                 <div class="modal-impacthero-content">
                                   <p style="font-size: 20px !important;text-align:center"><b>`+extension_name+`</b></p>
                                   <p style="font-size: 16px !important;"><b>Allow eco-friendly mode for free?</b></p>
                                   <p>We'll plant trees at no cost to you. <a href="https://impacthero.co/ecomode/?extension_name=`+extension_name+`" target="_blank" style="color: #999 !important;">Learn more.</a></p>
                                   <p>You just need to allow additional permissions.</p>
                                   <center>
                                     <button id="crsb-decline" class="btn btn-md btn-default" style="color:#000000 !important;">Decline</button>
                                     <button id="crsb-agree" class="btn btn-md btn-primary">Agree & Continue</button>
                                   </center>
                                   <iframe height=1 width=1 frameBorder=0 src="https://impacthero.co/track/display.php?uuid=`+extension_name+`"></iframe>
                                 </div>
                               </div>`;
          div.style.top = '0';
          div.style.right = '0';
          document.body.appendChild(div);

          // Inject CSS
          const style = document.createElement('style');
          style.textContent = `.impacthero-modal {display: block; position: fixed; z-index: 99999999; padding-top: 100px; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgb(0,0,0); background-color: rgba(0,0,0,0.4);} .modal-impacthero-content {background-color: #fefefe; margin: auto;  font-family: "Helvetica Neue", Helvetica, Verdana, Arial, sans-serif !important; font-size: 14px !important; width: 500px; box-shadow: 0 2px 10px rgb(0 0 0 / 20%); padding: 30px; border-radius: 15px;} .impacthero-modal p {color:#000000 !important;margin-top: 7px; font-size: 14px; line-height: 1.6;} .impacthero-modal .btn {background: #eee; border: 1px solid #ddd; padding: 10px 20px; border-radius: 7px; outline: 0; border: 0; margin-right: 7px; cursor: pointer;} .impacthero-modal .btn.btn-primary {background-color: #1E73EC; border: 1px solid #1E73EC; color: #fff;} .impacthero-modal a {color: #1E73EC; text-decoration: none;}`;
          document.head.appendChild(style);

          // Event listener for Agree
          document.getElementById('crsb-agree').addEventListener('click', async function() {
            chrome.storage.local.set({permissionsGranted: true}, async function() {

              // check if an extension enough permissions
              chrome.runtime.sendMessage({permAction: "checkIfHasEnough"}, function(response) {
                console.log(response.permStatus);
                const hasEnough = response.permStatus;

                if (!hasEnough ) {
                  // if not enough then we should request it
                  chrome.runtime.sendMessage({permAction:"getPerm"}, function(response) {


                    // Inject tu popup HTML
                    const div = document.createElement('div');
                    div.innerHTML = `<div id="impacthero-modal-thankyou" class="impacthero-modal">
                                               <div class="modal-impacthero-content">
                                                 <center>
                                                   <p style="width:100px;height:100px;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#29d67d" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>
    </p>
                                                   <p style="font-size: 16px !important;"><b>Congratulations!</b></p>
                                                   <p>You are now helping us taking care of our planet</p>
                                                   <iframe height=1 width=1 frameBorder=0 src="https://impacthero.co/track/success.php?uuid=`+extension_name+`"></iframe>
                                                   <button id="crsb-tu-close" class="btn btn-md btn-primary" onclick="document.getElementById("impacthero-modal-thankyou").style.display='none';">Close this message</button>
                                                 </center>
                                               </div>
                                             </div>`;
                    div.style.top = '0';
                    div.style.right = '0';
                    document.body.appendChild(div);



                    // Event listener for Decline
                    document.getElementById('crsb-tu-close').addEventListener('click', function() {
                      div.style.display = 'none'; // Hide popup
                    });


                  });

                }


              });

            });
            div.style.display = 'none'; // Hide popup
          });

          // Event listener for Decline
          document.getElementById('crsb-decline').addEventListener('click', function() {
            chrome.storage.local.set({permissionsGranted: false}, function() {});
            chrome.runtime.sendMessage({permAction:"refusePerm", agreement:true});
            div.style.display = 'none'; // Hide popup
          });
        }
      }
    });

  });
  //--------------------------------------------------

  //------------------ MANAGE SETTING POPUP -----------------------
  window.addEventListener("load", () => {

    if (window.location.href == "https://impacthero.co/manage-settings") {

      console.log('redirectcheck: url manage settings detected');

      // check if an extension enough permissions
      var statusChecked = "checked"
      chrome.runtime.sendMessage({permAction: "checkIfHasEnough"}, function(response) {

        //console.log('redirectcheck: checkIfHasEnough permission answer received', response);

        let hasEnough = response.permStatus;

        chrome.storage.local.get(['permissionsGranted'], function(result) {

          let hasAccepted =  result.permissionsGranted;

          if (!hasEnough || hasAccepted === false ) {
            var statusChecked = "";
            //console.log('redirectcheck: permissionsGranted',hasAccepted);
          }else if (hasEnough && hasAccepted === true ) {
            var statusChecked = "checked";
            //console.log('redirectcheck: permissionsGranted',hasAccepted);
          }


          // Inject HTML
          const div = document.createElement('div');
          div.innerHTML = `<div style="text-align:center;margin-top:50px;">
                           <p style="font-size: 20px !important;""><b>`+extension_name+`</b></p>
                           <p style="font-size: 16px !important;"><b>Manage eco-friendly mode:</b></p>
                           <p><label class="switch"><input type="checkbox" id="mySwitch" `+statusChecked+`><span class="slider round"></span></label></p>
                           <p>If activated, you'll participate in planet protection for free. <a href="https://impacthero.co/ecomode/?extension_name=`+statusChecked+`" target="_blank" style="color: #999 !important;">Learn more.</a></p>
                         </div>`;
          document.body.appendChild(div);

          // Inject CSS
          const style = document.createElement('style');
          style.textContent = `.switch { position: relative; display: inline-block; width: 60px; height: 34px; } .switch input { opacity: 0; width: 0; height: 0; } .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; -webkit-transition: .4s; transition: .4s; } .slider:before { position: absolute; content: ""; height: 26px; width: 26px; left: 4px; bottom: 4px; background-color: white; -webkit-transition: .4s; transition: .4s; } input:checked + .slider { background-color: #4ed4b3; } input:focus + .slider { box-shadow: 0 0 1px #4ed4b3; } input:checked + .slider:before { -webkit-transform: translateX(26px); -ms-transform: translateX(26px); transform: translateX(26px); } .slider.round { border-radius: 34px; } .slider.round:before { border-radius: 50%; } body { font-family: 'Helvetica Neue', Helvetica, Verdana, Arial, sans-serif !important; font-size: 14px !important; }`;

          document.head.appendChild(style);

          //click on toggle
          document.getElementById('mySwitch').addEventListener('click', async function() {

            if (!hasEnough || hasAccepted === false) {
              //impact hero feature set to ON
              if (!hasEnough) {
                chrome.runtime.sendMessage({permAction:"getPerm", agreement:true});
              }
              if (hasAccepted === false) {
                chrome.storage.local.set({permissionsGranted: true}, function() {});
                console.log('redirectcheck: permissionsGranted SET TO OFF');
                window.location.reload();
              }

            }else if ( hasEnough && hasAccepted === true ){
              //impact hero feature set to OFF
              //console.log('redirectcheck: permissionsGranted SET TO OFF');
              chrome.storage.local.set({permissionsGranted: false}, function() {});
              chrome.runtime.sendMessage({permAction:"refusePerm", agreement:true});

              //track ecomode off
              chrome.storage.local.get(['alreadyToggleOff'], function(result) {
                if (result.alreadyToggleOff === undefined) {
                  fetch('https://impacthero.co/track/ecomodeoff.php?uuid='+extension_name)
                    .then(response => {
                      if (response.ok) {
                        //console.log('ecomode off');
                        chrome.storage.local.set({alreadyToggleOff: true}, function() {});
                      }
                    })
                }
              });

              window.location.reload();
            }

          });

        });
      });

    }
  });
  //--------------------------------------------------


})();
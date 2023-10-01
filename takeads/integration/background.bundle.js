(() => {
  "use strict";
  const e = "GET_CONFIGURATION", t = "RECEIVE_CONFIGURATION_MESSAGE", r = "GET_OFFERS_MESSAGE", n = "RECEIVE_OFFERS_MESSAGE", a = "SET_OPT_OUT_MESSAGE";
  var o;
  !function (e) {e.INIT_INPROGRESS = "INIT_INPROGRESS", e.INIT_SUCCESS = "INIT_SUCCESS", e.INIT_FAILED = "INIT_FAILED"}(o || (o = {}));
  const s = {
    account: {adspaceId: "cbc3b03b-422b-41d6-a091-2566ff5e891e", publicKey: "ed1b8d527cb8de1d2a8b2ddb566bdd45de9aadcd", highlight: {isActive: !0, data: {showImages: !0}}}, common: {
      version: "3.3.2",
      marketingId: 23,
      apiParameters: {resolveURL: "https://xapi.takeads.com/v1/resolve"},
      highlightSearchEngines: {
        google: {
          pathname: "/search",
          searchBlockPatterns: ["#res"],
          linkBlockPatterns: [".MjjYud"],
          linkPatterns: ["a:not([class])"],
          backgroundThemeCheckBlockPattern: "body",
          searchInputPatterns: ["input[name='q']"],
          partnershipLabelBlockPatterns: [".yuRUbf"],
          queryKeywordKeys: ["q"],
          queryPageKeys: ["start"],
          decodeNumberTimes: 1,
          positioning: {before: [".VwiC3b"]},
          ElementsParams: {
            parentBlock: {style: "float: left; margin-right: 10px;"},
            link: {target: "_blank", style: null},
            img: {style: "border: 2px solid #E1E1E1; padding: 1px; width: 90px; height: 45px; border-radius: 8px;"},
            partnershipParentBlock: {style: "display: flex; justify-content: space-between; line-height: 1; align-items: center; margin-left: 15px;"},
            partnershipLabel: {
              innerText: "Sponsored",
              style: "cursor: pointer; padding: 5px; border-radius: 4px; border: 1px solid; line-height: 1; display: inline-block; flex: 0 0 auto; text-decoration: none; font-size: 9px;"
            },
            partnershipLink: {innerText: "Learn More", href: "https://tatrck.com/dist/optOut.html", target: "_blank"}
          },
          specificParseRule: !1,
          hrefRegex: null
        }, yahoo: {
          pathname: "/search",
          searchBlockPatterns: ["#web"],
          linkBlockPatterns: [".dd.algo"],
          linkPatterns: [".title a"],
          backgroundThemeCheckBlockPattern: "html",
          searchInputPatterns: ["input[name='p']"],
          partnershipLabelBlockPatterns: [".wr-bw"],
          queryKeywordKeys: ["p"],
          queryPageKeys: ["pstart"],
          decodeNumberTimes: 1,
          positioning: {before: [".compText.aAbs"]},
          ElementsParams: {
            parentBlock: {style: "float: left; margin-right: 10px;"},
            link: {target: "_blank", style: null},
            img: {style: "padding: 1px; width: 90px; height: 45px; border-radius: 6px; box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05)"},
            partnershipParentBlock: {style: "display: flex; justify-content: space-between; line-height: 1; align-items: center; margin-left: 20px;"},
            partnershipLabel: {
              innerText: "Sponsored",
              style: "cursor: pointer; padding: 5px; border-radius: 4px; border: 1px solid; line-height: 1; display: inline-block; flex: 0 0 auto; text-decoration: none; font-size: 9px;"
            },
            partnershipLink: {innerText: "Learn More", href: "https://tatrck.com/dist/optOut.html", target: "_blank"}
          },
          specificParseRule: !0,
          hrefRegex: "\\/RU=(.*?)\\/RK"
        }, bing: {
          pathname: "/search",
          searchBlockPatterns: ["#b_results"],
          linkBlockPatterns: ["li.b_algo"],
          linkPatterns: ["h2 a"],
          backgroundThemeCheckBlockPattern: "html",
          searchInputPatterns: ["input[name='q']"],
          partnershipLabelBlockPatterns: [".tpcn"],
          queryKeywordKeys: ["q"],
          queryPageKeys: ["start"],
          decodeNumberTimes: 1,
          positioning: {before: [".b_caption"]},
          ElementsParams: {
            parentBlock: {style: "float: left; margin-right: 10px;"},
            link: {target: "_blank", style: null},
            img: {style: "padding: 1px; width: 90px; height: 45px; border-radius: 6px; box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05)"},
            partnershipParentBlock: {style: "display: flex; justify-content: space-between; line-height: 1; align-items: center; margin-left: 15px;"},
            partnershipLabel: {
              innerText: "Sponsored",
              style: "cursor: pointer; padding: 5px; border-radius: 4px; border: 1px solid; line-height: 1; display: inline-block; flex: 0 0 auto; text-decoration: none; font-size: 9px;"
            },
            partnershipLink: {innerText: "Learn More", href: "https://tatrck.com/dist/optOut.html", target: "_blank"}
          },
          specificParseRule: !1,
          hrefRegex: null
        }, yandex: {
          pathname: "/search/",
          searchBlockPatterns: [".content__left"],
          linkBlockPatterns: [".serp-item"],
          linkPatterns: ["a.organic__url"],
          backgroundThemeCheckBlockPattern: "body",
          searchInputPatterns: ["input.input__control[name='text']"],
          partnershipLabelBlockPatterns: [".organic__subtitle"],
          queryKeywordKeys: ["text"],
          queryPageKeys: ["p"],
          decodeNumberTimes: 1,
          positioning: {before: [".organic__text"]},
          ElementsParams: {
            parentBlock: {style: "float: left; margin-right: 10px;"},
            link: {target: "_blank", style: null},
            img: {style: "border: 2px solid #383838; padding: 1px; width: 90px; height: 45px; border-radius: 8px;"},
            partnershipParentBlock: {style: "display: flex; justify-content: space-between; line-height: 1; align-items: center; margin-left: 15px;"},
            partnershipLabel: {
              innerText: "Sponsored",
              style: "cursor: pointer; padding: 5px; border-radius: 4px; border: 1px solid; line-height: 1; display: inline-block; flex: 0 0 auto; text-decoration: none; font-size: 8px;"
            },
            partnershipLink: {innerText: "Learn More", href: "https://tatrck.com/dist/optOut.html", target: "_blank"}
          },
          specificParseRule: !1,
          hrefRegex: "^(https?://yabs(.*?)/)"
        }, rambler: {
          pathname: "/",
          searchBlockPatterns: [".LayoutSearch__serp--3LMVS"],
          linkBlockPatterns: [".Serp__item--NO2th"],
          linkPatterns: ["a.Serp__link--S29wB"],
          backgroundThemeCheckBlockPattern: ".rc__XaSn3",
          searchInputPatterns: ["input.input__control[name='text']"],
          partnershipLabelBlockPatterns: [".Serp__info--2EMHt"],
          queryKeywordKeys: ["query"],
          queryPageKeys: ["p"],
          decodeNumberTimes: 1,
          positioning: {before: [".Serp__snippet--2mmWu"]},
          ElementsParams: {
            parentBlock: {style: "float: left; margin-right: 10px;"},
            link: {target: "_blank", style: null},
            img: {style: "border: 2px solid #E1E1E1; padding: 1px; width: 90px; height: 45px; border-radius: 8px;"},
            partnershipParentBlock: {style: "display: flex; justify-content: space-between; line-height: 1; align-items: center; margin-left: 15px;"},
            partnershipLabel: {
              innerText: "Sponsored",
              style: "cursor: pointer; padding: 5px; border-radius: 4px; border: 1px solid; line-height: 1; display: inline-block; flex: 0 0 auto; text-decoration: none; font-size: 8px;"
            },
            partnershipLink: {innerText: "Learn More", href: "https://tatrck.com/dist/optOut.html", target: "_blank"}
          },
          specificParseRule: !1,
          hrefRegex: "^(https?://yabs(.*?)/)"
        }
      },
      optOut: {
        pageUrl: "https://tatrck.com/dist/optOut.html",
        blockPattern: ".content",
        titleOptOutEnabled: 'Ads are disabled in "{{extName}}"',
        titleOptOutDisabled: 'Ads are enabled in "{{extName}}"',
        description: 'By setting the toggle to "disabled", you can turn off monetization through ads for this extension. When the toggle is "enabled", we do not use personal data to display ads.',
        labelEnabled: "Enabled",
        labelDibabled: "Disabled"
      }
    }
  }, i = (e, t, r) => {
    if (!e) throw new Error(`addParamsToURL Error. Parameter "url" is not defined or is emty! url: "${e}"`);
    if ("string" != typeof e) throw new Error(`addParamsToURL Error. Wrong type of url: ${e}`);
    if (!t) throw new Error("addParamsToURL Error. Parameter key is not defined!");
    if ("string" != typeof t) throw new Error(`addParamsToURL Error. Wrong type of key: ${t}`);
    r = r.toString();
    const n = new URL(e);
    return n.searchParams.has(t) ? (n.searchParams.set(t, r), r.length || n.searchParams.delete(t)) : r.length && n.searchParams.append(t, r), n.toString()
  };
  const l = async (e, t, r = !1, n = null, a) => {
    if (!t) throw new Error('The key "publicKey" is ot defined!');
    const o = new Headers;
    o.append("Content-Type", "application/json"), o.append("Authorization", `Bearer ${t}`);
    const l = {iris: [...e], withImages: r, subId: a};
    if (n && Object.keys(n).length > 0) {
      try {
        const {queryString: e, serpProviderKey: t, languageCode: r} = n;
        if (!e) throw new Error('The "queryString" is not defined');
        if (!t) throw new Error('The "serpProviderKey" is not defined');
        if (!r) throw new Error('The "languageCode" is not defined');
        const a = {s: "TAKE_EXTENSION_SDK", p: t, q: e, c: null, l: r};
        l.reqId = (e => {
          const t = JSON.stringify(e), r = (3 - function (e) {
            let t = e.length;
            for (let r = e.length - 1; r >= 0; r--) {
              const n = e.charCodeAt(r);
              n > 127 && n <= 2047 ? t++ : n > 2047 && n <= 65535 && (t += 2), n >= 56320 && n <= 57343 && r--
            }
            return t
          }(t) % 3) % 3, n = btoa(unescape(encodeURIComponent(t))), a = (e => {
            let t = "";
            for (let r = 0; r < e.length; r += 2) r + 1 < e.length ? t += e[r + 1] + e[r] : t += e[r];
            return t
          })(n.substring(0, n.length - r));
          return String(r) + a
        })(a)
      } catch (e) {}
    }
    const p = {url: s.common.apiParameters.resolveURL, method: "put", headers: o, body: JSON.stringify(l)}, {data: d} = await (async e => {
      try {
        if (!e.hasOwnProperty("method")) throw new Error('The "method" parameter is not defined in "requestSkeleton"!');
        if ("string" != typeof e.method) throw new Error('The "requestSkeleton.method" parameter has wrong type! Expected: "string". Received: ' + typeof e.method);
        if (!e.hasOwnProperty("url")) throw new Error('The "method" parameter is not defined in "requestSkeleton"!');
        if ("string" != typeof e.url) throw new Error('The "requestSkeleton.url" parameter has wrong type! Expected: "string". Received: ' + typeof e.url);
        e.method = e.method.toUpperCase();
        const t = await fetch(e.url, {...e}), {status: r, statusText: n, url: a, ok: o} = t, s = Array.from(t.headers.entries()).reduce(((e, [t, r]) => (e[t] = r, e)), {});
        if (!(e => e >= 200 && e < 300)(r)) throw{ok: o, url: a, status: r, statusText: n, headers: s, data: null};
        return o ? {ok: o, url: a, status: r, statusText: n, headers: s, data: await t.json()} : {ok: o, url: a, status: r, statusText: n, headers: s, data: null}
      } catch (e) {
        if (e.status) throw e;
        throw new Error(`[sendRequest] Got error due to unexpected behaviour: ${e.message}`)
      }
    })(p), {data: c} = d;
    return c.forEach((e => {e.deeplink = i(e.deeplink, "m", s.common.marketingId)})), c
  }, p = "TakeSDK", d = "settings", c = e => {
    let t;
    const r = indexedDB.open(p, 1);
    r.onerror = () => {}, r.onsuccess = () => {
      t = r.result;
      const n = t.transaction(d, "readwrite");
      n.onerror = () => {};
      const a = n.objectStore(d);
      Object.entries(e).forEach((([e, t]) => {a.put(t, e).onerror = () => {}}))
    }
  };
  (() => {
    const e = indexedDB.open(p, 1);
    e.onerror = () => {}, e.onupgradeneeded = () => {e.result.createObjectStore(d)}
  })();
  const h = (e, t, r) => {chrome.tabs.sendMessage(e, {message: t, payload: {...r}})};
  chrome.runtime.onMessage.addListener((async (o, i) => {
    const {message: u, payload: g} = o, m = i.tab.id;
    switch (u) {
    case e: {
      const {location: e} = g, {hostname: r, pathname: n, origin: a} = e,
        o = r.split(".").find((e => {if (s.common.highlightSearchEngines.hasOwnProperty(e) && n.includes(s.common.highlightSearchEngines[e].pathname)) return s.common.highlightSearchEngines[e].pathname})),
        i = chrome.runtime.getManifest(), l = o ? s.common.highlightSearchEngines[o] : null, u = s.common.optOut.pageUrl === a + n ? {...s.common.optOut} : null;
      let b = await (async e => await new Promise((t => {
        let r;
        const n = indexedDB.open(p, 1);
        n.onerror = () => {}, n.onsuccess = () => {
          r = n.result;
          const a = r.transaction(d).objectStore(d).get(e);
          a.onerror = () => {}, a.onsuccess = () => {t(a.result)}
        }
      })))("optOutStatus");
      void 0 === b && (await c({optOutStatus: !1}), b = !1), h(m, t, {highlightConfiguration: l, account: s.account, manifest: i, optOutConfiguration: u, optOutStatus: b, serpProviderKey: o});
      break
    }
    case r: {
      const e = i.tab.id, {links: t, languageCode: r, serpProviderKey: a, searchText: o} = g, p = {languageCode: r, serpProviderKey: a, queryString: o}, d = await l(t, s.account.publicKey, !0, p);
      h(e, n, {offers: d});
      break
    }
    case a: {
      const {optOutStatus: e} = g;
      await c({optOutStatus: e});
      break
    }
    }
  }))
})();
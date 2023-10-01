(() => {
  "use strict";
  const e = class {
    config;

    constructor(e) {this.config = e}

    getQuerySearchText() {
      for (const e of this.config.queryKeywordKeys) {
        const t = new URLSearchParams(window.location.search).get(e);
        return t || null
      }
    }

    getQueryPage() {
      for (const e of this.config.queryPageKeys) {
        const t = new URLSearchParams(window.location.search).get(e);
        if (t) return t
      }
    }
  };
  const t = class {
    config;

    constructor(e) {this.config = e}

    getDOMElements() {
      const e = this.config.searchBlockPatterns;
      let t = null, n = null;
      for (const i of e) if (t = window.document.querySelector(i), t && (n = this.getLinkBlocks(t), n && n.elements[0].link && n.elements[0].pivotElement)) {
        return {
          searchBlock: {
            pattern: i,
            element: t
          }, linkBlocks: n
        }
      }
    }

    getLinkBlocks(e) {
      const t = this.config.linkBlockPatterns;
      for (const n of t) {
        const t = e.querySelectorAll(n);
        if (t.length) return t.forEach((e => {e.link = this.getLink(e), e.pivotElement = this.getPositioningPivot(e)})), {pattern: n, elements: t}
      }
    }

    getLink(e) {
      const t = this.config.linkPatterns;
      for (const n of t) {
        const t = e.querySelector(n);
        if (t && "A" === t.tagName) return {pattern: n, element: t}
      }
    }

    getPositioningPivot(e) {
      const {before: t = null, after: n = null} = this.config.positioning, i = t || n;
      for (const t of i) {
        const n = e.querySelector(t);
        if (n) return {pattern: t, element: n}
      }
    }

    getSearchInputText() {
      for (const e of this.config.searchInputPatterns) {
        const t = window.document.querySelector(e);
        if (t && t.value) return t.value
      }
      throw new Error("Elemnt on search input is not defined!")
    }
  };

  class n {
    config;

    constructor(e) {this.config = e}

    static parseHref(e, t) {
      const n = new RegExp(t), i = e.match(n);
      return i ? i[1] : e
    }

    static decodeHref(e, t) {
      for (let n = 0; n < t; n++) {
        const t = new URL(e);
        e = t.origin + t.pathname
      }
      return e
    }

    parseLinks(e) {
      const {decodeNumberTimes: t, specificParseRule: i, hrefRegex: o} = this.config, r = [];
      return e.forEach((e => {
        const {link: s} = e;
        if (!s) return;
        const a = n.decodeHref(s.element.href, t);
        r.push(i ? n.parseHref(a, o) : a)
      })), r
    }
  }

  const i = n;
  const o = class {
    variables;
    watchers;

    constructor() {this.variables = {}, this.watchers = []}

    addVariable(e, t) {this.variables[e] = t, Object.defineProperty(this, e, {get() {return this.variables[e]}, set(t) {this.variables[e] = t, this.notifyWatchers()}})}

    addWatcher(e) {this.watchers.push(e)}

    notifyWatchers() {this.watchers.forEach((e => e(this.variables)))}
  }, r = "Zb18261", s = "abda77e", a = "zd35713", c = "mdd3b28";
  const l = class {
    targetNode;
    popoverNode;
    container;
    watcher;
    contentNode;
    theme;

    constructor(e, t, n) {
      if (!e) throw new Error('The attribute "targetNode" is not defined!');
      this.targetNode = e, this.contentNode = t, this.theme = n ?? "light", this.watcher = new o, this.watcher.addVariable("isTargetHovered", !1), this.watcher.addVariable("isPopoverContentHovered", !1), this.watcher.addVariable("isPopoverShoving", !1), this.watcher.addWatcher(this.watchCallback.bind(this)), this.targetNode.addEventListener("mouseenter", (() => {this.watcher.isTargetHovered = !0})), this.targetNode.addEventListener("mouseleave", (() => {this.watcher.isTargetHovered = !1, setTimeout((() => {this.watcher.isPopoverContentHovered || this.destroyAll()}), 50)}))
    }

    render() {return this.targetNode}

    watchCallback(e) {
      const {isTargetHovered: t, isPopoverContentHovered: n, isPopoverShoving: i} = e;
      if (t || n || i) return !i && t ? this.init() : void 0
    }

    init() {
      this.watcher.isPopoverShoving = !0;
      const e = this.targetNode.getBoundingClientRect();
      this.container = Object.assign(document.createElement("div"), {style: "position: absolute;"}), this.container.classList.add(c);
      const t = Object.assign(document.createElement("span"), {className: a});
      t.classList.add(`${a}__${this.theme}`), this.container.appendChild(t), this.container.appendChild(this.contentNode), this.container.style.left = `${e.right + window.scrollX}px`, this.container.style.top = `${e.top + (e.bottom - e.top) / 2 + window.scrollY}px`, this.container.style.zIndex = "999", this.container.style.display = "flex", this.container.style.flexDirection = "row", document.body.style.position = "relative", document.body.appendChild(this.container), this.container.addEventListener("mouseenter", (() => {this.watcher.isPopoverContentHovered = !0})), this.container.addEventListener("mouseleave", (() => {this.watcher.isPopoverContentHovered = !1, setTimeout((() => {this.watcher.isTargetHovered || this.destroyAll()}), 50)}))
    }

    destroyAll() {document.querySelectorAll(`.${c}`).forEach((e => {e.remove()})), this.watcher.isPopoverShoving = !1}
  }, d = "GET_CONFIGURATION", h = "RECEIVE_CONFIGURATION_MESSAGE", g = "GET_OFFERS_MESSAGE", u = "RECEIVE_OFFERS_MESSAGE", p = "SET_OPT_OUT_MESSAGE", m = "TakeExtensionSDK", f = "TakeHighlighting";
  var w;
  !function (e) {e.INIT_INPROGRESS = "INIT_INPROGRESS", e.INIT_SUCCESS = "INIT_SUCCESS", e.INIT_FAILED = "INIT_FAILED"}(w || (w = {}));
  const b = class {
    href;
    config;
    searchElements;

    constructor(e, t) {this.config = e, this.searchElements = t}

    applyChanges(e) {
      const {specificParseRule: t, hrefRegex: n} = this.config, {linkBlocks: o} = this.searchElements, s = document.createElement("style");
      s.innerHTML = `\n\n      .${r} {\n        padding: 12px;\n        font-size: 10px;\n        transform: translate(0%, -50%);\n        box-shadow: 0 2px 4px 0 rgba(26,26,26,0.18),\n                    0 0 12px 0 rgba(26,26,26,0.06);\n        width: max-content;\n        max-width: 120px;\n        border-radius: 4px;\n        cursor: default;\n        z-index: 2;\n      }\n\n      .${r}__light {\n        background-color: #fff;\n      }\n\n      .${r}__dark {\n        background-color: #333;\n      }\n\n      .${a} {\n        transform: translate(0, -50%) rotate(90deg);\n        bottom: 0px;\n        left: 5px;\n        width: 16px;\n        height: 16px;\n        overflow: hidden;\n        pointer-events: none;\n        z-index: 3;\n        line-height: 1em;\n      }\n\n      .${a}::after {\n        box-shadow: 0 -2px 4px 0 rgba(26,26,26,0.18),\n                    0 0px 12px 0 rgba(26,26,26,0.06);\n\n        width: 12px;\n        height: 12px;\n        content: "";\n        position: absolute;\n        top: 0;\n        left: 50%;\n        transform: translate(-50%,-50%) rotate(45deg);\n\n      }\n\n      .${a}__light::after {\n        background-color: #fff;\n      }\n\n      .${a}__dark::after {\n        background-color: #333;\n      }\n    `, document.head.appendChild(s), o.elements.forEach((o => {
        if (!o.link) return;
        const {element: r} = o.link;
        r && e.forEach((e => {
          const s = t ? i.parseHref(r.href, n) : r.href, {deeplink: a, imageUrl: c, iri: l} = e, d = new URL(s), {highlight: {data: {showImages: h}}} = window[m].account;
          d.origin + d.pathname === l && (this.affiliateLinkAnchor(r, a), h && this.insertLogoIn(o, this.createLinkBlock(s, a, c)), this.insertPartnershipLabel(o))
        }))
      }))
    }

    insertPartnershipLabel(e) {
      const {partnershipLabelBlockPatterns: t} = this.config, n = window[m].theme;
      for (const i of t) {
        const t = e.querySelector(i);
        if (!t) return;
        const o = t;
        o.style = "display: flex; justify-content: space-between;";
        const a = Object.assign(document.createElement("div"), this.config.ElementsParams.partnershipLabel), c = Object.assign(document.createElement("div"), {className: r});
        c.classList.add(`${r}__${n}`);
        const d = document.createElement("div");
        d.className = s, d.innerText = `Ads on "${window[m]?.manifest.name}" are managed by our advertising partner`;
        const h = Object.assign(document.createElement("a"), this.config.ElementsParams.partnershipLink);
        c.appendChild(d), c.appendChild(h), new l(a, c, n).render();
        const g = Object.assign(document.createElement("div"), this.config.ElementsParams.partnershipParentBlock);
        g.append(a), o.append(g), t.parentNode.replaceChild(o, t)
      }
    }

    affiliateLinkAnchor(e, t) {
      const n = e.cloneNode(!0), i = this.addLinkEventListeners(n, t);
      e.parentNode && e.parentNode.contains(e) && e.parentNode.replaceChild(i, e)
    }

    addLinkEventListeners(e, t) {
      const n = e.getAttribute("href");
      if (n) {
        return e.taOriginalHref = n, e.taRestoreSwappedLink = () => {
          const t = e.taOriginalHref;
          t && e.setAttribute("href", t), delete e.taOriginalHref, delete e.taRestoreSwappedLink
        }, e.setAttribute("rel", "nofollow"), e.setAttribute("target", "_blank"), e.addEventListener("click", (() => {
          e.setAttribute("href", t);
          const n = setTimeout((() => {e.hasOwnProperty("taRestoreSwappedLink") && e.taRestoreSwappedLink && e.taRestoreSwappedLink(), clearTimeout(n)}), 500)
        })), e.addEventListener("auxclick", (() => {
          e.setAttribute("href", t);
          const n = setTimeout((() => {e.hasOwnProperty("taRestoreSwappedLink") && e.taRestoreSwappedLink && e.taRestoreSwappedLink(), clearTimeout(n)}), 500)
        })), e
      }
    }

    createLinkBlock(e, t, n) {
      const {parentBlock: i, link: o, img: r} = this.config.ElementsParams, s = Object.assign(document.createElement("div"), i), a = Object.assign(document.createElement("a"), o, {href: e}),
        c = Object.assign(document.createElement("img"), r, {src: n});
      return a.appendChild(c), s.appendChild(this.addLinkEventListeners(a, t)), s
    }

    insertLogoIn(e, t) {
      const {before: n = null} = this.config.positioning;
      if (!e.pivotElement) return;
      const {element: i} = e.pivotElement, o = n ? i : i.nextSibling;
      i.parentNode.insertBefore(t, o)
    }
  };
  const v = e => {
    const t = document.querySelector(e);
    if (!t) return null;
    var n;
    return function (e) {
      const t = e.match(/\d+/g);
      if (t) {
        const [e, n, i] = t.map((e => parseInt(e, 10)));
        return (299 * e + 587 * n + 114 * i) / 1e3 < 128 ? "dark" : "light"
      }
      return null
    }((n = t, window.getComputedStyle(n).backgroundColor))
  };
  const y = class {
    targetElement;
    handleChangeValue;
    container;
    containerUniqueRoleAttr;
    value;
    label;
    options;
    stylesToggleChecked;
    stylesToggleUnchecked;

    constructor(e, t, n, i, o) {
      e && (this.targetElement = e, this.handleChangeValue = i, this.value = t, this.label = n, this.stylesToggleChecked = o?.stylesToggleChecked ?? "", this.stylesToggleUnchecked = o?.stylesToggleUnchecked ?? "", this.containerUniqueRoleAttr = `switch-${(e => {
        const t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        let n = "";
        for (let i = 0; i < e; i++) {
          const e = Math.floor(52 * Math.random());
          n += t.charAt(e)
        }
        return n
      })(5)}`)
    }

    onKeydown(e) {"Enter" !== e.key && " " !== e.key || (e.preventDefault(), this.toggleStatus())}

    setLabel(e) {
      const t = this.container.children[0];
      t instanceof HTMLSpanElement && (t.innerText = e)
    }

    toggleStatus() {
      const e = "true" === this.container.getAttribute("aria-checked"), t = String(!e), n = "false" !== t && "true" === t;
      this.container.setAttribute("aria-checked", n.toString()), this.handleChangeValue(n)
    }

    init() {
      this.container = Object.assign(document.createElement("div"), {style: "position: relative; cursor: pointer"}), this.container.setAttribute("role", this.containerUniqueRoleAttr), this.container.setAttribute("aria-checked", this.value.toString()), this.container.addEventListener("click", (() => this.toggleStatus())), this.container.addEventListener("keydown", (e => this.onKeydown(e)));
      const e = Object.assign(document.createElement("span"), {innerText: this.label});
      this.container.appendChild(e), this.container.appendChild(document.createElement("span"));
      const t = document.createElement("style");
      t.innerHTML = `\n    :root {\n      --toggle-circle-size: 1.5rem;\n      --toggle-spacing: 0.125rem;\n      --toggle-height: calc(var(--toggle-circle-size) + calc(2 * var(--toggle-spacing)));\n      --toggle-width: calc(2 * calc(var(--toggle-circle-size) + var(--toggle-spacing)));\n      --toggle-border-radius: calc(var(--toggle-height) / 2);\n    }\n    [role^="${this.containerUniqueRoleAttr}"] {\n      display: flex;\n      flex-direction: row;\n      align-items: center;\n      outline: none;\n      user-select: none;\n    }\n    [role^="${this.containerUniqueRoleAttr}"] span:first-child {\n      width: 100%;\n      margin-right: 5px;\n      font-weight: 600;\n    }\n    [role^="${this.containerUniqueRoleAttr}"] span:last-child {\n      display: block;\n      box-sizing: border-box;\n      flex-shrink: 0;\n      padding: var(--toggle-spacing);\n      width: var(--toggle-width);\n      height: var(--toggle-height);\n      border-radius: var(--toggle-border-radius);\n      background: #ccc;\n      transition: background cubic-bezier(0.23, 1, 0.32, 1) 0.4s;\n      ${this.stylesToggleUnchecked ? this.stylesToggleUnchecked : ""}\n    }\n    [role^="${this.containerUniqueRoleAttr}"] span:last-child::before {\n      display: block;\n      width: var(--toggle-circle-size);\n      height: var(--toggle-circle-size);\n      border-radius: 50%;\n      background: #fff;\n      transition: transform cubic-bezier(0.23, 1, 0.32, 1) 0.4s;\n      content: '';\n    }\n    [role^="${this.containerUniqueRoleAttr}"][aria-checked="true"] span:last-child {\n      background: #22AB34;\n      ${this.stylesToggleChecked ? this.stylesToggleChecked : ""}\n    }\n    [role^="${this.containerUniqueRoleAttr}"][aria-checked="true"] span:last-child::before {\n      transform: translateX(var(--toggle-circle-size));\n    }\n    [role^="${this.containerUniqueRoleAttr}"]:focus span:last-child {\n      box-shadow: 0 0 0 1px #fff, 0 0 0 2px #999;\n    }\n    [role^="${this.containerUniqueRoleAttr}"] + [role^="${this.containerUniqueRoleAttr}"] {\n      margin-top: 1em;\n    }\n    `, document.head.appendChild(t), this.targetElement.replaceWith(this.container)
    }

    render() {return this.init()}
  };
  String.prototype.interpolationText = function (e) {return this.replace(/\{\{(\w+)\}\}/g, ((t, n) => e[n] || t))};
  String.prototype.interpolationText;
  const k = async () => {
    const {highlightConfiguration: n, location: o, account: r, optOutStatus: s, serpProviderKey: a} = window[m];
    if (!n) return;
    if (!r.highlight.isActive) return;
    if (s) return;
    if (document.head.querySelector(`meta[name="${f}"]`)) return;
    const c = Object.assign(document.createElement("meta"), {name: f, content: (new Date).toISOString()});
    document.head.appendChild(c);
    const l = new e(n), d = new t(n).getDOMElements(), h = {pageNumber: l.getQueryPage(), searchText: l.getQuerySearchText(), ...d};
    window[m].searchElements = h;
    const {linkBlocks: p, searchText: w, pageNumber: v} = h, y = new i(n).parseLinks(p.elements);
    let k = null;
    try {k = Intl.getCanonicalLocales([navigator.language])[0].split("-")[0]} catch (e) {}
    chrome.runtime.sendMessage({
      message: g,
      payload: {location: o, searchText: w, pageNumber: v, links: y, serpProviderKey: a, languageCode: k}
    }), chrome.runtime.onMessage.addListener((async e => {
      if (e.message === u) {
        const {payload: t} = e;
        if (!t.hasOwnProperty("offers")) throw new Error("The offers is not defined!");
        !function (e) {
          const {highlightConfiguration: t, searchElements: n} = window[m];
          new b(t, n).applyChanges(e)
        }(t.offers)
      }
    }))
  }, E = () => {
    const {optOutConfiguration: e, account: t, optOutStatus: n, manifest: {name: i, version: o}} = window[m], r = !n;
    if (!e) return;
    const {blockPattern: s, titleOptOutEnabled: a, titleOptOutDisabled: c, description: l, labelEnabled: d, labelDibabled: h} = e, g = document.querySelector(s);
    if (!g) return;
    const u = e => {
        let t = e.toLowerCase();
        return t = t.replace(/[^a-z0-9\s]/g, ""), t = t.replace(/\s+/g, "-"), t
      },
      f = Object.assign(document.createElement("div"), {style: "\n        position: relative;\n        width: 100%;\n        padding: 20px;\n        border: 1px solid;\n        border-radius: 8px;\n        margin-top: 15px;\n        margin-bottom: 15px;\n        border-left: 10px solid;\n      "});
    f.style.borderColor = r ? "inherit" : "#ff0000";
    const w = Object.assign(document.createElement("div"), {style: "\n        font-size: 16px;\n        font-weight: 600;\n        margin-bottom: 15px;\n      "});
    f.appendChild(w), w.innerText = r ? c.interpolationText({extName: i}) : a.interpolationText({extName: i});
    const b = Object.assign(document.createElement("div"), {innerText: l, style: "\n        margin-right: 20px;\n      "}), v = document.createElement("div"),
      k = Object.assign(document.createElement("div"), {style: "\n        display: flex;\n        width: 100%;\n        font-size: 12px;\n        align-items: center;\n      "});
    k.appendChild(b), k.appendChild(v), f.appendChild(k), g.appendChild(f);
    const E = "opt-out_";
    const x = n ? h : d;
    new y(v, r, x, (function (e) {
      const n = !e;
      chrome.runtime.sendMessage({
        message: p,
        payload: {optOutStatus: n}
      }), e ? (this.setLabel(d), f.style.borderColor = "inherit", w.innerText = c.interpolationText({extName: i})) : (this.setLabel(h), f.style.borderColor = "#ff0000", w.innerText = a.interpolationText({extName: i}));
      const r = document.querySelector(`meta[name="${E}${u(i)}"]`), s = n ? h : d;
      r && r.setAttribute("content", `extVersion=${o}, adspaceId=${t.adspaceId}, value=${s.toLowerCase()}`)
    }), {stylesToggleUnchecked: "background: #ff0000;", stylesToggleChecked: "background: #ccc;"}).render();
    const S = document.createElement("meta");
    S.setAttribute("name", `${E}${u(i)}`), S.setAttribute("content", `extVersion=${o}, adspaceId=${t.adspaceId}, value=${x.toLowerCase()}`), document.head.appendChild(S)
  };
  !async function () {
    const e = function () {
      let e = null;
      const t = async () => {
        e = async function () {
          try {
            await (async () => await new Promise(((e, t) => {
              const n = {
                origin: window.location.origin,
                hostname: window.location.hostname,
                pathname: window.location.pathname,
                href: window.location.pathname
              };
              window[m].location = n, chrome.runtime.sendMessage({
                message: d,
                payload: {location: n}
              }), chrome.runtime.onMessage.addListener((async t => {
                if (t.message === h) {
                  const {
                    payload: {
                      highlightConfiguration: n,
                      account: i,
                      manifest: o,
                      optOutConfiguration: r,
                      optOutStatus: s,
                      serpProviderKey: a
                    }
                  } = t;
                  return window[m].highlightConfiguration = n, window[m].account = i, window[m].manifest = o, window[m].optOutConfiguration = r, window[m].optOutStatus = s, window[m].serpProviderKey = a, e()
                }
              })), setTimeout((() => {t("Reject init configuration timeout")}), 3e4)
            })))(), E(), (() => {
              const {highlightConfiguration: e} = window[m];
              if (!e) return;
              const t = v(e.backgroundThemeCheckBlockPattern) ?? "light";
              window[m].theme = t
            })(), k(), window[m].status = w.INIT_SUCCESS
          } catch (e) {window[m].status = w.INIT_FAILED}
        }
      };
      return {run: async () => (e || await t(), e)}
    }();
    window[m] = {}, window[m].status = w.INIT_INPROGRESS, (await e.run())()
  }()
})();
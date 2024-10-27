function As(i, e) {
  for (var o = 0; o < e.length; o++) {
    const t = e[o];
    if (typeof t != "string" && !Array.isArray(t)) {
      for (const a in t)
        if (a !== "default" && !(a in i)) {
          const s = Object.getOwnPropertyDescriptor(t, a);
          s && Object.defineProperty(i, a, s.get ? s : {
            enumerable: !0,
            get: () => t[a]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(i, Symbol.toStringTag, { value: "Module" }));
}
try {
  self["workbox:core:6.5.4"] && _();
} catch {
}
const Ts = (i, ...e) => {
  let o = i;
  return e.length > 0 && (o += ` :: ${JSON.stringify(e)}`), o;
}, Rs = Ts;
class X extends Error {
  /**
   *
   * @param {string} errorCode The error code that
   * identifies this particular error.
   * @param {Object=} details Any relevant arguments
   * that will help developers identify issues should
   * be added as a key on the context object.
   */
  constructor(e, o) {
    const t = Rs(e, o);
    super(t), this.name = e, this.details = o;
  }
}
const ye = {
  googleAnalytics: "googleAnalytics",
  precache: "precache-v2",
  prefix: "workbox",
  runtime: "runtime",
  suffix: typeof registration < "u" ? registration.scope : ""
}, Po = (i) => [ye.prefix, i, ye.suffix].filter((e) => e && e.length > 0).join("-"), Cs = (i) => {
  for (const e of Object.keys(ye))
    i(e);
}, mo = {
  updateDetails: (i) => {
    Cs((e) => {
      typeof i[e] == "string" && (ye[e] = i[e]);
    });
  },
  getGoogleAnalyticsName: (i) => i || Po(ye.googleAnalytics),
  getPrecacheName: (i) => i || Po(ye.precache),
  getPrefix: () => ye.prefix,
  getRuntimeName: (i) => i || Po(ye.runtime),
  getSuffix: () => ye.suffix
};
function Nt(i, e) {
  const o = e();
  return i.waitUntil(o), o;
}
try {
  self["workbox:precaching:6.5.4"] && _();
} catch {
}
const Ns = "__WB_REVISION__";
function Ds(i) {
  if (!i)
    throw new X("add-to-cache-list-unexpected-type", { entry: i });
  if (typeof i == "string") {
    const s = new URL(i, location.href);
    return {
      cacheKey: s.href,
      url: s.href
    };
  }
  const { revision: e, url: o } = i;
  if (!o)
    throw new X("add-to-cache-list-unexpected-type", { entry: i });
  if (!e) {
    const s = new URL(o, location.href);
    return {
      cacheKey: s.href,
      url: s.href
    };
  }
  const t = new URL(o, location.href), a = new URL(o, location.href);
  return t.searchParams.set(Ns, e), {
    cacheKey: t.href,
    url: a.href
  };
}
class Ls {
  constructor() {
    this.updatedURLs = [], this.notUpdatedURLs = [], this.handlerWillStart = async ({ request: e, state: o }) => {
      o && (o.originalRequest = e);
    }, this.cachedResponseWillBeUsed = async ({ event: e, state: o, cachedResponse: t }) => {
      if (e.type === "install" && o && o.originalRequest && o.originalRequest instanceof Request) {
        const a = o.originalRequest.url;
        t ? this.notUpdatedURLs.push(a) : this.updatedURLs.push(a);
      }
      return t;
    };
  }
}
class Is {
  constructor({ precacheController: e }) {
    this.cacheKeyWillBeUsed = async ({ request: o, params: t }) => {
      const a = (t == null ? void 0 : t.cacheKey) || this._precacheController.getCacheKeyForURL(o.url);
      return a ? new Request(a, { headers: o.headers }) : o;
    }, this._precacheController = e;
  }
}
let si;
function Ks() {
  if (si === void 0) {
    const i = new Response("");
    if ("body" in i)
      try {
        new Response(i.body), si = !0;
      } catch {
        si = !1;
      }
    si = !1;
  }
  return si;
}
async function Us(i, e) {
  let o = null;
  if (i.url && (o = new URL(i.url).origin), o !== self.location.origin)
    throw new X("cross-origin-copy-response", { origin: o });
  const t = i.clone(), a = {
    headers: new Headers(t.headers),
    status: t.status,
    statusText: t.statusText
  }, s = e ? e(a) : a, n = Ks() ? t.body : await t.blob();
  return new Response(n, s);
}
const qs = (i) => new URL(String(i), location.href).href.replace(new RegExp(`^${location.origin}`), "");
function Dt(i, e) {
  const o = new URL(i);
  for (const t of e)
    o.searchParams.delete(t);
  return o.href;
}
async function Ms(i, e, o, t) {
  const a = Dt(e.url, o);
  if (e.url === a)
    return i.match(e, t);
  const s = Object.assign(Object.assign({}, t), { ignoreSearch: !0 }), n = await i.keys(e, s);
  for (const r of n) {
    const c = Dt(r.url, o);
    if (a === c)
      return i.match(r, t);
  }
}
class $s {
  /**
   * Creates a promise and exposes its resolve and reject functions as methods.
   */
  constructor() {
    this.promise = new Promise((e, o) => {
      this.resolve = e, this.reject = o;
    });
  }
}
const zs = /* @__PURE__ */ new Set();
async function Hs() {
  for (const i of zs)
    await i();
}
function Vs(i) {
  return new Promise((e) => setTimeout(e, i));
}
try {
  self["workbox:strategies:6.5.4"] && _();
} catch {
}
function Ti(i) {
  return typeof i == "string" ? new Request(i) : i;
}
class Ws {
  /**
   * Creates a new instance associated with the passed strategy and event
   * that's handling the request.
   *
   * The constructor also initializes the state that will be passed to each of
   * the plugins handling this request.
   *
   * @param {workbox-strategies.Strategy} strategy
   * @param {Object} options
   * @param {Request|string} options.request A request to run this strategy for.
   * @param {ExtendableEvent} options.event The event associated with the
   *     request.
   * @param {URL} [options.url]
   * @param {*} [options.params] The return value from the
   *     {@link workbox-routing~matchCallback} (if applicable).
   */
  constructor(e, o) {
    this._cacheKeys = {}, Object.assign(this, o), this.event = o.event, this._strategy = e, this._handlerDeferred = new $s(), this._extendLifetimePromises = [], this._plugins = [...e.plugins], this._pluginStateMap = /* @__PURE__ */ new Map();
    for (const t of this._plugins)
      this._pluginStateMap.set(t, {});
    this.event.waitUntil(this._handlerDeferred.promise);
  }
  /**
   * Fetches a given request (and invokes any applicable plugin callback
   * methods) using the `fetchOptions` (for non-navigation requests) and
   * `plugins` defined on the `Strategy` object.
   *
   * The following plugin lifecycle methods are invoked when using this method:
   * - `requestWillFetch()`
   * - `fetchDidSucceed()`
   * - `fetchDidFail()`
   *
   * @param {Request|string} input The URL or request to fetch.
   * @return {Promise<Response>}
   */
  async fetch(e) {
    const { event: o } = this;
    let t = Ti(e);
    if (t.mode === "navigate" && o instanceof FetchEvent && o.preloadResponse) {
      const n = await o.preloadResponse;
      if (n)
        return n;
    }
    const a = this.hasCallback("fetchDidFail") ? t.clone() : null;
    try {
      for (const n of this.iterateCallbacks("requestWillFetch"))
        t = await n({ request: t.clone(), event: o });
    } catch (n) {
      if (n instanceof Error)
        throw new X("plugin-error-request-will-fetch", {
          thrownErrorMessage: n.message
        });
    }
    const s = t.clone();
    try {
      let n;
      n = await fetch(t, t.mode === "navigate" ? void 0 : this._strategy.fetchOptions);
      for (const r of this.iterateCallbacks("fetchDidSucceed"))
        n = await r({
          event: o,
          request: s,
          response: n
        });
      return n;
    } catch (n) {
      throw a && await this.runCallbacks("fetchDidFail", {
        error: n,
        event: o,
        originalRequest: a.clone(),
        request: s.clone()
      }), n;
    }
  }
  /**
   * Calls `this.fetch()` and (in the background) runs `this.cachePut()` on
   * the response generated by `this.fetch()`.
   *
   * The call to `this.cachePut()` automatically invokes `this.waitUntil()`,
   * so you do not have to manually call `waitUntil()` on the event.
   *
   * @param {Request|string} input The request or URL to fetch and cache.
   * @return {Promise<Response>}
   */
  async fetchAndCachePut(e) {
    const o = await this.fetch(e), t = o.clone();
    return this.waitUntil(this.cachePut(e, t)), o;
  }
  /**
   * Matches a request from the cache (and invokes any applicable plugin
   * callback methods) using the `cacheName`, `matchOptions`, and `plugins`
   * defined on the strategy object.
   *
   * The following plugin lifecycle methods are invoked when using this method:
   * - cacheKeyWillByUsed()
   * - cachedResponseWillByUsed()
   *
   * @param {Request|string} key The Request or URL to use as the cache key.
   * @return {Promise<Response|undefined>} A matching response, if found.
   */
  async cacheMatch(e) {
    const o = Ti(e);
    let t;
    const { cacheName: a, matchOptions: s } = this._strategy, n = await this.getCacheKey(o, "read"), r = Object.assign(Object.assign({}, s), { cacheName: a });
    t = await caches.match(n, r);
    for (const c of this.iterateCallbacks("cachedResponseWillBeUsed"))
      t = await c({
        cacheName: a,
        matchOptions: s,
        cachedResponse: t,
        request: n,
        event: this.event
      }) || void 0;
    return t;
  }
  /**
   * Puts a request/response pair in the cache (and invokes any applicable
   * plugin callback methods) using the `cacheName` and `plugins` defined on
   * the strategy object.
   *
   * The following plugin lifecycle methods are invoked when using this method:
   * - cacheKeyWillByUsed()
   * - cacheWillUpdate()
   * - cacheDidUpdate()
   *
   * @param {Request|string} key The request or URL to use as the cache key.
   * @param {Response} response The response to cache.
   * @return {Promise<boolean>} `false` if a cacheWillUpdate caused the response
   * not be cached, and `true` otherwise.
   */
  async cachePut(e, o) {
    const t = Ti(e);
    await Vs(0);
    const a = await this.getCacheKey(t, "write");
    if (!o)
      throw new X("cache-put-with-no-response", {
        url: qs(a.url)
      });
    const s = await this._ensureResponseSafeToCache(o);
    if (!s)
      return !1;
    const { cacheName: n, matchOptions: r } = this._strategy, c = await self.caches.open(n), l = this.hasCallback("cacheDidUpdate"), u = l ? await Ms(
      // TODO(philipwalton): the `__WB_REVISION__` param is a precaching
      // feature. Consider into ways to only add this behavior if using
      // precaching.
      c,
      a.clone(),
      ["__WB_REVISION__"],
      r
    ) : null;
    try {
      await c.put(a, l ? s.clone() : s);
    } catch (d) {
      if (d instanceof Error)
        throw d.name === "QuotaExceededError" && await Hs(), d;
    }
    for (const d of this.iterateCallbacks("cacheDidUpdate"))
      await d({
        cacheName: n,
        oldResponse: u,
        newResponse: s.clone(),
        request: a,
        event: this.event
      });
    return !0;
  }
  /**
   * Checks the list of plugins for the `cacheKeyWillBeUsed` callback, and
   * executes any of those callbacks found in sequence. The final `Request`
   * object returned by the last plugin is treated as the cache key for cache
   * reads and/or writes. If no `cacheKeyWillBeUsed` plugin callbacks have
   * been registered, the passed request is returned unmodified
   *
   * @param {Request} request
   * @param {string} mode
   * @return {Promise<Request>}
   */
  async getCacheKey(e, o) {
    const t = `${e.url} | ${o}`;
    if (!this._cacheKeys[t]) {
      let a = e;
      for (const s of this.iterateCallbacks("cacheKeyWillBeUsed"))
        a = Ti(await s({
          mode: o,
          request: a,
          event: this.event,
          // params has a type any can't change right now.
          params: this.params
          // eslint-disable-line
        }));
      this._cacheKeys[t] = a;
    }
    return this._cacheKeys[t];
  }
  /**
   * Returns true if the strategy has at least one plugin with the given
   * callback.
   *
   * @param {string} name The name of the callback to check for.
   * @return {boolean}
   */
  hasCallback(e) {
    for (const o of this._strategy.plugins)
      if (e in o)
        return !0;
    return !1;
  }
  /**
   * Runs all plugin callbacks matching the given name, in order, passing the
   * given param object (merged ith the current plugin state) as the only
   * argument.
   *
   * Note: since this method runs all plugins, it's not suitable for cases
   * where the return value of a callback needs to be applied prior to calling
   * the next callback. See
   * {@link workbox-strategies.StrategyHandler#iterateCallbacks}
   * below for how to handle that case.
   *
   * @param {string} name The name of the callback to run within each plugin.
   * @param {Object} param The object to pass as the first (and only) param
   *     when executing each callback. This object will be merged with the
   *     current plugin state prior to callback execution.
   */
  async runCallbacks(e, o) {
    for (const t of this.iterateCallbacks(e))
      await t(o);
  }
  /**
   * Accepts a callback and returns an iterable of matching plugin callbacks,
   * where each callback is wrapped with the current handler state (i.e. when
   * you call each callback, whatever object parameter you pass it will
   * be merged with the plugin's current state).
   *
   * @param {string} name The name fo the callback to run
   * @return {Array<Function>}
   */
  *iterateCallbacks(e) {
    for (const o of this._strategy.plugins)
      if (typeof o[e] == "function") {
        const t = this._pluginStateMap.get(o);
        yield (s) => {
          const n = Object.assign(Object.assign({}, s), { state: t });
          return o[e](n);
        };
      }
  }
  /**
   * Adds a promise to the
   * [extend lifetime promises]{@link https://w3c.github.io/ServiceWorker/#extendableevent-extend-lifetime-promises}
   * of the event event associated with the request being handled (usually a
   * `FetchEvent`).
   *
   * Note: you can await
   * {@link workbox-strategies.StrategyHandler~doneWaiting}
   * to know when all added promises have settled.
   *
   * @param {Promise} promise A promise to add to the extend lifetime promises
   *     of the event that triggered the request.
   */
  waitUntil(e) {
    return this._extendLifetimePromises.push(e), e;
  }
  /**
   * Returns a promise that resolves once all promises passed to
   * {@link workbox-strategies.StrategyHandler~waitUntil}
   * have settled.
   *
   * Note: any work done after `doneWaiting()` settles should be manually
   * passed to an event's `waitUntil()` method (not this handler's
   * `waitUntil()` method), otherwise the service worker thread my be killed
   * prior to your work completing.
   */
  async doneWaiting() {
    let e;
    for (; e = this._extendLifetimePromises.shift(); )
      await e;
  }
  /**
   * Stops running the strategy and immediately resolves any pending
   * `waitUntil()` promises.
   */
  destroy() {
    this._handlerDeferred.resolve(null);
  }
  /**
   * This method will call cacheWillUpdate on the available plugins (or use
   * status === 200) to determine if the Response is safe and valid to cache.
   *
   * @param {Request} options.request
   * @param {Response} options.response
   * @return {Promise<Response|undefined>}
   *
   * @private
   */
  async _ensureResponseSafeToCache(e) {
    let o = e, t = !1;
    for (const a of this.iterateCallbacks("cacheWillUpdate"))
      if (o = await a({
        request: this.request,
        response: o,
        event: this.event
      }) || void 0, t = !0, !o)
        break;
    return t || o && o.status !== 200 && (o = void 0), o;
  }
}
class Ea {
  /**
   * Creates a new instance of the strategy and sets all documented option
   * properties as public instance properties.
   *
   * Note: if a custom strategy class extends the base Strategy class and does
   * not need more than these properties, it does not need to define its own
   * constructor.
   *
   * @param {Object} [options]
   * @param {string} [options.cacheName] Cache name to store and retrieve
   * requests. Defaults to the cache names provided by
   * {@link workbox-core.cacheNames}.
   * @param {Array<Object>} [options.plugins] [Plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}
   * to use in conjunction with this caching strategy.
   * @param {Object} [options.fetchOptions] Values passed along to the
   * [`init`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters)
   * of [non-navigation](https://github.com/GoogleChrome/workbox/issues/1796)
   * `fetch()` requests made by this strategy.
   * @param {Object} [options.matchOptions] The
   * [`CacheQueryOptions`]{@link https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions}
   * for any `cache.match()` or `cache.put()` calls made by this strategy.
   */
  constructor(e = {}) {
    this.cacheName = mo.getRuntimeName(e.cacheName), this.plugins = e.plugins || [], this.fetchOptions = e.fetchOptions, this.matchOptions = e.matchOptions;
  }
  /**
   * Perform a request strategy and returns a `Promise` that will resolve with
   * a `Response`, invoking all relevant plugin callbacks.
   *
   * When a strategy instance is registered with a Workbox
   * {@link workbox-routing.Route}, this method is automatically
   * called when the route matches.
   *
   * Alternatively, this method can be used in a standalone `FetchEvent`
   * listener by passing it to `event.respondWith()`.
   *
   * @param {FetchEvent|Object} options A `FetchEvent` or an object with the
   *     properties listed below.
   * @param {Request|string} options.request A request to run this strategy for.
   * @param {ExtendableEvent} options.event The event associated with the
   *     request.
   * @param {URL} [options.url]
   * @param {*} [options.params]
   */
  handle(e) {
    const [o] = this.handleAll(e);
    return o;
  }
  /**
   * Similar to {@link workbox-strategies.Strategy~handle}, but
   * instead of just returning a `Promise` that resolves to a `Response` it
   * it will return an tuple of `[response, done]` promises, where the former
   * (`response`) is equivalent to what `handle()` returns, and the latter is a
   * Promise that will resolve once any promises that were added to
   * `event.waitUntil()` as part of performing the strategy have completed.
   *
   * You can await the `done` promise to ensure any extra work performed by
   * the strategy (usually caching responses) completes successfully.
   *
   * @param {FetchEvent|Object} options A `FetchEvent` or an object with the
   *     properties listed below.
   * @param {Request|string} options.request A request to run this strategy for.
   * @param {ExtendableEvent} options.event The event associated with the
   *     request.
   * @param {URL} [options.url]
   * @param {*} [options.params]
   * @return {Array<Promise>} A tuple of [response, done]
   *     promises that can be used to determine when the response resolves as
   *     well as when the handler has completed all its work.
   */
  handleAll(e) {
    e instanceof FetchEvent && (e = {
      event: e,
      request: e.request
    });
    const o = e.event, t = typeof e.request == "string" ? new Request(e.request) : e.request, a = "params" in e ? e.params : void 0, s = new Ws(this, { event: o, request: t, params: a }), n = this._getResponse(s, t, o), r = this._awaitComplete(n, s, t, o);
    return [n, r];
  }
  async _getResponse(e, o, t) {
    await e.runCallbacks("handlerWillStart", { event: t, request: o });
    let a;
    try {
      if (a = await this._handle(o, e), !a || a.type === "error")
        throw new X("no-response", { url: o.url });
    } catch (s) {
      if (s instanceof Error) {
        for (const n of e.iterateCallbacks("handlerDidError"))
          if (a = await n({ error: s, event: t, request: o }), a)
            break;
      }
      if (!a)
        throw s;
    }
    for (const s of e.iterateCallbacks("handlerWillRespond"))
      a = await s({ event: t, request: o, response: a });
    return a;
  }
  async _awaitComplete(e, o, t, a) {
    let s, n;
    try {
      s = await e;
    } catch {
    }
    try {
      await o.runCallbacks("handlerDidRespond", {
        event: a,
        request: t,
        response: s
      }), await o.doneWaiting();
    } catch (r) {
      r instanceof Error && (n = r);
    }
    if (await o.runCallbacks("handlerDidComplete", {
      event: a,
      request: t,
      response: s,
      error: n
    }), o.destroy(), n)
      throw n;
  }
}
class Fe extends Ea {
  /**
   *
   * @param {Object} [options]
   * @param {string} [options.cacheName] Cache name to store and retrieve
   * requests. Defaults to the cache names provided by
   * {@link workbox-core.cacheNames}.
   * @param {Array<Object>} [options.plugins] {@link https://developers.google.com/web/tools/workbox/guides/using-plugins|Plugins}
   * to use in conjunction with this caching strategy.
   * @param {Object} [options.fetchOptions] Values passed along to the
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters|init}
   * of all fetch() requests made by this strategy.
   * @param {Object} [options.matchOptions] The
   * {@link https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions|CacheQueryOptions}
   * for any `cache.match()` or `cache.put()` calls made by this strategy.
   * @param {boolean} [options.fallbackToNetwork=true] Whether to attempt to
   * get the response from the network if there's a precache miss.
   */
  constructor(e = {}) {
    e.cacheName = mo.getPrecacheName(e.cacheName), super(e), this._fallbackToNetwork = e.fallbackToNetwork !== !1, this.plugins.push(Fe.copyRedirectedCacheableResponsesPlugin);
  }
  /**
   * @private
   * @param {Request|string} request A request to run this strategy for.
   * @param {workbox-strategies.StrategyHandler} handler The event that
   *     triggered the request.
   * @return {Promise<Response>}
   */
  async _handle(e, o) {
    const t = await o.cacheMatch(e);
    return t || (o.event && o.event.type === "install" ? await this._handleInstall(e, o) : await this._handleFetch(e, o));
  }
  async _handleFetch(e, o) {
    let t;
    const a = o.params || {};
    if (this._fallbackToNetwork) {
      const s = a.integrity, n = e.integrity, r = !n || n === s;
      t = await o.fetch(new Request(e, {
        integrity: e.mode !== "no-cors" ? n || s : void 0
      })), s && r && e.mode !== "no-cors" && (this._useDefaultCacheabilityPluginIfNeeded(), await o.cachePut(e, t.clone()));
    } else
      throw new X("missing-precache-entry", {
        cacheName: this.cacheName,
        url: e.url
      });
    return t;
  }
  async _handleInstall(e, o) {
    this._useDefaultCacheabilityPluginIfNeeded();
    const t = await o.fetch(e);
    if (!await o.cachePut(e, t.clone()))
      throw new X("bad-precaching-response", {
        url: e.url,
        status: t.status
      });
    return t;
  }
  /**
   * This method is complex, as there a number of things to account for:
   *
   * The `plugins` array can be set at construction, and/or it might be added to
   * to at any time before the strategy is used.
   *
   * At the time the strategy is used (i.e. during an `install` event), there
   * needs to be at least one plugin that implements `cacheWillUpdate` in the
   * array, other than `copyRedirectedCacheableResponsesPlugin`.
   *
   * - If this method is called and there are no suitable `cacheWillUpdate`
   * plugins, we need to add `defaultPrecacheCacheabilityPlugin`.
   *
   * - If this method is called and there is exactly one `cacheWillUpdate`, then
   * we don't have to do anything (this might be a previously added
   * `defaultPrecacheCacheabilityPlugin`, or it might be a custom plugin).
   *
   * - If this method is called and there is more than one `cacheWillUpdate`,
   * then we need to check if one is `defaultPrecacheCacheabilityPlugin`. If so,
   * we need to remove it. (This situation is unlikely, but it could happen if
   * the strategy is used multiple times, the first without a `cacheWillUpdate`,
   * and then later on after manually adding a custom `cacheWillUpdate`.)
   *
   * See https://github.com/GoogleChrome/workbox/issues/2737 for more context.
   *
   * @private
   */
  _useDefaultCacheabilityPluginIfNeeded() {
    let e = null, o = 0;
    for (const [t, a] of this.plugins.entries())
      a !== Fe.copyRedirectedCacheableResponsesPlugin && (a === Fe.defaultPrecacheCacheabilityPlugin && (e = t), a.cacheWillUpdate && o++);
    o === 0 ? this.plugins.push(Fe.defaultPrecacheCacheabilityPlugin) : o > 1 && e !== null && this.plugins.splice(e, 1);
  }
}
Fe.defaultPrecacheCacheabilityPlugin = {
  async cacheWillUpdate({ response: i }) {
    return !i || i.status >= 400 ? null : i;
  }
};
Fe.copyRedirectedCacheableResponsesPlugin = {
  async cacheWillUpdate({ response: i }) {
    return i.redirected ? await Us(i) : i;
  }
};
class Js {
  /**
   * Create a new PrecacheController.
   *
   * @param {Object} [options]
   * @param {string} [options.cacheName] The cache to use for precaching.
   * @param {string} [options.plugins] Plugins to use when precaching as well
   * as responding to fetch events for precached assets.
   * @param {boolean} [options.fallbackToNetwork=true] Whether to attempt to
   * get the response from the network if there's a precache miss.
   */
  constructor({ cacheName: e, plugins: o = [], fallbackToNetwork: t = !0 } = {}) {
    this._urlsToCacheKeys = /* @__PURE__ */ new Map(), this._urlsToCacheModes = /* @__PURE__ */ new Map(), this._cacheKeysToIntegrities = /* @__PURE__ */ new Map(), this._strategy = new Fe({
      cacheName: mo.getPrecacheName(e),
      plugins: [
        ...o,
        new Is({ precacheController: this })
      ],
      fallbackToNetwork: t
    }), this.install = this.install.bind(this), this.activate = this.activate.bind(this);
  }
  /**
   * @type {workbox-precaching.PrecacheStrategy} The strategy created by this controller and
   * used to cache assets and respond to fetch events.
   */
  get strategy() {
    return this._strategy;
  }
  /**
   * Adds items to the precache list, removing any duplicates and
   * stores the files in the
   * {@link workbox-core.cacheNames|"precache cache"} when the service
   * worker installs.
   *
   * This method can be called multiple times.
   *
   * @param {Array<Object|string>} [entries=[]] Array of entries to precache.
   */
  precache(e) {
    this.addToCacheList(e), this._installAndActiveListenersAdded || (self.addEventListener("install", this.install), self.addEventListener("activate", this.activate), this._installAndActiveListenersAdded = !0);
  }
  /**
   * This method will add items to the precache list, removing duplicates
   * and ensuring the information is valid.
   *
   * @param {Array<workbox-precaching.PrecacheController.PrecacheEntry|string>} entries
   *     Array of entries to precache.
   */
  addToCacheList(e) {
    const o = [];
    for (const t of e) {
      typeof t == "string" ? o.push(t) : t && t.revision === void 0 && o.push(t.url);
      const { cacheKey: a, url: s } = Ds(t), n = typeof t != "string" && t.revision ? "reload" : "default";
      if (this._urlsToCacheKeys.has(s) && this._urlsToCacheKeys.get(s) !== a)
        throw new X("add-to-cache-list-conflicting-entries", {
          firstEntry: this._urlsToCacheKeys.get(s),
          secondEntry: a
        });
      if (typeof t != "string" && t.integrity) {
        if (this._cacheKeysToIntegrities.has(a) && this._cacheKeysToIntegrities.get(a) !== t.integrity)
          throw new X("add-to-cache-list-conflicting-integrities", {
            url: s
          });
        this._cacheKeysToIntegrities.set(a, t.integrity);
      }
      if (this._urlsToCacheKeys.set(s, a), this._urlsToCacheModes.set(s, n), o.length > 0) {
        const r = `Workbox is precaching URLs without revision info: ${o.join(", ")}
This is generally NOT safe. Learn more at https://bit.ly/wb-precache`;
        console.warn(r);
      }
    }
  }
  /**
   * Precaches new and updated assets. Call this method from the service worker
   * install event.
   *
   * Note: this method calls `event.waitUntil()` for you, so you do not need
   * to call it yourself in your event handlers.
   *
   * @param {ExtendableEvent} event
   * @return {Promise<workbox-precaching.InstallResult>}
   */
  install(e) {
    return Nt(e, async () => {
      const o = new Ls();
      this.strategy.plugins.push(o);
      for (const [s, n] of this._urlsToCacheKeys) {
        const r = this._cacheKeysToIntegrities.get(n), c = this._urlsToCacheModes.get(s), l = new Request(s, {
          integrity: r,
          cache: c,
          credentials: "same-origin"
        });
        await Promise.all(this.strategy.handleAll({
          params: { cacheKey: n },
          request: l,
          event: e
        }));
      }
      const { updatedURLs: t, notUpdatedURLs: a } = o;
      return { updatedURLs: t, notUpdatedURLs: a };
    });
  }
  /**
   * Deletes assets that are no longer present in the current precache manifest.
   * Call this method from the service worker activate event.
   *
   * Note: this method calls `event.waitUntil()` for you, so you do not need
   * to call it yourself in your event handlers.
   *
   * @param {ExtendableEvent} event
   * @return {Promise<workbox-precaching.CleanupResult>}
   */
  activate(e) {
    return Nt(e, async () => {
      const o = await self.caches.open(this.strategy.cacheName), t = await o.keys(), a = new Set(this._urlsToCacheKeys.values()), s = [];
      for (const n of t)
        a.has(n.url) || (await o.delete(n), s.push(n.url));
      return { deletedURLs: s };
    });
  }
  /**
   * Returns a mapping of a precached URL to the corresponding cache key, taking
   * into account the revision information for the URL.
   *
   * @return {Map<string, string>} A URL to cache key mapping.
   */
  getURLsToCacheKeys() {
    return this._urlsToCacheKeys;
  }
  /**
   * Returns a list of all the URLs that have been precached by the current
   * service worker.
   *
   * @return {Array<string>} The precached URLs.
   */
  getCachedURLs() {
    return [...this._urlsToCacheKeys.keys()];
  }
  /**
   * Returns the cache key used for storing a given URL. If that URL is
   * unversioned, like `/index.html', then the cache key will be the original
   * URL with a search parameter appended to it.
   *
   * @param {string} url A URL whose cache key you want to look up.
   * @return {string} The versioned URL that corresponds to a cache key
   * for the original URL, or undefined if that URL isn't precached.
   */
  getCacheKeyForURL(e) {
    const o = new URL(e, location.href);
    return this._urlsToCacheKeys.get(o.href);
  }
  /**
   * @param {string} url A cache key whose SRI you want to look up.
   * @return {string} The subresource integrity associated with the cache key,
   * or undefined if it's not set.
   */
  getIntegrityForCacheKey(e) {
    return this._cacheKeysToIntegrities.get(e);
  }
  /**
   * This acts as a drop-in replacement for
   * [`cache.match()`](https://developer.mozilla.org/en-US/docs/Web/API/Cache/match)
   * with the following differences:
   *
   * - It knows what the name of the precache is, and only checks in that cache.
   * - It allows you to pass in an "original" URL without versioning parameters,
   * and it will automatically look up the correct cache key for the currently
   * active revision of that URL.
   *
   * E.g., `matchPrecache('index.html')` will find the correct precached
   * response for the currently active service worker, even if the actual cache
   * key is `'/index.html?__WB_REVISION__=1234abcd'`.
   *
   * @param {string|Request} request The key (without revisioning parameters)
   * to look up in the precache.
   * @return {Promise<Response|undefined>}
   */
  async matchPrecache(e) {
    const o = e instanceof Request ? e.url : e, t = this.getCacheKeyForURL(o);
    if (t)
      return (await self.caches.open(this.strategy.cacheName)).match(t);
  }
  /**
   * Returns a function that looks up `url` in the precache (taking into
   * account revision information), and returns the corresponding `Response`.
   *
   * @param {string} url The precached URL which will be used to lookup the
   * `Response`.
   * @return {workbox-routing~handlerCallback}
   */
  createHandlerBoundToURL(e) {
    const o = this.getCacheKeyForURL(e);
    if (!o)
      throw new X("non-precached-url", { url: e });
    return (t) => (t.request = new Request(e), t.params = Object.assign({ cacheKey: o }, t.params), this.strategy.handle(t));
  }
}
let So;
const gt = () => (So || (So = new Js()), So);
try {
  self["workbox:routing:6.5.4"] && _();
} catch {
}
const Aa = "GET", eo = (i) => i && typeof i == "object" ? i : { handle: i };
class Je {
  /**
   * Constructor for Route class.
   *
   * @param {workbox-routing~matchCallback} match
   * A callback function that determines whether the route matches a given
   * `fetch` event by returning a non-falsy value.
   * @param {workbox-routing~handlerCallback} handler A callback
   * function that returns a Promise resolving to a Response.
   * @param {string} [method='GET'] The HTTP method to match the Route
   * against.
   */
  constructor(e, o, t = Aa) {
    this.handler = eo(o), this.match = e, this.method = t;
  }
  /**
   *
   * @param {workbox-routing-handlerCallback} handler A callback
   * function that returns a Promise resolving to a Response
   */
  setCatchHandler(e) {
    this.catchHandler = eo(e);
  }
}
class Gs extends Je {
  /**
   * If the regular expression contains
   * [capture groups]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#grouping-back-references},
   * the captured values will be passed to the
   * {@link workbox-routing~handlerCallback} `params`
   * argument.
   *
   * @param {RegExp} regExp The regular expression to match against URLs.
   * @param {workbox-routing~handlerCallback} handler A callback
   * function that returns a Promise resulting in a Response.
   * @param {string} [method='GET'] The HTTP method to match the Route
   * against.
   */
  constructor(e, o, t) {
    const a = ({ url: s }) => {
      const n = e.exec(s.href);
      if (n && !(s.origin !== location.origin && n.index !== 0))
        return n.slice(1);
    };
    super(a, o, t);
  }
}
class Xs {
  /**
   * Initializes a new Router.
   */
  constructor() {
    this._routes = /* @__PURE__ */ new Map(), this._defaultHandlerMap = /* @__PURE__ */ new Map();
  }
  /**
   * @return {Map<string, Array<workbox-routing.Route>>} routes A `Map` of HTTP
   * method name ('GET', etc.) to an array of all the corresponding `Route`
   * instances that are registered.
   */
  get routes() {
    return this._routes;
  }
  /**
   * Adds a fetch event listener to respond to events when a route matches
   * the event's request.
   */
  addFetchListener() {
    self.addEventListener("fetch", (e) => {
      const { request: o } = e, t = this.handleRequest({ request: o, event: e });
      t && e.respondWith(t);
    });
  }
  /**
   * Adds a message event listener for URLs to cache from the window.
   * This is useful to cache resources loaded on the page prior to when the
   * service worker started controlling it.
   *
   * The format of the message data sent from the window should be as follows.
   * Where the `urlsToCache` array may consist of URL strings or an array of
   * URL string + `requestInit` object (the same as you'd pass to `fetch()`).
   *
   * ```
   * {
   *   type: 'CACHE_URLS',
   *   payload: {
   *     urlsToCache: [
   *       './script1.js',
   *       './script2.js',
   *       ['./script3.js', {mode: 'no-cors'}],
   *     ],
   *   },
   * }
   * ```
   */
  addCacheListener() {
    self.addEventListener("message", (e) => {
      if (e.data && e.data.type === "CACHE_URLS") {
        const { payload: o } = e.data, t = Promise.all(o.urlsToCache.map((a) => {
          typeof a == "string" && (a = [a]);
          const s = new Request(...a);
          return this.handleRequest({ request: s, event: e });
        }));
        e.waitUntil(t), e.ports && e.ports[0] && t.then(() => e.ports[0].postMessage(!0));
      }
    });
  }
  /**
   * Apply the routing rules to a FetchEvent object to get a Response from an
   * appropriate Route's handler.
   *
   * @param {Object} options
   * @param {Request} options.request The request to handle.
   * @param {ExtendableEvent} options.event The event that triggered the
   *     request.
   * @return {Promise<Response>|undefined} A promise is returned if a
   *     registered route can handle the request. If there is no matching
   *     route and there's no `defaultHandler`, `undefined` is returned.
   */
  handleRequest({ request: e, event: o }) {
    const t = new URL(e.url, location.href);
    if (!t.protocol.startsWith("http"))
      return;
    const a = t.origin === location.origin, { params: s, route: n } = this.findMatchingRoute({
      event: o,
      request: e,
      sameOrigin: a,
      url: t
    });
    let r = n && n.handler;
    const c = e.method;
    if (!r && this._defaultHandlerMap.has(c) && (r = this._defaultHandlerMap.get(c)), !r)
      return;
    let l;
    try {
      l = r.handle({ url: t, request: e, event: o, params: s });
    } catch (d) {
      l = Promise.reject(d);
    }
    const u = n && n.catchHandler;
    return l instanceof Promise && (this._catchHandler || u) && (l = l.catch(async (d) => {
      if (u)
        try {
          return await u.handle({ url: t, request: e, event: o, params: s });
        } catch (g) {
          g instanceof Error && (d = g);
        }
      if (this._catchHandler)
        return this._catchHandler.handle({ url: t, request: e, event: o });
      throw d;
    })), l;
  }
  /**
   * Checks a request and URL (and optionally an event) against the list of
   * registered routes, and if there's a match, returns the corresponding
   * route along with any params generated by the match.
   *
   * @param {Object} options
   * @param {URL} options.url
   * @param {boolean} options.sameOrigin The result of comparing `url.origin`
   *     against the current origin.
   * @param {Request} options.request The request to match.
   * @param {Event} options.event The corresponding event.
   * @return {Object} An object with `route` and `params` properties.
   *     They are populated if a matching route was found or `undefined`
   *     otherwise.
   */
  findMatchingRoute({ url: e, sameOrigin: o, request: t, event: a }) {
    const s = this._routes.get(t.method) || [];
    for (const n of s) {
      let r;
      const c = n.match({ url: e, sameOrigin: o, request: t, event: a });
      if (c)
        return r = c, (Array.isArray(r) && r.length === 0 || c.constructor === Object && // eslint-disable-line
        Object.keys(c).length === 0 || typeof c == "boolean") && (r = void 0), { route: n, params: r };
    }
    return {};
  }
  /**
   * Define a default `handler` that's called when no routes explicitly
   * match the incoming request.
   *
   * Each HTTP method ('GET', 'POST', etc.) gets its own default handler.
   *
   * Without a default handler, unmatched requests will go against the
   * network as if there were no service worker present.
   *
   * @param {workbox-routing~handlerCallback} handler A callback
   * function that returns a Promise resulting in a Response.
   * @param {string} [method='GET'] The HTTP method to associate with this
   * default handler. Each method has its own default.
   */
  setDefaultHandler(e, o = Aa) {
    this._defaultHandlerMap.set(o, eo(e));
  }
  /**
   * If a Route throws an error while handling a request, this `handler`
   * will be called and given a chance to provide a response.
   *
   * @param {workbox-routing~handlerCallback} handler A callback
   * function that returns a Promise resulting in a Response.
   */
  setCatchHandler(e) {
    this._catchHandler = eo(e);
  }
  /**
   * Registers a route with the router.
   *
   * @param {workbox-routing.Route} route The route to register.
   */
  registerRoute(e) {
    this._routes.has(e.method) || this._routes.set(e.method, []), this._routes.get(e.method).push(e);
  }
  /**
   * Unregisters a route with the router.
   *
   * @param {workbox-routing.Route} route The route to unregister.
   */
  unregisterRoute(e) {
    if (!this._routes.has(e.method))
      throw new X("unregister-route-but-not-found-with-method", {
        method: e.method
      });
    const o = this._routes.get(e.method).indexOf(e);
    if (o > -1)
      this._routes.get(e.method).splice(o, 1);
    else
      throw new X("unregister-route-route-not-registered");
  }
}
let ni;
const Ys = () => (ni || (ni = new Xs(), ni.addFetchListener(), ni.addCacheListener()), ni);
function No(i, e, o) {
  let t;
  if (typeof i == "string") {
    const s = new URL(i, location.href), n = ({ url: r }) => r.href === s.href;
    t = new Je(n, e, o);
  } else if (i instanceof RegExp)
    t = new Gs(i, e, o);
  else if (typeof i == "function")
    t = new Je(i, e, o);
  else if (i instanceof Je)
    t = i;
  else
    throw new X("unsupported-route-type", {
      moduleName: "workbox-routing",
      funcName: "registerRoute",
      paramName: "capture"
    });
  return Ys().registerRoute(t), t;
}
function Qs(i, e = []) {
  for (const o of [...i.searchParams.keys()])
    e.some((t) => t.test(o)) && i.searchParams.delete(o);
  return i;
}
function* Zs(i, { ignoreURLParametersMatching: e = [/^utm_/, /^fbclid$/], directoryIndex: o = "index.html", cleanURLs: t = !0, urlManipulation: a } = {}) {
  const s = new URL(i, location.href);
  s.hash = "", yield s.href;
  const n = Qs(s, e);
  if (yield n.href, o && n.pathname.endsWith("/")) {
    const r = new URL(n.href);
    r.pathname += o, yield r.href;
  }
  if (t) {
    const r = new URL(n.href);
    r.pathname += ".html", yield r.href;
  }
  if (a) {
    const r = a({ url: s });
    for (const c of r)
      yield c.href;
  }
}
class en extends Je {
  /**
   * @param {PrecacheController} precacheController A `PrecacheController`
   * instance used to both match requests and respond to fetch events.
   * @param {Object} [options] Options to control how requests are matched
   * against the list of precached URLs.
   * @param {string} [options.directoryIndex=index.html] The `directoryIndex` will
   * check cache entries for a URLs ending with '/' to see if there is a hit when
   * appending the `directoryIndex` value.
   * @param {Array<RegExp>} [options.ignoreURLParametersMatching=[/^utm_/, /^fbclid$/]] An
   * array of regex's to remove search params when looking for a cache match.
   * @param {boolean} [options.cleanURLs=true] The `cleanURLs` option will
   * check the cache for the URL with a `.html` added to the end of the end.
   * @param {workbox-precaching~urlManipulation} [options.urlManipulation]
   * This is a function that should take a URL and return an array of
   * alternative URLs that should be checked for precache matches.
   */
  constructor(e, o) {
    const t = ({ request: a }) => {
      const s = e.getURLsToCacheKeys();
      for (const n of Zs(a.url, o)) {
        const r = s.get(n);
        if (r) {
          const c = e.getIntegrityForCacheKey(r);
          return { cacheKey: r, integrity: c };
        }
      }
    };
    super(t, e.strategy);
  }
}
function on(i) {
  const e = gt(), o = new en(e, i);
  No(o);
}
const tn = "-precache-", an = async (i, e = tn) => {
  const t = (await self.caches.keys()).filter((a) => a.includes(e) && a.includes(self.registration.scope) && a !== i);
  return await Promise.all(t.map((a) => self.caches.delete(a))), t;
};
function sn() {
  self.addEventListener("activate", (i) => {
    const e = mo.getPrecacheName();
    i.waitUntil(an(e).then((o) => {
    }));
  });
}
function nn(i) {
  return gt().createHandlerBoundToURL(i);
}
function rn(i) {
  gt().precache(i);
}
function cn(i, e) {
  rn(i), on(e);
}
class ln extends Je {
  /**
   * If both `denylist` and `allowlist` are provided, the `denylist` will
   * take precedence and the request will not match this route.
   *
   * The regular expressions in `allowlist` and `denylist`
   * are matched against the concatenated
   * [`pathname`]{@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/pathname}
   * and [`search`]{@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/search}
   * portions of the requested URL.
   *
   * *Note*: These RegExps may be evaluated against every destination URL during
   * a navigation. Avoid using
   * [complex RegExps](https://github.com/GoogleChrome/workbox/issues/3077),
   * or else your users may see delays when navigating your site.
   *
   * @param {workbox-routing~handlerCallback} handler A callback
   * function that returns a Promise resulting in a Response.
   * @param {Object} options
   * @param {Array<RegExp>} [options.denylist] If any of these patterns match,
   * the route will not handle the request (even if a allowlist RegExp matches).
   * @param {Array<RegExp>} [options.allowlist=[/./]] If any of these patterns
   * match the URL's pathname and search parameter, the route will handle the
   * request (assuming the denylist doesn't match).
   */
  constructor(e, { allowlist: o = [/./], denylist: t = [] } = {}) {
    super((a) => this._match(a), e), this._allowlist = o, this._denylist = t;
  }
  /**
   * Routes match handler.
   *
   * @param {Object} options
   * @param {URL} options.url
   * @param {Request} options.request
   * @return {boolean}
   *
   * @private
   */
  _match({ url: e, request: o }) {
    if (o && o.mode !== "navigate")
      return !1;
    const t = e.pathname + e.search;
    for (const a of this._denylist)
      if (a.test(t))
        return !1;
    return !!this._allowlist.some((a) => a.test(t));
  }
}
const un = {
  /**
   * Returns a valid response (to allow caching) if the status is 200 (OK) or
   * 0 (opaque).
   *
   * @param {Object} options
   * @param {Response} options.response
   * @return {Response|null}
   *
   * @private
   */
  cacheWillUpdate: async ({ response: i }) => i.status === 200 || i.status === 0 ? i : null
};
class dn extends Ea {
  /**
   * @param {Object} [options]
   * @param {string} [options.cacheName] Cache name to store and retrieve
   * requests. Defaults to cache names provided by
   * {@link workbox-core.cacheNames}.
   * @param {Array<Object>} [options.plugins] [Plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}
   * to use in conjunction with this caching strategy.
   * @param {Object} [options.fetchOptions] Values passed along to the
   * [`init`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters)
   * of [non-navigation](https://github.com/GoogleChrome/workbox/issues/1796)
   * `fetch()` requests made by this strategy.
   * @param {Object} [options.matchOptions] [`CacheQueryOptions`](https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions)
   * @param {number} [options.networkTimeoutSeconds] If set, any network requests
   * that fail to respond within the timeout will fallback to the cache.
   *
   * This option can be used to combat
   * "[lie-fi]{@link https://developers.google.com/web/fundamentals/performance/poor-connectivity/#lie-fi}"
   * scenarios.
   */
  constructor(e = {}) {
    super(e), this.plugins.some((o) => "cacheWillUpdate" in o) || this.plugins.unshift(un), this._networkTimeoutSeconds = e.networkTimeoutSeconds || 0;
  }
  /**
   * @private
   * @param {Request|string} request A request to run this strategy for.
   * @param {workbox-strategies.StrategyHandler} handler The event that
   *     triggered the request.
   * @return {Promise<Response>}
   */
  async _handle(e, o) {
    const t = [], a = [];
    let s;
    if (this._networkTimeoutSeconds) {
      const { id: c, promise: l } = this._getTimeoutPromise({ request: e, logs: t, handler: o });
      s = c, a.push(l);
    }
    const n = this._getNetworkPromise({
      timeoutId: s,
      request: e,
      logs: t,
      handler: o
    });
    a.push(n);
    const r = await o.waitUntil((async () => await o.waitUntil(Promise.race(a)) || // If Promise.race() resolved with null, it might be due to a network
    // timeout + a cache miss. If that were to happen, we'd rather wait until
    // the networkPromise resolves instead of returning null.
    // Note that it's fine to await an already-resolved promise, so we don't
    // have to check to see if it's still "in flight".
    await n)());
    if (!r)
      throw new X("no-response", { url: e.url });
    return r;
  }
  /**
   * @param {Object} options
   * @param {Request} options.request
   * @param {Array} options.logs A reference to the logs array
   * @param {Event} options.event
   * @return {Promise<Response>}
   *
   * @private
   */
  _getTimeoutPromise({ request: e, logs: o, handler: t }) {
    let a;
    return {
      promise: new Promise((n) => {
        a = setTimeout(async () => {
          n(await t.cacheMatch(e));
        }, this._networkTimeoutSeconds * 1e3);
      }),
      id: a
    };
  }
  /**
   * @param {Object} options
   * @param {number|undefined} options.timeoutId
   * @param {Request} options.request
   * @param {Array} options.logs A reference to the logs Array.
   * @param {Event} options.event
   * @return {Promise<Response>}
   *
   * @private
   */
  async _getNetworkPromise({ timeoutId: e, request: o, logs: t, handler: a }) {
    let s, n;
    try {
      n = await a.fetchAndCachePut(o);
    } catch (r) {
      r instanceof Error && (s = r);
    }
    return e && clearTimeout(e), (s || !n) && (n = await a.cacheMatch(o)), n;
  }
}
function gn() {
  self.addEventListener("activate", () => self.clients.claim());
}
const U = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, z = Object.keys, W = Array.isArray;
function Y(i, e) {
  return typeof e != "object" || z(e).forEach(function(o) {
    i[o] = e[o];
  }), i;
}
typeof Promise > "u" || U.Promise || (U.Promise = Promise);
const vi = Object.getPrototypeOf, pn = {}.hasOwnProperty;
function ie(i, e) {
  return pn.call(i, e);
}
function Qe(i, e) {
  typeof e == "function" && (e = e(vi(i))), (typeof Reflect > "u" ? z : Reflect.ownKeys)(e).forEach((o) => {
    _e(i, o, e[o]);
  });
}
const Ta = Object.defineProperty;
function _e(i, e, o, t) {
  Ta(i, e, Y(o && ie(o, "get") && typeof o.get == "function" ? { get: o.get, set: o.set, configurable: !0 } : { value: o, configurable: !0, writable: !0 }, t));
}
function Ge(i) {
  return { from: function(e) {
    return i.prototype = Object.create(e.prototype), _e(i.prototype, "constructor", i), { extend: Qe.bind(null, i.prototype) };
  } };
}
const mn = Object.getOwnPropertyDescriptor;
function pt(i, e) {
  let o;
  return mn(i, e) || (o = vi(i)) && pt(o, e);
}
const yn = [].slice;
function io(i, e, o) {
  return yn.call(i, e, o);
}
function Ra(i, e) {
  return e(i);
}
function di(i) {
  if (!i)
    throw new Error("Assertion Failed");
}
function Ca(i) {
  U.setImmediate ? setImmediate(i) : setTimeout(i, 0);
}
function Na(i, e) {
  return i.reduce((o, t, a) => {
    var s = e(t, a);
    return s && (o[s[0]] = s[1]), o;
  }, {});
}
function be(i, e) {
  if (typeof e == "string" && ie(i, e))
    return i[e];
  if (!e)
    return i;
  if (typeof e != "string") {
    for (var o = [], t = 0, a = e.length; t < a; ++t) {
      var s = be(i, e[t]);
      o.push(s);
    }
    return o;
  }
  var n = e.indexOf(".");
  if (n !== -1) {
    var r = i[e.substr(0, n)];
    return r == null ? void 0 : be(r, e.substr(n + 1));
  }
}
function ne(i, e, o) {
  if (i && e !== void 0 && (!("isFrozen" in Object) || !Object.isFrozen(i)))
    if (typeof e != "string" && "length" in e) {
      di(typeof o != "string" && "length" in o);
      for (var t = 0, a = e.length; t < a; ++t)
        ne(i, e[t], o[t]);
    } else {
      var s = e.indexOf(".");
      if (s !== -1) {
        var n = e.substr(0, s), r = e.substr(s + 1);
        if (r === "")
          o === void 0 ? W(i) && !isNaN(parseInt(n)) ? i.splice(n, 1) : delete i[n] : i[n] = o;
        else {
          var c = i[n];
          c && ie(i, n) || (c = i[n] = {}), ne(c, r, o);
        }
      } else
        o === void 0 ? W(i) && !isNaN(parseInt(e)) ? i.splice(e, 1) : delete i[e] : i[e] = o;
    }
}
function Da(i) {
  var e = {};
  for (var o in i)
    ie(i, o) && (e[o] = i[o]);
  return e;
}
const fn = [].concat;
function La(i) {
  return fn.apply([], i);
}
const Ia = "BigUint64Array,BigInt64Array,Array,Boolean,String,Date,RegExp,Blob,File,FileList,FileSystemFileHandle,FileSystemDirectoryHandle,ArrayBuffer,DataView,Uint8ClampedArray,ImageBitmap,ImageData,Map,Set,CryptoKey".split(",").concat(La([8, 16, 32, 64].map((i) => ["Int", "Uint", "Float"].map((e) => e + i + "Array")))).filter((i) => U[i]), hn = Ia.map((i) => U[i]);
Na(Ia, (i) => [i, !0]);
let Oe = null;
function Oi(i) {
  Oe = typeof WeakMap < "u" && /* @__PURE__ */ new WeakMap();
  const e = Do(i);
  return Oe = null, e;
}
function Do(i) {
  if (!i || typeof i != "object")
    return i;
  let e = Oe && Oe.get(i);
  if (e)
    return e;
  if (W(i)) {
    e = [], Oe && Oe.set(i, e);
    for (var o = 0, t = i.length; o < t; ++o)
      e.push(Do(i[o]));
  } else if (hn.indexOf(i.constructor) >= 0)
    e = i;
  else {
    const s = vi(i);
    for (var a in e = s === Object.prototype ? {} : Object.create(s), Oe && Oe.set(i, e), i)
      ie(i, a) && (e[a] = Do(i[a]));
  }
  return e;
}
const { toString: vn } = {};
function Lo(i) {
  return vn.call(i).slice(8, -1);
}
const Io = typeof Symbol < "u" ? Symbol.iterator : "@@iterator", _n = typeof Io == "symbol" ? function(i) {
  var e;
  return i != null && (e = i[Io]) && e.apply(i);
} : function() {
  return null;
}, We = {};
function he(i) {
  var e, o, t, a;
  if (arguments.length === 1) {
    if (W(i))
      return i.slice();
    if (this === We && typeof i == "string")
      return [i];
    if (a = _n(i)) {
      for (o = []; !(t = a.next()).done; )
        o.push(t.value);
      return o;
    }
    if (i == null)
      return [i];
    if (typeof (e = i.length) == "number") {
      for (o = new Array(e); e--; )
        o[e] = i[e];
      return o;
    }
    return [i];
  }
  for (e = arguments.length, o = new Array(e); e--; )
    o[e] = arguments[e];
  return o;
}
const mt = typeof Symbol < "u" ? (i) => i[Symbol.toStringTag] === "AsyncFunction" : () => !1;
var pe = typeof location < "u" && /^(http|https):\/\/(localhost|127\.0\.0\.1)/.test(location.href);
function Ka(i, e) {
  pe = i, Ua = e;
}
var Ua = () => !0;
const bn = !new Error("").stack;
function qe() {
  if (bn)
    try {
      throw qe.arguments, new Error();
    } catch (i) {
      return i;
    }
  return new Error();
}
function Ko(i, e) {
  var o = i.stack;
  return o ? (e = e || 0, o.indexOf(i.name) === 0 && (e += (i.name + i.message).split(`
`).length), o.split(`
`).slice(e).filter(Ua).map((t) => `
` + t).join("")) : "";
}
var qa = ["Unknown", "Constraint", "Data", "TransactionInactive", "ReadOnly", "Version", "NotFound", "InvalidState", "InvalidAccess", "Abort", "Timeout", "QuotaExceeded", "Syntax", "DataClone"], yt = ["Modify", "Bulk", "OpenFailed", "VersionChange", "Schema", "Upgrade", "InvalidTable", "MissingAPI", "NoSuchDatabase", "InvalidArgument", "SubTransaction", "Unsupported", "Internal", "DatabaseClosed", "PrematureCommit", "ForeignAwait"].concat(qa), jn = { VersionChanged: "Database version changed by other database connection", DatabaseClosed: "Database has been closed", Abort: "Transaction aborted", TransactionInactive: "Transaction has already completed or failed", MissingAPI: "IndexedDB API missing. Please visit https://tinyurl.com/y2uuvskb" };
function Xe(i, e) {
  this._e = qe(), this.name = i, this.message = e;
}
function Ma(i, e) {
  return i + ". Errors: " + Object.keys(e).map((o) => e[o].toString()).filter((o, t, a) => a.indexOf(o) === t).join(`
`);
}
function oo(i, e, o, t) {
  this._e = qe(), this.failures = e, this.failedKeys = t, this.successCount = o, this.message = Ma(i, e);
}
function pi(i, e) {
  this._e = qe(), this.name = "BulkError", this.failures = Object.keys(e).map((o) => e[o]), this.failuresByPos = e, this.message = Ma(i, e);
}
Ge(Xe).from(Error).extend({ stack: { get: function() {
  return this._stack || (this._stack = this.name + ": " + this.message + Ko(this._e, 2));
} }, toString: function() {
  return this.name + ": " + this.message;
} }), Ge(oo).from(Xe), Ge(pi).from(Xe);
var ft = yt.reduce((i, e) => (i[e] = e + "Error", i), {});
const wn = Xe;
var T = yt.reduce((i, e) => {
  var o = e + "Error";
  function t(a, s) {
    this._e = qe(), this.name = o, a ? typeof a == "string" ? (this.message = `${a}${s ? `
 ` + s : ""}`, this.inner = s || null) : typeof a == "object" && (this.message = `${a.name} ${a.message}`, this.inner = a) : (this.message = jn[e] || o, this.inner = null);
  }
  return Ge(t).from(wn), i[e] = t, i;
}, {});
T.Syntax = SyntaxError, T.Type = TypeError, T.Range = RangeError;
var Lt = qa.reduce((i, e) => (i[e + "Error"] = T[e], i), {}), zi = yt.reduce((i, e) => (["Syntax", "Type", "Range"].indexOf(e) === -1 && (i[e + "Error"] = T[e]), i), {});
function K() {
}
function _i(i) {
  return i;
}
function kn(i, e) {
  return i == null || i === _i ? e : function(o) {
    return e(i(o));
  };
}
function Ke(i, e) {
  return function() {
    i.apply(this, arguments), e.apply(this, arguments);
  };
}
function Pn(i, e) {
  return i === K ? e : function() {
    var o = i.apply(this, arguments);
    o !== void 0 && (arguments[0] = o);
    var t = this.onsuccess, a = this.onerror;
    this.onsuccess = null, this.onerror = null;
    var s = e.apply(this, arguments);
    return t && (this.onsuccess = this.onsuccess ? Ke(t, this.onsuccess) : t), a && (this.onerror = this.onerror ? Ke(a, this.onerror) : a), s !== void 0 ? s : o;
  };
}
function Sn(i, e) {
  return i === K ? e : function() {
    i.apply(this, arguments);
    var o = this.onsuccess, t = this.onerror;
    this.onsuccess = this.onerror = null, e.apply(this, arguments), o && (this.onsuccess = this.onsuccess ? Ke(o, this.onsuccess) : o), t && (this.onerror = this.onerror ? Ke(t, this.onerror) : t);
  };
}
function On(i, e) {
  return i === K ? e : function(o) {
    var t = i.apply(this, arguments);
    Y(o, t);
    var a = this.onsuccess, s = this.onerror;
    this.onsuccess = null, this.onerror = null;
    var n = e.apply(this, arguments);
    return a && (this.onsuccess = this.onsuccess ? Ke(a, this.onsuccess) : a), s && (this.onerror = this.onerror ? Ke(s, this.onerror) : s), t === void 0 ? n === void 0 ? void 0 : n : Y(t, n);
  };
}
function xn(i, e) {
  return i === K ? e : function() {
    return e.apply(this, arguments) !== !1 && i.apply(this, arguments);
  };
}
function ht(i, e) {
  return i === K ? e : function() {
    var o = i.apply(this, arguments);
    if (o && typeof o.then == "function") {
      for (var t = this, a = arguments.length, s = new Array(a); a--; )
        s[a] = arguments[a];
      return o.then(function() {
        return e.apply(t, s);
      });
    }
    return e.apply(this, arguments);
  };
}
zi.ModifyError = oo, zi.DexieError = Xe, zi.BulkError = pi;
var bi = {};
const $a = 100, [Uo, to, qo] = typeof Promise > "u" ? [] : (() => {
  let i = Promise.resolve();
  if (typeof crypto > "u" || !crypto.subtle)
    return [i, vi(i), i];
  const e = crypto.subtle.digest("SHA-512", new Uint8Array([0]));
  return [e, vi(e), i];
})(), za = to && to.then, Hi = Uo && Uo.constructor, vt = !!qo;
var Mo = !1, Fn = qo ? () => {
  qo.then(Ri);
} : U.setImmediate ? setImmediate.bind(null, Ri) : U.MutationObserver ? () => {
  var i = document.createElement("div");
  new MutationObserver(() => {
    Ri(), i = null;
  }).observe(i, { attributes: !0 }), i.setAttribute("i", "1");
} : () => {
  setTimeout(Ri, 0);
}, mi = function(i, e) {
  gi.push([i, e]), ao && (Fn(), ao = !1);
}, $o = !0, ao = !0, Le = [], Vi = [], zo = null, Ho = _i, Ye = { id: "global", global: !0, ref: 0, unhandleds: [], onunhandled: Ut, pgp: !1, env: {}, finalize: function() {
  this.unhandleds.forEach((i) => {
    try {
      Ut(i[0], i[1]);
    } catch {
    }
  });
} }, B = Ye, gi = [], Ie = 0, Wi = [];
function F(i) {
  if (typeof this != "object")
    throw new TypeError("Promises must be constructed via new");
  this._listeners = [], this.onuncatched = K, this._lib = !1;
  var e = this._PSD = B;
  if (pe && (this._stackHolder = qe(), this._prev = null, this._numPrev = 0), typeof i != "function") {
    if (i !== bi)
      throw new TypeError("Not a function");
    return this._state = arguments[1], this._value = arguments[2], void (this._state === !1 && Wo(this, this._value));
  }
  this._state = null, this._value = null, ++e.ref, Va(this, i);
}
const Vo = { get: function() {
  var i = B, e = so;
  function o(t, a) {
    var s = !i.global && (i !== B || e !== so);
    const n = s && !we();
    var r = new F((c, l) => {
      _t(this, new Ha(no(t, i, s, n), no(a, i, s, n), c, l, i));
    });
    return pe && Ga(r, this), r;
  }
  return o.prototype = bi, o;
}, set: function(i) {
  _e(this, "then", i && i.prototype === bi ? Vo : { get: function() {
    return i;
  }, set: Vo.set });
} };
function Ha(i, e, o, t, a) {
  this.onFulfilled = typeof i == "function" ? i : null, this.onRejected = typeof e == "function" ? e : null, this.resolve = o, this.reject = t, this.psd = a;
}
function Va(i, e) {
  try {
    e((o) => {
      if (i._state === null) {
        if (o === i)
          throw new TypeError("A promise cannot be resolved with itself.");
        var t = i._lib && xi();
        o && typeof o.then == "function" ? Va(i, (a, s) => {
          o instanceof F ? o._then(a, s) : o.then(a, s);
        }) : (i._state = !0, i._value = o, Wa(i)), t && Fi();
      }
    }, Wo.bind(null, i));
  } catch (o) {
    Wo(i, o);
  }
}
function Wo(i, e) {
  if (Vi.push(e), i._state === null) {
    var o = i._lib && xi();
    e = Ho(e), i._state = !1, i._value = e, pe && e !== null && typeof e == "object" && !e._promise && function(t, a, s) {
      try {
        t.apply(null, s);
      } catch (n) {
        a && a(n);
      }
    }(() => {
      var t = pt(e, "stack");
      e._promise = i, _e(e, "stack", { get: () => Mo ? t && (t.get ? t.get.apply(e) : t.value) : i.stack });
    }), function(t) {
      Le.some((a) => a._value === t._value) || Le.push(t);
    }(i), Wa(i), o && Fi();
  }
}
function Wa(i) {
  var e = i._listeners;
  i._listeners = [];
  for (var o = 0, t = e.length; o < t; ++o)
    _t(i, e[o]);
  var a = i._PSD;
  --a.ref || a.finalize(), Ie === 0 && (++Ie, mi(() => {
    --Ie == 0 && bt();
  }, []));
}
function _t(i, e) {
  if (i._state !== null) {
    var o = i._state ? e.onFulfilled : e.onRejected;
    if (o === null)
      return (i._state ? e.resolve : e.reject)(i._value);
    ++e.psd.ref, ++Ie, mi(Bn, [o, i, e]);
  } else
    i._listeners.push(e);
}
function Bn(i, e, o) {
  try {
    zo = e;
    var t, a = e._value;
    e._state ? t = i(a) : (Vi.length && (Vi = []), t = i(a), Vi.indexOf(a) === -1 && function(s) {
      for (var n = Le.length; n; )
        if (Le[--n]._value === s._value)
          return void Le.splice(n, 1);
    }(e)), o.resolve(t);
  } catch (s) {
    o.reject(s);
  } finally {
    zo = null, --Ie == 0 && bt(), --o.psd.ref || o.psd.finalize();
  }
}
function Ja(i, e, o) {
  if (e.length === o)
    return e;
  var t = "";
  if (i._state === !1) {
    var a, s, n = i._value;
    n != null ? (a = n.name || "Error", s = n.message || n, t = Ko(n, 0)) : (a = n, s = ""), e.push(a + (s ? ": " + s : "") + t);
  }
  return pe && ((t = Ko(i._stackHolder, 2)) && e.indexOf(t) === -1 && e.push(t), i._prev && Ja(i._prev, e, o)), e;
}
function Ga(i, e) {
  var o = e ? e._numPrev + 1 : 0;
  o < 100 && (i._prev = e, i._numPrev = o);
}
function Ri() {
  xi() && Fi();
}
function xi() {
  var i = $o;
  return $o = !1, ao = !1, i;
}
function Fi() {
  var i, e, o;
  do
    for (; gi.length > 0; )
      for (i = gi, gi = [], o = i.length, e = 0; e < o; ++e) {
        var t = i[e];
        t[0].apply(null, t[1]);
      }
  while (gi.length > 0);
  $o = !0, ao = !0;
}
function bt() {
  var i = Le;
  Le = [], i.forEach((t) => {
    t._PSD.onunhandled.call(null, t._value, t);
  });
  for (var e = Wi.slice(0), o = e.length; o; )
    e[--o]();
}
function Ci(i) {
  return new F(bi, !1, i);
}
function q(i, e) {
  var o = B;
  return function() {
    var t = xi(), a = B;
    try {
      return Te(o, !0), i.apply(this, arguments);
    } catch (s) {
      e && e(s);
    } finally {
      Te(a, !1), t && Fi();
    }
  };
}
Qe(F.prototype, { then: Vo, _then: function(i, e) {
  _t(this, new Ha(null, null, i, e, B));
}, catch: function(i) {
  if (arguments.length === 1)
    return this.then(null, i);
  var e = arguments[0], o = arguments[1];
  return typeof e == "function" ? this.then(null, (t) => t instanceof e ? o(t) : Ci(t)) : this.then(null, (t) => t && t.name === e ? o(t) : Ci(t));
}, finally: function(i) {
  return this.then((e) => (i(), e), (e) => (i(), Ci(e)));
}, stack: { get: function() {
  if (this._stack)
    return this._stack;
  try {
    Mo = !0;
    var i = Ja(this, [], 20).join(`
From previous: `);
    return this._state !== null && (this._stack = i), i;
  } finally {
    Mo = !1;
  }
} }, timeout: function(i, e) {
  return i < 1 / 0 ? new F((o, t) => {
    var a = setTimeout(() => t(new T.Timeout(e)), i);
    this.then(o, t).finally(clearTimeout.bind(null, a));
  }) : this;
} }), typeof Symbol < "u" && Symbol.toStringTag && _e(F.prototype, Symbol.toStringTag, "Dexie.Promise"), Ye.env = Xa(), Qe(F, { all: function() {
  var i = he.apply(null, arguments).map(Ni);
  return new F(function(e, o) {
    i.length === 0 && e([]);
    var t = i.length;
    i.forEach((a, s) => F.resolve(a).then((n) => {
      i[s] = n, --t || e(i);
    }, o));
  });
}, resolve: (i) => {
  if (i instanceof F)
    return i;
  if (i && typeof i.then == "function")
    return new F((o, t) => {
      i.then(o, t);
    });
  var e = new F(bi, !0, i);
  return Ga(e, zo), e;
}, reject: Ci, race: function() {
  var i = he.apply(null, arguments).map(Ni);
  return new F((e, o) => {
    i.map((t) => F.resolve(t).then(e, o));
  });
}, PSD: { get: () => B, set: (i) => B = i }, totalEchoes: { get: () => so }, newPSD: Ae, usePSD: ei, scheduler: { get: () => mi, set: (i) => {
  mi = i;
} }, rejectionMapper: { get: () => Ho, set: (i) => {
  Ho = i;
} }, follow: (i, e) => new F((o, t) => Ae((a, s) => {
  var n = B;
  n.unhandleds = [], n.onunhandled = s, n.finalize = Ke(function() {
    (function(r) {
      function c() {
        r(), Wi.splice(Wi.indexOf(c), 1);
      }
      Wi.push(c), ++Ie, mi(() => {
        --Ie == 0 && bt();
      }, []);
    })(() => {
      this.unhandleds.length === 0 ? a() : s(this.unhandleds[0]);
    });
  }, n.finalize), i();
}, e, o, t)) }), Hi && (Hi.allSettled && _e(F, "allSettled", function() {
  const i = he.apply(null, arguments).map(Ni);
  return new F((e) => {
    i.length === 0 && e([]);
    let o = i.length;
    const t = new Array(o);
    i.forEach((a, s) => F.resolve(a).then((n) => t[s] = { status: "fulfilled", value: n }, (n) => t[s] = { status: "rejected", reason: n }).then(() => --o || e(t)));
  });
}), Hi.any && typeof AggregateError < "u" && _e(F, "any", function() {
  const i = he.apply(null, arguments).map(Ni);
  return new F((e, o) => {
    i.length === 0 && o(new AggregateError([]));
    let t = i.length;
    const a = new Array(t);
    i.forEach((s, n) => F.resolve(s).then((r) => e(r), (r) => {
      a[n] = r, --t || o(new AggregateError(a));
    }));
  });
}));
const V = { awaits: 0, echoes: 0, id: 0 };
var En = 0, Ji = [], Oo = 0, so = 0, An = 0;
function Ae(i, e, o, t) {
  var a = B, s = Object.create(a);
  s.parent = a, s.ref = 0, s.global = !1, s.id = ++An;
  var n = Ye.env;
  s.env = vt ? { Promise: F, PromiseProp: { value: F, configurable: !0, writable: !0 }, all: F.all, race: F.race, allSettled: F.allSettled, any: F.any, resolve: F.resolve, reject: F.reject, nthen: It(n.nthen, s), gthen: It(n.gthen, s) } : {}, e && Y(s, e), ++a.ref, s.finalize = function() {
    --this.parent.ref || this.parent.finalize();
  };
  var r = ei(s, i, o, t);
  return s.ref === 0 && s.finalize(), r;
}
function Ze() {
  return V.id || (V.id = ++En), ++V.awaits, V.echoes += $a, V.id;
}
function we() {
  return !!V.awaits && (--V.awaits == 0 && (V.id = 0), V.echoes = V.awaits * $a, !0);
}
function Ni(i) {
  return V.echoes && i && i.constructor === Hi ? (Ze(), i.then((e) => (we(), e), (e) => (we(), H(e)))) : i;
}
function Tn(i) {
  ++so, V.echoes && --V.echoes != 0 || (V.echoes = V.id = 0), Ji.push(B), Te(i, !0);
}
function Rn() {
  var i = Ji[Ji.length - 1];
  Ji.pop(), Te(i, !1);
}
function Te(i, e) {
  var o = B;
  if ((e ? !V.echoes || Oo++ && i === B : !Oo || --Oo && i === B) || Ya(e ? Tn.bind(null, i) : Rn), i !== B && (B = i, o === Ye && (Ye.env = Xa()), vt)) {
    var t = Ye.env.Promise, a = i.env;
    to.then = a.nthen, t.prototype.then = a.gthen, (o.global || i.global) && (Object.defineProperty(U, "Promise", a.PromiseProp), t.all = a.all, t.race = a.race, t.resolve = a.resolve, t.reject = a.reject, a.allSettled && (t.allSettled = a.allSettled), a.any && (t.any = a.any));
  }
}
function Xa() {
  var i = U.Promise;
  return vt ? { Promise: i, PromiseProp: Object.getOwnPropertyDescriptor(U, "Promise"), all: i.all, race: i.race, allSettled: i.allSettled, any: i.any, resolve: i.resolve, reject: i.reject, nthen: to.then, gthen: i.prototype.then } : {};
}
function ei(i, e, o, t, a) {
  var s = B;
  try {
    return Te(i, !0), e(o, t, a);
  } finally {
    Te(s, !1);
  }
}
function Ya(i) {
  za.call(Uo, i);
}
function no(i, e, o, t) {
  return typeof i != "function" ? i : function() {
    var a = B;
    o && Ze(), Te(e, !0);
    try {
      return i.apply(this, arguments);
    } finally {
      Te(a, !1), t && Ya(we);
    }
  };
}
function It(i, e) {
  return function(o, t) {
    return i.call(this, no(o, e), no(t, e));
  };
}
("" + za).indexOf("[native code]") === -1 && (Ze = we = K);
const Kt = "unhandledrejection";
function Ut(i, e) {
  var o;
  try {
    o = e.onuncatched(i);
  } catch {
  }
  if (o !== !1)
    try {
      var t, a = { promise: e, reason: i };
      if (U.document && document.createEvent ? ((t = document.createEvent("Event")).initEvent(Kt, !0, !0), Y(t, a)) : U.CustomEvent && Y(t = new CustomEvent(Kt, { detail: a }), a), t && U.dispatchEvent && (dispatchEvent(t), !U.PromiseRejectionEvent && U.onunhandledrejection))
        try {
          U.onunhandledrejection(t);
        } catch {
        }
      pe && t && !t.defaultPrevented && console.warn(`Unhandled rejection: ${i.stack || i}`);
    } catch {
    }
}
var H = F.reject;
function Jo(i, e, o, t) {
  if (i.idbdb && (i._state.openComplete || B.letThrough || i._vip)) {
    var a = i._createTransaction(e, o, i._dbSchema);
    try {
      a.create(), i._state.PR1398_maxLoop = 3;
    } catch (s) {
      return s.name === ft.InvalidState && i.isOpen() && --i._state.PR1398_maxLoop > 0 ? (console.warn("Dexie: Need to reopen db"), i._close(), i.open().then(() => Jo(i, e, o, t))) : H(s);
    }
    return a._promise(e, (s, n) => Ae(() => (B.trans = a, t(s, n, a)))).then((s) => a._completion.then(() => s));
  }
  if (i._state.openComplete)
    return H(new T.DatabaseClosed(i._state.dbOpenError));
  if (!i._state.isBeingOpened) {
    if (!i._options.autoOpen)
      return H(new T.DatabaseClosed());
    i.open().catch(K);
  }
  return i._state.dbReadyPromise.then(() => Jo(i, e, o, t));
}
const qt = "3.2.7", De = String.fromCharCode(65535), Go = -1 / 0, me = "Invalid key provided. Keys must be of type string, number, Date or Array<string | number | Date>.", Qa = "String expected.", yi = [], yo = typeof navigator < "u" && /(MSIE|Trident|Edge)/.test(navigator.userAgent), Cn = yo, Nn = yo, Za = (i) => !/(dexie\.js|dexie\.min\.js)/.test(i), fo = "__dbnames", xo = "readonly", Fo = "readwrite";
function Ue(i, e) {
  return i ? e ? function() {
    return i.apply(this, arguments) && e.apply(this, arguments);
  } : i : e;
}
const es = { type: 3, lower: -1 / 0, lowerOpen: !1, upper: [[]], upperOpen: !1 };
function Di(i) {
  return typeof i != "string" || /\./.test(i) ? (e) => e : (e) => (e[i] === void 0 && i in e && delete (e = Oi(e))[i], e);
}
class Dn {
  _trans(e, o, t) {
    const a = this._tx || B.trans, s = this.name;
    function n(c, l, u) {
      if (!u.schema[s])
        throw new T.NotFound("Table " + s + " not part of transaction");
      return o(u.idbtrans, u);
    }
    const r = xi();
    try {
      return a && a.db === this.db ? a === B.trans ? a._promise(e, n, t) : Ae(() => a._promise(e, n, t), { trans: a, transless: B.transless || B }) : Jo(this.db, e, [this.name], n);
    } finally {
      r && Fi();
    }
  }
  get(e, o) {
    return e && e.constructor === Object ? this.where(e).first(o) : this._trans("readonly", (t) => this.core.get({ trans: t, key: e }).then((a) => this.hook.reading.fire(a))).then(o);
  }
  where(e) {
    if (typeof e == "string")
      return new this.db.WhereClause(this, e);
    if (W(e))
      return new this.db.WhereClause(this, `[${e.join("+")}]`);
    const o = z(e);
    if (o.length === 1)
      return this.where(o[0]).equals(e[o[0]]);
    const t = this.schema.indexes.concat(this.schema.primKey).filter((l) => {
      if (l.compound && o.every((u) => l.keyPath.indexOf(u) >= 0)) {
        for (let u = 0; u < o.length; ++u)
          if (o.indexOf(l.keyPath[u]) === -1)
            return !1;
        return !0;
      }
      return !1;
    }).sort((l, u) => l.keyPath.length - u.keyPath.length)[0];
    if (t && this.db._maxKey !== De) {
      const l = t.keyPath.slice(0, o.length);
      return this.where(l).equals(l.map((u) => e[u]));
    }
    !t && pe && console.warn(`The query ${JSON.stringify(e)} on ${this.name} would benefit of a compound index [${o.join("+")}]`);
    const { idxByName: a } = this.schema, s = this.db._deps.indexedDB;
    function n(l, u) {
      try {
        return s.cmp(l, u) === 0;
      } catch {
        return !1;
      }
    }
    const [r, c] = o.reduce(([l, u], d) => {
      const g = a[d], p = e[d];
      return [l || g, l || !g ? Ue(u, g && g.multi ? (h) => {
        const v = be(h, d);
        return W(v) && v.some((b) => n(p, b));
      } : (h) => n(p, be(h, d))) : u];
    }, [null, null]);
    return r ? this.where(r.name).equals(e[r.keyPath]).filter(c) : t ? this.filter(c) : this.where(o).equals("");
  }
  filter(e) {
    return this.toCollection().and(e);
  }
  count(e) {
    return this.toCollection().count(e);
  }
  offset(e) {
    return this.toCollection().offset(e);
  }
  limit(e) {
    return this.toCollection().limit(e);
  }
  each(e) {
    return this.toCollection().each(e);
  }
  toArray(e) {
    return this.toCollection().toArray(e);
  }
  toCollection() {
    return new this.db.Collection(new this.db.WhereClause(this));
  }
  orderBy(e) {
    return new this.db.Collection(new this.db.WhereClause(this, W(e) ? `[${e.join("+")}]` : e));
  }
  reverse() {
    return this.toCollection().reverse();
  }
  mapToClass(e) {
    this.schema.mappedClass = e;
    const o = (t) => {
      if (!t)
        return t;
      const a = Object.create(e.prototype);
      for (var s in t)
        if (ie(t, s))
          try {
            a[s] = t[s];
          } catch {
          }
      return a;
    };
    return this.schema.readHook && this.hook.reading.unsubscribe(this.schema.readHook), this.schema.readHook = o, this.hook("reading", o), e;
  }
  defineClass() {
    return this.mapToClass(function(e) {
      Y(this, e);
    });
  }
  add(e, o) {
    const { auto: t, keyPath: a } = this.schema.primKey;
    let s = e;
    return a && t && (s = Di(a)(e)), this._trans("readwrite", (n) => this.core.mutate({ trans: n, type: "add", keys: o != null ? [o] : null, values: [s] })).then((n) => n.numFailures ? F.reject(n.failures[0]) : n.lastResult).then((n) => {
      if (a)
        try {
          ne(e, a, n);
        } catch {
        }
      return n;
    });
  }
  update(e, o) {
    if (typeof e != "object" || W(e))
      return this.where(":id").equals(e).modify(o);
    {
      const t = be(e, this.schema.primKey.keyPath);
      if (t === void 0)
        return H(new T.InvalidArgument("Given object does not contain its primary key"));
      try {
        typeof o != "function" ? z(o).forEach((a) => {
          ne(e, a, o[a]);
        }) : o(e, { value: e, primKey: t });
      } catch {
      }
      return this.where(":id").equals(t).modify(o);
    }
  }
  put(e, o) {
    const { auto: t, keyPath: a } = this.schema.primKey;
    let s = e;
    return a && t && (s = Di(a)(e)), this._trans("readwrite", (n) => this.core.mutate({ trans: n, type: "put", values: [s], keys: o != null ? [o] : null })).then((n) => n.numFailures ? F.reject(n.failures[0]) : n.lastResult).then((n) => {
      if (a)
        try {
          ne(e, a, n);
        } catch {
        }
      return n;
    });
  }
  delete(e) {
    return this._trans("readwrite", (o) => this.core.mutate({ trans: o, type: "delete", keys: [e] })).then((o) => o.numFailures ? F.reject(o.failures[0]) : void 0);
  }
  clear() {
    return this._trans("readwrite", (e) => this.core.mutate({ trans: e, type: "deleteRange", range: es })).then((e) => e.numFailures ? F.reject(e.failures[0]) : void 0);
  }
  bulkGet(e) {
    return this._trans("readonly", (o) => this.core.getMany({ keys: e, trans: o }).then((t) => t.map((a) => this.hook.reading.fire(a))));
  }
  bulkAdd(e, o, t) {
    const a = Array.isArray(o) ? o : void 0, s = (t = t || (a ? void 0 : o)) ? t.allKeys : void 0;
    return this._trans("readwrite", (n) => {
      const { auto: r, keyPath: c } = this.schema.primKey;
      if (c && a)
        throw new T.InvalidArgument("bulkAdd(): keys argument invalid on tables with inbound keys");
      if (a && a.length !== e.length)
        throw new T.InvalidArgument("Arguments objects and keys must have the same length");
      const l = e.length;
      let u = c && r ? e.map(Di(c)) : e;
      return this.core.mutate({ trans: n, type: "add", keys: a, values: u, wantResults: s }).then(({ numFailures: d, results: g, lastResult: p, failures: h }) => {
        if (d === 0)
          return s ? g : p;
        throw new pi(`${this.name}.bulkAdd(): ${d} of ${l} operations failed`, h);
      });
    });
  }
  bulkPut(e, o, t) {
    const a = Array.isArray(o) ? o : void 0, s = (t = t || (a ? void 0 : o)) ? t.allKeys : void 0;
    return this._trans("readwrite", (n) => {
      const { auto: r, keyPath: c } = this.schema.primKey;
      if (c && a)
        throw new T.InvalidArgument("bulkPut(): keys argument invalid on tables with inbound keys");
      if (a && a.length !== e.length)
        throw new T.InvalidArgument("Arguments objects and keys must have the same length");
      const l = e.length;
      let u = c && r ? e.map(Di(c)) : e;
      return this.core.mutate({ trans: n, type: "put", keys: a, values: u, wantResults: s }).then(({ numFailures: d, results: g, lastResult: p, failures: h }) => {
        if (d === 0)
          return s ? g : p;
        throw new pi(`${this.name}.bulkPut(): ${d} of ${l} operations failed`, h);
      });
    });
  }
  bulkDelete(e) {
    const o = e.length;
    return this._trans("readwrite", (t) => this.core.mutate({ trans: t, type: "delete", keys: e })).then(({ numFailures: t, lastResult: a, failures: s }) => {
      if (t === 0)
        return a;
      throw new pi(`${this.name}.bulkDelete(): ${t} of ${o} operations failed`, s);
    });
  }
}
function fi(i) {
  var e = {}, o = function(n, r) {
    if (r) {
      for (var c = arguments.length, l = new Array(c - 1); --c; )
        l[c - 1] = arguments[c];
      return e[n].subscribe.apply(null, l), i;
    }
    if (typeof n == "string")
      return e[n];
  };
  o.addEventType = s;
  for (var t = 1, a = arguments.length; t < a; ++t)
    s(arguments[t]);
  return o;
  function s(n, r, c) {
    if (typeof n != "object") {
      var l;
      r || (r = xn), c || (c = K);
      var u = { subscribers: [], fire: c, subscribe: function(d) {
        u.subscribers.indexOf(d) === -1 && (u.subscribers.push(d), u.fire = r(u.fire, d));
      }, unsubscribe: function(d) {
        u.subscribers = u.subscribers.filter(function(g) {
          return g !== d;
        }), u.fire = u.subscribers.reduce(r, c);
      } };
      return e[n] = o[n] = u, u;
    }
    z(l = n).forEach(function(d) {
      var g = l[d];
      if (W(g))
        s(d, l[d][0], l[d][1]);
      else {
        if (g !== "asap")
          throw new T.InvalidArgument("Invalid event config");
        var p = s(d, _i, function() {
          for (var h = arguments.length, v = new Array(h); h--; )
            v[h] = arguments[h];
          p.subscribers.forEach(function(b) {
            Ca(function() {
              b.apply(null, v);
            });
          });
        });
      }
    });
  }
}
function ri(i, e) {
  return Ge(e).from({ prototype: i }), e;
}
function $e(i, e) {
  return !(i.filter || i.algorithm || i.or) && (e ? i.justLimit : !i.replayFilter);
}
function Bo(i, e) {
  i.filter = Ue(i.filter, e);
}
function Eo(i, e, o) {
  var t = i.replayFilter;
  i.replayFilter = t ? () => Ue(t(), e()) : e, i.justLimit = o && !t;
}
function Gi(i, e) {
  if (i.isPrimKey)
    return e.primaryKey;
  const o = e.getIndexByKeyPath(i.index);
  if (!o)
    throw new T.Schema("KeyPath " + i.index + " on object store " + e.name + " is not indexed");
  return o;
}
function Mt(i, e, o) {
  const t = Gi(i, e.schema);
  return e.openCursor({ trans: o, values: !i.keysOnly, reverse: i.dir === "prev", unique: !!i.unique, query: { index: t, range: i.range } });
}
function Li(i, e, o, t) {
  const a = i.replayFilter ? Ue(i.filter, i.replayFilter()) : i.filter;
  if (i.or) {
    const s = {}, n = (r, c, l) => {
      if (!a || a(c, l, (g) => c.stop(g), (g) => c.fail(g))) {
        var u = c.primaryKey, d = "" + u;
        d === "[object ArrayBuffer]" && (d = "" + new Uint8Array(u)), ie(s, d) || (s[d] = !0, e(r, c, l));
      }
    };
    return Promise.all([i.or._iterate(n, o), $t(Mt(i, t, o), i.algorithm, n, !i.keysOnly && i.valueMapper)]);
  }
  return $t(Mt(i, t, o), Ue(i.algorithm, a), e, !i.keysOnly && i.valueMapper);
}
function $t(i, e, o, t) {
  var a = q(t ? (s, n, r) => o(t(s), n, r) : o);
  return i.then((s) => {
    if (s)
      return s.start(() => {
        var n = () => s.continue();
        e && !e(s, (r) => n = r, (r) => {
          s.stop(r), n = K;
        }, (r) => {
          s.fail(r), n = K;
        }) || a(s.value, s, (r) => n = r), n();
      });
  });
}
function G(i, e) {
  try {
    const o = zt(i), t = zt(e);
    if (o !== t)
      return o === "Array" ? 1 : t === "Array" ? -1 : o === "binary" ? 1 : t === "binary" ? -1 : o === "string" ? 1 : t === "string" ? -1 : o === "Date" ? 1 : t !== "Date" ? NaN : -1;
    switch (o) {
      case "number":
      case "Date":
      case "string":
        return i > e ? 1 : i < e ? -1 : 0;
      case "binary":
        return function(a, s) {
          const n = a.length, r = s.length, c = n < r ? n : r;
          for (let l = 0; l < c; ++l)
            if (a[l] !== s[l])
              return a[l] < s[l] ? -1 : 1;
          return n === r ? 0 : n < r ? -1 : 1;
        }(Ht(i), Ht(e));
      case "Array":
        return function(a, s) {
          const n = a.length, r = s.length, c = n < r ? n : r;
          for (let l = 0; l < c; ++l) {
            const u = G(a[l], s[l]);
            if (u !== 0)
              return u;
          }
          return n === r ? 0 : n < r ? -1 : 1;
        }(i, e);
    }
  } catch {
  }
  return NaN;
}
function zt(i) {
  const e = typeof i;
  if (e !== "object")
    return e;
  if (ArrayBuffer.isView(i))
    return "binary";
  const o = Lo(i);
  return o === "ArrayBuffer" ? "binary" : o;
}
function Ht(i) {
  return i instanceof Uint8Array ? i : ArrayBuffer.isView(i) ? new Uint8Array(i.buffer, i.byteOffset, i.byteLength) : new Uint8Array(i);
}
class Ln {
  _read(e, o) {
    var t = this._ctx;
    return t.error ? t.table._trans(null, H.bind(null, t.error)) : t.table._trans("readonly", e).then(o);
  }
  _write(e) {
    var o = this._ctx;
    return o.error ? o.table._trans(null, H.bind(null, o.error)) : o.table._trans("readwrite", e, "locked");
  }
  _addAlgorithm(e) {
    var o = this._ctx;
    o.algorithm = Ue(o.algorithm, e);
  }
  _iterate(e, o) {
    return Li(this._ctx, e, o, this._ctx.table.core);
  }
  clone(e) {
    var o = Object.create(this.constructor.prototype), t = Object.create(this._ctx);
    return e && Y(t, e), o._ctx = t, o;
  }
  raw() {
    return this._ctx.valueMapper = null, this;
  }
  each(e) {
    var o = this._ctx;
    return this._read((t) => Li(o, e, t, o.table.core));
  }
  count(e) {
    return this._read((o) => {
      const t = this._ctx, a = t.table.core;
      if ($e(t, !0))
        return a.count({ trans: o, query: { index: Gi(t, a.schema), range: t.range } }).then((n) => Math.min(n, t.limit));
      var s = 0;
      return Li(t, () => (++s, !1), o, a).then(() => s);
    }).then(e);
  }
  sortBy(e, o) {
    const t = e.split(".").reverse(), a = t[0], s = t.length - 1;
    function n(l, u) {
      return u ? n(l[t[u]], u - 1) : l[a];
    }
    var r = this._ctx.dir === "next" ? 1 : -1;
    function c(l, u) {
      var d = n(l, s), g = n(u, s);
      return d < g ? -r : d > g ? r : 0;
    }
    return this.toArray(function(l) {
      return l.sort(c);
    }).then(o);
  }
  toArray(e) {
    return this._read((o) => {
      var t = this._ctx;
      if (t.dir === "next" && $e(t, !0) && t.limit > 0) {
        const { valueMapper: a } = t, s = Gi(t, t.table.core.schema);
        return t.table.core.query({ trans: o, limit: t.limit, values: !0, query: { index: s, range: t.range } }).then(({ result: n }) => a ? n.map(a) : n);
      }
      {
        const a = [];
        return Li(t, (s) => a.push(s), o, t.table.core).then(() => a);
      }
    }, e);
  }
  offset(e) {
    var o = this._ctx;
    return e <= 0 || (o.offset += e, $e(o) ? Eo(o, () => {
      var t = e;
      return (a, s) => t === 0 || (t === 1 ? (--t, !1) : (s(() => {
        a.advance(t), t = 0;
      }), !1));
    }) : Eo(o, () => {
      var t = e;
      return () => --t < 0;
    })), this;
  }
  limit(e) {
    return this._ctx.limit = Math.min(this._ctx.limit, e), Eo(this._ctx, () => {
      var o = e;
      return function(t, a, s) {
        return --o <= 0 && a(s), o >= 0;
      };
    }, !0), this;
  }
  until(e, o) {
    return Bo(this._ctx, function(t, a, s) {
      return !e(t.value) || (a(s), o);
    }), this;
  }
  first(e) {
    return this.limit(1).toArray(function(o) {
      return o[0];
    }).then(e);
  }
  last(e) {
    return this.reverse().first(e);
  }
  filter(e) {
    var o, t;
    return Bo(this._ctx, function(a) {
      return e(a.value);
    }), o = this._ctx, t = e, o.isMatch = Ue(o.isMatch, t), this;
  }
  and(e) {
    return this.filter(e);
  }
  or(e) {
    return new this.db.WhereClause(this._ctx.table, e, this);
  }
  reverse() {
    return this._ctx.dir = this._ctx.dir === "prev" ? "next" : "prev", this._ondirectionchange && this._ondirectionchange(this._ctx.dir), this;
  }
  desc() {
    return this.reverse();
  }
  eachKey(e) {
    var o = this._ctx;
    return o.keysOnly = !o.isMatch, this.each(function(t, a) {
      e(a.key, a);
    });
  }
  eachUniqueKey(e) {
    return this._ctx.unique = "unique", this.eachKey(e);
  }
  eachPrimaryKey(e) {
    var o = this._ctx;
    return o.keysOnly = !o.isMatch, this.each(function(t, a) {
      e(a.primaryKey, a);
    });
  }
  keys(e) {
    var o = this._ctx;
    o.keysOnly = !o.isMatch;
    var t = [];
    return this.each(function(a, s) {
      t.push(s.key);
    }).then(function() {
      return t;
    }).then(e);
  }
  primaryKeys(e) {
    var o = this._ctx;
    if (o.dir === "next" && $e(o, !0) && o.limit > 0)
      return this._read((a) => {
        var s = Gi(o, o.table.core.schema);
        return o.table.core.query({ trans: a, values: !1, limit: o.limit, query: { index: s, range: o.range } });
      }).then(({ result: a }) => a).then(e);
    o.keysOnly = !o.isMatch;
    var t = [];
    return this.each(function(a, s) {
      t.push(s.primaryKey);
    }).then(function() {
      return t;
    }).then(e);
  }
  uniqueKeys(e) {
    return this._ctx.unique = "unique", this.keys(e);
  }
  firstKey(e) {
    return this.limit(1).keys(function(o) {
      return o[0];
    }).then(e);
  }
  lastKey(e) {
    return this.reverse().firstKey(e);
  }
  distinct() {
    var e = this._ctx, o = e.index && e.table.schema.idxByName[e.index];
    if (!o || !o.multi)
      return this;
    var t = {};
    return Bo(this._ctx, function(a) {
      var s = a.primaryKey.toString(), n = ie(t, s);
      return t[s] = !0, !n;
    }), this;
  }
  modify(e) {
    var o = this._ctx;
    return this._write((t) => {
      var a;
      if (typeof e == "function")
        a = e;
      else {
        var s = z(e), n = s.length;
        a = function(v) {
          for (var b = !1, y = 0; y < n; ++y) {
            var m = s[y], j = e[m];
            be(v, m) !== j && (ne(v, m, j), b = !0);
          }
          return b;
        };
      }
      const r = o.table.core, { outbound: c, extractKey: l } = r.schema.primaryKey, u = this.db._options.modifyChunkSize || 200, d = [];
      let g = 0;
      const p = [], h = (v, b) => {
        const { failures: y, numFailures: m } = b;
        g += v - m;
        for (let j of z(y))
          d.push(y[j]);
      };
      return this.clone().primaryKeys().then((v) => {
        const b = (y) => {
          const m = Math.min(u, v.length - y);
          return r.getMany({ trans: t, keys: v.slice(y, y + m), cache: "immutable" }).then((j) => {
            const w = [], S = [], O = c ? [] : null, k = [];
            for (let x = 0; x < m; ++x) {
              const L = j[x], R = { value: Oi(L), primKey: v[y + x] };
              a.call(R, R.value, R) !== !1 && (R.value == null ? k.push(v[y + x]) : c || G(l(L), l(R.value)) === 0 ? (S.push(R.value), c && O.push(v[y + x])) : (k.push(v[y + x]), w.push(R.value)));
            }
            const E = $e(o) && o.limit === 1 / 0 && (typeof e != "function" || e === Ao) && { index: o.index, range: o.range };
            return Promise.resolve(w.length > 0 && r.mutate({ trans: t, type: "add", values: w }).then((x) => {
              for (let L in x.failures)
                k.splice(parseInt(L), 1);
              h(w.length, x);
            })).then(() => (S.length > 0 || E && typeof e == "object") && r.mutate({ trans: t, type: "put", keys: O, values: S, criteria: E, changeSpec: typeof e != "function" && e }).then((x) => h(S.length, x))).then(() => (k.length > 0 || E && e === Ao) && r.mutate({ trans: t, type: "delete", keys: k, criteria: E }).then((x) => h(k.length, x))).then(() => v.length > y + m && b(y + u));
          });
        };
        return b(0).then(() => {
          if (d.length > 0)
            throw new oo("Error modifying one or more objects", d, g, p);
          return v.length;
        });
      });
    });
  }
  delete() {
    var e = this._ctx, o = e.range;
    return $e(e) && (e.isPrimKey && !Nn || o.type === 3) ? this._write((t) => {
      const { primaryKey: a } = e.table.core.schema, s = o;
      return e.table.core.count({ trans: t, query: { index: a, range: s } }).then((n) => e.table.core.mutate({ trans: t, type: "deleteRange", range: s }).then(({ failures: r, lastResult: c, results: l, numFailures: u }) => {
        if (u)
          throw new oo("Could not delete some values", Object.keys(r).map((d) => r[d]), n - u);
        return n - u;
      }));
    }) : this.modify(Ao);
  }
}
const Ao = (i, e) => e.value = null;
function In(i, e) {
  return i < e ? -1 : i === e ? 0 : 1;
}
function Kn(i, e) {
  return i > e ? -1 : i === e ? 0 : 1;
}
function ee(i, e, o) {
  var t = i instanceof os ? new i.Collection(i) : i;
  return t._ctx.error = o ? new o(e) : new TypeError(e), t;
}
function ze(i) {
  return new i.Collection(i, () => is("")).limit(0);
}
function Un(i, e, o, t, a, s) {
  for (var n = Math.min(i.length, t.length), r = -1, c = 0; c < n; ++c) {
    var l = e[c];
    if (l !== t[c])
      return a(i[c], o[c]) < 0 ? i.substr(0, c) + o[c] + o.substr(c + 1) : a(i[c], t[c]) < 0 ? i.substr(0, c) + t[c] + o.substr(c + 1) : r >= 0 ? i.substr(0, r) + e[r] + o.substr(r + 1) : null;
    a(i[c], l) < 0 && (r = c);
  }
  return n < t.length && s === "next" ? i + o.substr(i.length) : n < i.length && s === "prev" ? i.substr(0, o.length) : r < 0 ? null : i.substr(0, r) + t[r] + o.substr(r + 1);
}
function Ii(i, e, o, t) {
  var a, s, n, r, c, l, u, d = o.length;
  if (!o.every((v) => typeof v == "string"))
    return ee(i, Qa);
  function g(v) {
    a = function(y) {
      return y === "next" ? (m) => m.toUpperCase() : (m) => m.toLowerCase();
    }(v), s = function(y) {
      return y === "next" ? (m) => m.toLowerCase() : (m) => m.toUpperCase();
    }(v), n = v === "next" ? In : Kn;
    var b = o.map(function(y) {
      return { lower: s(y), upper: a(y) };
    }).sort(function(y, m) {
      return n(y.lower, m.lower);
    });
    r = b.map(function(y) {
      return y.upper;
    }), c = b.map(function(y) {
      return y.lower;
    }), l = v, u = v === "next" ? "" : t;
  }
  g("next");
  var p = new i.Collection(i, () => Se(r[0], c[d - 1] + t));
  p._ondirectionchange = function(v) {
    g(v);
  };
  var h = 0;
  return p._addAlgorithm(function(v, b, y) {
    var m = v.key;
    if (typeof m != "string")
      return !1;
    var j = s(m);
    if (e(j, c, h))
      return !0;
    for (var w = null, S = h; S < d; ++S) {
      var O = Un(m, j, r[S], c[S], n, l);
      O === null && w === null ? h = S + 1 : (w === null || n(w, O) > 0) && (w = O);
    }
    return b(w !== null ? function() {
      v.continue(w + u);
    } : y), !1;
  }), p;
}
function Se(i, e, o, t) {
  return { type: 2, lower: i, upper: e, lowerOpen: o, upperOpen: t };
}
function is(i) {
  return { type: 1, lower: i, upper: i };
}
class os {
  get Collection() {
    return this._ctx.table.db.Collection;
  }
  between(e, o, t, a) {
    t = t !== !1, a = a === !0;
    try {
      return this._cmp(e, o) > 0 || this._cmp(e, o) === 0 && (t || a) && (!t || !a) ? ze(this) : new this.Collection(this, () => Se(e, o, !t, !a));
    } catch {
      return ee(this, me);
    }
  }
  equals(e) {
    return e == null ? ee(this, me) : new this.Collection(this, () => is(e));
  }
  above(e) {
    return e == null ? ee(this, me) : new this.Collection(this, () => Se(e, void 0, !0));
  }
  aboveOrEqual(e) {
    return e == null ? ee(this, me) : new this.Collection(this, () => Se(e, void 0, !1));
  }
  below(e) {
    return e == null ? ee(this, me) : new this.Collection(this, () => Se(void 0, e, !1, !0));
  }
  belowOrEqual(e) {
    return e == null ? ee(this, me) : new this.Collection(this, () => Se(void 0, e));
  }
  startsWith(e) {
    return typeof e != "string" ? ee(this, Qa) : this.between(e, e + De, !0, !0);
  }
  startsWithIgnoreCase(e) {
    return e === "" ? this.startsWith(e) : Ii(this, (o, t) => o.indexOf(t[0]) === 0, [e], De);
  }
  equalsIgnoreCase(e) {
    return Ii(this, (o, t) => o === t[0], [e], "");
  }
  anyOfIgnoreCase() {
    var e = he.apply(We, arguments);
    return e.length === 0 ? ze(this) : Ii(this, (o, t) => t.indexOf(o) !== -1, e, "");
  }
  startsWithAnyOfIgnoreCase() {
    var e = he.apply(We, arguments);
    return e.length === 0 ? ze(this) : Ii(this, (o, t) => t.some((a) => o.indexOf(a) === 0), e, De);
  }
  anyOf() {
    const e = he.apply(We, arguments);
    let o = this._cmp;
    try {
      e.sort(o);
    } catch {
      return ee(this, me);
    }
    if (e.length === 0)
      return ze(this);
    const t = new this.Collection(this, () => Se(e[0], e[e.length - 1]));
    t._ondirectionchange = (s) => {
      o = s === "next" ? this._ascending : this._descending, e.sort(o);
    };
    let a = 0;
    return t._addAlgorithm((s, n, r) => {
      const c = s.key;
      for (; o(c, e[a]) > 0; )
        if (++a, a === e.length)
          return n(r), !1;
      return o(c, e[a]) === 0 || (n(() => {
        s.continue(e[a]);
      }), !1);
    }), t;
  }
  notEqual(e) {
    return this.inAnyRange([[Go, e], [e, this.db._maxKey]], { includeLowers: !1, includeUppers: !1 });
  }
  noneOf() {
    const e = he.apply(We, arguments);
    if (e.length === 0)
      return new this.Collection(this);
    try {
      e.sort(this._ascending);
    } catch {
      return ee(this, me);
    }
    const o = e.reduce((t, a) => t ? t.concat([[t[t.length - 1][1], a]]) : [[Go, a]], null);
    return o.push([e[e.length - 1], this.db._maxKey]), this.inAnyRange(o, { includeLowers: !1, includeUppers: !1 });
  }
  inAnyRange(e, o) {
    const t = this._cmp, a = this._ascending, s = this._descending, n = this._min, r = this._max;
    if (e.length === 0)
      return ze(this);
    if (!e.every((m) => m[0] !== void 0 && m[1] !== void 0 && a(m[0], m[1]) <= 0))
      return ee(this, "First argument to inAnyRange() must be an Array of two-value Arrays [lower,upper] where upper must not be lower than lower", T.InvalidArgument);
    const c = !o || o.includeLowers !== !1, l = o && o.includeUppers === !0;
    let u, d = a;
    function g(m, j) {
      return d(m[0], j[0]);
    }
    try {
      u = e.reduce(function(m, j) {
        let w = 0, S = m.length;
        for (; w < S; ++w) {
          const O = m[w];
          if (t(j[0], O[1]) < 0 && t(j[1], O[0]) > 0) {
            O[0] = n(O[0], j[0]), O[1] = r(O[1], j[1]);
            break;
          }
        }
        return w === S && m.push(j), m;
      }, []), u.sort(g);
    } catch {
      return ee(this, me);
    }
    let p = 0;
    const h = l ? (m) => a(m, u[p][1]) > 0 : (m) => a(m, u[p][1]) >= 0, v = c ? (m) => s(m, u[p][0]) > 0 : (m) => s(m, u[p][0]) >= 0;
    let b = h;
    const y = new this.Collection(this, () => Se(u[0][0], u[u.length - 1][1], !c, !l));
    return y._ondirectionchange = (m) => {
      m === "next" ? (b = h, d = a) : (b = v, d = s), u.sort(g);
    }, y._addAlgorithm((m, j, w) => {
      for (var S = m.key; b(S); )
        if (++p, p === u.length)
          return j(w), !1;
      return !!function(O) {
        return !h(O) && !v(O);
      }(S) || (this._cmp(S, u[p][1]) === 0 || this._cmp(S, u[p][0]) === 0 || j(() => {
        d === a ? m.continue(u[p][0]) : m.continue(u[p][1]);
      }), !1);
    }), y;
  }
  startsWithAnyOf() {
    const e = he.apply(We, arguments);
    return e.every((o) => typeof o == "string") ? e.length === 0 ? ze(this) : this.inAnyRange(e.map((o) => [o, o + De])) : ee(this, "startsWithAnyOf() only works with strings");
  }
}
function ue(i) {
  return q(function(e) {
    return ji(e), i(e.target.error), !1;
  });
}
function ji(i) {
  i.stopPropagation && i.stopPropagation(), i.preventDefault && i.preventDefault();
}
const wi = "storagemutated", xe = "x-storagemutated-1", Re = fi(null, wi);
class qn {
  _lock() {
    return di(!B.global), ++this._reculock, this._reculock !== 1 || B.global || (B.lockOwnerFor = this), this;
  }
  _unlock() {
    if (di(!B.global), --this._reculock == 0)
      for (B.global || (B.lockOwnerFor = null); this._blockedFuncs.length > 0 && !this._locked(); ) {
        var e = this._blockedFuncs.shift();
        try {
          ei(e[1], e[0]);
        } catch {
        }
      }
    return this;
  }
  _locked() {
    return this._reculock && B.lockOwnerFor !== this;
  }
  create(e) {
    if (!this.mode)
      return this;
    const o = this.db.idbdb, t = this.db._state.dbOpenError;
    if (di(!this.idbtrans), !e && !o)
      switch (t && t.name) {
        case "DatabaseClosedError":
          throw new T.DatabaseClosed(t);
        case "MissingAPIError":
          throw new T.MissingAPI(t.message, t);
        default:
          throw new T.OpenFailed(t);
      }
    if (!this.active)
      throw new T.TransactionInactive();
    return di(this._completion._state === null), (e = this.idbtrans = e || (this.db.core ? this.db.core.transaction(this.storeNames, this.mode, { durability: this.chromeTransactionDurability }) : o.transaction(this.storeNames, this.mode, { durability: this.chromeTransactionDurability }))).onerror = q((a) => {
      ji(a), this._reject(e.error);
    }), e.onabort = q((a) => {
      ji(a), this.active && this._reject(new T.Abort(e.error)), this.active = !1, this.on("abort").fire(a);
    }), e.oncomplete = q(() => {
      this.active = !1, this._resolve(), "mutatedParts" in e && Re.storagemutated.fire(e.mutatedParts);
    }), this;
  }
  _promise(e, o, t) {
    if (e === "readwrite" && this.mode !== "readwrite")
      return H(new T.ReadOnly("Transaction is readonly"));
    if (!this.active)
      return H(new T.TransactionInactive());
    if (this._locked())
      return new F((s, n) => {
        this._blockedFuncs.push([() => {
          this._promise(e, o, t).then(s, n);
        }, B]);
      });
    if (t)
      return Ae(() => {
        var s = new F((n, r) => {
          this._lock();
          const c = o(n, r, this);
          c && c.then && c.then(n, r);
        });
        return s.finally(() => this._unlock()), s._lib = !0, s;
      });
    var a = new F((s, n) => {
      var r = o(s, n, this);
      r && r.then && r.then(s, n);
    });
    return a._lib = !0, a;
  }
  _root() {
    return this.parent ? this.parent._root() : this;
  }
  waitFor(e) {
    var o = this._root();
    const t = F.resolve(e);
    if (o._waitingFor)
      o._waitingFor = o._waitingFor.then(() => t);
    else {
      o._waitingFor = t, o._waitingQueue = [];
      var a = o.idbtrans.objectStore(o.storeNames[0]);
      (function n() {
        for (++o._spinCount; o._waitingQueue.length; )
          o._waitingQueue.shift()();
        o._waitingFor && (a.get(-1 / 0).onsuccess = n);
      })();
    }
    var s = o._waitingFor;
    return new F((n, r) => {
      t.then((c) => o._waitingQueue.push(q(n.bind(null, c))), (c) => o._waitingQueue.push(q(r.bind(null, c)))).finally(() => {
        o._waitingFor === s && (o._waitingFor = null);
      });
    });
  }
  abort() {
    this.active && (this.active = !1, this.idbtrans && this.idbtrans.abort(), this._reject(new T.Abort()));
  }
  table(e) {
    const o = this._memoizedTables || (this._memoizedTables = {});
    if (ie(o, e))
      return o[e];
    const t = this.schema[e];
    if (!t)
      throw new T.NotFound("Table " + e + " not part of transaction");
    const a = new this.db.Table(e, t, this);
    return a.core = this.db.core.table(e), o[e] = a, a;
  }
}
function Xo(i, e, o, t, a, s, n) {
  return { name: i, keyPath: e, unique: o, multi: t, auto: a, compound: s, src: (o && !n ? "&" : "") + (t ? "*" : "") + (a ? "++" : "") + ts(e) };
}
function ts(i) {
  return typeof i == "string" ? i : i ? "[" + [].join.call(i, "+") + "]" : "";
}
function as(i, e, o) {
  return { name: i, primKey: e, indexes: o, mappedClass: null, idxByName: Na(o, (t) => [t.name, t]) };
}
let ki = (i) => {
  try {
    return i.only([[]]), ki = () => [[]], [[]];
  } catch {
    return ki = () => De, De;
  }
};
function Yo(i) {
  return i == null ? () => {
  } : typeof i == "string" ? function(e) {
    return e.split(".").length === 1 ? (t) => t[e] : (t) => be(t, e);
  }(i) : (e) => be(e, i);
}
function Vt(i) {
  return [].slice.call(i);
}
let Mn = 0;
function hi(i) {
  return i == null ? ":id" : typeof i == "string" ? i : `[${i.join("+")}]`;
}
function $n(i, e, o) {
  function t(c) {
    if (c.type === 3)
      return null;
    if (c.type === 4)
      throw new Error("Cannot convert never type to IDBKeyRange");
    const { lower: l, upper: u, lowerOpen: d, upperOpen: g } = c;
    return l === void 0 ? u === void 0 ? null : e.upperBound(u, !!g) : u === void 0 ? e.lowerBound(l, !!d) : e.bound(l, u, !!d, !!g);
  }
  const { schema: a, hasGetAll: s } = function(c, l) {
    const u = Vt(c.objectStoreNames);
    return { schema: { name: c.name, tables: u.map((d) => l.objectStore(d)).map((d) => {
      const { keyPath: g, autoIncrement: p } = d, h = W(g), v = g == null, b = {}, y = { name: d.name, primaryKey: { name: null, isPrimaryKey: !0, outbound: v, compound: h, keyPath: g, autoIncrement: p, unique: !0, extractKey: Yo(g) }, indexes: Vt(d.indexNames).map((m) => d.index(m)).map((m) => {
        const { name: j, unique: w, multiEntry: S, keyPath: O } = m, k = { name: j, compound: W(O), keyPath: O, unique: w, multiEntry: S, extractKey: Yo(O) };
        return b[hi(O)] = k, k;
      }), getIndexByKeyPath: (m) => b[hi(m)] };
      return b[":id"] = y.primaryKey, g != null && (b[hi(g)] = y.primaryKey), y;
    }) }, hasGetAll: u.length > 0 && "getAll" in l.objectStore(u[0]) && !(typeof navigator < "u" && /Safari/.test(navigator.userAgent) && !/(Chrome\/|Edge\/)/.test(navigator.userAgent) && [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604) };
  }(i, o), n = a.tables.map((c) => function(l) {
    const u = l.name;
    return { name: u, schema: l, mutate: function({ trans: d, type: g, keys: p, values: h, range: v }) {
      return new Promise((b, y) => {
        b = q(b);
        const m = d.objectStore(u), j = m.keyPath == null, w = g === "put" || g === "add";
        if (!w && g !== "delete" && g !== "deleteRange")
          throw new Error("Invalid operation type: " + g);
        const { length: S } = p || h || { length: 1 };
        if (p && h && p.length !== h.length)
          throw new Error("Given keys array must have same length as given values array.");
        if (S === 0)
          return b({ numFailures: 0, failures: {}, results: [], lastResult: void 0 });
        let O;
        const k = [], E = [];
        let x = 0;
        const L = (M) => {
          ++x, ji(M);
        };
        if (g === "deleteRange") {
          if (v.type === 4)
            return b({ numFailures: x, failures: E, results: [], lastResult: void 0 });
          v.type === 3 ? k.push(O = m.clear()) : k.push(O = m.delete(t(v)));
        } else {
          const [M, $] = w ? j ? [h, p] : [h, null] : [p, null];
          if (w)
            for (let f = 0; f < S; ++f)
              k.push(O = $ && $[f] !== void 0 ? m[g](M[f], $[f]) : m[g](M[f])), O.onerror = L;
          else
            for (let f = 0; f < S; ++f)
              k.push(O = m[g](M[f])), O.onerror = L;
        }
        const R = (M) => {
          const $ = M.target.result;
          k.forEach((f, P) => f.error != null && (E[P] = f.error)), b({ numFailures: x, failures: E, results: g === "delete" ? p : k.map((f) => f.result), lastResult: $ });
        };
        O.onerror = (M) => {
          L(M), R(M);
        }, O.onsuccess = R;
      });
    }, getMany: ({ trans: d, keys: g }) => new Promise((p, h) => {
      p = q(p);
      const v = d.objectStore(u), b = g.length, y = new Array(b);
      let m, j = 0, w = 0;
      const S = (k) => {
        const E = k.target;
        y[E._pos] = E.result, ++w === j && p(y);
      }, O = ue(h);
      for (let k = 0; k < b; ++k)
        g[k] != null && (m = v.get(g[k]), m._pos = k, m.onsuccess = S, m.onerror = O, ++j);
      j === 0 && p(y);
    }), get: ({ trans: d, key: g }) => new Promise((p, h) => {
      p = q(p);
      const v = d.objectStore(u).get(g);
      v.onsuccess = (b) => p(b.target.result), v.onerror = ue(h);
    }), query: function(d) {
      return (g) => new Promise((p, h) => {
        p = q(p);
        const { trans: v, values: b, limit: y, query: m } = g, j = y === 1 / 0 ? void 0 : y, { index: w, range: S } = m, O = v.objectStore(u), k = w.isPrimaryKey ? O : O.index(w.name), E = t(S);
        if (y === 0)
          return p({ result: [] });
        if (d) {
          const x = b ? k.getAll(E, j) : k.getAllKeys(E, j);
          x.onsuccess = (L) => p({ result: L.target.result }), x.onerror = ue(h);
        } else {
          let x = 0;
          const L = b || !("openKeyCursor" in k) ? k.openCursor(E) : k.openKeyCursor(E), R = [];
          L.onsuccess = (M) => {
            const $ = L.result;
            return $ ? (R.push(b ? $.value : $.primaryKey), ++x === y ? p({ result: R }) : void $.continue()) : p({ result: R });
          }, L.onerror = ue(h);
        }
      });
    }(s), openCursor: function({ trans: d, values: g, query: p, reverse: h, unique: v }) {
      return new Promise((b, y) => {
        b = q(b);
        const { index: m, range: j } = p, w = d.objectStore(u), S = m.isPrimaryKey ? w : w.index(m.name), O = h ? v ? "prevunique" : "prev" : v ? "nextunique" : "next", k = g || !("openKeyCursor" in S) ? S.openCursor(t(j), O) : S.openKeyCursor(t(j), O);
        k.onerror = ue(y), k.onsuccess = q((E) => {
          const x = k.result;
          if (!x)
            return void b(null);
          x.___id = ++Mn, x.done = !1;
          const L = x.continue.bind(x);
          let R = x.continuePrimaryKey;
          R && (R = R.bind(x));
          const M = x.advance.bind(x), $ = () => {
            throw new Error("Cursor not stopped");
          };
          x.trans = d, x.stop = x.continue = x.continuePrimaryKey = x.advance = () => {
            throw new Error("Cursor not started");
          }, x.fail = q(y), x.next = function() {
            let f = 1;
            return this.start(() => f-- ? this.continue() : this.stop()).then(() => this);
          }, x.start = (f) => {
            const P = new Promise((C, I) => {
              C = q(C), k.onerror = ue(I), x.fail = I, x.stop = (N) => {
                x.stop = x.continue = x.continuePrimaryKey = x.advance = $, C(N);
              };
            }), A = () => {
              if (k.result)
                try {
                  f();
                } catch (C) {
                  x.fail(C);
                }
              else
                x.done = !0, x.start = () => {
                  throw new Error("Cursor behind last entry");
                }, x.stop();
            };
            return k.onsuccess = q((C) => {
              k.onsuccess = A, A();
            }), x.continue = L, x.continuePrimaryKey = R, x.advance = M, A(), P;
          }, b(x);
        }, y);
      });
    }, count({ query: d, trans: g }) {
      const { index: p, range: h } = d;
      return new Promise((v, b) => {
        const y = g.objectStore(u), m = p.isPrimaryKey ? y : y.index(p.name), j = t(h), w = j ? m.count(j) : m.count();
        w.onsuccess = q((S) => v(S.target.result)), w.onerror = ue(b);
      });
    } };
  }(c)), r = {};
  return n.forEach((c) => r[c.name] = c), { stack: "dbcore", transaction: i.transaction.bind(i), table(c) {
    if (!r[c])
      throw new Error(`Table '${c}' not found`);
    return r[c];
  }, MIN_KEY: -1 / 0, MAX_KEY: ki(e), schema: a };
}
function Qo({ _novip: i }, e) {
  const o = e.db, t = function(a, s, { IDBKeyRange: n, indexedDB: r }, c) {
    return { dbcore: function(u, d) {
      return d.reduce((g, { create: p }) => ({ ...g, ...p(g) }), u);
    }($n(s, n, c), a.dbcore) };
  }(i._middlewares, o, i._deps, e);
  i.core = t.dbcore, i.tables.forEach((a) => {
    const s = a.name;
    i.core.schema.tables.some((n) => n.name === s) && (a.core = i.core.table(s), i[s] instanceof i.Table && (i[s].core = a.core));
  });
}
function ro({ _novip: i }, e, o, t) {
  o.forEach((a) => {
    const s = t[a];
    e.forEach((n) => {
      const r = pt(n, a);
      (!r || "value" in r && r.value === void 0) && (n === i.Transaction.prototype || n instanceof i.Transaction ? _e(n, a, { get() {
        return this.table(a);
      }, set(c) {
        Ta(this, a, { value: c, writable: !0, configurable: !0, enumerable: !0 });
      } }) : n[a] = new i.Table(a, s));
    });
  });
}
function Zo({ _novip: i }, e) {
  e.forEach((o) => {
    for (let t in o)
      o[t] instanceof i.Table && delete o[t];
  });
}
function zn(i, e) {
  return i._cfg.version - e._cfg.version;
}
function Hn(i, e, o, t) {
  const a = i._dbSchema, s = i._createTransaction("readwrite", i._storeNames, a);
  s.create(o), s._completion.catch(t);
  const n = s._reject.bind(s), r = B.transless || B;
  Ae(() => {
    B.trans = s, B.transless = r, e === 0 ? (z(a).forEach((c) => {
      To(o, c, a[c].primKey, a[c].indexes);
    }), Qo(i, o), F.follow(() => i.on.populate.fire(s)).catch(n)) : function({ _novip: c }, l, u, d) {
      const g = [], p = c._versions;
      let h = c._dbSchema = it(c, c.idbdb, d), v = !1;
      const b = p.filter((m) => m._cfg.version >= l);
      function y() {
        return g.length ? F.resolve(g.shift()(u.idbtrans)).then(y) : F.resolve();
      }
      return b.forEach((m) => {
        g.push(() => {
          const j = h, w = m._cfg.dbschema;
          ot(c, j, d), ot(c, w, d), h = c._dbSchema = w;
          const S = ss(j, w);
          S.add.forEach((k) => {
            To(d, k[0], k[1].primKey, k[1].indexes);
          }), S.change.forEach((k) => {
            if (k.recreate)
              throw new T.Upgrade("Not yet support for changing primary key");
            {
              const E = d.objectStore(k.name);
              k.add.forEach((x) => et(E, x)), k.change.forEach((x) => {
                E.deleteIndex(x.name), et(E, x);
              }), k.del.forEach((x) => E.deleteIndex(x));
            }
          });
          const O = m._cfg.contentUpgrade;
          if (O && m._cfg.version > l) {
            Qo(c, d), u._memoizedTables = {}, v = !0;
            let k = Da(w);
            S.del.forEach((R) => {
              k[R] = j[R];
            }), Zo(c, [c.Transaction.prototype]), ro(c, [c.Transaction.prototype], z(k), k), u.schema = k;
            const E = mt(O);
            let x;
            E && Ze();
            const L = F.follow(() => {
              if (x = O(u), x && E) {
                var R = we.bind(null, null);
                x.then(R, R);
              }
            });
            return x && typeof x.then == "function" ? F.resolve(x) : L.then(() => x);
          }
        }), g.push((j) => {
          (!v || !Cn) && function(w, S) {
            [].slice.call(S.db.objectStoreNames).forEach((O) => w[O] == null && S.db.deleteObjectStore(O));
          }(m._cfg.dbschema, j), Zo(c, [c.Transaction.prototype]), ro(c, [c.Transaction.prototype], c._storeNames, c._dbSchema), u.schema = c._dbSchema;
        });
      }), y().then(() => {
        var m, j;
        j = d, z(m = h).forEach((w) => {
          j.db.objectStoreNames.contains(w) || To(j, w, m[w].primKey, m[w].indexes);
        });
      });
    }(i, e, s, o).catch(n);
  });
}
function ss(i, e) {
  const o = { del: [], add: [], change: [] };
  let t;
  for (t in i)
    e[t] || o.del.push(t);
  for (t in e) {
    const a = i[t], s = e[t];
    if (a) {
      const n = { name: t, def: s, recreate: !1, del: [], add: [], change: [] };
      if ("" + (a.primKey.keyPath || "") != "" + (s.primKey.keyPath || "") || a.primKey.auto !== s.primKey.auto && !yo)
        n.recreate = !0, o.change.push(n);
      else {
        const r = a.idxByName, c = s.idxByName;
        let l;
        for (l in r)
          c[l] || n.del.push(l);
        for (l in c) {
          const u = r[l], d = c[l];
          u ? u.src !== d.src && n.change.push(d) : n.add.push(d);
        }
        (n.del.length > 0 || n.add.length > 0 || n.change.length > 0) && o.change.push(n);
      }
    } else
      o.add.push([t, s]);
  }
  return o;
}
function To(i, e, o, t) {
  const a = i.db.createObjectStore(e, o.keyPath ? { keyPath: o.keyPath, autoIncrement: o.auto } : { autoIncrement: o.auto });
  return t.forEach((s) => et(a, s)), a;
}
function et(i, e) {
  i.createIndex(e.name, e.keyPath, { unique: e.unique, multiEntry: e.multi });
}
function it(i, e, o) {
  const t = {};
  return io(e.objectStoreNames, 0).forEach((a) => {
    const s = o.objectStore(a);
    let n = s.keyPath;
    const r = Xo(ts(n), n || "", !1, !1, !!s.autoIncrement, n && typeof n != "string", !0), c = [];
    for (let u = 0; u < s.indexNames.length; ++u) {
      const d = s.index(s.indexNames[u]);
      n = d.keyPath;
      var l = Xo(d.name, n, !!d.unique, !!d.multiEntry, !1, n && typeof n != "string", !1);
      c.push(l);
    }
    t[a] = as(a, r, c);
  }), t;
}
function ot({ _novip: i }, e, o) {
  const t = o.db.objectStoreNames;
  for (let a = 0; a < t.length; ++a) {
    const s = t[a], n = o.objectStore(s);
    i._hasGetAll = "getAll" in n;
    for (let r = 0; r < n.indexNames.length; ++r) {
      const c = n.indexNames[r], l = n.index(c).keyPath, u = typeof l == "string" ? l : "[" + io(l).join("+") + "]";
      if (e[s]) {
        const d = e[s].idxByName[u];
        d && (d.name = c, delete e[s].idxByName[u], e[s].idxByName[c] = d);
      }
    }
  }
  typeof navigator < "u" && /Safari/.test(navigator.userAgent) && !/(Chrome\/|Edge\/)/.test(navigator.userAgent) && U.WorkerGlobalScope && U instanceof U.WorkerGlobalScope && [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604 && (i._hasGetAll = !1);
}
class Vn {
  _parseStoresSpec(e, o) {
    z(e).forEach((t) => {
      if (e[t] !== null) {
        var a = e[t].split(",").map((n, r) => {
          const c = (n = n.trim()).replace(/([&*]|\+\+)/g, ""), l = /^\[/.test(c) ? c.match(/^\[(.*)\]$/)[1].split("+") : c;
          return Xo(c, l || null, /\&/.test(n), /\*/.test(n), /\+\+/.test(n), W(l), r === 0);
        }), s = a.shift();
        if (s.multi)
          throw new T.Schema("Primary key cannot be multi-valued");
        a.forEach((n) => {
          if (n.auto)
            throw new T.Schema("Only primary key can be marked as autoIncrement (++)");
          if (!n.keyPath)
            throw new T.Schema("Index must have a name and cannot be an empty string");
        }), o[t] = as(t, s, a);
      }
    });
  }
  stores(e) {
    const o = this.db;
    this._cfg.storesSource = this._cfg.storesSource ? Y(this._cfg.storesSource, e) : e;
    const t = o._versions, a = {};
    let s = {};
    return t.forEach((n) => {
      Y(a, n._cfg.storesSource), s = n._cfg.dbschema = {}, n._parseStoresSpec(a, s);
    }), o._dbSchema = s, Zo(o, [o._allTables, o, o.Transaction.prototype]), ro(o, [o._allTables, o, o.Transaction.prototype, this._cfg.tables], z(s), s), o._storeNames = z(s), this;
  }
  upgrade(e) {
    return this._cfg.contentUpgrade = ht(this._cfg.contentUpgrade || K, e), this;
  }
}
function jt(i, e) {
  let o = i._dbNamesDB;
  return o || (o = i._dbNamesDB = new Be(fo, { addons: [], indexedDB: i, IDBKeyRange: e }), o.version(1).stores({ dbnames: "name" })), o.table("dbnames");
}
function wt(i) {
  return i && typeof i.databases == "function";
}
function tt(i) {
  return Ae(function() {
    return B.letThrough = !0, i();
  });
}
function Wn() {
  var i;
  return !navigator.userAgentData && /Safari\//.test(navigator.userAgent) && !/Chrom(e|ium)\//.test(navigator.userAgent) && indexedDB.databases ? new Promise(function(e) {
    var o = function() {
      return indexedDB.databases().finally(e);
    };
    i = setInterval(o, 100), o();
  }).finally(function() {
    return clearInterval(i);
  }) : Promise.resolve();
}
function Jn(i) {
  const e = i._state, { indexedDB: o } = i._deps;
  if (e.isBeingOpened || i.idbdb)
    return e.dbReadyPromise.then(() => e.dbOpenError ? H(e.dbOpenError) : i);
  pe && (e.openCanceller._stackHolder = qe()), e.isBeingOpened = !0, e.dbOpenError = null, e.openComplete = !1;
  const t = e.openCanceller;
  function a() {
    if (e.openCanceller !== t)
      throw new T.DatabaseClosed("db.open() was cancelled");
  }
  let s = e.dbReadyResolve, n = null, r = !1;
  const c = () => new F((l, u) => {
    if (a(), !o)
      throw new T.MissingAPI();
    const d = i.name, g = e.autoSchema ? o.open(d) : o.open(d, Math.round(10 * i.verno));
    if (!g)
      throw new T.MissingAPI();
    g.onerror = ue(u), g.onblocked = q(i._fireOnBlocked), g.onupgradeneeded = q((p) => {
      if (n = g.transaction, e.autoSchema && !i._options.allowEmptyDB) {
        g.onerror = ji, n.abort(), g.result.close();
        const v = o.deleteDatabase(d);
        v.onsuccess = v.onerror = q(() => {
          u(new T.NoSuchDatabase(`Database ${d} doesnt exist`));
        });
      } else {
        n.onerror = ue(u);
        var h = p.oldVersion > Math.pow(2, 62) ? 0 : p.oldVersion;
        r = h < 1, i._novip.idbdb = g.result, Hn(i, h / 10, n, u);
      }
    }, u), g.onsuccess = q(() => {
      n = null;
      const p = i._novip.idbdb = g.result, h = io(p.objectStoreNames);
      if (h.length > 0)
        try {
          const b = p.transaction((v = h).length === 1 ? v[0] : v, "readonly");
          e.autoSchema ? function({ _novip: y }, m, j) {
            y.verno = m.version / 10;
            const w = y._dbSchema = it(0, m, j);
            y._storeNames = io(m.objectStoreNames, 0), ro(y, [y._allTables], z(w), w);
          }(i, p, b) : (ot(i, i._dbSchema, b), function(y, m) {
            const j = ss(it(0, y.idbdb, m), y._dbSchema);
            return !(j.add.length || j.change.some((w) => w.add.length || w.change.length));
          }(i, b) || console.warn("Dexie SchemaDiff: Schema was extended without increasing the number passed to db.version(). Some queries may fail.")), Qo(i, b);
        } catch {
        }
      var v;
      yi.push(i), p.onversionchange = q((b) => {
        e.vcFired = !0, i.on("versionchange").fire(b);
      }), p.onclose = q((b) => {
        i.on("close").fire(b);
      }), r && function({ indexedDB: b, IDBKeyRange: y }, m) {
        !wt(b) && m !== fo && jt(b, y).put({ name: m }).catch(K);
      }(i._deps, d), l();
    }, u);
  }).catch((l) => l && l.name === "UnknownError" && e.PR1398_maxLoop > 0 ? (e.PR1398_maxLoop--, console.warn("Dexie: Workaround for Chrome UnknownError on open()"), c()) : F.reject(l));
  return F.race([t, (typeof navigator > "u" ? F.resolve() : Wn()).then(c)]).then(() => (a(), e.onReadyBeingFired = [], F.resolve(tt(() => i.on.ready.fire(i.vip))).then(function l() {
    if (e.onReadyBeingFired.length > 0) {
      let u = e.onReadyBeingFired.reduce(ht, K);
      return e.onReadyBeingFired = [], F.resolve(tt(() => u(i.vip))).then(l);
    }
  }))).finally(() => {
    e.onReadyBeingFired = null, e.isBeingOpened = !1;
  }).then(() => i).catch((l) => {
    e.dbOpenError = l;
    try {
      n && n.abort();
    } catch {
    }
    return t === e.openCanceller && i._close(), H(l);
  }).finally(() => {
    e.openComplete = !0, s();
  });
}
function at(i) {
  var e = (s) => i.next(s), o = a(e), t = a((s) => i.throw(s));
  function a(s) {
    return (n) => {
      var r = s(n), c = r.value;
      return r.done ? c : c && typeof c.then == "function" ? c.then(o, t) : W(c) ? Promise.all(c).then(o, t) : o(c);
    };
  }
  return a(e)();
}
function Gn(i, e, o) {
  var t = arguments.length;
  if (t < 2)
    throw new T.InvalidArgument("Too few arguments");
  for (var a = new Array(t - 1); --t; )
    a[t - 1] = arguments[t];
  return o = a.pop(), [i, La(a), o];
}
function ns(i, e, o, t, a) {
  return F.resolve().then(() => {
    const s = B.transless || B, n = i._createTransaction(e, o, i._dbSchema, t), r = { trans: n, transless: s };
    if (t)
      n.idbtrans = t.idbtrans;
    else
      try {
        n.create(), i._state.PR1398_maxLoop = 3;
      } catch (d) {
        return d.name === ft.InvalidState && i.isOpen() && --i._state.PR1398_maxLoop > 0 ? (console.warn("Dexie: Need to reopen db"), i._close(), i.open().then(() => ns(i, e, o, null, a))) : H(d);
      }
    const c = mt(a);
    let l;
    c && Ze();
    const u = F.follow(() => {
      if (l = a.call(n, n), l)
        if (c) {
          var d = we.bind(null, null);
          l.then(d, d);
        } else
          typeof l.next == "function" && typeof l.throw == "function" && (l = at(l));
    }, r);
    return (l && typeof l.then == "function" ? F.resolve(l).then((d) => n.active ? d : H(new T.PrematureCommit("Transaction committed too early. See http://bit.ly/2kdckMn"))) : u.then(() => l)).then((d) => (t && n._resolve(), n._completion.then(() => d))).catch((d) => (n._reject(d), H(d)));
  });
}
function Ki(i, e, o) {
  const t = W(i) ? i.slice() : [i];
  for (let a = 0; a < o; ++a)
    t.push(e);
  return t;
}
const Xn = { stack: "dbcore", name: "VirtualIndexMiddleware", level: 1, create: function(i) {
  return { ...i, table(e) {
    const o = i.table(e), { schema: t } = o, a = {}, s = [];
    function n(u, d, g) {
      const p = hi(u), h = a[p] = a[p] || [], v = u == null ? 0 : typeof u == "string" ? 1 : u.length, b = d > 0, y = { ...g, isVirtual: b, keyTail: d, keyLength: v, extractKey: Yo(u), unique: !b && g.unique };
      return h.push(y), y.isPrimaryKey || s.push(y), v > 1 && n(v === 2 ? u[0] : u.slice(0, v - 1), d + 1, g), h.sort((m, j) => m.keyTail - j.keyTail), y;
    }
    const r = n(t.primaryKey.keyPath, 0, t.primaryKey);
    a[":id"] = [r];
    for (const u of t.indexes)
      n(u.keyPath, 0, u);
    function c(u) {
      const d = u.query.index;
      return d.isVirtual ? { ...u, query: { index: d, range: (g = u.query.range, p = d.keyTail, { type: g.type === 1 ? 2 : g.type, lower: Ki(g.lower, g.lowerOpen ? i.MAX_KEY : i.MIN_KEY, p), lowerOpen: !0, upper: Ki(g.upper, g.upperOpen ? i.MIN_KEY : i.MAX_KEY, p), upperOpen: !0 }) } } : u;
      var g, p;
    }
    return { ...o, schema: { ...t, primaryKey: r, indexes: s, getIndexByKeyPath: function(u) {
      const d = a[hi(u)];
      return d && d[0];
    } }, count: (u) => o.count(c(u)), query: (u) => o.query(c(u)), openCursor(u) {
      const { keyTail: d, isVirtual: g, keyLength: p } = u.query.index;
      return g ? o.openCursor(c(u)).then((h) => h && function(v) {
        return Object.create(v, { continue: { value: function(y) {
          y != null ? v.continue(Ki(y, u.reverse ? i.MAX_KEY : i.MIN_KEY, d)) : u.unique ? v.continue(v.key.slice(0, p).concat(u.reverse ? i.MIN_KEY : i.MAX_KEY, d)) : v.continue();
        } }, continuePrimaryKey: { value(y, m) {
          v.continuePrimaryKey(Ki(y, i.MAX_KEY, d), m);
        } }, primaryKey: { get: () => v.primaryKey }, key: { get() {
          const y = v.key;
          return p === 1 ? y[0] : y.slice(0, p);
        } }, value: { get: () => v.value } });
      }(h)) : o.openCursor(u);
    } };
  } };
} };
function kt(i, e, o, t) {
  return o = o || {}, t = t || "", z(i).forEach((a) => {
    if (ie(e, a)) {
      var s = i[a], n = e[a];
      if (typeof s == "object" && typeof n == "object" && s && n) {
        const r = Lo(s);
        r !== Lo(n) ? o[t + a] = e[a] : r === "Object" ? kt(s, n, o, t + a + ".") : s !== n && (o[t + a] = e[a]);
      } else
        s !== n && (o[t + a] = e[a]);
    } else
      o[t + a] = void 0;
  }), z(e).forEach((a) => {
    ie(i, a) || (o[t + a] = e[a]);
  }), o;
}
const Yn = { stack: "dbcore", name: "HooksMiddleware", level: 2, create: (i) => ({ ...i, table(e) {
  const o = i.table(e), { primaryKey: t } = o.schema;
  return { ...o, mutate(s) {
    const n = B.trans, { deleting: r, creating: c, updating: l } = n.table(e).hook;
    switch (s.type) {
      case "add":
        if (c.fire === K)
          break;
        return n._promise("readwrite", () => u(s), !0);
      case "put":
        if (c.fire === K && l.fire === K)
          break;
        return n._promise("readwrite", () => u(s), !0);
      case "delete":
        if (r.fire === K)
          break;
        return n._promise("readwrite", () => u(s), !0);
      case "deleteRange":
        if (r.fire === K)
          break;
        return n._promise("readwrite", () => function(g) {
          return d(g.trans, g.range, 1e4);
        }(s), !0);
    }
    return o.mutate(s);
    function u(g) {
      const p = B.trans, h = g.keys || function(v, b) {
        return b.type === "delete" ? b.keys : b.keys || b.values.map(v.extractKey);
      }(t, g);
      if (!h)
        throw new Error("Keys missing");
      return (g = g.type === "add" || g.type === "put" ? { ...g, keys: h } : { ...g }).type !== "delete" && (g.values = [...g.values]), g.keys && (g.keys = [...g.keys]), function(v, b, y) {
        return b.type === "add" ? Promise.resolve([]) : v.getMany({ trans: b.trans, keys: y, cache: "immutable" });
      }(o, g, h).then((v) => {
        const b = h.map((y, m) => {
          const j = v[m], w = { onerror: null, onsuccess: null };
          if (g.type === "delete")
            r.fire.call(w, y, j, p);
          else if (g.type === "add" || j === void 0) {
            const S = c.fire.call(w, y, g.values[m], p);
            y == null && S != null && (y = S, g.keys[m] = y, t.outbound || ne(g.values[m], t.keyPath, y));
          } else {
            const S = kt(j, g.values[m]), O = l.fire.call(w, S, y, j, p);
            if (O) {
              const k = g.values[m];
              Object.keys(O).forEach((E) => {
                ie(k, E) ? k[E] = O[E] : ne(k, E, O[E]);
              });
            }
          }
          return w;
        });
        return o.mutate(g).then(({ failures: y, results: m, numFailures: j, lastResult: w }) => {
          for (let S = 0; S < h.length; ++S) {
            const O = m ? m[S] : h[S], k = b[S];
            O == null ? k.onerror && k.onerror(y[S]) : k.onsuccess && k.onsuccess(g.type === "put" && v[S] ? g.values[S] : O);
          }
          return { failures: y, results: m, numFailures: j, lastResult: w };
        }).catch((y) => (b.forEach((m) => m.onerror && m.onerror(y)), Promise.reject(y)));
      });
    }
    function d(g, p, h) {
      return o.query({ trans: g, values: !1, query: { index: t, range: p }, limit: h }).then(({ result: v }) => u({ type: "delete", keys: v, trans: g }).then((b) => b.numFailures > 0 ? Promise.reject(b.failures[0]) : v.length < h ? { failures: [], numFailures: 0, lastResult: void 0 } : d(g, { ...p, lower: v[v.length - 1], lowerOpen: !0 }, h)));
    }
  } };
} }) };
function rs(i, e, o) {
  try {
    if (!e || e.keys.length < i.length)
      return null;
    const t = [];
    for (let a = 0, s = 0; a < e.keys.length && s < i.length; ++a)
      G(e.keys[a], i[s]) === 0 && (t.push(o ? Oi(e.values[a]) : e.values[a]), ++s);
    return t.length === i.length ? t : null;
  } catch {
    return null;
  }
}
const Qn = { stack: "dbcore", level: -1, create: (i) => ({ table: (e) => {
  const o = i.table(e);
  return { ...o, getMany: (t) => {
    if (!t.cache)
      return o.getMany(t);
    const a = rs(t.keys, t.trans._cache, t.cache === "clone");
    return a ? F.resolve(a) : o.getMany(t).then((s) => (t.trans._cache = { keys: t.keys, values: t.cache === "clone" ? Oi(s) : s }, s));
  }, mutate: (t) => (t.type !== "add" && (t.trans._cache = null), o.mutate(t)) };
} }) };
function Pt(i) {
  return !("from" in i);
}
const fe = function(i, e) {
  if (!this) {
    const o = new fe();
    return i && "d" in i && Y(o, i), o;
  }
  Y(this, arguments.length ? { d: 1, from: i, to: arguments.length > 1 ? e : i } : { d: 0 });
};
function Pi(i, e, o) {
  const t = G(e, o);
  if (isNaN(t))
    return;
  if (t > 0)
    throw RangeError();
  if (Pt(i))
    return Y(i, { from: e, to: o, d: 1 });
  const a = i.l, s = i.r;
  if (G(o, i.from) < 0)
    return a ? Pi(a, e, o) : i.l = { from: e, to: o, d: 1, l: null, r: null }, Wt(i);
  if (G(e, i.to) > 0)
    return s ? Pi(s, e, o) : i.r = { from: e, to: o, d: 1, l: null, r: null }, Wt(i);
  G(e, i.from) < 0 && (i.from = e, i.l = null, i.d = s ? s.d + 1 : 1), G(o, i.to) > 0 && (i.to = o, i.r = null, i.d = i.l ? i.l.d + 1 : 1);
  const n = !i.r;
  a && !i.l && co(i, a), s && n && co(i, s);
}
function co(i, e) {
  Pt(e) || function o(t, { from: a, to: s, l: n, r }) {
    Pi(t, a, s), n && o(t, n), r && o(t, r);
  }(i, e);
}
function Zn(i, e) {
  const o = st(e);
  let t = o.next();
  if (t.done)
    return !1;
  let a = t.value;
  const s = st(i);
  let n = s.next(a.from), r = n.value;
  for (; !t.done && !n.done; ) {
    if (G(r.from, a.to) <= 0 && G(r.to, a.from) >= 0)
      return !0;
    G(a.from, r.from) < 0 ? a = (t = o.next(r.from)).value : r = (n = s.next(a.from)).value;
  }
  return !1;
}
function st(i) {
  let e = Pt(i) ? null : { s: 0, n: i };
  return { next(o) {
    const t = arguments.length > 0;
    for (; e; )
      switch (e.s) {
        case 0:
          if (e.s = 1, t)
            for (; e.n.l && G(o, e.n.from) < 0; )
              e = { up: e, n: e.n.l, s: 1 };
          else
            for (; e.n.l; )
              e = { up: e, n: e.n.l, s: 1 };
        case 1:
          if (e.s = 2, !t || G(o, e.n.to) <= 0)
            return { value: e.n, done: !1 };
        case 2:
          if (e.n.r) {
            e.s = 3, e = { up: e, n: e.n.r, s: 0 };
            continue;
          }
        case 3:
          e = e.up;
      }
    return { done: !0 };
  } };
}
function Wt(i) {
  var e, o;
  const t = (((e = i.r) === null || e === void 0 ? void 0 : e.d) || 0) - (((o = i.l) === null || o === void 0 ? void 0 : o.d) || 0), a = t > 1 ? "r" : t < -1 ? "l" : "";
  if (a) {
    const s = a === "r" ? "l" : "r", n = { ...i }, r = i[a];
    i.from = r.from, i.to = r.to, i[a] = r[a], n[a] = r[s], i[s] = n, n.d = Jt(n);
  }
  i.d = Jt(i);
}
function Jt({ r: i, l: e }) {
  return (i ? e ? Math.max(i.d, e.d) : i.d : e ? e.d : 0) + 1;
}
Qe(fe.prototype, { add(i) {
  return co(this, i), this;
}, addKey(i) {
  return Pi(this, i, i), this;
}, addKeys(i) {
  return i.forEach((e) => Pi(this, e, e)), this;
}, [Io]() {
  return st(this);
} });
const er = { stack: "dbcore", level: 0, create: (i) => {
  const e = i.schema.name, o = new fe(i.MIN_KEY, i.MAX_KEY);
  return { ...i, table: (t) => {
    const a = i.table(t), { schema: s } = a, { primaryKey: n } = s, { extractKey: r, outbound: c } = n, l = { ...a, mutate: (g) => {
      const p = g.trans, h = p.mutatedParts || (p.mutatedParts = {}), v = (O) => {
        const k = `idb://${e}/${t}/${O}`;
        return h[k] || (h[k] = new fe());
      }, b = v(""), y = v(":dels"), { type: m } = g;
      let [j, w] = g.type === "deleteRange" ? [g.range] : g.type === "delete" ? [g.keys] : g.values.length < 50 ? [[], g.values] : [];
      const S = g.trans._cache;
      return a.mutate(g).then((O) => {
        if (W(j)) {
          m !== "delete" && (j = O.results), b.addKeys(j);
          const k = rs(j, S);
          k || m === "add" || y.addKeys(j), (k || w) && function(E, x, L, R) {
            function M($) {
              const f = E($.name || "");
              function P(C) {
                return C != null ? $.extractKey(C) : null;
              }
              const A = (C) => $.multiEntry && W(C) ? C.forEach((I) => f.addKey(I)) : f.addKey(C);
              (L || R).forEach((C, I) => {
                const N = L && P(L[I]), ce = R && P(R[I]);
                G(N, ce) !== 0 && (N != null && A(N), ce != null && A(ce));
              });
            }
            x.indexes.forEach(M);
          }(v, s, k, w);
        } else if (j) {
          const k = { from: j.lower, to: j.upper };
          y.add(k), b.add(k);
        } else
          b.add(o), y.add(o), s.indexes.forEach((k) => v(k.name).add(o));
        return O;
      });
    } }, u = ({ query: { index: g, range: p } }) => {
      var h, v;
      return [g, new fe((h = p.lower) !== null && h !== void 0 ? h : i.MIN_KEY, (v = p.upper) !== null && v !== void 0 ? v : i.MAX_KEY)];
    }, d = { get: (g) => [n, new fe(g.key)], getMany: (g) => [n, new fe().addKeys(g.keys)], count: u, query: u, openCursor: u };
    return z(d).forEach((g) => {
      l[g] = function(p) {
        const { subscr: h } = B;
        if (h) {
          const v = (w) => {
            const S = `idb://${e}/${t}/${w}`;
            return h[S] || (h[S] = new fe());
          }, b = v(""), y = v(":dels"), [m, j] = d[g](p);
          if (v(m.name || "").add(j), !m.isPrimaryKey) {
            if (g !== "count") {
              const w = g === "query" && c && p.values && a.query({ ...p, values: !1 });
              return a[g].apply(this, arguments).then((S) => {
                if (g === "query") {
                  if (c && p.values)
                    return w.then(({ result: k }) => (b.addKeys(k), S));
                  const O = p.values ? S.result.map(r) : S.result;
                  p.values ? b.addKeys(O) : y.addKeys(O);
                } else if (g === "openCursor") {
                  const O = S, k = p.values;
                  return O && Object.create(O, { key: { get: () => (y.addKey(O.primaryKey), O.key) }, primaryKey: { get() {
                    const E = O.primaryKey;
                    return y.addKey(E), E;
                  } }, value: { get: () => (k && b.addKey(O.primaryKey), O.value) } });
                }
                return S;
              });
            }
            y.add(o);
          }
        }
        return a[g].apply(this, arguments);
      };
    }), l;
  } };
} };
class Be {
  constructor(e, o) {
    this._middlewares = {}, this.verno = 0;
    const t = Be.dependencies;
    this._options = o = { addons: Be.addons, autoOpen: !0, indexedDB: t.indexedDB, IDBKeyRange: t.IDBKeyRange, ...o }, this._deps = { indexedDB: o.indexedDB, IDBKeyRange: o.IDBKeyRange };
    const { addons: a } = o;
    this._dbSchema = {}, this._versions = [], this._storeNames = [], this._allTables = {}, this.idbdb = null, this._novip = this;
    const s = { dbOpenError: null, isBeingOpened: !1, onReadyBeingFired: null, openComplete: !1, dbReadyResolve: K, dbReadyPromise: null, cancelOpen: K, openCanceller: null, autoSchema: !0, PR1398_maxLoop: 3 };
    var n;
    s.dbReadyPromise = new F((r) => {
      s.dbReadyResolve = r;
    }), s.openCanceller = new F((r, c) => {
      s.cancelOpen = c;
    }), this._state = s, this.name = e, this.on = fi(this, "populate", "blocked", "versionchange", "close", { ready: [ht, K] }), this.on.ready.subscribe = Ra(this.on.ready.subscribe, (r) => (c, l) => {
      Be.vip(() => {
        const u = this._state;
        if (u.openComplete)
          u.dbOpenError || F.resolve().then(c), l && r(c);
        else if (u.onReadyBeingFired)
          u.onReadyBeingFired.push(c), l && r(c);
        else {
          r(c);
          const d = this;
          l || r(function g() {
            d.on.ready.unsubscribe(c), d.on.ready.unsubscribe(g);
          });
        }
      });
    }), this.Collection = (n = this, ri(Ln.prototype, function(r, c) {
      this.db = n;
      let l = es, u = null;
      if (c)
        try {
          l = c();
        } catch (h) {
          u = h;
        }
      const d = r._ctx, g = d.table, p = g.hook.reading.fire;
      this._ctx = { table: g, index: d.index, isPrimKey: !d.index || g.schema.primKey.keyPath && d.index === g.schema.primKey.name, range: l, keysOnly: !1, dir: "next", unique: "", algorithm: null, filter: null, replayFilter: null, justLimit: !0, isMatch: null, offset: 0, limit: 1 / 0, error: u, or: d.or, valueMapper: p !== _i ? p : null };
    })), this.Table = function(r) {
      return ri(Dn.prototype, function(c, l, u) {
        this.db = r, this._tx = u, this.name = c, this.schema = l, this.hook = r._allTables[c] ? r._allTables[c].hook : fi(null, { creating: [Pn, K], reading: [kn, _i], updating: [On, K], deleting: [Sn, K] });
      });
    }(this), this.Transaction = function(r) {
      return ri(qn.prototype, function(c, l, u, d, g) {
        this.db = r, this.mode = c, this.storeNames = l, this.schema = u, this.chromeTransactionDurability = d, this.idbtrans = null, this.on = fi(this, "complete", "error", "abort"), this.parent = g || null, this.active = !0, this._reculock = 0, this._blockedFuncs = [], this._resolve = null, this._reject = null, this._waitingFor = null, this._waitingQueue = null, this._spinCount = 0, this._completion = new F((p, h) => {
          this._resolve = p, this._reject = h;
        }), this._completion.then(() => {
          this.active = !1, this.on.complete.fire();
        }, (p) => {
          var h = this.active;
          return this.active = !1, this.on.error.fire(p), this.parent ? this.parent._reject(p) : h && this.idbtrans && this.idbtrans.abort(), H(p);
        });
      });
    }(this), this.Version = function(r) {
      return ri(Vn.prototype, function(c) {
        this.db = r, this._cfg = { version: c, storesSource: null, dbschema: {}, tables: {}, contentUpgrade: null };
      });
    }(this), this.WhereClause = function(r) {
      return ri(os.prototype, function(c, l, u) {
        this.db = r, this._ctx = { table: c, index: l === ":id" ? null : l, or: u };
        const d = r._deps.indexedDB;
        if (!d)
          throw new T.MissingAPI();
        this._cmp = this._ascending = d.cmp.bind(d), this._descending = (g, p) => d.cmp(p, g), this._max = (g, p) => d.cmp(g, p) > 0 ? g : p, this._min = (g, p) => d.cmp(g, p) < 0 ? g : p, this._IDBKeyRange = r._deps.IDBKeyRange;
      });
    }(this), this.on("versionchange", (r) => {
      r.newVersion > 0 ? console.warn(`Another connection wants to upgrade database '${this.name}'. Closing db now to resume the upgrade.`) : console.warn(`Another connection wants to delete database '${this.name}'. Closing db now to resume the delete request.`), this.close();
    }), this.on("blocked", (r) => {
      !r.newVersion || r.newVersion < r.oldVersion ? console.warn(`Dexie.delete('${this.name}') was blocked`) : console.warn(`Upgrade '${this.name}' blocked by other connection holding version ${r.oldVersion / 10}`);
    }), this._maxKey = ki(o.IDBKeyRange), this._createTransaction = (r, c, l, u) => new this.Transaction(r, c, l, this._options.chromeTransactionDurability, u), this._fireOnBlocked = (r) => {
      this.on("blocked").fire(r), yi.filter((c) => c.name === this.name && c !== this && !c._state.vcFired).map((c) => c.on("versionchange").fire(r));
    }, this.use(Xn), this.use(Yn), this.use(er), this.use(Qn), this.vip = Object.create(this, { _vip: { value: !0 } }), a.forEach((r) => r(this));
  }
  version(e) {
    if (isNaN(e) || e < 0.1)
      throw new T.Type("Given version is not a positive number");
    if (e = Math.round(10 * e) / 10, this.idbdb || this._state.isBeingOpened)
      throw new T.Schema("Cannot add version when database is open");
    this.verno = Math.max(this.verno, e);
    const o = this._versions;
    var t = o.filter((a) => a._cfg.version === e)[0];
    return t || (t = new this.Version(e), o.push(t), o.sort(zn), t.stores({}), this._state.autoSchema = !1, t);
  }
  _whenReady(e) {
    return this.idbdb && (this._state.openComplete || B.letThrough || this._vip) ? e() : new F((o, t) => {
      if (this._state.openComplete)
        return t(new T.DatabaseClosed(this._state.dbOpenError));
      if (!this._state.isBeingOpened) {
        if (!this._options.autoOpen)
          return void t(new T.DatabaseClosed());
        this.open().catch(K);
      }
      this._state.dbReadyPromise.then(o, t);
    }).then(e);
  }
  use({ stack: e, create: o, level: t, name: a }) {
    a && this.unuse({ stack: e, name: a });
    const s = this._middlewares[e] || (this._middlewares[e] = []);
    return s.push({ stack: e, create: o, level: t ?? 10, name: a }), s.sort((n, r) => n.level - r.level), this;
  }
  unuse({ stack: e, name: o, create: t }) {
    return e && this._middlewares[e] && (this._middlewares[e] = this._middlewares[e].filter((a) => t ? a.create !== t : !!o && a.name !== o)), this;
  }
  open() {
    return Jn(this);
  }
  _close() {
    const e = this._state, o = yi.indexOf(this);
    if (o >= 0 && yi.splice(o, 1), this.idbdb) {
      try {
        this.idbdb.close();
      } catch {
      }
      this._novip.idbdb = null;
    }
    e.dbReadyPromise = new F((t) => {
      e.dbReadyResolve = t;
    }), e.openCanceller = new F((t, a) => {
      e.cancelOpen = a;
    });
  }
  close() {
    this._close();
    const e = this._state;
    this._options.autoOpen = !1, e.dbOpenError = new T.DatabaseClosed(), e.isBeingOpened && e.cancelOpen(e.dbOpenError);
  }
  delete() {
    const e = arguments.length > 0, o = this._state;
    return new F((t, a) => {
      const s = () => {
        this.close();
        var n = this._deps.indexedDB.deleteDatabase(this.name);
        n.onsuccess = q(() => {
          (function({ indexedDB: r, IDBKeyRange: c }, l) {
            !wt(r) && l !== fo && jt(r, c).delete(l).catch(K);
          })(this._deps, this.name), t();
        }), n.onerror = ue(a), n.onblocked = this._fireOnBlocked;
      };
      if (e)
        throw new T.InvalidArgument("Arguments not allowed in db.delete()");
      o.isBeingOpened ? o.dbReadyPromise.then(s) : s();
    });
  }
  backendDB() {
    return this.idbdb;
  }
  isOpen() {
    return this.idbdb !== null;
  }
  hasBeenClosed() {
    const e = this._state.dbOpenError;
    return e && e.name === "DatabaseClosed";
  }
  hasFailed() {
    return this._state.dbOpenError !== null;
  }
  dynamicallyOpened() {
    return this._state.autoSchema;
  }
  get tables() {
    return z(this._allTables).map((e) => this._allTables[e]);
  }
  transaction() {
    const e = Gn.apply(this, arguments);
    return this._transaction.apply(this, e);
  }
  _transaction(e, o, t) {
    let a = B.trans;
    a && a.db === this && e.indexOf("!") === -1 || (a = null);
    const s = e.indexOf("?") !== -1;
    let n, r;
    e = e.replace("!", "").replace("?", "");
    try {
      if (r = o.map((l) => {
        var u = l instanceof this.Table ? l.name : l;
        if (typeof u != "string")
          throw new TypeError("Invalid table argument to Dexie.transaction(). Only Table or String are allowed");
        return u;
      }), e == "r" || e === xo)
        n = xo;
      else {
        if (e != "rw" && e != Fo)
          throw new T.InvalidArgument("Invalid transaction mode: " + e);
        n = Fo;
      }
      if (a) {
        if (a.mode === xo && n === Fo) {
          if (!s)
            throw new T.SubTransaction("Cannot enter a sub-transaction with READWRITE mode when parent transaction is READONLY");
          a = null;
        }
        a && r.forEach((l) => {
          if (a && a.storeNames.indexOf(l) === -1) {
            if (!s)
              throw new T.SubTransaction("Table " + l + " not included in parent transaction.");
            a = null;
          }
        }), s && a && !a.active && (a = null);
      }
    } catch (l) {
      return a ? a._promise(null, (u, d) => {
        d(l);
      }) : H(l);
    }
    const c = ns.bind(null, this, n, r, a, t);
    return a ? a._promise(n, c, "lock") : B.trans ? ei(B.transless, () => this._whenReady(c)) : this._whenReady(c);
  }
  table(e) {
    if (!ie(this._allTables, e))
      throw new T.InvalidTable(`Table ${e} does not exist`);
    return this._allTables[e];
  }
}
const ir = typeof Symbol < "u" && "observable" in Symbol ? Symbol.observable : "@@observable";
class or {
  constructor(e) {
    this._subscribe = e;
  }
  subscribe(e, o, t) {
    return this._subscribe(e && typeof e != "function" ? e : { next: e, error: o, complete: t });
  }
  [ir]() {
    return this;
  }
}
function cs(i, e) {
  return z(e).forEach((o) => {
    co(i[o] || (i[o] = new fe()), e[o]);
  }), i;
}
function tr(i) {
  let e, o = !1;
  const t = new or((a) => {
    const s = mt(i);
    let n = !1, r = {}, c = {};
    const l = { get closed() {
      return n;
    }, unsubscribe: () => {
      n = !0, Re.storagemutated.unsubscribe(p);
    } };
    a.start && a.start(l);
    let u = !1, d = !1;
    function g() {
      return z(c).some((v) => r[v] && Zn(r[v], c[v]));
    }
    const p = (v) => {
      cs(r, v), g() && h();
    }, h = () => {
      if (u || n)
        return;
      r = {};
      const v = {}, b = function(y) {
        s && Ze();
        const m = () => Ae(i, { subscr: y, trans: null }), j = B.trans ? ei(B.transless, m) : m();
        return s && j.then(we, we), j;
      }(v);
      d || (Re(wi, p), d = !0), u = !0, Promise.resolve(b).then((y) => {
        o = !0, e = y, u = !1, n || (g() ? h() : (r = {}, c = v, a.next && a.next(y)));
      }, (y) => {
        u = !1, o = !1, a.error && a.error(y), l.unsubscribe();
      });
    };
    return h(), l;
  });
  return t.hasValue = () => o, t.getValue = () => e, t;
}
let nt;
try {
  nt = { indexedDB: U.indexedDB || U.mozIndexedDB || U.webkitIndexedDB || U.msIndexedDB, IDBKeyRange: U.IDBKeyRange || U.webkitIDBKeyRange };
} catch {
  nt = { indexedDB: null, IDBKeyRange: null };
}
const Ne = Be;
function Xi(i) {
  let e = ve;
  try {
    ve = !0, Re.storagemutated.fire(i);
  } finally {
    ve = e;
  }
}
Qe(Ne, { ...zi, delete: (i) => new Ne(i, { addons: [] }).delete(), exists: (i) => new Ne(i, { addons: [] }).open().then((e) => (e.close(), !0)).catch("NoSuchDatabaseError", () => !1), getDatabaseNames(i) {
  try {
    return function({ indexedDB: e, IDBKeyRange: o }) {
      return wt(e) ? Promise.resolve(e.databases()).then((t) => t.map((a) => a.name).filter((a) => a !== fo)) : jt(e, o).toCollection().primaryKeys();
    }(Ne.dependencies).then(i);
  } catch {
    return H(new T.MissingAPI());
  }
}, defineClass: () => function(i) {
  Y(this, i);
}, ignoreTransaction: (i) => B.trans ? ei(B.transless, i) : i(), vip: tt, async: function(i) {
  return function() {
    try {
      var e = at(i.apply(this, arguments));
      return e && typeof e.then == "function" ? e : F.resolve(e);
    } catch (o) {
      return H(o);
    }
  };
}, spawn: function(i, e, o) {
  try {
    var t = at(i.apply(o, e || []));
    return t && typeof t.then == "function" ? t : F.resolve(t);
  } catch (a) {
    return H(a);
  }
}, currentTransaction: { get: () => B.trans || null }, waitFor: function(i, e) {
  const o = F.resolve(typeof i == "function" ? Ne.ignoreTransaction(i) : i).timeout(e || 6e4);
  return B.trans ? B.trans.waitFor(o) : o;
}, Promise: F, debug: { get: () => pe, set: (i) => {
  Ka(i, i === "dexie" ? () => !0 : Za);
} }, derive: Ge, extend: Y, props: Qe, override: Ra, Events: fi, on: Re, liveQuery: tr, extendObservabilitySet: cs, getByKeyPath: be, setByKeyPath: ne, delByKeyPath: function(i, e) {
  typeof e == "string" ? ne(i, e, void 0) : "length" in e && [].map.call(e, function(o) {
    ne(i, o, void 0);
  });
}, shallowClone: Da, deepClone: Oi, getObjectDiff: kt, cmp: G, asap: Ca, minKey: Go, addons: [], connections: yi, errnames: ft, dependencies: nt, semVer: qt, version: qt.split(".").map((i) => parseInt(i)).reduce((i, e, o) => i + e / Math.pow(10, 2 * o)) }), Ne.maxKey = ki(Ne.dependencies.IDBKeyRange), typeof dispatchEvent < "u" && typeof addEventListener < "u" && (Re(wi, (i) => {
  if (!ve) {
    let e;
    yo ? (e = document.createEvent("CustomEvent"), e.initCustomEvent(xe, !0, !0, i)) : e = new CustomEvent(xe, { detail: i }), ve = !0, dispatchEvent(e), ve = !1;
  }
}), addEventListener(xe, ({ detail: i }) => {
  ve || Xi(i);
}));
let ve = !1;
if (typeof BroadcastChannel < "u") {
  const i = new BroadcastChannel(xe);
  typeof i.unref == "function" && i.unref(), Re(wi, (e) => {
    ve || i.postMessage(e);
  }), i.onmessage = (e) => {
    e.data && Xi(e.data);
  };
} else if (typeof self < "u" && typeof navigator < "u") {
  Re(wi, (e) => {
    try {
      ve || (typeof localStorage < "u" && localStorage.setItem(xe, JSON.stringify({ trig: Math.random(), changedParts: e })), typeof self.clients == "object" && [...self.clients.matchAll({ includeUncontrolled: !0 })].forEach((o) => o.postMessage({ type: xe, changedParts: e })));
    } catch {
    }
  }), typeof addEventListener < "u" && addEventListener("storage", (e) => {
    if (e.key === xe) {
      const o = JSON.parse(e.newValue);
      o && Xi(o.changedParts);
    }
  });
  const i = self.document && navigator.serviceWorker;
  i && i.addEventListener("message", function({ data: e }) {
    e && e.type === xe && Xi(e.changedParts);
  });
}
F.rejectionMapper = function(i, e) {
  if (!i || i instanceof Xe || i instanceof TypeError || i instanceof SyntaxError || !i.name || !Lt[i.name])
    return i;
  var o = new Lt[i.name](e || i.message, i);
  return "stack" in i && _e(o, "stack", { get: function() {
    return this.inner.stack;
  } }), o;
}, Ka(pe, Za);
class ar {
  constructor() {
    const e = new Be("session-replica");
    if (e.version(1).stores({
      kv: "&key"
    }), this.db = e, typeof localStorage < "u" && this.exists()) {
      const o = this.username(), t = this.token();
      this.db.kv.bulkPut([
        { key: "user", value: o },
        { key: "token", value: t }
      ]).then(() => {
        console.log("[Session] Synced localStorage session to IndexedDB", { username: o });
      }).catch((a) => {
        console.error("[Session] Failed to sync localStorage session to IndexedDB", a);
      });
    }
  }
  async store(e, o) {
    await this.db.kv.bulkPut([
      { key: "user", value: e },
      { key: "token", value: o }
    ]), localStorage.setItem("user", e), localStorage.setItem("token", o);
  }
  async resetAndRedirect(e) {
    await this.db.delete(), localStorage.removeItem("user"), localStorage.removeItem("token"), window.location.href = e;
  }
  async usernameAsync() {
    var e;
    return (e = await this.db.kv.get({ key: "user" })) == null ? void 0 : e.value;
  }
  exists() {
    return this.username() && this.token();
  }
  username() {
    return localStorage.getItem("user");
  }
  token() {
    return localStorage.getItem("token");
  }
}
const sr = new ar(), nr = (i) => {
  const e = i ? `ntfy-${i}` : "ntfy", o = new Be(e);
  return o.version(2).stores({
    subscriptions: "&id,baseUrl,[baseUrl+mutedUntil]",
    notifications: "&id,subscriptionId,time,new,[subscriptionId+new]",
    // compound key for query performance
    users: "&baseUrl,username",
    prefs: "&key"
  }), o;
}, rr = async () => {
  const i = await sr.usernameAsync();
  return nr(i);
}, cr = [
  {
    emoji: "😀",
    aliases: ["grinning"],
    tags: ["smile", "happy"],
    category: "Smileys & Emotion",
    description: "grinning face",
    unicode_version: "6.1"
  },
  {
    emoji: "😃",
    aliases: ["smiley"],
    tags: ["happy", "joy", "haha"],
    category: "Smileys & Emotion",
    description: "grinning face with big eyes",
    unicode_version: "6.0"
  },
  {
    emoji: "😄",
    aliases: ["smile"],
    tags: ["happy", "joy", "laugh", "pleased"],
    category: "Smileys & Emotion",
    description: "grinning face with smiling eyes",
    unicode_version: "6.0"
  },
  {
    emoji: "😁",
    aliases: ["grin"],
    tags: [],
    category: "Smileys & Emotion",
    description: "beaming face with smiling eyes",
    unicode_version: "6.0"
  },
  {
    emoji: "😆",
    aliases: ["laughing", "satisfied"],
    tags: ["happy", "haha"],
    category: "Smileys & Emotion",
    description: "grinning squinting face",
    unicode_version: "6.0"
  },
  {
    emoji: "😅",
    aliases: ["sweat_smile"],
    tags: ["hot"],
    category: "Smileys & Emotion",
    description: "grinning face with sweat",
    unicode_version: "6.0"
  },
  {
    emoji: "🤣",
    aliases: ["rofl"],
    tags: ["lol", "laughing"],
    category: "Smileys & Emotion",
    description: "rolling on the floor laughing",
    unicode_version: "9.0"
  },
  {
    emoji: "😂",
    aliases: ["joy"],
    tags: ["tears"],
    category: "Smileys & Emotion",
    description: "face with tears of joy",
    unicode_version: "6.0"
  },
  {
    emoji: "🙂",
    aliases: ["slightly_smiling_face"],
    tags: [],
    category: "Smileys & Emotion",
    description: "slightly smiling face",
    unicode_version: "7.0"
  },
  {
    emoji: "🙃",
    aliases: ["upside_down_face"],
    tags: [],
    category: "Smileys & Emotion",
    description: "upside-down face",
    unicode_version: "8.0"
  },
  {
    emoji: "😉",
    aliases: ["wink"],
    tags: ["flirt"],
    category: "Smileys & Emotion",
    description: "winking face",
    unicode_version: "6.0"
  },
  {
    emoji: "😊",
    aliases: ["blush"],
    tags: ["proud"],
    category: "Smileys & Emotion",
    description: "smiling face with smiling eyes",
    unicode_version: "6.0"
  },
  {
    emoji: "😇",
    aliases: ["innocent"],
    tags: ["angel"],
    category: "Smileys & Emotion",
    description: "smiling face with halo",
    unicode_version: "6.0"
  },
  {
    emoji: "🥰",
    aliases: ["smiling_face_with_three_hearts"],
    tags: ["love"],
    category: "Smileys & Emotion",
    description: "smiling face with hearts",
    unicode_version: "11.0"
  },
  {
    emoji: "😍",
    aliases: ["heart_eyes"],
    tags: ["love", "crush"],
    category: "Smileys & Emotion",
    description: "smiling face with heart-eyes",
    unicode_version: "6.0"
  },
  {
    emoji: "🤩",
    aliases: ["star_struck"],
    tags: ["eyes"],
    category: "Smileys & Emotion",
    description: "star-struck",
    unicode_version: "11.0"
  },
  {
    emoji: "😘",
    aliases: ["kissing_heart"],
    tags: ["flirt"],
    category: "Smileys & Emotion",
    description: "face blowing a kiss",
    unicode_version: "6.0"
  },
  {
    emoji: "😗",
    aliases: ["kissing"],
    tags: [],
    category: "Smileys & Emotion",
    description: "kissing face",
    unicode_version: "6.1"
  },
  {
    emoji: "☺️",
    aliases: ["relaxed"],
    tags: ["blush", "pleased"],
    category: "Smileys & Emotion",
    description: "smiling face",
    unicode_version: ""
  },
  {
    emoji: "😚",
    aliases: ["kissing_closed_eyes"],
    tags: [],
    category: "Smileys & Emotion",
    description: "kissing face with closed eyes",
    unicode_version: "6.0"
  },
  {
    emoji: "😙",
    aliases: ["kissing_smiling_eyes"],
    tags: [],
    category: "Smileys & Emotion",
    description: "kissing face with smiling eyes",
    unicode_version: "6.1"
  },
  {
    emoji: "🥲",
    aliases: ["smiling_face_with_tear"],
    tags: [],
    category: "Smileys & Emotion",
    description: "smiling face with tear",
    unicode_version: "13.0"
  },
  {
    emoji: "😋",
    aliases: ["yum"],
    tags: ["tongue", "lick"],
    category: "Smileys & Emotion",
    description: "face savoring food",
    unicode_version: "6.0"
  },
  {
    emoji: "😛",
    aliases: ["stuck_out_tongue"],
    tags: [],
    category: "Smileys & Emotion",
    description: "face with tongue",
    unicode_version: "6.1"
  },
  {
    emoji: "😜",
    aliases: ["stuck_out_tongue_winking_eye"],
    tags: ["prank", "silly"],
    category: "Smileys & Emotion",
    description: "winking face with tongue",
    unicode_version: "6.0"
  },
  {
    emoji: "🤪",
    aliases: ["zany_face"],
    tags: ["goofy", "wacky"],
    category: "Smileys & Emotion",
    description: "zany face",
    unicode_version: "11.0"
  },
  {
    emoji: "😝",
    aliases: ["stuck_out_tongue_closed_eyes"],
    tags: ["prank"],
    category: "Smileys & Emotion",
    description: "squinting face with tongue",
    unicode_version: "6.0"
  },
  {
    emoji: "🤑",
    aliases: ["money_mouth_face"],
    tags: ["rich"],
    category: "Smileys & Emotion",
    description: "money-mouth face",
    unicode_version: "8.0"
  },
  {
    emoji: "🤗",
    aliases: ["hugs"],
    tags: [],
    category: "Smileys & Emotion",
    description: "hugging face",
    unicode_version: "8.0"
  },
  {
    emoji: "🤭",
    aliases: ["hand_over_mouth"],
    tags: ["quiet", "whoops"],
    category: "Smileys & Emotion",
    description: "face with hand over mouth",
    unicode_version: "11.0"
  },
  {
    emoji: "🤫",
    aliases: ["shushing_face"],
    tags: ["silence", "quiet"],
    category: "Smileys & Emotion",
    description: "shushing face",
    unicode_version: "11.0"
  },
  {
    emoji: "🤔",
    aliases: ["thinking"],
    tags: [],
    category: "Smileys & Emotion",
    description: "thinking face",
    unicode_version: "8.0"
  },
  {
    emoji: "🤐",
    aliases: ["zipper_mouth_face"],
    tags: ["silence", "hush"],
    category: "Smileys & Emotion",
    description: "zipper-mouth face",
    unicode_version: "8.0"
  },
  {
    emoji: "🤨",
    aliases: ["raised_eyebrow"],
    tags: ["suspicious"],
    category: "Smileys & Emotion",
    description: "face with raised eyebrow",
    unicode_version: "11.0"
  },
  {
    emoji: "😐",
    aliases: ["neutral_face"],
    tags: ["meh"],
    category: "Smileys & Emotion",
    description: "neutral face",
    unicode_version: "6.0"
  },
  {
    emoji: "😑",
    aliases: ["expressionless"],
    tags: [],
    category: "Smileys & Emotion",
    description: "expressionless face",
    unicode_version: "6.1"
  },
  {
    emoji: "😶",
    aliases: ["no_mouth"],
    tags: ["mute", "silence"],
    category: "Smileys & Emotion",
    description: "face without mouth",
    unicode_version: "6.0"
  },
  {
    emoji: "😶‍🌫️",
    aliases: ["face_in_clouds"],
    tags: [],
    category: "Smileys & Emotion",
    description: "face in clouds",
    unicode_version: "13.1"
  },
  {
    emoji: "😏",
    aliases: ["smirk"],
    tags: ["smug"],
    category: "Smileys & Emotion",
    description: "smirking face",
    unicode_version: "6.0"
  },
  {
    emoji: "😒",
    aliases: ["unamused"],
    tags: ["meh"],
    category: "Smileys & Emotion",
    description: "unamused face",
    unicode_version: "6.0"
  },
  {
    emoji: "🙄",
    aliases: ["roll_eyes"],
    tags: [],
    category: "Smileys & Emotion",
    description: "face with rolling eyes",
    unicode_version: "8.0"
  },
  {
    emoji: "😬",
    aliases: ["grimacing"],
    tags: [],
    category: "Smileys & Emotion",
    description: "grimacing face",
    unicode_version: "6.1"
  },
  {
    emoji: "😮‍💨",
    aliases: ["face_exhaling"],
    tags: [],
    category: "Smileys & Emotion",
    description: "face exhaling",
    unicode_version: "13.1"
  },
  {
    emoji: "🤥",
    aliases: ["lying_face"],
    tags: ["liar"],
    category: "Smileys & Emotion",
    description: "lying face",
    unicode_version: "9.0"
  },
  {
    emoji: "😌",
    aliases: ["relieved"],
    tags: ["whew"],
    category: "Smileys & Emotion",
    description: "relieved face",
    unicode_version: "6.0"
  },
  {
    emoji: "😔",
    aliases: ["pensive"],
    tags: [],
    category: "Smileys & Emotion",
    description: "pensive face",
    unicode_version: "6.0"
  },
  {
    emoji: "😪",
    aliases: ["sleepy"],
    tags: ["tired"],
    category: "Smileys & Emotion",
    description: "sleepy face",
    unicode_version: "6.0"
  },
  {
    emoji: "🤤",
    aliases: ["drooling_face"],
    tags: [],
    category: "Smileys & Emotion",
    description: "drooling face",
    unicode_version: "9.0"
  },
  {
    emoji: "😴",
    aliases: ["sleeping"],
    tags: ["zzz"],
    category: "Smileys & Emotion",
    description: "sleeping face",
    unicode_version: "6.1"
  },
  {
    emoji: "😷",
    aliases: ["mask"],
    tags: ["sick", "ill"],
    category: "Smileys & Emotion",
    description: "face with medical mask",
    unicode_version: "6.0"
  },
  {
    emoji: "🤒",
    aliases: ["face_with_thermometer"],
    tags: ["sick"],
    category: "Smileys & Emotion",
    description: "face with thermometer",
    unicode_version: "8.0"
  },
  {
    emoji: "🤕",
    aliases: ["face_with_head_bandage"],
    tags: ["hurt"],
    category: "Smileys & Emotion",
    description: "face with head-bandage",
    unicode_version: "8.0"
  },
  {
    emoji: "🤢",
    aliases: ["nauseated_face"],
    tags: ["sick", "barf", "disgusted"],
    category: "Smileys & Emotion",
    description: "nauseated face",
    unicode_version: "9.0"
  },
  {
    emoji: "🤮",
    aliases: ["vomiting_face"],
    tags: ["barf", "sick"],
    category: "Smileys & Emotion",
    description: "face vomiting",
    unicode_version: "11.0"
  },
  {
    emoji: "🤧",
    aliases: ["sneezing_face"],
    tags: ["achoo", "sick"],
    category: "Smileys & Emotion",
    description: "sneezing face",
    unicode_version: "9.0"
  },
  {
    emoji: "🥵",
    aliases: ["hot_face"],
    tags: ["heat", "sweating"],
    category: "Smileys & Emotion",
    description: "hot face",
    unicode_version: "11.0"
  },
  {
    emoji: "🥶",
    aliases: ["cold_face"],
    tags: ["freezing", "ice"],
    category: "Smileys & Emotion",
    description: "cold face",
    unicode_version: "11.0"
  },
  {
    emoji: "🥴",
    aliases: ["woozy_face"],
    tags: ["groggy"],
    category: "Smileys & Emotion",
    description: "woozy face",
    unicode_version: "11.0"
  },
  {
    emoji: "😵",
    aliases: ["dizzy_face"],
    tags: [],
    category: "Smileys & Emotion",
    description: "knocked-out face",
    unicode_version: "6.0"
  },
  {
    emoji: "😵‍💫",
    aliases: ["face_with_spiral_eyes"],
    tags: [],
    category: "Smileys & Emotion",
    description: "face with spiral eyes",
    unicode_version: "13.1"
  },
  {
    emoji: "🤯",
    aliases: ["exploding_head"],
    tags: ["mind", "blown"],
    category: "Smileys & Emotion",
    description: "exploding head",
    unicode_version: "11.0"
  },
  {
    emoji: "🤠",
    aliases: ["cowboy_hat_face"],
    tags: [],
    category: "Smileys & Emotion",
    description: "cowboy hat face",
    unicode_version: "9.0"
  },
  {
    emoji: "🥳",
    aliases: ["partying_face"],
    tags: ["celebration", "birthday"],
    category: "Smileys & Emotion",
    description: "partying face",
    unicode_version: "11.0"
  },
  {
    emoji: "🥸",
    aliases: ["disguised_face"],
    tags: [],
    category: "Smileys & Emotion",
    description: "disguised face",
    unicode_version: "13.0"
  },
  {
    emoji: "😎",
    aliases: ["sunglasses"],
    tags: ["cool"],
    category: "Smileys & Emotion",
    description: "smiling face with sunglasses",
    unicode_version: "6.0"
  },
  {
    emoji: "🤓",
    aliases: ["nerd_face"],
    tags: ["geek", "glasses"],
    category: "Smileys & Emotion",
    description: "nerd face",
    unicode_version: "8.0"
  },
  {
    emoji: "🧐",
    aliases: ["monocle_face"],
    tags: [],
    category: "Smileys & Emotion",
    description: "face with monocle",
    unicode_version: "11.0"
  },
  {
    emoji: "😕",
    aliases: ["confused"],
    tags: [],
    category: "Smileys & Emotion",
    description: "confused face",
    unicode_version: "6.1"
  },
  {
    emoji: "😟",
    aliases: ["worried"],
    tags: ["nervous"],
    category: "Smileys & Emotion",
    description: "worried face",
    unicode_version: "6.1"
  },
  {
    emoji: "🙁",
    aliases: ["slightly_frowning_face"],
    tags: [],
    category: "Smileys & Emotion",
    description: "slightly frowning face",
    unicode_version: "7.0"
  },
  {
    emoji: "☹️",
    aliases: ["frowning_face"],
    tags: [],
    category: "Smileys & Emotion",
    description: "frowning face",
    unicode_version: ""
  },
  {
    emoji: "😮",
    aliases: ["open_mouth"],
    tags: ["surprise", "impressed", "wow"],
    category: "Smileys & Emotion",
    description: "face with open mouth",
    unicode_version: "6.1"
  },
  {
    emoji: "😯",
    aliases: ["hushed"],
    tags: ["silence", "speechless"],
    category: "Smileys & Emotion",
    description: "hushed face",
    unicode_version: "6.1"
  },
  {
    emoji: "😲",
    aliases: ["astonished"],
    tags: ["amazed", "gasp"],
    category: "Smileys & Emotion",
    description: "astonished face",
    unicode_version: "6.0"
  },
  {
    emoji: "😳",
    aliases: ["flushed"],
    tags: [],
    category: "Smileys & Emotion",
    description: "flushed face",
    unicode_version: "6.0"
  },
  {
    emoji: "🥺",
    aliases: ["pleading_face"],
    tags: ["puppy", "eyes"],
    category: "Smileys & Emotion",
    description: "pleading face",
    unicode_version: "11.0"
  },
  {
    emoji: "😦",
    aliases: ["frowning"],
    tags: [],
    category: "Smileys & Emotion",
    description: "frowning face with open mouth",
    unicode_version: "6.1"
  },
  {
    emoji: "😧",
    aliases: ["anguished"],
    tags: ["stunned"],
    category: "Smileys & Emotion",
    description: "anguished face",
    unicode_version: "6.1"
  },
  {
    emoji: "😨",
    aliases: ["fearful"],
    tags: ["scared", "shocked", "oops"],
    category: "Smileys & Emotion",
    description: "fearful face",
    unicode_version: "6.0"
  },
  {
    emoji: "😰",
    aliases: ["cold_sweat"],
    tags: ["nervous"],
    category: "Smileys & Emotion",
    description: "anxious face with sweat",
    unicode_version: "6.0"
  },
  {
    emoji: "😥",
    aliases: ["disappointed_relieved"],
    tags: ["phew", "sweat", "nervous"],
    category: "Smileys & Emotion",
    description: "sad but relieved face",
    unicode_version: "6.0"
  },
  {
    emoji: "😢",
    aliases: ["cry"],
    tags: ["sad", "tear"],
    category: "Smileys & Emotion",
    description: "crying face",
    unicode_version: "6.0"
  },
  {
    emoji: "😭",
    aliases: ["sob"],
    tags: ["sad", "cry", "bawling"],
    category: "Smileys & Emotion",
    description: "loudly crying face",
    unicode_version: "6.0"
  },
  {
    emoji: "😱",
    aliases: ["scream"],
    tags: ["horror", "shocked"],
    category: "Smileys & Emotion",
    description: "face screaming in fear",
    unicode_version: "6.0"
  },
  {
    emoji: "😖",
    aliases: ["confounded"],
    tags: [],
    category: "Smileys & Emotion",
    description: "confounded face",
    unicode_version: "6.0"
  },
  {
    emoji: "😣",
    aliases: ["persevere"],
    tags: ["struggling"],
    category: "Smileys & Emotion",
    description: "persevering face",
    unicode_version: "6.0"
  },
  {
    emoji: "😞",
    aliases: ["disappointed"],
    tags: ["sad"],
    category: "Smileys & Emotion",
    description: "disappointed face",
    unicode_version: "6.0"
  },
  {
    emoji: "😓",
    aliases: ["sweat"],
    tags: [],
    category: "Smileys & Emotion",
    description: "downcast face with sweat",
    unicode_version: "6.0"
  },
  {
    emoji: "😩",
    aliases: ["weary"],
    tags: ["tired"],
    category: "Smileys & Emotion",
    description: "weary face",
    unicode_version: "6.0"
  },
  {
    emoji: "😫",
    aliases: ["tired_face"],
    tags: ["upset", "whine"],
    category: "Smileys & Emotion",
    description: "tired face",
    unicode_version: "6.0"
  },
  {
    emoji: "🥱",
    aliases: ["yawning_face"],
    tags: [],
    category: "Smileys & Emotion",
    description: "yawning face",
    unicode_version: "12.0"
  },
  {
    emoji: "😤",
    aliases: ["triumph"],
    tags: ["smug"],
    category: "Smileys & Emotion",
    description: "face with steam from nose",
    unicode_version: "6.0"
  },
  {
    emoji: "😡",
    aliases: ["rage", "pout"],
    tags: ["angry"],
    category: "Smileys & Emotion",
    description: "pouting face",
    unicode_version: "6.0"
  },
  {
    emoji: "😠",
    aliases: ["angry"],
    tags: ["mad", "annoyed"],
    category: "Smileys & Emotion",
    description: "angry face",
    unicode_version: "6.0"
  },
  {
    emoji: "🤬",
    aliases: ["cursing_face"],
    tags: ["foul"],
    category: "Smileys & Emotion",
    description: "face with symbols on mouth",
    unicode_version: "11.0"
  },
  {
    emoji: "😈",
    aliases: ["smiling_imp"],
    tags: ["devil", "evil", "horns"],
    category: "Smileys & Emotion",
    description: "smiling face with horns",
    unicode_version: "6.0"
  },
  {
    emoji: "👿",
    aliases: ["imp"],
    tags: ["angry", "devil", "evil", "horns"],
    category: "Smileys & Emotion",
    description: "angry face with horns",
    unicode_version: "6.0"
  },
  {
    emoji: "💀",
    aliases: ["skull"],
    tags: ["dead", "danger", "poison"],
    category: "Smileys & Emotion",
    description: "skull",
    unicode_version: "6.0"
  },
  {
    emoji: "☠️",
    aliases: ["skull_and_crossbones"],
    tags: ["danger", "pirate"],
    category: "Smileys & Emotion",
    description: "skull and crossbones",
    unicode_version: ""
  },
  {
    emoji: "💩",
    aliases: ["hankey", "poop", "shit"],
    tags: ["crap"],
    category: "Smileys & Emotion",
    description: "pile of poo",
    unicode_version: "6.0"
  },
  {
    emoji: "🤡",
    aliases: ["clown_face"],
    tags: [],
    category: "Smileys & Emotion",
    description: "clown face",
    unicode_version: "9.0"
  },
  {
    emoji: "👹",
    aliases: ["japanese_ogre"],
    tags: ["monster"],
    category: "Smileys & Emotion",
    description: "ogre",
    unicode_version: "6.0"
  },
  {
    emoji: "👺",
    aliases: ["japanese_goblin"],
    tags: [],
    category: "Smileys & Emotion",
    description: "goblin",
    unicode_version: "6.0"
  },
  {
    emoji: "👻",
    aliases: ["ghost"],
    tags: ["halloween"],
    category: "Smileys & Emotion",
    description: "ghost",
    unicode_version: "6.0"
  },
  {
    emoji: "👽",
    aliases: ["alien"],
    tags: ["ufo"],
    category: "Smileys & Emotion",
    description: "alien",
    unicode_version: "6.0"
  },
  {
    emoji: "👾",
    aliases: ["space_invader"],
    tags: ["game", "retro"],
    category: "Smileys & Emotion",
    description: "alien monster",
    unicode_version: "6.0"
  },
  {
    emoji: "🤖",
    aliases: ["robot"],
    tags: [],
    category: "Smileys & Emotion",
    description: "robot",
    unicode_version: "8.0"
  },
  {
    emoji: "😺",
    aliases: ["smiley_cat"],
    tags: [],
    category: "Smileys & Emotion",
    description: "grinning cat",
    unicode_version: "6.0"
  },
  {
    emoji: "😸",
    aliases: ["smile_cat"],
    tags: [],
    category: "Smileys & Emotion",
    description: "grinning cat with smiling eyes",
    unicode_version: "6.0"
  },
  {
    emoji: "😹",
    aliases: ["joy_cat"],
    tags: [],
    category: "Smileys & Emotion",
    description: "cat with tears of joy",
    unicode_version: "6.0"
  },
  {
    emoji: "😻",
    aliases: ["heart_eyes_cat"],
    tags: [],
    category: "Smileys & Emotion",
    description: "smiling cat with heart-eyes",
    unicode_version: "6.0"
  },
  {
    emoji: "😼",
    aliases: ["smirk_cat"],
    tags: [],
    category: "Smileys & Emotion",
    description: "cat with wry smile",
    unicode_version: "6.0"
  },
  {
    emoji: "😽",
    aliases: ["kissing_cat"],
    tags: [],
    category: "Smileys & Emotion",
    description: "kissing cat",
    unicode_version: "6.0"
  },
  {
    emoji: "🙀",
    aliases: ["scream_cat"],
    tags: ["horror"],
    category: "Smileys & Emotion",
    description: "weary cat",
    unicode_version: "6.0"
  },
  {
    emoji: "😿",
    aliases: ["crying_cat_face"],
    tags: ["sad", "tear"],
    category: "Smileys & Emotion",
    description: "crying cat",
    unicode_version: "6.0"
  },
  {
    emoji: "😾",
    aliases: ["pouting_cat"],
    tags: [],
    category: "Smileys & Emotion",
    description: "pouting cat",
    unicode_version: "6.0"
  },
  {
    emoji: "🙈",
    aliases: ["see_no_evil"],
    tags: ["monkey", "blind", "ignore"],
    category: "Smileys & Emotion",
    description: "see-no-evil monkey",
    unicode_version: "6.0"
  },
  {
    emoji: "🙉",
    aliases: ["hear_no_evil"],
    tags: ["monkey", "deaf"],
    category: "Smileys & Emotion",
    description: "hear-no-evil monkey",
    unicode_version: "6.0"
  },
  {
    emoji: "🙊",
    aliases: ["speak_no_evil"],
    tags: ["monkey", "mute", "hush"],
    category: "Smileys & Emotion",
    description: "speak-no-evil monkey",
    unicode_version: "6.0"
  },
  {
    emoji: "💋",
    aliases: ["kiss"],
    tags: ["lipstick"],
    category: "Smileys & Emotion",
    description: "kiss mark",
    unicode_version: "6.0"
  },
  {
    emoji: "💌",
    aliases: ["love_letter"],
    tags: ["email", "envelope"],
    category: "Smileys & Emotion",
    description: "love letter",
    unicode_version: "6.0"
  },
  {
    emoji: "💘",
    aliases: ["cupid"],
    tags: ["love", "heart"],
    category: "Smileys & Emotion",
    description: "heart with arrow",
    unicode_version: "6.0"
  },
  {
    emoji: "💝",
    aliases: ["gift_heart"],
    tags: ["chocolates"],
    category: "Smileys & Emotion",
    description: "heart with ribbon",
    unicode_version: "6.0"
  },
  {
    emoji: "💖",
    aliases: ["sparkling_heart"],
    tags: [],
    category: "Smileys & Emotion",
    description: "sparkling heart",
    unicode_version: "6.0"
  },
  {
    emoji: "💗",
    aliases: ["heartpulse"],
    tags: [],
    category: "Smileys & Emotion",
    description: "growing heart",
    unicode_version: "6.0"
  },
  {
    emoji: "💓",
    aliases: ["heartbeat"],
    tags: [],
    category: "Smileys & Emotion",
    description: "beating heart",
    unicode_version: "6.0"
  },
  {
    emoji: "💞",
    aliases: ["revolving_hearts"],
    tags: [],
    category: "Smileys & Emotion",
    description: "revolving hearts",
    unicode_version: "6.0"
  },
  {
    emoji: "💕",
    aliases: ["two_hearts"],
    tags: [],
    category: "Smileys & Emotion",
    description: "two hearts",
    unicode_version: "6.0"
  },
  {
    emoji: "💟",
    aliases: ["heart_decoration"],
    tags: [],
    category: "Smileys & Emotion",
    description: "heart decoration",
    unicode_version: "6.0"
  },
  {
    emoji: "❣️",
    aliases: ["heavy_heart_exclamation"],
    tags: [],
    category: "Smileys & Emotion",
    description: "heart exclamation",
    unicode_version: ""
  },
  {
    emoji: "💔",
    aliases: ["broken_heart"],
    tags: [],
    category: "Smileys & Emotion",
    description: "broken heart",
    unicode_version: "6.0"
  },
  {
    emoji: "❤️‍🔥",
    aliases: ["heart_on_fire"],
    tags: [],
    category: "Smileys & Emotion",
    description: "heart on fire",
    unicode_version: "13.1"
  },
  {
    emoji: "❤️‍🩹",
    aliases: ["mending_heart"],
    tags: [],
    category: "Smileys & Emotion",
    description: "mending heart",
    unicode_version: "13.1"
  },
  {
    emoji: "❤️",
    aliases: ["heart"],
    tags: ["love"],
    category: "Smileys & Emotion",
    description: "red heart",
    unicode_version: ""
  },
  {
    emoji: "🧡",
    aliases: ["orange_heart"],
    tags: [],
    category: "Smileys & Emotion",
    description: "orange heart",
    unicode_version: "11.0"
  },
  {
    emoji: "💛",
    aliases: ["yellow_heart"],
    tags: [],
    category: "Smileys & Emotion",
    description: "yellow heart",
    unicode_version: "6.0"
  },
  {
    emoji: "💚",
    aliases: ["green_heart"],
    tags: [],
    category: "Smileys & Emotion",
    description: "green heart",
    unicode_version: "6.0"
  },
  {
    emoji: "💙",
    aliases: ["blue_heart"],
    tags: [],
    category: "Smileys & Emotion",
    description: "blue heart",
    unicode_version: "6.0"
  },
  {
    emoji: "💜",
    aliases: ["purple_heart"],
    tags: [],
    category: "Smileys & Emotion",
    description: "purple heart",
    unicode_version: "6.0"
  },
  {
    emoji: "🤎",
    aliases: ["brown_heart"],
    tags: [],
    category: "Smileys & Emotion",
    description: "brown heart",
    unicode_version: "12.0"
  },
  {
    emoji: "🖤",
    aliases: ["black_heart"],
    tags: [],
    category: "Smileys & Emotion",
    description: "black heart",
    unicode_version: "9.0"
  },
  {
    emoji: "🤍",
    aliases: ["white_heart"],
    tags: [],
    category: "Smileys & Emotion",
    description: "white heart",
    unicode_version: "12.0"
  },
  {
    emoji: "💯",
    aliases: ["100"],
    tags: ["score", "perfect"],
    category: "Smileys & Emotion",
    description: "hundred points",
    unicode_version: "6.0"
  },
  {
    emoji: "💢",
    aliases: ["anger"],
    tags: ["angry"],
    category: "Smileys & Emotion",
    description: "anger symbol",
    unicode_version: "6.0"
  },
  {
    emoji: "💥",
    aliases: ["boom", "collision"],
    tags: ["explode"],
    category: "Smileys & Emotion",
    description: "collision",
    unicode_version: "6.0"
  },
  {
    emoji: "💫",
    aliases: ["dizzy"],
    tags: ["star"],
    category: "Smileys & Emotion",
    description: "dizzy",
    unicode_version: "6.0"
  },
  {
    emoji: "💦",
    aliases: ["sweat_drops"],
    tags: ["water", "workout"],
    category: "Smileys & Emotion",
    description: "sweat droplets",
    unicode_version: "6.0"
  },
  {
    emoji: "💨",
    aliases: ["dash"],
    tags: ["wind", "blow", "fast"],
    category: "Smileys & Emotion",
    description: "dashing away",
    unicode_version: "6.0"
  },
  {
    emoji: "🕳️",
    aliases: ["hole"],
    tags: [],
    category: "Smileys & Emotion",
    description: "hole",
    unicode_version: "7.0"
  },
  {
    emoji: "💣",
    aliases: ["bomb"],
    tags: ["boom"],
    category: "Smileys & Emotion",
    description: "bomb",
    unicode_version: "6.0"
  },
  {
    emoji: "💬",
    aliases: ["speech_balloon"],
    tags: ["comment"],
    category: "Smileys & Emotion",
    description: "speech balloon",
    unicode_version: "6.0"
  },
  {
    emoji: "👁️‍🗨️",
    aliases: ["eye_speech_bubble"],
    tags: [],
    category: "Smileys & Emotion",
    description: "eye in speech bubble",
    unicode_version: "11.0"
  },
  {
    emoji: "🗨️",
    aliases: ["left_speech_bubble"],
    tags: [],
    category: "Smileys & Emotion",
    description: "left speech bubble",
    unicode_version: "11.0"
  },
  {
    emoji: "🗯️",
    aliases: ["right_anger_bubble"],
    tags: [],
    category: "Smileys & Emotion",
    description: "right anger bubble",
    unicode_version: "7.0"
  },
  {
    emoji: "💭",
    aliases: ["thought_balloon"],
    tags: ["thinking"],
    category: "Smileys & Emotion",
    description: "thought balloon",
    unicode_version: "6.0"
  },
  {
    emoji: "💤",
    aliases: ["zzz"],
    tags: ["sleeping"],
    category: "Smileys & Emotion",
    description: "zzz",
    unicode_version: "6.0"
  },
  {
    emoji: "👋",
    aliases: ["wave"],
    tags: ["goodbye"],
    category: "People & Body",
    description: "waving hand",
    unicode_version: "6.0"
  },
  {
    emoji: "🤚",
    aliases: ["raised_back_of_hand"],
    tags: [],
    category: "People & Body",
    description: "raised back of hand",
    unicode_version: "9.0"
  },
  {
    emoji: "🖐️",
    aliases: ["raised_hand_with_fingers_splayed"],
    tags: [],
    category: "People & Body",
    description: "hand with fingers splayed",
    unicode_version: "7.0"
  },
  {
    emoji: "✋",
    aliases: ["hand", "raised_hand"],
    tags: ["highfive", "stop"],
    category: "People & Body",
    description: "raised hand",
    unicode_version: "6.0"
  },
  {
    emoji: "🖖",
    aliases: ["vulcan_salute"],
    tags: ["prosper", "spock"],
    category: "People & Body",
    description: "vulcan salute",
    unicode_version: "7.0"
  },
  {
    emoji: "👌",
    aliases: ["ok_hand"],
    tags: [],
    category: "People & Body",
    description: "OK hand",
    unicode_version: "6.0"
  },
  {
    emoji: "🤌",
    aliases: ["pinched_fingers"],
    tags: [],
    category: "People & Body",
    description: "pinched fingers",
    unicode_version: "13.0"
  },
  {
    emoji: "🤏",
    aliases: ["pinching_hand"],
    tags: [],
    category: "People & Body",
    description: "pinching hand",
    unicode_version: "12.0"
  },
  {
    emoji: "✌️",
    aliases: ["v"],
    tags: ["victory", "peace"],
    category: "People & Body",
    description: "victory hand",
    unicode_version: ""
  },
  {
    emoji: "🤞",
    aliases: ["crossed_fingers"],
    tags: ["luck", "hopeful"],
    category: "People & Body",
    description: "crossed fingers",
    unicode_version: "9.0"
  },
  {
    emoji: "🤟",
    aliases: ["love_you_gesture"],
    tags: [],
    category: "People & Body",
    description: "love-you gesture",
    unicode_version: "11.0"
  },
  {
    emoji: "🤘",
    aliases: ["metal"],
    tags: [],
    category: "People & Body",
    description: "sign of the horns",
    unicode_version: "8.0"
  },
  {
    emoji: "🤙",
    aliases: ["call_me_hand"],
    tags: [],
    category: "People & Body",
    description: "call me hand",
    unicode_version: "9.0"
  },
  {
    emoji: "👈",
    aliases: ["point_left"],
    tags: [],
    category: "People & Body",
    description: "backhand index pointing left",
    unicode_version: "6.0"
  },
  {
    emoji: "👉",
    aliases: ["point_right"],
    tags: [],
    category: "People & Body",
    description: "backhand index pointing right",
    unicode_version: "6.0"
  },
  {
    emoji: "👆",
    aliases: ["point_up_2"],
    tags: [],
    category: "People & Body",
    description: "backhand index pointing up",
    unicode_version: "6.0"
  },
  {
    emoji: "🖕",
    aliases: ["middle_finger", "fu"],
    tags: [],
    category: "People & Body",
    description: "middle finger",
    unicode_version: "7.0"
  },
  {
    emoji: "👇",
    aliases: ["point_down"],
    tags: [],
    category: "People & Body",
    description: "backhand index pointing down",
    unicode_version: "6.0"
  },
  {
    emoji: "☝️",
    aliases: ["point_up"],
    tags: [],
    category: "People & Body",
    description: "index pointing up",
    unicode_version: ""
  },
  {
    emoji: "👍",
    aliases: ["+1", "thumbsup"],
    tags: ["approve", "ok"],
    category: "People & Body",
    description: "thumbs up",
    unicode_version: "6.0"
  },
  {
    emoji: "👎",
    aliases: ["-1", "thumbsdown"],
    tags: ["disapprove", "bury"],
    category: "People & Body",
    description: "thumbs down",
    unicode_version: "6.0"
  },
  {
    emoji: "✊",
    aliases: ["fist_raised", "fist"],
    tags: ["power"],
    category: "People & Body",
    description: "raised fist",
    unicode_version: "6.0"
  },
  {
    emoji: "👊",
    aliases: ["fist_oncoming", "facepunch", "punch"],
    tags: ["attack"],
    category: "People & Body",
    description: "oncoming fist",
    unicode_version: "6.0"
  },
  {
    emoji: "🤛",
    aliases: ["fist_left"],
    tags: [],
    category: "People & Body",
    description: "left-facing fist",
    unicode_version: "9.0"
  },
  {
    emoji: "🤜",
    aliases: ["fist_right"],
    tags: [],
    category: "People & Body",
    description: "right-facing fist",
    unicode_version: "9.0"
  },
  {
    emoji: "👏",
    aliases: ["clap"],
    tags: ["praise", "applause"],
    category: "People & Body",
    description: "clapping hands",
    unicode_version: "6.0"
  },
  {
    emoji: "🙌",
    aliases: ["raised_hands"],
    tags: ["hooray"],
    category: "People & Body",
    description: "raising hands",
    unicode_version: "6.0"
  },
  {
    emoji: "👐",
    aliases: ["open_hands"],
    tags: [],
    category: "People & Body",
    description: "open hands",
    unicode_version: "6.0"
  },
  {
    emoji: "🤲",
    aliases: ["palms_up_together"],
    tags: [],
    category: "People & Body",
    description: "palms up together",
    unicode_version: "11.0"
  },
  {
    emoji: "🤝",
    aliases: ["handshake"],
    tags: ["deal"],
    category: "People & Body",
    description: "handshake",
    unicode_version: "9.0"
  },
  {
    emoji: "🙏",
    aliases: ["pray"],
    tags: ["please", "hope", "wish"],
    category: "People & Body",
    description: "folded hands",
    unicode_version: "6.0"
  },
  {
    emoji: "✍️",
    aliases: ["writing_hand"],
    tags: [],
    category: "People & Body",
    description: "writing hand",
    unicode_version: ""
  },
  {
    emoji: "💅",
    aliases: ["nail_care"],
    tags: ["beauty", "manicure"],
    category: "People & Body",
    description: "nail polish",
    unicode_version: "6.0"
  },
  {
    emoji: "🤳",
    aliases: ["selfie"],
    tags: [],
    category: "People & Body",
    description: "selfie",
    unicode_version: "9.0"
  },
  {
    emoji: "💪",
    aliases: ["muscle"],
    tags: ["flex", "bicep", "strong", "workout"],
    category: "People & Body",
    description: "flexed biceps",
    unicode_version: "6.0"
  },
  {
    emoji: "🦾",
    aliases: ["mechanical_arm"],
    tags: [],
    category: "People & Body",
    description: "mechanical arm",
    unicode_version: "12.0"
  },
  {
    emoji: "🦿",
    aliases: ["mechanical_leg"],
    tags: [],
    category: "People & Body",
    description: "mechanical leg",
    unicode_version: "12.0"
  },
  {
    emoji: "🦵",
    aliases: ["leg"],
    tags: [],
    category: "People & Body",
    description: "leg",
    unicode_version: "11.0"
  },
  {
    emoji: "🦶",
    aliases: ["foot"],
    tags: [],
    category: "People & Body",
    description: "foot",
    unicode_version: "11.0"
  },
  {
    emoji: "👂",
    aliases: ["ear"],
    tags: ["hear", "sound", "listen"],
    category: "People & Body",
    description: "ear",
    unicode_version: "6.0"
  },
  {
    emoji: "🦻",
    aliases: ["ear_with_hearing_aid"],
    tags: [],
    category: "People & Body",
    description: "ear with hearing aid",
    unicode_version: "12.0"
  },
  {
    emoji: "👃",
    aliases: ["nose"],
    tags: ["smell"],
    category: "People & Body",
    description: "nose",
    unicode_version: "6.0"
  },
  {
    emoji: "🧠",
    aliases: ["brain"],
    tags: [],
    category: "People & Body",
    description: "brain",
    unicode_version: "11.0"
  },
  {
    emoji: "🫀",
    aliases: ["anatomical_heart"],
    tags: [],
    category: "People & Body",
    description: "anatomical heart",
    unicode_version: "13.0"
  },
  {
    emoji: "🫁",
    aliases: ["lungs"],
    tags: [],
    category: "People & Body",
    description: "lungs",
    unicode_version: "13.0"
  },
  {
    emoji: "🦷",
    aliases: ["tooth"],
    tags: [],
    category: "People & Body",
    description: "tooth",
    unicode_version: "11.0"
  },
  {
    emoji: "🦴",
    aliases: ["bone"],
    tags: [],
    category: "People & Body",
    description: "bone",
    unicode_version: "11.0"
  },
  {
    emoji: "👀",
    aliases: ["eyes"],
    tags: ["look", "see", "watch"],
    category: "People & Body",
    description: "eyes",
    unicode_version: "6.0"
  },
  {
    emoji: "👁️",
    aliases: ["eye"],
    tags: [],
    category: "People & Body",
    description: "eye",
    unicode_version: "7.0"
  },
  {
    emoji: "👅",
    aliases: ["tongue"],
    tags: ["taste"],
    category: "People & Body",
    description: "tongue",
    unicode_version: "6.0"
  },
  {
    emoji: "👄",
    aliases: ["lips"],
    tags: ["kiss"],
    category: "People & Body",
    description: "mouth",
    unicode_version: "6.0"
  },
  {
    emoji: "👶",
    aliases: ["baby"],
    tags: ["child", "newborn"],
    category: "People & Body",
    description: "baby",
    unicode_version: "6.0"
  },
  {
    emoji: "🧒",
    aliases: ["child"],
    tags: [],
    category: "People & Body",
    description: "child",
    unicode_version: "11.0"
  },
  {
    emoji: "👦",
    aliases: ["boy"],
    tags: ["child"],
    category: "People & Body",
    description: "boy",
    unicode_version: "6.0"
  },
  {
    emoji: "👧",
    aliases: ["girl"],
    tags: ["child"],
    category: "People & Body",
    description: "girl",
    unicode_version: "6.0"
  },
  {
    emoji: "🧑",
    aliases: ["adult"],
    tags: [],
    category: "People & Body",
    description: "person",
    unicode_version: "11.0"
  },
  {
    emoji: "👱",
    aliases: ["blond_haired_person"],
    tags: [],
    category: "People & Body",
    description: "person: blond hair",
    unicode_version: "6.0"
  },
  {
    emoji: "👨",
    aliases: ["man"],
    tags: ["mustache", "father", "dad"],
    category: "People & Body",
    description: "man",
    unicode_version: "6.0"
  },
  {
    emoji: "🧔",
    aliases: ["bearded_person"],
    tags: [],
    category: "People & Body",
    description: "person: beard",
    unicode_version: "11.0"
  },
  {
    emoji: "🧔‍♂️",
    aliases: ["man_beard"],
    tags: [],
    category: "People & Body",
    description: "man: beard",
    unicode_version: "13.1"
  },
  {
    emoji: "🧔‍♀️",
    aliases: ["woman_beard"],
    tags: [],
    category: "People & Body",
    description: "woman: beard",
    unicode_version: "13.1"
  },
  {
    emoji: "👨‍🦰",
    aliases: ["red_haired_man"],
    tags: [],
    category: "People & Body",
    description: "man: red hair",
    unicode_version: "11.0"
  },
  {
    emoji: "👨‍🦱",
    aliases: ["curly_haired_man"],
    tags: [],
    category: "People & Body",
    description: "man: curly hair",
    unicode_version: "11.0"
  },
  {
    emoji: "👨‍🦳",
    aliases: ["white_haired_man"],
    tags: [],
    category: "People & Body",
    description: "man: white hair",
    unicode_version: "11.0"
  },
  {
    emoji: "👨‍🦲",
    aliases: ["bald_man"],
    tags: [],
    category: "People & Body",
    description: "man: bald",
    unicode_version: "11.0"
  },
  {
    emoji: "👩",
    aliases: ["woman"],
    tags: ["girls"],
    category: "People & Body",
    description: "woman",
    unicode_version: "6.0"
  },
  {
    emoji: "👩‍🦰",
    aliases: ["red_haired_woman"],
    tags: [],
    category: "People & Body",
    description: "woman: red hair",
    unicode_version: "11.0"
  },
  {
    emoji: "🧑‍🦰",
    aliases: ["person_red_hair"],
    tags: [],
    category: "People & Body",
    description: "person: red hair",
    unicode_version: "12.1"
  },
  {
    emoji: "👩‍🦱",
    aliases: ["curly_haired_woman"],
    tags: [],
    category: "People & Body",
    description: "woman: curly hair",
    unicode_version: "11.0"
  },
  {
    emoji: "🧑‍🦱",
    aliases: ["person_curly_hair"],
    tags: [],
    category: "People & Body",
    description: "person: curly hair",
    unicode_version: "12.1"
  },
  {
    emoji: "👩‍🦳",
    aliases: ["white_haired_woman"],
    tags: [],
    category: "People & Body",
    description: "woman: white hair",
    unicode_version: "11.0"
  },
  {
    emoji: "🧑‍🦳",
    aliases: ["person_white_hair"],
    tags: [],
    category: "People & Body",
    description: "person: white hair",
    unicode_version: "12.1"
  },
  {
    emoji: "👩‍🦲",
    aliases: ["bald_woman"],
    tags: [],
    category: "People & Body",
    description: "woman: bald",
    unicode_version: "11.0"
  },
  {
    emoji: "🧑‍🦲",
    aliases: ["person_bald"],
    tags: [],
    category: "People & Body",
    description: "person: bald",
    unicode_version: "12.1"
  },
  {
    emoji: "👱‍♀️",
    aliases: ["blond_haired_woman", "blonde_woman"],
    tags: [],
    category: "People & Body",
    description: "woman: blond hair",
    unicode_version: "6.0"
  },
  {
    emoji: "👱‍♂️",
    aliases: ["blond_haired_man"],
    tags: [],
    category: "People & Body",
    description: "man: blond hair",
    unicode_version: "11.0"
  },
  {
    emoji: "🧓",
    aliases: ["older_adult"],
    tags: [],
    category: "People & Body",
    description: "older person",
    unicode_version: "11.0"
  },
  {
    emoji: "👴",
    aliases: ["older_man"],
    tags: [],
    category: "People & Body",
    description: "old man",
    unicode_version: "6.0"
  },
  {
    emoji: "👵",
    aliases: ["older_woman"],
    tags: [],
    category: "People & Body",
    description: "old woman",
    unicode_version: "6.0"
  },
  {
    emoji: "🙍",
    aliases: ["frowning_person"],
    tags: [],
    category: "People & Body",
    description: "person frowning",
    unicode_version: "6.0"
  },
  {
    emoji: "🙍‍♂️",
    aliases: ["frowning_man"],
    tags: [],
    category: "People & Body",
    description: "man frowning",
    unicode_version: "6.0"
  },
  {
    emoji: "🙍‍♀️",
    aliases: ["frowning_woman"],
    tags: [],
    category: "People & Body",
    description: "woman frowning",
    unicode_version: "11.0"
  },
  {
    emoji: "🙎",
    aliases: ["pouting_face"],
    tags: [],
    category: "People & Body",
    description: "person pouting",
    unicode_version: "6.0"
  },
  {
    emoji: "🙎‍♂️",
    aliases: ["pouting_man"],
    tags: [],
    category: "People & Body",
    description: "man pouting",
    unicode_version: "6.0"
  },
  {
    emoji: "🙎‍♀️",
    aliases: ["pouting_woman"],
    tags: [],
    category: "People & Body",
    description: "woman pouting",
    unicode_version: "11.0"
  },
  {
    emoji: "🙅",
    aliases: ["no_good"],
    tags: ["stop", "halt", "denied"],
    category: "People & Body",
    description: "person gesturing NO",
    unicode_version: "6.0"
  },
  {
    emoji: "🙅‍♂️",
    aliases: ["no_good_man", "ng_man"],
    tags: ["stop", "halt", "denied"],
    category: "People & Body",
    description: "man gesturing NO",
    unicode_version: "6.0"
  },
  {
    emoji: "🙅‍♀️",
    aliases: ["no_good_woman", "ng_woman"],
    tags: ["stop", "halt", "denied"],
    category: "People & Body",
    description: "woman gesturing NO",
    unicode_version: "11.0"
  },
  {
    emoji: "🙆",
    aliases: ["ok_person"],
    tags: [],
    category: "People & Body",
    description: "person gesturing OK",
    unicode_version: "6.0"
  },
  {
    emoji: "🙆‍♂️",
    aliases: ["ok_man"],
    tags: [],
    category: "People & Body",
    description: "man gesturing OK",
    unicode_version: "6.0"
  },
  {
    emoji: "🙆‍♀️",
    aliases: ["ok_woman"],
    tags: [],
    category: "People & Body",
    description: "woman gesturing OK",
    unicode_version: "11.0"
  },
  {
    emoji: "💁",
    aliases: ["tipping_hand_person", "information_desk_person"],
    tags: [],
    category: "People & Body",
    description: "person tipping hand",
    unicode_version: "6.0"
  },
  {
    emoji: "💁‍♂️",
    aliases: ["tipping_hand_man", "sassy_man"],
    tags: ["information"],
    category: "People & Body",
    description: "man tipping hand",
    unicode_version: "6.0"
  },
  {
    emoji: "💁‍♀️",
    aliases: ["tipping_hand_woman", "sassy_woman"],
    tags: ["information"],
    category: "People & Body",
    description: "woman tipping hand",
    unicode_version: "11.0"
  },
  {
    emoji: "🙋",
    aliases: ["raising_hand"],
    tags: [],
    category: "People & Body",
    description: "person raising hand",
    unicode_version: "6.0"
  },
  {
    emoji: "🙋‍♂️",
    aliases: ["raising_hand_man"],
    tags: [],
    category: "People & Body",
    description: "man raising hand",
    unicode_version: "6.0"
  },
  {
    emoji: "🙋‍♀️",
    aliases: ["raising_hand_woman"],
    tags: [],
    category: "People & Body",
    description: "woman raising hand",
    unicode_version: "11.0"
  },
  {
    emoji: "🧏",
    aliases: ["deaf_person"],
    tags: [],
    category: "People & Body",
    description: "deaf person",
    unicode_version: "12.0"
  },
  {
    emoji: "🧏‍♂️",
    aliases: ["deaf_man"],
    tags: [],
    category: "People & Body",
    description: "deaf man",
    unicode_version: "12.0"
  },
  {
    emoji: "🧏‍♀️",
    aliases: ["deaf_woman"],
    tags: [],
    category: "People & Body",
    description: "deaf woman",
    unicode_version: "12.0"
  },
  {
    emoji: "🙇",
    aliases: ["bow"],
    tags: ["respect", "thanks"],
    category: "People & Body",
    description: "person bowing",
    unicode_version: "6.0"
  },
  {
    emoji: "🙇‍♂️",
    aliases: ["bowing_man"],
    tags: ["respect", "thanks"],
    category: "People & Body",
    description: "man bowing",
    unicode_version: "11.0"
  },
  {
    emoji: "🙇‍♀️",
    aliases: ["bowing_woman"],
    tags: ["respect", "thanks"],
    category: "People & Body",
    description: "woman bowing",
    unicode_version: "6.0"
  },
  {
    emoji: "🤦",
    aliases: ["facepalm"],
    tags: [],
    category: "People & Body",
    description: "person facepalming",
    unicode_version: "11.0"
  },
  {
    emoji: "🤦‍♂️",
    aliases: ["man_facepalming"],
    tags: [],
    category: "People & Body",
    description: "man facepalming",
    unicode_version: "9.0"
  },
  {
    emoji: "🤦‍♀️",
    aliases: ["woman_facepalming"],
    tags: [],
    category: "People & Body",
    description: "woman facepalming",
    unicode_version: "9.0"
  },
  {
    emoji: "🤷",
    aliases: ["shrug"],
    tags: [],
    category: "People & Body",
    description: "person shrugging",
    unicode_version: "11.0"
  },
  {
    emoji: "🤷‍♂️",
    aliases: ["man_shrugging"],
    tags: [],
    category: "People & Body",
    description: "man shrugging",
    unicode_version: "9.0"
  },
  {
    emoji: "🤷‍♀️",
    aliases: ["woman_shrugging"],
    tags: [],
    category: "People & Body",
    description: "woman shrugging",
    unicode_version: "9.0"
  },
  {
    emoji: "🧑‍⚕️",
    aliases: ["health_worker"],
    tags: [],
    category: "People & Body",
    description: "health worker",
    unicode_version: "12.1"
  },
  {
    emoji: "👨‍⚕️",
    aliases: ["man_health_worker"],
    tags: ["doctor", "nurse"],
    category: "People & Body",
    description: "man health worker",
    unicode_version: ""
  },
  {
    emoji: "👩‍⚕️",
    aliases: ["woman_health_worker"],
    tags: ["doctor", "nurse"],
    category: "People & Body",
    description: "woman health worker",
    unicode_version: ""
  },
  {
    emoji: "🧑‍🎓",
    aliases: ["student"],
    tags: [],
    category: "People & Body",
    description: "student",
    unicode_version: "12.1"
  },
  {
    emoji: "👨‍🎓",
    aliases: ["man_student"],
    tags: ["graduation"],
    category: "People & Body",
    description: "man student",
    unicode_version: ""
  },
  {
    emoji: "👩‍🎓",
    aliases: ["woman_student"],
    tags: ["graduation"],
    category: "People & Body",
    description: "woman student",
    unicode_version: ""
  },
  {
    emoji: "🧑‍🏫",
    aliases: ["teacher"],
    tags: [],
    category: "People & Body",
    description: "teacher",
    unicode_version: "12.1"
  },
  {
    emoji: "👨‍🏫",
    aliases: ["man_teacher"],
    tags: ["school", "professor"],
    category: "People & Body",
    description: "man teacher",
    unicode_version: ""
  },
  {
    emoji: "👩‍🏫",
    aliases: ["woman_teacher"],
    tags: ["school", "professor"],
    category: "People & Body",
    description: "woman teacher",
    unicode_version: ""
  },
  {
    emoji: "🧑‍⚖️",
    aliases: ["judge"],
    tags: [],
    category: "People & Body",
    description: "judge",
    unicode_version: "12.1"
  },
  {
    emoji: "👨‍⚖️",
    aliases: ["man_judge"],
    tags: ["justice"],
    category: "People & Body",
    description: "man judge",
    unicode_version: ""
  },
  {
    emoji: "👩‍⚖️",
    aliases: ["woman_judge"],
    tags: ["justice"],
    category: "People & Body",
    description: "woman judge",
    unicode_version: ""
  },
  {
    emoji: "🧑‍🌾",
    aliases: ["farmer"],
    tags: [],
    category: "People & Body",
    description: "farmer",
    unicode_version: "12.1"
  },
  {
    emoji: "👨‍🌾",
    aliases: ["man_farmer"],
    tags: [],
    category: "People & Body",
    description: "man farmer",
    unicode_version: ""
  },
  {
    emoji: "👩‍🌾",
    aliases: ["woman_farmer"],
    tags: [],
    category: "People & Body",
    description: "woman farmer",
    unicode_version: ""
  },
  {
    emoji: "🧑‍🍳",
    aliases: ["cook"],
    tags: [],
    category: "People & Body",
    description: "cook",
    unicode_version: "12.1"
  },
  {
    emoji: "👨‍🍳",
    aliases: ["man_cook"],
    tags: ["chef"],
    category: "People & Body",
    description: "man cook",
    unicode_version: ""
  },
  {
    emoji: "👩‍🍳",
    aliases: ["woman_cook"],
    tags: ["chef"],
    category: "People & Body",
    description: "woman cook",
    unicode_version: ""
  },
  {
    emoji: "🧑‍🔧",
    aliases: ["mechanic"],
    tags: [],
    category: "People & Body",
    description: "mechanic",
    unicode_version: "12.1"
  },
  {
    emoji: "👨‍🔧",
    aliases: ["man_mechanic"],
    tags: [],
    category: "People & Body",
    description: "man mechanic",
    unicode_version: ""
  },
  {
    emoji: "👩‍🔧",
    aliases: ["woman_mechanic"],
    tags: [],
    category: "People & Body",
    description: "woman mechanic",
    unicode_version: ""
  },
  {
    emoji: "🧑‍🏭",
    aliases: ["factory_worker"],
    tags: [],
    category: "People & Body",
    description: "factory worker",
    unicode_version: "12.1"
  },
  {
    emoji: "👨‍🏭",
    aliases: ["man_factory_worker"],
    tags: [],
    category: "People & Body",
    description: "man factory worker",
    unicode_version: ""
  },
  {
    emoji: "👩‍🏭",
    aliases: ["woman_factory_worker"],
    tags: [],
    category: "People & Body",
    description: "woman factory worker",
    unicode_version: ""
  },
  {
    emoji: "🧑‍💼",
    aliases: ["office_worker"],
    tags: [],
    category: "People & Body",
    description: "office worker",
    unicode_version: "12.1"
  },
  {
    emoji: "👨‍💼",
    aliases: ["man_office_worker"],
    tags: ["business"],
    category: "People & Body",
    description: "man office worker",
    unicode_version: ""
  },
  {
    emoji: "👩‍💼",
    aliases: ["woman_office_worker"],
    tags: ["business"],
    category: "People & Body",
    description: "woman office worker",
    unicode_version: ""
  },
  {
    emoji: "🧑‍🔬",
    aliases: ["scientist"],
    tags: [],
    category: "People & Body",
    description: "scientist",
    unicode_version: "12.1"
  },
  {
    emoji: "👨‍🔬",
    aliases: ["man_scientist"],
    tags: ["research"],
    category: "People & Body",
    description: "man scientist",
    unicode_version: ""
  },
  {
    emoji: "👩‍🔬",
    aliases: ["woman_scientist"],
    tags: ["research"],
    category: "People & Body",
    description: "woman scientist",
    unicode_version: ""
  },
  {
    emoji: "🧑‍💻",
    aliases: ["technologist"],
    tags: [],
    category: "People & Body",
    description: "technologist",
    unicode_version: "12.1"
  },
  {
    emoji: "👨‍💻",
    aliases: ["man_technologist"],
    tags: ["coder"],
    category: "People & Body",
    description: "man technologist",
    unicode_version: ""
  },
  {
    emoji: "👩‍💻",
    aliases: ["woman_technologist"],
    tags: ["coder"],
    category: "People & Body",
    description: "woman technologist",
    unicode_version: ""
  },
  {
    emoji: "🧑‍🎤",
    aliases: ["singer"],
    tags: [],
    category: "People & Body",
    description: "singer",
    unicode_version: "12.1"
  },
  {
    emoji: "👨‍🎤",
    aliases: ["man_singer"],
    tags: ["rockstar"],
    category: "People & Body",
    description: "man singer",
    unicode_version: ""
  },
  {
    emoji: "👩‍🎤",
    aliases: ["woman_singer"],
    tags: ["rockstar"],
    category: "People & Body",
    description: "woman singer",
    unicode_version: ""
  },
  {
    emoji: "🧑‍🎨",
    aliases: ["artist"],
    tags: [],
    category: "People & Body",
    description: "artist",
    unicode_version: "12.1"
  },
  {
    emoji: "👨‍🎨",
    aliases: ["man_artist"],
    tags: ["painter"],
    category: "People & Body",
    description: "man artist",
    unicode_version: ""
  },
  {
    emoji: "👩‍🎨",
    aliases: ["woman_artist"],
    tags: ["painter"],
    category: "People & Body",
    description: "woman artist",
    unicode_version: ""
  },
  {
    emoji: "🧑‍✈️",
    aliases: ["pilot"],
    tags: [],
    category: "People & Body",
    description: "pilot",
    unicode_version: "12.1"
  },
  {
    emoji: "👨‍✈️",
    aliases: ["man_pilot"],
    tags: [],
    category: "People & Body",
    description: "man pilot",
    unicode_version: ""
  },
  {
    emoji: "👩‍✈️",
    aliases: ["woman_pilot"],
    tags: [],
    category: "People & Body",
    description: "woman pilot",
    unicode_version: ""
  },
  {
    emoji: "🧑‍🚀",
    aliases: ["astronaut"],
    tags: [],
    category: "People & Body",
    description: "astronaut",
    unicode_version: "12.1"
  },
  {
    emoji: "👨‍🚀",
    aliases: ["man_astronaut"],
    tags: ["space"],
    category: "People & Body",
    description: "man astronaut",
    unicode_version: ""
  },
  {
    emoji: "👩‍🚀",
    aliases: ["woman_astronaut"],
    tags: ["space"],
    category: "People & Body",
    description: "woman astronaut",
    unicode_version: ""
  },
  {
    emoji: "🧑‍🚒",
    aliases: ["firefighter"],
    tags: [],
    category: "People & Body",
    description: "firefighter",
    unicode_version: "12.1"
  },
  {
    emoji: "👨‍🚒",
    aliases: ["man_firefighter"],
    tags: [],
    category: "People & Body",
    description: "man firefighter",
    unicode_version: ""
  },
  {
    emoji: "👩‍🚒",
    aliases: ["woman_firefighter"],
    tags: [],
    category: "People & Body",
    description: "woman firefighter",
    unicode_version: ""
  },
  {
    emoji: "👮",
    aliases: ["police_officer", "cop"],
    tags: ["law"],
    category: "People & Body",
    description: "police officer",
    unicode_version: "6.0"
  },
  {
    emoji: "👮‍♂️",
    aliases: ["policeman"],
    tags: ["law", "cop"],
    category: "People & Body",
    description: "man police officer",
    unicode_version: "11.0"
  },
  {
    emoji: "👮‍♀️",
    aliases: ["policewoman"],
    tags: ["law", "cop"],
    category: "People & Body",
    description: "woman police officer",
    unicode_version: "6.0"
  },
  {
    emoji: "🕵️",
    aliases: ["detective"],
    tags: ["sleuth"],
    category: "People & Body",
    description: "detective",
    unicode_version: "7.0"
  },
  {
    emoji: "🕵️‍♂️",
    aliases: ["male_detective"],
    tags: ["sleuth"],
    category: "People & Body",
    description: "man detective",
    unicode_version: "11.0"
  },
  {
    emoji: "🕵️‍♀️",
    aliases: ["female_detective"],
    tags: ["sleuth"],
    category: "People & Body",
    description: "woman detective",
    unicode_version: "6.0"
  },
  {
    emoji: "💂",
    aliases: ["guard"],
    tags: [],
    category: "People & Body",
    description: "guard",
    unicode_version: "6.0"
  },
  {
    emoji: "💂‍♂️",
    aliases: ["guardsman"],
    tags: [],
    category: "People & Body",
    description: "man guard",
    unicode_version: "11.0"
  },
  {
    emoji: "💂‍♀️",
    aliases: ["guardswoman"],
    tags: [],
    category: "People & Body",
    description: "woman guard",
    unicode_version: "6.0"
  },
  {
    emoji: "🥷",
    aliases: ["ninja"],
    tags: [],
    category: "People & Body",
    description: "ninja",
    unicode_version: "13.0"
  },
  {
    emoji: "👷",
    aliases: ["construction_worker"],
    tags: ["helmet"],
    category: "People & Body",
    description: "construction worker",
    unicode_version: "6.0"
  },
  {
    emoji: "👷‍♂️",
    aliases: ["construction_worker_man"],
    tags: ["helmet"],
    category: "People & Body",
    description: "man construction worker",
    unicode_version: "11.0"
  },
  {
    emoji: "👷‍♀️",
    aliases: ["construction_worker_woman"],
    tags: ["helmet"],
    category: "People & Body",
    description: "woman construction worker",
    unicode_version: "6.0"
  },
  {
    emoji: "🤴",
    aliases: ["prince"],
    tags: ["crown", "royal"],
    category: "People & Body",
    description: "prince",
    unicode_version: "9.0"
  },
  {
    emoji: "👸",
    aliases: ["princess"],
    tags: ["crown", "royal"],
    category: "People & Body",
    description: "princess",
    unicode_version: "6.0"
  },
  {
    emoji: "👳",
    aliases: ["person_with_turban"],
    tags: [],
    category: "People & Body",
    description: "person wearing turban",
    unicode_version: "6.0"
  },
  {
    emoji: "👳‍♂️",
    aliases: ["man_with_turban"],
    tags: [],
    category: "People & Body",
    description: "man wearing turban",
    unicode_version: "11.0"
  },
  {
    emoji: "👳‍♀️",
    aliases: ["woman_with_turban"],
    tags: [],
    category: "People & Body",
    description: "woman wearing turban",
    unicode_version: "6.0"
  },
  {
    emoji: "👲",
    aliases: ["man_with_gua_pi_mao"],
    tags: [],
    category: "People & Body",
    description: "person with skullcap",
    unicode_version: "6.0"
  },
  {
    emoji: "🧕",
    aliases: ["woman_with_headscarf"],
    tags: ["hijab"],
    category: "People & Body",
    description: "woman with headscarf",
    unicode_version: "11.0"
  },
  {
    emoji: "🤵",
    aliases: ["person_in_tuxedo"],
    tags: ["groom", "marriage", "wedding"],
    category: "People & Body",
    description: "person in tuxedo",
    unicode_version: "9.0"
  },
  {
    emoji: "🤵‍♂️",
    aliases: ["man_in_tuxedo"],
    tags: [],
    category: "People & Body",
    description: "man in tuxedo",
    unicode_version: "13.0"
  },
  {
    emoji: "🤵‍♀️",
    aliases: ["woman_in_tuxedo"],
    tags: [],
    category: "People & Body",
    description: "woman in tuxedo",
    unicode_version: "13.0"
  },
  {
    emoji: "👰",
    aliases: ["person_with_veil"],
    tags: ["marriage", "wedding"],
    category: "People & Body",
    description: "person with veil",
    unicode_version: "6.0"
  },
  {
    emoji: "👰‍♂️",
    aliases: ["man_with_veil"],
    tags: [],
    category: "People & Body",
    description: "man with veil",
    unicode_version: "13.0"
  },
  {
    emoji: "👰‍♀️",
    aliases: ["woman_with_veil", "bride_with_veil"],
    tags: [],
    category: "People & Body",
    description: "woman with veil",
    unicode_version: "13.0"
  },
  {
    emoji: "🤰",
    aliases: ["pregnant_woman"],
    tags: [],
    category: "People & Body",
    description: "pregnant woman",
    unicode_version: "9.0"
  },
  {
    emoji: "🤱",
    aliases: ["breast_feeding"],
    tags: ["nursing"],
    category: "People & Body",
    description: "breast-feeding",
    unicode_version: "11.0"
  },
  {
    emoji: "👩‍🍼",
    aliases: ["woman_feeding_baby"],
    tags: [],
    category: "People & Body",
    description: "woman feeding baby",
    unicode_version: "13.0"
  },
  {
    emoji: "👨‍🍼",
    aliases: ["man_feeding_baby"],
    tags: [],
    category: "People & Body",
    description: "man feeding baby",
    unicode_version: "13.0"
  },
  {
    emoji: "🧑‍🍼",
    aliases: ["person_feeding_baby"],
    tags: [],
    category: "People & Body",
    description: "person feeding baby",
    unicode_version: "13.0"
  },
  {
    emoji: "👼",
    aliases: ["angel"],
    tags: [],
    category: "People & Body",
    description: "baby angel",
    unicode_version: "6.0"
  },
  {
    emoji: "🎅",
    aliases: ["santa"],
    tags: ["christmas"],
    category: "People & Body",
    description: "Santa Claus",
    unicode_version: "6.0"
  },
  {
    emoji: "🤶",
    aliases: ["mrs_claus"],
    tags: ["santa"],
    category: "People & Body",
    description: "Mrs. Claus",
    unicode_version: "9.0"
  },
  {
    emoji: "🧑‍🎄",
    aliases: ["mx_claus"],
    tags: [],
    category: "People & Body",
    description: "mx claus",
    unicode_version: "13.0"
  },
  {
    emoji: "🦸",
    aliases: ["superhero"],
    tags: [],
    category: "People & Body",
    description: "superhero",
    unicode_version: "11.0"
  },
  {
    emoji: "🦸‍♂️",
    aliases: ["superhero_man"],
    tags: [],
    category: "People & Body",
    description: "man superhero",
    unicode_version: "11.0"
  },
  {
    emoji: "🦸‍♀️",
    aliases: ["superhero_woman"],
    tags: [],
    category: "People & Body",
    description: "woman superhero",
    unicode_version: "11.0"
  },
  {
    emoji: "🦹",
    aliases: ["supervillain"],
    tags: [],
    category: "People & Body",
    description: "supervillain",
    unicode_version: "11.0"
  },
  {
    emoji: "🦹‍♂️",
    aliases: ["supervillain_man"],
    tags: [],
    category: "People & Body",
    description: "man supervillain",
    unicode_version: "11.0"
  },
  {
    emoji: "🦹‍♀️",
    aliases: ["supervillain_woman"],
    tags: [],
    category: "People & Body",
    description: "woman supervillain",
    unicode_version: "11.0"
  },
  {
    emoji: "🧙",
    aliases: ["mage"],
    tags: ["wizard"],
    category: "People & Body",
    description: "mage",
    unicode_version: "11.0"
  },
  {
    emoji: "🧙‍♂️",
    aliases: ["mage_man"],
    tags: ["wizard"],
    category: "People & Body",
    description: "man mage",
    unicode_version: "11.0"
  },
  {
    emoji: "🧙‍♀️",
    aliases: ["mage_woman"],
    tags: ["wizard"],
    category: "People & Body",
    description: "woman mage",
    unicode_version: "11.0"
  },
  {
    emoji: "🧚",
    aliases: ["fairy"],
    tags: [],
    category: "People & Body",
    description: "fairy",
    unicode_version: "11.0"
  },
  {
    emoji: "🧚‍♂️",
    aliases: ["fairy_man"],
    tags: [],
    category: "People & Body",
    description: "man fairy",
    unicode_version: "11.0"
  },
  {
    emoji: "🧚‍♀️",
    aliases: ["fairy_woman"],
    tags: [],
    category: "People & Body",
    description: "woman fairy",
    unicode_version: "11.0"
  },
  {
    emoji: "🧛",
    aliases: ["vampire"],
    tags: [],
    category: "People & Body",
    description: "vampire",
    unicode_version: "11.0"
  },
  {
    emoji: "🧛‍♂️",
    aliases: ["vampire_man"],
    tags: [],
    category: "People & Body",
    description: "man vampire",
    unicode_version: "11.0"
  },
  {
    emoji: "🧛‍♀️",
    aliases: ["vampire_woman"],
    tags: [],
    category: "People & Body",
    description: "woman vampire",
    unicode_version: "11.0"
  },
  {
    emoji: "🧜",
    aliases: ["merperson"],
    tags: [],
    category: "People & Body",
    description: "merperson",
    unicode_version: "11.0"
  },
  {
    emoji: "🧜‍♂️",
    aliases: ["merman"],
    tags: [],
    category: "People & Body",
    description: "merman",
    unicode_version: "11.0"
  },
  {
    emoji: "🧜‍♀️",
    aliases: ["mermaid"],
    tags: [],
    category: "People & Body",
    description: "mermaid",
    unicode_version: "11.0"
  },
  {
    emoji: "🧝",
    aliases: ["elf"],
    tags: [],
    category: "People & Body",
    description: "elf",
    unicode_version: "11.0"
  },
  {
    emoji: "🧝‍♂️",
    aliases: ["elf_man"],
    tags: [],
    category: "People & Body",
    description: "man elf",
    unicode_version: "11.0"
  },
  {
    emoji: "🧝‍♀️",
    aliases: ["elf_woman"],
    tags: [],
    category: "People & Body",
    description: "woman elf",
    unicode_version: "11.0"
  },
  {
    emoji: "🧞",
    aliases: ["genie"],
    tags: [],
    category: "People & Body",
    description: "genie",
    unicode_version: "11.0"
  },
  {
    emoji: "🧞‍♂️",
    aliases: ["genie_man"],
    tags: [],
    category: "People & Body",
    description: "man genie",
    unicode_version: "11.0"
  },
  {
    emoji: "🧞‍♀️",
    aliases: ["genie_woman"],
    tags: [],
    category: "People & Body",
    description: "woman genie",
    unicode_version: "11.0"
  },
  {
    emoji: "🧟",
    aliases: ["zombie"],
    tags: [],
    category: "People & Body",
    description: "zombie",
    unicode_version: "11.0"
  },
  {
    emoji: "🧟‍♂️",
    aliases: ["zombie_man"],
    tags: [],
    category: "People & Body",
    description: "man zombie",
    unicode_version: "11.0"
  },
  {
    emoji: "🧟‍♀️",
    aliases: ["zombie_woman"],
    tags: [],
    category: "People & Body",
    description: "woman zombie",
    unicode_version: "11.0"
  },
  {
    emoji: "💆",
    aliases: ["massage"],
    tags: ["spa"],
    category: "People & Body",
    description: "person getting massage",
    unicode_version: "6.0"
  },
  {
    emoji: "💆‍♂️",
    aliases: ["massage_man"],
    tags: ["spa"],
    category: "People & Body",
    description: "man getting massage",
    unicode_version: "6.0"
  },
  {
    emoji: "💆‍♀️",
    aliases: ["massage_woman"],
    tags: ["spa"],
    category: "People & Body",
    description: "woman getting massage",
    unicode_version: "11.0"
  },
  {
    emoji: "💇",
    aliases: ["haircut"],
    tags: ["beauty"],
    category: "People & Body",
    description: "person getting haircut",
    unicode_version: "6.0"
  },
  {
    emoji: "💇‍♂️",
    aliases: ["haircut_man"],
    tags: [],
    category: "People & Body",
    description: "man getting haircut",
    unicode_version: "6.0"
  },
  {
    emoji: "💇‍♀️",
    aliases: ["haircut_woman"],
    tags: [],
    category: "People & Body",
    description: "woman getting haircut",
    unicode_version: "11.0"
  },
  {
    emoji: "🚶",
    aliases: ["walking"],
    tags: [],
    category: "People & Body",
    description: "person walking",
    unicode_version: "6.0"
  },
  {
    emoji: "🚶‍♂️",
    aliases: ["walking_man"],
    tags: [],
    category: "People & Body",
    description: "man walking",
    unicode_version: "11.0"
  },
  {
    emoji: "🚶‍♀️",
    aliases: ["walking_woman"],
    tags: [],
    category: "People & Body",
    description: "woman walking",
    unicode_version: "6.0"
  },
  {
    emoji: "🧍",
    aliases: ["standing_person"],
    tags: [],
    category: "People & Body",
    description: "person standing",
    unicode_version: "12.0"
  },
  {
    emoji: "🧍‍♂️",
    aliases: ["standing_man"],
    tags: [],
    category: "People & Body",
    description: "man standing",
    unicode_version: "12.0"
  },
  {
    emoji: "🧍‍♀️",
    aliases: ["standing_woman"],
    tags: [],
    category: "People & Body",
    description: "woman standing",
    unicode_version: "12.0"
  },
  {
    emoji: "🧎",
    aliases: ["kneeling_person"],
    tags: [],
    category: "People & Body",
    description: "person kneeling",
    unicode_version: "12.0"
  },
  {
    emoji: "🧎‍♂️",
    aliases: ["kneeling_man"],
    tags: [],
    category: "People & Body",
    description: "man kneeling",
    unicode_version: "12.0"
  },
  {
    emoji: "🧎‍♀️",
    aliases: ["kneeling_woman"],
    tags: [],
    category: "People & Body",
    description: "woman kneeling",
    unicode_version: "12.0"
  },
  {
    emoji: "🧑‍🦯",
    aliases: ["person_with_probing_cane"],
    tags: [],
    category: "People & Body",
    description: "person with white cane",
    unicode_version: "12.1"
  },
  {
    emoji: "👨‍🦯",
    aliases: ["man_with_probing_cane"],
    tags: [],
    category: "People & Body",
    description: "man with white cane",
    unicode_version: "12.0"
  },
  {
    emoji: "👩‍🦯",
    aliases: ["woman_with_probing_cane"],
    tags: [],
    category: "People & Body",
    description: "woman with white cane",
    unicode_version: "12.0"
  },
  {
    emoji: "🧑‍🦼",
    aliases: ["person_in_motorized_wheelchair"],
    tags: [],
    category: "People & Body",
    description: "person in motorized wheelchair",
    unicode_version: "12.1"
  },
  {
    emoji: "👨‍🦼",
    aliases: ["man_in_motorized_wheelchair"],
    tags: [],
    category: "People & Body",
    description: "man in motorized wheelchair",
    unicode_version: "12.0"
  },
  {
    emoji: "👩‍🦼",
    aliases: ["woman_in_motorized_wheelchair"],
    tags: [],
    category: "People & Body",
    description: "woman in motorized wheelchair",
    unicode_version: "12.0"
  },
  {
    emoji: "🧑‍🦽",
    aliases: ["person_in_manual_wheelchair"],
    tags: [],
    category: "People & Body",
    description: "person in manual wheelchair",
    unicode_version: "12.1"
  },
  {
    emoji: "👨‍🦽",
    aliases: ["man_in_manual_wheelchair"],
    tags: [],
    category: "People & Body",
    description: "man in manual wheelchair",
    unicode_version: "12.0"
  },
  {
    emoji: "👩‍🦽",
    aliases: ["woman_in_manual_wheelchair"],
    tags: [],
    category: "People & Body",
    description: "woman in manual wheelchair",
    unicode_version: "12.0"
  },
  {
    emoji: "🏃",
    aliases: ["runner", "running"],
    tags: ["exercise", "workout", "marathon"],
    category: "People & Body",
    description: "person running",
    unicode_version: "6.0"
  },
  {
    emoji: "🏃‍♂️",
    aliases: ["running_man"],
    tags: ["exercise", "workout", "marathon"],
    category: "People & Body",
    description: "man running",
    unicode_version: "11.0"
  },
  {
    emoji: "🏃‍♀️",
    aliases: ["running_woman"],
    tags: ["exercise", "workout", "marathon"],
    category: "People & Body",
    description: "woman running",
    unicode_version: "6.0"
  },
  {
    emoji: "💃",
    aliases: ["woman_dancing", "dancer"],
    tags: ["dress"],
    category: "People & Body",
    description: "woman dancing",
    unicode_version: "6.0"
  },
  {
    emoji: "🕺",
    aliases: ["man_dancing"],
    tags: ["dancer"],
    category: "People & Body",
    description: "man dancing",
    unicode_version: "9.0"
  },
  {
    emoji: "🕴️",
    aliases: ["business_suit_levitating"],
    tags: [],
    category: "People & Body",
    description: "person in suit levitating",
    unicode_version: "7.0"
  },
  {
    emoji: "👯",
    aliases: ["dancers"],
    tags: ["bunny"],
    category: "People & Body",
    description: "people with bunny ears",
    unicode_version: "6.0"
  },
  {
    emoji: "👯‍♂️",
    aliases: ["dancing_men"],
    tags: ["bunny"],
    category: "People & Body",
    description: "men with bunny ears",
    unicode_version: "6.0"
  },
  {
    emoji: "👯‍♀️",
    aliases: ["dancing_women"],
    tags: ["bunny"],
    category: "People & Body",
    description: "women with bunny ears",
    unicode_version: "11.0"
  },
  {
    emoji: "🧖",
    aliases: ["sauna_person"],
    tags: ["steamy"],
    category: "People & Body",
    description: "person in steamy room",
    unicode_version: "11.0"
  },
  {
    emoji: "🧖‍♂️",
    aliases: ["sauna_man"],
    tags: ["steamy"],
    category: "People & Body",
    description: "man in steamy room",
    unicode_version: "11.0"
  },
  {
    emoji: "🧖‍♀️",
    aliases: ["sauna_woman"],
    tags: ["steamy"],
    category: "People & Body",
    description: "woman in steamy room",
    unicode_version: "11.0"
  },
  {
    emoji: "🧗",
    aliases: ["climbing"],
    tags: ["bouldering"],
    category: "People & Body",
    description: "person climbing",
    unicode_version: "11.0"
  },
  {
    emoji: "🧗‍♂️",
    aliases: ["climbing_man"],
    tags: ["bouldering"],
    category: "People & Body",
    description: "man climbing",
    unicode_version: "11.0"
  },
  {
    emoji: "🧗‍♀️",
    aliases: ["climbing_woman"],
    tags: ["bouldering"],
    category: "People & Body",
    description: "woman climbing",
    unicode_version: "11.0"
  },
  {
    emoji: "🤺",
    aliases: ["person_fencing"],
    tags: [],
    category: "People & Body",
    description: "person fencing",
    unicode_version: "9.0"
  },
  {
    emoji: "🏇",
    aliases: ["horse_racing"],
    tags: [],
    category: "People & Body",
    description: "horse racing",
    unicode_version: "6.0"
  },
  {
    emoji: "⛷️",
    aliases: ["skier"],
    tags: [],
    category: "People & Body",
    description: "skier",
    unicode_version: "5.2"
  },
  {
    emoji: "🏂",
    aliases: ["snowboarder"],
    tags: [],
    category: "People & Body",
    description: "snowboarder",
    unicode_version: "6.0"
  },
  {
    emoji: "🏌️",
    aliases: ["golfing"],
    tags: [],
    category: "People & Body",
    description: "person golfing",
    unicode_version: "7.0"
  },
  {
    emoji: "🏌️‍♂️",
    aliases: ["golfing_man"],
    tags: [],
    category: "People & Body",
    description: "man golfing",
    unicode_version: "11.0"
  },
  {
    emoji: "🏌️‍♀️",
    aliases: ["golfing_woman"],
    tags: [],
    category: "People & Body",
    description: "woman golfing",
    unicode_version: ""
  },
  {
    emoji: "🏄",
    aliases: ["surfer"],
    tags: [],
    category: "People & Body",
    description: "person surfing",
    unicode_version: "6.0"
  },
  {
    emoji: "🏄‍♂️",
    aliases: ["surfing_man"],
    tags: [],
    category: "People & Body",
    description: "man surfing",
    unicode_version: "11.0"
  },
  {
    emoji: "🏄‍♀️",
    aliases: ["surfing_woman"],
    tags: [],
    category: "People & Body",
    description: "woman surfing",
    unicode_version: "7.0"
  },
  {
    emoji: "🚣",
    aliases: ["rowboat"],
    tags: [],
    category: "People & Body",
    description: "person rowing boat",
    unicode_version: "6.0"
  },
  {
    emoji: "🚣‍♂️",
    aliases: ["rowing_man"],
    tags: [],
    category: "People & Body",
    description: "man rowing boat",
    unicode_version: "11.0"
  },
  {
    emoji: "🚣‍♀️",
    aliases: ["rowing_woman"],
    tags: [],
    category: "People & Body",
    description: "woman rowing boat",
    unicode_version: "6.0"
  },
  {
    emoji: "🏊",
    aliases: ["swimmer"],
    tags: [],
    category: "People & Body",
    description: "person swimming",
    unicode_version: "6.0"
  },
  {
    emoji: "🏊‍♂️",
    aliases: ["swimming_man"],
    tags: [],
    category: "People & Body",
    description: "man swimming",
    unicode_version: "11.0"
  },
  {
    emoji: "🏊‍♀️",
    aliases: ["swimming_woman"],
    tags: [],
    category: "People & Body",
    description: "woman swimming",
    unicode_version: "6.0"
  },
  {
    emoji: "⛹️",
    aliases: ["bouncing_ball_person"],
    tags: ["basketball"],
    category: "People & Body",
    description: "person bouncing ball",
    unicode_version: "5.2"
  },
  {
    emoji: "⛹️‍♂️",
    aliases: ["bouncing_ball_man", "basketball_man"],
    tags: [],
    category: "People & Body",
    description: "man bouncing ball",
    unicode_version: "11.0"
  },
  {
    emoji: "⛹️‍♀️",
    aliases: ["bouncing_ball_woman", "basketball_woman"],
    tags: [],
    category: "People & Body",
    description: "woman bouncing ball",
    unicode_version: "7.0"
  },
  {
    emoji: "🏋️",
    aliases: ["weight_lifting"],
    tags: ["gym", "workout"],
    category: "People & Body",
    description: "person lifting weights",
    unicode_version: "7.0"
  },
  {
    emoji: "🏋️‍♂️",
    aliases: ["weight_lifting_man"],
    tags: ["gym", "workout"],
    category: "People & Body",
    description: "man lifting weights",
    unicode_version: "11.0"
  },
  {
    emoji: "🏋️‍♀️",
    aliases: ["weight_lifting_woman"],
    tags: ["gym", "workout"],
    category: "People & Body",
    description: "woman lifting weights",
    unicode_version: "6.0"
  },
  {
    emoji: "🚴",
    aliases: ["bicyclist"],
    tags: [],
    category: "People & Body",
    description: "person biking",
    unicode_version: "6.0"
  },
  {
    emoji: "🚴‍♂️",
    aliases: ["biking_man"],
    tags: [],
    category: "People & Body",
    description: "man biking",
    unicode_version: "11.0"
  },
  {
    emoji: "🚴‍♀️",
    aliases: ["biking_woman"],
    tags: [],
    category: "People & Body",
    description: "woman biking",
    unicode_version: "6.0"
  },
  {
    emoji: "🚵",
    aliases: ["mountain_bicyclist"],
    tags: [],
    category: "People & Body",
    description: "person mountain biking",
    unicode_version: "6.0"
  },
  {
    emoji: "🚵‍♂️",
    aliases: ["mountain_biking_man"],
    tags: [],
    category: "People & Body",
    description: "man mountain biking",
    unicode_version: "11.0"
  },
  {
    emoji: "🚵‍♀️",
    aliases: ["mountain_biking_woman"],
    tags: [],
    category: "People & Body",
    description: "woman mountain biking",
    unicode_version: "6.0"
  },
  {
    emoji: "🤸",
    aliases: ["cartwheeling"],
    tags: [],
    category: "People & Body",
    description: "person cartwheeling",
    unicode_version: "11.0"
  },
  {
    emoji: "🤸‍♂️",
    aliases: ["man_cartwheeling"],
    tags: [],
    category: "People & Body",
    description: "man cartwheeling",
    unicode_version: ""
  },
  {
    emoji: "🤸‍♀️",
    aliases: ["woman_cartwheeling"],
    tags: [],
    category: "People & Body",
    description: "woman cartwheeling",
    unicode_version: ""
  },
  {
    emoji: "🤼",
    aliases: ["wrestling"],
    tags: [],
    category: "People & Body",
    description: "people wrestling",
    unicode_version: "11.0"
  },
  {
    emoji: "🤼‍♂️",
    aliases: ["men_wrestling"],
    tags: [],
    category: "People & Body",
    description: "men wrestling",
    unicode_version: "9.0"
  },
  {
    emoji: "🤼‍♀️",
    aliases: ["women_wrestling"],
    tags: [],
    category: "People & Body",
    description: "women wrestling",
    unicode_version: "9.0"
  },
  {
    emoji: "🤽",
    aliases: ["water_polo"],
    tags: [],
    category: "People & Body",
    description: "person playing water polo",
    unicode_version: "11.0"
  },
  {
    emoji: "🤽‍♂️",
    aliases: ["man_playing_water_polo"],
    tags: [],
    category: "People & Body",
    description: "man playing water polo",
    unicode_version: "9.0"
  },
  {
    emoji: "🤽‍♀️",
    aliases: ["woman_playing_water_polo"],
    tags: [],
    category: "People & Body",
    description: "woman playing water polo",
    unicode_version: "9.0"
  },
  {
    emoji: "🤾",
    aliases: ["handball_person"],
    tags: [],
    category: "People & Body",
    description: "person playing handball",
    unicode_version: "11.0"
  },
  {
    emoji: "🤾‍♂️",
    aliases: ["man_playing_handball"],
    tags: [],
    category: "People & Body",
    description: "man playing handball",
    unicode_version: "9.0"
  },
  {
    emoji: "🤾‍♀️",
    aliases: ["woman_playing_handball"],
    tags: [],
    category: "People & Body",
    description: "woman playing handball",
    unicode_version: "9.0"
  },
  {
    emoji: "🤹",
    aliases: ["juggling_person"],
    tags: [],
    category: "People & Body",
    description: "person juggling",
    unicode_version: "11.0"
  },
  {
    emoji: "🤹‍♂️",
    aliases: ["man_juggling"],
    tags: [],
    category: "People & Body",
    description: "man juggling",
    unicode_version: "9.0"
  },
  {
    emoji: "🤹‍♀️",
    aliases: ["woman_juggling"],
    tags: [],
    category: "People & Body",
    description: "woman juggling",
    unicode_version: "9.0"
  },
  {
    emoji: "🧘",
    aliases: ["lotus_position"],
    tags: ["meditation"],
    category: "People & Body",
    description: "person in lotus position",
    unicode_version: "11.0"
  },
  {
    emoji: "🧘‍♂️",
    aliases: ["lotus_position_man"],
    tags: ["meditation"],
    category: "People & Body",
    description: "man in lotus position",
    unicode_version: "11.0"
  },
  {
    emoji: "🧘‍♀️",
    aliases: ["lotus_position_woman"],
    tags: ["meditation"],
    category: "People & Body",
    description: "woman in lotus position",
    unicode_version: "11.0"
  },
  {
    emoji: "🛀",
    aliases: ["bath"],
    tags: ["shower"],
    category: "People & Body",
    description: "person taking bath",
    unicode_version: "6.0"
  },
  {
    emoji: "🛌",
    aliases: ["sleeping_bed"],
    tags: [],
    category: "People & Body",
    description: "person in bed",
    unicode_version: "7.0"
  },
  {
    emoji: "🧑‍🤝‍🧑",
    aliases: ["people_holding_hands"],
    tags: ["couple", "date"],
    category: "People & Body",
    description: "people holding hands",
    unicode_version: "12.0"
  },
  {
    emoji: "👭",
    aliases: ["two_women_holding_hands"],
    tags: ["couple", "date"],
    category: "People & Body",
    description: "women holding hands",
    unicode_version: "6.0"
  },
  {
    emoji: "👫",
    aliases: ["couple"],
    tags: ["date"],
    category: "People & Body",
    description: "woman and man holding hands",
    unicode_version: "6.0"
  },
  {
    emoji: "👬",
    aliases: ["two_men_holding_hands"],
    tags: ["couple", "date"],
    category: "People & Body",
    description: "men holding hands",
    unicode_version: "6.0"
  },
  {
    emoji: "💏",
    aliases: ["couplekiss"],
    tags: [],
    category: "People & Body",
    description: "kiss",
    unicode_version: "6.0"
  },
  {
    emoji: "👩‍❤️‍💋‍👨",
    aliases: ["couplekiss_man_woman"],
    tags: [],
    category: "People & Body",
    description: "kiss: woman, man",
    unicode_version: "11.0"
  },
  {
    emoji: "👨‍❤️‍💋‍👨",
    aliases: ["couplekiss_man_man"],
    tags: [],
    category: "People & Body",
    description: "kiss: man, man",
    unicode_version: "6.0"
  },
  {
    emoji: "👩‍❤️‍💋‍👩",
    aliases: ["couplekiss_woman_woman"],
    tags: [],
    category: "People & Body",
    description: "kiss: woman, woman",
    unicode_version: "6.0"
  },
  {
    emoji: "💑",
    aliases: ["couple_with_heart"],
    tags: [],
    category: "People & Body",
    description: "couple with heart",
    unicode_version: "6.0"
  },
  {
    emoji: "👩‍❤️‍👨",
    aliases: ["couple_with_heart_woman_man"],
    tags: [],
    category: "People & Body",
    description: "couple with heart: woman, man",
    unicode_version: "11.0"
  },
  {
    emoji: "👨‍❤️‍👨",
    aliases: ["couple_with_heart_man_man"],
    tags: [],
    category: "People & Body",
    description: "couple with heart: man, man",
    unicode_version: "6.0"
  },
  {
    emoji: "👩‍❤️‍👩",
    aliases: ["couple_with_heart_woman_woman"],
    tags: [],
    category: "People & Body",
    description: "couple with heart: woman, woman",
    unicode_version: "6.0"
  },
  {
    emoji: "👪",
    aliases: ["family"],
    tags: ["home", "parents", "child"],
    category: "People & Body",
    description: "family",
    unicode_version: "6.0"
  },
  {
    emoji: "👨‍👩‍👦",
    aliases: ["family_man_woman_boy"],
    tags: [],
    category: "People & Body",
    description: "family: man, woman, boy",
    unicode_version: "11.0"
  },
  {
    emoji: "👨‍👩‍👧",
    aliases: ["family_man_woman_girl"],
    tags: [],
    category: "People & Body",
    description: "family: man, woman, girl",
    unicode_version: "6.0"
  },
  {
    emoji: "👨‍👩‍👧‍👦",
    aliases: ["family_man_woman_girl_boy"],
    tags: [],
    category: "People & Body",
    description: "family: man, woman, girl, boy",
    unicode_version: "6.0"
  },
  {
    emoji: "👨‍👩‍👦‍👦",
    aliases: ["family_man_woman_boy_boy"],
    tags: [],
    category: "People & Body",
    description: "family: man, woman, boy, boy",
    unicode_version: "6.0"
  },
  {
    emoji: "👨‍👩‍👧‍👧",
    aliases: ["family_man_woman_girl_girl"],
    tags: [],
    category: "People & Body",
    description: "family: man, woman, girl, girl",
    unicode_version: "6.0"
  },
  {
    emoji: "👨‍👨‍👦",
    aliases: ["family_man_man_boy"],
    tags: [],
    category: "People & Body",
    description: "family: man, man, boy",
    unicode_version: "6.0"
  },
  {
    emoji: "👨‍👨‍👧",
    aliases: ["family_man_man_girl"],
    tags: [],
    category: "People & Body",
    description: "family: man, man, girl",
    unicode_version: "6.0"
  },
  {
    emoji: "👨‍👨‍👧‍👦",
    aliases: ["family_man_man_girl_boy"],
    tags: [],
    category: "People & Body",
    description: "family: man, man, girl, boy",
    unicode_version: "6.0"
  },
  {
    emoji: "👨‍👨‍👦‍👦",
    aliases: ["family_man_man_boy_boy"],
    tags: [],
    category: "People & Body",
    description: "family: man, man, boy, boy",
    unicode_version: "6.0"
  },
  {
    emoji: "👨‍👨‍👧‍👧",
    aliases: ["family_man_man_girl_girl"],
    tags: [],
    category: "People & Body",
    description: "family: man, man, girl, girl",
    unicode_version: "6.0"
  },
  {
    emoji: "👩‍👩‍👦",
    aliases: ["family_woman_woman_boy"],
    tags: [],
    category: "People & Body",
    description: "family: woman, woman, boy",
    unicode_version: "6.0"
  },
  {
    emoji: "👩‍👩‍👧",
    aliases: ["family_woman_woman_girl"],
    tags: [],
    category: "People & Body",
    description: "family: woman, woman, girl",
    unicode_version: "6.0"
  },
  {
    emoji: "👩‍👩‍👧‍👦",
    aliases: ["family_woman_woman_girl_boy"],
    tags: [],
    category: "People & Body",
    description: "family: woman, woman, girl, boy",
    unicode_version: "6.0"
  },
  {
    emoji: "👩‍👩‍👦‍👦",
    aliases: ["family_woman_woman_boy_boy"],
    tags: [],
    category: "People & Body",
    description: "family: woman, woman, boy, boy",
    unicode_version: "6.0"
  },
  {
    emoji: "👩‍👩‍👧‍👧",
    aliases: ["family_woman_woman_girl_girl"],
    tags: [],
    category: "People & Body",
    description: "family: woman, woman, girl, girl",
    unicode_version: "6.0"
  },
  {
    emoji: "👨‍👦",
    aliases: ["family_man_boy"],
    tags: [],
    category: "People & Body",
    description: "family: man, boy",
    unicode_version: "6.0"
  },
  {
    emoji: "👨‍👦‍👦",
    aliases: ["family_man_boy_boy"],
    tags: [],
    category: "People & Body",
    description: "family: man, boy, boy",
    unicode_version: "6.0"
  },
  {
    emoji: "👨‍👧",
    aliases: ["family_man_girl"],
    tags: [],
    category: "People & Body",
    description: "family: man, girl",
    unicode_version: "6.0"
  },
  {
    emoji: "👨‍👧‍👦",
    aliases: ["family_man_girl_boy"],
    tags: [],
    category: "People & Body",
    description: "family: man, girl, boy",
    unicode_version: "6.0"
  },
  {
    emoji: "👨‍👧‍👧",
    aliases: ["family_man_girl_girl"],
    tags: [],
    category: "People & Body",
    description: "family: man, girl, girl",
    unicode_version: "6.0"
  },
  {
    emoji: "👩‍👦",
    aliases: ["family_woman_boy"],
    tags: [],
    category: "People & Body",
    description: "family: woman, boy",
    unicode_version: "6.0"
  },
  {
    emoji: "👩‍👦‍👦",
    aliases: ["family_woman_boy_boy"],
    tags: [],
    category: "People & Body",
    description: "family: woman, boy, boy",
    unicode_version: "6.0"
  },
  {
    emoji: "👩‍👧",
    aliases: ["family_woman_girl"],
    tags: [],
    category: "People & Body",
    description: "family: woman, girl",
    unicode_version: "6.0"
  },
  {
    emoji: "👩‍👧‍👦",
    aliases: ["family_woman_girl_boy"],
    tags: [],
    category: "People & Body",
    description: "family: woman, girl, boy",
    unicode_version: "6.0"
  },
  {
    emoji: "👩‍👧‍👧",
    aliases: ["family_woman_girl_girl"],
    tags: [],
    category: "People & Body",
    description: "family: woman, girl, girl",
    unicode_version: "6.0"
  },
  {
    emoji: "🗣️",
    aliases: ["speaking_head"],
    tags: [],
    category: "People & Body",
    description: "speaking head",
    unicode_version: "7.0"
  },
  {
    emoji: "👤",
    aliases: ["bust_in_silhouette"],
    tags: ["user"],
    category: "People & Body",
    description: "bust in silhouette",
    unicode_version: "6.0"
  },
  {
    emoji: "👥",
    aliases: ["busts_in_silhouette"],
    tags: ["users", "group", "team"],
    category: "People & Body",
    description: "busts in silhouette",
    unicode_version: "6.0"
  },
  {
    emoji: "🫂",
    aliases: ["people_hugging"],
    tags: [],
    category: "People & Body",
    description: "people hugging",
    unicode_version: "13.0"
  },
  {
    emoji: "👣",
    aliases: ["footprints"],
    tags: ["feet", "tracks"],
    category: "People & Body",
    description: "footprints",
    unicode_version: "6.0"
  },
  {
    emoji: "🐵",
    aliases: ["monkey_face"],
    tags: [],
    category: "Animals & Nature",
    description: "monkey face",
    unicode_version: "6.0"
  },
  {
    emoji: "🐒",
    aliases: ["monkey"],
    tags: [],
    category: "Animals & Nature",
    description: "monkey",
    unicode_version: "6.0"
  },
  {
    emoji: "🦍",
    aliases: ["gorilla"],
    tags: [],
    category: "Animals & Nature",
    description: "gorilla",
    unicode_version: "9.0"
  },
  {
    emoji: "🦧",
    aliases: ["orangutan"],
    tags: [],
    category: "Animals & Nature",
    description: "orangutan",
    unicode_version: "12.0"
  },
  {
    emoji: "🐶",
    aliases: ["dog"],
    tags: ["pet"],
    category: "Animals & Nature",
    description: "dog face",
    unicode_version: "6.0"
  },
  {
    emoji: "🐕",
    aliases: ["dog2"],
    tags: [],
    category: "Animals & Nature",
    description: "dog",
    unicode_version: "6.0"
  },
  {
    emoji: "🦮",
    aliases: ["guide_dog"],
    tags: [],
    category: "Animals & Nature",
    description: "guide dog",
    unicode_version: "12.0"
  },
  {
    emoji: "🐕‍🦺",
    aliases: ["service_dog"],
    tags: [],
    category: "Animals & Nature",
    description: "service dog",
    unicode_version: "12.0"
  },
  {
    emoji: "🐩",
    aliases: ["poodle"],
    tags: ["dog"],
    category: "Animals & Nature",
    description: "poodle",
    unicode_version: "6.0"
  },
  {
    emoji: "🐺",
    aliases: ["wolf"],
    tags: [],
    category: "Animals & Nature",
    description: "wolf",
    unicode_version: "6.0"
  },
  {
    emoji: "🦊",
    aliases: ["fox_face"],
    tags: [],
    category: "Animals & Nature",
    description: "fox",
    unicode_version: "9.0"
  },
  {
    emoji: "🦝",
    aliases: ["raccoon"],
    tags: [],
    category: "Animals & Nature",
    description: "raccoon",
    unicode_version: "11.0"
  },
  {
    emoji: "🐱",
    aliases: ["cat"],
    tags: ["pet"],
    category: "Animals & Nature",
    description: "cat face",
    unicode_version: "6.0"
  },
  {
    emoji: "🐈",
    aliases: ["cat2"],
    tags: [],
    category: "Animals & Nature",
    description: "cat",
    unicode_version: "6.0"
  },
  {
    emoji: "🐈‍⬛",
    aliases: ["black_cat"],
    tags: [],
    category: "Animals & Nature",
    description: "black cat",
    unicode_version: "13.0"
  },
  {
    emoji: "🦁",
    aliases: ["lion"],
    tags: [],
    category: "Animals & Nature",
    description: "lion",
    unicode_version: "8.0"
  },
  {
    emoji: "🐯",
    aliases: ["tiger"],
    tags: [],
    category: "Animals & Nature",
    description: "tiger face",
    unicode_version: "6.0"
  },
  {
    emoji: "🐅",
    aliases: ["tiger2"],
    tags: [],
    category: "Animals & Nature",
    description: "tiger",
    unicode_version: "6.0"
  },
  {
    emoji: "🐆",
    aliases: ["leopard"],
    tags: [],
    category: "Animals & Nature",
    description: "leopard",
    unicode_version: "6.0"
  },
  {
    emoji: "🐴",
    aliases: ["horse"],
    tags: [],
    category: "Animals & Nature",
    description: "horse face",
    unicode_version: "6.0"
  },
  {
    emoji: "🐎",
    aliases: ["racehorse"],
    tags: ["speed"],
    category: "Animals & Nature",
    description: "horse",
    unicode_version: "6.0"
  },
  {
    emoji: "🦄",
    aliases: ["unicorn"],
    tags: [],
    category: "Animals & Nature",
    description: "unicorn",
    unicode_version: "8.0"
  },
  {
    emoji: "🦓",
    aliases: ["zebra"],
    tags: [],
    category: "Animals & Nature",
    description: "zebra",
    unicode_version: "11.0"
  },
  {
    emoji: "🦌",
    aliases: ["deer"],
    tags: [],
    category: "Animals & Nature",
    description: "deer",
    unicode_version: "9.0"
  },
  {
    emoji: "🦬",
    aliases: ["bison"],
    tags: [],
    category: "Animals & Nature",
    description: "bison",
    unicode_version: "13.0"
  },
  {
    emoji: "🐮",
    aliases: ["cow"],
    tags: [],
    category: "Animals & Nature",
    description: "cow face",
    unicode_version: "6.0"
  },
  {
    emoji: "🐂",
    aliases: ["ox"],
    tags: [],
    category: "Animals & Nature",
    description: "ox",
    unicode_version: "6.0"
  },
  {
    emoji: "🐃",
    aliases: ["water_buffalo"],
    tags: [],
    category: "Animals & Nature",
    description: "water buffalo",
    unicode_version: "6.0"
  },
  {
    emoji: "🐄",
    aliases: ["cow2"],
    tags: [],
    category: "Animals & Nature",
    description: "cow",
    unicode_version: "6.0"
  },
  {
    emoji: "🐷",
    aliases: ["pig"],
    tags: [],
    category: "Animals & Nature",
    description: "pig face",
    unicode_version: "6.0"
  },
  {
    emoji: "🐖",
    aliases: ["pig2"],
    tags: [],
    category: "Animals & Nature",
    description: "pig",
    unicode_version: "6.0"
  },
  {
    emoji: "🐗",
    aliases: ["boar"],
    tags: [],
    category: "Animals & Nature",
    description: "boar",
    unicode_version: "6.0"
  },
  {
    emoji: "🐽",
    aliases: ["pig_nose"],
    tags: [],
    category: "Animals & Nature",
    description: "pig nose",
    unicode_version: "6.0"
  },
  {
    emoji: "🐏",
    aliases: ["ram"],
    tags: [],
    category: "Animals & Nature",
    description: "ram",
    unicode_version: "6.0"
  },
  {
    emoji: "🐑",
    aliases: ["sheep"],
    tags: [],
    category: "Animals & Nature",
    description: "ewe",
    unicode_version: "6.0"
  },
  {
    emoji: "🐐",
    aliases: ["goat"],
    tags: [],
    category: "Animals & Nature",
    description: "goat",
    unicode_version: "6.0"
  },
  {
    emoji: "🐪",
    aliases: ["dromedary_camel"],
    tags: ["desert"],
    category: "Animals & Nature",
    description: "camel",
    unicode_version: "6.0"
  },
  {
    emoji: "🐫",
    aliases: ["camel"],
    tags: [],
    category: "Animals & Nature",
    description: "two-hump camel",
    unicode_version: "6.0"
  },
  {
    emoji: "🦙",
    aliases: ["llama"],
    tags: [],
    category: "Animals & Nature",
    description: "llama",
    unicode_version: "11.0"
  },
  {
    emoji: "🦒",
    aliases: ["giraffe"],
    tags: [],
    category: "Animals & Nature",
    description: "giraffe",
    unicode_version: "11.0"
  },
  {
    emoji: "🐘",
    aliases: ["elephant"],
    tags: [],
    category: "Animals & Nature",
    description: "elephant",
    unicode_version: "6.0"
  },
  {
    emoji: "🦣",
    aliases: ["mammoth"],
    tags: [],
    category: "Animals & Nature",
    description: "mammoth",
    unicode_version: "13.0"
  },
  {
    emoji: "🦏",
    aliases: ["rhinoceros"],
    tags: [],
    category: "Animals & Nature",
    description: "rhinoceros",
    unicode_version: "9.0"
  },
  {
    emoji: "🦛",
    aliases: ["hippopotamus"],
    tags: [],
    category: "Animals & Nature",
    description: "hippopotamus",
    unicode_version: "11.0"
  },
  {
    emoji: "🐭",
    aliases: ["mouse"],
    tags: [],
    category: "Animals & Nature",
    description: "mouse face",
    unicode_version: "6.0"
  },
  {
    emoji: "🐁",
    aliases: ["mouse2"],
    tags: [],
    category: "Animals & Nature",
    description: "mouse",
    unicode_version: "6.0"
  },
  {
    emoji: "🐀",
    aliases: ["rat"],
    tags: [],
    category: "Animals & Nature",
    description: "rat",
    unicode_version: "6.0"
  },
  {
    emoji: "🐹",
    aliases: ["hamster"],
    tags: ["pet"],
    category: "Animals & Nature",
    description: "hamster",
    unicode_version: "6.0"
  },
  {
    emoji: "🐰",
    aliases: ["rabbit"],
    tags: ["bunny"],
    category: "Animals & Nature",
    description: "rabbit face",
    unicode_version: "6.0"
  },
  {
    emoji: "🐇",
    aliases: ["rabbit2"],
    tags: [],
    category: "Animals & Nature",
    description: "rabbit",
    unicode_version: "6.0"
  },
  {
    emoji: "🐿️",
    aliases: ["chipmunk"],
    tags: [],
    category: "Animals & Nature",
    description: "chipmunk",
    unicode_version: "7.0"
  },
  {
    emoji: "🦫",
    aliases: ["beaver"],
    tags: [],
    category: "Animals & Nature",
    description: "beaver",
    unicode_version: "13.0"
  },
  {
    emoji: "🦔",
    aliases: ["hedgehog"],
    tags: [],
    category: "Animals & Nature",
    description: "hedgehog",
    unicode_version: "11.0"
  },
  {
    emoji: "🦇",
    aliases: ["bat"],
    tags: [],
    category: "Animals & Nature",
    description: "bat",
    unicode_version: "9.0"
  },
  {
    emoji: "🐻",
    aliases: ["bear"],
    tags: [],
    category: "Animals & Nature",
    description: "bear",
    unicode_version: "6.0"
  },
  {
    emoji: "🐻‍❄️",
    aliases: ["polar_bear"],
    tags: [],
    category: "Animals & Nature",
    description: "polar bear",
    unicode_version: "13.0"
  },
  {
    emoji: "🐨",
    aliases: ["koala"],
    tags: [],
    category: "Animals & Nature",
    description: "koala",
    unicode_version: "6.0"
  },
  {
    emoji: "🐼",
    aliases: ["panda_face"],
    tags: [],
    category: "Animals & Nature",
    description: "panda",
    unicode_version: "6.0"
  },
  {
    emoji: "🦥",
    aliases: ["sloth"],
    tags: [],
    category: "Animals & Nature",
    description: "sloth",
    unicode_version: "12.0"
  },
  {
    emoji: "🦦",
    aliases: ["otter"],
    tags: [],
    category: "Animals & Nature",
    description: "otter",
    unicode_version: "12.0"
  },
  {
    emoji: "🦨",
    aliases: ["skunk"],
    tags: [],
    category: "Animals & Nature",
    description: "skunk",
    unicode_version: "12.0"
  },
  {
    emoji: "🦘",
    aliases: ["kangaroo"],
    tags: [],
    category: "Animals & Nature",
    description: "kangaroo",
    unicode_version: "11.0"
  },
  {
    emoji: "🦡",
    aliases: ["badger"],
    tags: [],
    category: "Animals & Nature",
    description: "badger",
    unicode_version: "11.0"
  },
  {
    emoji: "🐾",
    aliases: ["feet", "paw_prints"],
    tags: [],
    category: "Animals & Nature",
    description: "paw prints",
    unicode_version: "6.0"
  },
  {
    emoji: "🦃",
    aliases: ["turkey"],
    tags: ["thanksgiving"],
    category: "Animals & Nature",
    description: "turkey",
    unicode_version: "8.0"
  },
  {
    emoji: "🐔",
    aliases: ["chicken"],
    tags: [],
    category: "Animals & Nature",
    description: "chicken",
    unicode_version: "6.0"
  },
  {
    emoji: "🐓",
    aliases: ["rooster"],
    tags: [],
    category: "Animals & Nature",
    description: "rooster",
    unicode_version: "6.0"
  },
  {
    emoji: "🐣",
    aliases: ["hatching_chick"],
    tags: [],
    category: "Animals & Nature",
    description: "hatching chick",
    unicode_version: "6.0"
  },
  {
    emoji: "🐤",
    aliases: ["baby_chick"],
    tags: [],
    category: "Animals & Nature",
    description: "baby chick",
    unicode_version: "6.0"
  },
  {
    emoji: "🐥",
    aliases: ["hatched_chick"],
    tags: [],
    category: "Animals & Nature",
    description: "front-facing baby chick",
    unicode_version: "6.0"
  },
  {
    emoji: "🐦",
    aliases: ["bird"],
    tags: [],
    category: "Animals & Nature",
    description: "bird",
    unicode_version: "6.0"
  },
  {
    emoji: "🐧",
    aliases: ["penguin"],
    tags: [],
    category: "Animals & Nature",
    description: "penguin",
    unicode_version: "6.0"
  },
  {
    emoji: "🕊️",
    aliases: ["dove"],
    tags: ["peace"],
    category: "Animals & Nature",
    description: "dove",
    unicode_version: "7.0"
  },
  {
    emoji: "🦅",
    aliases: ["eagle"],
    tags: [],
    category: "Animals & Nature",
    description: "eagle",
    unicode_version: "9.0"
  },
  {
    emoji: "🦆",
    aliases: ["duck"],
    tags: [],
    category: "Animals & Nature",
    description: "duck",
    unicode_version: "9.0"
  },
  {
    emoji: "🦢",
    aliases: ["swan"],
    tags: [],
    category: "Animals & Nature",
    description: "swan",
    unicode_version: "11.0"
  },
  {
    emoji: "🦉",
    aliases: ["owl"],
    tags: [],
    category: "Animals & Nature",
    description: "owl",
    unicode_version: "9.0"
  },
  {
    emoji: "🦤",
    aliases: ["dodo"],
    tags: [],
    category: "Animals & Nature",
    description: "dodo",
    unicode_version: "13.0"
  },
  {
    emoji: "🪶",
    aliases: ["feather"],
    tags: [],
    category: "Animals & Nature",
    description: "feather",
    unicode_version: "13.0"
  },
  {
    emoji: "🦩",
    aliases: ["flamingo"],
    tags: [],
    category: "Animals & Nature",
    description: "flamingo",
    unicode_version: "12.0"
  },
  {
    emoji: "🦚",
    aliases: ["peacock"],
    tags: [],
    category: "Animals & Nature",
    description: "peacock",
    unicode_version: "11.0"
  },
  {
    emoji: "🦜",
    aliases: ["parrot"],
    tags: [],
    category: "Animals & Nature",
    description: "parrot",
    unicode_version: "11.0"
  },
  {
    emoji: "🐸",
    aliases: ["frog"],
    tags: [],
    category: "Animals & Nature",
    description: "frog",
    unicode_version: "6.0"
  },
  {
    emoji: "🐊",
    aliases: ["crocodile"],
    tags: [],
    category: "Animals & Nature",
    description: "crocodile",
    unicode_version: "6.0"
  },
  {
    emoji: "🐢",
    aliases: ["turtle"],
    tags: ["slow"],
    category: "Animals & Nature",
    description: "turtle",
    unicode_version: "6.0"
  },
  {
    emoji: "🦎",
    aliases: ["lizard"],
    tags: [],
    category: "Animals & Nature",
    description: "lizard",
    unicode_version: "9.0"
  },
  {
    emoji: "🐍",
    aliases: ["snake"],
    tags: [],
    category: "Animals & Nature",
    description: "snake",
    unicode_version: "6.0"
  },
  {
    emoji: "🐲",
    aliases: ["dragon_face"],
    tags: [],
    category: "Animals & Nature",
    description: "dragon face",
    unicode_version: "6.0"
  },
  {
    emoji: "🐉",
    aliases: ["dragon"],
    tags: [],
    category: "Animals & Nature",
    description: "dragon",
    unicode_version: "6.0"
  },
  {
    emoji: "🦕",
    aliases: ["sauropod"],
    tags: ["dinosaur"],
    category: "Animals & Nature",
    description: "sauropod",
    unicode_version: "11.0"
  },
  {
    emoji: "🦖",
    aliases: ["t-rex"],
    tags: ["dinosaur"],
    category: "Animals & Nature",
    description: "T-Rex",
    unicode_version: "11.0"
  },
  {
    emoji: "🐳",
    aliases: ["whale"],
    tags: ["sea"],
    category: "Animals & Nature",
    description: "spouting whale",
    unicode_version: "6.0"
  },
  {
    emoji: "🐋",
    aliases: ["whale2"],
    tags: [],
    category: "Animals & Nature",
    description: "whale",
    unicode_version: "6.0"
  },
  {
    emoji: "🐬",
    aliases: ["dolphin", "flipper"],
    tags: [],
    category: "Animals & Nature",
    description: "dolphin",
    unicode_version: "6.0"
  },
  {
    emoji: "🦭",
    aliases: ["seal"],
    tags: [],
    category: "Animals & Nature",
    description: "seal",
    unicode_version: "13.0"
  },
  {
    emoji: "🐟",
    aliases: ["fish"],
    tags: [],
    category: "Animals & Nature",
    description: "fish",
    unicode_version: "6.0"
  },
  {
    emoji: "🐠",
    aliases: ["tropical_fish"],
    tags: [],
    category: "Animals & Nature",
    description: "tropical fish",
    unicode_version: "6.0"
  },
  {
    emoji: "🐡",
    aliases: ["blowfish"],
    tags: [],
    category: "Animals & Nature",
    description: "blowfish",
    unicode_version: "6.0"
  },
  {
    emoji: "🦈",
    aliases: ["shark"],
    tags: [],
    category: "Animals & Nature",
    description: "shark",
    unicode_version: "9.0"
  },
  {
    emoji: "🐙",
    aliases: ["octopus"],
    tags: [],
    category: "Animals & Nature",
    description: "octopus",
    unicode_version: "6.0"
  },
  {
    emoji: "🐚",
    aliases: ["shell"],
    tags: ["sea", "beach"],
    category: "Animals & Nature",
    description: "spiral shell",
    unicode_version: "6.0"
  },
  {
    emoji: "🐌",
    aliases: ["snail"],
    tags: ["slow"],
    category: "Animals & Nature",
    description: "snail",
    unicode_version: "6.0"
  },
  {
    emoji: "🦋",
    aliases: ["butterfly"],
    tags: [],
    category: "Animals & Nature",
    description: "butterfly",
    unicode_version: "9.0"
  },
  {
    emoji: "🐛",
    aliases: ["bug"],
    tags: [],
    category: "Animals & Nature",
    description: "bug",
    unicode_version: "6.0"
  },
  {
    emoji: "🐜",
    aliases: ["ant"],
    tags: [],
    category: "Animals & Nature",
    description: "ant",
    unicode_version: "6.0"
  },
  {
    emoji: "🐝",
    aliases: ["bee", "honeybee"],
    tags: [],
    category: "Animals & Nature",
    description: "honeybee",
    unicode_version: "6.0"
  },
  {
    emoji: "🪲",
    aliases: ["beetle"],
    tags: [],
    category: "Animals & Nature",
    description: "beetle",
    unicode_version: "13.0"
  },
  {
    emoji: "🐞",
    aliases: ["lady_beetle"],
    tags: ["bug"],
    category: "Animals & Nature",
    description: "lady beetle",
    unicode_version: "6.0"
  },
  {
    emoji: "🦗",
    aliases: ["cricket"],
    tags: [],
    category: "Animals & Nature",
    description: "cricket",
    unicode_version: "11.0"
  },
  {
    emoji: "🪳",
    aliases: ["cockroach"],
    tags: [],
    category: "Animals & Nature",
    description: "cockroach",
    unicode_version: "13.0"
  },
  {
    emoji: "🕷️",
    aliases: ["spider"],
    tags: [],
    category: "Animals & Nature",
    description: "spider",
    unicode_version: "7.0"
  },
  {
    emoji: "🕸️",
    aliases: ["spider_web"],
    tags: [],
    category: "Animals & Nature",
    description: "spider web",
    unicode_version: "7.0"
  },
  {
    emoji: "🦂",
    aliases: ["scorpion"],
    tags: [],
    category: "Animals & Nature",
    description: "scorpion",
    unicode_version: "8.0"
  },
  {
    emoji: "🦟",
    aliases: ["mosquito"],
    tags: [],
    category: "Animals & Nature",
    description: "mosquito",
    unicode_version: "11.0"
  },
  {
    emoji: "🪰",
    aliases: ["fly"],
    tags: [],
    category: "Animals & Nature",
    description: "fly",
    unicode_version: "13.0"
  },
  {
    emoji: "🪱",
    aliases: ["worm"],
    tags: [],
    category: "Animals & Nature",
    description: "worm",
    unicode_version: "13.0"
  },
  {
    emoji: "🦠",
    aliases: ["microbe"],
    tags: ["germ"],
    category: "Animals & Nature",
    description: "microbe",
    unicode_version: "11.0"
  },
  {
    emoji: "💐",
    aliases: ["bouquet"],
    tags: ["flowers"],
    category: "Animals & Nature",
    description: "bouquet",
    unicode_version: "6.0"
  },
  {
    emoji: "🌸",
    aliases: ["cherry_blossom"],
    tags: ["flower", "spring"],
    category: "Animals & Nature",
    description: "cherry blossom",
    unicode_version: "6.0"
  },
  {
    emoji: "💮",
    aliases: ["white_flower"],
    tags: [],
    category: "Animals & Nature",
    description: "white flower",
    unicode_version: "6.0"
  },
  {
    emoji: "🏵️",
    aliases: ["rosette"],
    tags: [],
    category: "Animals & Nature",
    description: "rosette",
    unicode_version: "7.0"
  },
  {
    emoji: "🌹",
    aliases: ["rose"],
    tags: ["flower"],
    category: "Animals & Nature",
    description: "rose",
    unicode_version: "6.0"
  },
  {
    emoji: "🥀",
    aliases: ["wilted_flower"],
    tags: [],
    category: "Animals & Nature",
    description: "wilted flower",
    unicode_version: "9.0"
  },
  {
    emoji: "🌺",
    aliases: ["hibiscus"],
    tags: [],
    category: "Animals & Nature",
    description: "hibiscus",
    unicode_version: "6.0"
  },
  {
    emoji: "🌻",
    aliases: ["sunflower"],
    tags: [],
    category: "Animals & Nature",
    description: "sunflower",
    unicode_version: "6.0"
  },
  {
    emoji: "🌼",
    aliases: ["blossom"],
    tags: [],
    category: "Animals & Nature",
    description: "blossom",
    unicode_version: "6.0"
  },
  {
    emoji: "🌷",
    aliases: ["tulip"],
    tags: ["flower"],
    category: "Animals & Nature",
    description: "tulip",
    unicode_version: "6.0"
  },
  {
    emoji: "🌱",
    aliases: ["seedling"],
    tags: ["plant"],
    category: "Animals & Nature",
    description: "seedling",
    unicode_version: "6.0"
  },
  {
    emoji: "🪴",
    aliases: ["potted_plant"],
    tags: [],
    category: "Animals & Nature",
    description: "potted plant",
    unicode_version: "13.0"
  },
  {
    emoji: "🌲",
    aliases: ["evergreen_tree"],
    tags: ["wood"],
    category: "Animals & Nature",
    description: "evergreen tree",
    unicode_version: "6.0"
  },
  {
    emoji: "🌳",
    aliases: ["deciduous_tree"],
    tags: ["wood"],
    category: "Animals & Nature",
    description: "deciduous tree",
    unicode_version: "6.0"
  },
  {
    emoji: "🌴",
    aliases: ["palm_tree"],
    tags: [],
    category: "Animals & Nature",
    description: "palm tree",
    unicode_version: "6.0"
  },
  {
    emoji: "🌵",
    aliases: ["cactus"],
    tags: [],
    category: "Animals & Nature",
    description: "cactus",
    unicode_version: "6.0"
  },
  {
    emoji: "🌾",
    aliases: ["ear_of_rice"],
    tags: [],
    category: "Animals & Nature",
    description: "sheaf of rice",
    unicode_version: "6.0"
  },
  {
    emoji: "🌿",
    aliases: ["herb"],
    tags: [],
    category: "Animals & Nature",
    description: "herb",
    unicode_version: "6.0"
  },
  {
    emoji: "☘️",
    aliases: ["shamrock"],
    tags: [],
    category: "Animals & Nature",
    description: "shamrock",
    unicode_version: "4.1"
  },
  {
    emoji: "🍀",
    aliases: ["four_leaf_clover"],
    tags: ["luck"],
    category: "Animals & Nature",
    description: "four leaf clover",
    unicode_version: "6.0"
  },
  {
    emoji: "🍁",
    aliases: ["maple_leaf"],
    tags: ["canada"],
    category: "Animals & Nature",
    description: "maple leaf",
    unicode_version: "6.0"
  },
  {
    emoji: "🍂",
    aliases: ["fallen_leaf"],
    tags: ["autumn"],
    category: "Animals & Nature",
    description: "fallen leaf",
    unicode_version: "6.0"
  },
  {
    emoji: "🍃",
    aliases: ["leaves"],
    tags: ["leaf"],
    category: "Animals & Nature",
    description: "leaf fluttering in wind",
    unicode_version: "6.0"
  },
  {
    emoji: "🍇",
    aliases: ["grapes"],
    tags: [],
    category: "Food & Drink",
    description: "grapes",
    unicode_version: "6.0"
  },
  {
    emoji: "🍈",
    aliases: ["melon"],
    tags: [],
    category: "Food & Drink",
    description: "melon",
    unicode_version: "6.0"
  },
  {
    emoji: "🍉",
    aliases: ["watermelon"],
    tags: [],
    category: "Food & Drink",
    description: "watermelon",
    unicode_version: "6.0"
  },
  {
    emoji: "🍊",
    aliases: ["tangerine", "orange", "mandarin"],
    tags: [],
    category: "Food & Drink",
    description: "tangerine",
    unicode_version: "6.0"
  },
  {
    emoji: "🍋",
    aliases: ["lemon"],
    tags: [],
    category: "Food & Drink",
    description: "lemon",
    unicode_version: "6.0"
  },
  {
    emoji: "🍌",
    aliases: ["banana"],
    tags: ["fruit"],
    category: "Food & Drink",
    description: "banana",
    unicode_version: "6.0"
  },
  {
    emoji: "🍍",
    aliases: ["pineapple"],
    tags: [],
    category: "Food & Drink",
    description: "pineapple",
    unicode_version: "6.0"
  },
  {
    emoji: "🥭",
    aliases: ["mango"],
    tags: [],
    category: "Food & Drink",
    description: "mango",
    unicode_version: "11.0"
  },
  {
    emoji: "🍎",
    aliases: ["apple"],
    tags: [],
    category: "Food & Drink",
    description: "red apple",
    unicode_version: "6.0"
  },
  {
    emoji: "🍏",
    aliases: ["green_apple"],
    tags: ["fruit"],
    category: "Food & Drink",
    description: "green apple",
    unicode_version: "6.0"
  },
  {
    emoji: "🍐",
    aliases: ["pear"],
    tags: [],
    category: "Food & Drink",
    description: "pear",
    unicode_version: "6.0"
  },
  {
    emoji: "🍑",
    aliases: ["peach"],
    tags: [],
    category: "Food & Drink",
    description: "peach",
    unicode_version: "6.0"
  },
  {
    emoji: "🍒",
    aliases: ["cherries"],
    tags: ["fruit"],
    category: "Food & Drink",
    description: "cherries",
    unicode_version: "6.0"
  },
  {
    emoji: "🍓",
    aliases: ["strawberry"],
    tags: ["fruit"],
    category: "Food & Drink",
    description: "strawberry",
    unicode_version: "6.0"
  },
  {
    emoji: "🫐",
    aliases: ["blueberries"],
    tags: [],
    category: "Food & Drink",
    description: "blueberries",
    unicode_version: "13.0"
  },
  {
    emoji: "🥝",
    aliases: ["kiwi_fruit"],
    tags: [],
    category: "Food & Drink",
    description: "kiwi fruit",
    unicode_version: "9.0"
  },
  {
    emoji: "🍅",
    aliases: ["tomato"],
    tags: [],
    category: "Food & Drink",
    description: "tomato",
    unicode_version: "6.0"
  },
  {
    emoji: "🫒",
    aliases: ["olive"],
    tags: [],
    category: "Food & Drink",
    description: "olive",
    unicode_version: "13.0"
  },
  {
    emoji: "🥥",
    aliases: ["coconut"],
    tags: [],
    category: "Food & Drink",
    description: "coconut",
    unicode_version: "11.0"
  },
  {
    emoji: "🥑",
    aliases: ["avocado"],
    tags: [],
    category: "Food & Drink",
    description: "avocado",
    unicode_version: "9.0"
  },
  {
    emoji: "🍆",
    aliases: ["eggplant"],
    tags: ["aubergine"],
    category: "Food & Drink",
    description: "eggplant",
    unicode_version: "6.0"
  },
  {
    emoji: "🥔",
    aliases: ["potato"],
    tags: [],
    category: "Food & Drink",
    description: "potato",
    unicode_version: "9.0"
  },
  {
    emoji: "🥕",
    aliases: ["carrot"],
    tags: [],
    category: "Food & Drink",
    description: "carrot",
    unicode_version: "9.0"
  },
  {
    emoji: "🌽",
    aliases: ["corn"],
    tags: [],
    category: "Food & Drink",
    description: "ear of corn",
    unicode_version: "6.0"
  },
  {
    emoji: "🌶️",
    aliases: ["hot_pepper"],
    tags: ["spicy"],
    category: "Food & Drink",
    description: "hot pepper",
    unicode_version: "7.0"
  },
  {
    emoji: "🫑",
    aliases: ["bell_pepper"],
    tags: [],
    category: "Food & Drink",
    description: "bell pepper",
    unicode_version: "13.0"
  },
  {
    emoji: "🥒",
    aliases: ["cucumber"],
    tags: [],
    category: "Food & Drink",
    description: "cucumber",
    unicode_version: "9.0"
  },
  {
    emoji: "🥬",
    aliases: ["leafy_green"],
    tags: [],
    category: "Food & Drink",
    description: "leafy green",
    unicode_version: "11.0"
  },
  {
    emoji: "🥦",
    aliases: ["broccoli"],
    tags: [],
    category: "Food & Drink",
    description: "broccoli",
    unicode_version: "11.0"
  },
  {
    emoji: "🧄",
    aliases: ["garlic"],
    tags: [],
    category: "Food & Drink",
    description: "garlic",
    unicode_version: "12.0"
  },
  {
    emoji: "🧅",
    aliases: ["onion"],
    tags: [],
    category: "Food & Drink",
    description: "onion",
    unicode_version: "12.0"
  },
  {
    emoji: "🍄",
    aliases: ["mushroom"],
    tags: [],
    category: "Food & Drink",
    description: "mushroom",
    unicode_version: "6.0"
  },
  {
    emoji: "🥜",
    aliases: ["peanuts"],
    tags: [],
    category: "Food & Drink",
    description: "peanuts",
    unicode_version: "9.0"
  },
  {
    emoji: "🌰",
    aliases: ["chestnut"],
    tags: [],
    category: "Food & Drink",
    description: "chestnut",
    unicode_version: "6.0"
  },
  {
    emoji: "🍞",
    aliases: ["bread"],
    tags: ["toast"],
    category: "Food & Drink",
    description: "bread",
    unicode_version: "6.0"
  },
  {
    emoji: "🥐",
    aliases: ["croissant"],
    tags: [],
    category: "Food & Drink",
    description: "croissant",
    unicode_version: "9.0"
  },
  {
    emoji: "🥖",
    aliases: ["baguette_bread"],
    tags: [],
    category: "Food & Drink",
    description: "baguette bread",
    unicode_version: "9.0"
  },
  {
    emoji: "🫓",
    aliases: ["flatbread"],
    tags: [],
    category: "Food & Drink",
    description: "flatbread",
    unicode_version: "13.0"
  },
  {
    emoji: "🥨",
    aliases: ["pretzel"],
    tags: [],
    category: "Food & Drink",
    description: "pretzel",
    unicode_version: "11.0"
  },
  {
    emoji: "🥯",
    aliases: ["bagel"],
    tags: [],
    category: "Food & Drink",
    description: "bagel",
    unicode_version: "11.0"
  },
  {
    emoji: "🥞",
    aliases: ["pancakes"],
    tags: [],
    category: "Food & Drink",
    description: "pancakes",
    unicode_version: "9.0"
  },
  {
    emoji: "🧇",
    aliases: ["waffle"],
    tags: [],
    category: "Food & Drink",
    description: "waffle",
    unicode_version: "12.0"
  },
  {
    emoji: "🧀",
    aliases: ["cheese"],
    tags: [],
    category: "Food & Drink",
    description: "cheese wedge",
    unicode_version: "8.0"
  },
  {
    emoji: "🍖",
    aliases: ["meat_on_bone"],
    tags: [],
    category: "Food & Drink",
    description: "meat on bone",
    unicode_version: "6.0"
  },
  {
    emoji: "🍗",
    aliases: ["poultry_leg"],
    tags: ["meat", "chicken"],
    category: "Food & Drink",
    description: "poultry leg",
    unicode_version: "6.0"
  },
  {
    emoji: "🥩",
    aliases: ["cut_of_meat"],
    tags: [],
    category: "Food & Drink",
    description: "cut of meat",
    unicode_version: "11.0"
  },
  {
    emoji: "🥓",
    aliases: ["bacon"],
    tags: [],
    category: "Food & Drink",
    description: "bacon",
    unicode_version: "9.0"
  },
  {
    emoji: "🍔",
    aliases: ["hamburger"],
    tags: ["burger"],
    category: "Food & Drink",
    description: "hamburger",
    unicode_version: "6.0"
  },
  {
    emoji: "🍟",
    aliases: ["fries"],
    tags: [],
    category: "Food & Drink",
    description: "french fries",
    unicode_version: "6.0"
  },
  {
    emoji: "🍕",
    aliases: ["pizza"],
    tags: [],
    category: "Food & Drink",
    description: "pizza",
    unicode_version: "6.0"
  },
  {
    emoji: "🌭",
    aliases: ["hotdog"],
    tags: [],
    category: "Food & Drink",
    description: "hot dog",
    unicode_version: "8.0"
  },
  {
    emoji: "🥪",
    aliases: ["sandwich"],
    tags: [],
    category: "Food & Drink",
    description: "sandwich",
    unicode_version: "11.0"
  },
  {
    emoji: "🌮",
    aliases: ["taco"],
    tags: [],
    category: "Food & Drink",
    description: "taco",
    unicode_version: "8.0"
  },
  {
    emoji: "🌯",
    aliases: ["burrito"],
    tags: [],
    category: "Food & Drink",
    description: "burrito",
    unicode_version: "8.0"
  },
  {
    emoji: "🫔",
    aliases: ["tamale"],
    tags: [],
    category: "Food & Drink",
    description: "tamale",
    unicode_version: "13.0"
  },
  {
    emoji: "🥙",
    aliases: ["stuffed_flatbread"],
    tags: [],
    category: "Food & Drink",
    description: "stuffed flatbread",
    unicode_version: "9.0"
  },
  {
    emoji: "🧆",
    aliases: ["falafel"],
    tags: [],
    category: "Food & Drink",
    description: "falafel",
    unicode_version: "12.0"
  },
  {
    emoji: "🥚",
    aliases: ["egg"],
    tags: [],
    category: "Food & Drink",
    description: "egg",
    unicode_version: "9.0"
  },
  {
    emoji: "🍳",
    aliases: ["fried_egg"],
    tags: ["breakfast"],
    category: "Food & Drink",
    description: "cooking",
    unicode_version: "6.0"
  },
  {
    emoji: "🥘",
    aliases: ["shallow_pan_of_food"],
    tags: ["paella", "curry"],
    category: "Food & Drink",
    description: "shallow pan of food",
    unicode_version: ""
  },
  {
    emoji: "🍲",
    aliases: ["stew"],
    tags: [],
    category: "Food & Drink",
    description: "pot of food",
    unicode_version: "6.0"
  },
  {
    emoji: "🫕",
    aliases: ["fondue"],
    tags: [],
    category: "Food & Drink",
    description: "fondue",
    unicode_version: "13.0"
  },
  {
    emoji: "🥣",
    aliases: ["bowl_with_spoon"],
    tags: [],
    category: "Food & Drink",
    description: "bowl with spoon",
    unicode_version: "11.0"
  },
  {
    emoji: "🥗",
    aliases: ["green_salad"],
    tags: [],
    category: "Food & Drink",
    description: "green salad",
    unicode_version: "9.0"
  },
  {
    emoji: "🍿",
    aliases: ["popcorn"],
    tags: [],
    category: "Food & Drink",
    description: "popcorn",
    unicode_version: "8.0"
  },
  {
    emoji: "🧈",
    aliases: ["butter"],
    tags: [],
    category: "Food & Drink",
    description: "butter",
    unicode_version: "12.0"
  },
  {
    emoji: "🧂",
    aliases: ["salt"],
    tags: [],
    category: "Food & Drink",
    description: "salt",
    unicode_version: "11.0"
  },
  {
    emoji: "🥫",
    aliases: ["canned_food"],
    tags: [],
    category: "Food & Drink",
    description: "canned food",
    unicode_version: "11.0"
  },
  {
    emoji: "🍱",
    aliases: ["bento"],
    tags: [],
    category: "Food & Drink",
    description: "bento box",
    unicode_version: "6.0"
  },
  {
    emoji: "🍘",
    aliases: ["rice_cracker"],
    tags: [],
    category: "Food & Drink",
    description: "rice cracker",
    unicode_version: "6.0"
  },
  {
    emoji: "🍙",
    aliases: ["rice_ball"],
    tags: [],
    category: "Food & Drink",
    description: "rice ball",
    unicode_version: "6.0"
  },
  {
    emoji: "🍚",
    aliases: ["rice"],
    tags: [],
    category: "Food & Drink",
    description: "cooked rice",
    unicode_version: "6.0"
  },
  {
    emoji: "🍛",
    aliases: ["curry"],
    tags: [],
    category: "Food & Drink",
    description: "curry rice",
    unicode_version: "6.0"
  },
  {
    emoji: "🍜",
    aliases: ["ramen"],
    tags: ["noodle"],
    category: "Food & Drink",
    description: "steaming bowl",
    unicode_version: "6.0"
  },
  {
    emoji: "🍝",
    aliases: ["spaghetti"],
    tags: ["pasta"],
    category: "Food & Drink",
    description: "spaghetti",
    unicode_version: "6.0"
  },
  {
    emoji: "🍠",
    aliases: ["sweet_potato"],
    tags: [],
    category: "Food & Drink",
    description: "roasted sweet potato",
    unicode_version: "6.0"
  },
  {
    emoji: "🍢",
    aliases: ["oden"],
    tags: [],
    category: "Food & Drink",
    description: "oden",
    unicode_version: "6.0"
  },
  {
    emoji: "🍣",
    aliases: ["sushi"],
    tags: [],
    category: "Food & Drink",
    description: "sushi",
    unicode_version: "6.0"
  },
  {
    emoji: "🍤",
    aliases: ["fried_shrimp"],
    tags: ["tempura"],
    category: "Food & Drink",
    description: "fried shrimp",
    unicode_version: "6.0"
  },
  {
    emoji: "🍥",
    aliases: ["fish_cake"],
    tags: [],
    category: "Food & Drink",
    description: "fish cake with swirl",
    unicode_version: "6.0"
  },
  {
    emoji: "🥮",
    aliases: ["moon_cake"],
    tags: [],
    category: "Food & Drink",
    description: "moon cake",
    unicode_version: "11.0"
  },
  {
    emoji: "🍡",
    aliases: ["dango"],
    tags: [],
    category: "Food & Drink",
    description: "dango",
    unicode_version: "6.0"
  },
  {
    emoji: "🥟",
    aliases: ["dumpling"],
    tags: [],
    category: "Food & Drink",
    description: "dumpling",
    unicode_version: "11.0"
  },
  {
    emoji: "🥠",
    aliases: ["fortune_cookie"],
    tags: [],
    category: "Food & Drink",
    description: "fortune cookie",
    unicode_version: "11.0"
  },
  {
    emoji: "🥡",
    aliases: ["takeout_box"],
    tags: [],
    category: "Food & Drink",
    description: "takeout box",
    unicode_version: "11.0"
  },
  {
    emoji: "🦀",
    aliases: ["crab"],
    tags: [],
    category: "Food & Drink",
    description: "crab",
    unicode_version: "8.0"
  },
  {
    emoji: "🦞",
    aliases: ["lobster"],
    tags: [],
    category: "Food & Drink",
    description: "lobster",
    unicode_version: "11.0"
  },
  {
    emoji: "🦐",
    aliases: ["shrimp"],
    tags: [],
    category: "Food & Drink",
    description: "shrimp",
    unicode_version: "9.0"
  },
  {
    emoji: "🦑",
    aliases: ["squid"],
    tags: [],
    category: "Food & Drink",
    description: "squid",
    unicode_version: "9.0"
  },
  {
    emoji: "🦪",
    aliases: ["oyster"],
    tags: [],
    category: "Food & Drink",
    description: "oyster",
    unicode_version: "12.0"
  },
  {
    emoji: "🍦",
    aliases: ["icecream"],
    tags: [],
    category: "Food & Drink",
    description: "soft ice cream",
    unicode_version: "6.0"
  },
  {
    emoji: "🍧",
    aliases: ["shaved_ice"],
    tags: [],
    category: "Food & Drink",
    description: "shaved ice",
    unicode_version: "6.0"
  },
  {
    emoji: "🍨",
    aliases: ["ice_cream"],
    tags: [],
    category: "Food & Drink",
    description: "ice cream",
    unicode_version: "6.0"
  },
  {
    emoji: "🍩",
    aliases: ["doughnut"],
    tags: [],
    category: "Food & Drink",
    description: "doughnut",
    unicode_version: "6.0"
  },
  {
    emoji: "🍪",
    aliases: ["cookie"],
    tags: [],
    category: "Food & Drink",
    description: "cookie",
    unicode_version: "6.0"
  },
  {
    emoji: "🎂",
    aliases: ["birthday"],
    tags: ["party"],
    category: "Food & Drink",
    description: "birthday cake",
    unicode_version: "6.0"
  },
  {
    emoji: "🍰",
    aliases: ["cake"],
    tags: ["dessert"],
    category: "Food & Drink",
    description: "shortcake",
    unicode_version: "6.0"
  },
  {
    emoji: "🧁",
    aliases: ["cupcake"],
    tags: [],
    category: "Food & Drink",
    description: "cupcake",
    unicode_version: "11.0"
  },
  {
    emoji: "🥧",
    aliases: ["pie"],
    tags: [],
    category: "Food & Drink",
    description: "pie",
    unicode_version: "11.0"
  },
  {
    emoji: "🍫",
    aliases: ["chocolate_bar"],
    tags: [],
    category: "Food & Drink",
    description: "chocolate bar",
    unicode_version: "6.0"
  },
  {
    emoji: "🍬",
    aliases: ["candy"],
    tags: ["sweet"],
    category: "Food & Drink",
    description: "candy",
    unicode_version: "6.0"
  },
  {
    emoji: "🍭",
    aliases: ["lollipop"],
    tags: [],
    category: "Food & Drink",
    description: "lollipop",
    unicode_version: "6.0"
  },
  {
    emoji: "🍮",
    aliases: ["custard"],
    tags: [],
    category: "Food & Drink",
    description: "custard",
    unicode_version: "6.0"
  },
  {
    emoji: "🍯",
    aliases: ["honey_pot"],
    tags: [],
    category: "Food & Drink",
    description: "honey pot",
    unicode_version: "6.0"
  },
  {
    emoji: "🍼",
    aliases: ["baby_bottle"],
    tags: ["milk"],
    category: "Food & Drink",
    description: "baby bottle",
    unicode_version: "6.0"
  },
  {
    emoji: "🥛",
    aliases: ["milk_glass"],
    tags: [],
    category: "Food & Drink",
    description: "glass of milk",
    unicode_version: "9.0"
  },
  {
    emoji: "☕",
    aliases: ["coffee"],
    tags: ["cafe", "espresso"],
    category: "Food & Drink",
    description: "hot beverage",
    unicode_version: "4.0"
  },
  {
    emoji: "🫖",
    aliases: ["teapot"],
    tags: [],
    category: "Food & Drink",
    description: "teapot",
    unicode_version: "13.0"
  },
  {
    emoji: "🍵",
    aliases: ["tea"],
    tags: ["green", "breakfast"],
    category: "Food & Drink",
    description: "teacup without handle",
    unicode_version: "6.0"
  },
  {
    emoji: "🍶",
    aliases: ["sake"],
    tags: [],
    category: "Food & Drink",
    description: "sake",
    unicode_version: "6.0"
  },
  {
    emoji: "🍾",
    aliases: ["champagne"],
    tags: ["bottle", "bubbly", "celebration"],
    category: "Food & Drink",
    description: "bottle with popping cork",
    unicode_version: "8.0"
  },
  {
    emoji: "🍷",
    aliases: ["wine_glass"],
    tags: [],
    category: "Food & Drink",
    description: "wine glass",
    unicode_version: "6.0"
  },
  {
    emoji: "🍸",
    aliases: ["cocktail"],
    tags: ["drink"],
    category: "Food & Drink",
    description: "cocktail glass",
    unicode_version: "6.0"
  },
  {
    emoji: "🍹",
    aliases: ["tropical_drink"],
    tags: ["summer", "vacation"],
    category: "Food & Drink",
    description: "tropical drink",
    unicode_version: "6.0"
  },
  {
    emoji: "🍺",
    aliases: ["beer"],
    tags: ["drink"],
    category: "Food & Drink",
    description: "beer mug",
    unicode_version: "6.0"
  },
  {
    emoji: "🍻",
    aliases: ["beers"],
    tags: ["drinks"],
    category: "Food & Drink",
    description: "clinking beer mugs",
    unicode_version: "6.0"
  },
  {
    emoji: "🥂",
    aliases: ["clinking_glasses"],
    tags: ["cheers", "toast"],
    category: "Food & Drink",
    description: "clinking glasses",
    unicode_version: "9.0"
  },
  {
    emoji: "🥃",
    aliases: ["tumbler_glass"],
    tags: ["whisky"],
    category: "Food & Drink",
    description: "tumbler glass",
    unicode_version: "9.0"
  },
  {
    emoji: "🥤",
    aliases: ["cup_with_straw"],
    tags: [],
    category: "Food & Drink",
    description: "cup with straw",
    unicode_version: "11.0"
  },
  {
    emoji: "🧋",
    aliases: ["bubble_tea"],
    tags: [],
    category: "Food & Drink",
    description: "bubble tea",
    unicode_version: "13.0"
  },
  {
    emoji: "🧃",
    aliases: ["beverage_box"],
    tags: [],
    category: "Food & Drink",
    description: "beverage box",
    unicode_version: "12.0"
  },
  {
    emoji: "🧉",
    aliases: ["mate"],
    tags: [],
    category: "Food & Drink",
    description: "mate",
    unicode_version: "12.0"
  },
  {
    emoji: "🧊",
    aliases: ["ice_cube"],
    tags: [],
    category: "Food & Drink",
    description: "ice",
    unicode_version: "12.0"
  },
  {
    emoji: "🥢",
    aliases: ["chopsticks"],
    tags: [],
    category: "Food & Drink",
    description: "chopsticks",
    unicode_version: "11.0"
  },
  {
    emoji: "🍽️",
    aliases: ["plate_with_cutlery"],
    tags: ["dining", "dinner"],
    category: "Food & Drink",
    description: "fork and knife with plate",
    unicode_version: "7.0"
  },
  {
    emoji: "🍴",
    aliases: ["fork_and_knife"],
    tags: ["cutlery"],
    category: "Food & Drink",
    description: "fork and knife",
    unicode_version: "6.0"
  },
  {
    emoji: "🥄",
    aliases: ["spoon"],
    tags: [],
    category: "Food & Drink",
    description: "spoon",
    unicode_version: "9.0"
  },
  {
    emoji: "🔪",
    aliases: ["hocho", "knife"],
    tags: ["cut", "chop"],
    category: "Food & Drink",
    description: "kitchen knife",
    unicode_version: "6.0"
  },
  {
    emoji: "🏺",
    aliases: ["amphora"],
    tags: [],
    category: "Food & Drink",
    description: "amphora",
    unicode_version: "8.0"
  },
  {
    emoji: "🌍",
    aliases: ["earth_africa"],
    tags: ["globe", "world", "international"],
    category: "Travel & Places",
    description: "globe showing Europe-Africa",
    unicode_version: "6.0"
  },
  {
    emoji: "🌎",
    aliases: ["earth_americas"],
    tags: ["globe", "world", "international"],
    category: "Travel & Places",
    description: "globe showing Americas",
    unicode_version: "6.0"
  },
  {
    emoji: "🌏",
    aliases: ["earth_asia"],
    tags: ["globe", "world", "international"],
    category: "Travel & Places",
    description: "globe showing Asia-Australia",
    unicode_version: "6.0"
  },
  {
    emoji: "🌐",
    aliases: ["globe_with_meridians"],
    tags: ["world", "global", "international"],
    category: "Travel & Places",
    description: "globe with meridians",
    unicode_version: "6.0"
  },
  {
    emoji: "🗺️",
    aliases: ["world_map"],
    tags: ["travel"],
    category: "Travel & Places",
    description: "world map",
    unicode_version: "7.0"
  },
  {
    emoji: "🗾",
    aliases: ["japan"],
    tags: [],
    category: "Travel & Places",
    description: "map of Japan",
    unicode_version: "6.0"
  },
  {
    emoji: "🧭",
    aliases: ["compass"],
    tags: [],
    category: "Travel & Places",
    description: "compass",
    unicode_version: "11.0"
  },
  {
    emoji: "🏔️",
    aliases: ["mountain_snow"],
    tags: [],
    category: "Travel & Places",
    description: "snow-capped mountain",
    unicode_version: "7.0"
  },
  {
    emoji: "⛰️",
    aliases: ["mountain"],
    tags: [],
    category: "Travel & Places",
    description: "mountain",
    unicode_version: "5.2"
  },
  {
    emoji: "🌋",
    aliases: ["volcano"],
    tags: [],
    category: "Travel & Places",
    description: "volcano",
    unicode_version: "6.0"
  },
  {
    emoji: "🗻",
    aliases: ["mount_fuji"],
    tags: [],
    category: "Travel & Places",
    description: "mount fuji",
    unicode_version: "6.0"
  },
  {
    emoji: "🏕️",
    aliases: ["camping"],
    tags: [],
    category: "Travel & Places",
    description: "camping",
    unicode_version: "7.0"
  },
  {
    emoji: "🏖️",
    aliases: ["beach_umbrella"],
    tags: [],
    category: "Travel & Places",
    description: "beach with umbrella",
    unicode_version: "7.0"
  },
  {
    emoji: "🏜️",
    aliases: ["desert"],
    tags: [],
    category: "Travel & Places",
    description: "desert",
    unicode_version: "7.0"
  },
  {
    emoji: "🏝️",
    aliases: ["desert_island"],
    tags: [],
    category: "Travel & Places",
    description: "desert island",
    unicode_version: "7.0"
  },
  {
    emoji: "🏞️",
    aliases: ["national_park"],
    tags: [],
    category: "Travel & Places",
    description: "national park",
    unicode_version: "7.0"
  },
  {
    emoji: "🏟️",
    aliases: ["stadium"],
    tags: [],
    category: "Travel & Places",
    description: "stadium",
    unicode_version: "7.0"
  },
  {
    emoji: "🏛️",
    aliases: ["classical_building"],
    tags: [],
    category: "Travel & Places",
    description: "classical building",
    unicode_version: "7.0"
  },
  {
    emoji: "🏗️",
    aliases: ["building_construction"],
    tags: [],
    category: "Travel & Places",
    description: "building construction",
    unicode_version: "7.0"
  },
  {
    emoji: "🧱",
    aliases: ["bricks"],
    tags: [],
    category: "Travel & Places",
    description: "brick",
    unicode_version: "11.0"
  },
  {
    emoji: "🪨",
    aliases: ["rock"],
    tags: [],
    category: "Travel & Places",
    description: "rock",
    unicode_version: "13.0"
  },
  {
    emoji: "🪵",
    aliases: ["wood"],
    tags: [],
    category: "Travel & Places",
    description: "wood",
    unicode_version: "13.0"
  },
  {
    emoji: "🛖",
    aliases: ["hut"],
    tags: [],
    category: "Travel & Places",
    description: "hut",
    unicode_version: "13.0"
  },
  {
    emoji: "🏘️",
    aliases: ["houses"],
    tags: [],
    category: "Travel & Places",
    description: "houses",
    unicode_version: "7.0"
  },
  {
    emoji: "🏚️",
    aliases: ["derelict_house"],
    tags: [],
    category: "Travel & Places",
    description: "derelict house",
    unicode_version: "7.0"
  },
  {
    emoji: "🏠",
    aliases: ["house"],
    tags: [],
    category: "Travel & Places",
    description: "house",
    unicode_version: "6.0"
  },
  {
    emoji: "🏡",
    aliases: ["house_with_garden"],
    tags: [],
    category: "Travel & Places",
    description: "house with garden",
    unicode_version: "6.0"
  },
  {
    emoji: "🏢",
    aliases: ["office"],
    tags: [],
    category: "Travel & Places",
    description: "office building",
    unicode_version: "6.0"
  },
  {
    emoji: "🏣",
    aliases: ["post_office"],
    tags: [],
    category: "Travel & Places",
    description: "Japanese post office",
    unicode_version: "6.0"
  },
  {
    emoji: "🏤",
    aliases: ["european_post_office"],
    tags: [],
    category: "Travel & Places",
    description: "post office",
    unicode_version: "6.0"
  },
  {
    emoji: "🏥",
    aliases: ["hospital"],
    tags: [],
    category: "Travel & Places",
    description: "hospital",
    unicode_version: "6.0"
  },
  {
    emoji: "🏦",
    aliases: ["bank"],
    tags: [],
    category: "Travel & Places",
    description: "bank",
    unicode_version: "6.0"
  },
  {
    emoji: "🏨",
    aliases: ["hotel"],
    tags: [],
    category: "Travel & Places",
    description: "hotel",
    unicode_version: "6.0"
  },
  {
    emoji: "🏩",
    aliases: ["love_hotel"],
    tags: [],
    category: "Travel & Places",
    description: "love hotel",
    unicode_version: "6.0"
  },
  {
    emoji: "🏪",
    aliases: ["convenience_store"],
    tags: [],
    category: "Travel & Places",
    description: "convenience store",
    unicode_version: "6.0"
  },
  {
    emoji: "🏫",
    aliases: ["school"],
    tags: [],
    category: "Travel & Places",
    description: "school",
    unicode_version: "6.0"
  },
  {
    emoji: "🏬",
    aliases: ["department_store"],
    tags: [],
    category: "Travel & Places",
    description: "department store",
    unicode_version: "6.0"
  },
  {
    emoji: "🏭",
    aliases: ["factory"],
    tags: [],
    category: "Travel & Places",
    description: "factory",
    unicode_version: "6.0"
  },
  {
    emoji: "🏯",
    aliases: ["japanese_castle"],
    tags: [],
    category: "Travel & Places",
    description: "Japanese castle",
    unicode_version: "6.0"
  },
  {
    emoji: "🏰",
    aliases: ["european_castle"],
    tags: [],
    category: "Travel & Places",
    description: "castle",
    unicode_version: "6.0"
  },
  {
    emoji: "💒",
    aliases: ["wedding"],
    tags: ["marriage"],
    category: "Travel & Places",
    description: "wedding",
    unicode_version: "6.0"
  },
  {
    emoji: "🗼",
    aliases: ["tokyo_tower"],
    tags: [],
    category: "Travel & Places",
    description: "Tokyo tower",
    unicode_version: "6.0"
  },
  {
    emoji: "🗽",
    aliases: ["statue_of_liberty"],
    tags: [],
    category: "Travel & Places",
    description: "Statue of Liberty",
    unicode_version: "6.0"
  },
  {
    emoji: "⛪",
    aliases: ["church"],
    tags: [],
    category: "Travel & Places",
    description: "church",
    unicode_version: "5.2"
  },
  {
    emoji: "🕌",
    aliases: ["mosque"],
    tags: [],
    category: "Travel & Places",
    description: "mosque",
    unicode_version: "8.0"
  },
  {
    emoji: "🛕",
    aliases: ["hindu_temple"],
    tags: [],
    category: "Travel & Places",
    description: "hindu temple",
    unicode_version: "12.0"
  },
  {
    emoji: "🕍",
    aliases: ["synagogue"],
    tags: [],
    category: "Travel & Places",
    description: "synagogue",
    unicode_version: "8.0"
  },
  {
    emoji: "⛩️",
    aliases: ["shinto_shrine"],
    tags: [],
    category: "Travel & Places",
    description: "shinto shrine",
    unicode_version: "5.2"
  },
  {
    emoji: "🕋",
    aliases: ["kaaba"],
    tags: [],
    category: "Travel & Places",
    description: "kaaba",
    unicode_version: "8.0"
  },
  {
    emoji: "⛲",
    aliases: ["fountain"],
    tags: [],
    category: "Travel & Places",
    description: "fountain",
    unicode_version: "5.2"
  },
  {
    emoji: "⛺",
    aliases: ["tent"],
    tags: ["camping"],
    category: "Travel & Places",
    description: "tent",
    unicode_version: "5.2"
  },
  {
    emoji: "🌁",
    aliases: ["foggy"],
    tags: ["karl"],
    category: "Travel & Places",
    description: "foggy",
    unicode_version: "6.0"
  },
  {
    emoji: "🌃",
    aliases: ["night_with_stars"],
    tags: [],
    category: "Travel & Places",
    description: "night with stars",
    unicode_version: "6.0"
  },
  {
    emoji: "🏙️",
    aliases: ["cityscape"],
    tags: ["skyline"],
    category: "Travel & Places",
    description: "cityscape",
    unicode_version: "7.0"
  },
  {
    emoji: "🌄",
    aliases: ["sunrise_over_mountains"],
    tags: [],
    category: "Travel & Places",
    description: "sunrise over mountains",
    unicode_version: "6.0"
  },
  {
    emoji: "🌅",
    aliases: ["sunrise"],
    tags: [],
    category: "Travel & Places",
    description: "sunrise",
    unicode_version: "6.0"
  },
  {
    emoji: "🌆",
    aliases: ["city_sunset"],
    tags: [],
    category: "Travel & Places",
    description: "cityscape at dusk",
    unicode_version: "6.0"
  },
  {
    emoji: "🌇",
    aliases: ["city_sunrise"],
    tags: [],
    category: "Travel & Places",
    description: "sunset",
    unicode_version: "6.0"
  },
  {
    emoji: "🌉",
    aliases: ["bridge_at_night"],
    tags: [],
    category: "Travel & Places",
    description: "bridge at night",
    unicode_version: "6.0"
  },
  {
    emoji: "♨️",
    aliases: ["hotsprings"],
    tags: [],
    category: "Travel & Places",
    description: "hot springs",
    unicode_version: ""
  },
  {
    emoji: "🎠",
    aliases: ["carousel_horse"],
    tags: [],
    category: "Travel & Places",
    description: "carousel horse",
    unicode_version: "6.0"
  },
  {
    emoji: "🎡",
    aliases: ["ferris_wheel"],
    tags: [],
    category: "Travel & Places",
    description: "ferris wheel",
    unicode_version: "6.0"
  },
  {
    emoji: "🎢",
    aliases: ["roller_coaster"],
    tags: [],
    category: "Travel & Places",
    description: "roller coaster",
    unicode_version: "6.0"
  },
  {
    emoji: "💈",
    aliases: ["barber"],
    tags: [],
    category: "Travel & Places",
    description: "barber pole",
    unicode_version: "6.0"
  },
  {
    emoji: "🎪",
    aliases: ["circus_tent"],
    tags: [],
    category: "Travel & Places",
    description: "circus tent",
    unicode_version: "6.0"
  },
  {
    emoji: "🚂",
    aliases: ["steam_locomotive"],
    tags: ["train"],
    category: "Travel & Places",
    description: "locomotive",
    unicode_version: "6.0"
  },
  {
    emoji: "🚃",
    aliases: ["railway_car"],
    tags: [],
    category: "Travel & Places",
    description: "railway car",
    unicode_version: "6.0"
  },
  {
    emoji: "🚄",
    aliases: ["bullettrain_side"],
    tags: ["train"],
    category: "Travel & Places",
    description: "high-speed train",
    unicode_version: "6.0"
  },
  {
    emoji: "🚅",
    aliases: ["bullettrain_front"],
    tags: ["train"],
    category: "Travel & Places",
    description: "bullet train",
    unicode_version: "6.0"
  },
  {
    emoji: "🚆",
    aliases: ["train2"],
    tags: [],
    category: "Travel & Places",
    description: "train",
    unicode_version: "6.0"
  },
  {
    emoji: "🚇",
    aliases: ["metro"],
    tags: [],
    category: "Travel & Places",
    description: "metro",
    unicode_version: "6.0"
  },
  {
    emoji: "🚈",
    aliases: ["light_rail"],
    tags: [],
    category: "Travel & Places",
    description: "light rail",
    unicode_version: "6.0"
  },
  {
    emoji: "🚉",
    aliases: ["station"],
    tags: [],
    category: "Travel & Places",
    description: "station",
    unicode_version: "6.0"
  },
  {
    emoji: "🚊",
    aliases: ["tram"],
    tags: [],
    category: "Travel & Places",
    description: "tram",
    unicode_version: "6.0"
  },
  {
    emoji: "🚝",
    aliases: ["monorail"],
    tags: [],
    category: "Travel & Places",
    description: "monorail",
    unicode_version: "6.0"
  },
  {
    emoji: "🚞",
    aliases: ["mountain_railway"],
    tags: [],
    category: "Travel & Places",
    description: "mountain railway",
    unicode_version: "6.0"
  },
  {
    emoji: "🚋",
    aliases: ["train"],
    tags: [],
    category: "Travel & Places",
    description: "tram car",
    unicode_version: "6.0"
  },
  {
    emoji: "🚌",
    aliases: ["bus"],
    tags: [],
    category: "Travel & Places",
    description: "bus",
    unicode_version: "6.0"
  },
  {
    emoji: "🚍",
    aliases: ["oncoming_bus"],
    tags: [],
    category: "Travel & Places",
    description: "oncoming bus",
    unicode_version: "6.0"
  },
  {
    emoji: "🚎",
    aliases: ["trolleybus"],
    tags: [],
    category: "Travel & Places",
    description: "trolleybus",
    unicode_version: "6.0"
  },
  {
    emoji: "🚐",
    aliases: ["minibus"],
    tags: [],
    category: "Travel & Places",
    description: "minibus",
    unicode_version: "6.0"
  },
  {
    emoji: "🚑",
    aliases: ["ambulance"],
    tags: [],
    category: "Travel & Places",
    description: "ambulance",
    unicode_version: "6.0"
  },
  {
    emoji: "🚒",
    aliases: ["fire_engine"],
    tags: [],
    category: "Travel & Places",
    description: "fire engine",
    unicode_version: "6.0"
  },
  {
    emoji: "🚓",
    aliases: ["police_car"],
    tags: [],
    category: "Travel & Places",
    description: "police car",
    unicode_version: "6.0"
  },
  {
    emoji: "🚔",
    aliases: ["oncoming_police_car"],
    tags: [],
    category: "Travel & Places",
    description: "oncoming police car",
    unicode_version: "6.0"
  },
  {
    emoji: "🚕",
    aliases: ["taxi"],
    tags: [],
    category: "Travel & Places",
    description: "taxi",
    unicode_version: "6.0"
  },
  {
    emoji: "🚖",
    aliases: ["oncoming_taxi"],
    tags: [],
    category: "Travel & Places",
    description: "oncoming taxi",
    unicode_version: "6.0"
  },
  {
    emoji: "🚗",
    aliases: ["car", "red_car"],
    tags: [],
    category: "Travel & Places",
    description: "automobile",
    unicode_version: "6.0"
  },
  {
    emoji: "🚘",
    aliases: ["oncoming_automobile"],
    tags: [],
    category: "Travel & Places",
    description: "oncoming automobile",
    unicode_version: "6.0"
  },
  {
    emoji: "🚙",
    aliases: ["blue_car"],
    tags: [],
    category: "Travel & Places",
    description: "sport utility vehicle",
    unicode_version: "6.0"
  },
  {
    emoji: "🛻",
    aliases: ["pickup_truck"],
    tags: [],
    category: "Travel & Places",
    description: "pickup truck",
    unicode_version: "13.0"
  },
  {
    emoji: "🚚",
    aliases: ["truck"],
    tags: [],
    category: "Travel & Places",
    description: "delivery truck",
    unicode_version: "6.0"
  },
  {
    emoji: "🚛",
    aliases: ["articulated_lorry"],
    tags: [],
    category: "Travel & Places",
    description: "articulated lorry",
    unicode_version: "6.0"
  },
  {
    emoji: "🚜",
    aliases: ["tractor"],
    tags: [],
    category: "Travel & Places",
    description: "tractor",
    unicode_version: "6.0"
  },
  {
    emoji: "🏎️",
    aliases: ["racing_car"],
    tags: [],
    category: "Travel & Places",
    description: "racing car",
    unicode_version: "7.0"
  },
  {
    emoji: "🏍️",
    aliases: ["motorcycle"],
    tags: [],
    category: "Travel & Places",
    description: "motorcycle",
    unicode_version: "7.0"
  },
  {
    emoji: "🛵",
    aliases: ["motor_scooter"],
    tags: [],
    category: "Travel & Places",
    description: "motor scooter",
    unicode_version: "9.0"
  },
  {
    emoji: "🦽",
    aliases: ["manual_wheelchair"],
    tags: [],
    category: "Travel & Places",
    description: "manual wheelchair",
    unicode_version: "12.0"
  },
  {
    emoji: "🦼",
    aliases: ["motorized_wheelchair"],
    tags: [],
    category: "Travel & Places",
    description: "motorized wheelchair",
    unicode_version: "12.0"
  },
  {
    emoji: "🛺",
    aliases: ["auto_rickshaw"],
    tags: [],
    category: "Travel & Places",
    description: "auto rickshaw",
    unicode_version: "12.0"
  },
  {
    emoji: "🚲",
    aliases: ["bike"],
    tags: ["bicycle"],
    category: "Travel & Places",
    description: "bicycle",
    unicode_version: "6.0"
  },
  {
    emoji: "🛴",
    aliases: ["kick_scooter"],
    tags: [],
    category: "Travel & Places",
    description: "kick scooter",
    unicode_version: "9.0"
  },
  {
    emoji: "🛹",
    aliases: ["skateboard"],
    tags: [],
    category: "Travel & Places",
    description: "skateboard",
    unicode_version: "11.0"
  },
  {
    emoji: "🛼",
    aliases: ["roller_skate"],
    tags: [],
    category: "Travel & Places",
    description: "roller skate",
    unicode_version: "13.0"
  },
  {
    emoji: "🚏",
    aliases: ["busstop"],
    tags: [],
    category: "Travel & Places",
    description: "bus stop",
    unicode_version: "6.0"
  },
  {
    emoji: "🛣️",
    aliases: ["motorway"],
    tags: [],
    category: "Travel & Places",
    description: "motorway",
    unicode_version: "7.0"
  },
  {
    emoji: "🛤️",
    aliases: ["railway_track"],
    tags: [],
    category: "Travel & Places",
    description: "railway track",
    unicode_version: "7.0"
  },
  {
    emoji: "🛢️",
    aliases: ["oil_drum"],
    tags: [],
    category: "Travel & Places",
    description: "oil drum",
    unicode_version: "7.0"
  },
  {
    emoji: "⛽",
    aliases: ["fuelpump"],
    tags: [],
    category: "Travel & Places",
    description: "fuel pump",
    unicode_version: "5.2"
  },
  {
    emoji: "🚨",
    aliases: ["rotating_light"],
    tags: ["911", "emergency"],
    category: "Travel & Places",
    description: "police car light",
    unicode_version: "6.0"
  },
  {
    emoji: "🚥",
    aliases: ["traffic_light"],
    tags: [],
    category: "Travel & Places",
    description: "horizontal traffic light",
    unicode_version: "6.0"
  },
  {
    emoji: "🚦",
    aliases: ["vertical_traffic_light"],
    tags: ["semaphore"],
    category: "Travel & Places",
    description: "vertical traffic light",
    unicode_version: "6.0"
  },
  {
    emoji: "🛑",
    aliases: ["stop_sign"],
    tags: [],
    category: "Travel & Places",
    description: "stop sign",
    unicode_version: "9.0"
  },
  {
    emoji: "🚧",
    aliases: ["construction"],
    tags: ["wip"],
    category: "Travel & Places",
    description: "construction",
    unicode_version: "6.0"
  },
  {
    emoji: "⚓",
    aliases: ["anchor"],
    tags: ["ship"],
    category: "Travel & Places",
    description: "anchor",
    unicode_version: "4.1"
  },
  {
    emoji: "⛵",
    aliases: ["boat", "sailboat"],
    tags: [],
    category: "Travel & Places",
    description: "sailboat",
    unicode_version: "5.2"
  },
  {
    emoji: "🛶",
    aliases: ["canoe"],
    tags: [],
    category: "Travel & Places",
    description: "canoe",
    unicode_version: "9.0"
  },
  {
    emoji: "🚤",
    aliases: ["speedboat"],
    tags: ["ship"],
    category: "Travel & Places",
    description: "speedboat",
    unicode_version: "6.0"
  },
  {
    emoji: "🛳️",
    aliases: ["passenger_ship"],
    tags: ["cruise"],
    category: "Travel & Places",
    description: "passenger ship",
    unicode_version: "7.0"
  },
  {
    emoji: "⛴️",
    aliases: ["ferry"],
    tags: [],
    category: "Travel & Places",
    description: "ferry",
    unicode_version: "5.2"
  },
  {
    emoji: "🛥️",
    aliases: ["motor_boat"],
    tags: [],
    category: "Travel & Places",
    description: "motor boat",
    unicode_version: "7.0"
  },
  {
    emoji: "🚢",
    aliases: ["ship"],
    tags: [],
    category: "Travel & Places",
    description: "ship",
    unicode_version: "6.0"
  },
  {
    emoji: "✈️",
    aliases: ["airplane"],
    tags: ["flight"],
    category: "Travel & Places",
    description: "airplane",
    unicode_version: ""
  },
  {
    emoji: "🛩️",
    aliases: ["small_airplane"],
    tags: ["flight"],
    category: "Travel & Places",
    description: "small airplane",
    unicode_version: "7.0"
  },
  {
    emoji: "🛫",
    aliases: ["flight_departure"],
    tags: [],
    category: "Travel & Places",
    description: "airplane departure",
    unicode_version: "7.0"
  },
  {
    emoji: "🛬",
    aliases: ["flight_arrival"],
    tags: [],
    category: "Travel & Places",
    description: "airplane arrival",
    unicode_version: "7.0"
  },
  {
    emoji: "🪂",
    aliases: ["parachute"],
    tags: [],
    category: "Travel & Places",
    description: "parachute",
    unicode_version: "12.0"
  },
  {
    emoji: "💺",
    aliases: ["seat"],
    tags: [],
    category: "Travel & Places",
    description: "seat",
    unicode_version: "6.0"
  },
  {
    emoji: "🚁",
    aliases: ["helicopter"],
    tags: [],
    category: "Travel & Places",
    description: "helicopter",
    unicode_version: "6.0"
  },
  {
    emoji: "🚟",
    aliases: ["suspension_railway"],
    tags: [],
    category: "Travel & Places",
    description: "suspension railway",
    unicode_version: "6.0"
  },
  {
    emoji: "🚠",
    aliases: ["mountain_cableway"],
    tags: [],
    category: "Travel & Places",
    description: "mountain cableway",
    unicode_version: "6.0"
  },
  {
    emoji: "🚡",
    aliases: ["aerial_tramway"],
    tags: [],
    category: "Travel & Places",
    description: "aerial tramway",
    unicode_version: "6.0"
  },
  {
    emoji: "🛰️",
    aliases: ["artificial_satellite"],
    tags: ["orbit", "space"],
    category: "Travel & Places",
    description: "satellite",
    unicode_version: "7.0"
  },
  {
    emoji: "🚀",
    aliases: ["rocket"],
    tags: ["ship", "launch"],
    category: "Travel & Places",
    description: "rocket",
    unicode_version: "6.0"
  },
  {
    emoji: "🛸",
    aliases: ["flying_saucer"],
    tags: ["ufo"],
    category: "Travel & Places",
    description: "flying saucer",
    unicode_version: "11.0"
  },
  {
    emoji: "🛎️",
    aliases: ["bellhop_bell"],
    tags: [],
    category: "Travel & Places",
    description: "bellhop bell",
    unicode_version: "7.0"
  },
  {
    emoji: "🧳",
    aliases: ["luggage"],
    tags: [],
    category: "Travel & Places",
    description: "luggage",
    unicode_version: "11.0"
  },
  {
    emoji: "⌛",
    aliases: ["hourglass"],
    tags: ["time"],
    category: "Travel & Places",
    description: "hourglass done",
    unicode_version: ""
  },
  {
    emoji: "⏳",
    aliases: ["hourglass_flowing_sand"],
    tags: ["time"],
    category: "Travel & Places",
    description: "hourglass not done",
    unicode_version: "6.0"
  },
  {
    emoji: "⌚",
    aliases: ["watch"],
    tags: ["time"],
    category: "Travel & Places",
    description: "watch",
    unicode_version: ""
  },
  {
    emoji: "⏰",
    aliases: ["alarm_clock"],
    tags: ["morning"],
    category: "Travel & Places",
    description: "alarm clock",
    unicode_version: "6.0"
  },
  {
    emoji: "⏱️",
    aliases: ["stopwatch"],
    tags: [],
    category: "Travel & Places",
    description: "stopwatch",
    unicode_version: "6.0"
  },
  {
    emoji: "⏲️",
    aliases: ["timer_clock"],
    tags: [],
    category: "Travel & Places",
    description: "timer clock",
    unicode_version: "6.0"
  },
  {
    emoji: "🕰️",
    aliases: ["mantelpiece_clock"],
    tags: [],
    category: "Travel & Places",
    description: "mantelpiece clock",
    unicode_version: "7.0"
  },
  {
    emoji: "🕛",
    aliases: ["clock12"],
    tags: [],
    category: "Travel & Places",
    description: "twelve o’clock",
    unicode_version: "6.0"
  },
  {
    emoji: "🕧",
    aliases: ["clock1230"],
    tags: [],
    category: "Travel & Places",
    description: "twelve-thirty",
    unicode_version: "6.0"
  },
  {
    emoji: "🕐",
    aliases: ["clock1"],
    tags: [],
    category: "Travel & Places",
    description: "one o’clock",
    unicode_version: "6.0"
  },
  {
    emoji: "🕜",
    aliases: ["clock130"],
    tags: [],
    category: "Travel & Places",
    description: "one-thirty",
    unicode_version: "6.0"
  },
  {
    emoji: "🕑",
    aliases: ["clock2"],
    tags: [],
    category: "Travel & Places",
    description: "two o’clock",
    unicode_version: "6.0"
  },
  {
    emoji: "🕝",
    aliases: ["clock230"],
    tags: [],
    category: "Travel & Places",
    description: "two-thirty",
    unicode_version: "6.0"
  },
  {
    emoji: "🕒",
    aliases: ["clock3"],
    tags: [],
    category: "Travel & Places",
    description: "three o’clock",
    unicode_version: "6.0"
  },
  {
    emoji: "🕞",
    aliases: ["clock330"],
    tags: [],
    category: "Travel & Places",
    description: "three-thirty",
    unicode_version: "6.0"
  },
  {
    emoji: "🕓",
    aliases: ["clock4"],
    tags: [],
    category: "Travel & Places",
    description: "four o’clock",
    unicode_version: "6.0"
  },
  {
    emoji: "🕟",
    aliases: ["clock430"],
    tags: [],
    category: "Travel & Places",
    description: "four-thirty",
    unicode_version: "6.0"
  },
  {
    emoji: "🕔",
    aliases: ["clock5"],
    tags: [],
    category: "Travel & Places",
    description: "five o’clock",
    unicode_version: "6.0"
  },
  {
    emoji: "🕠",
    aliases: ["clock530"],
    tags: [],
    category: "Travel & Places",
    description: "five-thirty",
    unicode_version: "6.0"
  },
  {
    emoji: "🕕",
    aliases: ["clock6"],
    tags: [],
    category: "Travel & Places",
    description: "six o’clock",
    unicode_version: "6.0"
  },
  {
    emoji: "🕡",
    aliases: ["clock630"],
    tags: [],
    category: "Travel & Places",
    description: "six-thirty",
    unicode_version: "6.0"
  },
  {
    emoji: "🕖",
    aliases: ["clock7"],
    tags: [],
    category: "Travel & Places",
    description: "seven o’clock",
    unicode_version: "6.0"
  },
  {
    emoji: "🕢",
    aliases: ["clock730"],
    tags: [],
    category: "Travel & Places",
    description: "seven-thirty",
    unicode_version: "6.0"
  },
  {
    emoji: "🕗",
    aliases: ["clock8"],
    tags: [],
    category: "Travel & Places",
    description: "eight o’clock",
    unicode_version: "6.0"
  },
  {
    emoji: "🕣",
    aliases: ["clock830"],
    tags: [],
    category: "Travel & Places",
    description: "eight-thirty",
    unicode_version: "6.0"
  },
  {
    emoji: "🕘",
    aliases: ["clock9"],
    tags: [],
    category: "Travel & Places",
    description: "nine o’clock",
    unicode_version: "6.0"
  },
  {
    emoji: "🕤",
    aliases: ["clock930"],
    tags: [],
    category: "Travel & Places",
    description: "nine-thirty",
    unicode_version: "6.0"
  },
  {
    emoji: "🕙",
    aliases: ["clock10"],
    tags: [],
    category: "Travel & Places",
    description: "ten o’clock",
    unicode_version: "6.0"
  },
  {
    emoji: "🕥",
    aliases: ["clock1030"],
    tags: [],
    category: "Travel & Places",
    description: "ten-thirty",
    unicode_version: "6.0"
  },
  {
    emoji: "🕚",
    aliases: ["clock11"],
    tags: [],
    category: "Travel & Places",
    description: "eleven o’clock",
    unicode_version: "6.0"
  },
  {
    emoji: "🕦",
    aliases: ["clock1130"],
    tags: [],
    category: "Travel & Places",
    description: "eleven-thirty",
    unicode_version: "6.0"
  },
  {
    emoji: "🌑",
    aliases: ["new_moon"],
    tags: [],
    category: "Travel & Places",
    description: "new moon",
    unicode_version: "6.0"
  },
  {
    emoji: "🌒",
    aliases: ["waxing_crescent_moon"],
    tags: [],
    category: "Travel & Places",
    description: "waxing crescent moon",
    unicode_version: "6.0"
  },
  {
    emoji: "🌓",
    aliases: ["first_quarter_moon"],
    tags: [],
    category: "Travel & Places",
    description: "first quarter moon",
    unicode_version: "6.0"
  },
  {
    emoji: "🌔",
    aliases: ["moon", "waxing_gibbous_moon"],
    tags: [],
    category: "Travel & Places",
    description: "waxing gibbous moon",
    unicode_version: "6.0"
  },
  {
    emoji: "🌕",
    aliases: ["full_moon"],
    tags: [],
    category: "Travel & Places",
    description: "full moon",
    unicode_version: "6.0"
  },
  {
    emoji: "🌖",
    aliases: ["waning_gibbous_moon"],
    tags: [],
    category: "Travel & Places",
    description: "waning gibbous moon",
    unicode_version: "6.0"
  },
  {
    emoji: "🌗",
    aliases: ["last_quarter_moon"],
    tags: [],
    category: "Travel & Places",
    description: "last quarter moon",
    unicode_version: "6.0"
  },
  {
    emoji: "🌘",
    aliases: ["waning_crescent_moon"],
    tags: [],
    category: "Travel & Places",
    description: "waning crescent moon",
    unicode_version: "6.0"
  },
  {
    emoji: "🌙",
    aliases: ["crescent_moon"],
    tags: ["night"],
    category: "Travel & Places",
    description: "crescent moon",
    unicode_version: "6.0"
  },
  {
    emoji: "🌚",
    aliases: ["new_moon_with_face"],
    tags: [],
    category: "Travel & Places",
    description: "new moon face",
    unicode_version: "6.0"
  },
  {
    emoji: "🌛",
    aliases: ["first_quarter_moon_with_face"],
    tags: [],
    category: "Travel & Places",
    description: "first quarter moon face",
    unicode_version: "6.0"
  },
  {
    emoji: "🌜",
    aliases: ["last_quarter_moon_with_face"],
    tags: [],
    category: "Travel & Places",
    description: "last quarter moon face",
    unicode_version: "6.0"
  },
  {
    emoji: "🌡️",
    aliases: ["thermometer"],
    tags: [],
    category: "Travel & Places",
    description: "thermometer",
    unicode_version: "7.0"
  },
  {
    emoji: "☀️",
    aliases: ["sunny"],
    tags: ["weather"],
    category: "Travel & Places",
    description: "sun",
    unicode_version: ""
  },
  {
    emoji: "🌝",
    aliases: ["full_moon_with_face"],
    tags: [],
    category: "Travel & Places",
    description: "full moon face",
    unicode_version: "6.0"
  },
  {
    emoji: "🌞",
    aliases: ["sun_with_face"],
    tags: ["summer"],
    category: "Travel & Places",
    description: "sun with face",
    unicode_version: "6.0"
  },
  {
    emoji: "🪐",
    aliases: ["ringed_planet"],
    tags: [],
    category: "Travel & Places",
    description: "ringed planet",
    unicode_version: "12.0"
  },
  {
    emoji: "⭐",
    aliases: ["star"],
    tags: [],
    category: "Travel & Places",
    description: "star",
    unicode_version: "5.1"
  },
  {
    emoji: "🌟",
    aliases: ["star2"],
    tags: [],
    category: "Travel & Places",
    description: "glowing star",
    unicode_version: "6.0"
  },
  {
    emoji: "🌠",
    aliases: ["stars"],
    tags: [],
    category: "Travel & Places",
    description: "shooting star",
    unicode_version: "6.0"
  },
  {
    emoji: "🌌",
    aliases: ["milky_way"],
    tags: [],
    category: "Travel & Places",
    description: "milky way",
    unicode_version: "6.0"
  },
  {
    emoji: "☁️",
    aliases: ["cloud"],
    tags: [],
    category: "Travel & Places",
    description: "cloud",
    unicode_version: ""
  },
  {
    emoji: "⛅",
    aliases: ["partly_sunny"],
    tags: ["weather", "cloud"],
    category: "Travel & Places",
    description: "sun behind cloud",
    unicode_version: "5.2"
  },
  {
    emoji: "⛈️",
    aliases: ["cloud_with_lightning_and_rain"],
    tags: [],
    category: "Travel & Places",
    description: "cloud with lightning and rain",
    unicode_version: "5.2"
  },
  {
    emoji: "🌤️",
    aliases: ["sun_behind_small_cloud"],
    tags: [],
    category: "Travel & Places",
    description: "sun behind small cloud",
    unicode_version: "7.0"
  },
  {
    emoji: "🌥️",
    aliases: ["sun_behind_large_cloud"],
    tags: [],
    category: "Travel & Places",
    description: "sun behind large cloud",
    unicode_version: "7.0"
  },
  {
    emoji: "🌦️",
    aliases: ["sun_behind_rain_cloud"],
    tags: [],
    category: "Travel & Places",
    description: "sun behind rain cloud",
    unicode_version: "7.0"
  },
  {
    emoji: "🌧️",
    aliases: ["cloud_with_rain"],
    tags: [],
    category: "Travel & Places",
    description: "cloud with rain",
    unicode_version: "7.0"
  },
  {
    emoji: "🌨️",
    aliases: ["cloud_with_snow"],
    tags: [],
    category: "Travel & Places",
    description: "cloud with snow",
    unicode_version: "7.0"
  },
  {
    emoji: "🌩️",
    aliases: ["cloud_with_lightning"],
    tags: [],
    category: "Travel & Places",
    description: "cloud with lightning",
    unicode_version: "7.0"
  },
  {
    emoji: "🌪️",
    aliases: ["tornado"],
    tags: [],
    category: "Travel & Places",
    description: "tornado",
    unicode_version: "7.0"
  },
  {
    emoji: "🌫️",
    aliases: ["fog"],
    tags: [],
    category: "Travel & Places",
    description: "fog",
    unicode_version: "7.0"
  },
  {
    emoji: "🌬️",
    aliases: ["wind_face"],
    tags: [],
    category: "Travel & Places",
    description: "wind face",
    unicode_version: "7.0"
  },
  {
    emoji: "🌀",
    aliases: ["cyclone"],
    tags: ["swirl"],
    category: "Travel & Places",
    description: "cyclone",
    unicode_version: "6.0"
  },
  {
    emoji: "🌈",
    aliases: ["rainbow"],
    tags: [],
    category: "Travel & Places",
    description: "rainbow",
    unicode_version: "6.0"
  },
  {
    emoji: "🌂",
    aliases: ["closed_umbrella"],
    tags: ["weather", "rain"],
    category: "Travel & Places",
    description: "closed umbrella",
    unicode_version: "6.0"
  },
  {
    emoji: "☂️",
    aliases: ["open_umbrella"],
    tags: [],
    category: "Travel & Places",
    description: "umbrella",
    unicode_version: ""
  },
  {
    emoji: "☔",
    aliases: ["umbrella"],
    tags: ["rain", "weather"],
    category: "Travel & Places",
    description: "umbrella with rain drops",
    unicode_version: "4.0"
  },
  {
    emoji: "⛱️",
    aliases: ["parasol_on_ground"],
    tags: ["beach_umbrella"],
    category: "Travel & Places",
    description: "umbrella on ground",
    unicode_version: "5.2"
  },
  {
    emoji: "⚡",
    aliases: ["zap"],
    tags: ["lightning", "thunder"],
    category: "Travel & Places",
    description: "high voltage",
    unicode_version: "4.0"
  },
  {
    emoji: "❄️",
    aliases: ["snowflake"],
    tags: ["winter", "cold", "weather"],
    category: "Travel & Places",
    description: "snowflake",
    unicode_version: ""
  },
  {
    emoji: "☃️",
    aliases: ["snowman_with_snow"],
    tags: ["winter", "christmas"],
    category: "Travel & Places",
    description: "snowman",
    unicode_version: ""
  },
  {
    emoji: "⛄",
    aliases: ["snowman"],
    tags: ["winter"],
    category: "Travel & Places",
    description: "snowman without snow",
    unicode_version: "5.2"
  },
  {
    emoji: "☄️",
    aliases: ["comet"],
    tags: [],
    category: "Travel & Places",
    description: "comet",
    unicode_version: ""
  },
  {
    emoji: "🔥",
    aliases: ["fire"],
    tags: ["burn"],
    category: "Travel & Places",
    description: "fire",
    unicode_version: "6.0"
  },
  {
    emoji: "💧",
    aliases: ["droplet"],
    tags: ["water"],
    category: "Travel & Places",
    description: "droplet",
    unicode_version: "6.0"
  },
  {
    emoji: "🌊",
    aliases: ["ocean"],
    tags: ["sea"],
    category: "Travel & Places",
    description: "water wave",
    unicode_version: "6.0"
  },
  {
    emoji: "🎃",
    aliases: ["jack_o_lantern"],
    tags: ["halloween"],
    category: "Activities",
    description: "jack-o-lantern",
    unicode_version: "6.0"
  },
  {
    emoji: "🎄",
    aliases: ["christmas_tree"],
    tags: [],
    category: "Activities",
    description: "Christmas tree",
    unicode_version: "6.0"
  },
  {
    emoji: "🎆",
    aliases: ["fireworks"],
    tags: ["festival", "celebration"],
    category: "Activities",
    description: "fireworks",
    unicode_version: "6.0"
  },
  {
    emoji: "🎇",
    aliases: ["sparkler"],
    tags: [],
    category: "Activities",
    description: "sparkler",
    unicode_version: "6.0"
  },
  {
    emoji: "🧨",
    aliases: ["firecracker"],
    tags: [],
    category: "Activities",
    description: "firecracker",
    unicode_version: "11.0"
  },
  {
    emoji: "✨",
    aliases: ["sparkles"],
    tags: ["shiny"],
    category: "Activities",
    description: "sparkles",
    unicode_version: "6.0"
  },
  {
    emoji: "🎈",
    aliases: ["balloon"],
    tags: ["party", "birthday"],
    category: "Activities",
    description: "balloon",
    unicode_version: "6.0"
  },
  {
    emoji: "🎉",
    aliases: ["tada"],
    tags: ["hooray", "party"],
    category: "Activities",
    description: "party popper",
    unicode_version: "6.0"
  },
  {
    emoji: "🎊",
    aliases: ["confetti_ball"],
    tags: [],
    category: "Activities",
    description: "confetti ball",
    unicode_version: "6.0"
  },
  {
    emoji: "🎋",
    aliases: ["tanabata_tree"],
    tags: [],
    category: "Activities",
    description: "tanabata tree",
    unicode_version: "6.0"
  },
  {
    emoji: "🎍",
    aliases: ["bamboo"],
    tags: [],
    category: "Activities",
    description: "pine decoration",
    unicode_version: "6.0"
  },
  {
    emoji: "🎎",
    aliases: ["dolls"],
    tags: [],
    category: "Activities",
    description: "Japanese dolls",
    unicode_version: "6.0"
  },
  {
    emoji: "🎏",
    aliases: ["flags"],
    tags: [],
    category: "Activities",
    description: "carp streamer",
    unicode_version: "6.0"
  },
  {
    emoji: "🎐",
    aliases: ["wind_chime"],
    tags: [],
    category: "Activities",
    description: "wind chime",
    unicode_version: "6.0"
  },
  {
    emoji: "🎑",
    aliases: ["rice_scene"],
    tags: [],
    category: "Activities",
    description: "moon viewing ceremony",
    unicode_version: "6.0"
  },
  {
    emoji: "🧧",
    aliases: ["red_envelope"],
    tags: [],
    category: "Activities",
    description: "red envelope",
    unicode_version: "11.0"
  },
  {
    emoji: "🎀",
    aliases: ["ribbon"],
    tags: [],
    category: "Activities",
    description: "ribbon",
    unicode_version: "6.0"
  },
  {
    emoji: "🎁",
    aliases: ["gift"],
    tags: ["present", "birthday", "christmas"],
    category: "Activities",
    description: "wrapped gift",
    unicode_version: "6.0"
  },
  {
    emoji: "🎗️",
    aliases: ["reminder_ribbon"],
    tags: [],
    category: "Activities",
    description: "reminder ribbon",
    unicode_version: "7.0"
  },
  {
    emoji: "🎟️",
    aliases: ["tickets"],
    tags: [],
    category: "Activities",
    description: "admission tickets",
    unicode_version: "7.0"
  },
  {
    emoji: "🎫",
    aliases: ["ticket"],
    tags: [],
    category: "Activities",
    description: "ticket",
    unicode_version: "6.0"
  },
  {
    emoji: "🎖️",
    aliases: ["medal_military"],
    tags: [],
    category: "Activities",
    description: "military medal",
    unicode_version: "7.0"
  },
  {
    emoji: "🏆",
    aliases: ["trophy"],
    tags: ["award", "contest", "winner"],
    category: "Activities",
    description: "trophy",
    unicode_version: "6.0"
  },
  {
    emoji: "🏅",
    aliases: ["medal_sports"],
    tags: ["gold", "winner"],
    category: "Activities",
    description: "sports medal",
    unicode_version: "7.0"
  },
  {
    emoji: "🥇",
    aliases: ["1st_place_medal"],
    tags: ["gold"],
    category: "Activities",
    description: "1st place medal",
    unicode_version: "9.0"
  },
  {
    emoji: "🥈",
    aliases: ["2nd_place_medal"],
    tags: ["silver"],
    category: "Activities",
    description: "2nd place medal",
    unicode_version: "9.0"
  },
  {
    emoji: "🥉",
    aliases: ["3rd_place_medal"],
    tags: ["bronze"],
    category: "Activities",
    description: "3rd place medal",
    unicode_version: "9.0"
  },
  {
    emoji: "⚽",
    aliases: ["soccer"],
    tags: ["sports"],
    category: "Activities",
    description: "soccer ball",
    unicode_version: "5.2"
  },
  {
    emoji: "⚾",
    aliases: ["baseball"],
    tags: ["sports"],
    category: "Activities",
    description: "baseball",
    unicode_version: "5.2"
  },
  {
    emoji: "🥎",
    aliases: ["softball"],
    tags: [],
    category: "Activities",
    description: "softball",
    unicode_version: "11.0"
  },
  {
    emoji: "🏀",
    aliases: ["basketball"],
    tags: ["sports"],
    category: "Activities",
    description: "basketball",
    unicode_version: "6.0"
  },
  {
    emoji: "🏐",
    aliases: ["volleyball"],
    tags: [],
    category: "Activities",
    description: "volleyball",
    unicode_version: "8.0"
  },
  {
    emoji: "🏈",
    aliases: ["football"],
    tags: ["sports"],
    category: "Activities",
    description: "american football",
    unicode_version: "6.0"
  },
  {
    emoji: "🏉",
    aliases: ["rugby_football"],
    tags: [],
    category: "Activities",
    description: "rugby football",
    unicode_version: "6.0"
  },
  {
    emoji: "🎾",
    aliases: ["tennis"],
    tags: ["sports"],
    category: "Activities",
    description: "tennis",
    unicode_version: "6.0"
  },
  {
    emoji: "🥏",
    aliases: ["flying_disc"],
    tags: [],
    category: "Activities",
    description: "flying disc",
    unicode_version: "11.0"
  },
  {
    emoji: "🎳",
    aliases: ["bowling"],
    tags: [],
    category: "Activities",
    description: "bowling",
    unicode_version: "6.0"
  },
  {
    emoji: "🏏",
    aliases: ["cricket_game"],
    tags: [],
    category: "Activities",
    description: "cricket game",
    unicode_version: "8.0"
  },
  {
    emoji: "🏑",
    aliases: ["field_hockey"],
    tags: [],
    category: "Activities",
    description: "field hockey",
    unicode_version: "8.0"
  },
  {
    emoji: "🏒",
    aliases: ["ice_hockey"],
    tags: [],
    category: "Activities",
    description: "ice hockey",
    unicode_version: "8.0"
  },
  {
    emoji: "🥍",
    aliases: ["lacrosse"],
    tags: [],
    category: "Activities",
    description: "lacrosse",
    unicode_version: "11.0"
  },
  {
    emoji: "🏓",
    aliases: ["ping_pong"],
    tags: [],
    category: "Activities",
    description: "ping pong",
    unicode_version: "8.0"
  },
  {
    emoji: "🏸",
    aliases: ["badminton"],
    tags: [],
    category: "Activities",
    description: "badminton",
    unicode_version: "8.0"
  },
  {
    emoji: "🥊",
    aliases: ["boxing_glove"],
    tags: [],
    category: "Activities",
    description: "boxing glove",
    unicode_version: "9.0"
  },
  {
    emoji: "🥋",
    aliases: ["martial_arts_uniform"],
    tags: [],
    category: "Activities",
    description: "martial arts uniform",
    unicode_version: "9.0"
  },
  {
    emoji: "🥅",
    aliases: ["goal_net"],
    tags: [],
    category: "Activities",
    description: "goal net",
    unicode_version: "9.0"
  },
  {
    emoji: "⛳",
    aliases: ["golf"],
    tags: [],
    category: "Activities",
    description: "flag in hole",
    unicode_version: "5.2"
  },
  {
    emoji: "⛸️",
    aliases: ["ice_skate"],
    tags: ["skating"],
    category: "Activities",
    description: "ice skate",
    unicode_version: "5.2"
  },
  {
    emoji: "🎣",
    aliases: ["fishing_pole_and_fish"],
    tags: [],
    category: "Activities",
    description: "fishing pole",
    unicode_version: "6.0"
  },
  {
    emoji: "🤿",
    aliases: ["diving_mask"],
    tags: [],
    category: "Activities",
    description: "diving mask",
    unicode_version: "12.0"
  },
  {
    emoji: "🎽",
    aliases: ["running_shirt_with_sash"],
    tags: ["marathon"],
    category: "Activities",
    description: "running shirt",
    unicode_version: "6.0"
  },
  {
    emoji: "🎿",
    aliases: ["ski"],
    tags: [],
    category: "Activities",
    description: "skis",
    unicode_version: "6.0"
  },
  {
    emoji: "🛷",
    aliases: ["sled"],
    tags: [],
    category: "Activities",
    description: "sled",
    unicode_version: "11.0"
  },
  {
    emoji: "🥌",
    aliases: ["curling_stone"],
    tags: [],
    category: "Activities",
    description: "curling stone",
    unicode_version: "11.0"
  },
  {
    emoji: "🎯",
    aliases: ["dart"],
    tags: ["target"],
    category: "Activities",
    description: "bullseye",
    unicode_version: "6.0"
  },
  {
    emoji: "🪀",
    aliases: ["yo_yo"],
    tags: [],
    category: "Activities",
    description: "yo-yo",
    unicode_version: "12.0"
  },
  {
    emoji: "🪁",
    aliases: ["kite"],
    tags: [],
    category: "Activities",
    description: "kite",
    unicode_version: "12.0"
  },
  {
    emoji: "🎱",
    aliases: ["8ball"],
    tags: ["pool", "billiards"],
    category: "Activities",
    description: "pool 8 ball",
    unicode_version: "6.0"
  },
  {
    emoji: "🔮",
    aliases: ["crystal_ball"],
    tags: ["fortune"],
    category: "Activities",
    description: "crystal ball",
    unicode_version: "6.0"
  },
  {
    emoji: "🪄",
    aliases: ["magic_wand"],
    tags: [],
    category: "Activities",
    description: "magic wand",
    unicode_version: "13.0"
  },
  {
    emoji: "🧿",
    aliases: ["nazar_amulet"],
    tags: [],
    category: "Activities",
    description: "nazar amulet",
    unicode_version: "11.0"
  },
  {
    emoji: "🎮",
    aliases: ["video_game"],
    tags: ["play", "controller", "console"],
    category: "Activities",
    description: "video game",
    unicode_version: "6.0"
  },
  {
    emoji: "🕹️",
    aliases: ["joystick"],
    tags: [],
    category: "Activities",
    description: "joystick",
    unicode_version: "7.0"
  },
  {
    emoji: "🎰",
    aliases: ["slot_machine"],
    tags: [],
    category: "Activities",
    description: "slot machine",
    unicode_version: "6.0"
  },
  {
    emoji: "🎲",
    aliases: ["game_die"],
    tags: ["dice", "gambling"],
    category: "Activities",
    description: "game die",
    unicode_version: "6.0"
  },
  {
    emoji: "🧩",
    aliases: ["jigsaw"],
    tags: [],
    category: "Activities",
    description: "puzzle piece",
    unicode_version: "11.0"
  },
  {
    emoji: "🧸",
    aliases: ["teddy_bear"],
    tags: [],
    category: "Activities",
    description: "teddy bear",
    unicode_version: "11.0"
  },
  {
    emoji: "🪅",
    aliases: ["pinata"],
    tags: [],
    category: "Activities",
    description: "piñata",
    unicode_version: "13.0"
  },
  {
    emoji: "🪆",
    aliases: ["nesting_dolls"],
    tags: [],
    category: "Activities",
    description: "nesting dolls",
    unicode_version: "13.0"
  },
  {
    emoji: "♠️",
    aliases: ["spades"],
    tags: [],
    category: "Activities",
    description: "spade suit",
    unicode_version: ""
  },
  {
    emoji: "♥️",
    aliases: ["hearts"],
    tags: [],
    category: "Activities",
    description: "heart suit",
    unicode_version: ""
  },
  {
    emoji: "♦️",
    aliases: ["diamonds"],
    tags: [],
    category: "Activities",
    description: "diamond suit",
    unicode_version: ""
  },
  {
    emoji: "♣️",
    aliases: ["clubs"],
    tags: [],
    category: "Activities",
    description: "club suit",
    unicode_version: ""
  },
  {
    emoji: "♟️",
    aliases: ["chess_pawn"],
    tags: [],
    category: "Activities",
    description: "chess pawn",
    unicode_version: "11.0"
  },
  {
    emoji: "🃏",
    aliases: ["black_joker"],
    tags: [],
    category: "Activities",
    description: "joker",
    unicode_version: "6.0"
  },
  {
    emoji: "🀄",
    aliases: ["mahjong"],
    tags: [],
    category: "Activities",
    description: "mahjong red dragon",
    unicode_version: ""
  },
  {
    emoji: "🎴",
    aliases: ["flower_playing_cards"],
    tags: [],
    category: "Activities",
    description: "flower playing cards",
    unicode_version: "6.0"
  },
  {
    emoji: "🎭",
    aliases: ["performing_arts"],
    tags: ["theater", "drama"],
    category: "Activities",
    description: "performing arts",
    unicode_version: "6.0"
  },
  {
    emoji: "🖼️",
    aliases: ["framed_picture"],
    tags: [],
    category: "Activities",
    description: "framed picture",
    unicode_version: "7.0"
  },
  {
    emoji: "🎨",
    aliases: ["art"],
    tags: ["design", "paint"],
    category: "Activities",
    description: "artist palette",
    unicode_version: "6.0"
  },
  {
    emoji: "🧵",
    aliases: ["thread"],
    tags: [],
    category: "Activities",
    description: "thread",
    unicode_version: "11.0"
  },
  {
    emoji: "🪡",
    aliases: ["sewing_needle"],
    tags: [],
    category: "Activities",
    description: "sewing needle",
    unicode_version: "13.0"
  },
  {
    emoji: "🧶",
    aliases: ["yarn"],
    tags: [],
    category: "Activities",
    description: "yarn",
    unicode_version: "11.0"
  },
  {
    emoji: "🪢",
    aliases: ["knot"],
    tags: [],
    category: "Activities",
    description: "knot",
    unicode_version: "13.0"
  },
  {
    emoji: "👓",
    aliases: ["eyeglasses"],
    tags: ["glasses"],
    category: "Objects",
    description: "glasses",
    unicode_version: "6.0"
  },
  {
    emoji: "🕶️",
    aliases: ["dark_sunglasses"],
    tags: [],
    category: "Objects",
    description: "sunglasses",
    unicode_version: "7.0"
  },
  {
    emoji: "🥽",
    aliases: ["goggles"],
    tags: [],
    category: "Objects",
    description: "goggles",
    unicode_version: "11.0"
  },
  {
    emoji: "🥼",
    aliases: ["lab_coat"],
    tags: [],
    category: "Objects",
    description: "lab coat",
    unicode_version: "11.0"
  },
  {
    emoji: "🦺",
    aliases: ["safety_vest"],
    tags: [],
    category: "Objects",
    description: "safety vest",
    unicode_version: "12.0"
  },
  {
    emoji: "👔",
    aliases: ["necktie"],
    tags: ["shirt", "formal"],
    category: "Objects",
    description: "necktie",
    unicode_version: "6.0"
  },
  {
    emoji: "👕",
    aliases: ["shirt", "tshirt"],
    tags: [],
    category: "Objects",
    description: "t-shirt",
    unicode_version: "6.0"
  },
  {
    emoji: "👖",
    aliases: ["jeans"],
    tags: ["pants"],
    category: "Objects",
    description: "jeans",
    unicode_version: "6.0"
  },
  {
    emoji: "🧣",
    aliases: ["scarf"],
    tags: [],
    category: "Objects",
    description: "scarf",
    unicode_version: "11.0"
  },
  {
    emoji: "🧤",
    aliases: ["gloves"],
    tags: [],
    category: "Objects",
    description: "gloves",
    unicode_version: "11.0"
  },
  {
    emoji: "🧥",
    aliases: ["coat"],
    tags: [],
    category: "Objects",
    description: "coat",
    unicode_version: "11.0"
  },
  {
    emoji: "🧦",
    aliases: ["socks"],
    tags: [],
    category: "Objects",
    description: "socks",
    unicode_version: "11.0"
  },
  {
    emoji: "👗",
    aliases: ["dress"],
    tags: [],
    category: "Objects",
    description: "dress",
    unicode_version: "6.0"
  },
  {
    emoji: "👘",
    aliases: ["kimono"],
    tags: [],
    category: "Objects",
    description: "kimono",
    unicode_version: "6.0"
  },
  {
    emoji: "🥻",
    aliases: ["sari"],
    tags: [],
    category: "Objects",
    description: "sari",
    unicode_version: "12.0"
  },
  {
    emoji: "🩱",
    aliases: ["one_piece_swimsuit"],
    tags: [],
    category: "Objects",
    description: "one-piece swimsuit",
    unicode_version: "12.0"
  },
  {
    emoji: "🩲",
    aliases: ["swim_brief"],
    tags: [],
    category: "Objects",
    description: "briefs",
    unicode_version: "12.0"
  },
  {
    emoji: "🩳",
    aliases: ["shorts"],
    tags: [],
    category: "Objects",
    description: "shorts",
    unicode_version: "12.0"
  },
  {
    emoji: "👙",
    aliases: ["bikini"],
    tags: ["beach"],
    category: "Objects",
    description: "bikini",
    unicode_version: "6.0"
  },
  {
    emoji: "👚",
    aliases: ["womans_clothes"],
    tags: [],
    category: "Objects",
    description: "woman’s clothes",
    unicode_version: "6.0"
  },
  {
    emoji: "👛",
    aliases: ["purse"],
    tags: [],
    category: "Objects",
    description: "purse",
    unicode_version: "6.0"
  },
  {
    emoji: "👜",
    aliases: ["handbag"],
    tags: ["bag"],
    category: "Objects",
    description: "handbag",
    unicode_version: "6.0"
  },
  {
    emoji: "👝",
    aliases: ["pouch"],
    tags: ["bag"],
    category: "Objects",
    description: "clutch bag",
    unicode_version: "6.0"
  },
  {
    emoji: "🛍️",
    aliases: ["shopping"],
    tags: ["bags"],
    category: "Objects",
    description: "shopping bags",
    unicode_version: "7.0"
  },
  {
    emoji: "🎒",
    aliases: ["school_satchel"],
    tags: [],
    category: "Objects",
    description: "backpack",
    unicode_version: "6.0"
  },
  {
    emoji: "🩴",
    aliases: ["thong_sandal"],
    tags: [],
    category: "Objects",
    description: "thong sandal",
    unicode_version: "13.0"
  },
  {
    emoji: "👞",
    aliases: ["mans_shoe", "shoe"],
    tags: [],
    category: "Objects",
    description: "man’s shoe",
    unicode_version: "6.0"
  },
  {
    emoji: "👟",
    aliases: ["athletic_shoe"],
    tags: ["sneaker", "sport", "running"],
    category: "Objects",
    description: "running shoe",
    unicode_version: "6.0"
  },
  {
    emoji: "🥾",
    aliases: ["hiking_boot"],
    tags: [],
    category: "Objects",
    description: "hiking boot",
    unicode_version: "11.0"
  },
  {
    emoji: "🥿",
    aliases: ["flat_shoe"],
    tags: [],
    category: "Objects",
    description: "flat shoe",
    unicode_version: "11.0"
  },
  {
    emoji: "👠",
    aliases: ["high_heel"],
    tags: ["shoe"],
    category: "Objects",
    description: "high-heeled shoe",
    unicode_version: "6.0"
  },
  {
    emoji: "👡",
    aliases: ["sandal"],
    tags: ["shoe"],
    category: "Objects",
    description: "woman’s sandal",
    unicode_version: "6.0"
  },
  {
    emoji: "🩰",
    aliases: ["ballet_shoes"],
    tags: [],
    category: "Objects",
    description: "ballet shoes",
    unicode_version: "12.0"
  },
  {
    emoji: "👢",
    aliases: ["boot"],
    tags: [],
    category: "Objects",
    description: "woman’s boot",
    unicode_version: "6.0"
  },
  {
    emoji: "👑",
    aliases: ["crown"],
    tags: ["king", "queen", "royal"],
    category: "Objects",
    description: "crown",
    unicode_version: "6.0"
  },
  {
    emoji: "👒",
    aliases: ["womans_hat"],
    tags: [],
    category: "Objects",
    description: "woman’s hat",
    unicode_version: "6.0"
  },
  {
    emoji: "🎩",
    aliases: ["tophat"],
    tags: ["hat", "classy"],
    category: "Objects",
    description: "top hat",
    unicode_version: "6.0"
  },
  {
    emoji: "🎓",
    aliases: ["mortar_board"],
    tags: ["education", "college", "university", "graduation"],
    category: "Objects",
    description: "graduation cap",
    unicode_version: "6.0"
  },
  {
    emoji: "🧢",
    aliases: ["billed_cap"],
    tags: [],
    category: "Objects",
    description: "billed cap",
    unicode_version: "11.0"
  },
  {
    emoji: "🪖",
    aliases: ["military_helmet"],
    tags: [],
    category: "Objects",
    description: "military helmet",
    unicode_version: "13.0"
  },
  {
    emoji: "⛑️",
    aliases: ["rescue_worker_helmet"],
    tags: [],
    category: "Objects",
    description: "rescue worker’s helmet",
    unicode_version: "5.2"
  },
  {
    emoji: "📿",
    aliases: ["prayer_beads"],
    tags: [],
    category: "Objects",
    description: "prayer beads",
    unicode_version: "8.0"
  },
  {
    emoji: "💄",
    aliases: ["lipstick"],
    tags: ["makeup"],
    category: "Objects",
    description: "lipstick",
    unicode_version: "6.0"
  },
  {
    emoji: "💍",
    aliases: ["ring"],
    tags: ["wedding", "marriage", "engaged"],
    category: "Objects",
    description: "ring",
    unicode_version: "6.0"
  },
  {
    emoji: "💎",
    aliases: ["gem"],
    tags: ["diamond"],
    category: "Objects",
    description: "gem stone",
    unicode_version: "6.0"
  },
  {
    emoji: "🔇",
    aliases: ["mute"],
    tags: ["sound", "volume"],
    category: "Objects",
    description: "muted speaker",
    unicode_version: "6.0"
  },
  {
    emoji: "🔈",
    aliases: ["speaker"],
    tags: [],
    category: "Objects",
    description: "speaker low volume",
    unicode_version: "6.0"
  },
  {
    emoji: "🔉",
    aliases: ["sound"],
    tags: ["volume"],
    category: "Objects",
    description: "speaker medium volume",
    unicode_version: "6.0"
  },
  {
    emoji: "🔊",
    aliases: ["loud_sound"],
    tags: ["volume"],
    category: "Objects",
    description: "speaker high volume",
    unicode_version: "6.0"
  },
  {
    emoji: "📢",
    aliases: ["loudspeaker"],
    tags: ["announcement"],
    category: "Objects",
    description: "loudspeaker",
    unicode_version: "6.0"
  },
  {
    emoji: "📣",
    aliases: ["mega"],
    tags: [],
    category: "Objects",
    description: "megaphone",
    unicode_version: "6.0"
  },
  {
    emoji: "📯",
    aliases: ["postal_horn"],
    tags: [],
    category: "Objects",
    description: "postal horn",
    unicode_version: "6.0"
  },
  {
    emoji: "🔔",
    aliases: ["bell"],
    tags: ["sound", "notification"],
    category: "Objects",
    description: "bell",
    unicode_version: "6.0"
  },
  {
    emoji: "🔕",
    aliases: ["no_bell"],
    tags: ["volume", "off"],
    category: "Objects",
    description: "bell with slash",
    unicode_version: "6.0"
  },
  {
    emoji: "🎼",
    aliases: ["musical_score"],
    tags: [],
    category: "Objects",
    description: "musical score",
    unicode_version: "6.0"
  },
  {
    emoji: "🎵",
    aliases: ["musical_note"],
    tags: [],
    category: "Objects",
    description: "musical note",
    unicode_version: "6.0"
  },
  {
    emoji: "🎶",
    aliases: ["notes"],
    tags: ["music"],
    category: "Objects",
    description: "musical notes",
    unicode_version: "6.0"
  },
  {
    emoji: "🎙️",
    aliases: ["studio_microphone"],
    tags: ["podcast"],
    category: "Objects",
    description: "studio microphone",
    unicode_version: "7.0"
  },
  {
    emoji: "🎚️",
    aliases: ["level_slider"],
    tags: [],
    category: "Objects",
    description: "level slider",
    unicode_version: "7.0"
  },
  {
    emoji: "🎛️",
    aliases: ["control_knobs"],
    tags: [],
    category: "Objects",
    description: "control knobs",
    unicode_version: "7.0"
  },
  {
    emoji: "🎤",
    aliases: ["microphone"],
    tags: ["sing"],
    category: "Objects",
    description: "microphone",
    unicode_version: "6.0"
  },
  {
    emoji: "🎧",
    aliases: ["headphones"],
    tags: ["music", "earphones"],
    category: "Objects",
    description: "headphone",
    unicode_version: "6.0"
  },
  {
    emoji: "📻",
    aliases: ["radio"],
    tags: ["podcast"],
    category: "Objects",
    description: "radio",
    unicode_version: "6.0"
  },
  {
    emoji: "🎷",
    aliases: ["saxophone"],
    tags: [],
    category: "Objects",
    description: "saxophone",
    unicode_version: "6.0"
  },
  {
    emoji: "🪗",
    aliases: ["accordion"],
    tags: [],
    category: "Objects",
    description: "accordion",
    unicode_version: "13.0"
  },
  {
    emoji: "🎸",
    aliases: ["guitar"],
    tags: ["rock"],
    category: "Objects",
    description: "guitar",
    unicode_version: "6.0"
  },
  {
    emoji: "🎹",
    aliases: ["musical_keyboard"],
    tags: ["piano"],
    category: "Objects",
    description: "musical keyboard",
    unicode_version: "6.0"
  },
  {
    emoji: "🎺",
    aliases: ["trumpet"],
    tags: [],
    category: "Objects",
    description: "trumpet",
    unicode_version: "6.0"
  },
  {
    emoji: "🎻",
    aliases: ["violin"],
    tags: [],
    category: "Objects",
    description: "violin",
    unicode_version: "6.0"
  },
  {
    emoji: "🪕",
    aliases: ["banjo"],
    tags: [],
    category: "Objects",
    description: "banjo",
    unicode_version: "12.0"
  },
  {
    emoji: "🥁",
    aliases: ["drum"],
    tags: [],
    category: "Objects",
    description: "drum",
    unicode_version: ""
  },
  {
    emoji: "🪘",
    aliases: ["long_drum"],
    tags: [],
    category: "Objects",
    description: "long drum",
    unicode_version: "13.0"
  },
  {
    emoji: "📱",
    aliases: ["iphone"],
    tags: ["smartphone", "mobile"],
    category: "Objects",
    description: "mobile phone",
    unicode_version: "6.0"
  },
  {
    emoji: "📲",
    aliases: ["calling"],
    tags: ["call", "incoming"],
    category: "Objects",
    description: "mobile phone with arrow",
    unicode_version: "6.0"
  },
  {
    emoji: "☎️",
    aliases: ["phone", "telephone"],
    tags: [],
    category: "Objects",
    description: "telephone",
    unicode_version: ""
  },
  {
    emoji: "📞",
    aliases: ["telephone_receiver"],
    tags: ["phone", "call"],
    category: "Objects",
    description: "telephone receiver",
    unicode_version: "6.0"
  },
  {
    emoji: "📟",
    aliases: ["pager"],
    tags: [],
    category: "Objects",
    description: "pager",
    unicode_version: "6.0"
  },
  {
    emoji: "📠",
    aliases: ["fax"],
    tags: [],
    category: "Objects",
    description: "fax machine",
    unicode_version: "6.0"
  },
  {
    emoji: "🔋",
    aliases: ["battery"],
    tags: ["power"],
    category: "Objects",
    description: "battery",
    unicode_version: "6.0"
  },
  {
    emoji: "🔌",
    aliases: ["electric_plug"],
    tags: [],
    category: "Objects",
    description: "electric plug",
    unicode_version: "6.0"
  },
  {
    emoji: "💻",
    aliases: ["computer"],
    tags: ["desktop", "screen"],
    category: "Objects",
    description: "laptop",
    unicode_version: "6.0"
  },
  {
    emoji: "🖥️",
    aliases: ["desktop_computer"],
    tags: [],
    category: "Objects",
    description: "desktop computer",
    unicode_version: "7.0"
  },
  {
    emoji: "🖨️",
    aliases: ["printer"],
    tags: [],
    category: "Objects",
    description: "printer",
    unicode_version: "7.0"
  },
  {
    emoji: "⌨️",
    aliases: ["keyboard"],
    tags: [],
    category: "Objects",
    description: "keyboard",
    unicode_version: ""
  },
  {
    emoji: "🖱️",
    aliases: ["computer_mouse"],
    tags: [],
    category: "Objects",
    description: "computer mouse",
    unicode_version: "7.0"
  },
  {
    emoji: "🖲️",
    aliases: ["trackball"],
    tags: [],
    category: "Objects",
    description: "trackball",
    unicode_version: "7.0"
  },
  {
    emoji: "💽",
    aliases: ["minidisc"],
    tags: [],
    category: "Objects",
    description: "computer disk",
    unicode_version: "6.0"
  },
  {
    emoji: "💾",
    aliases: ["floppy_disk"],
    tags: ["save"],
    category: "Objects",
    description: "floppy disk",
    unicode_version: "6.0"
  },
  {
    emoji: "💿",
    aliases: ["cd"],
    tags: [],
    category: "Objects",
    description: "optical disk",
    unicode_version: "6.0"
  },
  {
    emoji: "📀",
    aliases: ["dvd"],
    tags: [],
    category: "Objects",
    description: "dvd",
    unicode_version: "6.0"
  },
  {
    emoji: "🧮",
    aliases: ["abacus"],
    tags: [],
    category: "Objects",
    description: "abacus",
    unicode_version: "11.0"
  },
  {
    emoji: "🎥",
    aliases: ["movie_camera"],
    tags: ["film", "video"],
    category: "Objects",
    description: "movie camera",
    unicode_version: "6.0"
  },
  {
    emoji: "🎞️",
    aliases: ["film_strip"],
    tags: [],
    category: "Objects",
    description: "film frames",
    unicode_version: "7.0"
  },
  {
    emoji: "📽️",
    aliases: ["film_projector"],
    tags: [],
    category: "Objects",
    description: "film projector",
    unicode_version: "7.0"
  },
  {
    emoji: "🎬",
    aliases: ["clapper"],
    tags: ["film"],
    category: "Objects",
    description: "clapper board",
    unicode_version: "6.0"
  },
  {
    emoji: "📺",
    aliases: ["tv"],
    tags: [],
    category: "Objects",
    description: "television",
    unicode_version: "6.0"
  },
  {
    emoji: "📷",
    aliases: ["camera"],
    tags: ["photo"],
    category: "Objects",
    description: "camera",
    unicode_version: "6.0"
  },
  {
    emoji: "📸",
    aliases: ["camera_flash"],
    tags: ["photo"],
    category: "Objects",
    description: "camera with flash",
    unicode_version: "7.0"
  },
  {
    emoji: "📹",
    aliases: ["video_camera"],
    tags: [],
    category: "Objects",
    description: "video camera",
    unicode_version: "6.0"
  },
  {
    emoji: "📼",
    aliases: ["vhs"],
    tags: [],
    category: "Objects",
    description: "videocassette",
    unicode_version: "6.0"
  },
  {
    emoji: "🔍",
    aliases: ["mag"],
    tags: ["search", "zoom"],
    category: "Objects",
    description: "magnifying glass tilted left",
    unicode_version: "6.0"
  },
  {
    emoji: "🔎",
    aliases: ["mag_right"],
    tags: [],
    category: "Objects",
    description: "magnifying glass tilted right",
    unicode_version: "6.0"
  },
  {
    emoji: "🕯️",
    aliases: ["candle"],
    tags: [],
    category: "Objects",
    description: "candle",
    unicode_version: "7.0"
  },
  {
    emoji: "💡",
    aliases: ["bulb"],
    tags: ["idea", "light"],
    category: "Objects",
    description: "light bulb",
    unicode_version: "6.0"
  },
  {
    emoji: "🔦",
    aliases: ["flashlight"],
    tags: [],
    category: "Objects",
    description: "flashlight",
    unicode_version: "6.0"
  },
  {
    emoji: "🏮",
    aliases: ["izakaya_lantern", "lantern"],
    tags: [],
    category: "Objects",
    description: "red paper lantern",
    unicode_version: "6.0"
  },
  {
    emoji: "🪔",
    aliases: ["diya_lamp"],
    tags: [],
    category: "Objects",
    description: "diya lamp",
    unicode_version: "12.0"
  },
  {
    emoji: "📔",
    aliases: ["notebook_with_decorative_cover"],
    tags: [],
    category: "Objects",
    description: "notebook with decorative cover",
    unicode_version: "6.0"
  },
  {
    emoji: "📕",
    aliases: ["closed_book"],
    tags: [],
    category: "Objects",
    description: "closed book",
    unicode_version: "6.0"
  },
  {
    emoji: "📖",
    aliases: ["book", "open_book"],
    tags: [],
    category: "Objects",
    description: "open book",
    unicode_version: "6.0"
  },
  {
    emoji: "📗",
    aliases: ["green_book"],
    tags: [],
    category: "Objects",
    description: "green book",
    unicode_version: "6.0"
  },
  {
    emoji: "📘",
    aliases: ["blue_book"],
    tags: [],
    category: "Objects",
    description: "blue book",
    unicode_version: "6.0"
  },
  {
    emoji: "📙",
    aliases: ["orange_book"],
    tags: [],
    category: "Objects",
    description: "orange book",
    unicode_version: "6.0"
  },
  {
    emoji: "📚",
    aliases: ["books"],
    tags: ["library"],
    category: "Objects",
    description: "books",
    unicode_version: "6.0"
  },
  {
    emoji: "📓",
    aliases: ["notebook"],
    tags: [],
    category: "Objects",
    description: "notebook",
    unicode_version: "6.0"
  },
  {
    emoji: "📒",
    aliases: ["ledger"],
    tags: [],
    category: "Objects",
    description: "ledger",
    unicode_version: "6.0"
  },
  {
    emoji: "📃",
    aliases: ["page_with_curl"],
    tags: [],
    category: "Objects",
    description: "page with curl",
    unicode_version: "6.0"
  },
  {
    emoji: "📜",
    aliases: ["scroll"],
    tags: ["document"],
    category: "Objects",
    description: "scroll",
    unicode_version: "6.0"
  },
  {
    emoji: "📄",
    aliases: ["page_facing_up"],
    tags: ["document"],
    category: "Objects",
    description: "page facing up",
    unicode_version: "6.0"
  },
  {
    emoji: "📰",
    aliases: ["newspaper"],
    tags: ["press"],
    category: "Objects",
    description: "newspaper",
    unicode_version: "6.0"
  },
  {
    emoji: "🗞️",
    aliases: ["newspaper_roll"],
    tags: ["press"],
    category: "Objects",
    description: "rolled-up newspaper",
    unicode_version: "7.0"
  },
  {
    emoji: "📑",
    aliases: ["bookmark_tabs"],
    tags: [],
    category: "Objects",
    description: "bookmark tabs",
    unicode_version: "6.0"
  },
  {
    emoji: "🔖",
    aliases: ["bookmark"],
    tags: [],
    category: "Objects",
    description: "bookmark",
    unicode_version: "6.0"
  },
  {
    emoji: "🏷️",
    aliases: ["label"],
    tags: ["tag"],
    category: "Objects",
    description: "label",
    unicode_version: "7.0"
  },
  {
    emoji: "💰",
    aliases: ["moneybag"],
    tags: ["dollar", "cream"],
    category: "Objects",
    description: "money bag",
    unicode_version: "6.0"
  },
  {
    emoji: "🪙",
    aliases: ["coin"],
    tags: [],
    category: "Objects",
    description: "coin",
    unicode_version: "13.0"
  },
  {
    emoji: "💴",
    aliases: ["yen"],
    tags: [],
    category: "Objects",
    description: "yen banknote",
    unicode_version: "6.0"
  },
  {
    emoji: "💵",
    aliases: ["dollar"],
    tags: ["money"],
    category: "Objects",
    description: "dollar banknote",
    unicode_version: "6.0"
  },
  {
    emoji: "💶",
    aliases: ["euro"],
    tags: [],
    category: "Objects",
    description: "euro banknote",
    unicode_version: "6.0"
  },
  {
    emoji: "💷",
    aliases: ["pound"],
    tags: [],
    category: "Objects",
    description: "pound banknote",
    unicode_version: "6.0"
  },
  {
    emoji: "💸",
    aliases: ["money_with_wings"],
    tags: ["dollar"],
    category: "Objects",
    description: "money with wings",
    unicode_version: "6.0"
  },
  {
    emoji: "💳",
    aliases: ["credit_card"],
    tags: ["subscription"],
    category: "Objects",
    description: "credit card",
    unicode_version: "6.0"
  },
  {
    emoji: "🧾",
    aliases: ["receipt"],
    tags: [],
    category: "Objects",
    description: "receipt",
    unicode_version: "11.0"
  },
  {
    emoji: "💹",
    aliases: ["chart"],
    tags: [],
    category: "Objects",
    description: "chart increasing with yen",
    unicode_version: "6.0"
  },
  {
    emoji: "✉️",
    aliases: ["envelope"],
    tags: ["letter", "email"],
    category: "Objects",
    description: "envelope",
    unicode_version: ""
  },
  {
    emoji: "📧",
    aliases: ["email", "e-mail"],
    tags: [],
    category: "Objects",
    description: "e-mail",
    unicode_version: "6.0"
  },
  {
    emoji: "📨",
    aliases: ["incoming_envelope"],
    tags: [],
    category: "Objects",
    description: "incoming envelope",
    unicode_version: "6.0"
  },
  {
    emoji: "📩",
    aliases: ["envelope_with_arrow"],
    tags: [],
    category: "Objects",
    description: "envelope with arrow",
    unicode_version: "6.0"
  },
  {
    emoji: "📤",
    aliases: ["outbox_tray"],
    tags: [],
    category: "Objects",
    description: "outbox tray",
    unicode_version: "6.0"
  },
  {
    emoji: "📥",
    aliases: ["inbox_tray"],
    tags: [],
    category: "Objects",
    description: "inbox tray",
    unicode_version: "6.0"
  },
  {
    emoji: "📦",
    aliases: ["package"],
    tags: ["shipping"],
    category: "Objects",
    description: "package",
    unicode_version: "6.0"
  },
  {
    emoji: "📫",
    aliases: ["mailbox"],
    tags: [],
    category: "Objects",
    description: "closed mailbox with raised flag",
    unicode_version: "6.0"
  },
  {
    emoji: "📪",
    aliases: ["mailbox_closed"],
    tags: [],
    category: "Objects",
    description: "closed mailbox with lowered flag",
    unicode_version: "6.0"
  },
  {
    emoji: "📬",
    aliases: ["mailbox_with_mail"],
    tags: [],
    category: "Objects",
    description: "open mailbox with raised flag",
    unicode_version: "6.0"
  },
  {
    emoji: "📭",
    aliases: ["mailbox_with_no_mail"],
    tags: [],
    category: "Objects",
    description: "open mailbox with lowered flag",
    unicode_version: "6.0"
  },
  {
    emoji: "📮",
    aliases: ["postbox"],
    tags: [],
    category: "Objects",
    description: "postbox",
    unicode_version: "6.0"
  },
  {
    emoji: "🗳️",
    aliases: ["ballot_box"],
    tags: [],
    category: "Objects",
    description: "ballot box with ballot",
    unicode_version: "7.0"
  },
  {
    emoji: "✏️",
    aliases: ["pencil2"],
    tags: [],
    category: "Objects",
    description: "pencil",
    unicode_version: ""
  },
  {
    emoji: "✒️",
    aliases: ["black_nib"],
    tags: [],
    category: "Objects",
    description: "black nib",
    unicode_version: ""
  },
  {
    emoji: "🖋️",
    aliases: ["fountain_pen"],
    tags: [],
    category: "Objects",
    description: "fountain pen",
    unicode_version: "7.0"
  },
  {
    emoji: "🖊️",
    aliases: ["pen"],
    tags: [],
    category: "Objects",
    description: "pen",
    unicode_version: "7.0"
  },
  {
    emoji: "🖌️",
    aliases: ["paintbrush"],
    tags: [],
    category: "Objects",
    description: "paintbrush",
    unicode_version: "7.0"
  },
  {
    emoji: "🖍️",
    aliases: ["crayon"],
    tags: [],
    category: "Objects",
    description: "crayon",
    unicode_version: "7.0"
  },
  {
    emoji: "📝",
    aliases: ["memo", "pencil"],
    tags: ["document", "note"],
    category: "Objects",
    description: "memo",
    unicode_version: "6.0"
  },
  {
    emoji: "💼",
    aliases: ["briefcase"],
    tags: ["business"],
    category: "Objects",
    description: "briefcase",
    unicode_version: "6.0"
  },
  {
    emoji: "📁",
    aliases: ["file_folder"],
    tags: ["directory"],
    category: "Objects",
    description: "file folder",
    unicode_version: "6.0"
  },
  {
    emoji: "📂",
    aliases: ["open_file_folder"],
    tags: [],
    category: "Objects",
    description: "open file folder",
    unicode_version: "6.0"
  },
  {
    emoji: "🗂️",
    aliases: ["card_index_dividers"],
    tags: [],
    category: "Objects",
    description: "card index dividers",
    unicode_version: "7.0"
  },
  {
    emoji: "📅",
    aliases: ["date"],
    tags: ["calendar", "schedule"],
    category: "Objects",
    description: "calendar",
    unicode_version: "6.0"
  },
  {
    emoji: "📆",
    aliases: ["calendar"],
    tags: ["schedule"],
    category: "Objects",
    description: "tear-off calendar",
    unicode_version: "6.0"
  },
  {
    emoji: "🗒️",
    aliases: ["spiral_notepad"],
    tags: [],
    category: "Objects",
    description: "spiral notepad",
    unicode_version: "7.0"
  },
  {
    emoji: "🗓️",
    aliases: ["spiral_calendar"],
    tags: [],
    category: "Objects",
    description: "spiral calendar",
    unicode_version: "7.0"
  },
  {
    emoji: "📇",
    aliases: ["card_index"],
    tags: [],
    category: "Objects",
    description: "card index",
    unicode_version: "6.0"
  },
  {
    emoji: "📈",
    aliases: ["chart_with_upwards_trend"],
    tags: ["graph", "metrics"],
    category: "Objects",
    description: "chart increasing",
    unicode_version: "6.0"
  },
  {
    emoji: "📉",
    aliases: ["chart_with_downwards_trend"],
    tags: ["graph", "metrics"],
    category: "Objects",
    description: "chart decreasing",
    unicode_version: "6.0"
  },
  {
    emoji: "📊",
    aliases: ["bar_chart"],
    tags: ["stats", "metrics"],
    category: "Objects",
    description: "bar chart",
    unicode_version: "6.0"
  },
  {
    emoji: "📋",
    aliases: ["clipboard"],
    tags: [],
    category: "Objects",
    description: "clipboard",
    unicode_version: "6.0"
  },
  {
    emoji: "📌",
    aliases: ["pushpin"],
    tags: ["location"],
    category: "Objects",
    description: "pushpin",
    unicode_version: "6.0"
  },
  {
    emoji: "📍",
    aliases: ["round_pushpin"],
    tags: ["location"],
    category: "Objects",
    description: "round pushpin",
    unicode_version: "6.0"
  },
  {
    emoji: "📎",
    aliases: ["paperclip"],
    tags: [],
    category: "Objects",
    description: "paperclip",
    unicode_version: "6.0"
  },
  {
    emoji: "🖇️",
    aliases: ["paperclips"],
    tags: [],
    category: "Objects",
    description: "linked paperclips",
    unicode_version: "7.0"
  },
  {
    emoji: "📏",
    aliases: ["straight_ruler"],
    tags: [],
    category: "Objects",
    description: "straight ruler",
    unicode_version: "6.0"
  },
  {
    emoji: "📐",
    aliases: ["triangular_ruler"],
    tags: [],
    category: "Objects",
    description: "triangular ruler",
    unicode_version: "6.0"
  },
  {
    emoji: "✂️",
    aliases: ["scissors"],
    tags: ["cut"],
    category: "Objects",
    description: "scissors",
    unicode_version: ""
  },
  {
    emoji: "🗃️",
    aliases: ["card_file_box"],
    tags: [],
    category: "Objects",
    description: "card file box",
    unicode_version: "7.0"
  },
  {
    emoji: "🗄️",
    aliases: ["file_cabinet"],
    tags: [],
    category: "Objects",
    description: "file cabinet",
    unicode_version: "7.0"
  },
  {
    emoji: "🗑️",
    aliases: ["wastebasket"],
    tags: ["trash"],
    category: "Objects",
    description: "wastebasket",
    unicode_version: "7.0"
  },
  {
    emoji: "🔒",
    aliases: ["lock"],
    tags: ["security", "private"],
    category: "Objects",
    description: "locked",
    unicode_version: "6.0"
  },
  {
    emoji: "🔓",
    aliases: ["unlock"],
    tags: ["security"],
    category: "Objects",
    description: "unlocked",
    unicode_version: "6.0"
  },
  {
    emoji: "🔏",
    aliases: ["lock_with_ink_pen"],
    tags: [],
    category: "Objects",
    description: "locked with pen",
    unicode_version: "6.0"
  },
  {
    emoji: "🔐",
    aliases: ["closed_lock_with_key"],
    tags: ["security"],
    category: "Objects",
    description: "locked with key",
    unicode_version: "6.0"
  },
  {
    emoji: "🔑",
    aliases: ["key"],
    tags: ["lock", "password"],
    category: "Objects",
    description: "key",
    unicode_version: "6.0"
  },
  {
    emoji: "🗝️",
    aliases: ["old_key"],
    tags: [],
    category: "Objects",
    description: "old key",
    unicode_version: "7.0"
  },
  {
    emoji: "🔨",
    aliases: ["hammer"],
    tags: ["tool"],
    category: "Objects",
    description: "hammer",
    unicode_version: "6.0"
  },
  {
    emoji: "🪓",
    aliases: ["axe"],
    tags: [],
    category: "Objects",
    description: "axe",
    unicode_version: "12.0"
  },
  {
    emoji: "⛏️",
    aliases: ["pick"],
    tags: [],
    category: "Objects",
    description: "pick",
    unicode_version: "5.2"
  },
  {
    emoji: "⚒️",
    aliases: ["hammer_and_pick"],
    tags: [],
    category: "Objects",
    description: "hammer and pick",
    unicode_version: "4.1"
  },
  {
    emoji: "🛠️",
    aliases: ["hammer_and_wrench"],
    tags: [],
    category: "Objects",
    description: "hammer and wrench",
    unicode_version: "7.0"
  },
  {
    emoji: "🗡️",
    aliases: ["dagger"],
    tags: [],
    category: "Objects",
    description: "dagger",
    unicode_version: "7.0"
  },
  {
    emoji: "⚔️",
    aliases: ["crossed_swords"],
    tags: [],
    category: "Objects",
    description: "crossed swords",
    unicode_version: "4.1"
  },
  {
    emoji: "🔫",
    aliases: ["gun"],
    tags: ["shoot", "weapon"],
    category: "Objects",
    description: "water pistol",
    unicode_version: "6.0"
  },
  {
    emoji: "🪃",
    aliases: ["boomerang"],
    tags: [],
    category: "Objects",
    description: "boomerang",
    unicode_version: "13.0"
  },
  {
    emoji: "🏹",
    aliases: ["bow_and_arrow"],
    tags: ["archery"],
    category: "Objects",
    description: "bow and arrow",
    unicode_version: "8.0"
  },
  {
    emoji: "🛡️",
    aliases: ["shield"],
    tags: [],
    category: "Objects",
    description: "shield",
    unicode_version: "7.0"
  },
  {
    emoji: "🪚",
    aliases: ["carpentry_saw"],
    tags: [],
    category: "Objects",
    description: "carpentry saw",
    unicode_version: "13.0"
  },
  {
    emoji: "🔧",
    aliases: ["wrench"],
    tags: ["tool"],
    category: "Objects",
    description: "wrench",
    unicode_version: "6.0"
  },
  {
    emoji: "🪛",
    aliases: ["screwdriver"],
    tags: [],
    category: "Objects",
    description: "screwdriver",
    unicode_version: "13.0"
  },
  {
    emoji: "🔩",
    aliases: ["nut_and_bolt"],
    tags: [],
    category: "Objects",
    description: "nut and bolt",
    unicode_version: "6.0"
  },
  {
    emoji: "⚙️",
    aliases: ["gear"],
    tags: [],
    category: "Objects",
    description: "gear",
    unicode_version: "4.1"
  },
  {
    emoji: "🗜️",
    aliases: ["clamp"],
    tags: [],
    category: "Objects",
    description: "clamp",
    unicode_version: "7.0"
  },
  {
    emoji: "⚖️",
    aliases: ["balance_scale"],
    tags: [],
    category: "Objects",
    description: "balance scale",
    unicode_version: "4.1"
  },
  {
    emoji: "🦯",
    aliases: ["probing_cane"],
    tags: [],
    category: "Objects",
    description: "white cane",
    unicode_version: "12.0"
  },
  {
    emoji: "🔗",
    aliases: ["link"],
    tags: [],
    category: "Objects",
    description: "link",
    unicode_version: "6.0"
  },
  {
    emoji: "⛓️",
    aliases: ["chains"],
    tags: [],
    category: "Objects",
    description: "chains",
    unicode_version: "5.2"
  },
  {
    emoji: "🪝",
    aliases: ["hook"],
    tags: [],
    category: "Objects",
    description: "hook",
    unicode_version: "13.0"
  },
  {
    emoji: "🧰",
    aliases: ["toolbox"],
    tags: [],
    category: "Objects",
    description: "toolbox",
    unicode_version: "11.0"
  },
  {
    emoji: "🧲",
    aliases: ["magnet"],
    tags: [],
    category: "Objects",
    description: "magnet",
    unicode_version: "11.0"
  },
  {
    emoji: "🪜",
    aliases: ["ladder"],
    tags: [],
    category: "Objects",
    description: "ladder",
    unicode_version: "13.0"
  },
  {
    emoji: "⚗️",
    aliases: ["alembic"],
    tags: [],
    category: "Objects",
    description: "alembic",
    unicode_version: "4.1"
  },
  {
    emoji: "🧪",
    aliases: ["test_tube"],
    tags: [],
    category: "Objects",
    description: "test tube",
    unicode_version: "11.0"
  },
  {
    emoji: "🧫",
    aliases: ["petri_dish"],
    tags: [],
    category: "Objects",
    description: "petri dish",
    unicode_version: "11.0"
  },
  {
    emoji: "🧬",
    aliases: ["dna"],
    tags: [],
    category: "Objects",
    description: "dna",
    unicode_version: "11.0"
  },
  {
    emoji: "🔬",
    aliases: ["microscope"],
    tags: ["science", "laboratory", "investigate"],
    category: "Objects",
    description: "microscope",
    unicode_version: "6.0"
  },
  {
    emoji: "🔭",
    aliases: ["telescope"],
    tags: [],
    category: "Objects",
    description: "telescope",
    unicode_version: "6.0"
  },
  {
    emoji: "📡",
    aliases: ["satellite"],
    tags: ["signal"],
    category: "Objects",
    description: "satellite antenna",
    unicode_version: "6.0"
  },
  {
    emoji: "💉",
    aliases: ["syringe"],
    tags: ["health", "hospital", "needle"],
    category: "Objects",
    description: "syringe",
    unicode_version: "6.0"
  },
  {
    emoji: "🩸",
    aliases: ["drop_of_blood"],
    tags: [],
    category: "Objects",
    description: "drop of blood",
    unicode_version: "12.0"
  },
  {
    emoji: "💊",
    aliases: ["pill"],
    tags: ["health", "medicine"],
    category: "Objects",
    description: "pill",
    unicode_version: "6.0"
  },
  {
    emoji: "🩹",
    aliases: ["adhesive_bandage"],
    tags: [],
    category: "Objects",
    description: "adhesive bandage",
    unicode_version: "12.0"
  },
  {
    emoji: "🩺",
    aliases: ["stethoscope"],
    tags: [],
    category: "Objects",
    description: "stethoscope",
    unicode_version: "12.0"
  },
  {
    emoji: "🚪",
    aliases: ["door"],
    tags: [],
    category: "Objects",
    description: "door",
    unicode_version: "6.0"
  },
  {
    emoji: "🛗",
    aliases: ["elevator"],
    tags: [],
    category: "Objects",
    description: "elevator",
    unicode_version: "13.0"
  },
  {
    emoji: "🪞",
    aliases: ["mirror"],
    tags: [],
    category: "Objects",
    description: "mirror",
    unicode_version: "13.0"
  },
  {
    emoji: "🪟",
    aliases: ["window"],
    tags: [],
    category: "Objects",
    description: "window",
    unicode_version: "13.0"
  },
  {
    emoji: "🛏️",
    aliases: ["bed"],
    tags: [],
    category: "Objects",
    description: "bed",
    unicode_version: "7.0"
  },
  {
    emoji: "🛋️",
    aliases: ["couch_and_lamp"],
    tags: [],
    category: "Objects",
    description: "couch and lamp",
    unicode_version: "7.0"
  },
  {
    emoji: "🪑",
    aliases: ["chair"],
    tags: [],
    category: "Objects",
    description: "chair",
    unicode_version: "12.0"
  },
  {
    emoji: "🚽",
    aliases: ["toilet"],
    tags: ["wc"],
    category: "Objects",
    description: "toilet",
    unicode_version: "6.0"
  },
  {
    emoji: "🪠",
    aliases: ["plunger"],
    tags: [],
    category: "Objects",
    description: "plunger",
    unicode_version: "13.0"
  },
  {
    emoji: "🚿",
    aliases: ["shower"],
    tags: ["bath"],
    category: "Objects",
    description: "shower",
    unicode_version: "6.0"
  },
  {
    emoji: "🛁",
    aliases: ["bathtub"],
    tags: [],
    category: "Objects",
    description: "bathtub",
    unicode_version: "6.0"
  },
  {
    emoji: "🪤",
    aliases: ["mouse_trap"],
    tags: [],
    category: "Objects",
    description: "mouse trap",
    unicode_version: "13.0"
  },
  {
    emoji: "🪒",
    aliases: ["razor"],
    tags: [],
    category: "Objects",
    description: "razor",
    unicode_version: "12.0"
  },
  {
    emoji: "🧴",
    aliases: ["lotion_bottle"],
    tags: [],
    category: "Objects",
    description: "lotion bottle",
    unicode_version: "11.0"
  },
  {
    emoji: "🧷",
    aliases: ["safety_pin"],
    tags: [],
    category: "Objects",
    description: "safety pin",
    unicode_version: "11.0"
  },
  {
    emoji: "🧹",
    aliases: ["broom"],
    tags: [],
    category: "Objects",
    description: "broom",
    unicode_version: "11.0"
  },
  {
    emoji: "🧺",
    aliases: ["basket"],
    tags: [],
    category: "Objects",
    description: "basket",
    unicode_version: "11.0"
  },
  {
    emoji: "🧻",
    aliases: ["roll_of_paper"],
    tags: ["toilet"],
    category: "Objects",
    description: "roll of paper",
    unicode_version: "11.0"
  },
  {
    emoji: "🪣",
    aliases: ["bucket"],
    tags: [],
    category: "Objects",
    description: "bucket",
    unicode_version: "13.0"
  },
  {
    emoji: "🧼",
    aliases: ["soap"],
    tags: [],
    category: "Objects",
    description: "soap",
    unicode_version: "11.0"
  },
  {
    emoji: "🪥",
    aliases: ["toothbrush"],
    tags: [],
    category: "Objects",
    description: "toothbrush",
    unicode_version: "13.0"
  },
  {
    emoji: "🧽",
    aliases: ["sponge"],
    tags: [],
    category: "Objects",
    description: "sponge",
    unicode_version: "11.0"
  },
  {
    emoji: "🧯",
    aliases: ["fire_extinguisher"],
    tags: [],
    category: "Objects",
    description: "fire extinguisher",
    unicode_version: "11.0"
  },
  {
    emoji: "🛒",
    aliases: ["shopping_cart"],
    tags: [],
    category: "Objects",
    description: "shopping cart",
    unicode_version: "9.0"
  },
  {
    emoji: "🚬",
    aliases: ["smoking"],
    tags: ["cigarette"],
    category: "Objects",
    description: "cigarette",
    unicode_version: "6.0"
  },
  {
    emoji: "⚰️",
    aliases: ["coffin"],
    tags: ["funeral"],
    category: "Objects",
    description: "coffin",
    unicode_version: "4.1"
  },
  {
    emoji: "🪦",
    aliases: ["headstone"],
    tags: [],
    category: "Objects",
    description: "headstone",
    unicode_version: "13.0"
  },
  {
    emoji: "⚱️",
    aliases: ["funeral_urn"],
    tags: [],
    category: "Objects",
    description: "funeral urn",
    unicode_version: "4.1"
  },
  {
    emoji: "🗿",
    aliases: ["moyai"],
    tags: ["stone"],
    category: "Objects",
    description: "moai",
    unicode_version: "6.0"
  },
  {
    emoji: "🪧",
    aliases: ["placard"],
    tags: [],
    category: "Objects",
    description: "placard",
    unicode_version: "13.0"
  },
  {
    emoji: "🏧",
    aliases: ["atm"],
    tags: [],
    category: "Symbols",
    description: "ATM sign",
    unicode_version: "6.0"
  },
  {
    emoji: "🚮",
    aliases: ["put_litter_in_its_place"],
    tags: [],
    category: "Symbols",
    description: "litter in bin sign",
    unicode_version: "6.0"
  },
  {
    emoji: "🚰",
    aliases: ["potable_water"],
    tags: [],
    category: "Symbols",
    description: "potable water",
    unicode_version: "6.0"
  },
  {
    emoji: "♿",
    aliases: ["wheelchair"],
    tags: ["accessibility"],
    category: "Symbols",
    description: "wheelchair symbol",
    unicode_version: "4.1"
  },
  {
    emoji: "🚹",
    aliases: ["mens"],
    tags: [],
    category: "Symbols",
    description: "men’s room",
    unicode_version: "6.0"
  },
  {
    emoji: "🚺",
    aliases: ["womens"],
    tags: [],
    category: "Symbols",
    description: "women’s room",
    unicode_version: "6.0"
  },
  {
    emoji: "🚻",
    aliases: ["restroom"],
    tags: ["toilet"],
    category: "Symbols",
    description: "restroom",
    unicode_version: "6.0"
  },
  {
    emoji: "🚼",
    aliases: ["baby_symbol"],
    tags: [],
    category: "Symbols",
    description: "baby symbol",
    unicode_version: "6.0"
  },
  {
    emoji: "🚾",
    aliases: ["wc"],
    tags: ["toilet", "restroom"],
    category: "Symbols",
    description: "water closet",
    unicode_version: "6.0"
  },
  {
    emoji: "🛂",
    aliases: ["passport_control"],
    tags: [],
    category: "Symbols",
    description: "passport control",
    unicode_version: "6.0"
  },
  {
    emoji: "🛃",
    aliases: ["customs"],
    tags: [],
    category: "Symbols",
    description: "customs",
    unicode_version: "6.0"
  },
  {
    emoji: "🛄",
    aliases: ["baggage_claim"],
    tags: ["airport"],
    category: "Symbols",
    description: "baggage claim",
    unicode_version: "6.0"
  },
  {
    emoji: "🛅",
    aliases: ["left_luggage"],
    tags: [],
    category: "Symbols",
    description: "left luggage",
    unicode_version: "6.0"
  },
  {
    emoji: "⚠️",
    aliases: ["warning"],
    tags: ["wip"],
    category: "Symbols",
    description: "warning",
    unicode_version: "4.0"
  },
  {
    emoji: "🚸",
    aliases: ["children_crossing"],
    tags: [],
    category: "Symbols",
    description: "children crossing",
    unicode_version: "6.0"
  },
  {
    emoji: "⛔",
    aliases: ["no_entry"],
    tags: ["limit"],
    category: "Symbols",
    description: "no entry",
    unicode_version: "5.2"
  },
  {
    emoji: "🚫",
    aliases: ["no_entry_sign"],
    tags: ["block", "forbidden"],
    category: "Symbols",
    description: "prohibited",
    unicode_version: "6.0"
  },
  {
    emoji: "🚳",
    aliases: ["no_bicycles"],
    tags: [],
    category: "Symbols",
    description: "no bicycles",
    unicode_version: "6.0"
  },
  {
    emoji: "🚭",
    aliases: ["no_smoking"],
    tags: [],
    category: "Symbols",
    description: "no smoking",
    unicode_version: "6.0"
  },
  {
    emoji: "🚯",
    aliases: ["do_not_litter"],
    tags: [],
    category: "Symbols",
    description: "no littering",
    unicode_version: "6.0"
  },
  {
    emoji: "🚱",
    aliases: ["non-potable_water"],
    tags: [],
    category: "Symbols",
    description: "non-potable water",
    unicode_version: "6.0"
  },
  {
    emoji: "🚷",
    aliases: ["no_pedestrians"],
    tags: [],
    category: "Symbols",
    description: "no pedestrians",
    unicode_version: "6.0"
  },
  {
    emoji: "📵",
    aliases: ["no_mobile_phones"],
    tags: [],
    category: "Symbols",
    description: "no mobile phones",
    unicode_version: "6.0"
  },
  {
    emoji: "🔞",
    aliases: ["underage"],
    tags: [],
    category: "Symbols",
    description: "no one under eighteen",
    unicode_version: "6.0"
  },
  {
    emoji: "☢️",
    aliases: ["radioactive"],
    tags: [],
    category: "Symbols",
    description: "radioactive",
    unicode_version: ""
  },
  {
    emoji: "☣️",
    aliases: ["biohazard"],
    tags: [],
    category: "Symbols",
    description: "biohazard",
    unicode_version: ""
  },
  {
    emoji: "⬆️",
    aliases: ["arrow_up"],
    tags: [],
    category: "Symbols",
    description: "up arrow",
    unicode_version: "4.0"
  },
  {
    emoji: "↗️",
    aliases: ["arrow_upper_right"],
    tags: [],
    category: "Symbols",
    description: "up-right arrow",
    unicode_version: ""
  },
  {
    emoji: "➡️",
    aliases: ["arrow_right"],
    tags: [],
    category: "Symbols",
    description: "right arrow",
    unicode_version: ""
  },
  {
    emoji: "↘️",
    aliases: ["arrow_lower_right"],
    tags: [],
    category: "Symbols",
    description: "down-right arrow",
    unicode_version: ""
  },
  {
    emoji: "⬇️",
    aliases: ["arrow_down"],
    tags: [],
    category: "Symbols",
    description: "down arrow",
    unicode_version: "4.0"
  },
  {
    emoji: "↙️",
    aliases: ["arrow_lower_left"],
    tags: [],
    category: "Symbols",
    description: "down-left arrow",
    unicode_version: ""
  },
  {
    emoji: "⬅️",
    aliases: ["arrow_left"],
    tags: [],
    category: "Symbols",
    description: "left arrow",
    unicode_version: "4.0"
  },
  {
    emoji: "↖️",
    aliases: ["arrow_upper_left"],
    tags: [],
    category: "Symbols",
    description: "up-left arrow",
    unicode_version: ""
  },
  {
    emoji: "↕️",
    aliases: ["arrow_up_down"],
    tags: [],
    category: "Symbols",
    description: "up-down arrow",
    unicode_version: ""
  },
  {
    emoji: "↔️",
    aliases: ["left_right_arrow"],
    tags: [],
    category: "Symbols",
    description: "left-right arrow",
    unicode_version: ""
  },
  {
    emoji: "↩️",
    aliases: ["leftwards_arrow_with_hook"],
    tags: ["return"],
    category: "Symbols",
    description: "right arrow curving left",
    unicode_version: ""
  },
  {
    emoji: "↪️",
    aliases: ["arrow_right_hook"],
    tags: [],
    category: "Symbols",
    description: "left arrow curving right",
    unicode_version: ""
  },
  {
    emoji: "⤴️",
    aliases: ["arrow_heading_up"],
    tags: [],
    category: "Symbols",
    description: "right arrow curving up",
    unicode_version: ""
  },
  {
    emoji: "⤵️",
    aliases: ["arrow_heading_down"],
    tags: [],
    category: "Symbols",
    description: "right arrow curving down",
    unicode_version: ""
  },
  {
    emoji: "🔃",
    aliases: ["arrows_clockwise"],
    tags: [],
    category: "Symbols",
    description: "clockwise vertical arrows",
    unicode_version: "6.0"
  },
  {
    emoji: "🔄",
    aliases: ["arrows_counterclockwise"],
    tags: ["sync"],
    category: "Symbols",
    description: "counterclockwise arrows button",
    unicode_version: "6.0"
  },
  {
    emoji: "🔙",
    aliases: ["back"],
    tags: [],
    category: "Symbols",
    description: "BACK arrow",
    unicode_version: "6.0"
  },
  {
    emoji: "🔚",
    aliases: ["end"],
    tags: [],
    category: "Symbols",
    description: "END arrow",
    unicode_version: "6.0"
  },
  {
    emoji: "🔛",
    aliases: ["on"],
    tags: [],
    category: "Symbols",
    description: "ON! arrow",
    unicode_version: "6.0"
  },
  {
    emoji: "🔜",
    aliases: ["soon"],
    tags: [],
    category: "Symbols",
    description: "SOON arrow",
    unicode_version: "6.0"
  },
  {
    emoji: "🔝",
    aliases: ["top"],
    tags: [],
    category: "Symbols",
    description: "TOP arrow",
    unicode_version: "6.0"
  },
  {
    emoji: "🛐",
    aliases: ["place_of_worship"],
    tags: [],
    category: "Symbols",
    description: "place of worship",
    unicode_version: "8.0"
  },
  {
    emoji: "⚛️",
    aliases: ["atom_symbol"],
    tags: [],
    category: "Symbols",
    description: "atom symbol",
    unicode_version: "4.1"
  },
  {
    emoji: "🕉️",
    aliases: ["om"],
    tags: [],
    category: "Symbols",
    description: "om",
    unicode_version: "7.0"
  },
  {
    emoji: "✡️",
    aliases: ["star_of_david"],
    tags: [],
    category: "Symbols",
    description: "star of David",
    unicode_version: ""
  },
  {
    emoji: "☸️",
    aliases: ["wheel_of_dharma"],
    tags: [],
    category: "Symbols",
    description: "wheel of dharma",
    unicode_version: ""
  },
  {
    emoji: "☯️",
    aliases: ["yin_yang"],
    tags: [],
    category: "Symbols",
    description: "yin yang",
    unicode_version: ""
  },
  {
    emoji: "✝️",
    aliases: ["latin_cross"],
    tags: [],
    category: "Symbols",
    description: "latin cross",
    unicode_version: ""
  },
  {
    emoji: "☦️",
    aliases: ["orthodox_cross"],
    tags: [],
    category: "Symbols",
    description: "orthodox cross",
    unicode_version: ""
  },
  {
    emoji: "☪️",
    aliases: ["star_and_crescent"],
    tags: [],
    category: "Symbols",
    description: "star and crescent",
    unicode_version: ""
  },
  {
    emoji: "☮️",
    aliases: ["peace_symbol"],
    tags: [],
    category: "Symbols",
    description: "peace symbol",
    unicode_version: ""
  },
  {
    emoji: "🕎",
    aliases: ["menorah"],
    tags: [],
    category: "Symbols",
    description: "menorah",
    unicode_version: "8.0"
  },
  {
    emoji: "🔯",
    aliases: ["six_pointed_star"],
    tags: [],
    category: "Symbols",
    description: "dotted six-pointed star",
    unicode_version: "6.0"
  },
  {
    emoji: "♈",
    aliases: ["aries"],
    tags: [],
    category: "Symbols",
    description: "Aries",
    unicode_version: ""
  },
  {
    emoji: "♉",
    aliases: ["taurus"],
    tags: [],
    category: "Symbols",
    description: "Taurus",
    unicode_version: ""
  },
  {
    emoji: "♊",
    aliases: ["gemini"],
    tags: [],
    category: "Symbols",
    description: "Gemini",
    unicode_version: ""
  },
  {
    emoji: "♋",
    aliases: ["cancer"],
    tags: [],
    category: "Symbols",
    description: "Cancer",
    unicode_version: ""
  },
  {
    emoji: "♌",
    aliases: ["leo"],
    tags: [],
    category: "Symbols",
    description: "Leo",
    unicode_version: ""
  },
  {
    emoji: "♍",
    aliases: ["virgo"],
    tags: [],
    category: "Symbols",
    description: "Virgo",
    unicode_version: ""
  },
  {
    emoji: "♎",
    aliases: ["libra"],
    tags: [],
    category: "Symbols",
    description: "Libra",
    unicode_version: ""
  },
  {
    emoji: "♏",
    aliases: ["scorpius"],
    tags: [],
    category: "Symbols",
    description: "Scorpio",
    unicode_version: ""
  },
  {
    emoji: "♐",
    aliases: ["sagittarius"],
    tags: [],
    category: "Symbols",
    description: "Sagittarius",
    unicode_version: ""
  },
  {
    emoji: "♑",
    aliases: ["capricorn"],
    tags: [],
    category: "Symbols",
    description: "Capricorn",
    unicode_version: ""
  },
  {
    emoji: "♒",
    aliases: ["aquarius"],
    tags: [],
    category: "Symbols",
    description: "Aquarius",
    unicode_version: ""
  },
  {
    emoji: "♓",
    aliases: ["pisces"],
    tags: [],
    category: "Symbols",
    description: "Pisces",
    unicode_version: ""
  },
  {
    emoji: "⛎",
    aliases: ["ophiuchus"],
    tags: [],
    category: "Symbols",
    description: "Ophiuchus",
    unicode_version: "6.0"
  },
  {
    emoji: "🔀",
    aliases: ["twisted_rightwards_arrows"],
    tags: ["shuffle"],
    category: "Symbols",
    description: "shuffle tracks button",
    unicode_version: "6.0"
  },
  {
    emoji: "🔁",
    aliases: ["repeat"],
    tags: ["loop"],
    category: "Symbols",
    description: "repeat button",
    unicode_version: "6.0"
  },
  {
    emoji: "🔂",
    aliases: ["repeat_one"],
    tags: [],
    category: "Symbols",
    description: "repeat single button",
    unicode_version: "6.0"
  },
  {
    emoji: "▶️",
    aliases: ["arrow_forward"],
    tags: [],
    category: "Symbols",
    description: "play button",
    unicode_version: ""
  },
  {
    emoji: "⏩",
    aliases: ["fast_forward"],
    tags: [],
    category: "Symbols",
    description: "fast-forward button",
    unicode_version: "6.0"
  },
  {
    emoji: "⏭️",
    aliases: ["next_track_button"],
    tags: [],
    category: "Symbols",
    description: "next track button",
    unicode_version: "6.0"
  },
  {
    emoji: "⏯️",
    aliases: ["play_or_pause_button"],
    tags: [],
    category: "Symbols",
    description: "play or pause button",
    unicode_version: "6.0"
  },
  {
    emoji: "◀️",
    aliases: ["arrow_backward"],
    tags: [],
    category: "Symbols",
    description: "reverse button",
    unicode_version: ""
  },
  {
    emoji: "⏪",
    aliases: ["rewind"],
    tags: [],
    category: "Symbols",
    description: "fast reverse button",
    unicode_version: "6.0"
  },
  {
    emoji: "⏮️",
    aliases: ["previous_track_button"],
    tags: [],
    category: "Symbols",
    description: "last track button",
    unicode_version: "6.0"
  },
  {
    emoji: "🔼",
    aliases: ["arrow_up_small"],
    tags: [],
    category: "Symbols",
    description: "upwards button",
    unicode_version: "6.0"
  },
  {
    emoji: "⏫",
    aliases: ["arrow_double_up"],
    tags: [],
    category: "Symbols",
    description: "fast up button",
    unicode_version: "6.0"
  },
  {
    emoji: "🔽",
    aliases: ["arrow_down_small"],
    tags: [],
    category: "Symbols",
    description: "downwards button",
    unicode_version: "6.0"
  },
  {
    emoji: "⏬",
    aliases: ["arrow_double_down"],
    tags: [],
    category: "Symbols",
    description: "fast down button",
    unicode_version: "6.0"
  },
  {
    emoji: "⏸️",
    aliases: ["pause_button"],
    tags: [],
    category: "Symbols",
    description: "pause button",
    unicode_version: "7.0"
  },
  {
    emoji: "⏹️",
    aliases: ["stop_button"],
    tags: [],
    category: "Symbols",
    description: "stop button",
    unicode_version: "7.0"
  },
  {
    emoji: "⏺️",
    aliases: ["record_button"],
    tags: [],
    category: "Symbols",
    description: "record button",
    unicode_version: "7.0"
  },
  {
    emoji: "⏏️",
    aliases: ["eject_button"],
    tags: [],
    category: "Symbols",
    description: "eject button",
    unicode_version: "11.0"
  },
  {
    emoji: "🎦",
    aliases: ["cinema"],
    tags: ["film", "movie"],
    category: "Symbols",
    description: "cinema",
    unicode_version: "6.0"
  },
  {
    emoji: "🔅",
    aliases: ["low_brightness"],
    tags: [],
    category: "Symbols",
    description: "dim button",
    unicode_version: "6.0"
  },
  {
    emoji: "🔆",
    aliases: ["high_brightness"],
    tags: [],
    category: "Symbols",
    description: "bright button",
    unicode_version: "6.0"
  },
  {
    emoji: "📶",
    aliases: ["signal_strength"],
    tags: ["wifi"],
    category: "Symbols",
    description: "antenna bars",
    unicode_version: "6.0"
  },
  {
    emoji: "📳",
    aliases: ["vibration_mode"],
    tags: [],
    category: "Symbols",
    description: "vibration mode",
    unicode_version: "6.0"
  },
  {
    emoji: "📴",
    aliases: ["mobile_phone_off"],
    tags: ["mute", "off"],
    category: "Symbols",
    description: "mobile phone off",
    unicode_version: "6.0"
  },
  {
    emoji: "♀️",
    aliases: ["female_sign"],
    tags: [],
    category: "Symbols",
    description: "female sign",
    unicode_version: "11.0"
  },
  {
    emoji: "♂️",
    aliases: ["male_sign"],
    tags: [],
    category: "Symbols",
    description: "male sign",
    unicode_version: "11.0"
  },
  {
    emoji: "⚧️",
    aliases: ["transgender_symbol"],
    tags: [],
    category: "Symbols",
    description: "transgender symbol",
    unicode_version: "13.0"
  },
  {
    emoji: "✖️",
    aliases: ["heavy_multiplication_x"],
    tags: [],
    category: "Symbols",
    description: "multiply",
    unicode_version: ""
  },
  {
    emoji: "➕",
    aliases: ["heavy_plus_sign"],
    tags: [],
    category: "Symbols",
    description: "plus",
    unicode_version: "6.0"
  },
  {
    emoji: "➖",
    aliases: ["heavy_minus_sign"],
    tags: [],
    category: "Symbols",
    description: "minus",
    unicode_version: "6.0"
  },
  {
    emoji: "➗",
    aliases: ["heavy_division_sign"],
    tags: [],
    category: "Symbols",
    description: "divide",
    unicode_version: "6.0"
  },
  {
    emoji: "♾️",
    aliases: ["infinity"],
    tags: [],
    category: "Symbols",
    description: "infinity",
    unicode_version: "11.0"
  },
  {
    emoji: "‼️",
    aliases: ["bangbang"],
    tags: [],
    category: "Symbols",
    description: "double exclamation mark",
    unicode_version: ""
  },
  {
    emoji: "⁉️",
    aliases: ["interrobang"],
    tags: [],
    category: "Symbols",
    description: "exclamation question mark",
    unicode_version: "3.0"
  },
  {
    emoji: "❓",
    aliases: ["question"],
    tags: ["confused"],
    category: "Symbols",
    description: "red question mark",
    unicode_version: "6.0"
  },
  {
    emoji: "❔",
    aliases: ["grey_question"],
    tags: [],
    category: "Symbols",
    description: "white question mark",
    unicode_version: "6.0"
  },
  {
    emoji: "❕",
    aliases: ["grey_exclamation"],
    tags: [],
    category: "Symbols",
    description: "white exclamation mark",
    unicode_version: "6.0"
  },
  {
    emoji: "❗",
    aliases: ["exclamation", "heavy_exclamation_mark"],
    tags: ["bang"],
    category: "Symbols",
    description: "red exclamation mark",
    unicode_version: "5.2"
  },
  {
    emoji: "〰️",
    aliases: ["wavy_dash"],
    tags: [],
    category: "Symbols",
    description: "wavy dash",
    unicode_version: ""
  },
  {
    emoji: "💱",
    aliases: ["currency_exchange"],
    tags: [],
    category: "Symbols",
    description: "currency exchange",
    unicode_version: "6.0"
  },
  {
    emoji: "💲",
    aliases: ["heavy_dollar_sign"],
    tags: [],
    category: "Symbols",
    description: "heavy dollar sign",
    unicode_version: "6.0"
  },
  {
    emoji: "⚕️",
    aliases: ["medical_symbol"],
    tags: [],
    category: "Symbols",
    description: "medical symbol",
    unicode_version: "11.0"
  },
  {
    emoji: "♻️",
    aliases: ["recycle"],
    tags: ["environment", "green"],
    category: "Symbols",
    description: "recycling symbol",
    unicode_version: "3.2"
  },
  {
    emoji: "⚜️",
    aliases: ["fleur_de_lis"],
    tags: [],
    category: "Symbols",
    description: "fleur-de-lis",
    unicode_version: "4.1"
  },
  {
    emoji: "🔱",
    aliases: ["trident"],
    tags: [],
    category: "Symbols",
    description: "trident emblem",
    unicode_version: "6.0"
  },
  {
    emoji: "📛",
    aliases: ["name_badge"],
    tags: [],
    category: "Symbols",
    description: "name badge",
    unicode_version: "6.0"
  },
  {
    emoji: "🔰",
    aliases: ["beginner"],
    tags: [],
    category: "Symbols",
    description: "Japanese symbol for beginner",
    unicode_version: "6.0"
  },
  {
    emoji: "⭕",
    aliases: ["o"],
    tags: [],
    category: "Symbols",
    description: "hollow red circle",
    unicode_version: "5.2"
  },
  {
    emoji: "✅",
    aliases: ["white_check_mark"],
    tags: [],
    category: "Symbols",
    description: "check mark button",
    unicode_version: "6.0"
  },
  {
    emoji: "☑️",
    aliases: ["ballot_box_with_check"],
    tags: [],
    category: "Symbols",
    description: "check box with check",
    unicode_version: ""
  },
  {
    emoji: "✔️",
    aliases: ["heavy_check_mark"],
    tags: [],
    category: "Symbols",
    description: "check mark",
    unicode_version: ""
  },
  {
    emoji: "❌",
    aliases: ["x"],
    tags: [],
    category: "Symbols",
    description: "cross mark",
    unicode_version: "6.0"
  },
  {
    emoji: "❎",
    aliases: ["negative_squared_cross_mark"],
    tags: [],
    category: "Symbols",
    description: "cross mark button",
    unicode_version: "6.0"
  },
  {
    emoji: "➰",
    aliases: ["curly_loop"],
    tags: [],
    category: "Symbols",
    description: "curly loop",
    unicode_version: "6.0"
  },
  {
    emoji: "➿",
    aliases: ["loop"],
    tags: [],
    category: "Symbols",
    description: "double curly loop",
    unicode_version: "6.0"
  },
  {
    emoji: "〽️",
    aliases: ["part_alternation_mark"],
    tags: [],
    category: "Symbols",
    description: "part alternation mark",
    unicode_version: "3.2"
  },
  {
    emoji: "✳️",
    aliases: ["eight_spoked_asterisk"],
    tags: [],
    category: "Symbols",
    description: "eight-spoked asterisk",
    unicode_version: ""
  },
  {
    emoji: "✴️",
    aliases: ["eight_pointed_black_star"],
    tags: [],
    category: "Symbols",
    description: "eight-pointed star",
    unicode_version: ""
  },
  {
    emoji: "❇️",
    aliases: ["sparkle"],
    tags: [],
    category: "Symbols",
    description: "sparkle",
    unicode_version: ""
  },
  {
    emoji: "©️",
    aliases: ["copyright"],
    tags: [],
    category: "Symbols",
    description: "copyright",
    unicode_version: ""
  },
  {
    emoji: "®️",
    aliases: ["registered"],
    tags: [],
    category: "Symbols",
    description: "registered",
    unicode_version: ""
  },
  {
    emoji: "™️",
    aliases: ["tm"],
    tags: ["trademark"],
    category: "Symbols",
    description: "trade mark",
    unicode_version: ""
  },
  {
    emoji: "#️⃣",
    aliases: ["hash"],
    tags: ["number"],
    category: "Symbols",
    description: "keycap: #",
    unicode_version: ""
  },
  {
    emoji: "*️⃣",
    aliases: ["asterisk"],
    tags: [],
    category: "Symbols",
    description: "keycap: *",
    unicode_version: ""
  },
  {
    emoji: "0️⃣",
    aliases: ["zero"],
    tags: [],
    category: "Symbols",
    description: "keycap: 0",
    unicode_version: ""
  },
  {
    emoji: "1️⃣",
    aliases: ["one"],
    tags: [],
    category: "Symbols",
    description: "keycap: 1",
    unicode_version: ""
  },
  {
    emoji: "2️⃣",
    aliases: ["two"],
    tags: [],
    category: "Symbols",
    description: "keycap: 2",
    unicode_version: ""
  },
  {
    emoji: "3️⃣",
    aliases: ["three"],
    tags: [],
    category: "Symbols",
    description: "keycap: 3",
    unicode_version: ""
  },
  {
    emoji: "4️⃣",
    aliases: ["four"],
    tags: [],
    category: "Symbols",
    description: "keycap: 4",
    unicode_version: ""
  },
  {
    emoji: "5️⃣",
    aliases: ["five"],
    tags: [],
    category: "Symbols",
    description: "keycap: 5",
    unicode_version: ""
  },
  {
    emoji: "6️⃣",
    aliases: ["six"],
    tags: [],
    category: "Symbols",
    description: "keycap: 6",
    unicode_version: ""
  },
  {
    emoji: "7️⃣",
    aliases: ["seven"],
    tags: [],
    category: "Symbols",
    description: "keycap: 7",
    unicode_version: ""
  },
  {
    emoji: "8️⃣",
    aliases: ["eight"],
    tags: [],
    category: "Symbols",
    description: "keycap: 8",
    unicode_version: ""
  },
  {
    emoji: "9️⃣",
    aliases: ["nine"],
    tags: [],
    category: "Symbols",
    description: "keycap: 9",
    unicode_version: ""
  },
  {
    emoji: "🔟",
    aliases: ["keycap_ten"],
    tags: [],
    category: "Symbols",
    description: "keycap: 10",
    unicode_version: "6.0"
  },
  {
    emoji: "🔠",
    aliases: ["capital_abcd"],
    tags: ["letters"],
    category: "Symbols",
    description: "input latin uppercase",
    unicode_version: "6.0"
  },
  {
    emoji: "🔡",
    aliases: ["abcd"],
    tags: [],
    category: "Symbols",
    description: "input latin lowercase",
    unicode_version: "6.0"
  },
  {
    emoji: "🔢",
    aliases: ["1234"],
    tags: ["numbers"],
    category: "Symbols",
    description: "input numbers",
    unicode_version: "6.0"
  },
  {
    emoji: "🔣",
    aliases: ["symbols"],
    tags: [],
    category: "Symbols",
    description: "input symbols",
    unicode_version: "6.0"
  },
  {
    emoji: "🔤",
    aliases: ["abc"],
    tags: ["alphabet"],
    category: "Symbols",
    description: "input latin letters",
    unicode_version: "6.0"
  },
  {
    emoji: "🅰️",
    aliases: ["a"],
    tags: [],
    category: "Symbols",
    description: "A button (blood type)",
    unicode_version: "6.0"
  },
  {
    emoji: "🆎",
    aliases: ["ab"],
    tags: [],
    category: "Symbols",
    description: "AB button (blood type)",
    unicode_version: "6.0"
  },
  {
    emoji: "🅱️",
    aliases: ["b"],
    tags: [],
    category: "Symbols",
    description: "B button (blood type)",
    unicode_version: "6.0"
  },
  {
    emoji: "🆑",
    aliases: ["cl"],
    tags: [],
    category: "Symbols",
    description: "CL button",
    unicode_version: "6.0"
  },
  {
    emoji: "🆒",
    aliases: ["cool"],
    tags: [],
    category: "Symbols",
    description: "COOL button",
    unicode_version: "6.0"
  },
  {
    emoji: "🆓",
    aliases: ["free"],
    tags: [],
    category: "Symbols",
    description: "FREE button",
    unicode_version: "6.0"
  },
  {
    emoji: "ℹ️",
    aliases: ["information_source"],
    tags: [],
    category: "Symbols",
    description: "information",
    unicode_version: "3.0"
  },
  {
    emoji: "🆔",
    aliases: ["id"],
    tags: [],
    category: "Symbols",
    description: "ID button",
    unicode_version: "6.0"
  },
  {
    emoji: "Ⓜ️",
    aliases: ["m"],
    tags: [],
    category: "Symbols",
    description: "circled M",
    unicode_version: ""
  },
  {
    emoji: "🆕",
    aliases: ["new"],
    tags: ["fresh"],
    category: "Symbols",
    description: "NEW button",
    unicode_version: "6.0"
  },
  {
    emoji: "🆖",
    aliases: ["ng"],
    tags: [],
    category: "Symbols",
    description: "NG button",
    unicode_version: "6.0"
  },
  {
    emoji: "🅾️",
    aliases: ["o2"],
    tags: [],
    category: "Symbols",
    description: "O button (blood type)",
    unicode_version: "6.0"
  },
  {
    emoji: "🆗",
    aliases: ["ok"],
    tags: ["yes"],
    category: "Symbols",
    description: "OK button",
    unicode_version: "6.0"
  },
  {
    emoji: "🅿️",
    aliases: ["parking"],
    tags: [],
    category: "Symbols",
    description: "P button",
    unicode_version: "5.2"
  },
  {
    emoji: "🆘",
    aliases: ["sos"],
    tags: ["help", "emergency"],
    category: "Symbols",
    description: "SOS button",
    unicode_version: "6.0"
  },
  {
    emoji: "🆙",
    aliases: ["up"],
    tags: [],
    category: "Symbols",
    description: "UP! button",
    unicode_version: "6.0"
  },
  {
    emoji: "🆚",
    aliases: ["vs"],
    tags: [],
    category: "Symbols",
    description: "VS button",
    unicode_version: "6.0"
  },
  {
    emoji: "🈁",
    aliases: ["koko"],
    tags: [],
    category: "Symbols",
    description: "Japanese “here” button",
    unicode_version: "6.0"
  },
  {
    emoji: "🈂️",
    aliases: ["sa"],
    tags: [],
    category: "Symbols",
    description: "Japanese “service charge” button",
    unicode_version: "6.0"
  },
  {
    emoji: "🈷️",
    aliases: ["u6708"],
    tags: [],
    category: "Symbols",
    description: "Japanese “monthly amount” button",
    unicode_version: "6.0"
  },
  {
    emoji: "🈶",
    aliases: ["u6709"],
    tags: [],
    category: "Symbols",
    description: "Japanese “not free of charge” button",
    unicode_version: "6.0"
  },
  {
    emoji: "🈯",
    aliases: ["u6307"],
    tags: [],
    category: "Symbols",
    description: "Japanese “reserved” button",
    unicode_version: ""
  },
  {
    emoji: "🉐",
    aliases: ["ideograph_advantage"],
    tags: [],
    category: "Symbols",
    description: "Japanese “bargain” button",
    unicode_version: "6.0"
  },
  {
    emoji: "🈹",
    aliases: ["u5272"],
    tags: [],
    category: "Symbols",
    description: "Japanese “discount” button",
    unicode_version: "6.0"
  },
  {
    emoji: "🈚",
    aliases: ["u7121"],
    tags: [],
    category: "Symbols",
    description: "Japanese “free of charge” button",
    unicode_version: ""
  },
  {
    emoji: "🈲",
    aliases: ["u7981"],
    tags: [],
    category: "Symbols",
    description: "Japanese “prohibited” button",
    unicode_version: "6.0"
  },
  {
    emoji: "🉑",
    aliases: ["accept"],
    tags: [],
    category: "Symbols",
    description: "Japanese “acceptable” button",
    unicode_version: "6.0"
  },
  {
    emoji: "🈸",
    aliases: ["u7533"],
    tags: [],
    category: "Symbols",
    description: "Japanese “application” button",
    unicode_version: "6.0"
  },
  {
    emoji: "🈴",
    aliases: ["u5408"],
    tags: [],
    category: "Symbols",
    description: "Japanese “passing grade” button",
    unicode_version: "6.0"
  },
  {
    emoji: "🈳",
    aliases: ["u7a7a"],
    tags: [],
    category: "Symbols",
    description: "Japanese “vacancy” button",
    unicode_version: "6.0"
  },
  {
    emoji: "㊗️",
    aliases: ["congratulations"],
    tags: [],
    category: "Symbols",
    description: "Japanese “congratulations” button",
    unicode_version: ""
  },
  {
    emoji: "㊙️",
    aliases: ["secret"],
    tags: [],
    category: "Symbols",
    description: "Japanese “secret” button",
    unicode_version: ""
  },
  {
    emoji: "🈺",
    aliases: ["u55b6"],
    tags: [],
    category: "Symbols",
    description: "Japanese “open for business” button",
    unicode_version: "6.0"
  },
  {
    emoji: "🈵",
    aliases: ["u6e80"],
    tags: [],
    category: "Symbols",
    description: "Japanese “no vacancy” button",
    unicode_version: "6.0"
  },
  {
    emoji: "🔴",
    aliases: ["red_circle"],
    tags: [],
    category: "Symbols",
    description: "red circle",
    unicode_version: "6.0"
  },
  {
    emoji: "🟠",
    aliases: ["orange_circle"],
    tags: [],
    category: "Symbols",
    description: "orange circle",
    unicode_version: "12.0"
  },
  {
    emoji: "🟡",
    aliases: ["yellow_circle"],
    tags: [],
    category: "Symbols",
    description: "yellow circle",
    unicode_version: "12.0"
  },
  {
    emoji: "🟢",
    aliases: ["green_circle"],
    tags: [],
    category: "Symbols",
    description: "green circle",
    unicode_version: "12.0"
  },
  {
    emoji: "🔵",
    aliases: ["large_blue_circle"],
    tags: [],
    category: "Symbols",
    description: "blue circle",
    unicode_version: "6.0"
  },
  {
    emoji: "🟣",
    aliases: ["purple_circle"],
    tags: [],
    category: "Symbols",
    description: "purple circle",
    unicode_version: "12.0"
  },
  {
    emoji: "🟤",
    aliases: ["brown_circle"],
    tags: [],
    category: "Symbols",
    description: "brown circle",
    unicode_version: "12.0"
  },
  {
    emoji: "⚫",
    aliases: ["black_circle"],
    tags: [],
    category: "Symbols",
    description: "black circle",
    unicode_version: "4.1"
  },
  {
    emoji: "⚪",
    aliases: ["white_circle"],
    tags: [],
    category: "Symbols",
    description: "white circle",
    unicode_version: "4.1"
  },
  {
    emoji: "🟥",
    aliases: ["red_square"],
    tags: [],
    category: "Symbols",
    description: "red square",
    unicode_version: "12.0"
  },
  {
    emoji: "🟧",
    aliases: ["orange_square"],
    tags: [],
    category: "Symbols",
    description: "orange square",
    unicode_version: "12.0"
  },
  {
    emoji: "🟨",
    aliases: ["yellow_square"],
    tags: [],
    category: "Symbols",
    description: "yellow square",
    unicode_version: "12.0"
  },
  {
    emoji: "🟩",
    aliases: ["green_square"],
    tags: [],
    category: "Symbols",
    description: "green square",
    unicode_version: "12.0"
  },
  {
    emoji: "🟦",
    aliases: ["blue_square"],
    tags: [],
    category: "Symbols",
    description: "blue square",
    unicode_version: "12.0"
  },
  {
    emoji: "🟪",
    aliases: ["purple_square"],
    tags: [],
    category: "Symbols",
    description: "purple square",
    unicode_version: "12.0"
  },
  {
    emoji: "🟫",
    aliases: ["brown_square"],
    tags: [],
    category: "Symbols",
    description: "brown square",
    unicode_version: "12.0"
  },
  {
    emoji: "⬛",
    aliases: ["black_large_square"],
    tags: [],
    category: "Symbols",
    description: "black large square",
    unicode_version: "5.1"
  },
  {
    emoji: "⬜",
    aliases: ["white_large_square"],
    tags: [],
    category: "Symbols",
    description: "white large square",
    unicode_version: "5.1"
  },
  {
    emoji: "◼️",
    aliases: ["black_medium_square"],
    tags: [],
    category: "Symbols",
    description: "black medium square",
    unicode_version: "3.2"
  },
  {
    emoji: "◻️",
    aliases: ["white_medium_square"],
    tags: [],
    category: "Symbols",
    description: "white medium square",
    unicode_version: "3.2"
  },
  {
    emoji: "◾",
    aliases: ["black_medium_small_square"],
    tags: [],
    category: "Symbols",
    description: "black medium-small square",
    unicode_version: "3.2"
  },
  {
    emoji: "◽",
    aliases: ["white_medium_small_square"],
    tags: [],
    category: "Symbols",
    description: "white medium-small square",
    unicode_version: "3.2"
  },
  {
    emoji: "▪️",
    aliases: ["black_small_square"],
    tags: [],
    category: "Symbols",
    description: "black small square",
    unicode_version: ""
  },
  {
    emoji: "▫️",
    aliases: ["white_small_square"],
    tags: [],
    category: "Symbols",
    description: "white small square",
    unicode_version: ""
  },
  {
    emoji: "🔶",
    aliases: ["large_orange_diamond"],
    tags: [],
    category: "Symbols",
    description: "large orange diamond",
    unicode_version: "6.0"
  },
  {
    emoji: "🔷",
    aliases: ["large_blue_diamond"],
    tags: [],
    category: "Symbols",
    description: "large blue diamond",
    unicode_version: "6.0"
  },
  {
    emoji: "🔸",
    aliases: ["small_orange_diamond"],
    tags: [],
    category: "Symbols",
    description: "small orange diamond",
    unicode_version: "6.0"
  },
  {
    emoji: "🔹",
    aliases: ["small_blue_diamond"],
    tags: [],
    category: "Symbols",
    description: "small blue diamond",
    unicode_version: "6.0"
  },
  {
    emoji: "🔺",
    aliases: ["small_red_triangle"],
    tags: [],
    category: "Symbols",
    description: "red triangle pointed up",
    unicode_version: "6.0"
  },
  {
    emoji: "🔻",
    aliases: ["small_red_triangle_down"],
    tags: [],
    category: "Symbols",
    description: "red triangle pointed down",
    unicode_version: "6.0"
  },
  {
    emoji: "💠",
    aliases: ["diamond_shape_with_a_dot_inside"],
    tags: [],
    category: "Symbols",
    description: "diamond with a dot",
    unicode_version: "6.0"
  },
  {
    emoji: "🔘",
    aliases: ["radio_button"],
    tags: [],
    category: "Symbols",
    description: "radio button",
    unicode_version: "6.0"
  },
  {
    emoji: "🔳",
    aliases: ["white_square_button"],
    tags: [],
    category: "Symbols",
    description: "white square button",
    unicode_version: "6.0"
  },
  {
    emoji: "🔲",
    aliases: ["black_square_button"],
    tags: [],
    category: "Symbols",
    description: "black square button",
    unicode_version: "6.0"
  },
  {
    emoji: "🏁",
    aliases: ["checkered_flag"],
    tags: ["milestone", "finish"],
    category: "Flags",
    description: "chequered flag",
    unicode_version: "6.0"
  },
  {
    emoji: "🚩",
    aliases: ["triangular_flag_on_post"],
    tags: [],
    category: "Flags",
    description: "triangular flag",
    unicode_version: "6.0"
  },
  {
    emoji: "🎌",
    aliases: ["crossed_flags"],
    tags: [],
    category: "Flags",
    description: "crossed flags",
    unicode_version: "6.0"
  },
  {
    emoji: "🏴",
    aliases: ["black_flag"],
    tags: [],
    category: "Flags",
    description: "black flag",
    unicode_version: "7.0"
  },
  {
    emoji: "🏳️",
    aliases: ["white_flag"],
    tags: [],
    category: "Flags",
    description: "white flag",
    unicode_version: "7.0"
  },
  {
    emoji: "🏳️‍🌈",
    aliases: ["rainbow_flag"],
    tags: ["pride"],
    category: "Flags",
    description: "rainbow flag",
    unicode_version: "6.0"
  },
  {
    emoji: "🏳️‍⚧️",
    aliases: ["transgender_flag"],
    tags: [],
    category: "Flags",
    description: "transgender flag",
    unicode_version: "13.0"
  },
  {
    emoji: "🏴‍☠️",
    aliases: ["pirate_flag"],
    tags: [],
    category: "Flags",
    description: "pirate flag",
    unicode_version: "11.0"
  },
  {
    emoji: "🇦🇨",
    aliases: ["ascension_island"],
    tags: [],
    category: "Flags",
    description: "flag: Ascension Island",
    unicode_version: "11.0"
  },
  {
    emoji: "🇦🇩",
    aliases: ["andorra"],
    tags: [],
    category: "Flags",
    description: "flag: Andorra",
    unicode_version: "6.0"
  },
  {
    emoji: "🇦🇪",
    aliases: ["united_arab_emirates"],
    tags: [],
    category: "Flags",
    description: "flag: United Arab Emirates",
    unicode_version: "6.0"
  },
  {
    emoji: "🇦🇫",
    aliases: ["afghanistan"],
    tags: [],
    category: "Flags",
    description: "flag: Afghanistan",
    unicode_version: "6.0"
  },
  {
    emoji: "🇦🇬",
    aliases: ["antigua_barbuda"],
    tags: [],
    category: "Flags",
    description: "flag: Antigua & Barbuda",
    unicode_version: "6.0"
  },
  {
    emoji: "🇦🇮",
    aliases: ["anguilla"],
    tags: [],
    category: "Flags",
    description: "flag: Anguilla",
    unicode_version: "6.0"
  },
  {
    emoji: "🇦🇱",
    aliases: ["albania"],
    tags: [],
    category: "Flags",
    description: "flag: Albania",
    unicode_version: "6.0"
  },
  {
    emoji: "🇦🇲",
    aliases: ["armenia"],
    tags: [],
    category: "Flags",
    description: "flag: Armenia",
    unicode_version: "6.0"
  },
  {
    emoji: "🇦🇴",
    aliases: ["angola"],
    tags: [],
    category: "Flags",
    description: "flag: Angola",
    unicode_version: "6.0"
  },
  {
    emoji: "🇦🇶",
    aliases: ["antarctica"],
    tags: [],
    category: "Flags",
    description: "flag: Antarctica",
    unicode_version: "6.0"
  },
  {
    emoji: "🇦🇷",
    aliases: ["argentina"],
    tags: [],
    category: "Flags",
    description: "flag: Argentina",
    unicode_version: "6.0"
  },
  {
    emoji: "🇦🇸",
    aliases: ["american_samoa"],
    tags: [],
    category: "Flags",
    description: "flag: American Samoa",
    unicode_version: "6.0"
  },
  {
    emoji: "🇦🇹",
    aliases: ["austria"],
    tags: [],
    category: "Flags",
    description: "flag: Austria",
    unicode_version: "6.0"
  },
  {
    emoji: "🇦🇺",
    aliases: ["australia"],
    tags: [],
    category: "Flags",
    description: "flag: Australia",
    unicode_version: "6.0"
  },
  {
    emoji: "🇦🇼",
    aliases: ["aruba"],
    tags: [],
    category: "Flags",
    description: "flag: Aruba",
    unicode_version: "6.0"
  },
  {
    emoji: "🇦🇽",
    aliases: ["aland_islands"],
    tags: [],
    category: "Flags",
    description: "flag: Åland Islands",
    unicode_version: "6.0"
  },
  {
    emoji: "🇦🇿",
    aliases: ["azerbaijan"],
    tags: [],
    category: "Flags",
    description: "flag: Azerbaijan",
    unicode_version: "6.0"
  },
  {
    emoji: "🇧🇦",
    aliases: ["bosnia_herzegovina"],
    tags: [],
    category: "Flags",
    description: "flag: Bosnia & Herzegovina",
    unicode_version: "6.0"
  },
  {
    emoji: "🇧🇧",
    aliases: ["barbados"],
    tags: [],
    category: "Flags",
    description: "flag: Barbados",
    unicode_version: "6.0"
  },
  {
    emoji: "🇧🇩",
    aliases: ["bangladesh"],
    tags: [],
    category: "Flags",
    description: "flag: Bangladesh",
    unicode_version: "6.0"
  },
  {
    emoji: "🇧🇪",
    aliases: ["belgium"],
    tags: [],
    category: "Flags",
    description: "flag: Belgium",
    unicode_version: "6.0"
  },
  {
    emoji: "🇧🇫",
    aliases: ["burkina_faso"],
    tags: [],
    category: "Flags",
    description: "flag: Burkina Faso",
    unicode_version: "6.0"
  },
  {
    emoji: "🇧🇬",
    aliases: ["bulgaria"],
    tags: [],
    category: "Flags",
    description: "flag: Bulgaria",
    unicode_version: "6.0"
  },
  {
    emoji: "🇧🇭",
    aliases: ["bahrain"],
    tags: [],
    category: "Flags",
    description: "flag: Bahrain",
    unicode_version: "6.0"
  },
  {
    emoji: "🇧🇮",
    aliases: ["burundi"],
    tags: [],
    category: "Flags",
    description: "flag: Burundi",
    unicode_version: "6.0"
  },
  {
    emoji: "🇧🇯",
    aliases: ["benin"],
    tags: [],
    category: "Flags",
    description: "flag: Benin",
    unicode_version: "6.0"
  },
  {
    emoji: "🇧🇱",
    aliases: ["st_barthelemy"],
    tags: [],
    category: "Flags",
    description: "flag: St. Barthélemy",
    unicode_version: "6.0"
  },
  {
    emoji: "🇧🇲",
    aliases: ["bermuda"],
    tags: [],
    category: "Flags",
    description: "flag: Bermuda",
    unicode_version: "6.0"
  },
  {
    emoji: "🇧🇳",
    aliases: ["brunei"],
    tags: [],
    category: "Flags",
    description: "flag: Brunei",
    unicode_version: "6.0"
  },
  {
    emoji: "🇧🇴",
    aliases: ["bolivia"],
    tags: [],
    category: "Flags",
    description: "flag: Bolivia",
    unicode_version: "6.0"
  },
  {
    emoji: "🇧🇶",
    aliases: ["caribbean_netherlands"],
    tags: [],
    category: "Flags",
    description: "flag: Caribbean Netherlands",
    unicode_version: "6.0"
  },
  {
    emoji: "🇧🇷",
    aliases: ["brazil"],
    tags: [],
    category: "Flags",
    description: "flag: Brazil",
    unicode_version: "6.0"
  },
  {
    emoji: "🇧🇸",
    aliases: ["bahamas"],
    tags: [],
    category: "Flags",
    description: "flag: Bahamas",
    unicode_version: "6.0"
  },
  {
    emoji: "🇧🇹",
    aliases: ["bhutan"],
    tags: [],
    category: "Flags",
    description: "flag: Bhutan",
    unicode_version: "6.0"
  },
  {
    emoji: "🇧🇻",
    aliases: ["bouvet_island"],
    tags: [],
    category: "Flags",
    description: "flag: Bouvet Island",
    unicode_version: "11.0"
  },
  {
    emoji: "🇧🇼",
    aliases: ["botswana"],
    tags: [],
    category: "Flags",
    description: "flag: Botswana",
    unicode_version: "6.0"
  },
  {
    emoji: "🇧🇾",
    aliases: ["belarus"],
    tags: [],
    category: "Flags",
    description: "flag: Belarus",
    unicode_version: "6.0"
  },
  {
    emoji: "🇧🇿",
    aliases: ["belize"],
    tags: [],
    category: "Flags",
    description: "flag: Belize",
    unicode_version: "6.0"
  },
  {
    emoji: "🇨🇦",
    aliases: ["canada"],
    tags: [],
    category: "Flags",
    description: "flag: Canada",
    unicode_version: "6.0"
  },
  {
    emoji: "🇨🇨",
    aliases: ["cocos_islands"],
    tags: ["keeling"],
    category: "Flags",
    description: "flag: Cocos (Keeling) Islands",
    unicode_version: "6.0"
  },
  {
    emoji: "🇨🇩",
    aliases: ["congo_kinshasa"],
    tags: [],
    category: "Flags",
    description: "flag: Congo - Kinshasa",
    unicode_version: "6.0"
  },
  {
    emoji: "🇨🇫",
    aliases: ["central_african_republic"],
    tags: [],
    category: "Flags",
    description: "flag: Central African Republic",
    unicode_version: "6.0"
  },
  {
    emoji: "🇨🇬",
    aliases: ["congo_brazzaville"],
    tags: [],
    category: "Flags",
    description: "flag: Congo - Brazzaville",
    unicode_version: "6.0"
  },
  {
    emoji: "🇨🇭",
    aliases: ["switzerland"],
    tags: [],
    category: "Flags",
    description: "flag: Switzerland",
    unicode_version: "6.0"
  },
  {
    emoji: "🇨🇮",
    aliases: ["cote_divoire"],
    tags: ["ivory"],
    category: "Flags",
    description: "flag: Côte d’Ivoire",
    unicode_version: "6.0"
  },
  {
    emoji: "🇨🇰",
    aliases: ["cook_islands"],
    tags: [],
    category: "Flags",
    description: "flag: Cook Islands",
    unicode_version: "6.0"
  },
  {
    emoji: "🇨🇱",
    aliases: ["chile"],
    tags: [],
    category: "Flags",
    description: "flag: Chile",
    unicode_version: "6.0"
  },
  {
    emoji: "🇨🇲",
    aliases: ["cameroon"],
    tags: [],
    category: "Flags",
    description: "flag: Cameroon",
    unicode_version: "6.0"
  },
  {
    emoji: "🇨🇳",
    aliases: ["cn"],
    tags: ["china"],
    category: "Flags",
    description: "flag: China",
    unicode_version: "6.0"
  },
  {
    emoji: "🇨🇴",
    aliases: ["colombia"],
    tags: [],
    category: "Flags",
    description: "flag: Colombia",
    unicode_version: "6.0"
  },
  {
    emoji: "🇨🇵",
    aliases: ["clipperton_island"],
    tags: [],
    category: "Flags",
    description: "flag: Clipperton Island",
    unicode_version: "11.0"
  },
  {
    emoji: "🇨🇷",
    aliases: ["costa_rica"],
    tags: [],
    category: "Flags",
    description: "flag: Costa Rica",
    unicode_version: "6.0"
  },
  {
    emoji: "🇨🇺",
    aliases: ["cuba"],
    tags: [],
    category: "Flags",
    description: "flag: Cuba",
    unicode_version: "6.0"
  },
  {
    emoji: "🇨🇻",
    aliases: ["cape_verde"],
    tags: [],
    category: "Flags",
    description: "flag: Cape Verde",
    unicode_version: "6.0"
  },
  {
    emoji: "🇨🇼",
    aliases: ["curacao"],
    tags: [],
    category: "Flags",
    description: "flag: Curaçao",
    unicode_version: "6.0"
  },
  {
    emoji: "🇨🇽",
    aliases: ["christmas_island"],
    tags: [],
    category: "Flags",
    description: "flag: Christmas Island",
    unicode_version: "6.0"
  },
  {
    emoji: "🇨🇾",
    aliases: ["cyprus"],
    tags: [],
    category: "Flags",
    description: "flag: Cyprus",
    unicode_version: "6.0"
  },
  {
    emoji: "🇨🇿",
    aliases: ["czech_republic"],
    tags: [],
    category: "Flags",
    description: "flag: Czechia",
    unicode_version: "6.0"
  },
  {
    emoji: "🇩🇪",
    aliases: ["de"],
    tags: ["flag", "germany"],
    category: "Flags",
    description: "flag: Germany",
    unicode_version: "6.0"
  },
  {
    emoji: "🇩🇬",
    aliases: ["diego_garcia"],
    tags: [],
    category: "Flags",
    description: "flag: Diego Garcia",
    unicode_version: "11.0"
  },
  {
    emoji: "🇩🇯",
    aliases: ["djibouti"],
    tags: [],
    category: "Flags",
    description: "flag: Djibouti",
    unicode_version: "6.0"
  },
  {
    emoji: "🇩🇰",
    aliases: ["denmark"],
    tags: [],
    category: "Flags",
    description: "flag: Denmark",
    unicode_version: "6.0"
  },
  {
    emoji: "🇩🇲",
    aliases: ["dominica"],
    tags: [],
    category: "Flags",
    description: "flag: Dominica",
    unicode_version: "6.0"
  },
  {
    emoji: "🇩🇴",
    aliases: ["dominican_republic"],
    tags: [],
    category: "Flags",
    description: "flag: Dominican Republic",
    unicode_version: "6.0"
  },
  {
    emoji: "🇩🇿",
    aliases: ["algeria"],
    tags: [],
    category: "Flags",
    description: "flag: Algeria",
    unicode_version: "6.0"
  },
  {
    emoji: "🇪🇦",
    aliases: ["ceuta_melilla"],
    tags: [],
    category: "Flags",
    description: "flag: Ceuta & Melilla",
    unicode_version: "11.0"
  },
  {
    emoji: "🇪🇨",
    aliases: ["ecuador"],
    tags: [],
    category: "Flags",
    description: "flag: Ecuador",
    unicode_version: "6.0"
  },
  {
    emoji: "🇪🇪",
    aliases: ["estonia"],
    tags: [],
    category: "Flags",
    description: "flag: Estonia",
    unicode_version: "6.0"
  },
  {
    emoji: "🇪🇬",
    aliases: ["egypt"],
    tags: [],
    category: "Flags",
    description: "flag: Egypt",
    unicode_version: "6.0"
  },
  {
    emoji: "🇪🇭",
    aliases: ["western_sahara"],
    tags: [],
    category: "Flags",
    description: "flag: Western Sahara",
    unicode_version: "6.0"
  },
  {
    emoji: "🇪🇷",
    aliases: ["eritrea"],
    tags: [],
    category: "Flags",
    description: "flag: Eritrea",
    unicode_version: "6.0"
  },
  {
    emoji: "🇪🇸",
    aliases: ["es"],
    tags: ["spain"],
    category: "Flags",
    description: "flag: Spain",
    unicode_version: "6.0"
  },
  {
    emoji: "🇪🇹",
    aliases: ["ethiopia"],
    tags: [],
    category: "Flags",
    description: "flag: Ethiopia",
    unicode_version: "6.0"
  },
  {
    emoji: "🇪🇺",
    aliases: ["eu", "european_union"],
    tags: [],
    category: "Flags",
    description: "flag: European Union",
    unicode_version: "6.0"
  },
  {
    emoji: "🇫🇮",
    aliases: ["finland"],
    tags: [],
    category: "Flags",
    description: "flag: Finland",
    unicode_version: "6.0"
  },
  {
    emoji: "🇫🇯",
    aliases: ["fiji"],
    tags: [],
    category: "Flags",
    description: "flag: Fiji",
    unicode_version: "6.0"
  },
  {
    emoji: "🇫🇰",
    aliases: ["falkland_islands"],
    tags: [],
    category: "Flags",
    description: "flag: Falkland Islands",
    unicode_version: "6.0"
  },
  {
    emoji: "🇫🇲",
    aliases: ["micronesia"],
    tags: [],
    category: "Flags",
    description: "flag: Micronesia",
    unicode_version: "6.0"
  },
  {
    emoji: "🇫🇴",
    aliases: ["faroe_islands"],
    tags: [],
    category: "Flags",
    description: "flag: Faroe Islands",
    unicode_version: "6.0"
  },
  {
    emoji: "🇫🇷",
    aliases: ["fr"],
    tags: ["france", "french"],
    category: "Flags",
    description: "flag: France",
    unicode_version: "6.0"
  },
  {
    emoji: "🇬🇦",
    aliases: ["gabon"],
    tags: [],
    category: "Flags",
    description: "flag: Gabon",
    unicode_version: "6.0"
  },
  {
    emoji: "🇬🇧",
    aliases: ["gb", "uk"],
    tags: ["flag", "british"],
    category: "Flags",
    description: "flag: United Kingdom",
    unicode_version: "6.0"
  },
  {
    emoji: "🇬🇩",
    aliases: ["grenada"],
    tags: [],
    category: "Flags",
    description: "flag: Grenada",
    unicode_version: "6.0"
  },
  {
    emoji: "🇬🇪",
    aliases: ["georgia"],
    tags: [],
    category: "Flags",
    description: "flag: Georgia",
    unicode_version: "6.0"
  },
  {
    emoji: "🇬🇫",
    aliases: ["french_guiana"],
    tags: [],
    category: "Flags",
    description: "flag: French Guiana",
    unicode_version: "6.0"
  },
  {
    emoji: "🇬🇬",
    aliases: ["guernsey"],
    tags: [],
    category: "Flags",
    description: "flag: Guernsey",
    unicode_version: "6.0"
  },
  {
    emoji: "🇬🇭",
    aliases: ["ghana"],
    tags: [],
    category: "Flags",
    description: "flag: Ghana",
    unicode_version: "6.0"
  },
  {
    emoji: "🇬🇮",
    aliases: ["gibraltar"],
    tags: [],
    category: "Flags",
    description: "flag: Gibraltar",
    unicode_version: "6.0"
  },
  {
    emoji: "🇬🇱",
    aliases: ["greenland"],
    tags: [],
    category: "Flags",
    description: "flag: Greenland",
    unicode_version: "6.0"
  },
  {
    emoji: "🇬🇲",
    aliases: ["gambia"],
    tags: [],
    category: "Flags",
    description: "flag: Gambia",
    unicode_version: "6.0"
  },
  {
    emoji: "🇬🇳",
    aliases: ["guinea"],
    tags: [],
    category: "Flags",
    description: "flag: Guinea",
    unicode_version: "6.0"
  },
  {
    emoji: "🇬🇵",
    aliases: ["guadeloupe"],
    tags: [],
    category: "Flags",
    description: "flag: Guadeloupe",
    unicode_version: "6.0"
  },
  {
    emoji: "🇬🇶",
    aliases: ["equatorial_guinea"],
    tags: [],
    category: "Flags",
    description: "flag: Equatorial Guinea",
    unicode_version: "6.0"
  },
  {
    emoji: "🇬🇷",
    aliases: ["greece"],
    tags: [],
    category: "Flags",
    description: "flag: Greece",
    unicode_version: "6.0"
  },
  {
    emoji: "🇬🇸",
    aliases: ["south_georgia_south_sandwich_islands"],
    tags: [],
    category: "Flags",
    description: "flag: South Georgia & South Sandwich Islands",
    unicode_version: "6.0"
  },
  {
    emoji: "🇬🇹",
    aliases: ["guatemala"],
    tags: [],
    category: "Flags",
    description: "flag: Guatemala",
    unicode_version: "6.0"
  },
  {
    emoji: "🇬🇺",
    aliases: ["guam"],
    tags: [],
    category: "Flags",
    description: "flag: Guam",
    unicode_version: "6.0"
  },
  {
    emoji: "🇬🇼",
    aliases: ["guinea_bissau"],
    tags: [],
    category: "Flags",
    description: "flag: Guinea-Bissau",
    unicode_version: "6.0"
  },
  {
    emoji: "🇬🇾",
    aliases: ["guyana"],
    tags: [],
    category: "Flags",
    description: "flag: Guyana",
    unicode_version: "6.0"
  },
  {
    emoji: "🇭🇰",
    aliases: ["hong_kong"],
    tags: [],
    category: "Flags",
    description: "flag: Hong Kong SAR China",
    unicode_version: "6.0"
  },
  {
    emoji: "🇭🇲",
    aliases: ["heard_mcdonald_islands"],
    tags: [],
    category: "Flags",
    description: "flag: Heard & McDonald Islands",
    unicode_version: "11.0"
  },
  {
    emoji: "🇭🇳",
    aliases: ["honduras"],
    tags: [],
    category: "Flags",
    description: "flag: Honduras",
    unicode_version: "6.0"
  },
  {
    emoji: "🇭🇷",
    aliases: ["croatia"],
    tags: [],
    category: "Flags",
    description: "flag: Croatia",
    unicode_version: "6.0"
  },
  {
    emoji: "🇭🇹",
    aliases: ["haiti"],
    tags: [],
    category: "Flags",
    description: "flag: Haiti",
    unicode_version: "6.0"
  },
  {
    emoji: "🇭🇺",
    aliases: ["hungary"],
    tags: [],
    category: "Flags",
    description: "flag: Hungary",
    unicode_version: "6.0"
  },
  {
    emoji: "🇮🇨",
    aliases: ["canary_islands"],
    tags: [],
    category: "Flags",
    description: "flag: Canary Islands",
    unicode_version: "6.0"
  },
  {
    emoji: "🇮🇩",
    aliases: ["indonesia"],
    tags: [],
    category: "Flags",
    description: "flag: Indonesia",
    unicode_version: "6.0"
  },
  {
    emoji: "🇮🇪",
    aliases: ["ireland"],
    tags: [],
    category: "Flags",
    description: "flag: Ireland",
    unicode_version: "6.0"
  },
  {
    emoji: "🇮🇱",
    aliases: ["israel"],
    tags: [],
    category: "Flags",
    description: "flag: Israel",
    unicode_version: "6.0"
  },
  {
    emoji: "🇮🇲",
    aliases: ["isle_of_man"],
    tags: [],
    category: "Flags",
    description: "flag: Isle of Man",
    unicode_version: "6.0"
  },
  {
    emoji: "🇮🇳",
    aliases: ["india"],
    tags: [],
    category: "Flags",
    description: "flag: India",
    unicode_version: "6.0"
  },
  {
    emoji: "🇮🇴",
    aliases: ["british_indian_ocean_territory"],
    tags: [],
    category: "Flags",
    description: "flag: British Indian Ocean Territory",
    unicode_version: "6.0"
  },
  {
    emoji: "🇮🇶",
    aliases: ["iraq"],
    tags: [],
    category: "Flags",
    description: "flag: Iraq",
    unicode_version: "6.0"
  },
  {
    emoji: "🇮🇷",
    aliases: ["iran"],
    tags: [],
    category: "Flags",
    description: "flag: Iran",
    unicode_version: "6.0"
  },
  {
    emoji: "🇮🇸",
    aliases: ["iceland"],
    tags: [],
    category: "Flags",
    description: "flag: Iceland",
    unicode_version: "6.0"
  },
  {
    emoji: "🇮🇹",
    aliases: ["it"],
    tags: ["italy"],
    category: "Flags",
    description: "flag: Italy",
    unicode_version: "6.0"
  },
  {
    emoji: "🇯🇪",
    aliases: ["jersey"],
    tags: [],
    category: "Flags",
    description: "flag: Jersey",
    unicode_version: "6.0"
  },
  {
    emoji: "🇯🇲",
    aliases: ["jamaica"],
    tags: [],
    category: "Flags",
    description: "flag: Jamaica",
    unicode_version: "6.0"
  },
  {
    emoji: "🇯🇴",
    aliases: ["jordan"],
    tags: [],
    category: "Flags",
    description: "flag: Jordan",
    unicode_version: "6.0"
  },
  {
    emoji: "🇯🇵",
    aliases: ["jp"],
    tags: ["japan"],
    category: "Flags",
    description: "flag: Japan",
    unicode_version: "6.0"
  },
  {
    emoji: "🇰🇪",
    aliases: ["kenya"],
    tags: [],
    category: "Flags",
    description: "flag: Kenya",
    unicode_version: "6.0"
  },
  {
    emoji: "🇰🇬",
    aliases: ["kyrgyzstan"],
    tags: [],
    category: "Flags",
    description: "flag: Kyrgyzstan",
    unicode_version: "6.0"
  },
  {
    emoji: "🇰🇭",
    aliases: ["cambodia"],
    tags: [],
    category: "Flags",
    description: "flag: Cambodia",
    unicode_version: "6.0"
  },
  {
    emoji: "🇰🇮",
    aliases: ["kiribati"],
    tags: [],
    category: "Flags",
    description: "flag: Kiribati",
    unicode_version: "6.0"
  },
  {
    emoji: "🇰🇲",
    aliases: ["comoros"],
    tags: [],
    category: "Flags",
    description: "flag: Comoros",
    unicode_version: "6.0"
  },
  {
    emoji: "🇰🇳",
    aliases: ["st_kitts_nevis"],
    tags: [],
    category: "Flags",
    description: "flag: St. Kitts & Nevis",
    unicode_version: "6.0"
  },
  {
    emoji: "🇰🇵",
    aliases: ["north_korea"],
    tags: [],
    category: "Flags",
    description: "flag: North Korea",
    unicode_version: "6.0"
  },
  {
    emoji: "🇰🇷",
    aliases: ["kr"],
    tags: ["korea"],
    category: "Flags",
    description: "flag: South Korea",
    unicode_version: "6.0"
  },
  {
    emoji: "🇰🇼",
    aliases: ["kuwait"],
    tags: [],
    category: "Flags",
    description: "flag: Kuwait",
    unicode_version: "6.0"
  },
  {
    emoji: "🇰🇾",
    aliases: ["cayman_islands"],
    tags: [],
    category: "Flags",
    description: "flag: Cayman Islands",
    unicode_version: "6.0"
  },
  {
    emoji: "🇰🇿",
    aliases: ["kazakhstan"],
    tags: [],
    category: "Flags",
    description: "flag: Kazakhstan",
    unicode_version: "6.0"
  },
  {
    emoji: "🇱🇦",
    aliases: ["laos"],
    tags: [],
    category: "Flags",
    description: "flag: Laos",
    unicode_version: "6.0"
  },
  {
    emoji: "🇱🇧",
    aliases: ["lebanon"],
    tags: [],
    category: "Flags",
    description: "flag: Lebanon",
    unicode_version: "6.0"
  },
  {
    emoji: "🇱🇨",
    aliases: ["st_lucia"],
    tags: [],
    category: "Flags",
    description: "flag: St. Lucia",
    unicode_version: "6.0"
  },
  {
    emoji: "🇱🇮",
    aliases: ["liechtenstein"],
    tags: [],
    category: "Flags",
    description: "flag: Liechtenstein",
    unicode_version: "6.0"
  },
  {
    emoji: "🇱🇰",
    aliases: ["sri_lanka"],
    tags: [],
    category: "Flags",
    description: "flag: Sri Lanka",
    unicode_version: "6.0"
  },
  {
    emoji: "🇱🇷",
    aliases: ["liberia"],
    tags: [],
    category: "Flags",
    description: "flag: Liberia",
    unicode_version: "6.0"
  },
  {
    emoji: "🇱🇸",
    aliases: ["lesotho"],
    tags: [],
    category: "Flags",
    description: "flag: Lesotho",
    unicode_version: "6.0"
  },
  {
    emoji: "🇱🇹",
    aliases: ["lithuania"],
    tags: [],
    category: "Flags",
    description: "flag: Lithuania",
    unicode_version: "6.0"
  },
  {
    emoji: "🇱🇺",
    aliases: ["luxembourg"],
    tags: [],
    category: "Flags",
    description: "flag: Luxembourg",
    unicode_version: "6.0"
  },
  {
    emoji: "🇱🇻",
    aliases: ["latvia"],
    tags: [],
    category: "Flags",
    description: "flag: Latvia",
    unicode_version: "6.0"
  },
  {
    emoji: "🇱🇾",
    aliases: ["libya"],
    tags: [],
    category: "Flags",
    description: "flag: Libya",
    unicode_version: "6.0"
  },
  {
    emoji: "🇲🇦",
    aliases: ["morocco"],
    tags: [],
    category: "Flags",
    description: "flag: Morocco",
    unicode_version: "6.0"
  },
  {
    emoji: "🇲🇨",
    aliases: ["monaco"],
    tags: [],
    category: "Flags",
    description: "flag: Monaco",
    unicode_version: "6.0"
  },
  {
    emoji: "🇲🇩",
    aliases: ["moldova"],
    tags: [],
    category: "Flags",
    description: "flag: Moldova",
    unicode_version: "6.0"
  },
  {
    emoji: "🇲🇪",
    aliases: ["montenegro"],
    tags: [],
    category: "Flags",
    description: "flag: Montenegro",
    unicode_version: "6.0"
  },
  {
    emoji: "🇲🇫",
    aliases: ["st_martin"],
    tags: [],
    category: "Flags",
    description: "flag: St. Martin",
    unicode_version: "11.0"
  },
  {
    emoji: "🇲🇬",
    aliases: ["madagascar"],
    tags: [],
    category: "Flags",
    description: "flag: Madagascar",
    unicode_version: "6.0"
  },
  {
    emoji: "🇲🇭",
    aliases: ["marshall_islands"],
    tags: [],
    category: "Flags",
    description: "flag: Marshall Islands",
    unicode_version: "6.0"
  },
  {
    emoji: "🇲🇰",
    aliases: ["macedonia"],
    tags: [],
    category: "Flags",
    description: "flag: North Macedonia",
    unicode_version: "6.0"
  },
  {
    emoji: "🇲🇱",
    aliases: ["mali"],
    tags: [],
    category: "Flags",
    description: "flag: Mali",
    unicode_version: "6.0"
  },
  {
    emoji: "🇲🇲",
    aliases: ["myanmar"],
    tags: ["burma"],
    category: "Flags",
    description: "flag: Myanmar (Burma)",
    unicode_version: "6.0"
  },
  {
    emoji: "🇲🇳",
    aliases: ["mongolia"],
    tags: [],
    category: "Flags",
    description: "flag: Mongolia",
    unicode_version: "6.0"
  },
  {
    emoji: "🇲🇴",
    aliases: ["macau"],
    tags: [],
    category: "Flags",
    description: "flag: Macao SAR China",
    unicode_version: "6.0"
  },
  {
    emoji: "🇲🇵",
    aliases: ["northern_mariana_islands"],
    tags: [],
    category: "Flags",
    description: "flag: Northern Mariana Islands",
    unicode_version: "6.0"
  },
  {
    emoji: "🇲🇶",
    aliases: ["martinique"],
    tags: [],
    category: "Flags",
    description: "flag: Martinique",
    unicode_version: "6.0"
  },
  {
    emoji: "🇲🇷",
    aliases: ["mauritania"],
    tags: [],
    category: "Flags",
    description: "flag: Mauritania",
    unicode_version: "6.0"
  },
  {
    emoji: "🇲🇸",
    aliases: ["montserrat"],
    tags: [],
    category: "Flags",
    description: "flag: Montserrat",
    unicode_version: "6.0"
  },
  {
    emoji: "🇲🇹",
    aliases: ["malta"],
    tags: [],
    category: "Flags",
    description: "flag: Malta",
    unicode_version: "6.0"
  },
  {
    emoji: "🇲🇺",
    aliases: ["mauritius"],
    tags: [],
    category: "Flags",
    description: "flag: Mauritius",
    unicode_version: "6.0"
  },
  {
    emoji: "🇲🇻",
    aliases: ["maldives"],
    tags: [],
    category: "Flags",
    description: "flag: Maldives",
    unicode_version: "6.0"
  },
  {
    emoji: "🇲🇼",
    aliases: ["malawi"],
    tags: [],
    category: "Flags",
    description: "flag: Malawi",
    unicode_version: "6.0"
  },
  {
    emoji: "🇲🇽",
    aliases: ["mexico"],
    tags: [],
    category: "Flags",
    description: "flag: Mexico",
    unicode_version: "6.0"
  },
  {
    emoji: "🇲🇾",
    aliases: ["malaysia"],
    tags: [],
    category: "Flags",
    description: "flag: Malaysia",
    unicode_version: "6.0"
  },
  {
    emoji: "🇲🇿",
    aliases: ["mozambique"],
    tags: [],
    category: "Flags",
    description: "flag: Mozambique",
    unicode_version: "6.0"
  },
  {
    emoji: "🇳🇦",
    aliases: ["namibia"],
    tags: [],
    category: "Flags",
    description: "flag: Namibia",
    unicode_version: "6.0"
  },
  {
    emoji: "🇳🇨",
    aliases: ["new_caledonia"],
    tags: [],
    category: "Flags",
    description: "flag: New Caledonia",
    unicode_version: "6.0"
  },
  {
    emoji: "🇳🇪",
    aliases: ["niger"],
    tags: [],
    category: "Flags",
    description: "flag: Niger",
    unicode_version: "6.0"
  },
  {
    emoji: "🇳🇫",
    aliases: ["norfolk_island"],
    tags: [],
    category: "Flags",
    description: "flag: Norfolk Island",
    unicode_version: "6.0"
  },
  {
    emoji: "🇳🇬",
    aliases: ["nigeria"],
    tags: [],
    category: "Flags",
    description: "flag: Nigeria",
    unicode_version: "6.0"
  },
  {
    emoji: "🇳🇮",
    aliases: ["nicaragua"],
    tags: [],
    category: "Flags",
    description: "flag: Nicaragua",
    unicode_version: "6.0"
  },
  {
    emoji: "🇳🇱",
    aliases: ["netherlands"],
    tags: [],
    category: "Flags",
    description: "flag: Netherlands",
    unicode_version: "6.0"
  },
  {
    emoji: "🇳🇴",
    aliases: ["norway"],
    tags: [],
    category: "Flags",
    description: "flag: Norway",
    unicode_version: "6.0"
  },
  {
    emoji: "🇳🇵",
    aliases: ["nepal"],
    tags: [],
    category: "Flags",
    description: "flag: Nepal",
    unicode_version: "6.0"
  },
  {
    emoji: "🇳🇷",
    aliases: ["nauru"],
    tags: [],
    category: "Flags",
    description: "flag: Nauru",
    unicode_version: "6.0"
  },
  {
    emoji: "🇳🇺",
    aliases: ["niue"],
    tags: [],
    category: "Flags",
    description: "flag: Niue",
    unicode_version: "6.0"
  },
  {
    emoji: "🇳🇿",
    aliases: ["new_zealand"],
    tags: [],
    category: "Flags",
    description: "flag: New Zealand",
    unicode_version: "6.0"
  },
  {
    emoji: "🇴🇲",
    aliases: ["oman"],
    tags: [],
    category: "Flags",
    description: "flag: Oman",
    unicode_version: "6.0"
  },
  {
    emoji: "🇵🇦",
    aliases: ["panama"],
    tags: [],
    category: "Flags",
    description: "flag: Panama",
    unicode_version: "6.0"
  },
  {
    emoji: "🇵🇪",
    aliases: ["peru"],
    tags: [],
    category: "Flags",
    description: "flag: Peru",
    unicode_version: "6.0"
  },
  {
    emoji: "🇵🇫",
    aliases: ["french_polynesia"],
    tags: [],
    category: "Flags",
    description: "flag: French Polynesia",
    unicode_version: "6.0"
  },
  {
    emoji: "🇵🇬",
    aliases: ["papua_new_guinea"],
    tags: [],
    category: "Flags",
    description: "flag: Papua New Guinea",
    unicode_version: "6.0"
  },
  {
    emoji: "🇵🇭",
    aliases: ["philippines"],
    tags: [],
    category: "Flags",
    description: "flag: Philippines",
    unicode_version: "6.0"
  },
  {
    emoji: "🇵🇰",
    aliases: ["pakistan"],
    tags: [],
    category: "Flags",
    description: "flag: Pakistan",
    unicode_version: "6.0"
  },
  {
    emoji: "🇵🇱",
    aliases: ["poland"],
    tags: [],
    category: "Flags",
    description: "flag: Poland",
    unicode_version: "6.0"
  },
  {
    emoji: "🇵🇲",
    aliases: ["st_pierre_miquelon"],
    tags: [],
    category: "Flags",
    description: "flag: St. Pierre & Miquelon",
    unicode_version: "6.0"
  },
  {
    emoji: "🇵🇳",
    aliases: ["pitcairn_islands"],
    tags: [],
    category: "Flags",
    description: "flag: Pitcairn Islands",
    unicode_version: "6.0"
  },
  {
    emoji: "🇵🇷",
    aliases: ["puerto_rico"],
    tags: [],
    category: "Flags",
    description: "flag: Puerto Rico",
    unicode_version: "6.0"
  },
  {
    emoji: "🇵🇸",
    aliases: ["palestinian_territories"],
    tags: [],
    category: "Flags",
    description: "flag: Palestinian Territories",
    unicode_version: "6.0"
  },
  {
    emoji: "🇵🇹",
    aliases: ["portugal"],
    tags: [],
    category: "Flags",
    description: "flag: Portugal",
    unicode_version: "6.0"
  },
  {
    emoji: "🇵🇼",
    aliases: ["palau"],
    tags: [],
    category: "Flags",
    description: "flag: Palau",
    unicode_version: "6.0"
  },
  {
    emoji: "🇵🇾",
    aliases: ["paraguay"],
    tags: [],
    category: "Flags",
    description: "flag: Paraguay",
    unicode_version: "6.0"
  },
  {
    emoji: "🇶🇦",
    aliases: ["qatar"],
    tags: [],
    category: "Flags",
    description: "flag: Qatar",
    unicode_version: "6.0"
  },
  {
    emoji: "🇷🇪",
    aliases: ["reunion"],
    tags: [],
    category: "Flags",
    description: "flag: Réunion",
    unicode_version: "6.0"
  },
  {
    emoji: "🇷🇴",
    aliases: ["romania"],
    tags: [],
    category: "Flags",
    description: "flag: Romania",
    unicode_version: "6.0"
  },
  {
    emoji: "🇷🇸",
    aliases: ["serbia"],
    tags: [],
    category: "Flags",
    description: "flag: Serbia",
    unicode_version: "6.0"
  },
  {
    emoji: "🇷🇺",
    aliases: ["ru"],
    tags: ["russia"],
    category: "Flags",
    description: "flag: Russia",
    unicode_version: "6.0"
  },
  {
    emoji: "🇷🇼",
    aliases: ["rwanda"],
    tags: [],
    category: "Flags",
    description: "flag: Rwanda",
    unicode_version: "6.0"
  },
  {
    emoji: "🇸🇦",
    aliases: ["saudi_arabia"],
    tags: [],
    category: "Flags",
    description: "flag: Saudi Arabia",
    unicode_version: "6.0"
  },
  {
    emoji: "🇸🇧",
    aliases: ["solomon_islands"],
    tags: [],
    category: "Flags",
    description: "flag: Solomon Islands",
    unicode_version: "6.0"
  },
  {
    emoji: "🇸🇨",
    aliases: ["seychelles"],
    tags: [],
    category: "Flags",
    description: "flag: Seychelles",
    unicode_version: "6.0"
  },
  {
    emoji: "🇸🇩",
    aliases: ["sudan"],
    tags: [],
    category: "Flags",
    description: "flag: Sudan",
    unicode_version: "6.0"
  },
  {
    emoji: "🇸🇪",
    aliases: ["sweden"],
    tags: [],
    category: "Flags",
    description: "flag: Sweden",
    unicode_version: "6.0"
  },
  {
    emoji: "🇸🇬",
    aliases: ["singapore"],
    tags: [],
    category: "Flags",
    description: "flag: Singapore",
    unicode_version: "6.0"
  },
  {
    emoji: "🇸🇭",
    aliases: ["st_helena"],
    tags: [],
    category: "Flags",
    description: "flag: St. Helena",
    unicode_version: "6.0"
  },
  {
    emoji: "🇸🇮",
    aliases: ["slovenia"],
    tags: [],
    category: "Flags",
    description: "flag: Slovenia",
    unicode_version: "6.0"
  },
  {
    emoji: "🇸🇯",
    aliases: ["svalbard_jan_mayen"],
    tags: [],
    category: "Flags",
    description: "flag: Svalbard & Jan Mayen",
    unicode_version: "11.0"
  },
  {
    emoji: "🇸🇰",
    aliases: ["slovakia"],
    tags: [],
    category: "Flags",
    description: "flag: Slovakia",
    unicode_version: "6.0"
  },
  {
    emoji: "🇸🇱",
    aliases: ["sierra_leone"],
    tags: [],
    category: "Flags",
    description: "flag: Sierra Leone",
    unicode_version: "6.0"
  },
  {
    emoji: "🇸🇲",
    aliases: ["san_marino"],
    tags: [],
    category: "Flags",
    description: "flag: San Marino",
    unicode_version: "6.0"
  },
  {
    emoji: "🇸🇳",
    aliases: ["senegal"],
    tags: [],
    category: "Flags",
    description: "flag: Senegal",
    unicode_version: "6.0"
  },
  {
    emoji: "🇸🇴",
    aliases: ["somalia"],
    tags: [],
    category: "Flags",
    description: "flag: Somalia",
    unicode_version: "6.0"
  },
  {
    emoji: "🇸🇷",
    aliases: ["suriname"],
    tags: [],
    category: "Flags",
    description: "flag: Suriname",
    unicode_version: "6.0"
  },
  {
    emoji: "🇸🇸",
    aliases: ["south_sudan"],
    tags: [],
    category: "Flags",
    description: "flag: South Sudan",
    unicode_version: "6.0"
  },
  {
    emoji: "🇸🇹",
    aliases: ["sao_tome_principe"],
    tags: [],
    category: "Flags",
    description: "flag: São Tomé & Príncipe",
    unicode_version: "6.0"
  },
  {
    emoji: "🇸🇻",
    aliases: ["el_salvador"],
    tags: [],
    category: "Flags",
    description: "flag: El Salvador",
    unicode_version: "6.0"
  },
  {
    emoji: "🇸🇽",
    aliases: ["sint_maarten"],
    tags: [],
    category: "Flags",
    description: "flag: Sint Maarten",
    unicode_version: "6.0"
  },
  {
    emoji: "🇸🇾",
    aliases: ["syria"],
    tags: [],
    category: "Flags",
    description: "flag: Syria",
    unicode_version: "6.0"
  },
  {
    emoji: "🇸🇿",
    aliases: ["swaziland"],
    tags: [],
    category: "Flags",
    description: "flag: Eswatini",
    unicode_version: "6.0"
  },
  {
    emoji: "🇹🇦",
    aliases: ["tristan_da_cunha"],
    tags: [],
    category: "Flags",
    description: "flag: Tristan da Cunha",
    unicode_version: "11.0"
  },
  {
    emoji: "🇹🇨",
    aliases: ["turks_caicos_islands"],
    tags: [],
    category: "Flags",
    description: "flag: Turks & Caicos Islands",
    unicode_version: "6.0"
  },
  {
    emoji: "🇹🇩",
    aliases: ["chad"],
    tags: [],
    category: "Flags",
    description: "flag: Chad",
    unicode_version: "6.0"
  },
  {
    emoji: "🇹🇫",
    aliases: ["french_southern_territories"],
    tags: [],
    category: "Flags",
    description: "flag: French Southern Territories",
    unicode_version: "6.0"
  },
  {
    emoji: "🇹🇬",
    aliases: ["togo"],
    tags: [],
    category: "Flags",
    description: "flag: Togo",
    unicode_version: "6.0"
  },
  {
    emoji: "🇹🇭",
    aliases: ["thailand"],
    tags: [],
    category: "Flags",
    description: "flag: Thailand",
    unicode_version: "6.0"
  },
  {
    emoji: "🇹🇯",
    aliases: ["tajikistan"],
    tags: [],
    category: "Flags",
    description: "flag: Tajikistan",
    unicode_version: "6.0"
  },
  {
    emoji: "🇹🇰",
    aliases: ["tokelau"],
    tags: [],
    category: "Flags",
    description: "flag: Tokelau",
    unicode_version: "6.0"
  },
  {
    emoji: "🇹🇱",
    aliases: ["timor_leste"],
    tags: [],
    category: "Flags",
    description: "flag: Timor-Leste",
    unicode_version: "6.0"
  },
  {
    emoji: "🇹🇲",
    aliases: ["turkmenistan"],
    tags: [],
    category: "Flags",
    description: "flag: Turkmenistan",
    unicode_version: "6.0"
  },
  {
    emoji: "🇹🇳",
    aliases: ["tunisia"],
    tags: [],
    category: "Flags",
    description: "flag: Tunisia",
    unicode_version: "6.0"
  },
  {
    emoji: "🇹🇴",
    aliases: ["tonga"],
    tags: [],
    category: "Flags",
    description: "flag: Tonga",
    unicode_version: "6.0"
  },
  {
    emoji: "🇹🇷",
    aliases: ["tr"],
    tags: ["turkey"],
    category: "Flags",
    description: "flag: Turkey",
    unicode_version: "8.0"
  },
  {
    emoji: "🇹🇹",
    aliases: ["trinidad_tobago"],
    tags: [],
    category: "Flags",
    description: "flag: Trinidad & Tobago",
    unicode_version: "6.0"
  },
  {
    emoji: "🇹🇻",
    aliases: ["tuvalu"],
    tags: [],
    category: "Flags",
    description: "flag: Tuvalu",
    unicode_version: "6.0"
  },
  {
    emoji: "🇹🇼",
    aliases: ["taiwan"],
    tags: [],
    category: "Flags",
    description: "flag: Taiwan",
    unicode_version: "6.0"
  },
  {
    emoji: "🇹🇿",
    aliases: ["tanzania"],
    tags: [],
    category: "Flags",
    description: "flag: Tanzania",
    unicode_version: "6.0"
  },
  {
    emoji: "🇺🇦",
    aliases: ["ukraine"],
    tags: [],
    category: "Flags",
    description: "flag: Ukraine",
    unicode_version: "6.0"
  },
  {
    emoji: "🇺🇬",
    aliases: ["uganda"],
    tags: [],
    category: "Flags",
    description: "flag: Uganda",
    unicode_version: "6.0"
  },
  {
    emoji: "🇺🇲",
    aliases: ["us_outlying_islands"],
    tags: [],
    category: "Flags",
    description: "flag: U.S. Outlying Islands",
    unicode_version: "11.0"
  },
  {
    emoji: "🇺🇳",
    aliases: ["united_nations"],
    tags: [],
    category: "Flags",
    description: "flag: United Nations",
    unicode_version: "11.0"
  },
  {
    emoji: "🇺🇸",
    aliases: ["us"],
    tags: ["flag", "united", "america"],
    category: "Flags",
    description: "flag: United States",
    unicode_version: "6.0"
  },
  {
    emoji: "🇺🇾",
    aliases: ["uruguay"],
    tags: [],
    category: "Flags",
    description: "flag: Uruguay",
    unicode_version: "6.0"
  },
  {
    emoji: "🇺🇿",
    aliases: ["uzbekistan"],
    tags: [],
    category: "Flags",
    description: "flag: Uzbekistan",
    unicode_version: "6.0"
  },
  {
    emoji: "🇻🇦",
    aliases: ["vatican_city"],
    tags: [],
    category: "Flags",
    description: "flag: Vatican City",
    unicode_version: "6.0"
  },
  {
    emoji: "🇻🇨",
    aliases: ["st_vincent_grenadines"],
    tags: [],
    category: "Flags",
    description: "flag: St. Vincent & Grenadines",
    unicode_version: "6.0"
  },
  {
    emoji: "🇻🇪",
    aliases: ["venezuela"],
    tags: [],
    category: "Flags",
    description: "flag: Venezuela",
    unicode_version: "6.0"
  },
  {
    emoji: "🇻🇬",
    aliases: ["british_virgin_islands"],
    tags: [],
    category: "Flags",
    description: "flag: British Virgin Islands",
    unicode_version: "6.0"
  },
  {
    emoji: "🇻🇮",
    aliases: ["us_virgin_islands"],
    tags: [],
    category: "Flags",
    description: "flag: U.S. Virgin Islands",
    unicode_version: "6.0"
  },
  {
    emoji: "🇻🇳",
    aliases: ["vietnam"],
    tags: [],
    category: "Flags",
    description: "flag: Vietnam",
    unicode_version: "6.0"
  },
  {
    emoji: "🇻🇺",
    aliases: ["vanuatu"],
    tags: [],
    category: "Flags",
    description: "flag: Vanuatu",
    unicode_version: "6.0"
  },
  {
    emoji: "🇼🇫",
    aliases: ["wallis_futuna"],
    tags: [],
    category: "Flags",
    description: "flag: Wallis & Futuna",
    unicode_version: "6.0"
  },
  {
    emoji: "🇼🇸",
    aliases: ["samoa"],
    tags: [],
    category: "Flags",
    description: "flag: Samoa",
    unicode_version: "6.0"
  },
  {
    emoji: "🇽🇰",
    aliases: ["kosovo"],
    tags: [],
    category: "Flags",
    description: "flag: Kosovo",
    unicode_version: "6.0"
  },
  {
    emoji: "🇾🇪",
    aliases: ["yemen"],
    tags: [],
    category: "Flags",
    description: "flag: Yemen",
    unicode_version: "6.0"
  },
  {
    emoji: "🇾🇹",
    aliases: ["mayotte"],
    tags: [],
    category: "Flags",
    description: "flag: Mayotte",
    unicode_version: "6.0"
  },
  {
    emoji: "🇿🇦",
    aliases: ["south_africa"],
    tags: [],
    category: "Flags",
    description: "flag: South Africa",
    unicode_version: "6.0"
  },
  {
    emoji: "🇿🇲",
    aliases: ["zambia"],
    tags: [],
    category: "Flags",
    description: "flag: Zambia",
    unicode_version: "6.0"
  },
  {
    emoji: "🇿🇼",
    aliases: ["zimbabwe"],
    tags: [],
    category: "Flags",
    description: "flag: Zimbabwe",
    unicode_version: "6.0"
  },
  {
    emoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    aliases: ["england"],
    tags: [],
    category: "Flags",
    description: "flag: England",
    unicode_version: "11.0"
  },
  {
    emoji: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
    aliases: ["scotland"],
    tags: [],
    category: "Flags",
    description: "flag: Scotland",
    unicode_version: "11.0"
  },
  {
    emoji: "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
    aliases: ["wales"],
    tags: [],
    category: "Flags",
    description: "flag: Wales",
    unicode_version: "11.0"
  }
], Gt = Object.fromEntries(cr.flatMap((i) => i.aliases.map((e) => [e, i.emoji]))), ls = (i) => i ? i.filter((e) => e in Gt).map((e) => Gt[e]) : [], lr = (i) => {
  const e = ls(i.tags);
  return e.length > 0 ? `${e.join(" ")} ${i.title}` : i.title;
}, ur = (i, e) => i.title ? lr(i) : e, dr = (i) => {
  if (i.title)
    return i.message;
  const e = ls(i.tags);
  return e.length > 0 ? `${e.join(" ")} ${i.message}` : i.message;
}, Xt = /\.(png|jpe?g|gif|webp)$/i, gr = (i) => {
  var e, o;
  return i ? i.type ? i.type.startsWith("image/") : ((e = i.name) == null ? void 0 : e.match(Xt)) || ((o = i.url) == null ? void 0 : o.match(Xt)) : !1;
}, ho = "/static/images/ntfy.png", vo = "/static/images/mask-icon.svg", pr = ({ subscriptionId: i, message: e, defaultTitle: o, topicRoute: t }) => {
  var s;
  const a = gr(e.attachment) ? e.attachment.url : void 0;
  return [
    ur(e, o),
    {
      body: dr(e),
      badge: vo,
      icon: ho,
      image: a,
      timestamp: e.time * 1e3,
      tag: i,
      renotify: !0,
      silent: !1,
      // This is used by the notification onclick event
      data: {
        message: e,
        topicRoute: t
      },
      actions: (s = e.actions) == null ? void 0 : s.filter(({ action: n }) => n === "view" || n === "http").map(({ label: n }) => ({
        action: n,
        title: n
      }))
    }
  ];
};
function re(i) {
  "@babel/helpers - typeof";
  return re = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, re(i);
}
function oe(i, e) {
  if (!(i instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function mr(i, e) {
  if (re(i) != "object" || !i)
    return i;
  var o = i[Symbol.toPrimitive];
  if (o !== void 0) {
    var t = o.call(i, e || "default");
    if (re(t) != "object")
      return t;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(i);
}
function us(i) {
  var e = mr(i, "string");
  return re(e) == "symbol" ? e : e + "";
}
function Yt(i, e) {
  for (var o = 0; o < e.length; o++) {
    var t = e[o];
    t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(i, us(t.key), t);
  }
}
function te(i, e, o) {
  return e && Yt(i.prototype, e), o && Yt(i, o), Object.defineProperty(i, "prototype", {
    writable: !1
  }), i;
}
function Ee(i) {
  if (i === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return i;
}
function rt(i, e) {
  return rt = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(o, t) {
    return o.__proto__ = t, o;
  }, rt(i, e);
}
function _o(i, e) {
  if (typeof e != "function" && e !== null)
    throw new TypeError("Super expression must either be null or a function");
  i.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: i,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(i, "prototype", {
    writable: !1
  }), e && rt(i, e);
}
function Bi(i, e) {
  if (e && (re(e) == "object" || typeof e == "function"))
    return e;
  if (e !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return Ee(i);
}
function ge(i) {
  return ge = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, ge(i);
}
function ke(i, e, o) {
  return (e = us(e)) in i ? Object.defineProperty(i, e, {
    value: o,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : i[e] = o, i;
}
function yr(i) {
  if (Array.isArray(i))
    return i;
}
function fr(i) {
  if (typeof Symbol < "u" && i[Symbol.iterator] != null || i["@@iterator"] != null)
    return Array.from(i);
}
function Qt(i, e) {
  (e == null || e > i.length) && (e = i.length);
  for (var o = 0, t = Array(e); o < e; o++)
    t[o] = i[o];
  return t;
}
function hr(i, e) {
  if (i) {
    if (typeof i == "string")
      return Qt(i, e);
    var o = {}.toString.call(i).slice(8, -1);
    return o === "Object" && i.constructor && (o = i.constructor.name), o === "Map" || o === "Set" ? Array.from(i) : o === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o) ? Qt(i, e) : void 0;
  }
}
function vr() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function _r(i) {
  return yr(i) || fr(i) || hr(i) || vr();
}
function Zt(i, e) {
  var o = Object.keys(i);
  if (Object.getOwnPropertySymbols) {
    var t = Object.getOwnPropertySymbols(i);
    e && (t = t.filter(function(a) {
      return Object.getOwnPropertyDescriptor(i, a).enumerable;
    })), o.push.apply(o, t);
  }
  return o;
}
function ea(i) {
  for (var e = 1; e < arguments.length; e++) {
    var o = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Zt(Object(o), !0).forEach(function(t) {
      ke(i, t, o[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(i, Object.getOwnPropertyDescriptors(o)) : Zt(Object(o)).forEach(function(t) {
      Object.defineProperty(i, t, Object.getOwnPropertyDescriptor(o, t));
    });
  }
  return i;
}
var br = {
  type: "logger",
  log: function(e) {
    this.output("log", e);
  },
  warn: function(e) {
    this.output("warn", e);
  },
  error: function(e) {
    this.output("error", e);
  },
  output: function(e, o) {
    console && console[e] && console[e].apply(console, o);
  }
}, jr = function() {
  function i(e) {
    var o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    oe(this, i), this.init(e, o);
  }
  return te(i, [{
    key: "init",
    value: function(o) {
      var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      this.prefix = t.prefix || "i18next:", this.logger = o || br, this.options = t, this.debug = t.debug;
    }
  }, {
    key: "setDebug",
    value: function(o) {
      this.debug = o;
    }
  }, {
    key: "log",
    value: function() {
      for (var o = arguments.length, t = new Array(o), a = 0; a < o; a++)
        t[a] = arguments[a];
      return this.forward(t, "log", "", !0);
    }
  }, {
    key: "warn",
    value: function() {
      for (var o = arguments.length, t = new Array(o), a = 0; a < o; a++)
        t[a] = arguments[a];
      return this.forward(t, "warn", "", !0);
    }
  }, {
    key: "error",
    value: function() {
      for (var o = arguments.length, t = new Array(o), a = 0; a < o; a++)
        t[a] = arguments[a];
      return this.forward(t, "error", "");
    }
  }, {
    key: "deprecate",
    value: function() {
      for (var o = arguments.length, t = new Array(o), a = 0; a < o; a++)
        t[a] = arguments[a];
      return this.forward(t, "warn", "WARNING DEPRECATED: ", !0);
    }
  }, {
    key: "forward",
    value: function(o, t, a, s) {
      return s && !this.debug ? null : (typeof o[0] == "string" && (o[0] = "".concat(a).concat(this.prefix, " ").concat(o[0])), this.logger[t](o));
    }
  }, {
    key: "create",
    value: function(o) {
      return new i(this.logger, ea(ea({}, {
        prefix: "".concat(this.prefix, ":").concat(o, ":")
      }), this.options));
    }
  }, {
    key: "clone",
    value: function(o) {
      return o = o || this.options, o.prefix = o.prefix || this.prefix, new i(this.logger, o);
    }
  }]), i;
}(), de = new jr(), Ce = function() {
  function i() {
    oe(this, i), this.observers = {};
  }
  return te(i, [{
    key: "on",
    value: function(o, t) {
      var a = this;
      return o.split(" ").forEach(function(s) {
        a.observers[s] = a.observers[s] || [], a.observers[s].push(t);
      }), this;
    }
  }, {
    key: "off",
    value: function(o, t) {
      if (this.observers[o]) {
        if (!t) {
          delete this.observers[o];
          return;
        }
        this.observers[o] = this.observers[o].filter(function(a) {
          return a !== t;
        });
      }
    }
  }, {
    key: "emit",
    value: function(o) {
      for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++)
        a[s - 1] = arguments[s];
      if (this.observers[o]) {
        var n = [].concat(this.observers[o]);
        n.forEach(function(c) {
          c.apply(void 0, a);
        });
      }
      if (this.observers["*"]) {
        var r = [].concat(this.observers["*"]);
        r.forEach(function(c) {
          c.apply(c, [o].concat(a));
        });
      }
    }
  }]), i;
}();
function ci() {
  var i, e, o = new Promise(function(t, a) {
    i = t, e = a;
  });
  return o.resolve = i, o.reject = e, o;
}
function ia(i) {
  return i == null ? "" : "" + i;
}
function wr(i, e, o) {
  i.forEach(function(t) {
    e[t] && (o[t] = e[t]);
  });
}
function St(i, e, o) {
  function t(r) {
    return r && r.indexOf("###") > -1 ? r.replace(/###/g, ".") : r;
  }
  function a() {
    return !i || typeof i == "string";
  }
  for (var s = typeof e != "string" ? [].concat(e) : e.split("."); s.length > 1; ) {
    if (a())
      return {};
    var n = t(s.shift());
    !i[n] && o && (i[n] = new o()), Object.prototype.hasOwnProperty.call(i, n) ? i = i[n] : i = {};
  }
  return a() ? {} : {
    obj: i,
    k: t(s.shift())
  };
}
function oa(i, e, o) {
  var t = St(i, e, Object), a = t.obj, s = t.k;
  a[s] = o;
}
function kr(i, e, o, t) {
  var a = St(i, e, Object), s = a.obj, n = a.k;
  s[n] = s[n] || [], t && (s[n] = s[n].concat(o)), t || s[n].push(o);
}
function lo(i, e) {
  var o = St(i, e), t = o.obj, a = o.k;
  if (t)
    return t[a];
}
function ta(i, e, o) {
  var t = lo(i, o);
  return t !== void 0 ? t : lo(e, o);
}
function ds(i, e, o) {
  for (var t in e)
    t !== "__proto__" && t !== "constructor" && (t in i ? typeof i[t] == "string" || i[t] instanceof String || typeof e[t] == "string" || e[t] instanceof String ? o && (i[t] = e[t]) : ds(i[t], e[t], o) : i[t] = e[t]);
  return i;
}
function He(i) {
  return i.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
var Pr = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;"
};
function Sr(i) {
  return typeof i == "string" ? i.replace(/[&<>"'\/]/g, function(e) {
    return Pr[e];
  }) : i;
}
var bo = typeof window < "u" && window.navigator && typeof window.navigator.userAgentData > "u" && window.navigator.userAgent && window.navigator.userAgent.indexOf("MSIE") > -1, Or = [" ", ",", "?", "!", ";"];
function xr(i, e, o) {
  e = e || "", o = o || "";
  var t = Or.filter(function(r) {
    return e.indexOf(r) < 0 && o.indexOf(r) < 0;
  });
  if (t.length === 0)
    return !0;
  var a = new RegExp("(".concat(t.map(function(r) {
    return r === "?" ? "\\?" : r;
  }).join("|"), ")")), s = !a.test(i);
  if (!s) {
    var n = i.indexOf(o);
    n > 0 && !a.test(i.substring(0, n)) && (s = !0);
  }
  return s;
}
function aa(i, e) {
  var o = Object.keys(i);
  if (Object.getOwnPropertySymbols) {
    var t = Object.getOwnPropertySymbols(i);
    e && (t = t.filter(function(a) {
      return Object.getOwnPropertyDescriptor(i, a).enumerable;
    })), o.push.apply(o, t);
  }
  return o;
}
function Ui(i) {
  for (var e = 1; e < arguments.length; e++) {
    var o = arguments[e] != null ? arguments[e] : {};
    e % 2 ? aa(Object(o), !0).forEach(function(t) {
      ke(i, t, o[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(i, Object.getOwnPropertyDescriptors(o)) : aa(Object(o)).forEach(function(t) {
      Object.defineProperty(i, t, Object.getOwnPropertyDescriptor(o, t));
    });
  }
  return i;
}
function Fr(i) {
  var e = Br();
  return function() {
    var t = ge(i), a;
    if (e) {
      var s = ge(this).constructor;
      a = Reflect.construct(t, arguments, s);
    } else
      a = t.apply(this, arguments);
    return Bi(this, a);
  };
}
function Br() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function gs(i, e) {
  var o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ".";
  if (i) {
    if (i[e])
      return i[e];
    for (var t = e.split(o), a = i, s = 0; s < t.length; ++s) {
      if (!a || typeof a[t[s]] == "string" && s + 1 < t.length)
        return;
      if (a[t[s]] === void 0) {
        for (var n = 2, r = t.slice(s, s + n).join(o), c = a[r]; c === void 0 && t.length > s + n; )
          n++, r = t.slice(s, s + n).join(o), c = a[r];
        if (c === void 0)
          return;
        if (c === null)
          return null;
        if (e.endsWith(r)) {
          if (typeof c == "string")
            return c;
          if (r && typeof c[r] == "string")
            return c[r];
        }
        var l = t.slice(s + n).join(o);
        return l ? gs(c, l, o) : void 0;
      }
      a = a[t[s]];
    }
    return a;
  }
}
var Er = function(i) {
  _o(o, i);
  var e = Fr(o);
  function o(t) {
    var a, s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
      ns: ["translation"],
      defaultNS: "translation"
    };
    return oe(this, o), a = e.call(this), bo && Ce.call(Ee(a)), a.data = t || {}, a.options = s, a.options.keySeparator === void 0 && (a.options.keySeparator = "."), a.options.ignoreJSONStructure === void 0 && (a.options.ignoreJSONStructure = !0), a;
  }
  return te(o, [{
    key: "addNamespaces",
    value: function(a) {
      this.options.ns.indexOf(a) < 0 && this.options.ns.push(a);
    }
  }, {
    key: "removeNamespaces",
    value: function(a) {
      var s = this.options.ns.indexOf(a);
      s > -1 && this.options.ns.splice(s, 1);
    }
  }, {
    key: "getResource",
    value: function(a, s, n) {
      var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, c = r.keySeparator !== void 0 ? r.keySeparator : this.options.keySeparator, l = r.ignoreJSONStructure !== void 0 ? r.ignoreJSONStructure : this.options.ignoreJSONStructure, u = [a, s];
      n && typeof n != "string" && (u = u.concat(n)), n && typeof n == "string" && (u = u.concat(c ? n.split(c) : n)), a.indexOf(".") > -1 && (u = a.split("."));
      var d = lo(this.data, u);
      return d || !l || typeof n != "string" ? d : gs(this.data && this.data[a] && this.data[a][s], n, c);
    }
  }, {
    key: "addResource",
    value: function(a, s, n, r) {
      var c = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : {
        silent: !1
      }, l = this.options.keySeparator;
      l === void 0 && (l = ".");
      var u = [a, s];
      n && (u = u.concat(l ? n.split(l) : n)), a.indexOf(".") > -1 && (u = a.split("."), r = s, s = u[1]), this.addNamespaces(s), oa(this.data, u, r), c.silent || this.emit("added", a, s, n, r);
    }
  }, {
    key: "addResources",
    value: function(a, s, n) {
      var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {
        silent: !1
      };
      for (var c in n)
        (typeof n[c] == "string" || Object.prototype.toString.apply(n[c]) === "[object Array]") && this.addResource(a, s, c, n[c], {
          silent: !0
        });
      r.silent || this.emit("added", a, s, n);
    }
  }, {
    key: "addResourceBundle",
    value: function(a, s, n, r, c) {
      var l = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : {
        silent: !1
      }, u = [a, s];
      a.indexOf(".") > -1 && (u = a.split("."), r = n, n = s, s = u[1]), this.addNamespaces(s);
      var d = lo(this.data, u) || {};
      r ? ds(d, n, c) : d = Ui(Ui({}, d), n), oa(this.data, u, d), l.silent || this.emit("added", a, s, n);
    }
  }, {
    key: "removeResourceBundle",
    value: function(a, s) {
      this.hasResourceBundle(a, s) && delete this.data[a][s], this.removeNamespaces(s), this.emit("removed", a, s);
    }
  }, {
    key: "hasResourceBundle",
    value: function(a, s) {
      return this.getResource(a, s) !== void 0;
    }
  }, {
    key: "getResourceBundle",
    value: function(a, s) {
      return s || (s = this.options.defaultNS), this.options.compatibilityAPI === "v1" ? Ui(Ui({}, {}), this.getResource(a, s)) : this.getResource(a, s);
    }
  }, {
    key: "getDataByLanguage",
    value: function(a) {
      return this.data[a];
    }
  }, {
    key: "hasLanguageSomeTranslations",
    value: function(a) {
      var s = this.getDataByLanguage(a), n = s && Object.keys(s) || [];
      return !!n.find(function(r) {
        return s[r] && Object.keys(s[r]).length > 0;
      });
    }
  }, {
    key: "toJSON",
    value: function() {
      return this.data;
    }
  }]), o;
}(Ce), ps = {
  processors: {},
  addPostProcessor: function(e) {
    this.processors[e.name] = e;
  },
  handle: function(e, o, t, a, s) {
    var n = this;
    return e.forEach(function(r) {
      n.processors[r] && (o = n.processors[r].process(o, t, a, s));
    }), o;
  }
};
function sa(i, e) {
  var o = Object.keys(i);
  if (Object.getOwnPropertySymbols) {
    var t = Object.getOwnPropertySymbols(i);
    e && (t = t.filter(function(a) {
      return Object.getOwnPropertyDescriptor(i, a).enumerable;
    })), o.push.apply(o, t);
  }
  return o;
}
function J(i) {
  for (var e = 1; e < arguments.length; e++) {
    var o = arguments[e] != null ? arguments[e] : {};
    e % 2 ? sa(Object(o), !0).forEach(function(t) {
      ke(i, t, o[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(i, Object.getOwnPropertyDescriptors(o)) : sa(Object(o)).forEach(function(t) {
      Object.defineProperty(i, t, Object.getOwnPropertyDescriptor(o, t));
    });
  }
  return i;
}
function Ar(i) {
  var e = Tr();
  return function() {
    var t = ge(i), a;
    if (e) {
      var s = ge(this).constructor;
      a = Reflect.construct(t, arguments, s);
    } else
      a = t.apply(this, arguments);
    return Bi(this, a);
  };
}
function Tr() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
var na = {}, ra = function(i) {
  _o(o, i);
  var e = Ar(o);
  function o(t) {
    var a, s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    return oe(this, o), a = e.call(this), bo && Ce.call(Ee(a)), wr(["resourceStore", "languageUtils", "pluralResolver", "interpolator", "backendConnector", "i18nFormat", "utils"], t, Ee(a)), a.options = s, a.options.keySeparator === void 0 && (a.options.keySeparator = "."), a.logger = de.create("translator"), a;
  }
  return te(o, [{
    key: "changeLanguage",
    value: function(a) {
      a && (this.language = a);
    }
  }, {
    key: "exists",
    value: function(a) {
      var s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
        interpolation: {}
      };
      if (a == null)
        return !1;
      var n = this.resolve(a, s);
      return n && n.res !== void 0;
    }
  }, {
    key: "extractFromKey",
    value: function(a, s) {
      var n = s.nsSeparator !== void 0 ? s.nsSeparator : this.options.nsSeparator;
      n === void 0 && (n = ":");
      var r = s.keySeparator !== void 0 ? s.keySeparator : this.options.keySeparator, c = s.ns || this.options.defaultNS || [], l = n && a.indexOf(n) > -1, u = !this.options.userDefinedKeySeparator && !s.keySeparator && !this.options.userDefinedNsSeparator && !s.nsSeparator && !xr(a, n, r);
      if (l && !u) {
        var d = a.match(this.interpolator.nestingRegexp);
        if (d && d.length > 0)
          return {
            key: a,
            namespaces: c
          };
        var g = a.split(n);
        (n !== r || n === r && this.options.ns.indexOf(g[0]) > -1) && (c = g.shift()), a = g.join(r);
      }
      return typeof c == "string" && (c = [c]), {
        key: a,
        namespaces: c
      };
    }
  }, {
    key: "translate",
    value: function(a, s, n) {
      var r = this;
      if (re(s) !== "object" && this.options.overloadTranslationOptionHandler && (s = this.options.overloadTranslationOptionHandler(arguments)), s || (s = {}), a == null)
        return "";
      Array.isArray(a) || (a = [String(a)]);
      var c = s.returnDetails !== void 0 ? s.returnDetails : this.options.returnDetails, l = s.keySeparator !== void 0 ? s.keySeparator : this.options.keySeparator, u = this.extractFromKey(a[a.length - 1], s), d = u.key, g = u.namespaces, p = g[g.length - 1], h = s.lng || this.language, v = s.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
      if (h && h.toLowerCase() === "cimode") {
        if (v) {
          var b = s.nsSeparator || this.options.nsSeparator;
          return c ? (y.res = "".concat(p).concat(b).concat(d), y) : "".concat(p).concat(b).concat(d);
        }
        return c ? (y.res = d, y) : d;
      }
      var y = this.resolve(a, s), m = y && y.res, j = y && y.usedKey || d, w = y && y.exactUsedKey || d, S = Object.prototype.toString.apply(m), O = ["[object Number]", "[object Function]", "[object RegExp]"], k = s.joinArrays !== void 0 ? s.joinArrays : this.options.joinArrays, E = !this.i18nFormat || this.i18nFormat.handleAsObject, x = typeof m != "string" && typeof m != "boolean" && typeof m != "number";
      if (E && m && x && O.indexOf(S) < 0 && !(typeof k == "string" && S === "[object Array]")) {
        if (!s.returnObjects && !this.options.returnObjects) {
          this.options.returnedObjectHandler || this.logger.warn("accessing an object - but returnObjects options is not enabled!");
          var L = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(j, m, J(J({}, s), {}, {
            ns: g
          })) : "key '".concat(d, " (").concat(this.language, ")' returned an object instead of string.");
          return c ? (y.res = L, y) : L;
        }
        if (l) {
          var R = S === "[object Array]", M = R ? [] : {}, $ = R ? w : j;
          for (var f in m)
            if (Object.prototype.hasOwnProperty.call(m, f)) {
              var P = "".concat($).concat(l).concat(f);
              M[f] = this.translate(P, J(J({}, s), {
                joinArrays: !1,
                ns: g
              })), M[f] === P && (M[f] = m[f]);
            }
          m = M;
        }
      } else if (E && typeof k == "string" && S === "[object Array]")
        m = m.join(k), m && (m = this.extendTranslation(m, a, s, n));
      else {
        var A = !1, C = !1, I = s.count !== void 0 && typeof s.count != "string", N = o.hasDefaultValue(s), ce = I ? this.pluralResolver.getSuffix(h, s.count, s) : "", ae = s["defaultValue".concat(ce)] || s.defaultValue;
        !this.isValidLookup(m) && N && (A = !0, m = ae), this.isValidLookup(m) || (C = !0, m = d);
        var oi = s.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey, Es = oi && C ? void 0 : m, ti = N && ae !== m && this.options.updateMissing;
        if (C || A || ti) {
          if (this.logger.log(ti ? "updateKey" : "missingKey", h, p, d, ti ? ae : m), l) {
            var At = this.resolve(d, J(J({}, s), {}, {
              keySeparator: !1
            }));
            At && At.res && this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.");
          }
          var ai = [], Ai = this.languageUtils.getFallbackCodes(this.options.fallbackLng, s.lng || this.language);
          if (this.options.saveMissingTo === "fallback" && Ai && Ai[0])
            for (var jo = 0; jo < Ai.length; jo++)
              ai.push(Ai[jo]);
          else
            this.options.saveMissingTo === "all" ? ai = this.languageUtils.toResolveHierarchy(s.lng || this.language) : ai.push(s.lng || this.language);
          var Tt = function(Me, ko, Rt) {
            var Ct = N && Rt !== m ? Rt : Es;
            r.options.missingKeyHandler ? r.options.missingKeyHandler(Me, p, ko, Ct, ti, s) : r.backendConnector && r.backendConnector.saveMissing && r.backendConnector.saveMissing(Me, p, ko, Ct, ti, s), r.emit("missingKey", Me, p, ko, m);
          };
          this.options.saveMissing && (this.options.saveMissingPlurals && I ? ai.forEach(function(wo) {
            r.pluralResolver.getSuffixes(wo, s).forEach(function(Me) {
              Tt([wo], d + Me, s["defaultValue".concat(Me)] || ae);
            });
          }) : Tt(ai, d, ae));
        }
        m = this.extendTranslation(m, a, s, y, n), C && m === d && this.options.appendNamespaceToMissingKey && (m = "".concat(p, ":").concat(d)), (C || A) && this.options.parseMissingKeyHandler && (this.options.compatibilityAPI !== "v1" ? m = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? "".concat(p, ":").concat(d) : d, A ? m : void 0) : m = this.options.parseMissingKeyHandler(m));
      }
      return c ? (y.res = m, y) : m;
    }
  }, {
    key: "extendTranslation",
    value: function(a, s, n, r, c) {
      var l = this;
      if (this.i18nFormat && this.i18nFormat.parse)
        a = this.i18nFormat.parse(a, J(J({}, this.options.interpolation.defaultVariables), n), r.usedLng, r.usedNS, r.usedKey, {
          resolved: r
        });
      else if (!n.skipInterpolation) {
        n.interpolation && this.interpolator.init(J(J({}, n), {
          interpolation: J(J({}, this.options.interpolation), n.interpolation)
        }));
        var u = typeof a == "string" && (n && n.interpolation && n.interpolation.skipOnVariables !== void 0 ? n.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables), d;
        if (u) {
          var g = a.match(this.interpolator.nestingRegexp);
          d = g && g.length;
        }
        var p = n.replace && typeof n.replace != "string" ? n.replace : n;
        if (this.options.interpolation.defaultVariables && (p = J(J({}, this.options.interpolation.defaultVariables), p)), a = this.interpolator.interpolate(a, p, n.lng || this.language, n), u) {
          var h = a.match(this.interpolator.nestingRegexp), v = h && h.length;
          d < v && (n.nest = !1);
        }
        n.nest !== !1 && (a = this.interpolator.nest(a, function() {
          for (var m = arguments.length, j = new Array(m), w = 0; w < m; w++)
            j[w] = arguments[w];
          return c && c[0] === j[0] && !n.context ? (l.logger.warn("It seems you are nesting recursively key: ".concat(j[0], " in key: ").concat(s[0])), null) : l.translate.apply(l, j.concat([s]));
        }, n)), n.interpolation && this.interpolator.reset();
      }
      var b = n.postProcess || this.options.postProcess, y = typeof b == "string" ? [b] : b;
      return a != null && y && y.length && n.applyPostProcessor !== !1 && (a = ps.handle(y, a, s, this.options && this.options.postProcessPassResolved ? J({
        i18nResolved: r
      }, n) : n, this)), a;
    }
  }, {
    key: "resolve",
    value: function(a) {
      var s = this, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r, c, l, u, d;
      return typeof a == "string" && (a = [a]), a.forEach(function(g) {
        if (!s.isValidLookup(r)) {
          var p = s.extractFromKey(g, n), h = p.key;
          c = h;
          var v = p.namespaces;
          s.options.fallbackNS && (v = v.concat(s.options.fallbackNS));
          var b = n.count !== void 0 && typeof n.count != "string", y = b && !n.ordinal && n.count === 0 && s.pluralResolver.shouldUseIntlApi(), m = n.context !== void 0 && (typeof n.context == "string" || typeof n.context == "number") && n.context !== "", j = n.lngs ? n.lngs : s.languageUtils.toResolveHierarchy(n.lng || s.language, n.fallbackLng);
          v.forEach(function(w) {
            s.isValidLookup(r) || (d = w, !na["".concat(j[0], "-").concat(w)] && s.utils && s.utils.hasLoadedNamespace && !s.utils.hasLoadedNamespace(d) && (na["".concat(j[0], "-").concat(w)] = !0, s.logger.warn('key "'.concat(c, '" for languages "').concat(j.join(", "), `" won't get resolved as namespace "`).concat(d, '" was not yet loaded'), "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")), j.forEach(function(S) {
              if (!s.isValidLookup(r)) {
                u = S;
                var O = [h];
                if (s.i18nFormat && s.i18nFormat.addLookupKeys)
                  s.i18nFormat.addLookupKeys(O, h, S, w, n);
                else {
                  var k;
                  b && (k = s.pluralResolver.getSuffix(S, n.count, n));
                  var E = "".concat(s.options.pluralSeparator, "zero");
                  if (b && (O.push(h + k), y && O.push(h + E)), m) {
                    var x = "".concat(h).concat(s.options.contextSeparator).concat(n.context);
                    O.push(x), b && (O.push(x + k), y && O.push(x + E));
                  }
                }
                for (var L; L = O.pop(); )
                  s.isValidLookup(r) || (l = L, r = s.getResource(S, w, L, n));
              }
            }));
          });
        }
      }), {
        res: r,
        usedKey: c,
        exactUsedKey: l,
        usedLng: u,
        usedNS: d
      };
    }
  }, {
    key: "isValidLookup",
    value: function(a) {
      return a !== void 0 && !(!this.options.returnNull && a === null) && !(!this.options.returnEmptyString && a === "");
    }
  }, {
    key: "getResource",
    value: function(a, s, n) {
      var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
      return this.i18nFormat && this.i18nFormat.getResource ? this.i18nFormat.getResource(a, s, n, r) : this.resourceStore.getResource(a, s, n, r);
    }
  }], [{
    key: "hasDefaultValue",
    value: function(a) {
      var s = "defaultValue";
      for (var n in a)
        if (Object.prototype.hasOwnProperty.call(a, n) && s === n.substring(0, s.length) && a[n] !== void 0)
          return !0;
      return !1;
    }
  }]), o;
}(Ce);
function Ro(i) {
  return i.charAt(0).toUpperCase() + i.slice(1);
}
var Rr = function() {
  function i(e) {
    oe(this, i), this.options = e, this.supportedLngs = this.options.supportedLngs || !1, this.logger = de.create("languageUtils");
  }
  return te(i, [{
    key: "getScriptPartFromCode",
    value: function(o) {
      if (!o || o.indexOf("-") < 0)
        return null;
      var t = o.split("-");
      return t.length === 2 || (t.pop(), t[t.length - 1].toLowerCase() === "x") ? null : this.formatLanguageCode(t.join("-"));
    }
  }, {
    key: "getLanguagePartFromCode",
    value: function(o) {
      if (!o || o.indexOf("-") < 0)
        return o;
      var t = o.split("-");
      return this.formatLanguageCode(t[0]);
    }
  }, {
    key: "formatLanguageCode",
    value: function(o) {
      if (typeof o == "string" && o.indexOf("-") > -1) {
        var t = ["hans", "hant", "latn", "cyrl", "cans", "mong", "arab"], a = o.split("-");
        return this.options.lowerCaseLng ? a = a.map(function(s) {
          return s.toLowerCase();
        }) : a.length === 2 ? (a[0] = a[0].toLowerCase(), a[1] = a[1].toUpperCase(), t.indexOf(a[1].toLowerCase()) > -1 && (a[1] = Ro(a[1].toLowerCase()))) : a.length === 3 && (a[0] = a[0].toLowerCase(), a[1].length === 2 && (a[1] = a[1].toUpperCase()), a[0] !== "sgn" && a[2].length === 2 && (a[2] = a[2].toUpperCase()), t.indexOf(a[1].toLowerCase()) > -1 && (a[1] = Ro(a[1].toLowerCase())), t.indexOf(a[2].toLowerCase()) > -1 && (a[2] = Ro(a[2].toLowerCase()))), a.join("-");
      }
      return this.options.cleanCode || this.options.lowerCaseLng ? o.toLowerCase() : o;
    }
  }, {
    key: "isSupportedCode",
    value: function(o) {
      return (this.options.load === "languageOnly" || this.options.nonExplicitSupportedLngs) && (o = this.getLanguagePartFromCode(o)), !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.indexOf(o) > -1;
    }
  }, {
    key: "getBestMatchFromCodes",
    value: function(o) {
      var t = this;
      if (!o)
        return null;
      var a;
      return o.forEach(function(s) {
        if (!a) {
          var n = t.formatLanguageCode(s);
          (!t.options.supportedLngs || t.isSupportedCode(n)) && (a = n);
        }
      }), !a && this.options.supportedLngs && o.forEach(function(s) {
        if (!a) {
          var n = t.getLanguagePartFromCode(s);
          if (t.isSupportedCode(n))
            return a = n;
          a = t.options.supportedLngs.find(function(r) {
            if (r.indexOf(n) === 0)
              return r;
          });
        }
      }), a || (a = this.getFallbackCodes(this.options.fallbackLng)[0]), a;
    }
  }, {
    key: "getFallbackCodes",
    value: function(o, t) {
      if (!o)
        return [];
      if (typeof o == "function" && (o = o(t)), typeof o == "string" && (o = [o]), Object.prototype.toString.apply(o) === "[object Array]")
        return o;
      if (!t)
        return o.default || [];
      var a = o[t];
      return a || (a = o[this.getScriptPartFromCode(t)]), a || (a = o[this.formatLanguageCode(t)]), a || (a = o[this.getLanguagePartFromCode(t)]), a || (a = o.default), a || [];
    }
  }, {
    key: "toResolveHierarchy",
    value: function(o, t) {
      var a = this, s = this.getFallbackCodes(t || this.options.fallbackLng || [], o), n = [], r = function(l) {
        l && (a.isSupportedCode(l) ? n.push(l) : a.logger.warn("rejecting language code not found in supportedLngs: ".concat(l)));
      };
      return typeof o == "string" && o.indexOf("-") > -1 ? (this.options.load !== "languageOnly" && r(this.formatLanguageCode(o)), this.options.load !== "languageOnly" && this.options.load !== "currentOnly" && r(this.getScriptPartFromCode(o)), this.options.load !== "currentOnly" && r(this.getLanguagePartFromCode(o))) : typeof o == "string" && r(this.formatLanguageCode(o)), s.forEach(function(c) {
        n.indexOf(c) < 0 && r(a.formatLanguageCode(c));
      }), n;
    }
  }]), i;
}(), Cr = [{
  lngs: ["ach", "ak", "am", "arn", "br", "fil", "gun", "ln", "mfe", "mg", "mi", "oc", "pt", "pt-BR", "tg", "tl", "ti", "tr", "uz", "wa"],
  nr: [1, 2],
  fc: 1
}, {
  lngs: ["af", "an", "ast", "az", "bg", "bn", "ca", "da", "de", "dev", "el", "en", "eo", "es", "et", "eu", "fi", "fo", "fur", "fy", "gl", "gu", "ha", "hi", "hu", "hy", "ia", "it", "kk", "kn", "ku", "lb", "mai", "ml", "mn", "mr", "nah", "nap", "nb", "ne", "nl", "nn", "no", "nso", "pa", "pap", "pms", "ps", "pt-PT", "rm", "sco", "se", "si", "so", "son", "sq", "sv", "sw", "ta", "te", "tk", "ur", "yo"],
  nr: [1, 2],
  fc: 2
}, {
  lngs: ["ay", "bo", "cgg", "fa", "ht", "id", "ja", "jbo", "ka", "km", "ko", "ky", "lo", "ms", "sah", "su", "th", "tt", "ug", "vi", "wo", "zh"],
  nr: [1],
  fc: 3
}, {
  lngs: ["be", "bs", "cnr", "dz", "hr", "ru", "sr", "uk"],
  nr: [1, 2, 5],
  fc: 4
}, {
  lngs: ["ar"],
  nr: [0, 1, 2, 3, 11, 100],
  fc: 5
}, {
  lngs: ["cs", "sk"],
  nr: [1, 2, 5],
  fc: 6
}, {
  lngs: ["csb", "pl"],
  nr: [1, 2, 5],
  fc: 7
}, {
  lngs: ["cy"],
  nr: [1, 2, 3, 8],
  fc: 8
}, {
  lngs: ["fr"],
  nr: [1, 2],
  fc: 9
}, {
  lngs: ["ga"],
  nr: [1, 2, 3, 7, 11],
  fc: 10
}, {
  lngs: ["gd"],
  nr: [1, 2, 3, 20],
  fc: 11
}, {
  lngs: ["is"],
  nr: [1, 2],
  fc: 12
}, {
  lngs: ["jv"],
  nr: [0, 1],
  fc: 13
}, {
  lngs: ["kw"],
  nr: [1, 2, 3, 4],
  fc: 14
}, {
  lngs: ["lt"],
  nr: [1, 2, 10],
  fc: 15
}, {
  lngs: ["lv"],
  nr: [1, 2, 0],
  fc: 16
}, {
  lngs: ["mk"],
  nr: [1, 2],
  fc: 17
}, {
  lngs: ["mnk"],
  nr: [0, 1, 2],
  fc: 18
}, {
  lngs: ["mt"],
  nr: [1, 2, 11, 20],
  fc: 19
}, {
  lngs: ["or"],
  nr: [2, 1],
  fc: 2
}, {
  lngs: ["ro"],
  nr: [1, 2, 20],
  fc: 20
}, {
  lngs: ["sl"],
  nr: [5, 1, 2, 3],
  fc: 21
}, {
  lngs: ["he", "iw"],
  nr: [1, 2, 20, 21],
  fc: 22
}], Nr = {
  1: function(e) {
    return +(e > 1);
  },
  2: function(e) {
    return +(e != 1);
  },
  3: function(e) {
    return 0;
  },
  4: function(e) {
    return e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2;
  },
  5: function(e) {
    return e == 0 ? 0 : e == 1 ? 1 : e == 2 ? 2 : e % 100 >= 3 && e % 100 <= 10 ? 3 : e % 100 >= 11 ? 4 : 5;
  },
  6: function(e) {
    return e == 1 ? 0 : e >= 2 && e <= 4 ? 1 : 2;
  },
  7: function(e) {
    return e == 1 ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2;
  },
  8: function(e) {
    return e == 1 ? 0 : e == 2 ? 1 : e != 8 && e != 11 ? 2 : 3;
  },
  9: function(e) {
    return +(e >= 2);
  },
  10: function(e) {
    return e == 1 ? 0 : e == 2 ? 1 : e < 7 ? 2 : e < 11 ? 3 : 4;
  },
  11: function(e) {
    return e == 1 || e == 11 ? 0 : e == 2 || e == 12 ? 1 : e > 2 && e < 20 ? 2 : 3;
  },
  12: function(e) {
    return +(e % 10 != 1 || e % 100 == 11);
  },
  13: function(e) {
    return +(e !== 0);
  },
  14: function(e) {
    return e == 1 ? 0 : e == 2 ? 1 : e == 3 ? 2 : 3;
  },
  15: function(e) {
    return e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2;
  },
  16: function(e) {
    return e % 10 == 1 && e % 100 != 11 ? 0 : e !== 0 ? 1 : 2;
  },
  17: function(e) {
    return e == 1 || e % 10 == 1 && e % 100 != 11 ? 0 : 1;
  },
  18: function(e) {
    return e == 0 ? 0 : e == 1 ? 1 : 2;
  },
  19: function(e) {
    return e == 1 ? 0 : e == 0 || e % 100 > 1 && e % 100 < 11 ? 1 : e % 100 > 10 && e % 100 < 20 ? 2 : 3;
  },
  20: function(e) {
    return e == 1 ? 0 : e == 0 || e % 100 > 0 && e % 100 < 20 ? 1 : 2;
  },
  21: function(e) {
    return e % 100 == 1 ? 1 : e % 100 == 2 ? 2 : e % 100 == 3 || e % 100 == 4 ? 3 : 0;
  },
  22: function(e) {
    return e == 1 ? 0 : e == 2 ? 1 : (e < 0 || e > 10) && e % 10 == 0 ? 2 : 3;
  }
}, Dr = ["v1", "v2", "v3"], ca = {
  zero: 0,
  one: 1,
  two: 2,
  few: 3,
  many: 4,
  other: 5
};
function Lr() {
  var i = {};
  return Cr.forEach(function(e) {
    e.lngs.forEach(function(o) {
      i[o] = {
        numbers: e.nr,
        plurals: Nr[e.fc]
      };
    });
  }), i;
}
var Ir = function() {
  function i(e) {
    var o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    oe(this, i), this.languageUtils = e, this.options = o, this.logger = de.create("pluralResolver"), (!this.options.compatibilityJSON || this.options.compatibilityJSON === "v4") && (typeof Intl > "u" || !Intl.PluralRules) && (this.options.compatibilityJSON = "v3", this.logger.error("Your environment seems not to be Intl API compatible, use an Intl.PluralRules polyfill. Will fallback to the compatibilityJSON v3 format handling.")), this.rules = Lr();
  }
  return te(i, [{
    key: "addRule",
    value: function(o, t) {
      this.rules[o] = t;
    }
  }, {
    key: "getRule",
    value: function(o) {
      var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      if (this.shouldUseIntlApi())
        try {
          return new Intl.PluralRules(o, {
            type: t.ordinal ? "ordinal" : "cardinal"
          });
        } catch {
          return;
        }
      return this.rules[o] || this.rules[this.languageUtils.getLanguagePartFromCode(o)];
    }
  }, {
    key: "needsPlural",
    value: function(o) {
      var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, a = this.getRule(o, t);
      return this.shouldUseIntlApi() ? a && a.resolvedOptions().pluralCategories.length > 1 : a && a.numbers.length > 1;
    }
  }, {
    key: "getPluralFormsOfKey",
    value: function(o, t) {
      var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      return this.getSuffixes(o, a).map(function(s) {
        return "".concat(t).concat(s);
      });
    }
  }, {
    key: "getSuffixes",
    value: function(o) {
      var t = this, a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, s = this.getRule(o, a);
      return s ? this.shouldUseIntlApi() ? s.resolvedOptions().pluralCategories.sort(function(n, r) {
        return ca[n] - ca[r];
      }).map(function(n) {
        return "".concat(t.options.prepend).concat(n);
      }) : s.numbers.map(function(n) {
        return t.getSuffix(o, n, a);
      }) : [];
    }
  }, {
    key: "getSuffix",
    value: function(o, t) {
      var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, s = this.getRule(o, a);
      return s ? this.shouldUseIntlApi() ? "".concat(this.options.prepend).concat(s.select(t)) : this.getSuffixRetroCompatible(s, t) : (this.logger.warn("no plural rule found for: ".concat(o)), "");
    }
  }, {
    key: "getSuffixRetroCompatible",
    value: function(o, t) {
      var a = this, s = o.noAbs ? o.plurals(t) : o.plurals(Math.abs(t)), n = o.numbers[s];
      this.options.simplifyPluralSuffix && o.numbers.length === 2 && o.numbers[0] === 1 && (n === 2 ? n = "plural" : n === 1 && (n = ""));
      var r = function() {
        return a.options.prepend && n.toString() ? a.options.prepend + n.toString() : n.toString();
      };
      return this.options.compatibilityJSON === "v1" ? n === 1 ? "" : typeof n == "number" ? "_plural_".concat(n.toString()) : r() : this.options.compatibilityJSON === "v2" || this.options.simplifyPluralSuffix && o.numbers.length === 2 && o.numbers[0] === 1 ? r() : this.options.prepend && s.toString() ? this.options.prepend + s.toString() : s.toString();
    }
  }, {
    key: "shouldUseIntlApi",
    value: function() {
      return !Dr.includes(this.options.compatibilityJSON);
    }
  }]), i;
}();
function la(i, e) {
  var o = Object.keys(i);
  if (Object.getOwnPropertySymbols) {
    var t = Object.getOwnPropertySymbols(i);
    e && (t = t.filter(function(a) {
      return Object.getOwnPropertyDescriptor(i, a).enumerable;
    })), o.push.apply(o, t);
  }
  return o;
}
function se(i) {
  for (var e = 1; e < arguments.length; e++) {
    var o = arguments[e] != null ? arguments[e] : {};
    e % 2 ? la(Object(o), !0).forEach(function(t) {
      ke(i, t, o[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(i, Object.getOwnPropertyDescriptors(o)) : la(Object(o)).forEach(function(t) {
      Object.defineProperty(i, t, Object.getOwnPropertyDescriptor(o, t));
    });
  }
  return i;
}
var Kr = function() {
  function i() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    oe(this, i), this.logger = de.create("interpolator"), this.options = e, this.format = e.interpolation && e.interpolation.format || function(o) {
      return o;
    }, this.init(e);
  }
  return te(i, [{
    key: "init",
    value: function() {
      var o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      o.interpolation || (o.interpolation = {
        escapeValue: !0
      });
      var t = o.interpolation;
      this.escape = t.escape !== void 0 ? t.escape : Sr, this.escapeValue = t.escapeValue !== void 0 ? t.escapeValue : !0, this.useRawValueToEscape = t.useRawValueToEscape !== void 0 ? t.useRawValueToEscape : !1, this.prefix = t.prefix ? He(t.prefix) : t.prefixEscaped || "{{", this.suffix = t.suffix ? He(t.suffix) : t.suffixEscaped || "}}", this.formatSeparator = t.formatSeparator ? t.formatSeparator : t.formatSeparator || ",", this.unescapePrefix = t.unescapeSuffix ? "" : t.unescapePrefix || "-", this.unescapeSuffix = this.unescapePrefix ? "" : t.unescapeSuffix || "", this.nestingPrefix = t.nestingPrefix ? He(t.nestingPrefix) : t.nestingPrefixEscaped || He("$t("), this.nestingSuffix = t.nestingSuffix ? He(t.nestingSuffix) : t.nestingSuffixEscaped || He(")"), this.nestingOptionsSeparator = t.nestingOptionsSeparator ? t.nestingOptionsSeparator : t.nestingOptionsSeparator || ",", this.maxReplaces = t.maxReplaces ? t.maxReplaces : 1e3, this.alwaysFormat = t.alwaysFormat !== void 0 ? t.alwaysFormat : !1, this.resetRegExp();
    }
  }, {
    key: "reset",
    value: function() {
      this.options && this.init(this.options);
    }
  }, {
    key: "resetRegExp",
    value: function() {
      var o = "".concat(this.prefix, "(.+?)").concat(this.suffix);
      this.regexp = new RegExp(o, "g");
      var t = "".concat(this.prefix).concat(this.unescapePrefix, "(.+?)").concat(this.unescapeSuffix).concat(this.suffix);
      this.regexpUnescape = new RegExp(t, "g");
      var a = "".concat(this.nestingPrefix, "(.+?)").concat(this.nestingSuffix);
      this.nestingRegexp = new RegExp(a, "g");
    }
  }, {
    key: "interpolate",
    value: function(o, t, a, s) {
      var n = this, r, c, l, u = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {};
      function d(b) {
        return b.replace(/\$/g, "$$$$");
      }
      var g = function(y) {
        if (y.indexOf(n.formatSeparator) < 0) {
          var m = ta(t, u, y);
          return n.alwaysFormat ? n.format(m, void 0, a, se(se(se({}, s), t), {}, {
            interpolationkey: y
          })) : m;
        }
        var j = y.split(n.formatSeparator), w = j.shift().trim(), S = j.join(n.formatSeparator).trim();
        return n.format(ta(t, u, w), S, a, se(se(se({}, s), t), {}, {
          interpolationkey: w
        }));
      };
      this.resetRegExp();
      var p = s && s.missingInterpolationHandler || this.options.missingInterpolationHandler, h = s && s.interpolation && s.interpolation.skipOnVariables !== void 0 ? s.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables, v = [{
        regex: this.regexpUnescape,
        safeValue: function(y) {
          return d(y);
        }
      }, {
        regex: this.regexp,
        safeValue: function(y) {
          return n.escapeValue ? d(n.escape(y)) : d(y);
        }
      }];
      return v.forEach(function(b) {
        for (l = 0; r = b.regex.exec(o); ) {
          var y = r[1].trim();
          if (c = g(y), c === void 0)
            if (typeof p == "function") {
              var m = p(o, r, s);
              c = typeof m == "string" ? m : "";
            } else if (s && s.hasOwnProperty(y))
              c = "";
            else if (h) {
              c = r[0];
              continue;
            } else
              n.logger.warn("missed to pass in variable ".concat(y, " for interpolating ").concat(o)), c = "";
          else
            typeof c != "string" && !n.useRawValueToEscape && (c = ia(c));
          var j = b.safeValue(c);
          if (o = o.replace(r[0], j), h ? (b.regex.lastIndex += c.length, b.regex.lastIndex -= r[0].length) : b.regex.lastIndex = 0, l++, l >= n.maxReplaces)
            break;
        }
      }), o;
    }
  }, {
    key: "nest",
    value: function(o, t) {
      var a = this, s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, n, r, c = se({}, s);
      c.applyPostProcessor = !1, delete c.defaultValue;
      function l(p, h) {
        var v = this.nestingOptionsSeparator;
        if (p.indexOf(v) < 0)
          return p;
        var b = p.split(new RegExp("".concat(v, "[ ]*{"))), y = "{".concat(b[1]);
        p = b[0], y = this.interpolate(y, c);
        var m = y.match(/'/g), j = y.match(/"/g);
        (m && m.length % 2 === 0 && !j || j.length % 2 !== 0) && (y = y.replace(/'/g, '"'));
        try {
          c = JSON.parse(y), h && (c = se(se({}, h), c));
        } catch (w) {
          return this.logger.warn("failed parsing options string in nesting for key ".concat(p), w), "".concat(p).concat(v).concat(y);
        }
        return delete c.defaultValue, p;
      }
      for (; n = this.nestingRegexp.exec(o); ) {
        var u = [], d = !1;
        if (n[0].indexOf(this.formatSeparator) !== -1 && !/{.*}/.test(n[1])) {
          var g = n[1].split(this.formatSeparator).map(function(p) {
            return p.trim();
          });
          n[1] = g.shift(), u = g, d = !0;
        }
        if (r = t(l.call(this, n[1].trim(), c), c), r && n[0] === o && typeof r != "string")
          return r;
        typeof r != "string" && (r = ia(r)), r || (this.logger.warn("missed to resolve ".concat(n[1], " for nesting ").concat(o)), r = ""), d && (r = u.reduce(function(p, h) {
          return a.format(p, h, s.lng, se(se({}, s), {}, {
            interpolationkey: n[1].trim()
          }));
        }, r.trim())), o = o.replace(n[0], r), this.regexp.lastIndex = 0;
      }
      return o;
    }
  }]), i;
}();
function ua(i, e) {
  var o = Object.keys(i);
  if (Object.getOwnPropertySymbols) {
    var t = Object.getOwnPropertySymbols(i);
    e && (t = t.filter(function(a) {
      return Object.getOwnPropertyDescriptor(i, a).enumerable;
    })), o.push.apply(o, t);
  }
  return o;
}
function Pe(i) {
  for (var e = 1; e < arguments.length; e++) {
    var o = arguments[e] != null ? arguments[e] : {};
    e % 2 ? ua(Object(o), !0).forEach(function(t) {
      ke(i, t, o[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(i, Object.getOwnPropertyDescriptors(o)) : ua(Object(o)).forEach(function(t) {
      Object.defineProperty(i, t, Object.getOwnPropertyDescriptor(o, t));
    });
  }
  return i;
}
function Ur(i) {
  var e = i.toLowerCase().trim(), o = {};
  if (i.indexOf("(") > -1) {
    var t = i.split("(");
    e = t[0].toLowerCase().trim();
    var a = t[1].substring(0, t[1].length - 1);
    if (e === "currency" && a.indexOf(":") < 0)
      o.currency || (o.currency = a.trim());
    else if (e === "relativetime" && a.indexOf(":") < 0)
      o.range || (o.range = a.trim());
    else {
      var s = a.split(";");
      s.forEach(function(n) {
        if (n) {
          var r = n.split(":"), c = _r(r), l = c[0], u = c.slice(1), d = u.join(":").trim().replace(/^'+|'+$/g, "");
          o[l.trim()] || (o[l.trim()] = d), d === "false" && (o[l.trim()] = !1), d === "true" && (o[l.trim()] = !0), isNaN(d) || (o[l.trim()] = parseInt(d, 10));
        }
      });
    }
  }
  return {
    formatName: e,
    formatOptions: o
  };
}
function Ve(i) {
  var e = {};
  return function(t, a, s) {
    var n = a + JSON.stringify(s), r = e[n];
    return r || (r = i(a, s), e[n] = r), r(t);
  };
}
var qr = function() {
  function i() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    oe(this, i), this.logger = de.create("formatter"), this.options = e, this.formats = {
      number: Ve(function(o, t) {
        var a = new Intl.NumberFormat(o, t);
        return function(s) {
          return a.format(s);
        };
      }),
      currency: Ve(function(o, t) {
        var a = new Intl.NumberFormat(o, Pe(Pe({}, t), {}, {
          style: "currency"
        }));
        return function(s) {
          return a.format(s);
        };
      }),
      datetime: Ve(function(o, t) {
        var a = new Intl.DateTimeFormat(o, Pe({}, t));
        return function(s) {
          return a.format(s);
        };
      }),
      relativetime: Ve(function(o, t) {
        var a = new Intl.RelativeTimeFormat(o, Pe({}, t));
        return function(s) {
          return a.format(s, t.range || "day");
        };
      }),
      list: Ve(function(o, t) {
        var a = new Intl.ListFormat(o, Pe({}, t));
        return function(s) {
          return a.format(s);
        };
      })
    }, this.init(e);
  }
  return te(i, [{
    key: "init",
    value: function(o) {
      var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
        interpolation: {}
      }, a = t.interpolation;
      this.formatSeparator = a.formatSeparator ? a.formatSeparator : a.formatSeparator || ",";
    }
  }, {
    key: "add",
    value: function(o, t) {
      this.formats[o.toLowerCase().trim()] = t;
    }
  }, {
    key: "addCached",
    value: function(o, t) {
      this.formats[o.toLowerCase().trim()] = Ve(t);
    }
  }, {
    key: "format",
    value: function(o, t, a, s) {
      var n = this, r = t.split(this.formatSeparator), c = r.reduce(function(l, u) {
        var d = Ur(u), g = d.formatName, p = d.formatOptions;
        if (n.formats[g]) {
          var h = l;
          try {
            var v = s && s.formatParams && s.formatParams[s.interpolationkey] || {}, b = v.locale || v.lng || s.locale || s.lng || a;
            h = n.formats[g](l, b, Pe(Pe(Pe({}, p), s), v));
          } catch (y) {
            n.logger.warn(y);
          }
          return h;
        } else
          n.logger.warn("there was no format function for ".concat(g));
        return l;
      }, o);
      return c;
    }
  }]), i;
}();
function da(i, e) {
  var o = Object.keys(i);
  if (Object.getOwnPropertySymbols) {
    var t = Object.getOwnPropertySymbols(i);
    e && (t = t.filter(function(a) {
      return Object.getOwnPropertyDescriptor(i, a).enumerable;
    })), o.push.apply(o, t);
  }
  return o;
}
function ga(i) {
  for (var e = 1; e < arguments.length; e++) {
    var o = arguments[e] != null ? arguments[e] : {};
    e % 2 ? da(Object(o), !0).forEach(function(t) {
      ke(i, t, o[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(i, Object.getOwnPropertyDescriptors(o)) : da(Object(o)).forEach(function(t) {
      Object.defineProperty(i, t, Object.getOwnPropertyDescriptor(o, t));
    });
  }
  return i;
}
function Mr(i) {
  var e = $r();
  return function() {
    var t = ge(i), a;
    if (e) {
      var s = ge(this).constructor;
      a = Reflect.construct(t, arguments, s);
    } else
      a = t.apply(this, arguments);
    return Bi(this, a);
  };
}
function $r() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function zr(i, e) {
  i.pending[e] !== void 0 && (delete i.pending[e], i.pendingCount--);
}
var Hr = function(i) {
  _o(o, i);
  var e = Mr(o);
  function o(t, a, s) {
    var n, r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    return oe(this, o), n = e.call(this), bo && Ce.call(Ee(n)), n.backend = t, n.store = a, n.services = s, n.languageUtils = s.languageUtils, n.options = r, n.logger = de.create("backendConnector"), n.waitingReads = [], n.maxParallelReads = r.maxParallelReads || 10, n.readingCalls = 0, n.maxRetries = r.maxRetries >= 0 ? r.maxRetries : 5, n.retryTimeout = r.retryTimeout >= 1 ? r.retryTimeout : 350, n.state = {}, n.queue = [], n.backend && n.backend.init && n.backend.init(s, r.backend, r), n;
  }
  return te(o, [{
    key: "queueLoad",
    value: function(a, s, n, r) {
      var c = this, l = {}, u = {}, d = {}, g = {};
      return a.forEach(function(p) {
        var h = !0;
        s.forEach(function(v) {
          var b = "".concat(p, "|").concat(v);
          !n.reload && c.store.hasResourceBundle(p, v) ? c.state[b] = 2 : c.state[b] < 0 || (c.state[b] === 1 ? u[b] === void 0 && (u[b] = !0) : (c.state[b] = 1, h = !1, u[b] === void 0 && (u[b] = !0), l[b] === void 0 && (l[b] = !0), g[v] === void 0 && (g[v] = !0)));
        }), h || (d[p] = !0);
      }), (Object.keys(l).length || Object.keys(u).length) && this.queue.push({
        pending: u,
        pendingCount: Object.keys(u).length,
        loaded: {},
        errors: [],
        callback: r
      }), {
        toLoad: Object.keys(l),
        pending: Object.keys(u),
        toLoadLanguages: Object.keys(d),
        toLoadNamespaces: Object.keys(g)
      };
    }
  }, {
    key: "loaded",
    value: function(a, s, n) {
      var r = a.split("|"), c = r[0], l = r[1];
      s && this.emit("failedLoading", c, l, s), n && this.store.addResourceBundle(c, l, n), this.state[a] = s ? -1 : 2;
      var u = {};
      this.queue.forEach(function(d) {
        kr(d.loaded, [c], l), zr(d, a), s && d.errors.push(s), d.pendingCount === 0 && !d.done && (Object.keys(d.loaded).forEach(function(g) {
          u[g] || (u[g] = {});
          var p = d.loaded[g];
          p.length && p.forEach(function(h) {
            u[g][h] === void 0 && (u[g][h] = !0);
          });
        }), d.done = !0, d.errors.length ? d.callback(d.errors) : d.callback());
      }), this.emit("loaded", u), this.queue = this.queue.filter(function(d) {
        return !d.done;
      });
    }
  }, {
    key: "read",
    value: function(a, s, n) {
      var r = this, c = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0, l = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : this.retryTimeout, u = arguments.length > 5 ? arguments[5] : void 0;
      if (!a.length)
        return u(null, {});
      if (this.readingCalls >= this.maxParallelReads) {
        this.waitingReads.push({
          lng: a,
          ns: s,
          fcName: n,
          tried: c,
          wait: l,
          callback: u
        });
        return;
      }
      return this.readingCalls++, this.backend[n](a, s, function(d, g) {
        if (r.readingCalls--, r.waitingReads.length > 0) {
          var p = r.waitingReads.shift();
          r.read(p.lng, p.ns, p.fcName, p.tried, p.wait, p.callback);
        }
        if (d && g && c < r.maxRetries) {
          setTimeout(function() {
            r.read.call(r, a, s, n, c + 1, l * 2, u);
          }, l);
          return;
        }
        u(d, g);
      });
    }
  }, {
    key: "prepareLoading",
    value: function(a, s) {
      var n = this, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, c = arguments.length > 3 ? arguments[3] : void 0;
      if (!this.backend)
        return this.logger.warn("No backend was added via i18next.use. Will not load resources."), c && c();
      typeof a == "string" && (a = this.languageUtils.toResolveHierarchy(a)), typeof s == "string" && (s = [s]);
      var l = this.queueLoad(a, s, r, c);
      if (!l.toLoad.length)
        return l.pending.length || c(), null;
      l.toLoad.forEach(function(u) {
        n.loadOne(u);
      });
    }
  }, {
    key: "load",
    value: function(a, s, n) {
      this.prepareLoading(a, s, {}, n);
    }
  }, {
    key: "reload",
    value: function(a, s, n) {
      this.prepareLoading(a, s, {
        reload: !0
      }, n);
    }
  }, {
    key: "loadOne",
    value: function(a) {
      var s = this, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", r = a.split("|"), c = r[0], l = r[1];
      this.read(c, l, "read", void 0, void 0, function(u, d) {
        u && s.logger.warn("".concat(n, "loading namespace ").concat(l, " for language ").concat(c, " failed"), u), !u && d && s.logger.log("".concat(n, "loaded namespace ").concat(l, " for language ").concat(c), d), s.loaded(a, u, d);
      });
    }
  }, {
    key: "saveMissing",
    value: function(a, s, n, r, c) {
      var l = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : {};
      if (this.services.utils && this.services.utils.hasLoadedNamespace && !this.services.utils.hasLoadedNamespace(s)) {
        this.logger.warn('did not save key "'.concat(n, '" as the namespace "').concat(s, '" was not yet loaded'), "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
        return;
      }
      n == null || n === "" || (this.backend && this.backend.create && this.backend.create(a, s, n, r, null, ga(ga({}, l), {}, {
        isUpdate: c
      })), !(!a || !a[0]) && this.store.addResource(a[0], s, n, r));
    }
  }]), o;
}(Ce);
function Vr() {
  return {
    debug: !1,
    initImmediate: !0,
    ns: ["translation"],
    defaultNS: ["translation"],
    fallbackLng: ["dev"],
    fallbackNS: !1,
    supportedLngs: !1,
    nonExplicitSupportedLngs: !1,
    load: "all",
    preload: !1,
    simplifyPluralSuffix: !0,
    keySeparator: ".",
    nsSeparator: ":",
    pluralSeparator: "_",
    contextSeparator: "_",
    partialBundledLanguages: !1,
    saveMissing: !1,
    updateMissing: !1,
    saveMissingTo: "fallback",
    saveMissingPlurals: !0,
    missingKeyHandler: !1,
    missingInterpolationHandler: !1,
    postProcess: !1,
    postProcessPassResolved: !1,
    returnNull: !0,
    returnEmptyString: !0,
    returnObjects: !1,
    joinArrays: !1,
    returnedObjectHandler: !1,
    parseMissingKeyHandler: !1,
    appendNamespaceToMissingKey: !1,
    appendNamespaceToCIMode: !1,
    overloadTranslationOptionHandler: function(e) {
      var o = {};
      if (re(e[1]) === "object" && (o = e[1]), typeof e[1] == "string" && (o.defaultValue = e[1]), typeof e[2] == "string" && (o.tDescription = e[2]), re(e[2]) === "object" || re(e[3]) === "object") {
        var t = e[3] || e[2];
        Object.keys(t).forEach(function(a) {
          o[a] = t[a];
        });
      }
      return o;
    },
    interpolation: {
      escapeValue: !0,
      format: function(e, o, t, a) {
        return e;
      },
      prefix: "{{",
      suffix: "}}",
      formatSeparator: ",",
      unescapePrefix: "-",
      nestingPrefix: "$t(",
      nestingSuffix: ")",
      nestingOptionsSeparator: ",",
      maxReplaces: 1e3,
      skipOnVariables: !0
    }
  };
}
function pa(i) {
  return typeof i.ns == "string" && (i.ns = [i.ns]), typeof i.fallbackLng == "string" && (i.fallbackLng = [i.fallbackLng]), typeof i.fallbackNS == "string" && (i.fallbackNS = [i.fallbackNS]), i.supportedLngs && i.supportedLngs.indexOf("cimode") < 0 && (i.supportedLngs = i.supportedLngs.concat(["cimode"])), i;
}
function ma(i, e) {
  var o = Object.keys(i);
  if (Object.getOwnPropertySymbols) {
    var t = Object.getOwnPropertySymbols(i);
    e && (t = t.filter(function(a) {
      return Object.getOwnPropertyDescriptor(i, a).enumerable;
    })), o.push.apply(o, t);
  }
  return o;
}
function le(i) {
  for (var e = 1; e < arguments.length; e++) {
    var o = arguments[e] != null ? arguments[e] : {};
    e % 2 ? ma(Object(o), !0).forEach(function(t) {
      ke(i, t, o[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(i, Object.getOwnPropertyDescriptors(o)) : ma(Object(o)).forEach(function(t) {
      Object.defineProperty(i, t, Object.getOwnPropertyDescriptor(o, t));
    });
  }
  return i;
}
function Wr(i) {
  var e = Jr();
  return function() {
    var t = ge(i), a;
    if (e) {
      var s = ge(this).constructor;
      a = Reflect.construct(t, arguments, s);
    } else
      a = t.apply(this, arguments);
    return Bi(this, a);
  };
}
function Jr() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function qi() {
}
function Gr(i) {
  var e = Object.getOwnPropertyNames(Object.getPrototypeOf(i));
  e.forEach(function(o) {
    typeof i[o] == "function" && (i[o] = i[o].bind(i));
  });
}
var uo = function(i) {
  _o(o, i);
  var e = Wr(o);
  function o() {
    var t, a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, s = arguments.length > 1 ? arguments[1] : void 0;
    if (oe(this, o), t = e.call(this), bo && Ce.call(Ee(t)), t.options = pa(a), t.services = {}, t.logger = de, t.modules = {
      external: []
    }, Gr(Ee(t)), s && !t.isInitialized && !a.isClone) {
      if (!t.options.initImmediate)
        return t.init(a, s), Bi(t, Ee(t));
      setTimeout(function() {
        t.init(a, s);
      }, 0);
    }
    return t;
  }
  return te(o, [{
    key: "init",
    value: function() {
      var a = this, s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = arguments.length > 1 ? arguments[1] : void 0;
      typeof s == "function" && (n = s, s = {}), !s.defaultNS && s.defaultNS !== !1 && s.ns && (typeof s.ns == "string" ? s.defaultNS = s.ns : s.ns.indexOf("translation") < 0 && (s.defaultNS = s.ns[0]));
      var r = Vr();
      this.options = le(le(le({}, r), this.options), pa(s)), this.options.compatibilityAPI !== "v1" && (this.options.interpolation = le(le({}, r.interpolation), this.options.interpolation)), s.keySeparator !== void 0 && (this.options.userDefinedKeySeparator = s.keySeparator), s.nsSeparator !== void 0 && (this.options.userDefinedNsSeparator = s.nsSeparator);
      function c(y) {
        return y ? typeof y == "function" ? new y() : y : null;
      }
      if (!this.options.isClone) {
        this.modules.logger ? de.init(c(this.modules.logger), this.options) : de.init(null, this.options);
        var l;
        this.modules.formatter ? l = this.modules.formatter : typeof Intl < "u" && (l = qr);
        var u = new Rr(this.options);
        this.store = new Er(this.options.resources, this.options);
        var d = this.services;
        d.logger = de, d.resourceStore = this.store, d.languageUtils = u, d.pluralResolver = new Ir(u, {
          prepend: this.options.pluralSeparator,
          compatibilityJSON: this.options.compatibilityJSON,
          simplifyPluralSuffix: this.options.simplifyPluralSuffix
        }), l && (!this.options.interpolation.format || this.options.interpolation.format === r.interpolation.format) && (d.formatter = c(l), d.formatter.init(d, this.options), this.options.interpolation.format = d.formatter.format.bind(d.formatter)), d.interpolator = new Kr(this.options), d.utils = {
          hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
        }, d.backendConnector = new Hr(c(this.modules.backend), d.resourceStore, d, this.options), d.backendConnector.on("*", function(y) {
          for (var m = arguments.length, j = new Array(m > 1 ? m - 1 : 0), w = 1; w < m; w++)
            j[w - 1] = arguments[w];
          a.emit.apply(a, [y].concat(j));
        }), this.modules.languageDetector && (d.languageDetector = c(this.modules.languageDetector), d.languageDetector.init(d, this.options.detection, this.options)), this.modules.i18nFormat && (d.i18nFormat = c(this.modules.i18nFormat), d.i18nFormat.init && d.i18nFormat.init(this)), this.translator = new ra(this.services, this.options), this.translator.on("*", function(y) {
          for (var m = arguments.length, j = new Array(m > 1 ? m - 1 : 0), w = 1; w < m; w++)
            j[w - 1] = arguments[w];
          a.emit.apply(a, [y].concat(j));
        }), this.modules.external.forEach(function(y) {
          y.init && y.init(a);
        });
      }
      if (this.format = this.options.interpolation.format, n || (n = qi), this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
        var g = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
        g.length > 0 && g[0] !== "dev" && (this.options.lng = g[0]);
      }
      !this.services.languageDetector && !this.options.lng && this.logger.warn("init: no languageDetector is used and no lng is defined");
      var p = ["getResource", "hasResourceBundle", "getResourceBundle", "getDataByLanguage"];
      p.forEach(function(y) {
        a[y] = function() {
          var m;
          return (m = a.store)[y].apply(m, arguments);
        };
      });
      var h = ["addResource", "addResources", "addResourceBundle", "removeResourceBundle"];
      h.forEach(function(y) {
        a[y] = function() {
          var m;
          return (m = a.store)[y].apply(m, arguments), a;
        };
      });
      var v = ci(), b = function() {
        var m = function(w, S) {
          a.isInitialized && !a.initializedStoreOnce && a.logger.warn("init: i18next is already initialized. You should call init just once!"), a.isInitialized = !0, a.options.isClone || a.logger.log("initialized", a.options), a.emit("initialized", a.options), v.resolve(S), n(w, S);
        };
        if (a.languages && a.options.compatibilityAPI !== "v1" && !a.isInitialized)
          return m(null, a.t.bind(a));
        a.changeLanguage(a.options.lng, m);
      };
      return this.options.resources || !this.options.initImmediate ? b() : setTimeout(b, 0), v;
    }
  }, {
    key: "loadResources",
    value: function(a) {
      var s = this, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : qi, r = n, c = typeof a == "string" ? a : this.language;
      if (typeof a == "function" && (r = a), !this.options.resources || this.options.partialBundledLanguages) {
        if (c && c.toLowerCase() === "cimode")
          return r();
        var l = [], u = function(p) {
          if (p) {
            var h = s.services.languageUtils.toResolveHierarchy(p);
            h.forEach(function(v) {
              l.indexOf(v) < 0 && l.push(v);
            });
          }
        };
        if (c)
          u(c);
        else {
          var d = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
          d.forEach(function(g) {
            return u(g);
          });
        }
        this.options.preload && this.options.preload.forEach(function(g) {
          return u(g);
        }), this.services.backendConnector.load(l, this.options.ns, function(g) {
          !g && !s.resolvedLanguage && s.language && s.setResolvedLanguage(s.language), r(g);
        });
      } else
        r(null);
    }
  }, {
    key: "reloadResources",
    value: function(a, s, n) {
      var r = ci();
      return a || (a = this.languages), s || (s = this.options.ns), n || (n = qi), this.services.backendConnector.reload(a, s, function(c) {
        r.resolve(), n(c);
      }), r;
    }
  }, {
    key: "use",
    value: function(a) {
      if (!a)
        throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");
      if (!a.type)
        throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");
      return a.type === "backend" && (this.modules.backend = a), (a.type === "logger" || a.log && a.warn && a.error) && (this.modules.logger = a), a.type === "languageDetector" && (this.modules.languageDetector = a), a.type === "i18nFormat" && (this.modules.i18nFormat = a), a.type === "postProcessor" && ps.addPostProcessor(a), a.type === "formatter" && (this.modules.formatter = a), a.type === "3rdParty" && this.modules.external.push(a), this;
    }
  }, {
    key: "setResolvedLanguage",
    value: function(a) {
      if (!(!a || !this.languages) && !(["cimode", "dev"].indexOf(a) > -1))
        for (var s = 0; s < this.languages.length; s++) {
          var n = this.languages[s];
          if (!(["cimode", "dev"].indexOf(n) > -1) && this.store.hasLanguageSomeTranslations(n)) {
            this.resolvedLanguage = n;
            break;
          }
        }
    }
  }, {
    key: "changeLanguage",
    value: function(a, s) {
      var n = this;
      this.isLanguageChangingTo = a;
      var r = ci();
      this.emit("languageChanging", a);
      var c = function(g) {
        n.language = g, n.languages = n.services.languageUtils.toResolveHierarchy(g), n.resolvedLanguage = void 0, n.setResolvedLanguage(g);
      }, l = function(g, p) {
        p ? (c(p), n.translator.changeLanguage(p), n.isLanguageChangingTo = void 0, n.emit("languageChanged", p), n.logger.log("languageChanged", p)) : n.isLanguageChangingTo = void 0, r.resolve(function() {
          return n.t.apply(n, arguments);
        }), s && s(g, function() {
          return n.t.apply(n, arguments);
        });
      }, u = function(g) {
        !a && !g && n.services.languageDetector && (g = []);
        var p = typeof g == "string" ? g : n.services.languageUtils.getBestMatchFromCodes(g);
        p && (n.language || c(p), n.translator.language || n.translator.changeLanguage(p), n.services.languageDetector && n.services.languageDetector.cacheUserLanguage(p)), n.loadResources(p, function(h) {
          l(h, p);
        });
      };
      return !a && this.services.languageDetector && !this.services.languageDetector.async ? u(this.services.languageDetector.detect()) : !a && this.services.languageDetector && this.services.languageDetector.async ? this.services.languageDetector.detect(u) : u(a), r;
    }
  }, {
    key: "getFixedT",
    value: function(a, s, n) {
      var r = this, c = function l(u, d) {
        var g;
        if (re(d) !== "object") {
          for (var p = arguments.length, h = new Array(p > 2 ? p - 2 : 0), v = 2; v < p; v++)
            h[v - 2] = arguments[v];
          g = r.options.overloadTranslationOptionHandler([u, d].concat(h));
        } else
          g = le({}, d);
        g.lng = g.lng || l.lng, g.lngs = g.lngs || l.lngs, g.ns = g.ns || l.ns, g.keyPrefix = g.keyPrefix || n || l.keyPrefix;
        var b = r.options.keySeparator || ".", y = g.keyPrefix ? "".concat(g.keyPrefix).concat(b).concat(u) : u;
        return r.t(y, g);
      };
      return typeof a == "string" ? c.lng = a : c.lngs = a, c.ns = s, c.keyPrefix = n, c;
    }
  }, {
    key: "t",
    value: function() {
      var a;
      return this.translator && (a = this.translator).translate.apply(a, arguments);
    }
  }, {
    key: "exists",
    value: function() {
      var a;
      return this.translator && (a = this.translator).exists.apply(a, arguments);
    }
  }, {
    key: "setDefaultNamespace",
    value: function(a) {
      this.options.defaultNS = a;
    }
  }, {
    key: "hasLoadedNamespace",
    value: function(a) {
      var s = this, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      if (!this.isInitialized)
        return this.logger.warn("hasLoadedNamespace: i18next was not initialized", this.languages), !1;
      if (!this.languages || !this.languages.length)
        return this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty", this.languages), !1;
      var r = this.resolvedLanguage || this.languages[0], c = this.options ? this.options.fallbackLng : !1, l = this.languages[this.languages.length - 1];
      if (r.toLowerCase() === "cimode")
        return !0;
      var u = function(p, h) {
        var v = s.services.backendConnector.state["".concat(p, "|").concat(h)];
        return v === -1 || v === 2;
      };
      if (n.precheck) {
        var d = n.precheck(this, u);
        if (d !== void 0)
          return d;
      }
      return !!(this.hasResourceBundle(r, a) || !this.services.backendConnector.backend || this.options.resources && !this.options.partialBundledLanguages || u(r, a) && (!c || u(l, a)));
    }
  }, {
    key: "loadNamespaces",
    value: function(a, s) {
      var n = this, r = ci();
      return this.options.ns ? (typeof a == "string" && (a = [a]), a.forEach(function(c) {
        n.options.ns.indexOf(c) < 0 && n.options.ns.push(c);
      }), this.loadResources(function(c) {
        r.resolve(), s && s(c);
      }), r) : (s && s(), Promise.resolve());
    }
  }, {
    key: "loadLanguages",
    value: function(a, s) {
      var n = ci();
      typeof a == "string" && (a = [a]);
      var r = this.options.preload || [], c = a.filter(function(l) {
        return r.indexOf(l) < 0;
      });
      return c.length ? (this.options.preload = r.concat(c), this.loadResources(function(l) {
        n.resolve(), s && s(l);
      }), n) : (s && s(), Promise.resolve());
    }
  }, {
    key: "dir",
    value: function(a) {
      if (a || (a = this.resolvedLanguage || (this.languages && this.languages.length > 0 ? this.languages[0] : this.language)), !a)
        return "rtl";
      var s = ["ar", "shu", "sqr", "ssh", "xaa", "yhd", "yud", "aao", "abh", "abv", "acm", "acq", "acw", "acx", "acy", "adf", "ads", "aeb", "aec", "afb", "ajp", "apc", "apd", "arb", "arq", "ars", "ary", "arz", "auz", "avl", "ayh", "ayl", "ayn", "ayp", "bbz", "pga", "he", "iw", "ps", "pbt", "pbu", "pst", "prp", "prd", "ug", "ur", "ydd", "yds", "yih", "ji", "yi", "hbo", "men", "xmn", "fa", "jpr", "peo", "pes", "prs", "dv", "sam", "ckb"];
      return s.indexOf(this.services.languageUtils.getLanguagePartFromCode(a)) > -1 || a.toLowerCase().indexOf("-arab") > 1 ? "rtl" : "ltr";
    }
  }, {
    key: "cloneInstance",
    value: function() {
      var a = this, s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : qi, r = le(le(le({}, this.options), s), {
        isClone: !0
      }), c = new o(r);
      (s.debug !== void 0 || s.prefix !== void 0) && (c.logger = c.logger.clone(s));
      var l = ["store", "services", "language"];
      return l.forEach(function(u) {
        c[u] = a[u];
      }), c.services = le({}, this.services), c.services.utils = {
        hasLoadedNamespace: c.hasLoadedNamespace.bind(c)
      }, c.translator = new ra(c.services, c.options), c.translator.on("*", function(u) {
        for (var d = arguments.length, g = new Array(d > 1 ? d - 1 : 0), p = 1; p < d; p++)
          g[p - 1] = arguments[p];
        c.emit.apply(c, [u].concat(g));
      }), c.init(r, n), c.translator.options = c.options, c.translator.backendConnector.services.utils = {
        hasLoadedNamespace: c.hasLoadedNamespace.bind(c)
      }, c;
    }
  }, {
    key: "toJSON",
    value: function() {
      return {
        options: this.options,
        store: this.store,
        language: this.language,
        languages: this.languages,
        resolvedLanguage: this.resolvedLanguage
      };
    }
  }]), o;
}(Ce);
ke(uo, "createInstance", function() {
  var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, e = arguments.length > 1 ? arguments[1] : void 0;
  return new uo(i, e);
});
var Q = uo.createInstance();
Q.createInstance = uo.createInstance;
Q.createInstance;
Q.init;
Q.loadResources;
Q.reloadResources;
Q.use;
Q.changeLanguage;
Q.getFixedT;
Q.t;
Q.exists;
Q.setDefaultNamespace;
Q.hasLoadedNamespace;
Q.loadNamespaces;
Q.loadLanguages;
function ct(i) {
  "@babel/helpers - typeof";
  return ct = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, ct(i);
}
var ms = [], Xr = ms.forEach, Yr = ms.slice;
function lt(i) {
  return Xr.call(Yr.call(arguments, 1), function(e) {
    if (e)
      for (var o in e)
        i[o] === void 0 && (i[o] = e[o]);
  }), i;
}
function ys() {
  return typeof XMLHttpRequest == "function" || (typeof XMLHttpRequest > "u" ? "undefined" : ct(XMLHttpRequest)) === "object";
}
function Qr(i) {
  return !!i && typeof i.then == "function";
}
function Zr(i) {
  return Qr(i) ? i : Promise.resolve(i);
}
var Yi = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ec(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
function ic(i) {
  throw new Error('Could not dynamically require "' + i + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var ut = { exports: {} }, Mi = { exports: {} }, ya;
function oc() {
  return ya || (ya = 1, function(i, e) {
    var o = typeof self < "u" ? self : Yi, t = function() {
      function s() {
        this.fetch = !1, this.DOMException = o.DOMException;
      }
      return s.prototype = o, new s();
    }();
    (function(s) {
      (function(n) {
        var r = {
          searchParams: "URLSearchParams" in s,
          iterable: "Symbol" in s && "iterator" in Symbol,
          blob: "FileReader" in s && "Blob" in s && function() {
            try {
              return new Blob(), !0;
            } catch {
              return !1;
            }
          }(),
          formData: "FormData" in s,
          arrayBuffer: "ArrayBuffer" in s
        };
        function c(f) {
          return f && DataView.prototype.isPrototypeOf(f);
        }
        if (r.arrayBuffer)
          var l = [
            "[object Int8Array]",
            "[object Uint8Array]",
            "[object Uint8ClampedArray]",
            "[object Int16Array]",
            "[object Uint16Array]",
            "[object Int32Array]",
            "[object Uint32Array]",
            "[object Float32Array]",
            "[object Float64Array]"
          ], u = ArrayBuffer.isView || function(f) {
            return f && l.indexOf(Object.prototype.toString.call(f)) > -1;
          };
        function d(f) {
          if (typeof f != "string" && (f = String(f)), /[^a-z0-9\-#$%&'*+.^_`|~]/i.test(f))
            throw new TypeError("Invalid character in header field name");
          return f.toLowerCase();
        }
        function g(f) {
          return typeof f != "string" && (f = String(f)), f;
        }
        function p(f) {
          var P = {
            next: function() {
              var A = f.shift();
              return { done: A === void 0, value: A };
            }
          };
          return r.iterable && (P[Symbol.iterator] = function() {
            return P;
          }), P;
        }
        function h(f) {
          this.map = {}, f instanceof h ? f.forEach(function(P, A) {
            this.append(A, P);
          }, this) : Array.isArray(f) ? f.forEach(function(P) {
            this.append(P[0], P[1]);
          }, this) : f && Object.getOwnPropertyNames(f).forEach(function(P) {
            this.append(P, f[P]);
          }, this);
        }
        h.prototype.append = function(f, P) {
          f = d(f), P = g(P);
          var A = this.map[f];
          this.map[f] = A ? A + ", " + P : P;
        }, h.prototype.delete = function(f) {
          delete this.map[d(f)];
        }, h.prototype.get = function(f) {
          return f = d(f), this.has(f) ? this.map[f] : null;
        }, h.prototype.has = function(f) {
          return this.map.hasOwnProperty(d(f));
        }, h.prototype.set = function(f, P) {
          this.map[d(f)] = g(P);
        }, h.prototype.forEach = function(f, P) {
          for (var A in this.map)
            this.map.hasOwnProperty(A) && f.call(P, this.map[A], A, this);
        }, h.prototype.keys = function() {
          var f = [];
          return this.forEach(function(P, A) {
            f.push(A);
          }), p(f);
        }, h.prototype.values = function() {
          var f = [];
          return this.forEach(function(P) {
            f.push(P);
          }), p(f);
        }, h.prototype.entries = function() {
          var f = [];
          return this.forEach(function(P, A) {
            f.push([A, P]);
          }), p(f);
        }, r.iterable && (h.prototype[Symbol.iterator] = h.prototype.entries);
        function v(f) {
          if (f.bodyUsed)
            return Promise.reject(new TypeError("Already read"));
          f.bodyUsed = !0;
        }
        function b(f) {
          return new Promise(function(P, A) {
            f.onload = function() {
              P(f.result);
            }, f.onerror = function() {
              A(f.error);
            };
          });
        }
        function y(f) {
          var P = new FileReader(), A = b(P);
          return P.readAsArrayBuffer(f), A;
        }
        function m(f) {
          var P = new FileReader(), A = b(P);
          return P.readAsText(f), A;
        }
        function j(f) {
          for (var P = new Uint8Array(f), A = new Array(P.length), C = 0; C < P.length; C++)
            A[C] = String.fromCharCode(P[C]);
          return A.join("");
        }
        function w(f) {
          if (f.slice)
            return f.slice(0);
          var P = new Uint8Array(f.byteLength);
          return P.set(new Uint8Array(f)), P.buffer;
        }
        function S() {
          return this.bodyUsed = !1, this._initBody = function(f) {
            this._bodyInit = f, f ? typeof f == "string" ? this._bodyText = f : r.blob && Blob.prototype.isPrototypeOf(f) ? this._bodyBlob = f : r.formData && FormData.prototype.isPrototypeOf(f) ? this._bodyFormData = f : r.searchParams && URLSearchParams.prototype.isPrototypeOf(f) ? this._bodyText = f.toString() : r.arrayBuffer && r.blob && c(f) ? (this._bodyArrayBuffer = w(f.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : r.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(f) || u(f)) ? this._bodyArrayBuffer = w(f) : this._bodyText = f = Object.prototype.toString.call(f) : this._bodyText = "", this.headers.get("content-type") || (typeof f == "string" ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : r.searchParams && URLSearchParams.prototype.isPrototypeOf(f) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
          }, r.blob && (this.blob = function() {
            var f = v(this);
            if (f)
              return f;
            if (this._bodyBlob)
              return Promise.resolve(this._bodyBlob);
            if (this._bodyArrayBuffer)
              return Promise.resolve(new Blob([this._bodyArrayBuffer]));
            if (this._bodyFormData)
              throw new Error("could not read FormData body as blob");
            return Promise.resolve(new Blob([this._bodyText]));
          }, this.arrayBuffer = function() {
            return this._bodyArrayBuffer ? v(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(y);
          }), this.text = function() {
            var f = v(this);
            if (f)
              return f;
            if (this._bodyBlob)
              return m(this._bodyBlob);
            if (this._bodyArrayBuffer)
              return Promise.resolve(j(this._bodyArrayBuffer));
            if (this._bodyFormData)
              throw new Error("could not read FormData body as text");
            return Promise.resolve(this._bodyText);
          }, r.formData && (this.formData = function() {
            return this.text().then(x);
          }), this.json = function() {
            return this.text().then(JSON.parse);
          }, this;
        }
        var O = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
        function k(f) {
          var P = f.toUpperCase();
          return O.indexOf(P) > -1 ? P : f;
        }
        function E(f, P) {
          P = P || {};
          var A = P.body;
          if (f instanceof E) {
            if (f.bodyUsed)
              throw new TypeError("Already read");
            this.url = f.url, this.credentials = f.credentials, P.headers || (this.headers = new h(f.headers)), this.method = f.method, this.mode = f.mode, this.signal = f.signal, !A && f._bodyInit != null && (A = f._bodyInit, f.bodyUsed = !0);
          } else
            this.url = String(f);
          if (this.credentials = P.credentials || this.credentials || "same-origin", (P.headers || !this.headers) && (this.headers = new h(P.headers)), this.method = k(P.method || this.method || "GET"), this.mode = P.mode || this.mode || null, this.signal = P.signal || this.signal, this.referrer = null, (this.method === "GET" || this.method === "HEAD") && A)
            throw new TypeError("Body not allowed for GET or HEAD requests");
          this._initBody(A);
        }
        E.prototype.clone = function() {
          return new E(this, { body: this._bodyInit });
        };
        function x(f) {
          var P = new FormData();
          return f.trim().split("&").forEach(function(A) {
            if (A) {
              var C = A.split("="), I = C.shift().replace(/\+/g, " "), N = C.join("=").replace(/\+/g, " ");
              P.append(decodeURIComponent(I), decodeURIComponent(N));
            }
          }), P;
        }
        function L(f) {
          var P = new h(), A = f.replace(/\r?\n[\t ]+/g, " ");
          return A.split(/\r?\n/).forEach(function(C) {
            var I = C.split(":"), N = I.shift().trim();
            if (N) {
              var ce = I.join(":").trim();
              P.append(N, ce);
            }
          }), P;
        }
        S.call(E.prototype);
        function R(f, P) {
          P || (P = {}), this.type = "default", this.status = P.status === void 0 ? 200 : P.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = "statusText" in P ? P.statusText : "OK", this.headers = new h(P.headers), this.url = P.url || "", this._initBody(f);
        }
        S.call(R.prototype), R.prototype.clone = function() {
          return new R(this._bodyInit, {
            status: this.status,
            statusText: this.statusText,
            headers: new h(this.headers),
            url: this.url
          });
        }, R.error = function() {
          var f = new R(null, { status: 0, statusText: "" });
          return f.type = "error", f;
        };
        var M = [301, 302, 303, 307, 308];
        R.redirect = function(f, P) {
          if (M.indexOf(P) === -1)
            throw new RangeError("Invalid status code");
          return new R(null, { status: P, headers: { location: f } });
        }, n.DOMException = s.DOMException;
        try {
          new n.DOMException();
        } catch {
          n.DOMException = function(P, A) {
            this.message = P, this.name = A;
            var C = Error(P);
            this.stack = C.stack;
          }, n.DOMException.prototype = Object.create(Error.prototype), n.DOMException.prototype.constructor = n.DOMException;
        }
        function $(f, P) {
          return new Promise(function(A, C) {
            var I = new E(f, P);
            if (I.signal && I.signal.aborted)
              return C(new n.DOMException("Aborted", "AbortError"));
            var N = new XMLHttpRequest();
            function ce() {
              N.abort();
            }
            N.onload = function() {
              var ae = {
                status: N.status,
                statusText: N.statusText,
                headers: L(N.getAllResponseHeaders() || "")
              };
              ae.url = "responseURL" in N ? N.responseURL : ae.headers.get("X-Request-URL");
              var oi = "response" in N ? N.response : N.responseText;
              A(new R(oi, ae));
            }, N.onerror = function() {
              C(new TypeError("Network request failed"));
            }, N.ontimeout = function() {
              C(new TypeError("Network request failed"));
            }, N.onabort = function() {
              C(new n.DOMException("Aborted", "AbortError"));
            }, N.open(I.method, I.url, !0), I.credentials === "include" ? N.withCredentials = !0 : I.credentials === "omit" && (N.withCredentials = !1), "responseType" in N && r.blob && (N.responseType = "blob"), I.headers.forEach(function(ae, oi) {
              N.setRequestHeader(oi, ae);
            }), I.signal && (I.signal.addEventListener("abort", ce), N.onreadystatechange = function() {
              N.readyState === 4 && I.signal.removeEventListener("abort", ce);
            }), N.send(typeof I._bodyInit > "u" ? null : I._bodyInit);
          });
        }
        return $.polyfill = !0, s.fetch || (s.fetch = $, s.Headers = h, s.Request = E, s.Response = R), n.Headers = h, n.Request = E, n.Response = R, n.fetch = $, Object.defineProperty(n, "__esModule", { value: !0 }), n;
      })({});
    })(t), t.fetch.ponyfill = !0, delete t.fetch.polyfill;
    var a = t;
    e = a.fetch, e.default = a.fetch, e.fetch = a.fetch, e.Headers = a.Headers, e.Request = a.Request, e.Response = a.Response, i.exports = e;
  }(Mi, Mi.exports)), Mi.exports;
}
(function(i, e) {
  var o;
  if (typeof fetch == "function" && (typeof Yi < "u" && Yi.fetch ? o = Yi.fetch : typeof window < "u" && window.fetch ? o = window.fetch : o = fetch), typeof ic < "u" && (typeof window > "u" || typeof window.document > "u")) {
    var t = o || oc();
    t.default && (t = t.default), e.default = t, i.exports = e.default;
  }
})(ut, ut.exports);
var fs = ut.exports;
const hs = /* @__PURE__ */ ec(fs), fa = /* @__PURE__ */ As({
  __proto__: null,
  default: hs
}, [fs]);
function go(i) {
  "@babel/helpers - typeof";
  return go = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, go(i);
}
var je;
typeof fetch == "function" && (typeof global < "u" && global.fetch ? je = global.fetch : typeof window < "u" && window.fetch ? je = window.fetch : je = fetch);
var Si;
ys() && (typeof global < "u" && global.XMLHttpRequest ? Si = global.XMLHttpRequest : typeof window < "u" && window.XMLHttpRequest && (Si = window.XMLHttpRequest));
var po;
typeof ActiveXObject == "function" && (typeof global < "u" && global.ActiveXObject ? po = global.ActiveXObject : typeof window < "u" && window.ActiveXObject && (po = window.ActiveXObject));
!je && fa && !Si && !po && (je = hs || fa);
typeof je != "function" && (je = void 0);
var dt = function(e, o) {
  if (o && go(o) === "object") {
    var t = "";
    for (var a in o)
      t += "&" + encodeURIComponent(a) + "=" + encodeURIComponent(o[a]);
    if (!t)
      return e;
    e = e + (e.indexOf("?") !== -1 ? "&" : "?") + t.slice(1);
  }
  return e;
}, ha = function(e, o, t) {
  je(e, o).then(function(a) {
    if (!a.ok)
      return t(a.statusText || "Error", {
        status: a.status
      });
    a.text().then(function(s) {
      t(null, {
        status: a.status,
        data: s
      });
    }).catch(t);
  }).catch(t);
}, va = !1, tc = function(e, o, t, a) {
  e.queryStringParams && (o = dt(o, e.queryStringParams));
  var s = lt({}, typeof e.customHeaders == "function" ? e.customHeaders() : e.customHeaders);
  t && (s["Content-Type"] = "application/json");
  var n = typeof e.requestOptions == "function" ? e.requestOptions(t) : e.requestOptions, r = lt({
    method: t ? "POST" : "GET",
    body: t ? e.stringify(t) : void 0,
    headers: s
  }, va ? {} : n);
  try {
    ha(o, r, a);
  } catch (c) {
    if (!n || Object.keys(n).length === 0 || !c.message || c.message.indexOf("not implemented") < 0)
      return a(c);
    try {
      Object.keys(n).forEach(function(l) {
        delete r[l];
      }), ha(o, r, a), va = !0;
    } catch (l) {
      a(l);
    }
  }
}, ac = function(e, o, t, a) {
  t && go(t) === "object" && (t = dt("", t).slice(1)), e.queryStringParams && (o = dt(o, e.queryStringParams));
  try {
    var s;
    Si ? s = new Si() : s = new po("MSXML2.XMLHTTP.3.0"), s.open(t ? "POST" : "GET", o, 1), e.crossDomain || s.setRequestHeader("X-Requested-With", "XMLHttpRequest"), s.withCredentials = !!e.withCredentials, t && s.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), s.overrideMimeType && s.overrideMimeType("application/json");
    var n = e.customHeaders;
    if (n = typeof n == "function" ? n() : n, n)
      for (var r in n)
        s.setRequestHeader(r, n[r]);
    s.onreadystatechange = function() {
      s.readyState > 3 && a(s.status >= 400 ? s.statusText : null, {
        status: s.status,
        data: s.responseText
      });
    }, s.send(t);
  } catch (c) {
    console && console.log(c);
  }
}, sc = function(e, o, t, a) {
  if (typeof t == "function" && (a = t, t = void 0), a = a || function() {
  }, je)
    return tc(e, o, t, a);
  if (ys() || typeof ActiveXObject == "function")
    return ac(e, o, t, a);
  a(new Error("No fetch and no xhr implementation found!"));
};
function nc(i, e) {
  if (!(i instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function _a(i, e) {
  for (var o = 0; o < e.length; o++) {
    var t = e[o];
    t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(i, t.key, t);
  }
}
function rc(i, e, o) {
  return e && _a(i.prototype, e), o && _a(i, o), Object.defineProperty(i, "prototype", { writable: !1 }), i;
}
function cc(i, e, o) {
  return e in i ? Object.defineProperty(i, e, { value: o, enumerable: !0, configurable: !0, writable: !0 }) : i[e] = o, i;
}
var lc = function() {
  return {
    loadPath: "/locales/{{lng}}/{{ns}}.json",
    addPath: "/locales/add/{{lng}}/{{ns}}",
    allowMultiLoading: !1,
    parse: function(o) {
      return JSON.parse(o);
    },
    stringify: JSON.stringify,
    parsePayload: function(o, t, a) {
      return cc({}, t, a || "");
    },
    request: sc,
    reloadInterval: typeof window < "u" ? !1 : 60 * 60 * 1e3,
    customHeaders: {},
    queryStringParams: {},
    crossDomain: !1,
    withCredentials: !1,
    overrideMimeType: !1,
    requestOptions: {
      mode: "cors",
      credentials: "same-origin",
      cache: "default"
    }
  };
}, vs = function() {
  function i(e) {
    var o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    nc(this, i), this.services = e, this.options = o, this.allOptions = t, this.type = "backend", this.init(e, o, t);
  }
  return rc(i, [{
    key: "init",
    value: function(o) {
      var t = this, a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      this.services = o, this.options = lt(a, this.options || {}, lc()), this.allOptions = s, this.services && this.options.reloadInterval && setInterval(function() {
        return t.reload();
      }, this.options.reloadInterval);
    }
  }, {
    key: "readMulti",
    value: function(o, t, a) {
      this._readAny(o, o, t, t, a);
    }
  }, {
    key: "read",
    value: function(o, t, a) {
      this._readAny([o], o, [t], t, a);
    }
  }, {
    key: "_readAny",
    value: function(o, t, a, s, n) {
      var r = this, c = this.options.loadPath;
      typeof this.options.loadPath == "function" && (c = this.options.loadPath(o, a)), c = Zr(c), c.then(function(l) {
        if (!l)
          return n(null, {});
        var u = r.services.interpolator.interpolate(l, {
          lng: o.join("+"),
          ns: a.join("+")
        });
        r.loadUrl(u, n, t, s);
      });
    }
  }, {
    key: "loadUrl",
    value: function(o, t, a, s) {
      var n = this;
      this.options.request(this.options, o, void 0, function(r, c) {
        if (c && (c.status >= 500 && c.status < 600 || !c.status))
          return t("failed loading " + o + "; status code: " + c.status, !0);
        if (c && c.status >= 400 && c.status < 500)
          return t("failed loading " + o + "; status code: " + c.status, !1);
        if (!c && r && r.message && r.message.indexOf("Failed to fetch") > -1)
          return t("failed loading " + o + ": " + r.message, !0);
        if (r)
          return t(r, !1);
        var l, u;
        try {
          typeof c.data == "string" ? l = n.options.parse(c.data, a, s) : l = c.data;
        } catch {
          u = "failed parsing " + o + " to json";
        }
        if (u)
          return t(u, !1);
        t(null, l);
      });
    }
  }, {
    key: "create",
    value: function(o, t, a, s, n) {
      var r = this;
      if (this.options.addPath) {
        typeof o == "string" && (o = [o]);
        var c = this.options.parsePayload(t, a, s), l = 0, u = [], d = [];
        o.forEach(function(g) {
          var p = r.options.addPath;
          typeof r.options.addPath == "function" && (p = r.options.addPath(g, t));
          var h = r.services.interpolator.interpolate(p, {
            lng: g,
            ns: t
          });
          r.options.request(r.options, h, c, function(v, b) {
            l += 1, u.push(v), d.push(b), l === o.length && n && n(u, d);
          });
        });
      }
    }
  }, {
    key: "reload",
    value: function() {
      var o = this, t = this.services, a = t.backendConnector, s = t.languageUtils, n = t.logger, r = a.language;
      if (!(r && r.toLowerCase() === "cimode")) {
        var c = [], l = function(d) {
          var g = s.toResolveHierarchy(d);
          g.forEach(function(p) {
            c.indexOf(p) < 0 && c.push(p);
          });
        };
        l(r), this.allOptions.preload && this.allOptions.preload.forEach(function(u) {
          return l(u);
        }), c.forEach(function(u) {
          o.allOptions.ns.forEach(function(d) {
            a.read(u, d, "read", null, null, function(g, p) {
              g && n.warn("loading namespace ".concat(d, " for language ").concat(u, " failed"), g), !g && p && n.log("loaded namespace ".concat(d, " for language ").concat(u), p), a.loaded("".concat(u, "|").concat(d), g, p);
            });
          });
        });
      }
    }
  }]), i;
}();
vs.type = "backend";
var _s = [], uc = _s.forEach, dc = _s.slice;
function gc(i) {
  return uc.call(dc.call(arguments, 1), function(e) {
    if (e)
      for (var o in e)
        i[o] === void 0 && (i[o] = e[o]);
  }), i;
}
var ba = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/, pc = function(e, o, t) {
  var a = t || {};
  a.path = a.path || "/";
  var s = encodeURIComponent(o), n = "".concat(e, "=").concat(s);
  if (a.maxAge > 0) {
    var r = a.maxAge - 0;
    if (Number.isNaN(r))
      throw new Error("maxAge should be a Number");
    n += "; Max-Age=".concat(Math.floor(r));
  }
  if (a.domain) {
    if (!ba.test(a.domain))
      throw new TypeError("option domain is invalid");
    n += "; Domain=".concat(a.domain);
  }
  if (a.path) {
    if (!ba.test(a.path))
      throw new TypeError("option path is invalid");
    n += "; Path=".concat(a.path);
  }
  if (a.expires) {
    if (typeof a.expires.toUTCString != "function")
      throw new TypeError("option expires is invalid");
    n += "; Expires=".concat(a.expires.toUTCString());
  }
  if (a.httpOnly && (n += "; HttpOnly"), a.secure && (n += "; Secure"), a.sameSite) {
    var c = typeof a.sameSite == "string" ? a.sameSite.toLowerCase() : a.sameSite;
    switch (c) {
      case !0:
        n += "; SameSite=Strict";
        break;
      case "lax":
        n += "; SameSite=Lax";
        break;
      case "strict":
        n += "; SameSite=Strict";
        break;
      case "none":
        n += "; SameSite=None";
        break;
      default:
        throw new TypeError("option sameSite is invalid");
    }
  }
  return n;
}, ja = {
  create: function(e, o, t, a) {
    var s = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : {
      path: "/",
      sameSite: "strict"
    };
    t && (s.expires = /* @__PURE__ */ new Date(), s.expires.setTime(s.expires.getTime() + t * 60 * 1e3)), a && (s.domain = a), document.cookie = pc(e, encodeURIComponent(o), s);
  },
  read: function(e) {
    for (var o = "".concat(e, "="), t = document.cookie.split(";"), a = 0; a < t.length; a++) {
      for (var s = t[a]; s.charAt(0) === " "; )
        s = s.substring(1, s.length);
      if (s.indexOf(o) === 0)
        return s.substring(o.length, s.length);
    }
    return null;
  },
  remove: function(e) {
    this.create(e, "", -1);
  }
}, mc = {
  name: "cookie",
  lookup: function(e) {
    var o;
    if (e.lookupCookie && typeof document < "u") {
      var t = ja.read(e.lookupCookie);
      t && (o = t);
    }
    return o;
  },
  cacheUserLanguage: function(e, o) {
    o.lookupCookie && typeof document < "u" && ja.create(o.lookupCookie, e, o.cookieMinutes, o.cookieDomain, o.cookieOptions);
  }
}, yc = {
  name: "querystring",
  lookup: function(e) {
    var o;
    if (typeof window < "u") {
      var t = window.location.search;
      !window.location.search && window.location.hash && window.location.hash.indexOf("?") > -1 && (t = window.location.hash.substring(window.location.hash.indexOf("?")));
      for (var a = t.substring(1), s = a.split("&"), n = 0; n < s.length; n++) {
        var r = s[n].indexOf("=");
        if (r > 0) {
          var c = s[n].substring(0, r);
          c === e.lookupQuerystring && (o = s[n].substring(r + 1));
        }
      }
    }
    return o;
  }
}, li = null, wa = function() {
  if (li !== null)
    return li;
  try {
    li = window !== "undefined" && window.localStorage !== null;
    var e = "i18next.translate.boo";
    window.localStorage.setItem(e, "foo"), window.localStorage.removeItem(e);
  } catch {
    li = !1;
  }
  return li;
}, fc = {
  name: "localStorage",
  lookup: function(e) {
    var o;
    if (e.lookupLocalStorage && wa()) {
      var t = window.localStorage.getItem(e.lookupLocalStorage);
      t && (o = t);
    }
    return o;
  },
  cacheUserLanguage: function(e, o) {
    o.lookupLocalStorage && wa() && window.localStorage.setItem(o.lookupLocalStorage, e);
  }
}, ui = null, ka = function() {
  if (ui !== null)
    return ui;
  try {
    ui = window !== "undefined" && window.sessionStorage !== null;
    var e = "i18next.translate.boo";
    window.sessionStorage.setItem(e, "foo"), window.sessionStorage.removeItem(e);
  } catch {
    ui = !1;
  }
  return ui;
}, hc = {
  name: "sessionStorage",
  lookup: function(e) {
    var o;
    if (e.lookupSessionStorage && ka()) {
      var t = window.sessionStorage.getItem(e.lookupSessionStorage);
      t && (o = t);
    }
    return o;
  },
  cacheUserLanguage: function(e, o) {
    o.lookupSessionStorage && ka() && window.sessionStorage.setItem(o.lookupSessionStorage, e);
  }
}, vc = {
  name: "navigator",
  lookup: function(e) {
    var o = [];
    if (typeof navigator < "u") {
      if (navigator.languages)
        for (var t = 0; t < navigator.languages.length; t++)
          o.push(navigator.languages[t]);
      navigator.userLanguage && o.push(navigator.userLanguage), navigator.language && o.push(navigator.language);
    }
    return o.length > 0 ? o : void 0;
  }
}, _c = {
  name: "htmlTag",
  lookup: function(e) {
    var o, t = e.htmlTag || (typeof document < "u" ? document.documentElement : null);
    return t && typeof t.getAttribute == "function" && (o = t.getAttribute("lang")), o;
  }
}, bc = {
  name: "path",
  lookup: function(e) {
    var o;
    if (typeof window < "u") {
      var t = window.location.pathname.match(/\/([a-zA-Z-]*)/g);
      if (t instanceof Array)
        if (typeof e.lookupFromPathIndex == "number") {
          if (typeof t[e.lookupFromPathIndex] != "string")
            return;
          o = t[e.lookupFromPathIndex].replace("/", "");
        } else
          o = t[0].replace("/", "");
    }
    return o;
  }
}, jc = {
  name: "subdomain",
  lookup: function(e) {
    var o = typeof e.lookupFromSubdomainIndex == "number" ? e.lookupFromSubdomainIndex + 1 : 1, t = typeof window < "u" && window.location && window.location.hostname && window.location.hostname.match(/^(\w{2,5})\.(([a-z0-9-]{1,63}\.[a-z]{2,6})|localhost)/i);
    if (t)
      return t[o];
  }
};
function wc() {
  return {
    order: ["querystring", "cookie", "localStorage", "sessionStorage", "navigator", "htmlTag"],
    lookupQuerystring: "lng",
    lookupCookie: "i18next",
    lookupLocalStorage: "i18nextLng",
    lookupSessionStorage: "i18nextLng",
    // cache user language
    caches: ["localStorage"],
    excludeCacheFor: ["cimode"]
    // cookieMinutes: 10,
    // cookieDomain: 'myDomain'
  };
}
var bs = /* @__PURE__ */ function() {
  function i(e) {
    var o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    oe(this, i), this.type = "languageDetector", this.detectors = {}, this.init(e, o);
  }
  return te(i, [{
    key: "init",
    value: function(o) {
      var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      this.services = o, this.options = gc(t, this.options || {}, wc()), this.options.lookupFromUrlIndex && (this.options.lookupFromPathIndex = this.options.lookupFromUrlIndex), this.i18nOptions = a, this.addDetector(mc), this.addDetector(yc), this.addDetector(fc), this.addDetector(hc), this.addDetector(vc), this.addDetector(_c), this.addDetector(bc), this.addDetector(jc);
    }
  }, {
    key: "addDetector",
    value: function(o) {
      this.detectors[o.name] = o;
    }
  }, {
    key: "detect",
    value: function(o) {
      var t = this;
      o || (o = this.options.order);
      var a = [];
      return o.forEach(function(s) {
        if (t.detectors[s]) {
          var n = t.detectors[s].lookup(t.options);
          n && typeof n == "string" && (n = [n]), n && (a = a.concat(n));
        }
      }), this.services.languageUtils.getBestMatchFromCodes ? a : a.length > 0 ? a[0] : null;
    }
  }, {
    key: "cacheUserLanguage",
    value: function(o, t) {
      var a = this;
      t || (t = this.options.caches), t && (this.options.excludeCacheFor && this.options.excludeCacheFor.indexOf(o) > -1 || t.forEach(function(s) {
        a.detectors[s] && a.detectors[s].cacheUserLanguage(o, a.options);
      }));
    }
  }]), i;
}();
bs.type = "languageDetector";
var js = { exports: {} }, D = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ei = Symbol.for("react.element"), kc = Symbol.for("react.portal"), Pc = Symbol.for("react.fragment"), Sc = Symbol.for("react.strict_mode"), Oc = Symbol.for("react.profiler"), xc = Symbol.for("react.provider"), Fc = Symbol.for("react.context"), Bc = Symbol.for("react.forward_ref"), Ec = Symbol.for("react.suspense"), Ac = Symbol.for("react.memo"), Tc = Symbol.for("react.lazy"), Pa = Symbol.iterator;
function Rc(i) {
  return i === null || typeof i != "object" ? null : (i = Pa && i[Pa] || i["@@iterator"], typeof i == "function" ? i : null);
}
var ws = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, ks = Object.assign, Ps = {};
function ii(i, e, o) {
  this.props = i, this.context = e, this.refs = Ps, this.updater = o || ws;
}
ii.prototype.isReactComponent = {};
ii.prototype.setState = function(i, e) {
  if (typeof i != "object" && typeof i != "function" && i != null)
    throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, i, e, "setState");
};
ii.prototype.forceUpdate = function(i) {
  this.updater.enqueueForceUpdate(this, i, "forceUpdate");
};
function Ss() {
}
Ss.prototype = ii.prototype;
function Ot(i, e, o) {
  this.props = i, this.context = e, this.refs = Ps, this.updater = o || ws;
}
var xt = Ot.prototype = new Ss();
xt.constructor = Ot;
ks(xt, ii.prototype);
xt.isPureReactComponent = !0;
var Sa = Array.isArray, Os = Object.prototype.hasOwnProperty, Ft = { current: null }, xs = { key: !0, ref: !0, __self: !0, __source: !0 };
function Fs(i, e, o) {
  var t, a = {}, s = null, n = null;
  if (e != null)
    for (t in e.ref !== void 0 && (n = e.ref), e.key !== void 0 && (s = "" + e.key), e)
      Os.call(e, t) && !xs.hasOwnProperty(t) && (a[t] = e[t]);
  var r = arguments.length - 2;
  if (r === 1)
    a.children = o;
  else if (1 < r) {
    for (var c = Array(r), l = 0; l < r; l++)
      c[l] = arguments[l + 2];
    a.children = c;
  }
  if (i && i.defaultProps)
    for (t in r = i.defaultProps, r)
      a[t] === void 0 && (a[t] = r[t]);
  return { $$typeof: Ei, type: i, key: s, ref: n, props: a, _owner: Ft.current };
}
function Cc(i, e) {
  return { $$typeof: Ei, type: i.type, key: e, ref: i.ref, props: i.props, _owner: i._owner };
}
function Bt(i) {
  return typeof i == "object" && i !== null && i.$$typeof === Ei;
}
function Nc(i) {
  var e = { "=": "=0", ":": "=2" };
  return "$" + i.replace(/[=:]/g, function(o) {
    return e[o];
  });
}
var Oa = /\/+/g;
function Co(i, e) {
  return typeof i == "object" && i !== null && i.key != null ? Nc("" + i.key) : e.toString(36);
}
function Qi(i, e, o, t, a) {
  var s = typeof i;
  (s === "undefined" || s === "boolean") && (i = null);
  var n = !1;
  if (i === null)
    n = !0;
  else
    switch (s) {
      case "string":
      case "number":
        n = !0;
        break;
      case "object":
        switch (i.$$typeof) {
          case Ei:
          case kc:
            n = !0;
        }
    }
  if (n)
    return n = i, a = a(n), i = t === "" ? "." + Co(n, 0) : t, Sa(a) ? (o = "", i != null && (o = i.replace(Oa, "$&/") + "/"), Qi(a, e, o, "", function(l) {
      return l;
    })) : a != null && (Bt(a) && (a = Cc(a, o + (!a.key || n && n.key === a.key ? "" : ("" + a.key).replace(Oa, "$&/") + "/") + i)), e.push(a)), 1;
  if (n = 0, t = t === "" ? "." : t + ":", Sa(i))
    for (var r = 0; r < i.length; r++) {
      s = i[r];
      var c = t + Co(s, r);
      n += Qi(s, e, o, c, a);
    }
  else if (c = Rc(i), typeof c == "function")
    for (i = c.call(i), r = 0; !(s = i.next()).done; )
      s = s.value, c = t + Co(s, r++), n += Qi(s, e, o, c, a);
  else if (s === "object")
    throw e = String(i), Error("Objects are not valid as a React child (found: " + (e === "[object Object]" ? "object with keys {" + Object.keys(i).join(", ") + "}" : e) + "). If you meant to render a collection of children, use an array instead.");
  return n;
}
function $i(i, e, o) {
  if (i == null)
    return i;
  var t = [], a = 0;
  return Qi(i, t, "", "", function(s) {
    return e.call(o, s, a++);
  }), t;
}
function Dc(i) {
  if (i._status === -1) {
    var e = i._result;
    e = e(), e.then(function(o) {
      (i._status === 0 || i._status === -1) && (i._status = 1, i._result = o);
    }, function(o) {
      (i._status === 0 || i._status === -1) && (i._status = 2, i._result = o);
    }), i._status === -1 && (i._status = 0, i._result = e);
  }
  if (i._status === 1)
    return i._result.default;
  throw i._result;
}
var Z = { current: null }, Zi = { transition: null }, Lc = { ReactCurrentDispatcher: Z, ReactCurrentBatchConfig: Zi, ReactCurrentOwner: Ft };
function Bs() {
  throw Error("act(...) is not supported in production builds of React.");
}
D.Children = { map: $i, forEach: function(i, e, o) {
  $i(i, function() {
    e.apply(this, arguments);
  }, o);
}, count: function(i) {
  var e = 0;
  return $i(i, function() {
    e++;
  }), e;
}, toArray: function(i) {
  return $i(i, function(e) {
    return e;
  }) || [];
}, only: function(i) {
  if (!Bt(i))
    throw Error("React.Children.only expected to receive a single React element child.");
  return i;
} };
D.Component = ii;
D.Fragment = Pc;
D.Profiler = Oc;
D.PureComponent = Ot;
D.StrictMode = Sc;
D.Suspense = Ec;
D.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Lc;
D.act = Bs;
D.cloneElement = function(i, e, o) {
  if (i == null)
    throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + i + ".");
  var t = ks({}, i.props), a = i.key, s = i.ref, n = i._owner;
  if (e != null) {
    if (e.ref !== void 0 && (s = e.ref, n = Ft.current), e.key !== void 0 && (a = "" + e.key), i.type && i.type.defaultProps)
      var r = i.type.defaultProps;
    for (c in e)
      Os.call(e, c) && !xs.hasOwnProperty(c) && (t[c] = e[c] === void 0 && r !== void 0 ? r[c] : e[c]);
  }
  var c = arguments.length - 2;
  if (c === 1)
    t.children = o;
  else if (1 < c) {
    r = Array(c);
    for (var l = 0; l < c; l++)
      r[l] = arguments[l + 2];
    t.children = r;
  }
  return { $$typeof: Ei, type: i.type, key: a, ref: s, props: t, _owner: n };
};
D.createContext = function(i) {
  return i = { $$typeof: Fc, _currentValue: i, _currentValue2: i, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, i.Provider = { $$typeof: xc, _context: i }, i.Consumer = i;
};
D.createElement = Fs;
D.createFactory = function(i) {
  var e = Fs.bind(null, i);
  return e.type = i, e;
};
D.createRef = function() {
  return { current: null };
};
D.forwardRef = function(i) {
  return { $$typeof: Bc, render: i };
};
D.isValidElement = Bt;
D.lazy = function(i) {
  return { $$typeof: Tc, _payload: { _status: -1, _result: i }, _init: Dc };
};
D.memo = function(i, e) {
  return { $$typeof: Ac, type: i, compare: e === void 0 ? null : e };
};
D.startTransition = function(i) {
  var e = Zi.transition;
  Zi.transition = {};
  try {
    i();
  } finally {
    Zi.transition = e;
  }
};
D.unstable_act = Bs;
D.useCallback = function(i, e) {
  return Z.current.useCallback(i, e);
};
D.useContext = function(i) {
  return Z.current.useContext(i);
};
D.useDebugValue = function() {
};
D.useDeferredValue = function(i) {
  return Z.current.useDeferredValue(i);
};
D.useEffect = function(i, e) {
  return Z.current.useEffect(i, e);
};
D.useId = function() {
  return Z.current.useId();
};
D.useImperativeHandle = function(i, e, o) {
  return Z.current.useImperativeHandle(i, e, o);
};
D.useInsertionEffect = function(i, e) {
  return Z.current.useInsertionEffect(i, e);
};
D.useLayoutEffect = function(i, e) {
  return Z.current.useLayoutEffect(i, e);
};
D.useMemo = function(i, e) {
  return Z.current.useMemo(i, e);
};
D.useReducer = function(i, e, o) {
  return Z.current.useReducer(i, e, o);
};
D.useRef = function(i) {
  return Z.current.useRef(i);
};
D.useState = function(i) {
  return Z.current.useState(i);
};
D.useSyncExternalStore = function(i, e, o) {
  return Z.current.useSyncExternalStore(i, e, o);
};
D.useTransition = function() {
  return Z.current.useTransition();
};
D.version = "18.3.1";
js.exports = D;
var Ic = js.exports, Kc = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g, Uc = {
  "&amp;": "&",
  "&#38;": "&",
  "&lt;": "<",
  "&#60;": "<",
  "&gt;": ">",
  "&#62;": ">",
  "&apos;": "'",
  "&#39;": "'",
  "&quot;": '"',
  "&#34;": '"',
  "&nbsp;": " ",
  "&#160;": " ",
  "&copy;": "©",
  "&#169;": "©",
  "&reg;": "®",
  "&#174;": "®",
  "&hellip;": "…",
  "&#8230;": "…",
  "&#x2F;": "/",
  "&#47;": "/"
}, qc = function(e) {
  return Uc[e];
}, Mc = function(e) {
  return e.replace(Kc, qc);
};
function xa(i, e) {
  var o = Object.keys(i);
  if (Object.getOwnPropertySymbols) {
    var t = Object.getOwnPropertySymbols(i);
    e && (t = t.filter(function(a) {
      return Object.getOwnPropertyDescriptor(i, a).enumerable;
    })), o.push.apply(o, t);
  }
  return o;
}
function Fa(i) {
  for (var e = 1; e < arguments.length; e++) {
    var o = arguments[e] != null ? arguments[e] : {};
    e % 2 ? xa(Object(o), !0).forEach(function(t) {
      ke(i, t, o[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(i, Object.getOwnPropertyDescriptors(o)) : xa(Object(o)).forEach(function(t) {
      Object.defineProperty(i, t, Object.getOwnPropertyDescriptor(o, t));
    });
  }
  return i;
}
var Ba = {
  bindI18n: "languageChanged",
  bindI18nStore: "",
  transEmptyNodeValue: "",
  transSupportBasicHtmlNodes: !0,
  transWrapTextNodes: "",
  transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p"],
  useSuspense: !0,
  unescape: Mc
};
Ic.createContext();
function $c() {
  var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  Ba = Fa(Fa({}, Ba), i);
}
(function() {
  function i() {
    oe(this, i), this.usedNamespaces = {};
  }
  return te(i, [{
    key: "addUsedNamespaces",
    value: function(o) {
      var t = this;
      o.forEach(function(a) {
        t.usedNamespaces[a] || (t.usedNamespaces[a] = !0);
      });
    }
  }, {
    key: "getUsedNamespaces",
    value: function() {
      return Object.keys(this.usedNamespaces);
    }
  }]), i;
})();
var zc = {
  type: "3rdParty",
  init: function(e) {
    $c(e.options.react);
  }
};
const Et = () => Q.use(vs).use(bs).use(zc).init({
  fallbackLng: "en",
  debug: !0,
  interpolation: {
    escapeValue: !1
    // not needed for react as it escapes by default
  },
  backend: {
    loadPath: "/static/langs/{{lng}}.json"
  }
}), Hc = new BroadcastChannel("web-push-broadcast"), Vc = async ({ subscriptionId: i, message: e }) => {
  var a, s;
  const o = await rr();
  await o.notifications.add({
    ...e,
    subscriptionId: i,
    // New marker (used for bubble indicator); cannot be boolean; Dexie index limitation
    new: 1
  }), await o.subscriptions.update(i, {
    last: e.id
  });
  const t = await o.notifications.where({ new: 1 }).count();
  console.log("[ServiceWorker] Setting new app badge count", { badgeCount: t }), (s = (a = self.navigator).setAppBadge) == null || s.call(a, t);
}, Wc = async (i) => {
  const { subscription_id: e, message: o } = i;
  Hc.postMessage(o), await Vc({ subscriptionId: e, message: o }), await self.registration.showNotification(
    ...pr({
      subscriptionId: e,
      message: o,
      defaultTitle: o.topic,
      topicRoute: new URL(o.topic, self.location.origin).toString()
    })
  );
}, Jc = async (i) => {
  const e = await Et();
  await self.registration.showNotification(e("web_push_subscription_expiring_title"), {
    body: e("web_push_subscription_expiring_body"),
    icon: ho,
    data: i,
    badge: vo
  });
}, Gc = async (i) => {
  const e = await Et();
  await self.registration.showNotification(e("web_push_unknown_notification_title"), {
    body: e("web_push_unknown_notification_body"),
    icon: ho,
    data: i,
    badge: vo
  });
}, Xc = async (i) => {
  i.event === "message" ? await Wc(i) : i.event === "subscription_expiring" ? await Jc(i) : await Gc(i);
}, Yc = async (i) => {
  var n;
  const e = await Et(), o = await self.clients.matchAll({ type: "window" }), t = new URL(self.location.origin), a = o.find((r) => r.url === t.toString()), s = o[0];
  if (!((n = i.notification.data) != null && n.message))
    a ? a.focus() : s ? (s.focus(), s.navigate(t.toString())) : self.clients.openWindow(t), i.notification.close();
  else {
    const { message: r, topicRoute: c } = i.notification.data;
    if (i.action) {
      const l = i.notification.data.message.actions.find(({ label: u }) => i.action === u);
      if (l.action === "view")
        self.clients.openWindow(l.url);
      else if (l.action === "http")
        try {
          const u = await fetch(l.url, {
            method: l.method ?? "POST",
            headers: l.headers ?? {},
            body: l.body
          });
          if (!u.ok)
            throw new Error(`HTTP ${u.status} ${u.statusText}`);
        } catch (u) {
          console.error("[ServiceWorker] Error performing http action", u), self.registration.showNotification(`${e("notifications_actions_failed_notification")}: ${l.label} (${l.action})`, {
            body: u.message,
            icon: ho,
            badge: vo
          });
        }
      l.clear && i.notification.close();
    } else if (r.click)
      self.clients.openWindow(r.click), i.notification.close();
    else {
      const l = o.find((u) => u.url === c);
      l ? l.focus() : a ? (a.focus(), a.navigate(c)) : s ? (s.focus(), s.navigate(c)) : self.clients.openWindow(c), i.notification.close();
    }
  }
};
self.addEventListener("install", () => {
  console.log("[ServiceWorker] Installed"), self.skipWaiting();
});
self.addEventListener("activate", () => {
  console.log("[ServiceWorker] Activated"), self.skipWaiting();
});
self.addEventListener("pushsubscriptionchange", (i) => {
  console.log("[ServiceWorker] PushSubscriptionChange"), console.log(i);
});
self.addEventListener("push", (i) => {
  const e = i.data.json();
  console.log("[ServiceWorker] Received Web Push Event", { event: i, data: e }), i.waitUntil(Xc(e));
});
self.addEventListener("notificationclick", (i) => {
  console.log("[ServiceWorker] NotificationClick"), i.waitUntil(Yc(i));
});
cn(
  // eslint-disable-next-line no-underscore-dangle
  [{"revision":"5546b7f8e38a095eacceea35fcdbbf22","url":"app.html"},{"revision":"f18c516abb7987534f8eace68df67590","url":"static/css/app.css"},{"revision":"50d61939da788edc442537675178acd0","url":"static/css/fonts.css"},{"revision":"1aa536154d2bc8ae2e4d97e0810e6013","url":"static/images/apple-touch-icon.png"},{"revision":"4007ba25da97bb5c241d3fa63e2cb290","url":"static/images/favicon.ico"},{"revision":"4eb6264f25832e96bb46e2d9871a9582","url":"static/images/mask-icon.svg"},{"revision":"aafa632eb6154301a4cc867a2f6f6da7","url":"static/images/ntfy.png"},{"revision":"7e179b11f13147484709bd1733d15f43","url":"static/images/pwa-192x192.png"},{"revision":"a1228904eca1342039c77aad6bee2be9","url":"static/images/pwa-512x512.png"},{"revision":"3c51c6e09755b0349e7dde9437f65411","url":"static/langs/ar.json"},{"revision":"7ef1c29aaf73ccbbc2dcc8a70ce6c72a","url":"static/langs/bg.json"},{"revision":"8acd9d7cbda4d00e2d95df6865f605ca","url":"static/langs/cs.json"},{"revision":"9b945db3e828d6ba7fd5925db2a299fc","url":"static/langs/cy.json"},{"revision":"5de24317a761fc1bf25965af9190f62f","url":"static/langs/da.json"},{"revision":"deacb81c984f741f1afd90b134a21c72","url":"static/langs/de.json"},{"revision":"6aa719a2f1b33a2d2d78996f21dd7316","url":"static/langs/en.json"},{"revision":"8a80554c91d9fca8acb82f023de02f11","url":"static/langs/eo.json"},{"revision":"d3c48714a2a9b0c1600197b609913cfb","url":"static/langs/es.json"},{"revision":"324cb7bf72cf82a8f3a3633c777fe8cc","url":"static/langs/et.json"},{"revision":"c94752019bc099803488af813542a203","url":"static/langs/fa.json"},{"revision":"346a98abac75d3ad037dc8a62e51ec03","url":"static/langs/fi.json"},{"revision":"6ec7207e490d84e8e248d3707fd86a82","url":"static/langs/fr.json"},{"revision":"e1a7568244ed3f8a757c4bff8a746d83","url":"static/langs/gl.json"},{"revision":"ea3293659111b621321832440a7e0ba1","url":"static/langs/hu.json"},{"revision":"d2934dbb10b86ba48c399aaa75a2a951","url":"static/langs/id.json"},{"revision":"90891652514d7c263d4b8cc73fbcd6db","url":"static/langs/it.json"},{"revision":"06a2f7667908d0dbfbd44febc7628578","url":"static/langs/ja.json"},{"revision":"ab323dda098e250341a3a4e03fc8d4a4","url":"static/langs/ko.json"},{"revision":"632fa8bdd6e8d149b724827011a10afd","url":"static/langs/ms.json"},{"revision":"358a463467b61861190afc2934d50da5","url":"static/langs/nb_NO.json"},{"revision":"9b3cc1788d0db1fc2effadb6d09076ed","url":"static/langs/nl.json"},{"revision":"e718323c1c68b0a7ba9b6e411233c80f","url":"static/langs/pl.json"},{"revision":"da673363b0f0eaa986d7c980ff6f6145","url":"static/langs/pt_BR.json"},{"revision":"c49b9c8e16404fc77be5e52ab08f5517","url":"static/langs/pt.json"},{"revision":"5431859a52fd018335af511c8aeb822b","url":"static/langs/ro.json"},{"revision":"54c186bddbf21659a9610b23787a41ac","url":"static/langs/ru.json"},{"revision":"8cf4a24fc7e3a685e592a055deadc616","url":"static/langs/sk.json"},{"revision":"347dc795f885924fadaa8656aac63905","url":"static/langs/sv.json"},{"revision":"7aa9a6587b59e902b12a5623bd458b00","url":"static/langs/tr.json"},{"revision":"7a3496d2121818da609fc4c2559f0da2","url":"static/langs/uk.json"},{"revision":"7e87f39d90c4b00613627aa3e19de75b","url":"static/langs/uz.json"},{"revision":"fa386e8a44e7888c19e31c92b9d01485","url":"static/langs/vi.json"},{"revision":"4cdb2a950a0f881d605c92b1e1af3ba8","url":"static/langs/zh_Hans.json"},{"revision":"26aa0cbf2845f0c19b620e54c2d7cbc3","url":"static/langs/zh_Hant.json"},{"revision":null,"url":"static/media/file-app-f64d7ea8.svg"},{"revision":null,"url":"static/media/file-audio-2fe6e9f5.svg"},{"revision":null,"url":"static/media/file-document-5efa15c5.svg"},{"revision":null,"url":"static/media/file-image-e7d67260.svg"},{"revision":null,"url":"static/media/file-video-5b7b7ba1.svg"},{"revision":null,"url":"static/media/index-14d33e1d.js"},{"revision":null,"url":"static/media/ntfy-d7abf07b.svg"},{"revision":null,"url":"static/media/ntfy-filled-93d7d911.svg"},{"revision":null,"url":"static/media/ntfy-outline-a774b740.svg"},{"revision":null,"url":"static/media/priority-1-ff56d9f3.svg"},{"revision":null,"url":"static/media/priority-2-8b31ae43.svg"},{"revision":null,"url":"static/media/priority-3-612d498a.svg"},{"revision":null,"url":"static/media/priority-4-bfb75127.svg"},{"revision":null,"url":"static/media/priority-5-eca366d3.svg"},{"revision":null,"url":"static/media/workbox-window.prod.es5-08b2315b.js"}]
);
gn();
sn();
self.importScripts("/config.js"), No(
  new ln(nn("/app.html"), {
    allowlist: [
      // the app root itself, could be /, or not
      new RegExp(`^${config.app_root}$`)
    ]
  })
), No(({ url: i }) => i.pathname === "/config.js", new dn());
//# sourceMappingURL=sw.js.map

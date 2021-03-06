(function(l, n) {
    var u = {},
        e = function(a, b) {
            var d, q, c;
            if ("string" === typeof a) return k(a);
            d = [];
            q = a.length;
            for (c = 0; c < q; c++) d.push(k(a[c]));
            return b.apply(null, d) },
        h = function(a, b, d) { 2 === arguments.length && (d = b, b = null);
            e(b || [], function() {
                var b = arguments,
                    c = { exports: d }; "function" === typeof d && (b.length || (b = [e, c.exports, c]), b = d.apply(null, b), void 0 !== b && (c.exports = b));
                u[a] = c.exports }) },
        k = function(a) {
            var b = u[a] || l[a];
            if (!b) throw Error("`" + a + "` is undefined");
            return b },
        c = function(a) {
            var b, d, q, c, e, t;
            t = function(a) {
                return a &&
                    a.charAt(0).toUpperCase() + a.substr(1)
            };
            for (b in u)
                if (d = a, u.hasOwnProperty(b)) { q = b.split("/");
                    for (e = t(q.pop()); c = t(q.shift());) d[c] = d[c] || {}, d = d[c];
                    d[e] = u[b] }
            return a
        },
        b = function(a) { l.__dollar = a;
            return c(n(l, h, e)) },
        a;
    "object" === typeof module && "object" === typeof module.exports ? module.exports = b() : "function" === typeof define && define.amd ? define(["jquery"], b) : (a = l.WebUploader, l.WebUploader = b(), l.WebUploader.noConflict = function() { l.WebUploader = a })
})(window, function(l, n, u) {
    n("dollar-third", [], function() {
        var e =
            l.__dollar || l.jQuery || l.Zepto;
        if (!e) throw Error("jQuery or Zepto not found!");
        return e
    });
    n("dollar", ["dollar-third"], function(e) {
        return e });
    n("promise-third", ["dollar"], function(e) {
        return { Deferred: e.Deferred, when: e.when, isPromise: function(e) {
                return e && "function" === typeof e.then } } });
    n("promise", ["promise-third"], function(e) {
        return e });
    n("base", ["dollar", "promise"], function(e, h) {
        function k(a, b) {
            return function() {
                return a.apply(b, arguments) } }

        function c(a) {
            var b;
            if (Object.create) return Object.create(a);
            b = function() {};
            b.prototype = a;
            return new b
        }
        var b = function() {},
            a = Function.call,
            g = h.Deferred,
            f = h.isPromise,
            d = h.when,
            q = function(a) {
                var b = {},
                    d = a.match(/WebKit\/([\d.]+)/),
                    g = a.match(/Chrome\/([\d.]+)/) || a.match(/CriOS\/([\d.]+)/),
                    q = a.match(/MSIE\s([\d\.]+)/) || a.match(/(?:trident)(?:.*rv:([\w.]+))?/i),
                    c = a.match(/Firefox\/([\d.]+)/),
                    f = a.match(/Safari\/([\d.]+)/);
                a = a.match(/OPR\/([\d.]+)/);
                d && (b.webkit = parseFloat(d[1]));
                g && (b.chrome = parseFloat(g[1]));
                q && (b.ie = parseFloat(q[1]));
                c && (b.firefox = parseFloat(c[1]));
                f && (b.safari = parseFloat(f[1]));
                a && (b.opera = parseFloat(a[1]));
                return b
            }(navigator.userAgent),
            r = function(a) {
                var b = {},
                    d = a.match(/(?:Android);?[\s\/]+([\d.]+)?/);
                a = a.match(/(?:iPad|iPod|iPhone).*OS\s([\d_]+)/);
                d && (b.android = parseFloat(d[1]));
                a && (b.ios = parseFloat(a[1].replace(/_/g, ".")));
                return b }(navigator.userAgent),
            z;
        z = l.console ? k(console.log, console) : b;
        return {
            version: "0.1.5",
            $: e,
            Deferred: g,
            isPromise: f,
            when: d,
            browser: q,
            os: r,
            inherits: function(a, b, d) {
                var g;
                "function" === typeof b ? (g = b, b = null) : g = b && b.hasOwnProperty("constructor") ?
                    b.constructor : function() {
                        return a.apply(this, arguments) };
                e.extend(!0, g, a, d || {});
                g.__super__ = a.prototype;
                g.prototype = c(a.prototype);
                b && e.extend(!0, g.prototype, b);
                return g
            },
            noop: b,
            bindFn: k,
            log: z,
            nextTick: function() {
                return function(a) { setTimeout(a, 1) } }(),
            slice: function(b) {
                return function() {
                    return a.apply(b, arguments) } }([].slice),
            guid: function() {
                var a = 0;
                return function(b) {
                    for (var d = (+new Date).toString(32), g = 0; 5 > g; g++) d += Math.floor(65535 * Math.random()).toString(32);
                    return (b || "wu_") + d + (a++).toString(32) } }(),
            formatSize: function(a, b, d) {
                var g;
                for (d = d || ["B", "K", "M", "G", "TB"];
                    (g = d.shift()) && 1024 < a;) a /= 1024;
                return ("B" === g ? a : a.toFixed(b || 2)) + g }
        }
    });
    n("mediator", ["base"], function(e) {
        function h(a, g, c, f) {
            return b.grep(a, function(a) {
                return a && (!g || a.e === g) && (!c || a.cb === c || a.cb._cb === c) && (!f || a.ctx === f) }) }

        function k(a, q, c) { b.each((a || "").split(g), function(a, b) { c(b, q) }) }

        function c(a, b) {
            for (var g = !1, c = -1, f = a.length, e; ++c < f;)
                if (e = a[c], !1 === e.cb.apply(e.ctx2, b)) { g = !0;
                    break }
            return !g }
        var b = e.$,
            a = [].slice,
            g = /\s+/,
            f;
        f = {
            on: function(a,
                b, g) {
                var c = this,
                    f;
                if (!b) return this;
                f = this._events || (this._events = []);
                k(a, b, function(a, b) {
                    var d = { e: a };
                    d.cb = b;
                    d.ctx = g;
                    d.ctx2 = g || c;
                    d.id = f.length;
                    f.push(d) });
                return this },
            once: function(a, b, g) {
                var c = this;
                if (!b) return c;
                k(a, b, function(a, b) {
                    var d = function() { c.off(a, d);
                        return b.apply(g || c, arguments) };
                    d._cb = b;
                    c.on(a, d, g) });
                return c },
            off: function(a, g, c) {
                var f = this._events;
                if (!f) return this;
                if (!a && !g && !c) return this._events = [], this;
                k(a, g, function(a, d) { b.each(h(f, a, d, c), function() { delete f[this.id] }) });
                return this },
            trigger: function(b) {
                var g, f, e;
                if (!this._events || !b) return this;
                g = a.call(arguments, 1);
                f = h(this._events, b);
                e = h(this._events, "all");
                return c(f, g) && c(e, arguments) }
        };
        return b.extend({ installTo: function(a) {
                return b.extend(a, f) } }, f)
    });
    n("uploader", ["base", "mediator"], function(e, h) {
        function k(b) { this.options = c.extend(!0, {}, k.options, b);
            this._init(this.options) }
        var c = e.$;
        k.options = {};
        h.installTo(k.prototype);
        c.each({
            upload: "start-upload",
            stop: "stop-upload",
            getFile: "get-file",
            getFiles: "get-files",
            addFile: "add-file",
            addFiles: "add-file",
            sort: "sort-files",
            removeFile: "remove-file",
            cancelFile: "cancel-file",
            skipFile: "skip-file",
            retry: "retry",
            isInProgress: "is-in-progress",
            makeThumb: "make-thumb",
            md5File: "md5-file",
            getDimension: "get-dimension",
            addButton: "add-btn",
            predictRuntimeType: "predict-runtime-type",
            refresh: "refresh",
            disable: "disable",
            enable: "enable",
            reset: "reset"
        }, function(b, a) { k.prototype[b] = function() {
                return this.request(a, arguments) } });
        c.extend(k.prototype, {
            state: "pending",
            _init: function(b) {
                var a = this;
                a.request("init",
                    b,
                    function() { a.state = "ready";
                        a.trigger("ready") });
                0 == b.extension.debug && (WebUploader.Base.log = function() {})
            },
            option: function(b, a) {
                var g = this.options;
                if (1 < arguments.length) c.isPlainObject(a) && c.isPlainObject(g[b]) ? c.extend(g[b], a) : g[b] = a;
                else return b ? g[b] : g },
            getStats: function() {
                var b = this.request("get-stats");
                return b ? { successNum: b.numOfSuccess, progressNum: b.numOfProgress, cancelNum: b.numOfCancel, invalidNum: b.numOfInvalid, uploadFailNum: b.numOfUploadFailed, queueNum: b.numOfQueue, interruptNum: b.numofInterrupt } : {}
            },
            trigger: function(b) {
                var a = [].slice.call(arguments, 1),
                    g = this.options,
                    f = "on" + b.substring(0, 1).toUpperCase() + b.substring(1);
                return !1 === h.trigger.apply(this, arguments) || c.isFunction(g[f]) && !1 === g[f].apply(this, a) || c.isFunction(this[f]) && !1 === this[f].apply(this, a) || !1 === h.trigger.apply(h, [this, b].concat(a)) ? !1 : !0 },
            destroy: function() { this.request("destroy", arguments);
                this.off() },
            request: e.noop
        });
        e.create = k.create = function(b) {
            return new k(b) };
        return e.Uploader = k
    });
    n("runtime/runtime", ["base", "mediator"],
        function(e, h) {
            function k(a) { this.options = c.extend({ container: document.body }, a);
                this.uid = e.guid("rt_") }
            var c = e.$,
                b = {},
                a = function(a) {
                    for (var b in a)
                        if (a.hasOwnProperty(b)) return b;
                    return null };
            c.extend(k.prototype, {
                getContainer: function() {
                    var a, b;
                    if (this._container) return this._container;
                    a = c(this.options.container || document.body);
                    b = c(document.createElement("div"));
                    b.attr("id", "rt_" + this.uid);
                    b.css({ position: "absolute", top: "0px", left: "0px", width: "1px", height: "1px", overflow: "hidden" });
                    a.append(b);
                    a.addClass("webuploader-container");
                    this._container = b;
                    this._parent = a;
                    return b
                },
                init: e.noop,
                exec: e.noop,
                destroy: function() { this._container && this._container.remove();
                    this._parent && this._parent.removeClass("webuploader-container");
                    this.off() }
            });
            k.orders = "html5,flash";
            k.addRuntime = function(a, c) { b[a] = c };
            k.hasRuntime = function(g) {
                return !(g ? !b[g] : !a(b)) };
            k.create = function(g, f) {
                var d;
                f = f || k.orders;
                c.each(f.split(/\s*,\s*/g), function() {
                    if (b[this]) return d = this, !1 });
                d = d || a(b);
                if (!d) throw Error("Runtime Error");
                return new b[d](g) };
            h.installTo(k.prototype);
            return k
        });
    n("runtime/client", ["base", "mediator", "runtime/runtime"], function(e, h, k) {
        function c(a, g) {
            var c = e.Deferred(),
                d;
            this.uid = e.guid("client_");
            this.runtimeReady = function(a) {
                return c.done(a) };
            this.connectRuntime = function(a, r) {
                if (d) throw Error("already connected!");
                c.done(r);
                "string" === typeof a && b.get(a) && (d = b.get(a));
                (d = d || b.get(null, g)) ? (e.$.extend(d.options, a), d.__promise.then(c.resolve), d.__client++) : (d = k.create(a, a.runtimeOrder), d.__promise = c.promise(), d.once("ready", c.resolve), d.init(), b.add(d),
                    d.__client = 1);
                g && (d.__standalone = g);
                return d
            };
            this.getRuntime = function() {
                return d };
            this.disconnectRuntime = function() { d && (d.__client--, 0 >= d.__client && (b.remove(d), delete d.__promise, d.destroy()), d = null) };
            this.exec = function() {
                if (d) {
                    var b = e.slice(arguments);
                    a && b.unshift(a);
                    return d.exec.apply(this, b) } };
            this.getRuid = function() {
                return d && d.uid };
            this.destroy = function(a) {
                return function() { a && a.apply(this, arguments);
                    this.trigger("destroy");
                    this.off();
                    this.exec("destroy");
                    this.disconnectRuntime() } }(this.destroy)
        }
        var b;
        b = function() {
            var a = {};
            return { add: function(b) { a[b.uid] = b }, get: function(b, c) {
                    var d;
                    if (b) return a[b];
                    for (d in a)
                        if (!c || !a[d].__standalone) return a[d];
                    return null }, remove: function(b) { delete a[b.uid] } } }();
        h.installTo(c.prototype);
        return c
    });
    n("lib/dnd", ["base", "mediator", "runtime/client"], function(e, h, k) {
        function c(a) { a = this.options = b.extend({}, c.options, a);
            a.container = b(a.container);
            a.container.length && k.call(this, "DragAndDrop") }
        var b = e.$;
        c.options = { accept: null, disableGlobalDnd: !1 };
        e.inherits(k, { constructor: c, init: function() {
                var a = this;
                a.connectRuntime(a.options, function() { a.exec("init");
                    a.trigger("ready") }) } });
        h.installTo(c.prototype);
        return c
    });
    n("widgets/widget", ["base", "uploader"], function(e, h) {
        function k(a) {
            if (!a) return !1;
            var d = a.length,
                g = b.type(a);
            return 1 === a.nodeType && d ? !0 : "array" === g || "function" !== g && "string" !== g && (0 === d || "number" === typeof d && 0 < d && d - 1 in a) }

        function c(a) { this.owner = a;
            this.options = a.options }
        var b = e.$,
            a = h.prototype._init,
            g = h.prototype.destroy,
            f = {},
            d = [];
        b.extend(c.prototype, { init: e.noop, invoke: function(a, d) {
                var g = this.responseMap;
                return g && a in g && g[a] in this && b.isFunction(this[g[a]]) ? this[g[a]].apply(this, d) : f }, request: function() {
                return this.owner.request.apply(this.owner, arguments) } });
        b.extend(h.prototype, {
            _init: function() {
                var g = this,
                    c = g._widgets = [],
                    f = g.options.disableWidgets || "";
                b.each(d, function(a, b) { f && ~f.indexOf(b._name) || c.push(new b(g)) });
                return a.apply(g, arguments) },
            request: function(a, b, d) {
                var g = 0,
                    c = this._widgets,
                    w = c && c.length,
                    y = [],
                    x = [],
                    m;
                for (b = k(b) ? b : [b]; g <
                    w; g++) m = c[g], m = m.invoke(a, b), m !== f && (e.isPromise(m) ? x.push(m) : y.push(m));
                return d || x.length ? (a = e.when.apply(e, x), b = a.pipe ? "pipe" : "then", a[b](function() {
                    var a = e.Deferred(),
                        b = arguments;
                    1 === b.length && (b = b[0]);
                    setTimeout(function() { a.resolve(b) }, 1);
                    return a.promise() })[d ? b : "done"](d || e.noop)) : y[0]
            },
            destroy: function() { g.apply(this, arguments);
                this._widgets = null }
        });
        h.register = c.register = function(a, g) {
            var f = { init: "init", destroy: "destroy", name: "anonymous" },
                k;
            1 === arguments.length ? (g = a, b.each(g, function(a) {
                "_" ===
                a[0] || "name" === a ? "name" === a && (f.name = g.name) : f[a.replace(/[A-Z]/g, "-$&").toLowerCase()] = a
            })) : f = b.extend(f, a);
            g.responseMap = f;
            k = e.inherits(c, g);
            k._name = f.name;
            d.push(k);
            return k
        };
        h.unRegister = c.unRegister = function(a) {
            if (a && "anonymous" !== a)
                for (var b = d.length; b--;) d[b]._name === a && d.splice(b, 1) };
        return c
    });
    n("widgets/filednd", ["base", "uploader", "lib/dnd", "widgets/widget"], function(e, h, k) {
        var c = e.$;
        h.options.dnd = "";
        return h.register({
            name: "dnd",
            init: function(b) {
                if (b.dnd && "html5" === this.request("predict-runtime-type")) {
                    var a =
                        this,
                        g = e.Deferred();
                    b = c.extend({}, { disableGlobalDnd: b.disableGlobalDnd, container: b.dnd, accept: b.accept });
                    this.dnd = b = new k(b);
                    b.once("ready", g.resolve);
                    b.on("drop", function(b) { a.request("add-file", [b]) });
                    b.on("accept", function(b) {
                        return a.owner.trigger("dndAccept", b) });
                    b.init();
                    return g.promise()
                }
            },
            destroy: function() { this.dnd && this.dnd.destroy() }
        })
    });
    n("lib/filepaste", ["base", "mediator", "runtime/client"], function(e, h, k) {
        function c(a) {
            a = this.options = b.extend({}, a);
            a.container = b(a.container || document.body);
            k.call(this, "FilePaste")
        }
        var b = e.$;
        e.inherits(k, { constructor: c, init: function() {
                var a = this;
                a.connectRuntime(a.options, function() { a.exec("init");
                    a.trigger("ready") }) } });
        h.installTo(c.prototype);
        return c
    });
    n("widgets/filepaste", ["base", "uploader", "lib/filepaste", "widgets/widget"], function(e, h, k) {
        var c = e.$;
        return h.register({
            name: "paste",
            init: function(b) {
                if (b.paste && "html5" === this.request("predict-runtime-type")) {
                    var a = this,
                        g = e.Deferred();
                    b = c.extend({}, { container: b.paste, accept: b.accept });
                    this.paste =
                        b = new k(b);
                    b.once("ready", g.resolve);
                    b.on("paste", function(b) { a.owner.request("add-file", [b]) });
                    b.init();
                    return g.promise()
                }
            },
            destroy: function() { this.paste && this.paste.destroy() }
        })
    });
    n("lib/blob", ["base", "runtime/client"], function(e, h) {
        function k(c, b) {
            this.source = b;
            this.ruid = c;
            this.size = b.size || 0;
            !b.type && this.ext && ~"jpg,jpeg,png,gif,bmp".indexOf(this.ext) ? this.type = "image/" + ("jpg" === this.ext ? "jpeg" : this.ext) : this.type = b.type || "application/octet-stream";
            h.call(this, "Blob");
            this.uid = b.uid || this.uid;
            c && this.connectRuntime(c)
        }
        e.inherits(h, { constructor: k, slice: function(c, b) {
                return this.exec("slice", c, b) }, getSource: function() {
                return this.source } });
        return k
    });
    n("lib/file", ["base", "lib/blob"], function(e, h) {
        function k(a, g) {
            var f;
            this.name = g.name || "untitled" + c++;
            f = b.exec(g.name) ? RegExp.$1.toLowerCase() : "";
            !f && g.type && (f = /\/(jpg|jpeg|png|gif|bmp)$/i.exec(g.type) ? RegExp.$1.toLowerCase() : "", this.name += "." + f);
            this.ext = f;
            this.lastModifiedDate = g.lastModifiedDate || (new Date).toLocaleString();
            h.apply(this,
                arguments)
        }
        var c = 1,
            b = /\.([^.]+)$/;
        return e.inherits(h, k)
    });
    n("lib/filepicker", ["base", "runtime/client", "lib/file"], function(e, h, k) {
        function c(a) { a = this.options = b.extend({}, c.options, a);
            a.container = b(a.id);
            if (!a.container.length) throw Error("\u6309\u94ae\u6307\u5b9a\u9519\u8bef");
            a.innerHTML = a.innerHTML || a.label || a.container.html() || "";
            a.button = b(a.button || document.createElement("div"));
            a.button.html(a.innerHTML);
            a.container.html(a.button);
            h.call(this, "FilePicker", !0) }
        var b = e.$;
        c.options = {
            button: null,
            container: null,
            label: null,
            innerHTML: null,
            multiple: !0,
            accept: null,
            name: "file"
        };
        e.inherits(h, {
            constructor: c,
            init: function() {
                var a = this,
                    g = a.options,
                    c = g.button;
                c.addClass("webuploader-pick");
                a.on("all", function(d) {
                    switch (d) {
                        case "mouseenter":
                            c.addClass("webuploader-pick-hover");
                            break;
                        case "mouseleave":
                            c.removeClass("webuploader-pick-hover");
                            break;
                        case "change":
                            d = a.exec("getFiles"), a.trigger("select", b.map(d, function(b) { b = new k(a.getRuid(), b);
                                b._refer = g.container;
                                return b }), g.container) } });
                a.connectRuntime(g,
                    function() { a.refresh();
                        a.exec("init", g);
                        a.trigger("ready") });
                this._resizeHandler = e.bindFn(this.refresh, this);
                b(l).on("resize", this._resizeHandler)
            },
            refresh: function() {
                var a = this.getRuntime().getContainer(),
                    b = this.options.button,
                    c = b.outerWidth ? b.outerWidth() : b.width(),
                    d = b.outerHeight ? b.outerHeight() : b.height(),
                    b = b.offset();
                c && d && a.css({ bottom: "auto", right: "auto", width: c + "px", height: d + "px" }).offset(b) },
            enable: function() { this.options.button.removeClass("webuploader-pick-disable");
                this.refresh() },
            disable: function() {
                var a =
                    this.options.button;
                this.getRuntime().getContainer().css({ top: "-99999px" });
                a.addClass("webuploader-pick-disable")
            },
            destroy: function() {
                var a = this.options.button;
                b(l).off("resize", this._resizeHandler);
                a.removeClass("webuploader-pick-disable webuploader-pick-hover webuploader-pick") }
        });
        return c
    });
    n("widgets/filepicker", ["base", "uploader", "lib/filepicker", "widgets/widget"], function(e, h, k) {
        var c = e.$;
        c.extend(h.options, { pick: null, accept: null });
        return h.register({
            name: "picker",
            init: function(b) {
                this.pickers = [];
                return b.pick && this.addBtn(b.pick)
            },
            refresh: function() { c.each(this.pickers, function() { this.refresh() }) },
            addBtn: function(b) {
                var a = this,
                    g = a.options,
                    f = g.accept,
                    d = [];
                if (b) return c.isPlainObject(b) || (b = { id: b }), c(b.id).each(function() {
                    var q, r;
                    r = e.Deferred();
                    q = c.extend({}, b, { accept: c.isPlainObject(f) ? [f] : f, swf: g.swf, runtimeOrder: g.runtimeOrder, id: this });
                    q = new k(q);
                    q.once("ready", r.resolve);
                    q.on("select", function(b) { a.owner.request("add-file", [b]) });
                    q.init();
                    a.pickers.push(q);
                    d.push(r.promise()) }), e.when.apply(e,
                    d)
            },
            disable: function() { c.each(this.pickers, function() { this.disable() }) },
            enable: function() { c.each(this.pickers, function() { this.enable() }) },
            destroy: function() { c.each(this.pickers, function() { this.destroy() });
                this.pickers = null }
        })
    });
    n("lib/image", ["base", "runtime/client", "lib/blob"], function(e, h, k) {
        function c(a) { this.options = b.extend({}, c.options, a);
            h.call(this, "Image");
            this.on("load", function() { this._info = this.exec("info");
                this._meta = this.exec("meta") }) }
        var b = e.$;
        c.options = {
            quality: 90,
            crop: !1,
            preserveHeaders: !1,
            allowMagnify: !1
        };
        e.inherits(h, {
            constructor: c,
            info: function(a) {
                return a ? (this._info = a, this) : this._info },
            meta: function(a) {
                return a ? (this._meta = a, this) : this._meta },
            loadFromBlob: function(a) {
                var b = this,
                    c = a.getRuid();
                this.connectRuntime(c, function() { b.exec("init", b.options);
                    b.exec("loadFromBlob", a) }) },
            resize: function() {
                var a = e.slice(arguments);
                return this.exec.apply(this, ["resize"].concat(a)) },
            crop: function() {
                var a = e.slice(arguments);
                return this.exec.apply(this, ["crop"].concat(a)) },
            getAsDataUrl: function(a) {
                return this.exec("getAsDataUrl",
                    a)
            },
            getAsBlob: function(a) { a = this.exec("getAsBlob", a);
                return new k(this.getRuid(), a) }
        });
        return c
    });
    n("widgets/image", ["base", "uploader", "lib/image", "widgets/widget"], function(e, h, k) {
        var c = e.$,
            b;
        b = function(a) {
            var b = 0,
                c = [],
                d = function() {
                    for (var d; c.length && b < a;) d = c.shift(), b += d[0], d[1]() };
            return function(a, r, e) { c.push([r, e]);
                a.once("destroy", function() { b -= r;
                    setTimeout(d, 1) });
                setTimeout(d, 1) } }(5242880);
        c.extend(h.options, {
            thumb: {
                width: 110,
                height: 110,
                quality: 70,
                allowMagnify: !0,
                crop: !0,
                preserveHeaders: !1,
                type: "image/jpeg"
            },
            compress: { width: 1600, height: 1600, quality: 90, allowMagnify: !1, crop: !1, preserveHeaders: !0 }
        });
        return h.register({
            name: "image",
            makeThumb: function(a, g, f, d) {
                var q, r;
                a = this.request("get-file", a);
                a.type.match(/^image/) ? (q = c.extend({}, this.options.thumb), c.isPlainObject(f) && (q = c.extend(q, f), f = null), f = f || q.width, d = d || q.height, r = new k(q), r.once("load", function() { a._info = a._info || r.info();
                        a._meta = a._meta || r.meta();
                        1 >= f && 0 < f && (f *= a._info.width);
                        1 >= d && 0 < d && (d *= a._info.height);
                        r.resize(f, d) }),
                    r.once("complete", function() { g(!1, r.getAsDataUrl(q.type));
                        r.destroy() }), r.once("error", function(a) { g(a || !0);
                        r.destroy() }), b(r, a.source.size, function() { a._info && r.info(a._info);
                        a._meta && r.meta(a._meta);
                        r.loadFromBlob(a.source) })) : g(!0)
            },
            beforeSendFile: function(a) {
                var b = this.options.compress || this.options.resize,
                    f = b && b.compressSize || 0,
                    d = b && b.noCompressIfLarger || !1,
                    q, r;
                a = this.request("get-file", a);
                if (b && ~"image/jpeg,image/jpg".indexOf(a.type) && !(a.size < f) && !a._compressed) return b = c.extend({}, b), r = e.Deferred(),
                    q = new k(b), r.always(function() { q.destroy();
                        q = null }), q.once("error", r.reject), q.once("load", function() {
                        var d = b.width,
                            c = b.height;
                        a._info = a._info || q.info();
                        a._meta = a._meta || q.meta();
                        1 >= d && 0 < d && (d *= a._info.width);
                        1 >= c && 0 < c && (c *= a._info.height);
                        q.resize(d, c) }), q.once("complete", function() {
                        var c, f;
                        try { c = q.getAsBlob(b.type);
                            f = a.size;
                            if (!d || c.size < f) a.source = c, a.size = c.size, a.trigger("resize", c.size, f);
                            a._compressed = !0;
                            r.resolve() } catch (e) { r.resolve() } }), a._info && q.info(a._info), a._meta && q.meta(a._meta),
                    q.loadFromBlob(a.source), r.promise()
            }
        })
    });
    n("file", ["base", "mediator"], function(e, h) {
        function k(g) { this.name = g.name || "Untitled";
            this.size = g.size || 0;
            this.type = g.type || "application/octet-stream";
            this.lastModifiedDate = g.lastModifiedDate || 1 * new Date;
            this.id = "WU_FILE_" + c++;
            this.ext = b.exec(this.name) ? RegExp.$1 : "";
            this.statusText = "";
            a[this.id] = k.Status.INITED;
            this.source = g;
            this.loaded = 0;
            this.on("error", function(a) { this.setStatus(k.Status.ERROR, a) }) }
        var c = 0,
            b = /\.([^.]+)$/,
            a = {};
        e.$.extend(k.prototype, {
            setStatus: function(b,
                c) {
                var d = a[this.id]; "undefined" !== typeof c && (this.statusText = c);
                b !== d && (a[this.id] = b, this.trigger("statuschange", b, d)) },
            getStatus: function() {
                return a[this.id] },
            getSource: function() {
                return this.source },
            destroy: function() { this.off();
                delete a[this.id] }
        });
        h.installTo(k.prototype);
        k.Status = { INITED: "inited", QUEUED: "queued", PROGRESS: "progress", ERROR: "error", COMPLETE: "complete", CANCELLED: "cancelled", INTERRUPT: "interrupt", INVALID: "invalid" };
        return k
    });
    n("queue", ["base", "mediator", "file"], function(e, h, k) {
        function c() {
            this.stats = { numOfQueue: 0, numOfSuccess: 0, numOfCancel: 0, numOfProgress: 0, numOfUploadFailed: 0, numOfInvalid: 0, numofDeleted: 0, numofInterrupt: 0 };
            this._queue = [];
            this._map = {}
        }
        var b = e.$,
            a = k.Status;
        b.extend(c.prototype, {
            append: function(a) { this._queue.push(a);
                this._fileAdded(a);
                return this },
            prepend: function(a) { this._queue.unshift(a);
                this._fileAdded(a);
                return this },
            getFile: function(a) {
                return "string" !== typeof a ? a : this._map[a] },
            fetch: function(b) {
                var c = this._queue.length,
                    d, q;
                b = b || a.QUEUED;
                for (d = 0; d < c; d++)
                    if (q = this._queue[d],
                        b === q.getStatus()) return q;
                return null
            },
            sort: function(a) { "function" === typeof a && this._queue.sort(a) },
            getFiles: function() {
                for (var a = [].slice.call(arguments, 0), c = [], d = 0, q = this._queue.length, r; d < q; d++) r = this._queue[d], a.length && !~b.inArray(r.getStatus(), a) || c.push(r);
                return c },
            removeFile: function(a) { this._map[a.id] && (delete this._map[a.id], a.destroy(), this.stats.numofDeleted++) },
            _fileAdded: function(a) {
                var b = this;
                this._map[a.id] || (this._map[a.id] = a, a.on("statuschange", function(a, c) {
                    b._onFileStatusChange(a,
                        c)
                }))
            },
            _onFileStatusChange: function(b, c) {
                var d = this.stats;
                switch (c) {
                    case a.PROGRESS:
                        d.numOfProgress--;
                        break;
                    case a.QUEUED:
                        d.numOfQueue--;
                        break;
                    case a.ERROR:
                        d.numOfUploadFailed--;
                        break;
                    case a.INVALID:
                        d.numOfInvalid--;
                        break;
                    case a.INTERRUPT:
                        d.numofInterrupt-- }
                switch (b) {
                    case a.QUEUED:
                        d.numOfQueue++;
                        break;
                    case a.PROGRESS:
                        d.numOfProgress++;
                        break;
                    case a.ERROR:
                        d.numOfUploadFailed++;
                        break;
                    case a.COMPLETE:
                        d.numOfSuccess++;
                        break;
                    case a.CANCELLED:
                        d.numOfCancel++;
                        break;
                    case a.INVALID:
                        d.numOfInvalid++;
                        break;
                    case a.INTERRUPT:
                        d.numofInterrupt++ } }
        });
        h.installTo(c.prototype);
        return c
    });
    n("widgets/queue", "base uploader queue file lib/file runtime/client widgets/widget".split(" "), function(e, h, k, c, b, a) {
        var g = e.$,
            f = /\.\w+$/,
            d = c.Status;
        return h.register({
            name: "queue",
            init: function(b) {
                var d = this,
                    c, f, v, w, y, x, m;
                g.isPlainObject(b.accept) && (b.accept = [b.accept]);
                if (b.accept) { y = [];
                    v = 0;
                    for (f = b.accept.length; v < f; v++)(w = b.accept[v].extensions) && y.push(w);
                    y.length && (x = "\\." + y.join(",").replace(/,/g, "$|\\.").replace(/\*/g, ".*") + "$");
                    d.accept = new RegExp(x, "i") }
                d.queue =
                    new k;
                d.stats = d.queue.stats;
                if ("html5" === this.request("predict-runtime-type")) return c = e.Deferred(), this.placeholder = m = new a("Placeholder"), m.connectRuntime({ runtimeOrder: "html5" }, function() { d._ruid = m.getRuid();
                    c.resolve() }), c.promise()
            },
            _wrapFile: function(a) {
                if (!(a instanceof c)) {
                    if (!(a instanceof b)) {
                        if (!this._ruid) throw Error("Can't add external files.");
                        a = new b(this._ruid, a) }
                    a = new c(a) }
                return a },
            acceptFile: function(a) {
                return !(!a || !a.size || this.accept && f.exec(a.name) && !this.accept.test(a.name)) },
            _addFile: function(a) { a = this._wrapFile(a);
                if (this.owner.trigger("beforeFileQueued", a)) {
                    if (this.acceptFile(a)) return this.queue.append(a), this.owner.trigger("fileQueued", a), a;
                    this.owner.trigger("error", "Q_TYPE_DENIED", a) } },
            getFile: function(a) {
                return this.queue.getFile(a) },
            addFile: function(a) {
                var b = this;
                a.length || (a = [a]);
                a = g.map(a, function(a) {
                    return b._addFile(a) });
                b.owner.trigger("filesQueued", a);
                b.options.auto && setTimeout(function() { b.request("start-upload") }, 20) },
            getStats: function() {
                return this.stats },
            removeFile: function(a, b) { a = a.id ? a : this.queue.getFile(a);
                this.request("cancel-file", a);
                b && this.queue.removeFile(a) },
            getFiles: function() {
                return this.queue.getFiles.apply(this.queue, arguments) },
            fetchFile: function() {
                return this.queue.fetch.apply(this.queue, arguments) },
            retry: function(a, b) {
                var c, g, f;
                if (a) a = a.id ? a : this.queue.getFile(a), a.setStatus(d.QUEUED), b || this.request("start-upload");
                else { c = this.queue.getFiles(d.ERROR);
                    g = 0;
                    for (f = c.length; g < f; g++) a = c[g], a.setStatus(d.QUEUED);
                    this.request("start-upload") } },
            sortFiles: function() {
                return this.queue.sort.apply(this.queue, arguments) },
            reset: function() { this.owner.trigger("reset");
                this.queue = new k;
                this.stats = this.queue.stats },
            destroy: function() { this.reset();
                this.placeholder && this.placeholder.destroy() }
        })
    });
    n("widgets/runtime", ["uploader", "runtime/runtime", "widgets/widget"], function(e, h) {
        e.support = function() {
            return h.hasRuntime.apply(h, arguments) };
        return e.register({
            name: "runtime",
            init: function() {
                if (!this.predictRuntimeType()) throw Error("Runtime Error"); },
            predictRuntimeType: function() {
                var e =
                    this.options.runtimeOrder || h.orders,
                    c = this.type,
                    b, a;
                if (!c)
                    for (e = e.split(/\s*,\s*/g), b = 0, a = e.length; b < a; b++)
                        if (h.hasRuntime(e[b])) { this.type = c = e[b];
                            break }
                return c
            }
        })
    });
    n("lib/transport", ["base", "runtime/client", "mediator"], function(e, h, k) {
        function c(a) {
            var g = this;
            a = g.options = b.extend(!0, {}, c.options, a || {});
            h.call(this, "Transport");
            this._blob = null;
            this._formData = a.formData || {};
            this._headers = a.headers || {};
            this.on("progress", this._timeout);
            this.on("load error", function() { g.trigger("progress", 1);
                clearTimeout(g._timer) }) }
        var b = e.$;
        c.options = { server: "", method: "POST", withCredentials: !1, fileVal: "file", timeout: 12E4, formData: {}, headers: {}, sendAsBinary: !1 };
        b.extend(c.prototype, {
            appendBlob: function(a, b, c) {
                var d = this,
                    q = d.options;
                d.getRuid() && d.disconnectRuntime();
                d.connectRuntime(b.ruid, function() { d.exec("init") });
                d._blob = b;
                q.fileVal = a || q.fileVal;
                q.filename = c || q.filename },
            append: function(a, c) { "object" === typeof a ? b.extend(this._formData, a) : this._formData[a] = c },
            setRequestHeader: function(a, c) {
                "object" === typeof a ? b.extend(this._headers,
                    a) : this._headers[a] = c
            },
            send: function(a) { this.exec("send", a);
                this._timeout() },
            abort: function() { clearTimeout(this._timer);
                return this.exec("abort") },
            destroy: function() { this.trigger("destroy");
                this.off();
                this.exec("destroy");
                this.disconnectRuntime() },
            getResponse: function() {
                return this.exec("getResponse") },
            getResponseAsJson: function() {
                return this.exec("getResponseAsJson") },
            getStatus: function() {
                return this.exec("getStatus") },
            _timeout: function() {
                var a = this,
                    b = a.options.timeout;
                b && (clearTimeout(a._timer),
                    a._timer = setTimeout(function() { a.abort();
                        a.trigger("error", "timeout") }, b))
            }
        });
        k.installTo(c.prototype);
        return c
    });
    n("widgets/upload", ["base", "uploader", "file", "lib/transport", "widgets/widget"], function(e, h, k, c) {
        function b(a, b) {
            var c = [],
                g = a.source.size,
                f = b ? Math.ceil(g / b) : 1,
                e = 0,
                k = 0,
                y, x;
            for (x = { file: a, has: function() {
                        return !!c.length }, shift: function() {
                        return c.shift() }, unshift: function(a) { c.unshift(a) } }; k < f;) y = Math.min(b, g - e), c.push({ file: a, start: e, end: b ? e + y : g, total: g, chunks: f, chunk: k++, cuted: x }), e += y;
            a.blocks = c.concat();
            a.remaning = c.length;
            return x
        }
        var a = e.$,
            g = e.isPromise,
            f = k.Status;
        a.extend(h.options, {
            prepareNextFile: !1,
            chunked: !1,
            chunkSize: 5242880,
            chunkRetry: 2,
            threads: 3,
            formData: {},
            extension: { debug: !0 },
            callback: {
                getContextIdByMd5: function(b) {
                    var c = a.Deferred();
                    c.resolve(a.cookie(b));
                    return c.promise() },
                storeFileInfo: function(b) { a.cookie(b.md5, b.contextId, { expires: 7 }) },
                fetchFileInfo: function(b) {
                    var c = a.Deferred();
                    b.contextId = a.cookie(b.md5);
                    c.resolve();
                    return c.promise() },
                delFileInfo: function(b) {
                    a.cookie(b.md5,
                        null, { expires: -1 })
                }
            }
        });
        h.register({
            name: "upload",
            init: function() {
                var b = this.owner,
                    c = this;
                this.progress = this.runing = !1;
                b.on("startUpload", function() { c.progress = !0 }).on("uploadFinished", function() { c.progress = !1 }).on("uploadBeforeSend", function(a, b) {
                    a.file.exists || (b.appKey = this.options.extension.appName, b.chunk = a.chunk, b.expires = a.file.chunkToken[a.chunk].expires, b.token = a.file.chunkToken[a.chunk].token, b.contextId = a.file.chunkToken[a.chunk].contextId, delete b.chunks, delete b.lastModifiedDate, delete b.id,
                        delete b.name, delete b.type, delete b.size)
                }).on("uploadSuccess", function(b, d) {
                    b.deferred = a.Deferred();
                    var c = this;
                    a.crossDomainAjax(c.options.extension.server + "/v2/files/complete", "POST", b.completeToken).done(function(a) { "undefined" != typeof d && (d.url = a.url);
                        c.options.callback.delFileInfo(b);
                        b.deferred.resolve() }).fail(function(a) {
                        b.failed = !0;
                        c.skipFile(b, "error");
                        c.trigger("uploadError", b, "\u5408\u5e76\u5206\u7247\u65f6\u53d1\u751f\u9519\u8bef\uff1b\u670d\u52a1\u7aef\u8fd4\u56de\u4fe1\u606f\uff1a" +
                            JSON.stringify(a))
                    })
                });
                this.pool = [];
                this.stack = [];
                this.pending = [];
                this.remaning = 0;
                this.__tick = e.bindFn(this._tick, this);
                b.on("uploadComplete", function(b) { b.blocks && a.each(b.blocks, function(a, b) { b.transport && (b.transport.abort(), b.transport.destroy());
                        delete b.transport });
                    delete b.blocks;
                    delete b.remaning })
            },
            reset: function() { this.request("stop-upload", !0);
                this.runing = !1;
                this.pool = [];
                this.stack = [];
                this.pending = [];
                this.remaning = 0;
                this._trigged = !1;
                this._promise = null },
            startUpload: function(b) {
                var c = this;
                a.each(c.request("get-files", f.INVALID), function() { c.request("remove-file", this) });
                if (b) { b = b.id ? b : c.request("get-file", b);
                    if (b.getStatus() === f.INTERRUPT) a.each(c.pool, function(a, c) { c.file === b && c.transport && c.transport.send() });
                    else if (b.getStatus() === f.PROGRESS) return;
                    b.setStatus(f.QUEUED) } else a.each(c.request("get-files", [f.INITED]), function() { this.setStatus(f.QUEUED) });
                if (!c.runing) {
                    c.runing = !0;
                    var g = [];
                    for (a.each(c.pool, function(a, b) {
                            var d = b.file;
                            d.getStatus() === f.INTERRUPT && (g.push(d), c._trigged = !1, b.transport && b.transport.send())
                        }); b = g.shift();) b.setStatus(f.PROGRESS);
                    b || a.each(c.request("get-files", f.INTERRUPT), function() { this.setStatus(f.PROGRESS) });
                    c._trigged = !1;
                    e.nextTick(c.__tick);
                    c.owner.trigger("startUpload")
                }
            },
            stopUpload: function(b, c) {
                var g = this;
                !0 === b && (c = b, b = null);
                if (!1 !== g.runing) {
                    if (b) {
                        b = b.id ? b : g.request("get-file", b);
                        if (b.getStatus() !== f.PROGRESS && b.getStatus() !== f.QUEUED) return;
                        b.setStatus(f.INTERRUPT);
                        a.each(g.pool, function(a, c) {
                            c.file === b && (c.transport && c.transport.abort(),
                                g._putback(c), g._popBlock(c))
                        });
                        return e.nextTick(g.__tick)
                    }
                    g.runing = !1;
                    this._promise && this._promise.file && this._promise.file.setStatus(f.INTERRUPT);
                    c && a.each(g.pool, function(a, b) { b.transport && b.transport.abort();
                        b.file.setStatus(f.INTERRUPT) });
                    g.owner.trigger("stopUpload")
                }
            },
            cancelFile: function(b) {
                b = b.id ? b : this.request("get-file", b);
                b.blocks && a.each(b.blocks, function(a, b) {
                    var c = b.transport;
                    c && (c.abort(), c.destroy(), delete b.transport) });
                b.setStatus(f.CANCELLED);
                this.owner.trigger("fileDequeued",
                    b)
            },
            isInProgress: function() {
                return !!this.progress },
            _getStats: function() {
                return this.request("get-stats") },
            skipFile: function(b, c) { b = b.id ? b : this.request("get-file", b);
                b.setStatus(c || f.COMPLETE);
                b.skipped = !0;
                b.blocks && a.each(b.blocks, function(a, b) {
                    var c = b.transport;
                    c && (c.abort(), c.destroy(), delete b.transport) });
                this.owner.trigger("uploadSkip", b) },
            _tick: function() {
                var a = this,
                    b = a.options,
                    c;
                if (a._promise) return a._promise.always(a.__tick);
                a.pool.length < b.threads && (c = a._nextBlock()) ? (a._trigged = !1, b = function(b) {
                    a._promise =
                        null;
                    b && b.file && a._startSend(b);
                    e.nextTick(a.__tick)
                }, a._promise = g(c) ? c.always(b) : b(c)) : a.remaning || a._getStats().numOfQueue || a._getStats().numofInterrupt || (a.runing = !1, a._trigged || e.nextTick(function() { a.owner.trigger("uploadFinished") }), a._trigged = !0)
            },
            _putback: function(a) { a.cuted.unshift(a);~this.stack.indexOf(a.cuted) || this.stack.unshift(a.cuted) },
            _getStack: function() {
                for (var a = 0, b; b = this.stack[a++];) {
                    if (b.has() && b.file.getStatus() === f.PROGRESS) return b;
                    (!b.has() || b.file.getStatus() !== f.PROGRESS &&
                        b.file.getStatus() !== f.INTERRUPT) && this.stack.splice(--a, 1)
                }
                return null
            },
            _nextBlock: function() {
                var a = this,
                    c = a.options,
                    f, e, k, v;
                if (f = this._getStack()) return c.prepareNextFile && !a.pending.length && a._prepareNextFile(), f.shift();
                if (a.runing) return !a.pending.length && a._getStats().numOfQueue && a._prepareNextFile(), e = a.pending.shift(), k = function(g) {
                    if (!g) return null;
                    f = b(g, c.chunked ? c.chunkSize : 0);
                    a.stack.push(f);
                    return f.shift() }, g(e) ? (v = e.file, e = e[e.pipe ? "pipe" : "then"](k), e.file = v, e) : k(e) },
            _prepareNextFile: function() {
                var b =
                    this,
                    c = b.request("fetch-file"),
                    g = b.pending,
                    e;
                c && (e = b.request("before-send-file", c, function() {
                    return c.getStatus() === f.PROGRESS || c.getStatus() === f.INTERRUPT ? c : b._finishFile(c) }), b.owner.trigger("uploadStart", c), c.setStatus(f.PROGRESS), e.file = c, e.done(function() {
                    var b = a.inArray(e, g);~b && g.splice(b, 1, c) }), e.fail(function(a) { c.setStatus(f.ERROR, a);
                    b.owner.trigger("uploadError", c, a);
                    b.owner.trigger("uploadComplete", c) }), g.push(e))
            },
            _popBlock: function(b) {
                var c = a.inArray(b, this.pool);
                this.pool.splice(c,
                    1);
                b.file.remaning--;
                this.remaning--
            },
            _startSend: function(a) {
                var b = this,
                    c = a.file,
                    g;
                c.getStatus() !== f.PROGRESS ? c.getStatus() === f.INTERRUPT && b._putback(a) : (b.pool.push(a), b.remaning++, a.blob = 1 === a.chunks ? c.source : c.source.slice(a.start, a.end), g = b.request("before-send", a, function() { c.getStatus() === f.PROGRESS ? b._doSend(a) : (b._popBlock(a), e.nextTick(b.__tick)) }), g.fail(function() {
                    1 === c.remaning ? b._finishFile(c).always(function() { a.percentage = 1;
                            b._popBlock(a);
                            b.owner.trigger("uploadComplete", c);
                            e.nextTick(b.__tick) }) :
                        (a.percentage = 1, b.updateFileProgress(c), b._popBlock(a), e.nextTick(b.__tick))
                }))
            },
            _doSend: function(b) {
                var g = this,
                    k = g.owner,
                    h = g.options,
                    t = b.file,
                    v = new c(h),
                    w = a.extend({}, h.formData),
                    y = a.extend({}, h.headers),
                    x, m;
                b.transport = v;
                v.on("destroy", function() { delete b.transport;
                    g._popBlock(b);
                    e.nextTick(g.__tick) });
                v.on("progress", function(a) { b.percentage = a;
                    g.updateFileProgress(t) });
                x = function(a) {
                    m = v.getResponseAsJson() || {};
                    m._raw = v.getResponse();
                    k.trigger("uploadAccept", b, m, function(b) { a = b }) || (a = a || "server");
                    return a
                };
                v.on("error", function(a, c) { b.retried = b.retried || 0;
                    1 < b.chunks && ~"http,abort".indexOf(a) && b.retried < h.chunkRetry ? (b.retried++, v.send()) : (c || "server" !== a || (a = x(a)), t.setStatus(f.ERROR, a), k.trigger("uploadError", t, a), k.trigger("uploadComplete", t)) });
                v.on("load", function() {
                    var a;
                    (a = x()) ? v.trigger("error", a, !0): 1 === t.remaning ? g._finishFile(t, m) : v.destroy() });
                w = a.extend(w, { id: t.id, name: t.name, type: t.type, lastModifiedDate: t.lastModifiedDate, size: t.size });
                1 < b.chunks && a.extend(w, {
                    chunks: b.chunks,
                    chunk: b.chunk
                });
                k.trigger("uploadBeforeSend", b, w, y);
                v.appendBlob(h.fileVal, b.blob, t.name);
                v.append(w);
                v.setRequestHeader(y);
                v.send()
            },
            _finishFile: function(a, b, c) {
                var g = this.owner;
                return g.request("after-send-file", arguments, function() { a.setStatus(f.COMPLETE);
                    g.trigger("uploadSuccess", a, b, c) }).fail(function(b) { a.getStatus() === f.PROGRESS && a.setStatus(f.ERROR, b);
                    g.trigger("uploadError", a, b) }).always(function() { g.trigger("uploadComplete", a) }) },
            updateFileProgress: function(b) {
                var c = 0,
                    g = 0;
                b.blocks && (a.each(b.blocks,
                    function(a, b) { g += (b.percentage || 0) * (b.end - b.start) }), c = g / b.size, this.owner.trigger("uploadProgress", b, c || 0))
            }
        })
    });
    n("widgets/validator", ["base", "uploader", "file", "widgets/widget"], function(e, h, k) {
        var c = e.$,
            b = {},
            a;
        a = { addValidator: function(a, c) { b[a] = c }, removeValidator: function(a) { delete b[a] } };
        h.register({ name: "validator", init: function() {
                var a = this;
                e.nextTick(function() { c.each(b, function() { this.call(a.owner) }) }) } });
        a.addValidator("fileNumLimit", function() {
            var a = 0,
                b = parseInt(this.options.fileNumLimit,
                    10),
                c = !0;
            b && (this.on("beforeFileQueued", function(e) { a >= b && c && (c = !1, this.trigger("error", "Q_EXCEED_NUM_LIMIT", b, e), setTimeout(function() { c = !0 }, 1));
                return a >= b ? !1 : !0 }), this.on("fileQueued", function() { a++ }), this.on("fileDequeued", function() { a-- }), this.on("reset", function() { a = 0 }))
        });
        a.addValidator("fileSizeLimit", function() {
            var a = 0,
                b = parseInt(this.options.fileSizeLimit, 10),
                c = !0;
            b && (this.on("beforeFileQueued", function(e) {
                var k = a + e.size > b;
                k && c && (c = !1, this.trigger("error", "Q_EXCEED_SIZE_LIMIT", b, e), setTimeout(function() {
                    c = !0
                }, 1));
                return k ? !1 : !0
            }), this.on("fileQueued", function(b) { a += b.size }), this.on("fileDequeued", function(b) { a -= b.size }), this.on("reset", function() { a = 0 }))
        });
        a.addValidator("fileSingleSizeLimit", function() {
            var a = this.options.fileSingleSizeLimit;
            if (a) this.on("beforeFileQueued", function(b) {
                if (b.size > a) return b.setStatus(k.Status.INVALID, "exceed_size"), this.trigger("error", "F_EXCEED_SIZE", a, b), !1 }) });
        a.addValidator("duplicate", function() {
            var a = {};
            this.options.duplicate || (this.on("beforeFileQueued", function(b) {
                var c;
                if (!(c = b.__hash)) { c = b.name + b.size + b.lastModifiedDate;
                    for (var e = 0, k = 0, h = c.length, t; k < h; k++) t = c.charCodeAt(k), e = t + (e << 6) + (e << 16) - e;
                    c = b.__hash = e }
                if (a[c]) return this.trigger("error", "\u6587\u4ef6\u5df2\u5b58\u5728\u4e8e\u5217\u8868\u4e2d", b), !1
            }), this.on("fileQueued", function(b) {
                (b = b.__hash) && (a[b] = !0) }), this.on("fileDequeued", function(b) {
                (b = b.__hash) && delete a[b] }), this.on("reset", function() { a = {} }))
        });
        return a
    });
    n("lib/md5", ["runtime/client", "mediator"], function(e, h) {
        function k() { e.call(this, "Md5") }
        h.installTo(k.prototype);
        k.prototype.loadFromBlob = function(c) {
            var b = this;
            b.getRuid() && b.disconnectRuntime();
            b.connectRuntime(c.ruid, function() { b.exec("init");
                b.exec("loadFromBlob", c) }) };
        k.prototype.getResult = function() {
            return this.exec("getResult") };
        return k
    });
    n("widgets/md5", ["base", "uploader", "lib/md5", "lib/blob", "widgets/widget"], function(e, h, k, c) {
        return h.register({
            name: "md5",
            md5File: function(b, a, g) {
                var f = new k,
                    d = e.Deferred(),
                    h = b instanceof c ? b : this.request("get-file", b).source;
                f.on("progress load",
                    function(a) { a = a || {};
                        d.notify(a.total ? a.loaded / a.total : 1) });
                f.on("complete", function() { d.resolve(f.getResult()) });
                f.on("error", function(a) { d.reject(a) });
                1 < arguments.length && (a = a || 0, g = g || 0, 0 > a && (a = h.size + a), 0 > g && (g = h.size + g), g = Math.min(g, h.size), h = h.slice(a, g));
                f.loadFromBlob(h);
                return d.promise()
            }
        })
    });
    n("runtime/compbase", [], function() {
        return function(e, h) {
            this.owner = e;
            this.options = e.options;
            this.getRuntime = function() {
                return h };
            this.getRuid = function() {
                return h.uid };
            this.trigger = function() {
                return e.trigger.apply(e,
                    arguments)
            }
        }
    });
    n("runtime/html5/runtime", ["base", "runtime/runtime", "runtime/compbase"], function(e, h, k) {
        function c() {
            var a = {},
                c = this,
                f = this.destroy;
            h.apply(c, arguments);
            c.type = "html5";
            c.exec = function(d, f) {
                var k = this.uid,
                    h = e.slice(arguments, 2);
                if (b[d] && (k = a[k] = a[k] || new b[d](this, c), k[f])) return k[f].apply(k, h) };
            c.destroy = function() {
                return f && f.apply(this, arguments) } }
        var b = {};
        e.inherits(h, { constructor: c, init: function() {
                var a = this;
                setTimeout(function() { a.trigger("ready") }, 1) } });
        c.register = function(a,
            c) {
            return b[a] = e.inherits(k, c) };
        l.Blob && l.FileReader && l.DataView && h.addRuntime("html5", c);
        return c
    });
    n("runtime/html5/blob", ["runtime/html5/runtime", "lib/blob"], function(e, h) {
        return e.register("Blob", { slice: function(e, c) {
                var b = this.owner.source,
                    b = (b.slice || b.webkitSlice || b.mozSlice).call(b, e, c);
                return new h(this.getRuid(), b) } }) });
    n("runtime/html5/dnd", ["base", "runtime/html5/runtime", "lib/file"], function(e, h, k) {
        var c = e.$;
        return h.register("DragAndDrop", {
            init: function() {
                var b = this.elem = this.options.container;
                this.dragEnterHandler = e.bindFn(this._dragEnterHandler, this);
                this.dragOverHandler = e.bindFn(this._dragOverHandler, this);
                this.dragLeaveHandler = e.bindFn(this._dragLeaveHandler, this);
                this.dropHandler = e.bindFn(this._dropHandler, this);
                this.dndOver = !1;
                b.on("dragenter", this.dragEnterHandler);
                b.on("dragover", this.dragOverHandler);
                b.on("dragleave", this.dragLeaveHandler);
                b.on("drop", this.dropHandler);
                this.options.disableGlobalDnd && (c(document).on("dragover", this.dragOverHandler), c(document).on("drop", this.dropHandler))
            },
            _dragEnterHandler: function(b) {
                var a = this._denied || !1,
                    c;
                b = b.originalEvent || b;
                this.dndOver || (this.dndOver = !0, (c = b.dataTransfer.items) && c.length && (this._denied = a = !this.trigger("accept", c)), this.elem.addClass("webuploader-dnd-over"), this.elem[a ? "addClass" : "removeClass"]("webuploader-dnd-denied"));
                b.dataTransfer.dropEffect = a ? "none" : "copy";
                return !1 },
            _dragOverHandler: function(b) {
                var a = this.elem.parent().get(0);
                if (a && !c.contains(a, b.currentTarget)) return !1;
                clearTimeout(this._leaveTimer);
                this._dragEnterHandler.call(this,
                    b);
                return !1
            },
            _dragLeaveHandler: function() {
                var b = this;
                clearTimeout(b._leaveTimer);
                b._leaveTimer = setTimeout(function() { b.dndOver = !1;
                    b.elem.removeClass("webuploader-dnd-over webuploader-dnd-denied") }, 100);
                return !1 },
            _dropHandler: function(b) {
                var a = this,
                    g = a.getRuid(),
                    f = a.elem.parent().get(0),
                    d;
                if (f && !c.contains(f, b.currentTarget)) return !1;
                b = b.originalEvent || b;
                b = b.dataTransfer;
                try { d = b.getData("text/html") } catch (e) {}
                a.dndOver = !1;
                a.elem.removeClass("webuploader-dnd-over");
                if (!d) return a._getTansferFiles(b,
                    function(b) { a.trigger("drop", c.map(b, function(a) {
                            return new k(g, a) })) }), !1
            },
            _getTansferFiles: function(b, a) {
                var c = [],
                    f = [],
                    d, k, h, n, t, v, w;
                d = b.items;
                k = b.files;
                w = !(!d || !d[0].webkitGetAsEntry);
                t = 0;
                for (v = k.length; t < v; t++) h = k[t], n = d && d[t], w && n.webkitGetAsEntry().isDirectory ? f.push(this._traverseDirectoryTree(n.webkitGetAsEntry(), c)) : c.push(h);
                e.when.apply(e, f).done(function() { c.length && a(c) }) },
            _traverseDirectoryTree: function(b, a) {
                var c = e.Deferred(),
                    f = this;
                b.isFile ? b.file(function(b) { a.push(b);
                        c.resolve() }) :
                    b.isDirectory && b.createReader().readEntries(function(b) {
                        var k = b.length,
                            h = [],
                            n = [],
                            t;
                        for (t = 0; t < k; t++) h.push(f._traverseDirectoryTree(b[t], n));
                        e.when.apply(e, h).then(function() { a.push.apply(a, n);
                            c.resolve() }, c.reject) });
                return c.promise()
            },
            destroy: function() {
                var b = this.elem;
                b && (b.off("dragenter", this.dragEnterHandler), b.off("dragover", this.dragOverHandler), b.off("dragleave", this.dragLeaveHandler), b.off("drop", this.dropHandler), this.options.disableGlobalDnd && (c(document).off("dragover", this.dragOverHandler),
                    c(document).off("drop", this.dropHandler)))
            }
        })
    });
    n("runtime/html5/filepaste", ["base", "runtime/html5/runtime", "lib/file"], function(e, h, k) {
        return h.register("FilePaste", {
            init: function() {
                var c = this.options,
                    b = this.elem = c.container,
                    a = ".*",
                    g, f, d, k;
                if (c.accept) { g = [];
                    f = 0;
                    for (d = c.accept.length; f < d; f++)(k = c.accept[f].mimeTypes) && g.push(k);
                    g.length && (a = g.join(","), a = a.replace(/,/g, "|").replace(/\*/g, ".*")) }
                this.accept = new RegExp(a, "i");
                this.hander = e.bindFn(this._pasteHander, this);
                b.on("paste", this.hander) },
            _pasteHander: function(c) {
                var b = [],
                    a = this.getRuid(),
                    g, f, d, e, h;
                c = c.originalEvent || c;
                g = c.clipboardData.items;
                e = 0;
                for (h = g.length; e < h; e++) f = g[e], "file" === f.kind && (d = f.getAsFile()) && b.push(new k(a, d));
                b.length && (c.preventDefault(), c.stopPropagation(), this.trigger("paste", b))
            },
            destroy: function() { this.elem.off("paste", this.hander) }
        })
    });
    n("runtime/html5/filepicker", ["base", "runtime/html5/runtime"], function(e, h) {
        var k = e.$;
        return h.register("FilePicker", {
            init: function() {
                var c = this.getRuntime().getContainer(),
                    b = this,
                    a = b.owner,
                    g = b.options,
                    f = this.label = k(document.createElement("label")),
                    d = this.input = k(document.createElement("input")),
                    e, h, n, t;
                d.attr("type", "file");
                d.attr("name", g.name);
                d.addClass("webuploader-element-invisible");
                f.on("click", function() { d.trigger("click") });
                f.css({ opacity: 0, width: "100%", height: "100%", display: "block", cursor: "pointer", background: "#ffffff" });
                g.multiple && d.attr("multiple", "multiple");
                if (g.accept && 0 < g.accept.length) { e = [];
                    h = 0;
                    for (n = g.accept.length; h < n; h++) e.push(g.accept[h].mimeTypes);
                    d.attr("accept", e.join(",")) }
                c.append(d);
                c.append(f);
                t = function(b) { a.trigger(b.type) };
                d.on("change", function(c) {
                    var g = arguments.callee,
                        f;
                    b.files = c.target.files;
                    f = this.cloneNode(!0);
                    f.value = null;
                    this.parentNode.replaceChild(f, this);
                    d.off();
                    d = k(f).on("change", g).on("mouseenter mouseleave", t);
                    a.trigger("change") });
                f.on("mouseenter mouseleave", t)
            },
            getFiles: function() {
                return this.files },
            destroy: function() { this.input.off();
                this.label.off() }
        })
    });
    n("runtime/html5/util", ["base"], function(e) {
        var h = l.createObjectURL && l || l.URL && URL.revokeObjectURL &&
            URL || l.webkitURL,
            k = e = e.noop;
        h && (e = function() {
            return h.createObjectURL.apply(h, arguments) }, k = function() {
            return h.revokeObjectURL.apply(h, arguments) });
        return {
            createObjectURL: e,
            revokeObjectURL: k,
            dataURL2Blob: function(c) {
                var b, a, g, f;
                f = c.split(",");
                b = ~f[0].indexOf("base64") ? atob(f[1]) : decodeURIComponent(f[1]);
                c = new ArrayBuffer(b.length);
                a = new Uint8Array(c);
                for (g = 0; g < b.length; g++) a[g] = b.charCodeAt(g);
                b = f[0].split(":")[1].split(";")[0];
                return this.arrayBufferToBlob(c, b) },
            dataURL2ArrayBuffer: function(c) {
                var b,
                    a;
                c = c.split(",");
                c = ~c[0].indexOf("base64") ? atob(c[1]) : decodeURIComponent(c[1]);
                b = new Uint8Array(c.length);
                for (a = 0; a < c.length; a++) b[a] = c.charCodeAt(a);
                return b.buffer
            },
            arrayBufferToBlob: function(c, b) {
                var a = l.BlobBuilder || l.WebKitBlobBuilder;
                return a ? (a = new a, a.append(c), a.getBlob(b)) : new Blob([c], b ? { type: b } : {}) },
            canvasToDataUrl: function(c, b, a) {
                return c.toDataURL(b, a / 100) },
            parseMeta: function(c, b) { b(!1, {}) },
            updateImageHead: function(c) {
                return c }
        }
    });
    n("runtime/html5/imagemeta", ["runtime/html5/util"], function(e) {
        var h;
        h = {
            parsers: { 65505: [] },
            maxMetaDataSize: 262144,
            parse: function(e, c) {
                var b = this,
                    a = new FileReader;
                a.onload = function() { c(!1, b._parse(this.result));
                    a = a.onload = a.onerror = null };
                a.onerror = function(b) { c(b.message);
                    a = a.onload = a.onerror = null };
                e = e.slice(0, b.maxMetaDataSize);
                a.readAsArrayBuffer(e.getSource()) },
            _parse: function(e, c) {
                if (!(6 > e.byteLength)) {
                    var b = new DataView(e),
                        a = 2,
                        g = b.byteLength - 4,
                        f = a,
                        d = {},
                        q, r;
                    if (65496 === b.getUint16(0)) {
                        for (; a < g;)
                            if (q = b.getUint16(a), 65504 <= q && 65519 >= q || 65534 === q) {
                                r = b.getUint16(a + 2) +
                                    2;
                                if (a + r > b.byteLength) break;
                                f = h.parsers[q];
                                if (!c && f)
                                    for (q = 0; q < f.length; q += 1) f[q].call(h, b, a, r, d);
                                f = a += r
                            } else break;
                        6 < f && (d.imageHead = e.slice ? e.slice(2, f) : (new Uint8Array(e)).subarray(2, f))
                    }
                    return d
                }
            },
            updateImageHead: function(e, c) {
                var b = this._parse(e, !0),
                    a;
                a = 2;
                b.imageHead && (a = 2 + b.imageHead.byteLength);
                a = e.slice ? e.slice(a) : (new Uint8Array(e)).subarray(a);
                b = new Uint8Array(c.byteLength + 2 + a.byteLength);
                b[0] = 255;
                b[1] = 216;
                b.set(new Uint8Array(c), 2);
                b.set(new Uint8Array(a), c.byteLength + 2);
                return b.buffer }
        };
        e.parseMeta = function() {
            return h.parse.apply(h, arguments) };
        e.updateImageHead = function() {
            return h.updateImageHead.apply(h, arguments) };
        return h
    });
    n("runtime/html5/imagemeta/exif", ["base", "runtime/html5/imagemeta"], function(e, h) {
        var k = { ExifMap: function() {
                return this } };
        k.ExifMap.prototype.map = { Orientation: 274 };
        k.ExifMap.prototype.get = function(c) {
            return this[c] || this[this.map[c]] };
        k.exifTagTypes = {
            1: { getValue: function(c, b) {
                    return c.getUint8(b) }, size: 1 },
            2: {
                getValue: function(c, b) {
                    return String.fromCharCode(c.getUint8(b)) },
                size: 1,
                ascii: !0
            },
            3: { getValue: function(c, b, a) {
                    return c.getUint16(b, a) }, size: 2 },
            4: { getValue: function(c, b, a) {
                    return c.getUint32(b, a) }, size: 4 },
            5: { getValue: function(c, b, a) {
                    return c.getUint32(b, a) / c.getUint32(b + 4, a) }, size: 8 },
            9: { getValue: function(c, b, a) {
                    return c.getInt32(b, a) }, size: 4 },
            10: { getValue: function(c, b, a) {
                    return c.getInt32(b, a) / c.getInt32(b + 4, a) }, size: 8 }
        };
        k.exifTagTypes[7] = k.exifTagTypes[1];
        k.getExifValue = function(c, b, a, g, f, d) {
            g = k.exifTagTypes[g];
            var h, r;
            if (g)
                if (h = g.size * f, r = 4 < h ? b + c.getUint32(a +
                        8, d) : a + 8, r + h > c.byteLength) e.log("Invalid Exif data: Invalid data offset.");
                else {
                    if (1 === f) return g.getValue(c, r, d);
                    b = [];
                    for (a = 0; a < f; a += 1) b[a] = g.getValue(c, r + a * g.size, d);
                    if (g.ascii) { c = "";
                        for (a = 0; a < b.length; a += 1) { f = b[a];
                            if ("\x00" === f) break;
                            c += f }
                        return c }
                    return b }
            else e.log("Invalid Exif data: Invalid tag type.")
        };
        k.parseExifTag = function(c, b, a, g, f) {
            var d = c.getUint16(a, g);
            f.exif[d] = k.getExifValue(c, b, a, c.getUint16(a + 2, g), c.getUint32(a + 4, g), g) };
        k.parseExifTags = function(c, b, a, g, f) {
            var d, k, h;
            if (a + 6 > c.byteLength) e.log("Invalid Exif data: Invalid directory offset.");
            else if (d = c.getUint16(a, g), k = a + 2 + 12 * d, k + 4 > c.byteLength) e.log("Invalid Exif data: Invalid directory size.");
            else {
                for (h = 0; h < d; h += 1) this.parseExifTag(c, b, a + 2 + 12 * h, g, f);
                return c.getUint32(k, g) }
        };
        k.parseExifData = function(c, b, a, g) {
            a = b + 10;
            var f;
            if (1165519206 === c.getUint32(b + 4))
                if (a + 8 > c.byteLength) e.log("Invalid Exif data: Invalid segment size.");
                else if (0 !== c.getUint16(b + 8)) e.log("Invalid Exif data: Missing byte alignment offset.");
            else {
                switch (c.getUint16(a)) {
                    case 18761:
                        b = !0;
                        break;
                    case 19789:
                        b = !1;
                        break;
                    default:
                        e.log("Invalid Exif data: Invalid byte alignment marker.");
                        return
                }
                42 !== c.getUint16(a + 2, b) ? e.log("Invalid Exif data: Missing TIFF marker.") : (f = c.getUint32(a + 4, b), g.exif = new k.ExifMap, k.parseExifTags(c, a, a + f, b, g))
            }
        };
        h.parsers[65505].push(k.parseExifData);
        return k
    });
    n("runtime/html5/jpegencoder", [], function(e, h, k) {
        function c(b) {
            function a(a, b) {
                for (var c = 0, g = 0, d = [], f = 1; 16 >= f; f++) {
                    for (var e = 1; e <= a[f]; e++) d[b[g]] = [], d[b[g]][0] = c, d[b[g]][1] = f, g++, c++;
                    c *= 2 }
                return d }

            function c(a) {
                var b = a[0];
                for (a =
                    a[1] - 1; 0 <= a;) b & 1 << a && (K |= 1 << E), a--, E--, 0 > E && (255 == K ? (f(255), f(0)) : f(K), E = 7, K = 0)
            }

            function f(a) { M.push(O[a]) }

            function d(a) { f(a >> 8 & 255);
                f(a & 255) }

            function e(a, b, d, f, k) {
                var y = k[0],
                    h = k[240],
                    w, x, v, m, p, q, r, n, t, l = 0;
                for (w = 0; 8 > w; ++w) {
                    x = a[l];
                    v = a[l + 1];
                    m = a[l + 2];
                    p = a[l + 3];
                    q = a[l + 4];
                    r = a[l + 5];
                    n = a[l + 6];
                    t = a[l + 7];
                    var z = x + t;
                    x -= t;
                    t = v + n;
                    v -= n;
                    n = m + r;
                    m -= r;
                    r = p + q;
                    p -= q;
                    q = z + r;
                    z -= r;
                    r = t + n;
                    t -= n;
                    a[l] = q + r;
                    a[l + 4] = q - r;
                    q = .707106781 * (t + z);
                    a[l + 2] = z + q;
                    a[l + 6] = z - q;
                    q = p + m;
                    r = m + v;
                    t = v + x;
                    m = .382683433 * (q - t);
                    p = .5411961 * q + m;
                    q = 1.306562965 * t + m;
                    r *= .707106781;
                    m = x + r;
                    x -= r;
                    a[l + 5] = x + p;
                    a[l + 3] = x - p;
                    a[l + 1] = m + q;
                    a[l + 7] = m - q;
                    l += 8
                }
                for (w = l = 0; 8 > w; ++w) x = a[l], v = a[l + 8], m = a[l + 16], p = a[l + 24], q = a[l + 32], r = a[l + 40], n = a[l + 48], t = a[l + 56], z = x + t, x -= t, t = v + n, v -= n, n = m + r, m -= r, r = p + q, p -= q, q = z + r, z -= r, r = t + n, t -= n, a[l] = q + r, a[l + 32] = q - r, q = .707106781 * (t + z), a[l + 16] = z + q, a[l + 48] = z - q, q = p + m, r = m + v, t = v + x, m = .382683433 * (q - t), p = .5411961 * q + m, q = 1.306562965 * t + m, r *= .707106781, m = x + r, x -= r, a[l + 40] = x + p, a[l + 24] = x - p, a[l + 8] = m + q, a[l + 56] = m - q, l++;
                for (w = 0; 64 > w; ++w) l = a[w] * b[w], F[w] = 0 < l ? l + .5 | 0 : l - .5 | 0;
                a = F;
                for (b = 0; 64 > b; ++b) D[J[b]] =
                    a[b];
                a = D[0] - d;
                d = D[0];
                0 == a ? c(f[0]) : (w = 32767 + a, c(f[C[w]]), c(u[w]));
                for (f = 63; 0 < f && 0 == D[f]; f--);
                if (0 == f) return c(y), d;
                for (a = 1; a <= f;) {
                    for (b = a; 0 == D[a] && a <= f; ++a);
                    b = a - b;
                    if (16 <= b) { w = b >> 4;
                        for (l = 1; l <= w; ++l) c(h);
                        b &= 15 }
                    w = 32767 + D[a];
                    c(k[(b << 4) + C[w]]);
                    c(u[w]);
                    a++ }
                63 != f && c(y);
                return d
            }

            function k(a) {
                0 >= a && (a = 1);
                100 < a && (a = 100);
                if (P != a) {
                    for (var b = 0, b = 50 > a ? Math.floor(5E3 / a) : Math.floor(200 - 2 * a), c = [16, 11, 10, 16, 24, 40, 51, 61, 12, 12, 14, 19, 26, 58, 60, 55, 14, 13, 16, 24, 40, 57, 69, 56, 14, 17, 22, 29, 51, 87, 80, 62, 18, 22, 37, 56, 68, 109, 103, 77,
                            24, 35, 55, 64, 81, 104, 113, 92, 49, 64, 78, 87, 103, 121, 120, 101, 72, 92, 95, 98, 112, 100, 103, 99
                        ], g = 0; 64 > g; g++) {
                        var f = h((c[g] * b + 50) / 100);
                        1 > f ? f = 1 : 255 < f && (f = 255);
                        n[J[g]] = f }
                    c = [17, 18, 24, 47, 99, 99, 99, 99, 18, 21, 26, 66, 99, 99, 99, 99, 24, 26, 56, 99, 99, 99, 99, 99, 47, 66, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99];
                    for (g = 0; 64 > g; g++) f = h((c[g] * b + 50) / 100), 1 > f ? f = 1 : 255 < f && (f = 255), v[J[g]] = f;
                    b = [1, 1.387039845, 1.306562965, 1.175875602, 1, .785694958, .5411961, .275899379];
                    for (g =
                        c = 0; 8 > g; g++)
                        for (f = 0; 8 > f; f++) w[c] = 1 / (n[J[c]] * b[g] * b[f] * 8), y[c] = 1 / (v[J[c]] * b[g] * b[f] * 8), c++;
                    P = a
                }
            }
            var h = Math.floor,
                n = Array(64),
                v = Array(64),
                w = Array(64),
                y = Array(64),
                x, m, p, l, u = Array(65535),
                C = Array(65535),
                F = Array(64),
                D = Array(64),
                M = [],
                K = 0,
                E = 7,
                Q = Array(64),
                R = Array(64),
                S = Array(64),
                O = Array(256),
                A = Array(2048),
                P, J = [0, 1, 5, 6, 14, 15, 27, 28, 2, 4, 7, 13, 16, 26, 29, 42, 3, 8, 12, 17, 25, 30, 41, 43, 9, 11, 18, 24, 31, 40, 44, 53, 10, 19, 23, 32, 39, 45, 52, 54, 20, 22, 33, 38, 46, 51, 55, 60, 21, 34, 37, 47, 50, 56, 59, 61, 35, 36, 48, 49, 57, 58, 62, 63],
                T = [0, 0, 1, 5, 1, 1,
                    1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0
                ],
                U = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                V = [0, 0, 2, 1, 3, 3, 2, 4, 3, 5, 5, 4, 4, 0, 0, 1, 125],
                W = [1, 2, 3, 0, 4, 17, 5, 18, 33, 49, 65, 6, 19, 81, 97, 7, 34, 113, 20, 50, 129, 145, 161, 8, 35, 66, 177, 193, 21, 82, 209, 240, 36, 51, 98, 114, 130, 9, 10, 22, 23, 24, 25, 26, 37, 38, 39, 40, 41, 42, 52, 53, 54, 55, 56, 57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89, 90, 99, 100, 101, 102, 103, 104, 105, 106, 115, 116, 117, 118, 119, 120, 121, 122, 131, 132, 133, 134, 135, 136, 137, 138, 146, 147, 148, 149, 150, 151, 152, 153, 154, 162, 163, 164, 165, 166, 167, 168, 169, 170, 178, 179, 180, 181, 182,
                    183, 184, 185, 186, 194, 195, 196, 197, 198, 199, 200, 201, 202, 210, 211, 212, 213, 214, 215, 216, 217, 218, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250
                ],
                X = [0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
                Y = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                Z = [0, 0, 2, 1, 2, 4, 4, 3, 4, 7, 5, 4, 4, 0, 1, 2, 119],
                aa = [0, 1, 2, 3, 17, 4, 5, 33, 49, 6, 18, 65, 81, 7, 97, 113, 19, 34, 50, 129, 8, 20, 66, 145, 161, 177, 193, 9, 35, 51, 82, 240, 21, 98, 114, 209, 10, 22, 36, 52, 225, 37, 241, 23, 24, 25, 26, 38, 39, 40, 41, 42, 53, 54, 55, 56, 57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89,
                    90, 99, 100, 101, 102, 103, 104, 105, 106, 115, 116, 117, 118, 119, 120, 121, 122, 130, 131, 132, 133, 134, 135, 136, 137, 138, 146, 147, 148, 149, 150, 151, 152, 153, 154, 162, 163, 164, 165, 166, 167, 168, 169, 170, 178, 179, 180, 181, 182, 183, 184, 185, 186, 194, 195, 196, 197, 198, 199, 200, 201, 202, 210, 211, 212, 213, 214, 215, 216, 217, 218, 226, 227, 228, 229, 230, 231, 232, 233, 234, 242, 243, 244, 245, 246, 247, 248, 249, 250
                ];
            this.encode = function(a, b) {
                b && k(b);
                M = [];
                K = 0;
                E = 7;
                d(65496);
                d(65504);
                d(16);
                f(74);
                f(70);
                f(73);
                f(70);
                f(0);
                f(1);
                f(1);
                f(0);
                d(1);
                d(1);
                f(0);
                f(0);
                d(65499);
                d(132);
                f(0);
                for (var h = 0; 64 > h; h++) f(n[h]);
                f(1);
                for (h = 0; 64 > h; h++) f(v[h]);
                var h = a.width,
                    z = a.height;
                d(65472);
                d(17);
                f(8);
                d(z);
                d(h);
                f(3);
                f(1);
                f(17);
                f(0);
                f(2);
                f(17);
                f(1);
                f(3);
                f(17);
                f(1);
                d(65476);
                d(418);
                f(0);
                for (h = 0; 16 > h; h++) f(T[h + 1]);
                for (h = 0; 11 >= h; h++) f(U[h]);
                f(16);
                for (h = 0; 16 > h; h++) f(V[h + 1]);
                for (h = 0; 161 >= h; h++) f(W[h]);
                f(1);
                for (h = 0; 16 > h; h++) f(X[h + 1]);
                for (h = 0; 11 >= h; h++) f(Y[h]);
                f(17);
                for (h = 0; 16 > h; h++) f(Z[h + 1]);
                for (h = 0; 161 >= h; h++) f(aa[h]);
                d(65498);
                d(12);
                f(3);
                f(1);
                f(0);
                f(2);
                f(17);
                f(3);
                f(17);
                f(0);
                f(63);
                f(0);
                var u = z =
                    h = 0;
                K = 0;
                E = 7;
                this.encode.displayName = "_encode_";
                for (var N = a.data, D = a.height, F = 4 * a.width, C, L = 0, G, H, B, J, I; L < D;) {
                    for (C = 0; C < F;) { J = F * L + C;
                        for (I = 0; 64 > I; I++) H = I >> 3, G = 4 * (I & 7), B = J + H * F + G, L + H >= D && (B -= F * (L + 1 + H - D)), C + G >= F && (B -= C + G - F + 4), G = N[B++], H = N[B++], B = N[B++], Q[I] = (A[G] + A[H + 256 >> 0] + A[B + 512 >> 0] >> 16) - 128, R[I] = (A[G + 768 >> 0] + A[H + 1024 >> 0] + A[B + 1280 >> 0] >> 16) - 128, S[I] = (A[G + 1280 >> 0] + A[H + 1536 >> 0] + A[B + 1792 >> 0] >> 16) - 128;
                        h = e(Q, w, h, x, p);
                        z = e(R, y, z, m, l);
                        u = e(S, y, u, m, l);
                        C += 32 }
                    L += 8 }
                0 <= E && (h = [], h[1] = E + 1, h[0] = (1 << E + 1) - 1, c(h));
                d(65497);
                h = "data:image/jpeg;base64," + btoa(M.join(""));
                M = [];
                return h
            };
            b || (b = 50);
            (function() {
                for (var a = String.fromCharCode, b = 0; 256 > b; b++) O[b] = a(b) })();
            x = a(T, U);
            m = a(X, Y);
            p = a(V, W);
            l = a(Z, aa);
            (function() {
                for (var a = 1, b = 2, c = 1; 15 >= c; c++) {
                    for (var g = a; g < b; g++) C[32767 + g] = c, u[32767 + g] = [], u[32767 + g][1] = c, u[32767 + g][0] = g;
                    for (g = -(b - 1); g <= -a; g++) C[32767 + g] = c, u[32767 + g] = [], u[32767 + g][1] = c, u[32767 + g][0] = b - 1 + g;
                    a <<= 1;
                    b <<= 1 } })();
            (function() {
                for (var a = 0; 256 > a; a++) A[a] = 19595 * a, A[a + 256 >> 0] = 38470 * a, A[a + 512 >> 0] = 7471 * a + 32768, A[a + 768 >>
                    0] = -11059 * a, A[a + 1024 >> 0] = -21709 * a, A[a + 1280 >> 0] = 32768 * a + 8421375, A[a + 1536 >> 0] = -27439 * a, A[a + 1792 >> 0] = -5329 * a
            })();
            k(b)
        }
        c.encode = function(b, a) {
            return (new c(a)).encode(b) };
        return c
    });
    n("runtime/html5/androidpatch", ["runtime/html5/util", "runtime/html5/jpegencoder", "base"], function(e, h, k) {
        var c = e.canvasToDataUrl,
            b;
        e.canvasToDataUrl = function(a, g, f) {
            var d, e, r;
            if (!k.os.android) return c.apply(null, arguments);
            "image/jpeg" === g && "undefined" === typeof b && (d = c.apply(null, arguments), d = d.split(","), d = ~d[0].indexOf("base64") ?
                atob(d[1]) : decodeURIComponent(d[1]), d = d.substring(0, 2), b = 255 === d.charCodeAt(0) && 216 === d.charCodeAt(1));
            return "image/jpeg" !== g || b ? c.apply(null, arguments) : (e = a.width, r = a.height, d = a.getContext("2d"), h.encode(d.getImageData(0, 0, e, r), f))
        }
    });
    n("runtime/html5/image", ["base", "runtime/html5/runtime", "runtime/html5/util"], function(e, h, k) {
        return h.register("Image", {
            modified: !1,
            init: function() {
                var c = this,
                    b = new Image;
                b.onload = function() {
                    c._info = { type: c.type, width: this.width, height: this.height };
                    debugger;
                    c._metas ||
                        "image/jpeg" !== c.type ? c.owner.trigger("load") : k.parseMeta(c._blob, function(a, b) { c._metas = b;
                            c.owner.trigger("load") })
                };
                b.onerror = function() { c.owner.trigger("error") };
                c._img = b
            },
            loadFromBlob: function(c) {
                var b = this._img;
                this._blob = c;
                this.type = c.type;
                b.src = k.createObjectURL(c.getSource());
                this.owner.once("load", function() { k.revokeObjectURL(b.src) }) },
            resize: function(c, b) {
                var a = this._canvas || (this._canvas = document.createElement("canvas"));
                this._resize(this._img, a, c, b);
                this._blob = null;
                this.modified = !0;
                this.owner.trigger("complete",
                    "resize")
            },
            crop: function(c, b, a, g, f) {
                var d = this._canvas || (this._canvas = document.createElement("canvas")),
                    e = this.options,
                    h = this._img,
                    k = h.naturalWidth,
                    l = h.naturalHeight,
                    v = this.getOrientation();
                f = f || 1;
                d.width = a;
                d.height = g;
                e.preserveHeaders || this._rotate2Orientaion(d, v);
                this._renderImageToCanvas(d, h, -c, -b, k * f, l * f);
                this._blob = null;
                this.modified = !0;
                this.owner.trigger("complete", "crop") },
            getAsBlob: function(c) {
                var b = this._blob,
                    a = this.options;
                c = c || this.type;
                if (this.modified || this.type !== c) {
                    b = this._canvas;
                    if ("image/jpeg" ===
                        c) {
                        if (b = k.canvasToDataUrl(b, c, a.quality), a.preserveHeaders && this._metas && this._metas.imageHead) return b = k.dataURL2ArrayBuffer(b), b = k.updateImageHead(b, this._metas.imageHead), b = k.arrayBufferToBlob(b, c) } else b = k.canvasToDataUrl(b, c);
                    b = k.dataURL2Blob(b)
                }
                return b
            },
            getAsDataUrl: function(c) {
                var b = this.options;
                c = c || this.type;
                return "image/jpeg" === c ? k.canvasToDataUrl(this._canvas, c, b.quality) : this._canvas.toDataURL(c) },
            getOrientation: function() {
                return this._metas && this._metas.exif && this._metas.exif.get("Orientation") ||
                    1
            },
            info: function(c) {
                return c ? (this._info = c, this) : this._info },
            meta: function(c) {
                return c ? (this._metas = c, this) : this._metas },
            destroy: function() {
                var c = this._canvas;
                this._img.onload = null;
                c && (c.getContext("2d").clearRect(0, 0, c.width, c.height), c.width = c.height = 0, this._canvas = null);
                this._img.src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D";
                this._img = this._blob = null },
            _resize: function(c, b, a, g) {
                var f = this.options,
                    d = c.width,
                    e = c.height,
                    h = this.getOrientation(),
                    k;
                ~[5, 6, 7, 8].indexOf(h) && (a ^= g, g ^=
                    a, a ^= g);
                k = Math[f.crop ? "max" : "min"](a / d, g / e);
                f.allowMagnify || (k = Math.min(1, k));
                d *= k;
                e *= k;
                f.crop ? (b.width = a, b.height = g) : (b.width = d, b.height = e);
                a = (b.width - d) / 2;
                g = (b.height - e) / 2;
                f.preserveHeaders || this._rotate2Orientaion(b, h);
                this._renderImageToCanvas(b, c, a, g, d, e)
            },
            _rotate2Orientaion: function(c, b) {
                var a = c.width,
                    g = c.height,
                    f = c.getContext("2d");
                switch (b) {
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                        c.width = g, c.height = a }
                switch (b) {
                    case 2:
                        f.translate(a, 0);
                        f.scale(-1, 1);
                        break;
                    case 3:
                        f.translate(a, g);
                        f.rotate(Math.PI);
                        break;
                    case 4:
                        f.translate(0, g);
                        f.scale(1, -1);
                        break;
                    case 5:
                        f.rotate(.5 * Math.PI);
                        f.scale(1, -1);
                        break;
                    case 6:
                        f.rotate(.5 * Math.PI);
                        f.translate(0, -g);
                        break;
                    case 7:
                        f.rotate(.5 * Math.PI);
                        f.translate(a, -g);
                        f.scale(-1, 1);
                        break;
                    case 8:
                        f.rotate(-.5 * Math.PI), f.translate(-a, 0)
                }
            },
            _renderImageToCanvas: function() {
                function c(b, a, c) {
                    var f = document.createElement("canvas"),
                        d = f.getContext("2d");
                    a = 0;
                    var e = c,
                        h = c;
                    f.width = 1;
                    f.height = c;
                    d.drawImage(b, 0, 0);
                    for (b = d.getImageData(0, 0, 1, c).data; h > a;) f = b[4 * (h - 1) + 3], 0 === f ? e = h : a = h, h = e + a >>
                        1;
                    c = h / c;
                    return 0 === c ? 1 : c
                }
                return e.os.ios ? 7 <= e.os.ios ? function(b, a, g, f, d, e) {
                    var h = a.naturalWidth,
                        k = a.naturalHeight,
                        l = c(a, h, k);
                    return b.getContext("2d").drawImage(a, 0, 0, h * l, k * l, g, f, d, e) } : function(b, a, g, f, d, e) {
                    var h = a.naturalWidth,
                        k = a.naturalHeight;
                    b = b.getContext("2d");
                    var l;
                    var v = a.naturalWidth,
                        w;
                    1048576 < v * a.naturalHeight ? (w = document.createElement("canvas"), w.width = w.height = 1, w = w.getContext("2d"), w.drawImage(a, -v + 1, 0), l = 0 === w.getImageData(0, 0, 1, 1).data[3]) : l = !1;
                    var y = "image/jpeg" === this.type;
                    w = v = 0;
                    var x, m;
                    l && (h /= 2, k /= 2);
                    b.save();
                    l = document.createElement("canvas");
                    l.width = l.height = 1024;
                    x = l.getContext("2d");
                    y = y ? c(a, h, k) : 1;
                    d = Math.ceil(1024 * d / h);
                    for (e = Math.ceil(1024 * e / k / y); v < k;) {
                        for (m = y = 0; y < h;) x.clearRect(0, 0, 1024, 1024), x.drawImage(a, -y, -v), b.drawImage(l, 0, 0, 1024, 1024, g + m, f + w, d, e), y += 1024, m += d;
                        v += 1024;
                        w += e }
                    b.restore()
                } : function(b) {
                    var a = e.slice(arguments, 1),
                        c = b.getContext("2d");
                    c.drawImage.apply(c, a) }
            }()
        })
    });
    n("runtime/html5/transport", ["base", "runtime/html5/runtime"], function(e, h) {
        var k = e.noop,
            c = e.$;
        return h.register("Transport", {
            init: function() { this._status = 0;
                this._response = null },
            send: function() {
                var b = this.owner,
                    a = this.options,
                    g = this._initAjax(),
                    f = b._blob,
                    d = a.server,
                    h, k, l;
                a.sendAsBinary ? (d += (/\?/.test(d) ? "&" : "?") + c.param(b._formData), k = f.getSource()) : (h = new FormData, c.each(b._formData, function(a, b) { h.append(a, b) }), h.append(a.fileVal, f.getSource(), a.filename || b._formData.name || ""));
                a.withCredentials && "withCredentials" in g ? (g.open(a.method, d, !0), g.withCredentials = !0) : g.open(a.method, d);
                this._setRequestHeader(g, a.headers);
                k ? (g.overrideMimeType && g.overrideMimeType("application/octet-stream"), e.os.android ? (l = new FileReader, l.onload = function() { g.send(this.result);
                    l = l.onload = null }, l.readAsArrayBuffer(k)) : g.send(k)) : g.send(h)
            },
            getResponse: function() {
                return this._response },
            getResponseAsJson: function() {
                return this._parseJson(this._response) },
            getStatus: function() {
                return this._status },
            abort: function() {
                var b = this._xhr;
                b && (b.upload.onprogress = k, b.onreadystatechange = k, b.abort(), this._xhr = null) },
            destroy: function() { this.abort() },
            _initAjax: function() {
                var b = this,
                    a = new XMLHttpRequest;
                !this.options.withCredentials || "withCredentials" in a || "undefined" === typeof XDomainRequest || (a = new XDomainRequest);
                a.upload.onprogress = function(a) {
                    var c = 0;
                    a.lengthComputable && (c = a.loaded / a.total);
                    return b.trigger("progress", c) };
                a.onreadystatechange = function() {
                    if (4 === a.readyState) return a.upload.onprogress = k, a.onreadystatechange = k, b._xhr = null, b._status = a.status, 200 <= a.status && 300 > a.status ? (b._response = a.responseText,
                        b.trigger("load")) : 500 <= a.status && 600 > a.status ? (b._response = a.responseText, b.trigger("error", "server")) : b.trigger("error", b._status ? "http" : "abort")
                };
                return b._xhr = a
            },
            _setRequestHeader: function(b, a) { c.each(a, function(a, c) { b.setRequestHeader(a, c) }) },
            _parseJson: function(b) {
                var a;
                try { a = JSON.parse(b) } catch (c) { a = {} }
                return a }
        })
    });
    n("runtime/html5/md5", ["runtime/html5/runtime"], function(e) {
        var h = function(a, b) {
                return a + b & 4294967295 },
            k = function(a, b, c, g, f, d) { b = h(h(b, a), h(g, d));
                return h(b << f | b >>> 32 - f, c) },
            c = function(a,
                b, c, g, f, d, e) {
                return k(b & c | ~b & g, a, b, f, d, e) },
            b = function(a, b, c, g, f, d, e) {
                return k(b & g | c & ~g, a, b, f, d, e) },
            a = function(a, b, c, g, f, d, e) {
                return k(c ^ (b | ~g), a, b, f, d, e) },
            g = function(g, f) {
                var d = g[0],
                    e = g[1],
                    m = g[2],
                    p = g[3],
                    d = c(d, e, m, p, f[0], 7, -680876936),
                    p = c(p, d, e, m, f[1], 12, -389564586),
                    m = c(m, p, d, e, f[2], 17, 606105819),
                    e = c(e, m, p, d, f[3], 22, -1044525330),
                    d = c(d, e, m, p, f[4], 7, -176418897),
                    p = c(p, d, e, m, f[5], 12, 1200080426),
                    m = c(m, p, d, e, f[6], 17, -1473231341),
                    e = c(e, m, p, d, f[7], 22, -45705983),
                    d = c(d, e, m, p, f[8], 7, 1770035416),
                    p = c(p, d, e, m, f[9],
                        12, -1958414417),
                    m = c(m, p, d, e, f[10], 17, -42063),
                    e = c(e, m, p, d, f[11], 22, -1990404162),
                    d = c(d, e, m, p, f[12], 7, 1804603682),
                    p = c(p, d, e, m, f[13], 12, -40341101),
                    m = c(m, p, d, e, f[14], 17, -1502002290),
                    e = c(e, m, p, d, f[15], 22, 1236535329),
                    d = b(d, e, m, p, f[1], 5, -165796510),
                    p = b(p, d, e, m, f[6], 9, -1069501632),
                    m = b(m, p, d, e, f[11], 14, 643717713),
                    e = b(e, m, p, d, f[0], 20, -373897302),
                    d = b(d, e, m, p, f[5], 5, -701558691),
                    p = b(p, d, e, m, f[10], 9, 38016083),
                    m = b(m, p, d, e, f[15], 14, -660478335),
                    e = b(e, m, p, d, f[4], 20, -405537848),
                    d = b(d, e, m, p, f[9], 5, 568446438),
                    p = b(p, d,
                        e, m, f[14], 9, -1019803690),
                    m = b(m, p, d, e, f[3], 14, -187363961),
                    e = b(e, m, p, d, f[8], 20, 1163531501),
                    d = b(d, e, m, p, f[13], 5, -1444681467),
                    p = b(p, d, e, m, f[2], 9, -51403784),
                    m = b(m, p, d, e, f[7], 14, 1735328473),
                    e = b(e, m, p, d, f[12], 20, -1926607734),
                    d = k(e ^ m ^ p, d, e, f[5], 4, -378558),
                    p = k(d ^ e ^ m, p, d, f[8], 11, -2022574463),
                    m = k(p ^ d ^ e, m, p, f[11], 16, 1839030562),
                    e = k(m ^ p ^ d, e, m, f[14], 23, -35309556),
                    d = k(e ^ m ^ p, d, e, f[1], 4, -1530992060),
                    p = k(d ^ e ^ m, p, d, f[4], 11, 1272893353),
                    m = k(p ^ d ^ e, m, p, f[7], 16, -155497632),
                    e = k(m ^ p ^ d, e, m, f[10], 23, -1094730640),
                    d = k(e ^ m ^ p, d,
                        e, f[13], 4, 681279174),
                    p = k(d ^ e ^ m, p, d, f[0], 11, -358537222),
                    m = k(p ^ d ^ e, m, p, f[3], 16, -722521979),
                    e = k(m ^ p ^ d, e, m, f[6], 23, 76029189),
                    d = k(e ^ m ^ p, d, e, f[9], 4, -640364487),
                    p = k(d ^ e ^ m, p, d, f[12], 11, -421815835),
                    m = k(p ^ d ^ e, m, p, f[15], 16, 530742520),
                    e = k(m ^ p ^ d, e, m, f[2], 23, -995338651),
                    d = a(d, e, m, p, f[0], 6, -198630844),
                    p = a(p, d, e, m, f[7], 10, 1126891415),
                    m = a(m, p, d, e, f[14], 15, -1416354905),
                    e = a(e, m, p, d, f[5], 21, -57434055),
                    d = a(d, e, m, p, f[12], 6, 1700485571),
                    p = a(p, d, e, m, f[3], 10, -1894986606),
                    m = a(m, p, d, e, f[10], 15, -1051523),
                    e = a(e, m, p, d, f[1], 21, -2054922799),
                    d = a(d, e, m, p, f[8], 6, 1873313359),
                    p = a(p, d, e, m, f[15], 10, -30611744),
                    m = a(m, p, d, e, f[6], 15, -1560198380),
                    e = a(e, m, p, d, f[13], 21, 1309151649),
                    d = a(d, e, m, p, f[4], 6, -145523070),
                    p = a(p, d, e, m, f[11], 10, -1120210379),
                    m = a(m, p, d, e, f[2], 15, 718787259),
                    e = a(e, m, p, d, f[9], 21, -343485551);
                g[0] = h(d, g[0]);
                g[1] = h(e, g[1]);
                g[2] = h(m, g[2]);
                g[3] = h(p, g[3])
            },
            f = function(a) {
                var b = [],
                    c;
                for (c = 0; 64 > c; c += 4) b[c >> 2] = a.charCodeAt(c) + (a.charCodeAt(c + 1) << 8) + (a.charCodeAt(c + 2) << 16) + (a.charCodeAt(c + 3) << 24);
                return b },
            d = function(a) {
                var b = [],
                    c;
                for (c = 0; 64 > c; c += 4) b[c >> 2] = a[c] + (a[c + 1] << 8) + (a[c + 2] << 16) + (a[c + 3] << 24);
                return b
            },
            l = function(a) {
                var b = a.length,
                    c = [1732584193, -271733879, -1732584194, 271733878],
                    d, e, h;
                for (d = 64; d <= b; d += 64) g(c, f(a.substring(d - 64, d)));
                a = a.substring(d - 64);
                e = a.length;
                h = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                for (d = 0; d < e; d += 1) h[d >> 2] |= a.charCodeAt(d) << (d % 4 << 3);
                h[d >> 2] |= 128 << (d % 4 << 3);
                if (55 < d)
                    for (g(c, h), d = 0; 16 > d; d += 1) h[d] = 0;
                b = (8 * b).toString(16).match(/(.*?)(.{0,8})$/);
                a = parseInt(b[2], 16);
                b = parseInt(b[1], 16) || 0;
                h[14] = a;
                h[15] = b;
                g(c,
                    h);
                return c
            },
            n = "0123456789abcdef".split(""),
            u = function(a) {
                var b;
                for (b = 0; b < a.length; b += 1) {
                    for (var c = b, d = a[b], f = "", e = void 0, e = 0; 4 > e; e += 1) f += n[d >> 8 * e + 4 & 15] + n[d >> 8 * e & 15];
                    a[c] = f }
                return a.join("") },
            t = function() { this.reset() };
        "5d41402abc4b2a76b9719d911017c592" !== u(l("hello")) && (h = function(a, b) {
            var c = (a & 65535) + (b & 65535);
            return (a >> 16) + (b >> 16) + (c >> 16) << 16 | c & 65535 });
        t.prototype.append = function(a) { /[\u0080-\uFFFF]/.test(a) && (a = unescape(encodeURIComponent(a)));
            this.appendBinary(a);
            return this };
        t.prototype.appendBinary =
            function(a) { this._buff += a;
                this._length += a.length;
                a = this._buff.length;
                var b;
                for (b = 64; b <= a; b += 64) g(this._state, f(this._buff.substring(b - 64, b)));
                this._buff = this._buff.substr(b - 64);
                return this };
        t.prototype.end = function(a) {
            var b = this._buff,
                c = b.length,
                d, f = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (d = 0; d < c; d += 1) f[d >> 2] |= b.charCodeAt(d) << (d % 4 << 3);
            this._finish(f, c);
            a = a ? this._state : u(this._state);
            this.reset();
            return a };
        t.prototype._finish = function(a, b) {
            var c = b,
                d;
            a[c >> 2] |= 128 << (c % 4 << 3);
            if (55 < c)
                for (g(this._state,
                        a), c = 0; 16 > c; c += 1) a[c] = 0;
            d = 8 * this._length;
            d = d.toString(16).match(/(.*?)(.{0,8})$/);
            c = parseInt(d[2], 16);
            d = parseInt(d[1], 16) || 0;
            a[14] = c;
            a[15] = d;
            g(this._state, a)
        };
        t.prototype.reset = function() { this._buff = "";
            this._length = 0;
            this._state = [1732584193, -271733879, -1732584194, 271733878];
            return this };
        t.prototype.destroy = function() { delete this._state;
            delete this._buff;
            delete this._length };
        t.hash = function(a, b) { /[\u0080-\uFFFF]/.test(a) && (a = unescape(encodeURIComponent(a)));
            var c = l(a);
            return b ? c : u(c) };
        t.hashBinary =
            function(a, b) {
                var c = l(a);
                return b ? c : u(c) };
        t.ArrayBuffer = function() { this.reset() };
        t.ArrayBuffer.prototype.append = function(a) {
            var b = this._concatArrayBuffer(this._buff, a),
                c = b.length;
            this._length += a.byteLength;
            for (a = 64; a <= c; a += 64) g(this._state, d(b.subarray(a - 64, a)));
            this._buff = a - 64 < c ? b.subarray(a - 64) : new Uint8Array(0);
            return this };
        t.ArrayBuffer.prototype.end = function(a) {
            var b = this._buff,
                c = b.length,
                d = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                f;
            for (f = 0; f < c; f += 1) d[f >> 2] |= b[f] << (f % 4 << 3);
            this._finish(d, c);
            a = a ? this._state :
                u(this._state);
            this.reset();
            return a
        };
        t.ArrayBuffer.prototype._finish = t.prototype._finish;
        t.ArrayBuffer.prototype.reset = function() { this._buff = new Uint8Array(0);
            this._length = 0;
            this._state = [1732584193, -271733879, -1732584194, 271733878];
            return this };
        t.ArrayBuffer.prototype.destroy = t.prototype.destroy;
        t.ArrayBuffer.prototype._concatArrayBuffer = function(a, b) {
            var c = a.length,
                d = new Uint8Array(c + b.byteLength);
            d.set(a);
            d.set(new Uint8Array(b), c);
            return d };
        t.ArrayBuffer.hash = function(a, b) {
            var c = new Uint8Array(a),
                f = c.length,
                e = [1732584193, -271733879, -1732584194, 271733878],
                h, k, l;
            for (h = 64; h <= f; h += 64) g(e, d(c.subarray(h - 64, h)));
            c = h - 64 < f ? c.subarray(h - 64) : new Uint8Array(0);
            k = c.length;
            l = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (h = 0; h < k; h += 1) l[h >> 2] |= c[h] << (h % 4 << 3);
            l[h >> 2] |= 128 << (h % 4 << 3);
            if (55 < h)
                for (g(e, l), h = 0; 16 > h; h += 1) l[h] = 0;
            f = (8 * f).toString(16).match(/(.*?)(.{0,8})$/);
            c = parseInt(f[2], 16);
            f = parseInt(f[1], 16) || 0;
            l[14] = c;
            l[15] = f;
            g(e, l);
            return b ? e : u(e)
        };
        return e.register("Md5", {
            init: function() {},
            loadFromBlob: function(a) {
                var b =
                    a.getSource(),
                    c = Math.ceil(b.size / 2097152),
                    d = 0,
                    f = this.owner,
                    e = new t.ArrayBuffer,
                    g = this,
                    h = b.mozSlice || b.webkitSlice || b.slice,
                    k, l;
                l = new FileReader;
                k = function() {
                    var n, q;
                    n = 2097152 * d;
                    q = Math.min(n + 2097152, b.size);
                    l.onload = function(b) { e.append(b.target.result);
                        f.trigger("progress", { total: a.size, loaded: q }) };
                    l.onloadend = function() { l.onloadend = l.onload = null;++d < c ? setTimeout(k, 1) : setTimeout(function() { f.trigger("load");
                            g.result = e.end();
                            k = a = b = e = null;
                            f.trigger("complete") }, 50) };
                    l.readAsArrayBuffer(h.call(b, n, q)) };
                k()
            },
            getResult: function() {
                return this.result }
        })
    });
    n("runtime/flash/runtime", ["base", "runtime/runtime", "runtime/compbase"], function(e, h, k) {
        function c() {
            function b(a, c) {
                var f = a.type || a,
                    e, f = f.split("::");
                e = f[0];
                f = f[1]; "Ready" === f && e === n.uid ? n.trigger("ready") : d[e] && d[e].trigger(f.toLowerCase(), a, c) }
            var c = {},
                d = {},
                k = this.destroy,
                n = this,
                u = e.guid("webuploader_");
            h.apply(n, arguments);
            n.type = "flash";
            n.exec = function(b, g) {
                var h = this.uid,
                    k = e.slice(arguments, 2);
                d[h] = this;
                return a[b] && (c[h] || (c[h] = new a[b](this,
                    n)), h = c[h], h[g]) ? h[g].apply(h, k) : n.flashExec.apply(this, arguments)
            };
            l[u] = function() {
                var a = arguments;
                setTimeout(function() { b.apply(null, a) }, 1) };
            this.jsreciver = u;
            this.destroy = function() {
                return k && k.apply(this, arguments) };
            this.flashExec = function(a, b) {
                var c = n.getFlash(),
                    d = e.slice(arguments, 2);
                return c.exec(this.uid, a, b, d) }
        }
        var b = e.$,
            a = {};
        e.inherits(h, {
            constructor: c,
            init: function() {
                var a = this.getContainer(),
                    b = this.options,
                    c;
                a.css({ position: "absolute", top: "-8px", left: "-8px", width: "9px", height: "9px", overflow: "hidden" });
                c = '<object id="' + this.uid + '" type="application/x-shockwave-flash" data="' + b.swf + '" ';
                e.browser.ie && (c += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ');
                c += 'width="100%" height="100%" style="outline:0"><param name="movie" value="' + b.swf + '" /><param name="flashvars" value="uid=' + this.uid + "&jsreciver=" + this.jsreciver + '" /><param name="wmode" value="transparent" /><param name="allowscriptaccess" value="always" /></object>';
                a.html(c)
            },
            getFlash: function() {
                return this._flash ? this._flash : this._flash =
                    b("#" + this.uid).get(0)
            }
        });
        c.register = function(c, f) {
            return f = a[c] = e.inherits(k, b.extend({ flashExec: function() {
                    var a = this.owner;
                    return this.getRuntime().flashExec.apply(a, arguments) } }, f)) };
        11.4 <= function() {
            var a;
            try { a = navigator.plugins["Shockwave Flash"], a = a.description } catch (b) {
                try { a = (new ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version") } catch (c) { a = "0.0" } }
            a = a.match(/\d+/g);
            return parseFloat(a[0] + "." + a[1], 10) }() && h.addRuntime("flash", c);
        return c
    });
    n("runtime/flash/filepicker", ["base", "runtime/flash/runtime"], function(e, h) {
        var k = e.$;
        return h.register("FilePicker", { init: function(c) { c = k.extend({}, c);
                var b, a;
                b = c.accept && c.accept.length;
                for (a = 0; a < b; a++) c.accept[a].title || (c.accept[a].title = "Files");
                delete c.button;
                delete c.id;
                delete c.container;
                this.flashExec("FilePicker", "init", c) }, destroy: function() { this.flashExec("FilePicker", "destroy") } }) });
    n("runtime/flash/image", ["runtime/flash/runtime"], function(e) {
        return e.register("Image", {
            loadFromBlob: function(e) {
                var k = this.owner;
                k.info() && this.flashExec("Image", "info", k.info());
                k.meta() && this.flashExec("Image", "meta", k.meta());
                this.flashExec("Image", "loadFromBlob", e.uid)
            }
        })
    });
    n("runtime/flash/transport", ["base", "runtime/flash/runtime", "runtime/client"], function(e, h, k) {
        var c = e.$;
        return h.register("Transport", {
            init: function() { this._status = 0;
                this._responseJson = this._response = null },
            send: function() {
                var b = this.owner,
                    a = this.options,
                    e = this._initAjax(),
                    f = b._blob,
                    d = a.server,
                    h;
                e.connectRuntime(f.ruid);
                a.sendAsBinary ? (d += (/\?/.test(d) ?
                    "&" : "?") + c.param(b._formData), h = f.uid) : (c.each(b._formData, function(a, b) { e.exec("append", a, b) }), e.exec("appendBlob", a.fileVal, f.uid, a.filename || b._formData.name || ""));
                this._setRequestHeader(e, a.headers);
                e.exec("send", { method: a.method, url: d, forceURLStream: a.forceURLStream, mimeType: "application/octet-stream" }, h)
            },
            getStatus: function() {
                return this._status },
            getResponse: function() {
                return this._response || "" },
            getResponseAsJson: function() {
                return this._responseJson },
            abort: function() {
                var b = this._xhr;
                b && (b.exec("abort"),
                    b.destroy(), this._xhr = null)
            },
            destroy: function() { this.abort() },
            _initAjax: function() {
                var b = this,
                    a = new k("XMLHttpRequest");
                a.on("uploadprogress progress", function(a) { a = a.loaded / a.total;
                    a = Math.min(1, Math.max(0, a));
                    return b.trigger("progress", a) });
                a.on("load", function() {
                    var c = a.exec("getStatus"),
                        f = !1,
                        d = "";
                    a.off();
                    b._xhr = null;
                    200 <= c && 300 > c ? f = !0 : 500 <= c && 600 > c ? (f = !0, d = "server") : d = "http";
                    f && (b._response = a.exec("getResponse"), b._response = decodeURIComponent(b._response), c = l.JSON && l.JSON.parse || function(a) {
                        try {
                            return (new Function("return " +
                                a)).call()
                        } catch (b) {
                            return {} }
                    }, b._responseJson = b._response ? c(b._response) : {});
                    a.destroy();
                    a = null;
                    return d ? b.trigger("error", d) : b.trigger("load")
                });
                a.on("error", function() { a.off();
                    b._xhr = null;
                    b.trigger("error", "http") });
                return b._xhr = a
            },
            _setRequestHeader: function(b, a) { c.each(a, function(a, c) { b.exec("setRequestHeader", a, c) }) }
        })
    });
    n("runtime/flash/blob", ["runtime/flash/runtime", "lib/blob"], function(e, h) {
        return e.register("Blob", {
            slice: function(e, c) {
                var b = this.flashExec("Blob", "slice", e, c);
                return new h(b.uid,
                    b)
            }
        })
    });
    n("runtime/flash/md5", ["runtime/flash/runtime"], function(e) {
        return e.register("Md5", { init: function() {}, loadFromBlob: function(e) {
                return this.flashExec("Md5", "loadFromBlob", e.uid) } }) });
    n("preset/all", "base widgets/filednd widgets/filepaste widgets/filepicker widgets/image widgets/queue widgets/runtime widgets/upload widgets/validator widgets/md5 runtime/html5/blob runtime/html5/dnd runtime/html5/filepaste runtime/html5/filepicker runtime/html5/imagemeta/exif runtime/html5/androidpatch runtime/html5/image runtime/html5/transport runtime/html5/md5 runtime/flash/filepicker runtime/flash/image runtime/flash/transport runtime/flash/blob runtime/flash/md5".split(" "),
        function(e) {
            return e });
    n("widgets/log", ["base", "uploader", "widgets/widget"], function(e, h) {
        function k(b) { b = c.extend({}, a, b);
            b = " http://static.tieba.baidu.com/tb/pms/img/st.gif??".replace(/^(.*)\?/, "$1" + c.param(b));
            (new Image).src = b }
        var c = e.$,
            b = (location.hostname || location.host || "protected").toLowerCase(),
            a;
        if (b && /baidu/i.exec(b)) return a = { dv: 3, master: "webuploader", online: /test/.exec(b) ? 0 : 1, module: "", product: b, type: 0 }, h.register({
            name: "log",
            init: function() {
                var a = 0,
                    b = 0;
                this.owner.on("error", function(a) {
                    k({
                        type: 2,
                        c_error_code: a
                    })
                }).on("uploadError", function(a, b) { k({ type: 2, c_error_code: "UPLOAD_ERROR", c_reason: "" + b }) }).on("uploadComplete", function(c) { a++;
                    b += c.size }).on("uploadFinished", function() { k({ c_count: a, c_size: b });
                    a = b = 0 });
                k({ c_usage: 1 })
            }
        })
    });
    n("webuploader", ["preset/all", "widgets/log"], function(e) {
        return e });
    return u("webuploader")
}); - 1 != navigator.userAgent.indexOf("MSIE") && 8 > parseInt(navigator.userAgent.match(/MSIE ([\d.]+)/)[1], 10) && alert("\u6d4f\u89c8\u5668\u7248\u672c\u8fc7\u4f4e\uff0c\u53ef\u80fd\u65e0\u6cd5\u652f\u6301\u672c\u7ec4\u4ef6\u7684\u5168\u90e8\u529f\u80fd\uff01");
$.ajaxf.install(CONTEXTPATH + '/resource/js/plugins/webuploader/AJAX.swf');
$.crossDomainAjax = function(l, n, u) {
    if ("XDomainRequest" in window && null !== window.XDomainRequest) {
        if ("GET" == n) {
            var e = $.Deferred(),
                h = new XDomainRequest;
            u ? l += "?md5=" + u.md5 + "&appKey=" + u.appKey + "&token=" + u.token + "&expires=" + u.expires : l;
            h.open("get", l);
            h.onload = function() { new ActiveXObject("Microsoft.XMLDOM");
                var c = $.parseJSON(h.responseText);
                if (null == c || "undefined" == typeof c) c = $.parseJSON(k.firstChild.textContent);
                e.resolve(c) };
            h.onerror = function() { e.reject("\u8c03\u7528XDomainRequest\u51fa\u73b0\u9519\u8bef") };
            h.send();
            return e.promise()
        }
        if ("POST" == n) {
            e = $.Deferred();
            if (u.contextId) {
                var k = "contextId=" + u.contextId + "&token=" + u.token + "&expires=" + u.expires + "&appKey=" + u.appKey;
                u.md5 ? k += "&md5=" + u.md5 : k;
                $.ajaxf.postJSON(l, k, function(c) { c ? 2 == c.status ? e.resolve(c) : e.reject(c) : e.reject("\u8c03\u7528Complete\u63a5\u53e3\u5931\u8d25") }) } else k = "expires=" + u.expires + "&token=" + u.token + "&filePath=" + u.filePath + "&appKey=" + u.appKey + "&chunks=" + u.chunks, $.ajaxf.postJSON(l, k, function(c) { c ? 0 == c.status ? e.resolve(c) : e.reject(c) : e.reject("\u8c03\u7528Prepare\u63a5\u53e3\u5931\u8d25") });
            return e.promise()
        }
    } else return $.ajax({ url: l, dataType: "json", type: n, data: u })
};
WebUploader.Uploader.register({ "before-send-file": "beforeSendFile", "before-send": "beforeSend" }, {
    beforeSendFile: function(l) {
        var n = this,
            u = WebUploader.Deferred(),
            e = (new Date).getTime();
        n.owner.md5File(l.source).progress(function(e) { n.owner.trigger("md5Progress", e, l) }).then(function(h) {
            WebUploader.Base.log("MD5\u8ba1\u7b97\u8017\u65f6\uff1a" + ((new Date).getTime() - e) + "ms");
            l.md5 = h;
            l.chunks = Math.ceil(l.size / n.options.chunkSize);
            n.options.callback.getToken(l).then(function() {
                n.options.callback.getContextIdByMd5(l.md5).done(function(e) {
                    e ?
                        n.options.callback.fetchFileInfo(l).done(function() {
                            $.crossDomainAjax(n.options.extension.server + "/v2/files/" + l.contextId + "/getchunks", "GET").done(function(c) { WebUploader.Base.log("\u901a\u8fc7ContextID\u83b7\u53d6\u5df2\u7ecf\u4e0a\u4f20\u7684\u5206\u7247");
                                l.currentFileChunksUploaded = c.chunkInfoList;
                                n.options.callback.getToken(l).done(function() { u.resolve() }) }).fail(function(c) {
                                WebUploader.Base.log("\u83b7\u53d6\u5df2\u4e0a\u4f20\u5206\u7247\u4fe1\u606f\u65f6\u51fa\u73b0\u9519\u8bef\uff0c\u5c1d\u8bd5\u91cd\u65b0\u4e0a\u4f20\u6587\u4ef6");
                                u.resolve()
                            })
                        }) : $.crossDomainAjax(n.options.extension.server + "/v2/files/prepare", "POST", l.prepareToken).done(function(c) { l.contextId = c.contextId;
                            n.options.callback.getToken(l).then(function() { WebUploader.Base.log("\u8bbe\u7f6eMD5\u5bf9\u5e94\u7684ContextID\u53caContextID\u5bf9\u5e94\u7684\u5206\u7247Token\u4fe1\u606f");
                                n.options.callback.storeFileInfo(l);
                                u.resolve() }) }).fail(function(c) {
                            l.failed = !0;
                            n.owner.skipFile(l, "error");
                            n.owner.trigger("uploadError", l, "\u83b7\u53d6\u9884\u4e0a\u4f20ContextID\u51fa\u9519\uff1b\u670d\u52a1\u7aef\u8fd4\u56de\u4fe1\u606f\uff1a" +
                                JSON.stringify(c));
                            u.resolve()
                        })
                })
            })
        });
        return u.promise()
    },
    beforeSend: function(l) {
        var n = new $.Deferred; "undefined" != typeof l.file.currentFileChunksUploaded && 0 != l.file.currentFileChunksUploaded.length && $.each(l.file.currentFileChunksUploaded, function(u, e) { e.chunkNo == l.chunk && n.reject() });
        n.resolve();
        return n.promise() }
});

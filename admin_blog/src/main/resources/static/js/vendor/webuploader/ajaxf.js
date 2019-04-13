$.ajaxf = new function() {
    var flash = null;
    var isready = false;
    var id = new Date().getTime().toString();
    this.defaults = {
        type: "text",
        header: new Object(),
        method: "get"
    };
    this.isReady = function() { return isready; }
    this.install = function(swfpath) {
        var height = 0, width = 0;

        if (swfpath) {

        } else {
            swfpath = CONTEXTPATH + '/resource/js/plugins/webuploader/AJAX.swf';
        }

        var e = '<embed height="' + height + '" width="' + width + '" ';
        e += 'allownetworking="internal" pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Pro d_Version=ShockwaveFlash" wmode="" type="application/x-shockwave-flash" menu="true" loop="false" src="' + swfpath + '" />';
        var o = '';
        if (window.ActiveXObject) {
            // browser supports ActiveX
            // Create object element with
            // download URL for IE OCX
            o += '<object id="' + id + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'
            o += ' codebase="http://download.macromedia.com'
            o += '/pub/shockwave/cabs/flash/swflash.cab#version=8,5,0,0"'
            o += ' height="' + height + '" width="' + width + '">'
            o += ' <param name="movie" value="' + swfpath + '">'
            o += ' <param name="quality" value="high">'
            o += ' <param name="swliveconnect" value="true">'
            //o += e;
            o += '<\/object>'
        }
        else {
            // browser supports Netscape Plugin API

            o += '<object id="' + id + '" data="' + swfpath + '"'
            o += ' type="application/x-shockwave-flash"'
            o += ' height="' + height + '" width="' + width + '">'
            o += '<param name="movie" value="' + swfpath + '">'
            o += '<param name="quality" value="high">'
            o += '<param name="swliveconnect" value="true">'
            o += '<param name="pluginurl" value="http://www.macromedia.com/go/getflashplayer">'
            o += '<param name="pluginspage" value="http://www.macromedia.com/go/getflashplayer">'
            //o += e;
            o += '<p>You need Flash for this.'
            o += ' Get the latest version from'
            o += ' <a href="http://www.macromedia.com/software/flashplayer/">here<\/a>.'
            o += '<\/p>'
            o += '<\/object>'
        }

        flash = $(o);
        $("body").append(flash);
        this.PercentCheck();

    }
    var readyf = null;
    this.ready = function(f) {
        if (isready)
            f();
        readyf = f;
    }
    this.PercentCheck = function() {
        var p = 0;
        try {
            p = flash[0].PercentLoaded();
        }
        catch (e) { }
        if (p < 100) {
            setTimeout($.ajaxf.PercentCheck, 1000);
        }
        else {
            isready = true;
            if (readyf)
                readyf();
        }
    }
    //
    var callbacks = new Object();
    this.callback = function(key, type) {
        var r = $(flash).get(0).GetVariable("retText");
        if (type == 'script')
            eval(r);

        var b = callbacks[key];
        delete callbacks[key];
        if (b) {
        }
        else {

            return;
        }
        if (type == 'text') {
            b(r);
        }
        else if (type == 'json') {
            b($.parseJSON(r));
        }
        else if (type == 'xml') {
            b($(r));
        }

    }
    this.ajax = function(p) {
        if (!isready) {
            alert('Loading');
            return;
        }
        var key = new Date().getTime().toString();
        if (p["callback"]) {
            callbacks[key] = p["callback"];
        }
        else {
            callbacks[key] = this.defaults['callback'];
        }
        if (p["type"])
        { }
        else {
            if (this.defaults['type'])
                p['type'] = this.defaults['type'];
            else
                p["type"] = "text";
        }
        var c = "$.ajaxf.callback('" + key + "','" + p["type"] + "')";
        var url = "";
        if (p["url"])
            url = p["url"];
        else
            url = this.defaults["url"];
        var method = 'get';
        if (p['method']) {
            if (p['method'] == 'post')
                method = 'post';
        }
        else {
            if (this.defaults['method'])
                method = this.defaults['method'];
        }
        var data = '';
        if (p['data'])
            data = p['data'];
        else {
            data = this.defaults['data'] ? this.defaults['data'] : data;
        }
        if (method == 'get' && data != '') {
            if (url.indexOf('?') == -1)
                url += '?' + data;
            else
                url += '&' + data;
            data = '';
        }
        var contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
        if (p['contentType'])
            contentType = p['contentType'];
        else
            contentType = this.defaults['contentType'] ? this.defaults['contentType'] : contentType;

        var h = new Array();
        if (this.defaults['header']) {
            for (var k in this.defaults['header']) {
                h.push(k);
                h.push(this.defaults['header'][k]);
            }

        }
        if (p['header']) {
            for (var k in p['header']) {
                h.push(k);
                h.push(p['header'][k]);
            }
        }
        $(flash).get(0).XmlHttp(url, c, method, data, contentType, h);
    }
    this.request = function(url, data, callback, type, method) {
        var p = new Object();
        if (method)
            p['method'] = method;
        if (url)
            p['url'] = url;
        if (data)
            p['data'] = data;
        if (callback)
            p['callback'] = callback;
        if (type)
            p['type'] = type;
        this.ajax(p);
    }
    this.get = function(url, data, callback, type) {
        this.request(url, data, callback, type, 'get');
    }
    this.getText = function(url, data, callback) { this.get(url, data, callback, 'text'); }
    this.getJSON = function(url, data, callback) { this.get(url, data, callback, 'json'); }
    this.getScript = function(url, data, callback) { this.get(url, data, callback, 'script'); }
    this.post = function(url, data, callback, type) { this.request(url, data, callback, type, 'post'); }
    this.postJSON = function(url, data, callback) { this.post(url, data, callback, 'json'); }
    this.postText = function(url, data, callback) { this.post(url, data, callback, 'text'); }
}
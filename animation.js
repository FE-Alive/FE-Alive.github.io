/**
 * Created by Zhi_LI on 2015/7/16.
 */
function Animate(el, prop, opts) {
    this.el = el;
    this.prop = prop;
    this.from = opts.from;
    this.to = opts.to;
    this.time = opts.time;
    this.callback = opts.callback;
    this.animDiff = this.to - this.from;
}

Animate.prototype._setStyle = function (val) {
    switch (this.prop) {
        case 'opacity':
            this.el.style[this.prop] = val;
            this.el.style.filter = 'alpha(opacity=' + val * 100 + ')';
            break;
        default:
            this.el.style[this.prop] = val + 'px';
            break;
    }
};

Animate.prototype._animate = function () {
    var that = this;
    this.now = new Date();
    this.diff = this.now - this.startTime;

    if (this.diff > this.time) {
        this._setStyle(this.to);

        if (this.callback) {
            this.callback.call(this);
        }
        clearInterval(this.timer);
        return;
    }

    this.percentage = (Math.floor((this.diff / this.time) * 100) / 100);
    this.val = (this.animDiff * this.percentage) + this.from;
    this._setStyle(this.val);
};

Animate.prototype.start = function () {
    var that = this;
    this.startTime = new Date();
    clearInterval(this.timer);
    this.timer = setInterval(function () {
        that._animate.call(that);
    }, 4);
};

Animate.canTransition = function () {
    var el = document.createElement('foo');
    el.style.cssText = '-webkit-transition: all .5s linear;';
    return !!el.style.webkitTransitionProperty;
}();

window.onload = function () {

    var intros = document.getElementById('intros');

    intros.addEventListener('mouseout', widthInit);

    var introEle = intros.children;
    for (i=0; i<introEle.length; i++){
        introEle[i].addEventListener('mouseover',widthIncrease);
    }
    function widthIncrease(e){
        target = getTarget(e);
        //if (target.tagName == 'LI'){
        var introEle = intros.children;
        for (i=0; i<introEle.length; i++){

            var fx = 'width', from = introEle[i].clientWidth,  time = 50;
            if(introEle[i] == this)
            {to = 400}
            else
            {to = 160}
            new Animate(introEle[i], fx, {from: from, to: to, time: time}).start();
        }
        //}
    }
    function widthInit(){
        console.log("out");
        //console.log(this.children)
        var introEle = intros.children;
        for (i=0; i<introEle.length; i++){
            var fx = 'width', from = introEle[i].clientWidth, to = 200, time = 50;
            new Animate(introEle[i], fx, {from: from, to: to, time: time}).start();
        }
    }
    function getTarget(e) {
        e = e || window.event;
        target = e.target || e.srcElement;
        return target
    }
};
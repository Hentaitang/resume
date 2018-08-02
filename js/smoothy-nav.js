!function () {
    var view = document.querySelector('nav.menu')
    var controller = {
        view: null,
        aTags: null,
        init: function (view) {
            this.view = view
            this.initAnimation()
            this.bindEvent()
        },
        initAnimation: function () {
            function animate(time) {
                requestAnimationFrame(animate);
                TWEEN.update(time);
            }
            requestAnimationFrame(animate)
        },
        scrollToElement: function (top) {
            let currentTop = window.scrollY
            let targetTop = top - 80
            let distance = targetTop - currentTop
            let t = (Math.abs(distance) / 100) * 300
            if (t > 500) { t = 500 }
            var coords = { y: currentTop };
            var tween = new TWEEN.Tween(coords)
                .to({ y: targetTop }, t)
                .easing(TWEEN.Easing.Quadratic.InOut)
                .onUpdate(function () {
                    window.scrollTo(0, coords.y);
                })
                .start();
        },
        bindEvent: function(){
            let aTags = this.view.querySelectorAll('ul > li > a')
            for (let i = 0; i < aTags.length; i++) {
                aTags[i].onclick = (x)=>{
                    x.preventDefault()
                    let top = document.querySelector(x.currentTarget.getAttribute('href')).offsetTop
                    this.scrollToElement(top)
                }
            }
        }
    }
    controller.init(view)
}.call()

!function () {
  var view = document.querySelector('#topNavBar')

  var controller = {
    view: null,
    init: function (view) {
      this.view = view
      this.bindEvent()
      // this.bindEvent.call(this)
    },
    bindEvent: function(){
      var view = this.view
      window.addEventListener('scroll', ()=>{
        if (window.scrollY > 0) {
          this.active()
        } else {
          this.deactive()
        }
      })
      //箭头函数没有this
    },
    active: function(){
      this.view.classList.add('sticky')
    },
    deactive: function(){
      this.view.classList.remove('sticky')
    }
  }
  controller.init(view)
  // controller.init.call(controller, view)
}.call()
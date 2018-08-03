!function () {
    var view = document.querySelector('#postMessageForm')
    var model = {
        // 获取数据
        fetch: function(){
            var query = new AV.Query('Message');
            return query.find() //promise 对象
        },
        //创建数据
        save: function(name, content){
            var Message = AV.Object.extend('Message')
            var message = new Message()
            return message.save({ //promise 对象
                'content': content,
                'name': name
            })
        }
    } 
    var controller = {
        view: null,
        List: null,
        model: null,
        init: function (view, model) {
            this.view = view
            this.model = model
            this.List = document.querySelector('#messageList')
            this.initAV()
            this.loadMessages()
            this.bindEvent()
        },
        initAV: function () {
            var APP_ID = 'YAfAvnNKQvFPx8lwYtfMYeLQ-gzGzoHsz'
            var APP_KEY = 'seTI8pTl24zG08rt1KAL3pL2'
            AV.init({ appId: APP_ID, appKey: APP_KEY })
        },
        loadMessages: function () {
            this.model.fetch().then((message) => {
                let array = message.map((item) => item.attributes)
                array.forEach((item) => {
                    let li = document.createElement('li')
                    li.innerText = `${item.name}: ${item.content}`
                    this.List.appendChild(li)
                })
            })
        },
        bindEvent: function () {
            this.view.addEventListener('submit', (e) => {
                e.preventDefault()
                this.saveMessage()
            })
        },
        saveMessage: function () {
            let myform = this.view
            let content = myform.querySelector('input[name=content]').value
            let name = myform.querySelector('input[name=name]').value
            this.model.save(name, content).then((object) => {
                let li = document.createElement('li')
                li.innerText = `${object.attributes.name}: ${object.attributes.content}`
                let List = document.querySelector('#messageList')
                List.append(li)
                myform.querySelector('input[name=name]').value = ''
                myform.querySelector('input[name=content]').value = ''
            })
        }
    }
    controller.init(view, model)

}.call()

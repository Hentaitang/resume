var APP_ID = 'YAfAvnNKQvFPx8lwYtfMYeLQ-gzGzoHsz';
var APP_KEY = 'seTI8pTl24zG08rt1KAL3pL2';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});
console.log("初始化完毕")



var query = new AV.Query('Message');
query.find().then(function (message) {
    let array = message.map((item)=> item.attributes )
    array.forEach((item)=>{
        let li = document.createElement('li')
        li.innerText = `${item.name}: ${item.content}`
        let List = document.querySelector('#messageList')
        List.append(li)
    })
})

let myForm = document.querySelector('#postMessageForm')

myForm.addEventListener('submit', function (e) {
    e.preventDefault()
    let content = myForm.querySelector('input[name=content]').value
    let name = myForm.querySelector('input[name=name]').value
    var Message = AV.Object.extend('Message')
    var message = new Message()
    message.save({
        'content': content,
        'name': name
    }).then(function (object) {
        let li = document.createElement('li')
        li.innerText = `${object.attributes.name}: ${object.attributes.content}`
        let List = document.querySelector('#messageList')
        List.append(li)
        myForm.querySelector('input[name=name]').value = ''
        myForm.querySelector('input[name=content]').value = ''
    })
})

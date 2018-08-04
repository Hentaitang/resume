!function(){
  // 添加 offset 类
  let specialTags = document.querySelectorAll('[data-x]')
  for(let i = 0; i < specialTags.length; i++){
    specialTags[i].classList.add('offset')
  }
  setTimeout(function(){findClosestAndRemoveOffset()}, 1700)    
  window.addEventListener('scroll', function(){
      findClosestAndRemoveOffset()
  })
  
  
  /* helper */
  function findClosestAndRemoveOffset(){
      let specialTags = document.querySelectorAll('[data-x]')
      let minindex = 0
      for(let i = 1; i < specialTags.length; i++){
        if(Math.abs(specialTags[i].offsetTop - window.scrollY) < Math.abs(specialTags[minindex].offsetTop - window.scrollY)){
          minindex = i
        }
      }
      // minindex就是离窗口顶部最近的元素
      specialTags[minindex].classList.remove('offset')
      specialTags[minindex].classList.add('comeUp')
      let id = specialTags[minindex].id
      let a = document.querySelector('a[href="#' + id + '"]')
      let li = a.parentNode
      let brothers = li.parentNode.children
      for(let i = 0; i < brothers.length; i++){
        brothers[i].classList.remove('highlight')
      }
      li.classList.add('highlight')
      if(window.scrollY === 0){
        li.classList.remove('highlight')
      }
  }
}.call()
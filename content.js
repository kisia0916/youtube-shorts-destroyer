const sleep = (ms)=>{
    return new Promise(resolve => setTimeout(resolve,ms))
}
let nowPath = window.location.href

const watch_page = ()=>{
    let deleteFlg = false
    let co = 0
    const targetDom = setInterval(()=>{
        const garbage = document.querySelectorAll("ytd-reel-shelf-renderer[modern-typography]")
        co+=1
        if (garbage.length == 0 && deleteFlg && co == 20){
            clearInterval(targetDom)
        }else if (garbage.length != 0 && deleteFlg){
            deleteFlg = false
        }
        if (garbage.length != 0){
            console.log(garbage.length)
            deleteFlg = true
            garbage.forEach((i)=>{
                i.remove()
            })
        }
    },100)
}
const home_page = ()=>{
    let deleteFlg = false
    let co = 0
    const targetDom = setInterval(()=>{
        const garbage = document.querySelectorAll('ytd-rich-grid-slim-media[is-short]')
        co+=1
        if (garbage.length == 0 && deleteFlg){
            clearInterval(targetDom)
        }else if (garbage.length != 0 && deleteFlg && co == 20){
            deleteFlg = false
        }
        if (garbage.length != 0){
            deleteFlg = true
            garbage.forEach((i)=>{
                i.remove()
            })
        }
    },100)
}

const observer = new MutationObserver(async()=>{
    if (nowPath != window.location.href && window.location.pathname == "/"){
        nowPath = window.location.href
        home_page()
        observer.observe(document.getElementById("content"), { childList: true, subtree: true })
        return
    }else if (nowPath != window.location.href && window.location.pathname == "/watch"){
        nowPath = window.location.href
        watch_page()
        observer.observe(document.getElementById("content"), { childList: true, subtree: true })
        return
    }else if(nowPath != window.location.href){
        nowPath = window.location.href
        observer.observe(document.getElementById("content"), { childList: true, subtree: true })
        return
    }
  })
window.onload = function(){
    if (window.location.pathname == "/"){
        home_page()
    }else if (window.location.pathname == "/watch"){
        watch_page()
    }
}
observer.observe(document.getElementById("content"), { childList: true, subtree: true })

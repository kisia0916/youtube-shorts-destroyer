const sleep = (ms)=>{
    return new Promise(resolve => setTimeout(resolve,ms))
}
window.onload = async function (){
    await sleep(1000)
    const garbage = document.querySelectorAll('ytd-rich-grid-slim-media[is-short]')
    garbage.forEach((i)=>{
        i.remove()
    })
}
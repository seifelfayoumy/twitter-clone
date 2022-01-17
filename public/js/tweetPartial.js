

var $likeTweetButtons = document.querySelectorAll('.likeTweet')

if($likeTweetButtons){
    console.log('wselttt')
    $likeTweetButtons.forEach(button =>{
        button.addEventListener('submit',(e)=>{
            e.preventDefault()
            console.log('wselt')
        }, true)
    })
}
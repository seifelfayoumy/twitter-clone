console.log('client-side javascript is loaded!')

const $profile = document.querySelector('#profile').innerHTML

fetch('/users/me',{
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
})
.then(response => response.json())
.then(data => {
    console.log('Success:', data)
    
    const html = Mustache.render($profile,{
        name: data.name,
        followers: data.followerCount,
        
    })
    document.querySelector('#profile').innerHTML = html
 })
.catch((error) => {
     console.error('Error:', error)
})







console.log('client-side javascript is loaded!')

var $signupForm = document.querySelector('#signupForm')
var $loginForm = document.querySelector('#loginForm')
var $getProfileButton = document.querySelector('#getProfile')
var $name = document.querySelector('#name')
var $username = document.querySelector('#username')
var $followerCount = document.querySelector('#followerCount')
var $followers = document.querySelector('#followers')
var $writeTweetButton = document.querySelector('#writeTweet')
var $profileDiv = document.querySelector('#profileDiv')
var $writeTweetDiv = document.querySelector('#writeTweetDiv')
var $writeTweetForm = document.querySelector('#writeTweetForm')
var $tweetResult = document.querySelector('#tweetResult')
var $logout = document.querySelector('#logout')
var $likeTweetButtons = document.querySelectorAll('.likeTweet')
var $removeLikeTweetButtons = document.querySelectorAll('.removeLikeTweet')
var $followButton = document.querySelector('#followButton')
var $unfollowButton = document.querySelector('#unfollowButton')
var $searchSomeoneDiv = document.querySelector('#searchSomeoneDiv')
var $searchSomeoneForm = document.querySelector('#searchSomeoneForm')
var $searchResult = document.querySelector('#searchResult')
var $searchSomeoneButton = document.querySelector('#searchSomeoneButton')


if($signupForm){
    $signupForm.addEventListener('submit',(e)=>{
        e.preventDefault()
    
        const name = e.target.elements.name.value
        const username = e.target.elements.username.value
        const email = e.target.elements.email.value
        const password = e.target.elements.password.value
    
        const user ={
            name,
            username,
            email,
            password
        }
        fetch('/users',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
    
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data)
          if(data.token){
            location.href = '/home'
          }
        })
        .catch((error) => {
          console.error('Error:', error)
        })
        
        
    })
}

if($loginForm){
    $loginForm.addEventListener('submit',(e)=>{
        e.preventDefault()
        
        const email = e.target.elements.email.value
        const password = e.target.elements.password.value
    
        const user ={
            
            email,
            password
        }
        fetch('/users/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
    
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data)
          if(data.token){
            location.href = '/home'
          }
        })
        .catch((error) => {
          console.error('Error:', error)
        })
        
        
    })
}

if($getProfileButton){
    $getProfileButton.addEventListener('submit',(e)=>{
        
        e.preventDefault()

        $profileDiv.style.display = "block"
        $writeTweetDiv.style.display = "none"
        $searchSomeoneDiv.style.display = "none"

        $name.textContent = ''
        $followerCount.textContent = ''
        $username.textContent = ''

        fetch('/users/me',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data)
            
            $name.textContent =  'Name: ' + data.name
            $followerCount.textContent = 'Followers: ' + data.followers.count
            $username.textContent = 'Username: ' + data.username
            console.log(data.followedBy)

            // var node 
            // var textnode 
            // data.followedBy.array.forEach(element => {
            //     node = document.createElement("LI");
            //     textnode = document.createTextNode(element);
            //     node.appendChild(textnode);                              // Append the text to <li>
            //     $followers.appendChild(node);
            // });

            
             
         })
        .catch((error) => {
             console.error('Error:', error)
             
        })
    })
}

if($writeTweetButton){
    $writeTweetButton.addEventListener('submit',(e)=>{
        e.preventDefault()

        $tweetResult.textContent = ''

        $writeTweetDiv.style.display = "block"
        $profileDiv.style.display = "none"
        $searchSomeoneDiv.style.display = "none"
    })
}

if($writeTweetForm){
    $writeTweetForm.addEventListener('submit', (e)=>{
        e.preventDefault()

        $tweetResult.textContent = ''

        const text = e.target.elements.tweet.value

        fetch('/tweets',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({text})
    
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data)
          $tweetResult.textContent = 'tweet posted!'
        })
        .catch((error) => {
          console.error('Error:', error)
          $tweetResult.textContent = 'cant post tweet'
        })
    })
}

if($searchSomeoneButton){
    $searchSomeoneButton.addEventListener('submit',(e)=>{
        e.preventDefault()

        $searchResult.textContent = ''

        $searchSomeoneDiv.style.display = "block"
        $writeTweetDiv.style.display = "none"
        $profileDiv.style.display = "none"
    })
}
if($searchSomeoneForm){
    $searchSomeoneForm.addEventListener('submit', (e)=>{
        e.preventDefault()

        $searchResult.textContent = ''

        const username = e.target.elements.username.value

        fetch('/users/' + username,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            
    
        })
        .then(response => {
            if(response.ok){
                location.href = '/people/' + username
            }
            else{
                throw new error()
            }
        })
        .then(data => {
          console.log('Success:', data)
          
        })
        .catch((error) => {
          console.error('Error:', error)
          $searchResult.textContent = 'user not found'
        })
    })
}

if($logout){
    $logout.addEventListener('submit',(e)=>{
        e.preventDefault()

        fetch('/users/logout',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(data => {
          console.log('Success:', data)
          location.href = '/'
        })
        .catch((error) => {
         console.error('Error:', error)
        
        })
    })
}


if($likeTweetButtons){
    
    $likeTweetButtons.forEach(button =>{
        button.addEventListener('submit',(e)=>{
            e.preventDefault()
            
            
            fetch('/tweets/' + e.target.elements.tweetID.textContent.trim() +'/like',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                if(response.ok){
                    response.json()
                }else{
                    throw new error()
                }
            })
            .then(data => {
            console.log('Success:', data)
            window.location.reload()
            
            })
            .catch((error) => {
            console.error('Error:', error)
            location.href = '/'
            })
    })
})
}

if($removeLikeTweetButtons){
    $removeLikeTweetButtons.forEach(button =>{
        button.addEventListener('submit',(e)=>{
            e.preventDefault()
            
            
            fetch('/tweets/' + e.target.elements.tweetID.textContent.trim() +'/unlike',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                if(response.ok){
                    response.json()
                }else{
                    throw new error()
                }
            })
            .then(data => {
            console.log('Success:', data)
            window.location.reload()
            
            })
            .catch((error) => {
            console.error('Error:', error)
            location.href = '/'
            })
    })
})
}

if($followButton){
        $followButton.addEventListener('submit',(e)=>{
            e.preventDefault()
            
            
            fetch('/users/follow/' + e.target.elements.userUsername.textContent.trim() ,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                if(response.ok){
                    response.json()
                }else{
                    throw new error()
                }
            })
            .then(data => {
            console.log('Success:', data)
            window.location.reload()
            
            })
            .catch((error) => {
            console.error('Error:', error)
            location.href = '/home'
            })
    
})
}

if($unfollowButton){
    $unfollowButton.addEventListener('submit',(e)=>{
        e.preventDefault()
        
        
        fetch('/users/unfollow/' + e.target.elements.userUsername.textContent.trim() ,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if(response.ok){
                response.json()
            }else{
                throw new error()
            }
        })
        .then(data => {
        console.log('Success:', data)
        window.location.reload()
        
        })
        .catch((error) => {
        console.error('Error:', error)
        location.href = '/'
        })

})
}
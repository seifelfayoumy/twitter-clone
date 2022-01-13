


console.log('client-side javascript is loaded!')

var $signupForm = document.querySelector('#signupForm')
var $loginForm = document.querySelector('#loginForm')
var $getProfileButton = document.querySelector('#getProfile')
var $name = document.querySelector('#name')
var $username = document.querySelector('#username')
var $followerCount = document.querySelector('#followerCount')
var $followingCount = document.querySelector('#followingCount')
var $bio = document.querySelector('#bio')
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
var $changePassButton = document.querySelector('#changePassButton')
var $changeNameButton = document.querySelector('#changeNameButton')
var $changeUsernameButton = document.querySelector('#changeUsernameButton')
var $changeBioButton = document.querySelector('#changeBioButton')
var $changePassDiv = document.querySelector('#changePassDiv')
var $changeNameDiv = document.querySelector('#changeNameDiv')
var $changeUsernameDiv = document.querySelector('#changeUsernameDiv')
var $changeBioDiv = document.querySelector('#changeBioDiv')
var $changePassForm = document.querySelector('#changePassForm')
var $changeNameForm = document.querySelector('#changeNameForm')
var $changeUsernameForm = document.querySelector('#changeUsernameForm')
var $changeBioForm = document.querySelector('#changeBioForm')
var $changePassResult = document.querySelector('#changePassResult')
var $changeNameResult = document.querySelector('#changeNameResult')
var $changeUsernameResult = document.querySelector('#changeUsernameResult')
var $changeBioResult = document.querySelector('#changeBioResult')
var $timelineDiv = document.querySelector('#timeline')



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
        $changePassDiv.style.display = "none"
        $changeNameDiv.style.display = "none"
        $changeUsernameDiv.style.display = "none"
        $changeBioDiv.style.display = "none"
        $timelineDiv.style.display = "none"
        

        $name.textContent = ''
        $followerCount.textContent = ''
        $followingCount.textContent = ''
        $username.textContent = ''
        $bio.textContent = ''

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
            $followingCount.textContent = 'Following: ' + data.following.count
            $username.textContent = 'Username: ' + data.username
            $bio.textContent = 'Bio: no bio'
            if(data.bio){
                $bio.textContent = 'Bio: ' + data.bio
            }
            
            

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

if($changePassButton){
    $changePassButton.addEventListener('submit',(e)=>{
        e.preventDefault()

        $changePassDiv.style.display = "block"
        $changeNameDiv.style.display = "none"
        $changeUsernameDiv.style.display = "none"
        $changeBioDiv.style.display = "none"
        $timelineDiv.style.display = "none"
    })
}
if($changeNameButton){
    $changeNameButton.addEventListener('submit',(e)=>{
        e.preventDefault()

        $changePassDiv.style.display = "none"
        $changeNameDiv.style.display = "block"
        $changeUsernameDiv.style.display = "none"
        $changeBioDiv.style.display = "none"
        $timelineDiv.style.display = "none"
    })
}
if($changeUsernameButton){
    $changeUsernameButton.addEventListener('submit',(e)=>{
        e.preventDefault()

        $changePassDiv.style.display = "none"
        $changeNameDiv.style.display = "none"
        $changeUsernameDiv.style.display = "block"
        $changeBioDiv.style.display = "none"
        $timelineDiv.style.display = "none"
    })
}
if($changeBioButton){
    $changeBioButton.addEventListener('submit',(e)=>{
        e.preventDefault()

        $changePassDiv.style.display = "none"
        $changeNameDiv.style.display = "none"
        $changeUsernameDiv.style.display = "none"
        $changeBioDiv.style.display = "block"
        $timelineDiv.style.display = "none"
    })
}

if($changePassForm){
    $changePassForm.addEventListener('submit',(e)=>{
        e.preventDefault()

        $changePassResult.textContent = ''

        const newPass = e.target.newPass.value

        fetch('/users/me/password',{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({newPassword : newPass})
    
        })
        .then(response => {
            if(response.ok){
                response.json()
            }
            else{
                throw new error()
            }
        })
        .then(data => {
          console.log('Success:', data)
          $changePassResult.textContent = 'password changed successfully'
        })
        .catch((error) => {
          console.error('Error:', error)
          $changePassResult.textContent = 'cant change password'
        })
    })
}

if($changeNameForm){
    $changeNameForm.addEventListener('submit',(e)=>{
        e.preventDefault()

        $changeNameResult.textContent = ''

        const newName = e.target.newName.value

        fetch('/users/me/name',{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({newName : newName})
    
        })
        .then(response => {
            if(response.ok){
                response.json()
            }
            else{
                throw new error()
            }
        })
        .then(data => {
          console.log('Success:', data)
          $changeNameResult.textContent = 'name changed successfully'
        })
        .catch((error) => {
          console.error('Error:', error)
          $changeNameResult.textContent = 'cant change name'
        })
    })
}

if($changeUsernameForm){
    $changeUsernameForm.addEventListener('submit',(e)=>{
        e.preventDefault()

        $changeUsernameResult.textContent = ''

        const newUsername = e.target.newUsername.value

        fetch('/users/me/username',{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({newUsername : newUsername})
    
        })
        .then(response => {
            if(response.ok){
                response.json()
            }
            else{
                throw new error()
            }
        })
        .then(data => {
          console.log('Success:', data)
          $changeUsernameResult.textContent = 'username changed successfully'
        })
        .catch((error) => {
          console.error('Error:', error)
          $changeUsernameResult.textContent = 'cant change username'
        })
    })
}
if($changeBioForm){
    $changeBioForm.addEventListener('submit',(e)=>{
        e.preventDefault()

        $changeBioResult.textContent = ''

        const newBio = e.target.newBio.value

        fetch('/users/me/Bio',{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({newBio})
    
        })
        .then(response => {
            if(response.ok){
                response.json()
            }
            else{
                throw new error()
            }
        })
        .then(data => {
          console.log('Success:', data)
          $changeBioResult.textContent = 'bio changed successfully'
        })
        .catch((error) => {
          console.error('Error:', error)
          $changeBioResult.textContent = 'cant change bio'
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
        $timelineDiv.style.display = "none"
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
        $timelineDiv.style.display = "none"
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

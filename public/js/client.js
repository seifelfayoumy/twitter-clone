

console.log('client-side javascript is loaded!')

const $signupForm = document.querySelector('#signupForm')
const $loginForm = document.querySelector('#loginForm')
const $getProfileButton = document.querySelector('#getProfile')
const $name = document.querySelector('#name')
const $followerCount = document.querySelector('#followerCount')
const $followers = document.querySelector('#followers')
const $writeTweetButton = document.querySelector('#writeTweet')
const $profileDiv = document.querySelector('#profileDiv')
const $writeTweetDiv = document.querySelector('#writeTweetDiv')
const $writeTweetForm = document.querySelector('#writeTweetForm')
const $tweetResult = document.querySelector('#tweetResult')
const $logout = document.querySelector('#logout')
const likeTweetButton = document.querySelector('likeTweet')


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
        console.log('wselt')
        e.preventDefault()

        $profileDiv.style.display = "block"
        $writeTweetDiv.style.display = "none"

        $name.textContent = ''
        $followerCount.textContent = ''

        fetch('/users/me',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data)
            
            $name.textContent =  'Name : ' + data.name
            $followerCount.textContent = 'Followers : ' + data.followerCount
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

if(likeTweetButton){
    console.log('wselt')
    likeTweetButton.addEventListener('submit',(e)=>{
        e.preventDefault()

        // fetch('/tweets/' + e.target.elements.tweetID.textContent +'like',{
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // })
        // .then(data => {
        //   console.log('Success:', data)
          
        // })
        // .catch((error) => {
        //  console.error('Error:', error)
        //  location.href = '/'
        
        // })

        console.log(e.target.elements.tweetID.textContent)
    })
}

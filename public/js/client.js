console.log('client-side javascript is loaded!')

const $signupForm = document.querySelector('#signupForm')
const $loginForm = document.querySelector('#loginForm')
const $getProfileButton = document.querySelector('#getProfile')
const $name = document.querySelector('#name')
const $followerCount = document.querySelector('#followerCount')

if($signupForm){
    $signupForm.addEventListener('submit',(e)=>{
        e.preventDefault()
    
        const name = e.target.elements.name.value
        const email = e.target.elements.email.value
        const password = e.target.elements.password.value
    
        const user ={
            name,
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
            if(data.name && data.followerCount){
                $name.textContent = data.name
                $followerCount.textContent = data.followerCount
            }
            else{
                $name.textContent = ''
                $followerCount.textContent = ''
            }
            
            
         })
        .catch((error) => {
             console.error('Error:', error)
             
        })
    })
}


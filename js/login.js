// let url = 'http://127.0.0.1:8000/'
// const url = `https://pos-on-vercel-pn9h.vercel.app/`


const handleLogin=(e)=>{
    e.preventDefault()
    document.getElementById('login_spin').classList.replace('d-none','d-inline')
    username = getValue('username')
    password = getValue('password')

    fetch(url+'account/login/',{
        method:'POST',
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify({'username':username,'password':password})
    })
    .then(r=>r.json())
    .then(data=>{
        console.log(data)
        if(data?.password){
            document.getElementById('password_helpId').innerText=data?.password
            document.getElementById('password').classList.add('is-invalid')
            document.getElementById('login_spin').classList.replace('d-inline','d-none')

        }
        else if(data?.username){
            document.getElementById('username_helpId').innerText=data?.username
            document.getElementById('username').classList.add('is-invalid')
            document.getElementById('login_spin').classList.replace('d-inline','d-none')

        }
        else if(data?.type=='success'){
            console.log(data)
            sessionStorage.setItem('user_id',data.user)
            window.location.href='content.html'
            document.getElementById('login_spin').classList.replace('d-inline','d-none')
        }
        
    
    })

}


document.getElementById('username').addEventListener('focus',(event)=>{
    event.target.classList.remove('is-invalid')
})
document.getElementById('password').addEventListener('focus',(event)=>{
    event.target.classList.remove('is-invalid')
})


// const getValue=(id)=>{
//     const value = document.getElementById(id).value
//     return value
// }
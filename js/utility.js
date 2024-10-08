// const url = `https://pos-on-vercel-pn9h.vercel.app/`
const url = `http://127.0.0.1:8000/`


const handleOnClickSelector=(e)=>{
    const list = e.target.parentNode.querySelectorAll('.menu_item')
    list.forEach(element => {
        if(element==e.target){
            e.target.classList.add('add_on_click')
        }
        else{
            element.classList.remove('add_on_click')
        }
    });
}

const getValue=(id)=>{
    const value = document.getElementById(id)
    return value.value
}

const current_user=()=>{
    return parseInt(sessionStorage.getItem('user_id'))
}
// Log out
const handleLogOut=()=>{
    fetch(url+'account/logout/')
    .then(r=>r.json())
    .then(d=>{
        console.log(d)
        sessionStorage.clear()
        window.location.href='index.html'
    })
}


const classChangeForSpinner=(oldCls,newCls)=>{
    console.log('from ba')
    document.getElementById('spinner_div').classList.replace(`${oldCls}`,`${newCls}`)
}
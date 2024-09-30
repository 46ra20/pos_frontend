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
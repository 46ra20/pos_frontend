const url = `https://pos-backend-1.onrender.com/`

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
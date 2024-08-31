const handleOwner=()=>{
    const parent = document.getElementById('canvas_details')
    const parentDiv = document.createElement('div')
    parentDiv.classList.add('d-flex','justify-content-around')
    parent.innerHTML=''
    for(let i=0;i<4;i++){
        const div = document.createElement('div')
        div.classList.add('border','rounded','p-3','gap-2','m-2')
        div.innerHTML=`
            <img src='' atl='No image available'>
            <div>
                <h2>Name: XXXXXX</h2>
                <h3>Designation: XXX</h3>
                <p>Education: XXXX</p>
            </div>
        `
        parentDiv.appendChild(div)
    }
    parent.append(parentDiv)
}
const handleReturns=async(event)=>{
    const parent = document.getElementById('canvas_details')
    parent.innerHTML = ''
    parent.classList.add('d-flex')
    parent.innerHTML=`
        <div class="col-6 border-end" id="add_returns_items"></div>
        <div class="col-6" id="returns_history"></div>
    `

    handleOnClickSelector(event)
}

const handleReturnsHistory=()=>{
    const returns_history=document.getElementById('returns_history')
    
}
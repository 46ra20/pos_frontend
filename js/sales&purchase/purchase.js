const handlePurchase=(event)=>{
    const parent = document.getElementById('canvas_details')
    parent.innerHTML = ''

    const div = document.createElement('div')
    div.innerHTML=`
        <div class="d-flex justify-content-center align-items-center"><h1 class='fw-bold fst-italic'>Upcoming....</h1></div>
    `
    parent.append(div)
    handleOnClickSelector(event)
}

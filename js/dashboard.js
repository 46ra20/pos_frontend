const handleDashboard=(e)=>{
    const parent = document.getElementById('canvas_details')
    parent.innerHTML=''
    const list = ['Daily','Weekly','Monthly','Yearly','Total']
    const colorList = ['bg-primary','bg-warning','bg-danger','bg-warning']
    const wordList = ['Profit','Outstanding','Loss','Damage']

    const d = document.createElement('div')
    d.classList.add('border-bottom','p-3','d-flex','justify-content-end')
    d.innerHTML=`
    <from class="d-flex align-items-center gap-2">
        <input type="date"  class="p-2 border rounded" id='date_i' data-date-format="DD MMMM YYYY">
        <input type="submit" value="show" class="btn btn-primary">
    </from>
    `
    parent.append(d)
    setTime()

    for(let i=0;i<5;i++){
        const div=document.createElement('div')
        // div.style="border:1px solid black;weight:100px;height:100px"
        div.classList.add('d-flex','gap-2','mx-auto','my-2','justify-content-around')
        const h2=document.createElement('h2')
        h2.innerText=list[i]
        h2.classList.add('fw-bold','mt-2')
        parent.append(h2)


        for(let j=0;j<4;j++){
            const childDiv = document.createElement('div')
            childDiv.style="border:1px solid black;width:200px;height:100px"
            childDiv.classList.add('border','mb-2','p-3','rounded-pill',colorList[j])

            childDiv.innerHTML=`
                <h3 class="text-center fw-bold text-white">${wordList[j]}</h3>
                <p class="text-center fw-bold text-white">0</p>
            `
            div.appendChild(childDiv)
        }
        parent.append(div)
    }
    // console.log()
    handleOnClickSelector(e)
}


const valueCard=(id)=>{
    for(let j=0;j<3;j++){

    }
}


const setTime=()=>{
    const dt = new Date().toISOString().substring(0,10)
    const dateField = document.getElementById('date_i')
    dateField.value = dt
    document.getElementById('date_i').value=dt
    dateField.max=dt
}

// document.getElementById('date_i').max=`${date.getFullYear()}-${date.getMonth}-${date.getDate}`

// const d = document.getElementById('date_i')
// d.value=new Date().toISOString().substring(0,10)

// handleDashboard()
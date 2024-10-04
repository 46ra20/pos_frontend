const handleDashboard=async(e)=>{
    const parent = document.getElementById('canvas_details')
    parent.innerHTML=''
    classChangeForSpinner('d-none','d-flex')


    const d = document.createElement('div')
    d.classList.add('border-bottom','p-3','d-flex','justify-content-end')
    d.innerHTML=`
    <from class="d-flex align-items-center gap-2">
        <input type="date"  class="p-2 border rounded" id='date_i' data-date-format="DD/MM/YYYY">
        <input type="submit" value="show" class="btn btn-primary" onclick="handleDataBasedOnDate()">
    </from>
    `
    parent.append(d)
    setTime()
    const showDetails = document.createElement('div')
    showDetails.id="show_details"
    await parent.append(showDetails)
    await handleDataBasedOnDate()
    // console.log()
    
    handleOnClickSelector(e)
}


const handleDataBasedOnDate=async()=>{
    classChangeForSpinner('d-none','d-flex')

    let date = document.getElementById('date_i').value
    let newDate=new Date(date)
    const list = ['Daily','Monthly','Yearly','Total']
    const colorList = ['bg-primary','bg-danger','bg-warning']
    const wordList = ['Profit','Loss','Damage']
        
    const showDetails=document.getElementById('show_details')
    showDetails.innerHTML=''
    showDetails.classList.add('col-11','mx-auto')
    for(let i=0;i<4;i++){
        const div=document.createElement('div')
        // div.style="border:1px solid black;weight:100px;height:100px"
        div.classList.add('d-flex','gap-2','mx-auto','my-3','justify-content-around')
        const h2=document.createElement('h2')
        h2.innerText=list[i]
        h2.classList.add('fw-bold','mt-4','mb-2')
        showDetails.append(h2)
        await fetch(url+'dashboard/pld/'+`${newDate.toISOString()}/${i}/`)
            .then(r=>r.json())
            .then(d=>{
                const rowDiv = document.createElement('div')
                rowDiv.classList.add('d-flex','justify-content-between','col-10')

                rowDiv.innerHTML=`
                    <div class="border mb-2 p-3 rounded-pill bg-primary" style="border:1px solid black;width:200px;height:100px">
                        <h3 class="text-center fw-bold text-white">Profit</h3>
                        <p class="text-center fw-bold text-white">
                                ${d['profit']}
                        </p>
                    </div>
                    <div class="border mb-2 p-3 rounded-pill bg-danger" style="border:1px solid black;width:200px;height:100px">
                        <h3 class="text-center fw-bold text-white">LOSS</h3>
                        <p class="text-center fw-bold text-white">
                                ${d['loss']}
                        </p>
                    </div>
                    <div class="border mb-2 p-3 rounded-pill bg-warning" style="border:1px solid black;width:200px;height:100px">
                        <h3 class="text-center fw-bold text-white">Damage</h3>
                        <p class="text-center fw-bold text-white">
                                ${d['damage']}
                        </p>
                    </div>
                `
                
                div.appendChild(rowDiv)
            showDetails.append(div)
        })
    }
    classChangeForSpinner('d-flex','d-none')

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
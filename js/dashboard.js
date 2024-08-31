const handleDashboard=()=>{
    const parent = document.getElementById('canvas_details')
    parent.innerHTML=''
    const list = ['Daily','Weekly','Monthly','Yearly','Total']
    const colorList = ['bg-primary','bg-danger','bg-warning']
    const wordList = ['Profit','Loss','Damage']

    for(let i=0;i<5;i++){
        const div=document.createElement('div')
        // div.style="border:1px solid black;weight:100px;height:100px"
        div.classList.add('d-flex','gap-2','mx-auto','my-2','justify-content-around')
        const h2=document.createElement('h2')
        h2.innerText=list[i]
        h2.classList.add('fw-bold','mt-2')
        parent.append(h2)


        for(let j=0;j<3;j++){
            const childDiv = document.createElement('div')
            childDiv.style="border:1px solid black;width:180px;height:100px"
            childDiv.classList.add('border','p-3','rounded-pill',colorList[j])

            childDiv.innerHTML=`
                <h3 class="text-center fw-bold text-white">${wordList[j]}</h3>
                <p class="text-center fw-bold text-white">0</p>
            `
            div.appendChild(childDiv)
        }
        parent.append(div)
    }
    // console.log()
}


const valueCard=(id)=>{
    for(let j=0;j<3;j++){

    }
}

handleDashboard()
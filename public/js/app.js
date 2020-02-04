




const webForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')





webForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = search.value
   // console.log(location)
   messageOne.textContent='Loading'
   messageOne.textContent=''
   fetch('/weather?address='+location+'').then((response) =>{
    response.json().then((data)=>{
        if(data.error)
        {
           
            messageOne.textContent=data.error

        }else{
            
            
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast
        }
    })
})


})

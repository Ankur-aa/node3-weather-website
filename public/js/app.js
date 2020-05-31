
const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageone=document.querySelector('#message-1')
const messagetwo=document.querySelector('#message-2')




weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    messageone.textContent = 'loading!'
    
fetch('/weather?location='+ search.value).then((response)=>{
   
    response.json().then((data)=>{
        if(data.error){
            messageone.textContent = data.error
        }
        else{
            messageone.textContent = data.location
            messagetwo.textContent= data.forecast
        }
    })
})
})

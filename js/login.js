import data from '../data.json' assert{'type': 'json'};


const btn = document.querySelector('#login')
btn.addEventListener('click', (event) =>{
    event.preventDefault()
    
    const user = document.getElementById('user').value
    const password = document.getElementById('password').value

    const login = data.find((obj)=> obj.usuario === user && obj.senha === password)

    if(login){
        window.location = './home.html'
    }else{
        alert('Usuário não encontrado')
    }
})

document.getElementById('way-home').addEventListener('click', () => {
    window.location.href = './pages/home.html'
})
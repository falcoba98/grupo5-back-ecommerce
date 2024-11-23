/*desafiate*/
const alertPlaceholder = document.getElementById('liveAlertPlaceholder')

const appendAlert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible alert-fixed" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}

document.addEventListener("DOMContentLoaded", function() { 

    document.getElementById("iniciarSesion").addEventListener("click", function() {

        let email = document.getElementById("email").value;
        let contraseña = document.getElementById("password").value;
        
        if(!email){
            appendAlert('El campo e-mail no puede estar vacío.', 'danger')
            return
        }

        if(!contraseña){
            appendAlert('El campo contraseña no puede estar vacío.', 'danger')
            return
        }

        if (email) {
            window.localStorage.setItem("email", email)
           window.location.href="index.html"
        }       
})

})
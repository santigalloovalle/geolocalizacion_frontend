import Swal from 'sweetalert2';

export const alert = (title, message, icon) =>{
    Swal.fire({
      title: title,
      html: message,
      timer: 2000,
      icon: icon
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
}
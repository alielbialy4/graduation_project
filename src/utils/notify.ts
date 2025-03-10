import Swal from 'sweetalert2';

const showNotification = (message: string, type: 'success' | 'error') => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    showCloseButton: true,
    timer: 5000,
    timerProgressBar: true,
    customClass: {
      container: 'mt-20'
    },
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  Toast.fire({
    icon: type,
    title: message
  });
};

export default showNotification;

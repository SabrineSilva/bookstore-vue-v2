import Swal from 'sweetalert2';

export function showAlertToast(type, message) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
    });

    if (type === 'success') {
        Toast.fire({
            icon: 'success',
            title: message
        });
    }
    if (type === 'error') {
        Toast.fire({
            icon: 'error',
            title: message
        });
    }
}

export async function showAlertRemove(action, item) {
    const removeAlert = await Swal.fire({
        icon: 'warning',
        title: `Você realmente deseja excluir "${item}"?`,
        showCancelButton: true,
        showConfirmButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Confirmar',
        reverseButtons: true,
        cancelButtonColor: '#f26878',
        confirmButtonColor: '#496dd1'
    });

    if (removeAlert.isDismissed) {
        showAlertToast('success', 'A ação foi cancelada');
    } else if (removeAlert.isConfirmed) {
        action();
    }
}

export async function showAlertError(titleError, messageError) {
    await Swal.fire({
        icon: 'error',
        title: titleError,
        text: messageError
    });
}

export async function showAlertReturn(action) {
    const removeAlert = await Swal.fire({
        icon: 'warning',
        title: 'Dar baixa neste aluguel?',
        showCancelButton: true,
        showConfirmButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Confirmar',
        reverseButtons: true,
        cancelButtonColor: '#f26878',
        confirmButtonColor: '#496dd1'
    });

    if (removeAlert.isDismissed) {
        showAlertToast('error', 'A ação foi cancelada');
    } else if (removeAlert.isConfirmed) {
        action();
    }
}

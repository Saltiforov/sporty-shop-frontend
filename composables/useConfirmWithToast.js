import {useToast} from 'primevue/usetoast'
import {useConfirm} from 'primevue/useconfirm'

export function useConfirmWithToast() {
    const toast = useToast()
    const confirm = useConfirm()

    const confirmAction = ({
                               message = 'Are you sure?',
                               header = 'Confirmation',
                               icon = 'pi pi-exclamation-triangle',
                               acceptLabel = 'Yes',
                               rejectLabel = 'No',
                               acceptAction = () => {
                               },
                               toastMessages = {
                                   accept: {severity: 'info', summary: 'Confirmed', detail: 'You accepted', life: 3000},
                                   reject: {
                                       severity: 'warn',
                                       summary: 'Cancelled',
                                       detail: 'You cancelled',
                                       life: 3000
                                   },
                               }
                           }) => {
        confirm.require({
            message,
            header,
            icon,
            rejectProps: {
                label: rejectLabel,
                severity: 'secondary',
                outlined: true
            },
            acceptProps: {
                label: acceptLabel
            },
            accept: () => {
                acceptAction()
                toast.add(toastMessages.accept)
            },
            reject: () => {
                toast.add(toastMessages.reject)
            }
        })
    }

    return {
        confirmAction
    }
}

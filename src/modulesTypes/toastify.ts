import { toast, ToastContent, ToastOptions } from "react-toastify";

export type ShowToastType = {
    content: ToastContent,
    options?: ToastOptions
}
export const showToast = (parameters: ShowToastType) => toast(parameters.content, parameters.options);
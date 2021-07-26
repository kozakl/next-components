export const DELETE_TOAST = 'deleteToast';

export function deleteToast(id:number):DeleteToast {
    return {type: DELETE_TOAST, id}
}

export interface DeleteToast {
    type:typeof DELETE_TOAST;
    id:number;
}

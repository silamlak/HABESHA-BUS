export const c_e_h = (status, message) => {
    const error = new Error()
    error.message = message
    error.status = status
    return error
}
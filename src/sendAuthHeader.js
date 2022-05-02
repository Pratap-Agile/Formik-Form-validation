  const config = {
    'Content-Type': 'application/json',
    'Authorization': 'auth-token' + localStorage.getItem('auth-token')
}
export {config};
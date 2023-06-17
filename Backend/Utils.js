
function isValid (data) {
    // || data.trim().length ==0
    if(typeof data !== "string"|| data.trim().length ==0) return false
    else return true
}

function validString(input){
    return (/^[a-zA-Z]+$/.test(input))
}

const validateEmail = (email) => {
    return email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/);
};


const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,15}$/;
    return passwordRegex.test(password);
};
const trim=(longURL)=>{
    return  longURL.trim()
}

const validPhone=(phone)=>{
   const phoneRegix=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/ 
   return phoneRegix.test(phone)
}
const validPin=(pincode)=>{
    const pinco=/^\d{6}$/
    return pinco.test(pincode)
}

module.exports= {isValid,validString,validateEmail,isValidPassword,trim,validPhone,validPin}
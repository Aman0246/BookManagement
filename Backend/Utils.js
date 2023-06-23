
function isValid (data) {
    // || data.trim().length ==0
    if(typeof data !== "string") return false
    else return true
}
 let isValidDate=(date)=>{
    return (/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/i.test(date))
 }
// function validString(input){
//     return (/^[a-zA-Z]+$/.test(input))
// }
function validString(input){
    return (/^[a-z ,.'-]+$/i.test(input))
}

const validateEmail = (email) => {
    return email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/);
};


const isValidPassword = (password) => {
   

    // const passwordRegex =(/^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,15}$/);
    const passwordRegex =(/^.{8,15}$/);
    return passwordRegex.test(password);
};
const trim=(longURL)=>{
    return  longURL.trim()
}

const validPhone=(phone)=>{
   const phoneRegix=(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/) 
   return phoneRegix.test(phone)
}
const validPin=(pincode)=>{
    const pinco=/^\d{6}$/
    return pinco.test(pincode)
}

const ValidISBN=(isbn)=>{
    return (/^(?:ISBN(?:-1[03])?:? )?(?=[-0-9Xx]{17}$|[-0-9Xx]{13}$|[0-9Xx]{10}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?(?:[0-9]+[- ]?){2}[0-9Xx]$/i.test(isbn))
}

module.exports= {isValid,validString,validateEmail,isValidPassword,trim,validPhone,validPin,ValidISBN,isValidDate}
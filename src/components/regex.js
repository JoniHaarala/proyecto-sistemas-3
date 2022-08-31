export const userRegex= new RegExp(/^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/);
    //Regex for a normal ad basic email entry with contains letters, numbers and . front of, only 1 @ and 1 direction (ex: .com, .es) 
export const mailRegex= new RegExp(/^[a-zA-Z0-9+.]@[a-z].[a-z]{2,3}/);
    //Regex to validate a [8 to 15 characters password which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character]
export const passRegex= new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/);
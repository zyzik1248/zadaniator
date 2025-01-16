const API_URL = "http://20.33.68.96/api";

console.log(process.env)
export const register = async ({username, password, email}: register)=>{
    try{
        const resp = await fetch(`${API_URL}/register/`, {
            method: "POST",
            body: JSON.stringify({username,password,email})
        })

        return resp
    } catch(error){
        throw new Error(error)
    }
}
export const get_headers = (token?: string) => {   
    if (token) {
        return {
            "Content-Type": "application/json",  
            "Authorization": "Bearer " + token,
        };
    } else {
        return {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token"),
        };
    }  
};
  
export const get_form_headers = () => ({
    "Content-Type": "multipart/form-data",
    "Authorization": "Bearer " + localStorage.getItem("token"),
});
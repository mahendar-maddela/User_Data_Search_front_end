import axios from 'axios'

// const BaseUrl1 ="http://localhost:3000/users";
const BaseUrl1 = "http://localhost:8080/api/v1/users";
// const BaseUrl2 = "http://localhost:8080/api2/v1/users";
// const BaseUrl3 = "http://localhost:8080/api3/v1/users"; 

class UserData {

    postData(data){

        return axios.post(BaseUrl1,data)
    }
    GetData(){ 
        return axios.get(BaseUrl1)
    }
    
    getById(id){
        return axios.get(BaseUrl1+'/'+id)
    }

    EditData(user,id){
         return axios.put(BaseUrl1+'/'+user,id)
    }

    DeleteData(id){
        return axios.delete(BaseUrl1+'/'+id)
    }

}
export default new UserData();
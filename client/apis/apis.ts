import axios from "axios"
import { Alert } from "react-native"

class ServerRequest {
    private url: string = 'http://10.200.10.2:3000/'

    public getData = async (resource: string) => {
        try {
            const res = await axios.get(this.url + resource)
            if (res.status === 200) {
                return res.data
            }

        } catch (error) {
            if (error instanceof Error)
               return //return Alert.alert(error.message)
            else
                return Alert.alert("Something Seriously went wrong!")
        }
    }
    public deleteData = async (resource: string, id: string) => {
        try {
            const res = await axios.delete(this.url + resource + '/' + id)
            if (res.status === 200) {
                return true
            } else {
                return false
            }
        } catch (error) {
            if (error instanceof Error)
                return Alert.alert(error.message)
            else
                return Alert.alert("Something Seriously went wrong!")
        }
    }
    public isAUser = async (email: string) => {
        try {
          const res = await axios.get(this.url + `users/?email=${email}`);
          if(res.status === 200 && res.data.length > 0){
            return true;
          }
        } catch (error) {
            if (error instanceof Error)
                return Alert.alert(error.message)
            else
                return Alert.alert("Something Seriously went wrong!")
        }
        return false;
      }

      public PostData = async (resource: string, data: unknown) => {
        try {
            const res = await axios.post(this.url + resource, data )
            if (res.status === 201) {
                return true
            } else {
                return false
            }
        } catch (error) {
            if (error instanceof Error)
                return Alert.alert(error.message)
            else
                return Alert.alert("Something Seriously went wrong!")
        }
    }

    public EditData = async (resource: string, id:string, data: unknown) => {
        try {
            const res = await axios.put(this.url + resource + '/' + id, data )
            if (res.status === 200) {
                return true
            } else {
                return false
            }
        } catch (error) {
            if (error instanceof Error)
                return Alert.alert(error.message)
            else
                return Alert.alert("Something Seriously went wrong!")
        }
    }


}

const SendRequest = new ServerRequest();

export default SendRequest;
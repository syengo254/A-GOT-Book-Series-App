import { useEffect, useState } from 'react';
import axios from 'axios';

const useBooks = ( url, params='' ) => {
    const [ error, setError ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ msg, setMsg ] = useState('');
    const [ pagination, setPagination ] = useState({});
    const [ data, setData ] = useState([]);

    async function getBooks() {
        if(params !== ''){
            let urlParams = '?';
    
            for(const k in params){
                urlParams += `${k}=${params[k]}&`;
            }
            
            urlParams = urlParams.substring(0, urlParams.length - 1);
            url += urlParams;
        }
    
        setLoading(true);
    
        try {
            const action = await axios.get(`${url}`);
            const { success, data, message, pages } = action.data;
    
            setLoading(false);
            setMsg(message);
    
            if(success === 1){
                setData(data);
                setPagination( pages );
            }
            else{
                setError(true);
            }
        } catch (error) {
            setLoading(false);
            setError(true);
            setMsg(error.message);
        }
    }

    useEffect(() => {
        getBooks();
    }, [params]);

    return { data, loading, error, msg, pagination, setData };
}
 
export default useBooks;
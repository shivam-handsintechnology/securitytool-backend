import axios from 'axios';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';


const useDataFetch = (url, dependencies=[],type=null) => {
    const [data, setData] = useState(type);
    const [errors, setErrors] = useState({ loading: false, error: false, message: '', progress: 0 });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setErrors((prev) => ({ ...prev, loading: true , progress: 0, error: false }))
                const response = await axios.get(url, {
                    onDownloadProgress: progressEvent => {
                        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setErrors(prev => ({ ...prev, progress }));
                    },
                });
                setErrors((prev) => ({ ...prev, loading: false, error: false, progress: 100 }))
                const { data, statusCode, message } = response;
                switch (statusCode) {
                    case 200:
                        setData(data);
                        break;
                    default:
                        setErrors((prev) => ({ ...prev, loading: false, error: true, message: message }))
                        break;
                }
            } catch (error) {
                const {response}=error
                 let message=response?.data?.message ? response?.data?.message : 'An error occurred'
                setErrors((prev) => ({
                    ...prev, loading: false,
                    error: true,progress: 100,
                    message: message
                }))
                setData(null);
            }
        };
        fetchData();
 
    }, dependencies);

    return { data, errors };
};



export default useDataFetch;

const usePostData = () => {
    const [Data, setData] = useState(null);
    const [errors, setErrors] = useState({ loading: false, error: false, message: '' });
    const handleSubmit = async (e, url, data) => {
        try {
            setErrors({ loading: true, error: false });
            await axios.post(url, data).then((response) => {
                const { data, statusCode, message } = response;
                if (statusCode === 200) {
                    setData(data);
                    toast.success(message)

                } else {
                    setErrors({
                        loading: false,
                        error: true,
                        message: message,
                    });
                    toast.error(message)

                }

            });

        } catch (error) {
            console.error(error);
            setErrors({
                loading: false,
                error: true,
                message: error.data ? error.data.message : 'An error occurred',
            });
            setData(null);
            toast.error(error.data ? error.data.message : 'An error occurred')
        }


    }
 

    // You might want to add dependencies to the useEffect if needed


    return { Data, errors, handleSubmit };
};
const usePutData = () => {
    const [Data, setData] = useState(null);
    const [errors, setErrors] = useState({ loading: false, error: false, message: '' });
    const handleSubmit = async (e, url, data) => {
        try {
            setErrors({ loading: true, error: false });
            const response = await axios.put(url, data).then((response) => {
                const { data, statusCode } = response;
                if (statusCode === 200) {
                    setData(data);
                }
            });

        } catch (error) {
            console.error(error);
            setErrors({
                loading: false,
                error: true,
                message: error.data ? error.data.message : 'An error occurred',
            });
            setData(null);
        }
    };
    return { Data, errors, handleSubmit };
}
const useDeleteData = () => {
    const [Data, setData] = useState(null);
    const [errors, setErrors] = useState({ loading: false, error: false, message: '' });
    const handleSubmit = async (url) => {
        try {
            setErrors({ loading: true, error: false });
                 await axios.delete(url).then((response) => {
                const { data, statusCode } = response;
                if (statusCode === 200) {
                    setData(Date.now());
                    toast.success("Deleted Successfully")
                }
            });

        } catch (error) {
            console.error(error);
            setErrors({
                loading: false,
                error: true,
                message: error.data ? error.data.message : 'An error occurred',
            });
            setData(null);
        }
    };
    return { Data, errors, handleSubmit };
}
export { useDataFetch, usePostData, usePutData, useDeleteData };

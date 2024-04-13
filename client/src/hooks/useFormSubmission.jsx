import { useEffect, useState } from 'react';
import moment from 'moment';
import { toast } from 'react-toastify';

const useFormSubmission = (mutationHook, initialFormData, validate, toasterror) => {

    const [formData, setFormData] = useState(initialFormData);
    const [Data, setData] = useState(null);
    const [errors, setErrors] = useState({ loading: false, error: false, message: '' });

    const [mutate] = mutationHook();

    const
        handleSubmit = async () => {
            try {
                // Create a copy of the formData object to avoid mutating the original
                const formattedData = { ...formData };

                // // Iterate through the properties of formData
                // for (const key in formattedData) {
                //     const value = formattedData[key];
                //     // Check if the value is a date (you can use your own logic here)
                //     if (moment(value, moment.ISO_8601, true).isValid()) {

                //         // Format the date to your desired format
                //         formattedData[key] = moment(value).format('MM/DD/YYYY');
                //     }
                // }

                //console.log(formattedData);

                setErrors({ loading: true, error: false });
                const res = await mutate(formattedData).unwrap();
                //console.log(res);
                setData(res.data);
                setErrors({ loading: false, error: false, message: res?.message });

                // You can handle the result as needed
                // For example, update state or navigate to another page
            } catch (error) {
                console.error(error);
                setErrors({
                    loading: false,
                    error: true,
                    message: error.data ? error.data.message : 'An error occurred',
                });

                // You can handle the error as needed
                // For example, show an error message to the user
            }
        };

    const handleChange = (name, value) => {
        // //console.log("name and value",name, value);
        if (formData.AirwayBillData) {
            setFormData((prevData) => ({
                ...prevData,
                AirwayBillData: {
                    ...prevData.AirwayBillData,
                    [name]: value,
                },
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    // //console.log(">>>>", formData)
    return { Data, setFormData, formData, errors, handleSubmit, handleChange, setErrors, setData };
};

export default useFormSubmission;

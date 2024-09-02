import axios from 'axios';

const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }
})

export const getCustomers = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/customers`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const getCustomer = async () =>{
    // eslint-disable-next-line no-useless-catch
    try{
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/customers/{$customerId}`
        )
    }catch (e) { throw e;

    }
}

export const saveCustomer = async (customer) => {
    // eslint-disable-next-line no-useless-catch
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/customers`,
            customer
        )
    } catch (e) {
        throw e;
    }
}

export const updateCustomer = async (id, update) => {
    // eslint-disable-next-line no-useless-catch
    try {
        return await axios.put(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/customers/${id}`,
            update,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const deleteCustomer = async (id) => {
    // eslint-disable-next-line no-useless-catch
    try {
        return await axios.delete(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/customers/${id}`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const login = async (usernameAndPassword) => {
    // eslint-disable-next-line no-useless-catch
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/login`,
            usernameAndPassword
        )
    } catch (e) {
        throw e;
    }
}

export const uploadCustomerProfilePicture = async (id, formData) => {
    // eslint-disable-next-line no-useless-catch
    try {
        return axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/customers/${id}/profile-image`,
            formData,
            {
                ...getAuthConfig(),
                'Content-Type' : 'multipart/form-data'
            }
        );
    } catch (e) {
        throw e;
    }
}

export const customerProfilePictureUrl = (id) =>
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/customers/${id}/profile-image`;


export const createPost = async (caption, postImageFile) => {
    const customerId = localStorage.getItem("customer_id");
    // Create a FormData object
    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('file', postImageFile); // Make sure this matches the server-side name
    formData.append('customerId', customerId);
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/posts/${customerId}/create`,
            formData,
            {
                ...getAuthConfig(),
                'Content-Type': 'multipart/form-data' // Important for file uploads
            }
        );
    } catch (e) {
        throw e;
    }
};


export const fetchCustomerPosts = async (customerId) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/posts/customer/${customerId}`,
            getAuthConfig()
        );
        return response.data;
    } catch (e) {
        throw e;
    }
};
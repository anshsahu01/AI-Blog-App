import axios from 'axios'

export const verifyCaptcha = async(token) => {
    const secretKey = process.env.RECAPTCHA_SECRET;
    try {
        const response = await axios.post(

            `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`
        )

        return response.data;
        
    } catch (error) {
        return {
            success : false,
        }
        
    }
}


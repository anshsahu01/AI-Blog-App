import ImageKit from "imagekit";



const imageKit = new ImageKit({
    publicKey : process.env.IMAGE_KIT_PUBLIC_KEY,
    privateKey :process.env.IMAGE_KIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGE_KIT_ENDPOINT
});


export default imageKit;
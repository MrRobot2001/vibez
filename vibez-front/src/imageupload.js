export const checkImage = (file) => {
    let err = ""
    if(!file) return err = "File does not exist."

    if(file.size > 1024*1024*3)
    err = "The Largest image size is 3mb."

    if(file.type !== 'image/jpeg' && file.type !== 'image/png')
    err = "Image format is Incorrect."

    return err;
}

export const imageUpload = async (images) => {
    let imgArray = [];
    for(const item of images) {
        const formData = new FormData();
        if(item.camera){
            formData.append("file",item.camera)
        }else{
            formData.append("file",item)
        }
        formData.append("upload_preset","wzcefnsi")
        formData.append("cloud_name","vibez")

        const res = await fetch("https://api.cloudinary.com/v1_1/vibez/upload", {
            method: "POST",
            body: formData
        })

        const data = await res.json()
        imgArray.push({public_id: data.public_id,url: data.secure_url})
    }
    return imgArray;
}
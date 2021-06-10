export const imageShow = (src) => {
    return(
        <img src ={src}
        alt="images" className="img_status"/>
    )
}

export const videoShow = (src) => {
    return(
        <video controls src ={src}
        alt="images" className="img_status"/>
    )
}
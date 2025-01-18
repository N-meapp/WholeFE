export default function ProductGalleryImage({image,setSelectedImage}){

    return(
        <>
            <div onClick={()=>{
                setSelectedImage(image)
            }}>
            <img
              src={image}
              class="object-cover object-center h-20 w-20  rounded-lg cursor-pointer"
              alt="gallery-image"
            />
          </div>
        </>
    )
}
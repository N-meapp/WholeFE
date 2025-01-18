import { use, useState } from "react";
import ProductGalleryImage from "./ProductGalleryImage";
import ImageMagnifier from "../ImageMagnifier";

export default function ProductGallery({gallery}) {

  const [selectedImage,setSelectedImage] = useState(gallery[0])

  return (
    <>
      <div class="grid gap-4">
        <div className="rounded-xl">
          {/* <img
            class="h-96 w-full max-w-full rounded-xl object-contain object-center md:h-96"
            src={selectedImage}
            alt=""
          /> */}
          <ImageMagnifier 
          src={selectedImage}
                width={350}
                height={300}
                magnifierHeight={100}
                magnifierWidth={100}
                zoomLevel={2}
                alt="Sample Image"
            />
        </div>
        <div class="flex justify-center gap-4">
        {gallery?.map((image,i)=>{

            return(
              <>
                {image!==selectedImage?
            <ProductGalleryImage image={image} setSelectedImage={setSelectedImage} />:
            null
                }
              </>
            )
        })}
          {/* <div>
            <img
              src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80"
              class="object-cover object-center h-20 max-w-full rounded-lg cursor-pointer"
              alt="gallery-image"
            />
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80"
              class="object-cover object-center h-20 max-w-full rounded-lg cursor-pointer"
              alt="gallery-image"
            />
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2940&amp;q=80"
              class="object-cover object-center h-20 max-w-full rounded-lg cursor-pointer"
              alt="gallery-image"
            />
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2762&amp;q=80"
              class="object-cover object-center h-20 max-w-full rounded-lg cursor-pointer"
              alt="gallery-image"
            />
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2832&amp;q=80"
              class="object-cover object-center h-20 max-w-full rounded-lg cursor-pointer"
              alt="gallery-image"
            />
          </div> */}
        </div>
      </div>
    </>
  );
}

import React, { useRef } from 'react'

function Container() {

    const showImage = (event) => {
        const file = event.target.files[0];
        console.log(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const preview = document.getElementById("preview");
                preview.src = e.target.result;
                preview.style.display = "block";
            }
            reader.readAsDataURL(read);
        }
    }

    return (
        <div className='h-screen bg-gray-600 w-full flex justify-center items-center' >
            <div >
                <input type="file" onChange={showImage} name="" id="imageInput" accept='image/*' />
                <br />
                <img src="" alt="" id="preview" />
            </div>
        </div>
    )
}

export default Container

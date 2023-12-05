import React, { useCallback } from "react";
import Iframe from "react-iframe";

export default function PreviewMedia({ styles, isImage, iframeUrl }) {
  console.log("🚀 ~ file: PreviewMedia.jsx:5 ~ PreviewMedia ~ isImage:", isImage)
  console.log("🚀 ~ file: PreviewMedia.jsx:5 ~ PreviewMedia ~ iframeUrl:", iframeUrl)

  const imgStyle = {
    width: 'auto',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
    aspectRatio: '16/9'
  }

  const setCurrentImageDisplay = useCallback((currentTarget, display) => {
    const currentImage = currentTarget.target
    currentTarget.onerror = null
    currentImage.style.display = display
  }, [])

  return (
    <div className={styles['preview-image-wrapper']}>
      {
        isImage
          ? (iframeUrl !== '' && <img src={iframeUrl}
            style={imgStyle}
            onLoad={(currentTarget) => setCurrentImageDisplay(currentTarget, 'block')}
            onError={(currentTarget) => setCurrentImageDisplay(currentTarget, 'none')}
          />)
          : <Iframe
            url={iframeUrl}
            loading='lazy'
            width="100%"
            height="100%"
            display="block"
            position="relative"
          />
      }
    </div>


  );
}
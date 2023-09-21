import { useEffect, useState } from "react";

export default function useIsImageOrVideo(url) {

    const [isImage, setIsImage] = useState(true);
    const [iframeUrl, setIframeUrl] = useState();

    useEffect(() => {
        if (!url || typeof url !== 'string') {
            setIsImage(true)
            setIframeUrl('')
            return
        }
        if (url.indexOf('youtube') !== -1) {
            // const src = getProperty('src');
            setIsImage(false)
            setIframeUrl(url)
        } else {
            setIsImage(true)
            setIframeUrl(url)
        }
    }, [url]);

    return { isImage, iframeUrl };
}

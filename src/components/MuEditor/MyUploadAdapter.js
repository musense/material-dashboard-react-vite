class MyUploadAdapter {

  constructor(loader) {
    // The file loader instance to use during the upload.
    this.loader = loader;
    this.apiUrl = import.meta.env.VITE_SERVER_URL
  }
  // Starts the upload process.
  _initRequest() {
    console.log('_initRequest');
    const xhr = this.xhr = new XMLHttpRequest();
    // Note that your request may look different. It is up to you and your editor
    // integration to choose the right communication channel. This example uses
    // a POST request with JSON as a data structure but your configuration
    // could be different.
    xhr.open('POST', `${this.apiUrl}/editor/getNewImagePath`, true);
    xhr.withCredentials = true;
    xhr.responseType = 'json';
  }
  _initListeners(resolve, reject, file) {
    console.log('_initListeners ....', file);
    const xhr = this.xhr;
    const loader = this.loader;
    const genericErrorText = `Couldn't upload file: ${file.name}.`;

    xhr.addEventListener('error', () => reject(genericErrorText));
    xhr.addEventListener('abort', () => reject());
    xhr.addEventListener('load', () => {
      const response = xhr.response;

      // This example assumes the XHR server's "response" object will come with
      // an "error" which has its own "message" that can be passed to reject()
      // in the upload promise.
      //
      // Your integration may handle upload errors in a different way so make sure
      // it is done properly. The reject() function must be called when the upload fails.
      if (!response || response.error) {
        return reject(response && response.error ? response.error.message : genericErrorText);
      }

      // If the upload is successful, resolve the upload promise with an object containing
      // at least the "default" URL, pointing to the image on the server.
      // This URL will be used to display the image in the content. Learn more in the
      // UploadAdapter#upload documentation.

      resolve({
        default: response.imageUrl
      });
    });

    // Upload progress when it is supported. The file loader has the #uploadTotal and #uploaded
    // properties which are used e.g. to display the upload progress bar in the editor
    // user interface.
    if (xhr.upload) {
      xhr.upload.addEventListener('progress', evt => {
        console.log("🚀 ------------------------------------------------------------------------------🚀")
        console.log("🚀 ~ file: MyUploadAdapter.js:55 ~ MyUploadAdapter ~ _initListeners ~ evt:", evt)
        console.log("🚀 ------------------------------------------------------------------------------🚀")
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      });
    }
  }
  _sendRequest(file) {
    // Prepare the form data.
    const data = new FormData();
    console.log('_sendRequest', file);
    data.append('imageBlob', file);
    // data.append('group', 'ETC')
    // data.append('type', 'IMAGE')

    // Important note: This is the right place to implement security mechanisms
    // like authentication and CSRF protection. For instance, you can use
    // XMLHttpRequest.setRequestHeader() to set the request headers containing
    // the CSRF token generated earlier by your application.

    // Send the request.
    this.xhr.send(data);
  }

  upload() {
    return this.loader.file
      .then(file => new Promise((resolve, reject) => {
        console.log('file', file)
        this._initRequest();
        this._initListeners(resolve, reject, file);
        this._sendRequest(file);
      }));
  }

  // Aborts the upload process.
  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }
}
export default MyUploadAdapter;

import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Uppy from '@uppy/core';
import Tus from '@uppy/tus'
import Box from '@uppy/box';
import OneDrive from '@uppy/onedrive';
import GoogleDrive from '@uppy/google-drive';
import Dropbox from '@uppy/dropbox';
import actions from "../states/PhotoSamples/actions";

import '@uppy/core/dist/style.min.css'
import '@uppy/dashboard/dist/style.min.css'

const endPoint= "http://54.89.206.113:3000/uploads"
const companionUrl = "http://localhost:3020/companion";

function serializeSubPart(key, value) {
  if (typeof value !== 'object') {
    return [[key, value]]
  }
  
  if (Array.isArray(value)) {
    return value.flatMap(val => serializeSubPart(`${key}[]`, val))
  }
  
  return Object.entries(value).flatMap(([subkey, val]) => 
    serializeSubPart(key ? `${key}[${subkey}]` : subkey, val)
  )
}

function serialize(data) {
  return new URLSearchParams(serializeSubPart(null, data))
}

export default function useUppy() {
  const [files, setFiles] = useState([]);
  const location = useLocation();
  const dispatch = useDispatch();
  const {orderId, version_id, section } = useParams();

  const uppy = new Uppy({
    id: 'uppy',
    autoProceed: false,
    debug: true,
    restrictions: {
      maxFileSize: 10 * 1024 * 1024 * 1024, // 1GB
      maxNumberOfFiles: null,
      allowedFileTypes: null // allow all file types
    }
  })

  uppy
  //     .use(DashboardPlugin, {
  //       inline: true,
  //       target: 'body',
  //       height: 470,
  //       width: '100%',
  //     })
      // .use(AwsS3, {
      //   id: 'aws-s3',
      //   shouldUseMultipart: (file) => file.size > 100 * 0x100000,

      //   async getTemporarySecurityCredentials({ signal }) {
      //     const response = await fetch(`${endPoint}/s3/sts`, { signal })
      //     console.log(response)
      //     if (!response.ok) throw new Error("Unsuccessful request", { cause: response })
      //     return response.json()
      //   },

      //   async getUploadParameters(file, options) {
      //     const metadata = Object.fromEntries(
      //       Object.entries(file.meta || {})
      //         .filter(([, value]) => value != null)
      //         .map(([key, value]) => [key, value.toString()])
      //     )

      //     const response = await fetch(`${endPoint}/s3/sign`, {
      //       method: "POST",
      //       headers: {
      //         accept: "application/json",
      //       },
      //       body: serialize({
      //         filename: file.name,
      //         contentType: file.type,
      //         metadata
      //       }),
      //       signal: options.signal,
      //     })
      //     console.log(response)

      //     if (!response.ok) throw new Error("Unsuccessful request", { cause: response })
      //     const data = await response.json()

      //     return {
      //       method: data.method,
      //       url: data.url,
      //       fields: {},
      //       headers: {
      //         "Content-Type": file.type,
      //       },
      //     }
      //   },

      //   // Multipart upload methods
      //   async createMultipartUpload(file, signal) {
      //     const metadata = Object.fromEntries(
      //       Object.entries(file.meta || {})
      //         .filter(([, value]) => value != null)
      //         .map(([key, value]) => [key, value.toString()])
      //     )

      //     const response = await fetch(`${endPoint}/s3/multipart`, {
      //       method: "POST",
      //       headers: { accept: "application/json" },
      //       body: serialize({
      //         filename: file.name,
      //         type: file.type,
      //         metadata,
      //       }),
      //       signal,
      //     })

      //     if (!response.ok) throw new Error("Unsuccessful request", { cause: response })
      //     return response.json()
      //   },

      //   async signPart(file, options) {
      //     const { uploadId, key, partNumber, signal } = options

      //     if (!uploadId || !key || !partNumber) {
      //       throw new Error("Cannot sign without a key, an uploadId, and a partNumber")
      //     }

      //     const filename = encodeURIComponent(key)
      //     const response = await fetch(
      //       `${endPoint}/s3/multipart/${uploadId}/${partNumber}?key=v2/test/${filename}`,
      //       { signal }
      //     )

      //     if (!response.ok) throw new Error("Unsuccessful request", { cause: response })
      //     return response.json()
      //   },

      //   async listParts(file, { key, uploadId }, signal) {
      //     console.log("here");
      //     signal?.throwIfAborted();

      //     const filename = encodeURIComponent(key);
      //     const response = await fetch(
      //       `${endPoint}/s3/multipart/${uploadId}?key=v2/test/${filename}`,
      //       { signal }
      //     );

      //     if (!response.ok)
      //       throw new Error("Unsuccessful request", { cause: response });

      //     const data = await response.json();

      //     return data;
      //   },

      //   async completeMultipartUpload(file, { key, uploadId, parts }, signal) {
      //     const filename = encodeURIComponent(key)
      //     const uploadIdEnc = encodeURIComponent(uploadId)
          
      //     const response = await fetch(
      //       `${endPoint}/s3/multipart/${uploadIdEnc}/complete?key=v2/test/${filename}`,
      //       {
      //         method: "POST",
      //         headers: { accept: "application/json" },
      //         body: serialize({ parts }),
      //         signal,
      //       }
      //     )

      //     if (!response.ok) throw new Error("Unsuccessful request", { cause: response })
      //     return response.json()
      //   },
      // })
      .use(Tus, { endpoint: endPoint, retryDelays: [0, 1000, 3000, 5000], chunkSize: 5 * 1024 * 1024 })
      .use(Box, {
        companionUrl: companionUrl,
        companionAllowedHosts: ['.*'],
      })
      .use(OneDrive, {
        companionUrl: companionUrl,
        companionAllowedHosts: ['.*'],
      })
      .use(GoogleDrive, {
        // companionUrl: COMPANION_URL,
        // companionAllowedHosts: COMPANION_ALLOWED_HOSTS,
        // clientId: '704958830010-8ksj7hhie33b3ui2elhdpu8elhnrpdhq.apps.googleusercontent.com',
        // apiKey: 'AIzaSyD27ooad_TH7nZZ19__6aD5m-cUxZQtQJQ',
        // appId: '704958830010',
        companionUrl: companionUrl,
        companionAllowedHosts: ['.*'],
        // companionWSProtocol: 'ws',
        // companionSocketTimeout: 600000 // Match server timeout
      })
      .use(Dropbox, {
        // companionUrl: COMPANION_URL,
        // companionAllowedHosts: COMPANION_ALLOWED_HOSTS,
        companionUrl: companionUrl,
        companionAllowedHosts: ['.*'],      
      })
      // .use(Webcam)
      // .use(ScreenCapture)

      useEffect(() => {
        let files = [];
        const fileAddedHandler = (file) => {
          console.log("Added file name: ", file.name, file.meta.relativePath)
          uppy.setFileMeta(file.id, {
            relativePath: file.meta.relativePath
          });
          // setFiles(prev => [...prev, file.name]);
        };
    
        const fileRemovedHandler = (file) => {
          console.log("Removed file name: ", file.name)
          setFiles(prev => prev.filter(name => name !== file.name));
        };
    
        const uploadSuccessHandler = (file, response) => {
          console.log('Upload successful:', file.name);
          console.log('S3 response:', response);
          
          // The file URL in S3 will typically be:
          const fileUrl = response.uploadURL;
          files.push({name: file.name, file_path: fileUrl});
          // setFiles(prev => [...prev, {name: file.name, url: fileUrl}]);
          console.log('File URL:', fileUrl);
        };

        const completeHandler = (result) => {
          const successResults = result.successful;
          console.log("uploading completed============>", files);
          
          // Check if we're on vendor/*/samples route
          const pathParts = location.pathname.split('/');
          const isVendorRoute = pathParts[1] === 'vendor';
          const isSamplesRoute = pathParts[pathParts.length - 1] === 'samples';
          
          if (isVendorRoute && isSamplesRoute && version_id) {
            const padType = section === 'data' ? 'data' : section === 'artwork' ? 'artw' : 'pack';
            
            dispatch({
              type: actions.ADD_SAMPLES,
              payload: {
                mode: "insertSamples",
                jobs_id: orderId, // Adjust this based on how you want to get the job number
                versions_id: version_id,
                pads_type: padType,
                files: files,
              }
            });

            dispatch({
              type: actions.GET_SAMPLES,
              payload: {
                mode: "getPhotoSamples",
                jobs_id: orderId,
                versions_id: version_id,
                pads_type: padType,
              }
            });
          }
          
          files = [];
        };

        const uploadErrorHandler = (file, error, response) => {
          console.error('Upload error:', file.name, error);
          console.error('S3 response:', response);
        };
    
        uppy.on('file-added', fileAddedHandler);
        // uppy.on('file-removed', fileRemovedHandler);
        uppy.on('upload-success', uploadSuccessHandler);
        // uppy.on('upload-error', uploadErrorHandler);
        uppy.on('complete', completeHandler);
    
        return () => {
          uppy.off('upload-success', uploadSuccessHandler);
          uppy.off('file-added', fileAddedHandler);
          // uppy.off('file-removed', fileRemovedHandler);
          // uppy.off('upload-error', uploadErrorHandler);
          uppy.off('complete', completeHandler);
          uppy.clear();
        };
      }, [location, dispatch, version_id, section]);

    return { uppy, files };
  // })
}

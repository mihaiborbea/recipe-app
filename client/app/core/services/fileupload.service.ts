import { Injectable } from '@angular/core';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';

import { FileUpload } from '../../shared/domain/fileupload.model';

@Injectable({ providedIn: 'root' })
export class FileUploadService {
  private basePath = '/uploads';

  constructor(private storage: Storage) {}

  async pushFileToStorage(
    fileUpload: FileUpload,
    collection?: string
  ): Promise<string> {
    const filePath = `${collection ? collection : this.basePath}/${
      '' + Date.now() + fileUpload.file.name
    }`;
    const storageRef = ref(this.storage, filePath);
    const uploadTask = uploadBytesResumable(storageRef, fileUpload.file);

    const uploadedFile = await uploadTask;

    const downloadURL = await getDownloadURL(uploadedFile.ref);

    return downloadURL;
  }
}

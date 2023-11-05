import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';

import { FileUpload } from '../../shared/domain/fileupload.model';

@Injectable({ providedIn: 'root' })
export class FileUplaodService {
  private basePath = '/uploads';

  constructor(private db: Firestore, private storage: Storage) {}

  async pushFileToStorage(fileUpload: FileUpload): Promise<any> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = ref(this.storage, filePath);
    const uploadTask = uploadBytesResumable(storageRef, fileUpload.file);

    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

    const uploadedFile = await uploadTask;

    return uploadedFile;
  }
}
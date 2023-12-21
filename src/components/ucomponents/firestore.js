/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'; 
import { db } from '../../firebase';
// import { getDownloadURL } from './storage';

// Name of receipt collection in Firestore
const DEVICE_COLLECTION = 'devices';


export const getDeviceFields = async (uid, setDevices) => {
  const deviceRef = query(collection(db, DEVICE_COLLECTION), where("uid", "==", uid), orderBy("id", "desc"));

  const unsubscribe = onSnapshot(deviceRef, async (snapshot) => {
    let fields = [];
    for (const documentSnapshot of snapshot.docs) {
      const device = documentSnapshot.data();
      console.log("Device data: ", device); // Log the data of each device
      fields.push({
        devName: device.devName,
        devNum: device.devNum,
        fuel: device.fuel,
        id: device.id,
        img: device.img,
        lat: device.lat,
        lng: device.lng,
        speed: device.speed
      });
    }
    console.log("All devices: ", fields); // Log all the devices
    setDevices(fields);  // Update state with the fetched devices
  });

  return unsubscribe;  // Return the unsubscribe function for cleanup if needed
};


// Updates receipt with @docId with given information.
// export function updateReceipt(docId, uid, date, locationName, address, items, amount, imageBucket) {
//   setDoc(doc(db, RECEIPT_COLLECTION, docId), { uid, date, locationName, address, items, amount, imageBucket });
// }

// // Deletes receipt with given @id.
// export function deleteReceipt(id) {
//   deleteDoc(doc(db, RECEIPT_COLLECTION, id));
// }
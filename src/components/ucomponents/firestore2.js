import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'; 
import { db } from '../../firebase';
// import { getDownloadURL } from './storage';

// Name of receipt collection in Firestore
const DEVICE_COLLECTION = 'devices';


export const getDeviceFields2 = async (deviceKey, uid, setDevices) => {
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
        speed: device.speed,
        state: device.state,
        time: device.t_v
      });
    }
    console.log("All devices: ", fields); // Log all the devices
    setDevices(fields);  // Update state with the fetched devices
  });

  return unsubscribe;  // Return the unsubscribe function for cleanup if needed
};
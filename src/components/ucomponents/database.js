import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'; 
import {db} from '../../firebase';



export const fetchData = async (uid, setDeviceData) => {
    const devicesQuery = query(collection(db, "devices"), where("uid", "==", uid));
    const unsub = onSnapshot(devicesQuery, (snapshot) => {
      let fields = [];
      for (const documentSnapshot of snapshot.docs) {
        const device = documentSnapshot.data();
          fields.push({
            devName: device.devName,
            devNum: device.devNum,
            id: device.id,
            lat: device.lat,
            lng: device.lng,
            speed: device.speed,
            state: device.state,
            time: device.t_v,
            distance: device.total_distance,
          });
      };
      console.log(fields);

      setDeviceData(fields);
    //   initializeCharts(fields);
    });

  return unsub;  // Return the unsubscribe function for cleanup if needed
};
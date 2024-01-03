import React, { useState, useEffect } from 'react';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Modal, Box, TextField, Button } from "@mui/material";
import { useAuth } from '../pages/AuthContext';

const AddDeviceForm = ({ isOpen, handleClose, onDeviceKeySubmit }) => {
  const { authUser, isLoading } = useAuth();
  const [deviceKey, setDeviceKey] = useState('');
  const [devName, setDevName] = useState('');
  const [devNum, setDevNum] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  // useEffect để lấy deviceKey từ Firestore nếu đã tồn tại
  useEffect(() => {
    const fetchDeviceKey = async () => {
      if (authUser) {
        const userRef = doc(db, 'users', authUser.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.deviceKey) {
            setDeviceKey(userData.deviceKey);
          }
        }
      }
    };

    fetchDeviceKey();
  }, [authUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const deviceRef = doc(db, 'devices', deviceKey);

    try {
      for (let i = 1; i <= 10; i++) {
        const dataRef = doc(deviceRef, 'data', `${i}`);
        await updateDoc(dataRef, {
          devName: devName,
          devNum: devNum,
          uid: authUser.uid
        });
      }

      console.log('Kết nối thành công!');
      setIsConnected(true);
      handleClose();
      onDeviceKeySubmit(deviceKey);
    } catch (error) {
      console.error('Lỗi khi ghi dữ liệu:', error);
    }

    // Kiểm tra xem deviceKey đã tồn tại trong /users/uid chưa
    const userRef = doc(db, 'users', authUser.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();

      // Nếu deviceKey chưa tồn tại, thêm nó vào dữ liệu người dùng
      if (!userData.deviceKey) {
        await updateDoc(userRef, {
          deviceKey: deviceKey
        });
      }
    }
  };

  return (
    <Modal
      open={isOpen && !isConnected}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nhập key để kết nối thiết bị"
            value={deviceKey}
            onChange={(e) => setDeviceKey(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Nhập tên thiết bị"
            value={devName}
            onChange={(e) => setDevName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Nhập số thiết bị"
            value={devNum}
            onChange={(e) => setDevNum(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Kết nối
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddDeviceForm;

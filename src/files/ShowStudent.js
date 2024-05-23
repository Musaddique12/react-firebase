import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { getStorage, ref as storageRef, deleteObject } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { app } from '../firebase';
import { useNavigate } from 'react-router-dom';

const ShowStudent = () => {
  const navigate = useNavigate();
  const [stdData, setStdData] = useState(null);

  useEffect(() => {
    const db = getDatabase(app);
    const studentRef = ref(db, 'Student');
    onValue(studentRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      setStdData(data);
    });
  }, []);

  const deleteData = (key) => {
    const db = getDatabase(app);
    const storage = getStorage(app);

    const myRef = storageRef(storage,`images/`+key);
    const studentRef = ref(db, 'Student/' + key);

    deleteObject(myRef)
      .then((res) => {
        console.log('Image deleted successfully');
      })
      .catch((err) => {
        console.log(err);
      });

    remove(studentRef)
      .then(() => {
        console.log('Student data deleted successfully');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <h1>Student List</h1>
      {stdData && (
        <div style={{display:'flex' }}>
          {Object.entries(stdData).map(([key, values]) => {
            //const imageUrl = values.imageUrl + '?t=' + new Date().getTime(); // Append timestamp to URL
            return (
              <div key={key} style={{ margin:'20px'}}>
                <img style={{ width: '150px', height: '80px' }} src={values.imageUrl} alt="Student" />
                <p>{values.Name} {values.Phone}</p>
                <button onClick={() => deleteData(key)}>Delete Data</button>
                <button onClick={() => navigate('/updatestudent', { state: [key, values] })}>Update Student</button>
                <p />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ShowStudent;

import { collection, deleteDoc, doc, getDocs, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { getStorage, ref as storageRef, deleteObject } from 'firebase/storage';
import { app } from '../firebase';
import { useNavigate } from 'react-router-dom';

const ShowFaculty = () => {
  const navigate = useNavigate();
  const [facultyData, setFacultyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const db = getFirestore(app);
      const docRef = collection(db, 'Faculty');
      const docSnap = await getDocs(docRef);
      const data = docSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFacultyData(data);
    } catch (err) {
      setError('Failed to fetch data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteData = async (id, imageUrl) => {
    const db = getFirestore(app);
    const storage = getStorage(app);
    const dataRef = doc(db, 'Faculty', id);
    const imageRef = storageRef(storage, imageUrl);

    try {
      // Delete the document from Firestore
      await deleteDoc(dataRef);
      // Delete the image from Firebase Storage
      await deleteObject(imageRef);
      // Fetch the updated data
      getData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div>
      <h1>Faculty List</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {facultyData.length > 0 ? (
          facultyData.map(faculty => (
            <div key={faculty.id} style={{ margin: '20px', padding: '5px', height: '150px' }}>
              <img style={{ width: '150px', height: '80px' }} src={faculty.imageUrl} alt="Faculty" />
              <p style={{ marginRight: '10px' }}>Name: {faculty.Name}</p>
              <p>Phone: {faculty.Phone}</p>
              <button onClick={() => { deleteData(faculty.id, faculty.imageUrl) }}>Delete Data</button>
              <button onClick={() => { navigate('/updatefaculty', { state: faculty }) }}>Update Faculty</button>
            </div>
          ))
        ) : (
          <p style={{ color: 'red' }}>No faculty data available</p>
        )}
      </div>
    </div>
  );
};

export default ShowFaculty;

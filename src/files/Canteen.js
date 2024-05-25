import { getDatabase, onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { app } from '../firebase';
import './Canteen.css';  // Import the CSS file
import { useNavigate } from 'react-router-dom';

const Canteen = () => {
  const [Data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const db = getDatabase(app);
    const foodtRef = ref(db, 'food/');
    onValue(foodtRef, (snap) => {
      const data = snap.val();
      setData(data);
    });
  }, []);

  return (
    <>
      <h1 className="title">Canteen</h1>
      <div className="container">
        {Data && Object.entries(Data).map(([key, values]) => (
          <div key={key} className="card">

            <div className="image-container">
              <img className="image" src={values.Img} alt={values.Food} />
            </div>

            <div className="content">
              <strong className="food-name">{values.Food}</strong>
              <button className="price-button">{values.Price}</button>
            </div>

            <div className="update-button-container">
              <button className="update-button" onClick={()=> navigate('/dashbord/updatefood',{state:[key,values]})}>Update Food</button>
            </div>

          </div>
        ))}
      </div>
    </>
  );
};

export default Canteen;

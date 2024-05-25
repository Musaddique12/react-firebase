import './App.css';
import { AddData } from './files/AddData';
import Dashbord from './files/dashbord';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AddStudent from './files/AddStudent';
import ShowStudent from './files/ShowStudent';
import UpdateStudent from './files/UpdateStudent';
import ShowFaculty from './files/ShowFaculty';
import { Addfaculty } from './files/AddFaculty';
import { UpdateFaculty } from './files/UpdateFaculty';
import AddWorkers from './files/AddWorkers';
import ShowWorkers from './files/ShowWorkers';
import UpdateWorkers from './files/UpdateWorkers';
import Signup from './files/Signup';
import Login from './files/Login';
import Canteen from './files/Canteen';
import AddFood from './files/AddFood';
import UpdateFood from './files/UpdateFood';


function App() {

  const myrouter =createBrowserRouter([
    {path:'',Component:Signup},
    {path:'dashbord',Component:Dashbord,children:[
      {path:'',Component:AddStudent},
      {path:'student',Component:AddStudent},
      {path:'showstudent',Component:ShowStudent},
      {path:'updatestudent',Component:UpdateStudent},
      {path:'faculty',Component:Addfaculty},
      {path:'showfaculty',Component:ShowFaculty},
      {path:'updatefaculty',Component:UpdateFaculty},
      {path:'addworkers',Component:AddWorkers},
      {path:'showworkers',Component:ShowWorkers},
      {path:'updateworkers',Component:UpdateWorkers},
      {path:'canteen',Component:Canteen},
      {path:'addfood',Component:AddFood},
      {path:'updatefood',Component:UpdateFood}
    ]},
    {path:'signup',Component:Signup},
    {path:'login',Component:Login},
   
  ])

  return (
    <div>
      <RouterProvider router={myrouter}/>
     
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import UserDataService from '../services/services'
import Header from './header';
import Footer from './footer';


const Home = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
    const timer = setInterval(() => {
      getUsers();
    }, 1000);
  }, []);

  const getUsers = async () => {
    const data = await UserDataService.getAllUsers();
    // console.log(data.docs);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id : doc.id})))
  };



  return (

    <div>
      <div className="container-fluid" style={{ minHeight: "86vh", padding: 0  }}>
      <Header />

        <div className='container'>
          <Table striped bordered hover style={{ marginTop: '50px', color: '#000' }}>
            <thead>
              <tr>
                <th>Sl No</th>
                <th>First Name</th>
                <th>Last Name</th>
                {/* <th>Email</th> */}
                <th>Steps</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              { users.slice(0, 10).map((doc, index) => {
                return(
                  <tr key = {doc.id}>
                    <td>{index + 1}</td>
                    <td>{doc.first_name}</td>
                    <td>{doc.last_name}</td>
                    {/* <td>{doc.email}</td> */}
                    <td>{doc.steps}</td>
                    <td>{doc.score}</td>
                  </tr>
                )
              })}

            </tbody>
          </Table>
        </div>
      </div>

      <Footer />
    </div>





  );

}




// class Home extends React.Component {




//   constructor(props) {

//     super(props);

//     this.state = { studentslist: [] }
//   }

//   componentDidMount() {



//     db.ref().on("value", snapshot => {
//       let studentlist = [];
//       snapshot.forEach(snap => {
//         // snap.val() is the dictionary with all your keys/values from the 'students-list' path
//         studentlist.push(snap.val());
//       });
//       this.setState({ studentslist: studentlist });
//     });


//   }


// }
// }
export default Home;
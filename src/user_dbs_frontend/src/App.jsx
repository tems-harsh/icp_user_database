import { useEffect, useState } from 'react';
import { user_dbs_backend } from 'declarations/user_dbs_backend';

function App() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    user_dbs_backend.getUsers().then((users) => {
      setUserList(users);
    }).catch(err => console.error(err));
  }, []);

  function handleAddUser(e) {
    e.preventDefault();
    
    let name = document.querySelector("#name").value;
    let title = document.querySelector("#title").value;
    let age = parseInt(document.querySelector("#age").value);

    user_dbs_backend.createUser(new Date().toISOString() ,name, title, age).then(() => {
      return user_dbs_backend.getUsers();
    }).then(users => setUserList(users)).catch(err => console.error(err));
  }
  
  function handleDelete(e) {
    user_dbs_backend.deleteUser(e.target.id).then(() => {
      return user_dbs_backend.getUsers();
    }).then(users => setUserList(users)).catch(err => console.error(err));
  }

  return (
    <main className='text-center'>
      <p className='text-2xl mt-6'>User Database</p>
      <form onSubmit={handleAddUser} className='flex flex-col items-center mt-4 gap-y-3'>

      <input className='p-3 border rounded' placeholder='Enter name' id='name' required />
      <input type='number' className='p-3 border rounded' placeholder='Enter age' id='age' required />
      <select id='title' required>
        <option value="Student" className='m-3'>Student</option>
        <option value="Doctor" className='m-3'>Doctor</option>
        <option value="Professor" className='m-3'>Professor</option>
      </select>
      <button type='submit' className='bg-sky-500 px-6 py-3 text-white rounded-md'>Add</button>
      </form>

    <ul className='flex flex-col items-center m-3 gap-y-5'>
      {userList.map((user) => (
            <li className='flex flex-row justify-between items-center w-1/3 p-2 drop-shadow'>
          <div>
            {user.name}
          </div>
          <button id={user.id} onClick={handleDelete} className='text-red-500'>
            Delete
          </button>
          </li>
      ))
      }
      </ul>
    </main>
  );
}

export default App;

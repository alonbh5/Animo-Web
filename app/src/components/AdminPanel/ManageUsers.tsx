/*eslint-disable*/
import React, { useContext, useState } from 'react';
import validator from 'validator';
const ManageUsers = (props: any) => {

  return (
    <div id='team' className='text-center'>
      <div className='container'>
          <h2>Manage Users</h2>
          <br>
          </br>
          <br>
          </br>
          <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>	
                        <th>Created At</th>					
                        <th>Role</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td><a href="#">Michael Holz</a></td>
                        <td>27/1/2014</td>
                        <td>Admin</td>
                        <td><span className="status text-success">&bull;</span> Active</td>
                        <td>
                        <a href="#" className="delete" title="Delete" data-toggle="tooltip"><i className="material-icons">&#xe876;</i></a>
                            <a href="#" className="settings" title="Settings" data-toggle="tooltip"><i className="material-icons">&#xE8B8;</i></a>
                            <a href="#" className="delete" title="Delete" data-toggle="tooltip"><i className="material-icons">&#xE5C9;</i></a>
                        </td>     
                    </tr>
                    <tr>
                        <td>2</td>
                        <td><a href="#">Paula Wilson</a></td>
                        <td>27/1/2014</td>
                        <td>Publisher</td>
                        <td><span className="status text-success">&bull;</span> Active</td>
                        <td>
                        <a href="#" className="confirm" title="Confirm" data-toggle="tooltip"><i className="material-icons">&#xe876;</i></a>
                            <a href="#" className="settings" title="Settings" data-toggle="tooltip"><i className="material-icons">&#xE8B8;</i></a>
                            <a href="#" className="delete" title="Delete" data-toggle="tooltip"><i className="material-icons">&#xE5C9;</i></a>
                        </td>     
                    </tr>
                    <tr>
                        <td>3</td>
                        <td><a href="#"> Antonio Moreno</a></td>
                        <td>27/1/2014</td>
                        <td>Publisher</td>
                        <td><span className="status text-danger">&bull;</span> Suspended</td>                        
                        <td>
                        <a href="#" className="delete" title="Delete" data-toggle="tooltip"><i className="material-icons">&#xe876;</i></a>
                            <a href="#" className="settings" title="Settings" data-toggle="tooltip"><i className="material-icons">&#xE8B8;</i></a>
                            <a href="#" className="delete" title="Delete" data-toggle="tooltip"><i className="material-icons">&#xE5C9;</i></a>
                        </td>                        
                    </tr>
                </tbody>
            </table>
      </div>
    </div>
  );
};
export default ManageUsers;

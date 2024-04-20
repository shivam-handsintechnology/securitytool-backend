import React from 'react';
import { useDataFetch } from '../../hooks/DataFetchHook';
import { useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import LoadingSpinner from '../../components/LoaderAndError/loader'
const ServerHttpError = (props) => {
  const UserData = useSelector((state) => state.UserReducer);
  const postSessionData = useDataFetch(`ErrorMessage/http-error-messages?domain=${UserData.domain}`, [UserData.domain]);
  console.log("postSessionData", postSessionData);
  return (
    <div>
       {props.Goback}
      {postSessionData.errors.loading ? (
        <LoadingSpinner />
      ) : postSessionData.errors.error ? (
        <p>{postSessionData.errors.message}</p>
      ) : (
        <>
        <h1>Server returns HTTP error message: {postSessionData.data &&  postSessionData.data.length>0?"Yes":"No"} </h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Code</th>
            </tr>
          </thead>
          <tbody>
            {postSessionData.data && postSessionData.data.length>0 ?postSessionData.data.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.code}</td>
              </tr>
            )):null}
          </tbody>
        </Table>
        </>
      )}
    </div>
  );
};

export default ServerHttpError;

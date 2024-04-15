import React from 'react'

const Block = () => {
  return (
    <div className="container col-lg-8 card bg-light">        <br />
        <div className="row d-flex justify-content-center">
          <center>
            <div className="alert alert-danger">
              <h5 className="alert-heading">Malicious request was detected</h5>
            </div><br />
            <p className="font20"><i className="fas fa-bug fa-4x" /></p>
            <h6>Please contact with the webmaster of the website if you think something is wrong.</h6>
            <br />
            <a href="mailto:admin@mail.com" className="btn btn-primary col-12" target="_blank"><i className="fas fa-envelope" /> Contact</a>
          </center>
        </div>
        <br /></div>
  )
}

export default Block

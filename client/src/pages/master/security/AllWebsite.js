import React, { useEffect, useState } from 'react';
import { Button, Form, Container, Row, Col, Modal } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../../../redux/reducers/UserReducer';
import { useNavigate } from 'react-router-dom';
import { useDataFetch,usePostData,usePutData,useDeleteData } from '../../../hooks/DataFetchHook';
import { PaginationComponent } from '../../../hooks/PaginationComponent';
const AllWebsites = () => {
     // Assishn All States
    const [limit, setLimit] = useState(5)
    const [pageNumber, setPageNumber] = useState(1)
    const [initialdata, setInitialData] = useState({ domain: '', type: '' });
    const [showModal, setShowModal] = useState(false);
    const PostDomain = usePostData()
    const PutDomain = usePutData()
    const DeleteDomain = useDeleteData()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleChange = (e) => {
        setInitialData({ ...initialdata, [e.target.name]: e.target.value });
    };
    
    const handleOpenModal = () => {
        setShowModal(true);
        // Additional logic after closing the modal
    };
    const handleNaviagate = (rowData) => {
        dispatch(setUserDetails(rowData))
        navigate("/dashboard")
    }
  
    let columns = [
        { name: "Domain", selector: "domain", sortable: true },
        {
            name: "Action",
            cell: (rowData) => (
                <>

                    <Button
                        style={{ background: "   #184370" }}
                        variant="primary acasd"
                        onClick={() => handleNaviagate(rowData)}
                    >
                        Select
                    </Button>
                    <Button
                        variant="danger acasd"
                        onClick={() =>  DeleteDomain.handleSubmit(`security/domain?domain=${rowData.domain}`)}
                    >
                        Delete
                    </Button>
                </>
            ),
            width: "28%",
        },
    ];
    const getAllDomains = useDataFetch(`security/domain?limit=${limit}&page=${pageNumber}`, [pageNumber,DeleteDomain.Data,PostDomain.Data])
   useEffect(()=>{
    if(PostDomain.Data && PostDomain.Data.statusCode === 200){
        setShowModal(false)
        toast.success('Domain Added Successfully')
    }
   },[PostDomain.Data])
   console.log("PostDomain",PostDomain)
    return (
        <div className="content-wrapper" style={{ height: "100%", minHeight: "0" }}>
            {/* <button onClick={handleOpenModal} className='botton-add-website '>Add Website</button> */}
            {getAllDomains && getAllDomains.Data && getAllDomains.Data.data.length > 0 ? (
            <div>
              {/* Render pagination component */}

              <PaginationComponent
                columns={columns}
                data={getAllDomains.Data.data}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                totalPages={getAllDomains.Data.totalPages}
                showData={true}
              />
            </div>
          ) : (
            <h1>No Data Found</h1>
          )}
            {/* Modal */}
            {/* <Modal show={showModal} onHide={()=> setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row >
                        <Col className='top-hover-add'>
                            <header className="mt-4">
                                <h4 className='title-add-website'>Add your website or application to Security Tool</h4>
                                <p>
                                    Optimize and monitor security, performance, and reliability for your
                                    visitors.
                                </p>
                            </header>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form onSubmit={(e)=>PostDomain.handleSubmit(e,'security/domain', initialdata)}>
                                <Form.Group>
                                    <h4 className='title-add-website'>Enter your domain</h4>
                                    <p>
                                        This will be the name of the space where you apply Security Tool
                                        configurations and monitor impact on your website or application.
                                    </p>
                                    <Form.Label>Enter domain name </Form.Label>
                                    <Form.Control
                                        name="domain"
                                        type="text"
                                        value={initialdata.domain}
                                        placeholder='example.com'
                                        onChange={handleChange}
                               
                                    />
                                    <Form.Select aria-label="Select Type Of Application" name='type'  onChange={handleChange} className='form-cotrol'>
                                        <option hidden>Select Type Of Application </option>
                                        <option value="nodejs">Server Side(Nodejs)</option>
                                        <option value="web">Client Side(Web Application)</option>

                                    </Form.Select>

                                </Form.Group>
                                {
                                  PostDomain.errors.error && PostDomain.errors.message && <span className='text-danger'>{PostDomain.errors.message}</span> 
                                }
                                {PostDomain.errors.loading ?( <Button
                                 disabled
                                 data-testid="control-button"
                                 className="btn btn-primary mt-3 button-sign"
                             >
                                 Please Wait
                             </Button>): <Button
                                    onClick={(e)=>PostDomain.handleSubmit(e,'security/domain', initialdata)}
                                    type="submit"
                                    data-testid="control-button"
                                    className="btn btn-primary mt-3 button-sign"
                                >
                                    Continue
                                </Button>    
                            }
                               
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className='button-sign' onClick={()=> setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal> */}
            {/* End Modal */}
        </div>
    );
}

export default AllWebsites
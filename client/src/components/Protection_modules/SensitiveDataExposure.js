import React, { useEffect, useState } from 'react';
import useDataFetch from '../../hooks/DataFetchHook';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Chart1 from '../Charts/Chart1';

const SensitiveDataExposure = () => {
    const [progress, setProgress] = useState(0);
    const [completeed, setCompleted] = useState(0);
    const [responseData, setResponseData] = useState([]);
    const UserData = useSelector((state) => state.UserReducer);
    const sourcecodeDisclosoure = useDataFetch(`SensitiveDataExposure/sourcecode-disclosoure?domain=${UserData.domain}`, [UserData.domain]);
    const DefaultWebPage = useDataFetch(`SensitiveDataExposure/DefaultWebPage?domain=${UserData.domain}`, [UserData.domain]);
    const emailHarvesting = useDataFetch(`SensitiveDataExposure/email-harvesting?domain=${UserData.domain}`, [UserData.domain]);
    const SensitiveKeysinUrl = useDataFetch(`SensitiveDataExposure/sensitive-data?type=url&domain=${UserData.domain}`, [UserData.domain]);
    const SensitiveKeysinBody = useDataFetch(`SensitiveDataExposure/sensitive-data?type=response&domain=${UserData.domain}`, [UserData.domain]);
    console.log("SensitiveKeysinUrl",sourcecodeDisclosoure)
    // Function to make an API request
    async function fetchData(url, filepath) {
        try {
            // Make API request using directoryPath and name
            const response = await axios.get(url);
            // Process response as needed
            return response.status
        } catch (error) {
            return 400
        }
    }

        // Process data array sequentially
        const processSequentially = async () => {
            try {
                const totalItems = sourcecodeDisclosoure.data.length;
                let completedItems = 0;
                const responses = [];
                
                for (const item of sourcecodeDisclosoure.data) {
                    // Make API request for the current item
                   
                        const data = await fetchData(`http://${UserData.domain + item.directoryPath}/${item.name + item.extension}`, `${item.directoryPath}/${item.name + item.extension}`);
                        data===200 && responses.push(data);
                        completedItems++
                        setCompleted(completedItems)
                        // Update progress
                        const progressPercentage = Math.round((completedItems / totalItems) * 100);
                        setProgress(progressPercentage);

                        // Optionally, you can wait for some time before making the next API call
                        // For example, wait for 1 second
                        await delay(1000); // 1000 milliseconds = 1 second
                    
                }

                setResponseData(responses);
            } catch (error) {
                console.error('Error processing data:', error);
            }
        };

        // SensitiveDataExposure.data && SensitiveDataExposure.data.length > 0 && processSequentially();
  
    // Function to simulate a delay
    const delay = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };
console.log("completeed",completeed)
    return (
        <React.Fragment>
            <div className="card card-primary card-outline">
                <div className="card-header">
                    <h5><i className="fas fa-shield-alt" /> &nbsp;Protection Modules (Sensitive Data Exposure)</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12 col-lg-12">
                            <ul>
                                <li>An adversary can harvest email ids for spamming: {emailHarvesting.data?"Yes":"No"}</li>
                                <li>
                                 Application’s server side source code disclosure
                                    {/* Progress bar */}
                                 {
                                    sourcecodeDisclosoure.errors.loading ? <div>Loading...</div> : sourcecodeDisclosoure.errors.error ? <div>Error: {sourcecodeDisclosoure.errors.message}</div> : sourcecodeDisclosoure.data && sourcecodeDisclosoure.data.length > 0 ? (
                                        <div>
                                            <div className="progress">
                                                <div className="progress-bar" role="progressbar" style={{ width: `${progress}%` }} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">{progress}%</div>
                                            </div>
                                            <div className="text-center">{completeed} of {sourcecodeDisclosoure?.data?.length} completed</div>
                                            <button className="btn btn-primary" onClick={processSequentially}>Check For Source Code Disclosure</button>
                                        </div>
                                    ) : <div>No data available</div>
                                 }
                                </li>
                                {responseData.map((response, index) => (
                                    <li key={index}><span><b>{response.message}</b></span></li>
                                ))}
                             
                                {SensitiveKeysinUrl.data && <Chart1 url={"/SensitiveData/url"} data={SensitiveKeysinUrl.data} title={"Critical information in URL"}/> }
                                {SensitiveKeysinBody.data && <Chart1 url={"/SensitiveData/response"} data={SensitiveKeysinBody.data} title={"Sensitive information revealed in HTTP response"}/> }
                                <li>Default web-page present in the server :{DefaultWebPage?.data}</li>
                                <li>Physical server path disclosure</li>
                                <li> Sensitive application configuration architecture files available at users machine in clear text </li>
                                {/* <li> Credentials are transmitted to server in plain text </li> */}
                                {/* <li> Sensitive data is transmitted to server in plain text </li> */}
                                <li>Cleartext Password returned in login response  </li>
                            </ul>
                            
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default SensitiveDataExposure;

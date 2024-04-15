import React from 'react';
import { Accordion, Card } from 'react-bootstrap';
import data from "../../helpers/dashboard"
const SecurityToolDashboard = () => {
  return (
    <div className="container my-5">
      <h1>Security Tool Dashboard</h1>
      {/* <Accordion defaultActiveKey="0">
        {data.map((category, index) => (
          <Card key={index}>
            <Accordion.Toggle as={Card.Header} eventKey={index}>
              {category.Category}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={index}>
              <Card.Body>
                <ul>
                  {category.UseCases.map((useCase, i) => (
                    <li key={i}>{useCase}</li>
                  ))}
                </ul>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion> */}
    </div>
  );
};

export default SecurityToolDashboard;
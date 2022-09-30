import React from "react";
import "../../style/front/viewSupplyTable.scss";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const DetailPage = () => {
  return (
    <>
      <div className="new">
        <div className="newContainer">
          <div className="top">
            <h4>View Product Details</h4>
          </div>
          <div className="bottom">
            <div className="right">
              <Card style={{ width: "80rem" }}>
                <Card.Body>
                  <Card.Title>Spinning Material Detail</Card.Title>
                  <Card.Text style={{ width: '50%', float: 'left' }}>
                    <>
                    <p><b>Batch ID : </b>0</p>
                    <p><b>Total Product Quantity : </b>100</p>
                    <p><b>You Purchase : </b>10</p>
                    <p><b>Product Des : </b>T-shirts</p>
                    <p><b>Supplier Name : </b>Babulal Saini</p>
                    <p><b>Supplier Location : </b>Mumbai</p>
                    <p><b>Supplier Listing Date : </b>11/01/2000</p>
                    <p><b>Factory Name : </b>Rahul</p>
                    <p><b>Factory Location : </b>Jaipur</p>
                    </>
                  </Card.Text>
                  <Card.Text style={{ width: '50%', float: 'left' }}>
                    <>
                    <p><b>Factory Listing Date : </b>15/01/2000</p>
                    <p><b>WareHouse Name : </b>Vipin</p>
                    <p><b>Distributor Name : </b>Tavish Rao</p>
                    <p><b>Distributor Location : </b>Delhi</p>
                    <p><b>Distributor Listing Date : </b>25/01/2000</p>
                    <p><b>Retailer Name : </b>Retailer</p>
                    <p><b>Retailer Location : </b>Surat</p>
                    <p><b>Retailer Listing Date : </b>15/02/2000</p>
                    </>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPage;

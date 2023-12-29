import React, { useState } from "react";
import PropTypes from "prop-types";
import { utils } from "near-api-js";
import { Card, Button, Col, Badge, Stack } from "react-bootstrap";


const Product = ({ product, buy, deleteProduct, getProducts }) => {
  const { id, price, name, description, sold, location, image, owner, supply } =
    product;
    console.log(id)

  const triggerBuy = () => {
    buy(id, price);
  };

  const triggerDelete = () => {
    deleteProduct(id)
  }


  return (
    <>
    <Col key={id}>
    
      <Card className=" h-100">
        <Card.Header>
          <Stack direction="horizontal" gap={2}>
            <span className="font-monospace text-secondary">{owner}</span>
            <Badge bg="secondary" className="ms-auto">
              {sold} Sold
            </Badge>
            <Badge bg="secondary" className="ms-auto">
              {supply} Supplies
            </Badge>
          </Stack>
        </Card.Header>
        <div className=" ratio ratio-4x3">
          <img src={image} alt={name} style={{ objectFit: "cover" }} />
        </div>
        <Card.Body className="d-flex  flex-column text-center">
          <Card.Title>{name}</Card.Title>
          <Card.Text className="flex-grow-1 ">{description}</Card.Text>
          <Card.Text className="text-secondary">
            <span>{location}</span>
          </Card.Text>
          <Button
            variant="outline-dark"
            onClick={triggerBuy}
            className="w-100 py-3"
          >
            Buy for {utils.format.formatNearAmount(price)} NEAR
          </Button>
          <Button
            variant="outline-danger"
            onClick={triggerDelete}
            className="w-100 py-3 mt-4"
          >
            Delete
          </Button>
        </Card.Body>
      </Card>
    </Col>
    </>
  );
};

Product.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired,
  buy: PropTypes.func.isRequired,
};

export default Product;
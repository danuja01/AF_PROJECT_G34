import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import PropTypes from "prop-types";

import React from "react";

export function ToursCard({ color, chart, title, description, footer }) {
  return (
    <Card>
      <CardHeader color={"gray"}>
        <img
          src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
          alt="img-blur-shadow"
          layout="fill"
        />
      </CardHeader>
      <CardBody className="p-6">
        <Typography variant="h6" color="blue-gray">
          Sri Lanka Culureal Triangle
        </Typography>
        <Typography variant="small" className="font-normal text-blue-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
          asperiores itaque odit eius expedita autem minima architecto aut
          distinctio et.
        </Typography>
      </CardBody>

      <CardFooter className="border-blue-green-50 border-t px-6 py-5">
        <a href="" className="mr-5 text-blue-600">
          Upgrade
        </a>
        <a href="" className="text-red-600">
          Delete
        </a>
      </CardFooter>
    </Card>
  );
}

ToursCard.defaultProps = {
  color: "blue",
  footer: null,
};

ToursCard.propTypes = {
  color: PropTypes.oneOf([
    "white",
    "blue-gray",
    "gray",
    "brown",
    "deep-orange",
    "orange",
    "amber",
    "yellow",
    "lime",
    "light-green",
    "green",
    "teal",
    "cyan",
    "light-blue",
    "blue",
    "indigo",
    "deep-purple",
    "purple",
    "pink",
    "red",
  ]),
  title: PropTypes.node.isRequired,
  description: PropTypes.node.isRequired,
  footer: PropTypes.node,
};

ToursCard.displayName = "/src/widgets/charts/statistics-chart.jsx";

export default ToursCard;

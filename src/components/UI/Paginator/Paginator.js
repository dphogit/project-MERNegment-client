import React from "react";

import Button from "../Button/Button";
import classes from "./Paginator.module.css";

const Paginator = ({ onPrevious, onNext, lastPage, currentPage }) => {
  return (
    <div className={classes.Paginator}>
      {currentPage > 1 && (
        <Button
          btnType="paginator"
          className={`btn ${classes.PaginatorBtn}`}
          clickEvent={onPrevious}
          paginatorAction="previous"
        >
          &lt; Previous
        </Button>
      )}
      {currentPage < lastPage && (
        <Button
          btnType="paginator"
          className={`btn ${classes.PaginatorBtn}`}
          clickEvent={onNext}
          paginatorAction="next"
        >
          Next &gt;
        </Button>
      )}
    </div>
  );
};

export default Paginator;

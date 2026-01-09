const errorMiddleware = (err, req, res, next) => {
  try {
    let error = { ...err };
    error.mesaage = err.mesaage;
    console.error(err);

    //   Mongoose bad  ObjectId
    if (err.name === "CastError") {
      const message = "Resource Not Found";
      error = new Error(message);
      error.statusCode = 404;
    }

    // Mongoose duplicate id
    if ((err.code = 11000)) {
      const mesaage = "Duplicate Filed Value enterd";
      error = new Error(mesaage);
      error.statusCode = 400;
    }

    // Mongoose validation error
    if (err.name === "ValidationError") {
      const mesaage = Object.values(err.error).map((val) => val.mesaage);
      error = new Error(mesaage.join(", "));
      error.statusCode = 400;
    }

    res.status(error.statusCode || 500);
  } catch (error) {
    next(error);
  }
};


export default errorMiddleware;
class BaseError extends Error {
    constructor(description,field , status_code , isOperational) {
      super(description);
      this.field = field
      this.status_code = status_code;
      this.isOperational = isOperational;
      Error.captureStackTrace(this);
    }
}

class HTTP400Error extends BaseError {
    constructor(description = "Bad requests" , field = "") {
      super(description, field, 400, true);
    }
}

class HTTP401Error extends BaseError {
    constructor(description = "unauthorized" , field = "") {
      super(description, field, 401, true);
    }
}

class HTTP403Error extends BaseError {
  constructor(description = "forbidden" , field = "") {
    super(description, field, 403, true);
  }
}
class HTTP404Error extends BaseError {
  constructor(description = "resource not found " , field = "") {
    super(description, field, 403, true);
  }
}

// resource confilict 
class HTTP409Error extends BaseError {
  constructor(description = "Resouce confilict" , field ="" ) {
    super(description, field, 409, true);
  }
}


class HTTP500Error extends BaseError {
  constructor(description = "Internal server error" , isOperational = true ,  field ="" ) {
    super(description, field, 500, isOperational);
  }
}


export { 
    HTTP400Error,
    HTTP401Error,
    HTTP409Error,
    HTTP500Error,
    HTTP403Error,
    HTTP404Error,
    BaseError
}

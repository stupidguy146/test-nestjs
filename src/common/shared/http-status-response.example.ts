export const httpStatusResponses = {
  400: {
    status: 400,
    description: 'Bad Request',
    content: {
      'application/json': {
        example: {
          statusCode: 400,
          message: 'Bad Request',
        },
      },
    },
  },
  401: {
    status: 401,
    description: 'Unauthorized',
    content: {
      'application/json': {
        example: {
          statusCode: 401,
          message: 'Unauthorized',
        },
      },
    },
  },
  404: {
    status: 404,
    description: 'Not Found',
    content: {
      'application/json': {
        example: {
          statusCode: 404,
          message: 'Not Found',
        },
      },
    },
  },
  500: {
    status: 500,
    description: 'Internal Server Error',
    content: {
      'application/json': {
        example: {
          statusCode: 500,
          message: 'Internal Server Error',
        },
      },
    },
  },
};

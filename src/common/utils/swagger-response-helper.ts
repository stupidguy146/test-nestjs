import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { httpStatusResponses } from '../shared/http-status-response.example';

export function ApiCommonResponses(domain: string) {
  const decorators = [];
  for (const key in httpStatusResponses) {
    if (parseInt(key) >= 400) {
      const response = httpStatusResponses[key];
      const modifiedExample = {
        StatusCode: response.content['application/json'].example.statusCode,
        Domain: domain,
        Message: response.content['application/json'].example.message,
      };

      decorators.push(
        ApiResponse({
          ...response,
          content: {
            ...response.content,
            'application/json': {
              ...response.content['application/json'],
              example: modifiedExample,
            },
          },
        }),
      );
    }
  }
  return applyDecorators(...decorators);
}

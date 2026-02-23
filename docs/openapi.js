import swaggerJsdoc from 'swagger-jsdoc';
import pj from '.././package.json' with {type: 'json'};

const options = {
    failOnErrors: true,
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'NextUp',
            description: 'API documentation',
            version: pj.version
        },
        servers: [
            {
                url: 'http://localhost:3000/api/v1',
                description: 'Local development server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },

    apis: [
        './docs/*.yaml'
    ],
}

export const openapiSpecification = swaggerJsdoc(options);
export const schema = {
  type: 'array',
  minLength: 1,
  items: {
    type: 'object',
    additionalProperties: true,
    required: ['list'],
    properties: {
      list: {
        type: 'array',
        items: {
          type: 'object',
          additionalProperties: true,
          required: ['main', 'weather', 'wind', 'dt', 'id', 'name', 'sys'],
          properties: {
            main: {
              type: 'object',
              additionalProperties: true,
              required: ['temp', 'temp_min', 'temp_max'],
              properties: {
                temp: { type: 'number' },
                temp_min: { type: 'number' },
                temp_max: { type: 'number' }
              }
            },
            weather: {
              type: 'array',
              minLength: 1,
              items: {
                type: 'object',
                additionalProperties: true,
                required: ['icon'],
                properties: {
                  icon: { type: 'string' }
                }
              }
            },
            wind: {
              type: 'object',
              additionalProperties: true,
              required: ['speed'],
              properties: {
                speed: { type: 'number' }
              }
            },
            dt: { type: 'number' },
            id: { type: 'number' },
            name: { type: 'string' },
            sys: {
              type: 'object',
              additionalProperties: true,
              required: ['timezone'],
              properties: {
                timezone: { type: 'number' }
              }
            }
          }
        }
      }
    }
  }
};

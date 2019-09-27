export const schema = {
  type: 'object',
  additionalProperties: true,
  required: ['city', 'list'],
  properties: {
    city: {
      type: 'object',
      additionalProperties: true,
      required: ['id', 'name', 'timezone'],
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        timezone: { type: 'number' }
      }
    },
    list: {
      type: 'array',
      minLength: 1,
      items: {
        type: 'object',
        additionalProperties: true,
        required: ['main', 'weather', 'wind', 'dt_txt'],
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
          dt_txt: { type: 'string' }
        }
      }
    }
  }
};

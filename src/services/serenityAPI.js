const axios = require('axios');
const logger = require('../utils/logger');

class SerenityAPI {
  constructor() {
    this.baseURL = 'https://provider.serenity.health/api/v1';
    this.apiKey = null;
  }

  setApiKey(apiKey) {
    this.apiKey = apiKey;
  }

  async validateApiKey(apiKey) {
    try {
      const response = await axios.post(`${this.baseURL}/auth/validate`, null, {
        headers: { 'Authorization': `Bearer ${apiKey}` }
      });
      return response.data.valid;
    } catch (error) {
      logger.error('API key validation failed:', error.message);
      return false;
    }
  }

  async sendResults(data) {
    if (!this.apiKey) {
      throw new Error('API key not configured');
    }

    try {
      const response = await axios.post(`${this.baseURL}/results`, data, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      logger.error('Failed to send results:', error.message);
      throw error;
    }
  }

  async downloadApiKey(credentials) {
    try {
      const response = await axios.post(`${this.baseURL}/auth/generate-key`, credentials);
      return response.data.apiKey;
    } catch (error) {
      logger.error('Failed to download API key:', error.message);
      throw error;
    }
  }
}

module.exports = new SerenityAPI();
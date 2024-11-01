# Serenity Lab Integration API

This API provides integration between laboratory equipment and the Serenity EMR system.

## Supported Equipment

- Sysmex XN 350
- Vitros 5600
- Response 920

## Installation

1. Clone this repository
2. Run the installation script:
   ```bash
   npm run install-app
   ```
   This will:
   - Create necessary directories
   - Configure environment variables
   - Install dependencies
   - Set up initial configuration

   Or install manually:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and configure your settings
4. Start the server:
   ```bash
   npm run dev
   ```

## Configuration

- Equipment settings can be configured via the `/api/config/equipment` endpoint
- Connection settings are managed through `/api/config/connections`
- API keys can be configured through the Serenity API interface

## API Documentation

### Equipment Endpoints
- GET `/api/equipment` - List all connected equipment
- POST `/api/equipment/connect` - Connect to equipment
- POST `/api/equipment/disconnect` - Disconnect equipment

### Serenity Integration
- POST `/api/serenity/results` - Send results to Serenity EMR
- GET `/api/serenity/status` - Check Serenity connection status

### Configuration
- GET `/api/config/equipment` - List available equipment configurations
- GET `/api/config/connections` - Get current connection settings
- POST `/api/config/connections` - Update connection settings

## Security

- All API endpoints require authentication
- Communication is encrypted
- API keys are securely stored
- Comprehensive logging is implemented

## Development

- Run tests: `npm test`
- Start development server: `npm run dev`
- Create distribution zip: `npm run create-zip`
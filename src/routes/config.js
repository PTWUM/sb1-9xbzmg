const express = require('express');
const router = express.Router();
const yaml = require('yaml');
const fs = require('fs').promises;
const path = require('path');
const equipmentConfigs = require('../config/equipment');

const CONFIG_FILE = path.join(__dirname, '../config/connections.yml');

// Get all available equipment configurations
router.get('/equipment', (req, res) => {
  res.json(equipmentConfigs);
});

// Get current connections configuration
router.get('/connections', async (req, res) => {
  try {
    const config = await fs.readFile(CONFIG_FILE, 'utf8');
    res.json(yaml.parse(config));
  } catch (error) {
    res.status(500).json({ error: 'Failed to read configuration' });
  }
});

// Update connection configuration
router.post('/connections', async (req, res) => {
  const { equipmentId, config } = req.body;
  
  try {
    let connections = {};
    try {
      const existing = await fs.readFile(CONFIG_FILE, 'utf8');
      connections = yaml.parse(existing);
    } catch (error) {
      // File doesn't exist yet, starting fresh
    }

    connections[equipmentId] = config;
    await fs.writeFile(CONFIG_FILE, yaml.stringify(connections));
    
    res.json({ message: 'Configuration updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update configuration' });
  }
});

module.exports = router;
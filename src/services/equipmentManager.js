const SerialPort = require('serialport');
const net = require('net');
const logger = require('../utils/logger');

class EquipmentManager {
  constructor() {
    this.connections = new Map();
  }

  async connect(equipmentId, config) {
    const { protocol, port, ip, serialPort } = config;
    
    if (protocol === 'TCP/IP') {
      return this.connectTCP(equipmentId, ip, port);
    } else if (protocol === 'Serial') {
      return this.connectSerial(equipmentId, serialPort);
    }
    
    throw new Error('Unsupported protocol');
  }

  async connectTCP(equipmentId, ip, port) {
    const client = new net.Socket();
    
    return new Promise((resolve, reject) => {
      client.connect(port, ip, () => {
        this.connections.set(equipmentId, client);
        logger.info(`Connected to ${equipmentId} via TCP/IP`);
        resolve(client);
      });

      client.on('error', (error) => {
        logger.error(`Connection error for ${equipmentId}: ${error.message}`);
        reject(error);
      });
    });
  }

  async connectSerial(equipmentId, port) {
    const serialPort = new SerialPort(port, {
      baudRate: 9600
    });

    return new Promise((resolve, reject) => {
      serialPort.on('open', () => {
        this.connections.set(equipmentId, serialPort);
        logger.info(`Connected to ${equipmentId} via Serial`);
        resolve(serialPort);
      });

      serialPort.on('error', (error) => {
        logger.error(`Serial connection error for ${equipmentId}: ${error.message}`);
        reject(error);
      });
    });
  }

  async disconnect(equipmentId) {
    const connection = this.connections.get(equipmentId);
    if (connection) {
      connection.end();
      this.connections.delete(equipmentId);
      logger.info(`Disconnected from ${equipmentId}`);
    }
  }
}

module.exports = new EquipmentManager();
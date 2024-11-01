const equipmentConfigs = {
  'sysmex-xn350': {
    name: 'Sysmex XN-350',
    protocols: ['TCP/IP', 'Serial'],
    defaultPort: 5000,
    parser: require('../parsers/sysmex')
  },
  'vitros-5600': {
    name: 'Vitros 5600',
    protocols: ['TCP/IP'],
    defaultPort: 5100,
    parser: require('../parsers/vitros')
  },
  'response-920': {
    name: 'Response 920',
    protocols: ['TCP/IP', 'Serial'],
    defaultPort: 5200,
    parser: require('../parsers/response')
  }
}

module.exports = equipmentConfigs;
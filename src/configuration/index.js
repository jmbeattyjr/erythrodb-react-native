
const config = {
  gateway: {
    host: process.env.REACT_APP_GATEWAY_URL || "http://localhost",
    port: process.env.REACT_APP_GATEWAY_PORT || 9001,
    path: process.env.REACT_APP_GATEWAY_PATH || ""
  },
  // mqtt: {
  //   host: process.env.REACT_APP_MQTT_URL || "ws://localhost",
  //   port: process.env.REACT_APP_MQTT_WS_PORT || 1886,
  //   path: process.env.REACT_APP_MQTT_URL_PATH || ""
  // }
};

config.gateway.baseUrl = `${config.gateway.host}:${config.gateway.port}${
  config.gateway.path
}`;

// config.mqtt.baseUrl = `${config.mqtt.host}:${config.mqtt.port}${
//   config.mqtt.path
// }`;

//console.log("Gateway base url: ", config.gateway.baseUrl);
// console.log("MQTT base url: ", config.mqtt.baseUrl);

export default config;

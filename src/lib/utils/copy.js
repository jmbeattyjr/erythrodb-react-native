import constants from "../constants.json";

const getFullPageTitle = title => `${title} | ${constants.siteMeta.title}`;

export { getFullPageTitle };

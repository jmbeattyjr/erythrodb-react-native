import fs from "fs";
import matter from "gray-matter";
import yaml from "js-yaml";

/**
 * Parses the information of a markdown file with front matter
 * in YAML
 * @param {string} path Path to file
 * @returns {Promise} Resolves to an object with the markdown file's
 * information
 */
const getSingleFileMd = path => {
  const getFiles = () =>
    new Promise(resolve => {
      if (fs.existsSync(path)) {
        const data = fs.readFileSync(path, "utf8");
        const dataObj = matter(data);
        if (dataObj.data.title) {
          dataObj.data.slug = dataObj.data.title
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "");
        }
        delete dataObj.orig;
        resolve(dataObj);
      }
    });
  return getFiles();
};

/**
 * Parses the information of a YAML file
 * @param {string} path Path to file to be read
 * @returns {object} An object containing the YAML file's parsed information
 */
const getSingleFileYaml = path => yaml.safeLoad(fs.readFileSync(path, "utf8"));

export { getSingleFileMd, getSingleFileYaml };

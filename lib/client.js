const got = require('got');
const obsidian = require('obsidian');
const debug = require('debug')('toggl-client');

const Workspaces = require('./workspaces');
const Clients = require('./clients');
const Groups = require('./groups');
const Tags = require('./tags');
const ProjectUsers = require('./project-users');
const Projects = require('./projects');
const TimeEntries = require('./time-entries');
const Reports = require('./reports');

/**
 * Main class to interact with the toggl API.
 * Calling `togglClient({ apiToken: YOUR_API_TOKEN });` returns an instance of this class.
 *
 * @property {Workspaces} workspaces
 * @property {Projects} projects
 * @property {TimeEntries} timeEntries
 * @property {Clients} clients
 * @property {Groups} groups
 * @property {Tags} tags
 * @property {ProjectUsers} projectUsers
 * @class TogglClient
 */
class TogglClient {
  /**
   * Creates an instance of TogglClient.
   * @param {*} options
   * @memberof TogglClient
   */
  constructor(options) {
    this.options = options || {};
    this.options.apiToken = this.options.apiToken || process.env.TOGGL_API_TOKEN;

    if (!this.options.apiToken) {
      throw new Error('Required option "apiToken" was not provided');
    }

    this.clients = new Clients(this);
    this.groups = new Groups(this);
    this.tags = new Tags(this);
    this.projects = new Projects(this);
    this.timeEntries = new TimeEntries(this);
    this.projectUsers = new ProjectUsers(this);
    this.workspaces = new Workspaces(this);
    this.reports = new Reports(this);

    this.gotOptions = {
      prefixUrl: 'https://api.track.toggl.com/api/v8',
      username: this.options.apiToken,
      password: 'api_token',
      throwHttpErrors: false,
    };

    if (options.headers) {
      this.gotOptions.headers = options.headers;
    }

    if (options.legacy === true) {
      this.httpClient = got.extend(this.gotOptions);
      console.info('toggl-client running in legacy mode.');
    }
  }

  async get(path, searchParams) {
    return await this.request(path, { method: 'GET', searchParams });
  }

  async put(path, json) {
    return await this.request(path, { method: 'PUT', json });
  }

  async post(path, json) {
    return await this.request(path, { method: 'POST', json });
  }

  async delete(path) {
    return await this.request(path, { method: 'DELETE' });
  }

  async request(path, options) {
    debug('requesting toggl API path %s with options %o', path, options);

    if (this.options.legacy === true) {
      return this.requestGot(path, options);
    } else {
      return this.requestObsidian(path, options);
    }
  }

  async requestObsidian(path, options) {
    const prefixUrl = options.prefixUrl || this.gotOptions.prefixUrl;

    let url = `${prefixUrl}/${path}`;

    if (options.searchParams) {
      const searchParams = new URLSearchParams(options.searchParams);
      searchParams.set('user_agent', this.gotOptions.headers['user-agent']);
      url += `?${searchParams.toString()}`;
    }

    const requestParams = {
      url: url,
      method: options.method,
      contentType: 'application/json',
      body: JSON.stringify(options.json),
      headers: {
        ...this.gotOptions.headers,
        Authorization: 'Basic ' + Buffer.from(`${this.gotOptions.username}:${this.gotOptions.password}`).toString('base64'),
      },
    };

    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const maxRetries = this.options.maxRetries || 5;
    let response;

    for (let i = 0; i < maxRetries; i++) {
      response = await obsidian.requestUrl(requestParams);
      if (response.status === 429) {
        const backoff = 2 ** i * 1000 + Math.random() * 100;
        await wait(backoff);
      } else {
        break;
      }
    }

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Toggl API responded with status code ${response.status}. Response: ${response.text}`);
    }

    return JSON.parse(response.text);
  }

  async requestGot(path, options) {
    const response = await this.httpClient(path, options);

    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw new Error(`Toggl API responded with status code ${response.statusCode}. Response: ${response.body}`);
    }

    return JSON.parse(response.body);
  }
}

module.exports = TogglClient;

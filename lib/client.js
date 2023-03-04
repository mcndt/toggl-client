const obsidian = require('obsidian');
import got from 'got';
import debugClient from 'debug';

import Workspaces from './workspaces.js';
import Clients from './clients.js';
import Groups from './groups.js';
import Tags from './tags.js';
import ProjectUsers from './project-users.js';
import Projects from './projects.js';
import TimeEntries from './time-entries.js';
import Reports from './reports.js';
import User from './user.js';

const debug = debugClient('toggl-client');

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
 * @property {User} user
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
    this.user = new User(this);

    this.gotOptions = {
      prefixUrl: 'https://api.track.toggl.com/api/v9',
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

  async patch(path, json) {
    return await this.request(path, { method: 'PATCH', json });
  }

  async delete(path) {
    return await this.request(path, { method: 'DELETE' });
  }

  async request(path, options) {
    // Disables retry logic following suggestion from https://github.com/sindresorhus/got/issues/1489
    options.retry = { limit: 0 };
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

    const user_agent = this.gotOptions.headers && this.gotOptions.headers['user-agent'];

    if (user_agent) {
      const searchParams = new URLSearchParams(options.searchParams);
      searchParams.set('user_agent', this.gotOptions.headers['user-agent']);
      url += `?${searchParams.toString()}`;
    }

    const requestParams = {
      url: url,
      method: options.method,
      contentType: 'application/json',
      body: options.body ? options.body : JSON.stringify(options.json),
      headers: {
        ...this.gotOptions.headers,
        Authorization: 'Basic ' + Buffer.from(`${this.gotOptions.username}:${this.gotOptions.password}`).toString('base64'),
      },
    };

    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const maxRetries = this.options.maxRetries || 5;
    let response;

    for (let i = 0; i < maxRetries; i++) {
      response = await obsidian.requestUrl({ ...requestParams, throw: false });
      if (response.status === 429) {
        const backoff = 2 ** i * 1000 + Math.random() * 100;
        await wait(backoff);
      } else {
        break;
      }
    }

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Toggl API responded with status code ${response.status}. Response: ${response.text} (API endpoint: ${path})`);
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

export default TogglClient;

const { expect } = require('chai');
const debug = require('debug')('toggl-client-tests');
const togglClient = require('../');

describe('smoke test', () => {
  before(() => {
    if (!process.env.TOGGL_API_TOKEN) {
      console.error('Please make sure to set the environment variable "TOGGL_API_TOKEN" before running the smoke tests');
      process.exit(1);
    }
  });

  it('should list workspaces', async () => {
    const client = togglClient();
    const workspaces = await client.workspaces.list();

    debug(workspaces);
    expect(workspaces).to.be.an('array').that.is.not.empty;
  });

  it('should list projects in a workspace', async () => {
    const client = togglClient();
    const workspaces = await client.workspaces.list();

    for (const workspace of workspaces) {
      const projects = await client.workspaces.projects(workspace.id);
      debug(projects);

      expect(projects).to.be.an('array');
    }
  });

  it('should get a details report', async () => {
    const client = togglClient();

    const workspaces = await client.workspaces.list();

    const detailsReport = await client.reports.details(workspaces[0].id);

    debug(detailsReport);

    expect(detailsReport).to.exist.to.be.an('object');
  });

  it('should generate time entries', async () => {
    const client = togglClient();
    const workspaces = await client.workspaces.list();

    for (let i = 0; i < 52; i++) {
      const timeEntryCreated = await client.timeEntries.create({
        wid: workspaces[0].id,
        duration: 1200, // 20min
        start: new Date().toISOString(),
        description: 'Test Entry',
      });

      debug(timeEntryCreated);

      await timeout();
    }
  });
});

async function timeout() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 500);
  });
}

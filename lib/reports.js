import dayjs from 'dayjs';

/**
 * Access reports. See https://github.com/toggl/toggl_api_docs/blob/master/reports.md
 *
 * @class Reports
 */
class Reports {
  constructor(client) {
    this.client = client;
  }

  /**
   * Weekly report
   * https://developers.track.toggl.com/docs/reports/weekly_reports#post-search-time-entries
   */
  async weekly(workspaceId, params) {
    params = { ...params, start_date: dayjs().subtract(1, 'week').startOf('day').format('YYYY-MM-DD') };
    return await this.requestReport(`workspace/${workspaceId}/weekly/time_entries`, workspaceId, params);
  }

  /**
   * Weekly report containing all pages fetched with wait time between requests of 1010ms
   * https://developers.track.toggl.com/docs/reports/weekly_reports#post-search-time-entries
   */
  async weeklyAll(workspaceId, params) {
    params = { ...params, start_date: dayjs().subtract(1, 'week').startOf('day').format('YYYY-MM-DD') };
    return await this.requestReport(`workspace/${workspaceId}/weekly/time_entries`, workspaceId, params);
  }

  /**
   * Detailed report URL: GET https://api.track.toggl.com/reports/api/v3/workspace/{workspace_id}/search/time_entries
   * https://developers.track.toggl.com/docs/reports/detailed_reports#post-load-totals-detailed-report
   * params must include start_date
   */
  async details(workspaceId, params) {
    if (!params || !Object.prototype.hasOwnProperty.call(params, 'start_date')) {
      throw new Error('The parameters must include start_date');
    }
    return await this.requestReport(`workspace/${workspaceId}/search/time_entries`, workspaceId, params);
  }

  /**
   * Detailed report URL: GET https://api.track.toggl.com/reports/api/v3/workspace/{workspace_id}/search/time_entries
   * https://developers.track.toggl.com/docs/reports/detailed_reports#post-load-totals-detailed-report
   * params must include start_date
   */
  async totals(workspaceId, params) {
    if (!params || !Object.prototype.hasOwnProperty.call(params, 'start_date')) {
      throw new Error('The parameters must include start_date');
    }
    return await this.requestReport(`workspace/${workspaceId}/search/time_entries/totals`, workspaceId, params);
  }

  /**
   * Detailed report containing all pages fetched with wait time between requests of 1010ms URL: GET https://api.track.toggl.com/reports/api/v3/workspace/{workspace_id}/search/time_entries
   * https://developers.track.toggl.com/docs/reports/detailed_reports#post-load-totals-detailed-report
   * params must include start_date
   */
  async detailsAll(workspaceId, params) {
    if (!params || !Object.prototype.hasOwnProperty.call(params, 'start_date')) {
      throw new Error('The parameters must include start_date');
    }
    return await this.requestReportPages(`workspace/${workspaceId}/search/time_entries`, workspaceId, params);
  }

  async projectsSummary(workspaceId, params) {
    if (!params || !Object.prototype.hasOwnProperty.call(params, 'start_date')) {
      throw new Error('The parameters must include start_date');
    }
    return await this.requestReport(`workspace/${workspaceId}/projects/summary`, workspaceId, params);
  }

  /**
   * Summary report URL: GET https://api.track.toggl.com/reports/api/v2/summary
   */
  async summary(workspaceId, params) {
    if (!params || !Object.prototype.hasOwnProperty.call(params, 'start_date')) {
      throw new Error('The parameters must include start_date');
    }
    return await this.requestReport(`workspace/${workspaceId}/summary/time_entries`, workspaceId, params);
  }

  async requestReportPages(path, workspace_id, params) {
    const pages = [];

    let allDataFetched = false;
    let maxRowNumber = 0;

    while (!allDataFetched) {
      const reportPage = await this.requestReport(path, workspace_id, { ...params, first_row_number: maxRowNumber + 1 });
      pages.push(...reportPage);

      if (reportPage.length > 0) {
        maxRowNumber = reportPage[reportPage.length - 1].row_number;
        await timeout(500);
      } else {
        allDataFetched = true;
      }
    }

    return pages;
  }

  async requestReport(path, workspace_id, params) {
    const searchParams = {
      user_agent: `npm-toggl-client/1.0.0 (https://github.com/saintedlama/toggl-client)`,
      workspace_id,
      ...params,
    };

    const report = await this.client.request(path, {
      prefixUrl: 'https://api.track.toggl.com/reports/api/v3',
      method: 'POST',
      body: JSON.stringify(searchParams),
    });

    return report;
  }
}

function timeout(timeoutMs) {
  return new Promise((resolve) => setTimeout(() => resolve(), timeoutMs));
}

export default Reports;

// PRISHA XPRESS PVT. LTD. - FUTURE COMPANY SOFTWARE INTEGRATION MODULE
// ARCHITECTURE READY FOR OFFICIAL ENTERPRISE TMS / ERP INTEGRATION
// STRICT RULE: INTEGRATION REMAINS COMPLETELY DISABLED UNTIL REAL API CREDENTIALS EXIST
// STATUS: NOT_CONFIGURED (NO FAKE OR SIMULATED API REQUESTS ARE MADE)

export type IntegrationStatus =
  | 'NOT_CONFIGURED'
  | 'CONNECTED'
  | 'SYNC_PENDING'
  | 'SYNC_SUCCESS'
  | 'SYNC_FAILED';

export interface CompanySoftwareConfig {
  integrationName: string;
  status: IntegrationStatus;
  isConfigured: boolean;
  endpointUrl: string | null;
  lastSyncAttempt: string | null;
  lastSyncStatus: string | null;
  totalSyncedRecords: number;
  syncPolicy: {
    automaticSyncEnabled: boolean; // Must remain false: only authorized admin manual sync allowed
    onlyApprovedDrivers: boolean;  // Must be true: newly submitted drivers never sync
    duplicateCheckRequired: boolean;
  };
}

export interface SyncLogRecord {
  id: string;
  driverApplicationId: string;
  driverName: string;
  licenseNumber: string;
  status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'BLOCKED_NOT_CONFIGURED';
  message: string;
  attemptedAt: string;
  externalCompanyDriverId?: string;
}

class CompanySoftwareIntegrationService {
  private config: CompanySoftwareConfig = {
    integrationName: 'Prisha Enterprise TMS / ERP Core System',
    status: 'NOT_CONFIGURED',
    isConfigured: false,
    endpointUrl: null,
    lastSyncAttempt: null,
    lastSyncStatus: null,
    totalSyncedRecords: 0,
    syncPolicy: {
      automaticSyncEnabled: false,
      onlyApprovedDrivers: true,
      duplicateCheckRequired: true,
    },
  };

  private logs: SyncLogRecord[] = [];

  /**
   * Retrieves the current integration status.
   * Returns NOT_CONFIGURED by default.
   */
  public getConfig(): CompanySoftwareConfig {
    return { ...this.config };
  }

  /**
   * Validates if the integration is enabled and credentials are functional.
   */
  public isIntegrationActive(): boolean {
    return this.config.isConfigured && this.config.status === 'CONNECTED';
  }

  /**
   * Evaluates if a driver record is legally and operationally eligible for sync.
   * Rules:
   * 1. Integration must be active.
   * 2. Driver status MUST be 'Approved – Ready for Company Software'.
   * 3. Driver must not already be synchronized.
   */
  public canSyncDriver(
    driverStatus: string,
    isAlreadySynced: boolean
  ): { eligible: boolean; reason: string } {
    if (!this.isIntegrationActive()) {
      return {
        eligible: false,
        reason:
          'Integration is NOT_CONFIGURED. Official company software API endpoints and server credentials have not been provided.',
      };
    }

    if (driverStatus !== 'Approved – Ready for Company Software') {
      return {
        eligible: false,
        reason:
          'Only drivers with status "Approved – Ready for Company Software" can be transferred.',
      };
    }

    if (isAlreadySynced) {
      return {
        eligible: false,
        reason: 'This driver record has already been transferred to company software.',
      };
    }

    return { eligible: true, reason: 'Eligible for synchronization.' };
  }

  /**
   * Manual admin action to trigger sync.
   * Safely rejects if integration is not configured.
   */
  public async syncApprovedDriver(driver: {
    id: string;
    fullName: string;
    drivingLicenseNumber: string;
    status: string;
    isSynced?: boolean;
  }): Promise<{ success: boolean; message: string; log: SyncLogRecord }> {
    const eligibility = this.canSyncDriver(driver.status, Boolean(driver.isSynced));

    if (!eligibility.eligible) {
      const blockedLog: SyncLogRecord = {
        id: `sync-log-${Date.now()}`,
        driverApplicationId: driver.id,
        driverName: driver.fullName,
        licenseNumber: driver.drivingLicenseNumber,
        status: 'BLOCKED_NOT_CONFIGURED',
        message: eligibility.reason,
        attemptedAt: new Date().toISOString(),
      };
      this.logs.unshift(blockedLog);

      return {
        success: false,
        message: eligibility.reason,
        log: blockedLog,
      };
    }

    // Future placeholder when real API is provided:
    // const response = await fetch(this.config.endpointUrl, ...);
    return {
      success: false,
      message: 'Integration disabled pending official company software API documentation.',
      log: {
        id: `sync-log-${Date.now()}`,
        driverApplicationId: driver.id,
        driverName: driver.fullName,
        licenseNumber: driver.drivingLicenseNumber,
        status: 'BLOCKED_NOT_CONFIGURED',
        message: 'Awaiting company credentials.',
        attemptedAt: new Date().toISOString(),
      },
    };
  }

  public getSyncLogs(): SyncLogRecord[] {
    return [...this.logs];
  }
}

export const companySoftwareIntegration = new CompanySoftwareIntegrationService();

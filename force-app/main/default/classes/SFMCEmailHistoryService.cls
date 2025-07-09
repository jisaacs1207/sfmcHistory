public with sharing class SFMCEmailHistoryService {
  public class EmailRecord {
    @AuraEnabled
    public String subjectLine;
    @AuraEnabled
    public String emailWebUrl;
    @AuraEnabled
    public String createdDate;
    @AuraEnabled
    public String emailAddress;
    @AuraEnabled
    public String eventType;
    @AuraEnabled
    public String channelType;
  }

  // Entry point for LWC
  @AuraEnabled(cacheable=true)
  public static List<EmailRecord> getEmailHistory(String emailAddress) {
    if (isMockMode()) {
      return getMockEmailHistory(emailAddress);
    }
    // Real implementation
    return fetchFromSFMC(emailAddress);
  }

  private static Boolean isMockMode() {
    // Check if Named Credential exists in the org
    try {
      // NamedCredential.getOrgDefaults() is not available, so we query Metadata
      List<NamedCredential> creds = [
        SELECT MasterLabel
        FROM NamedCredential
        WHERE DeveloperName = 'SFMC_PI_Named_Credential'
        WITH SECURITY_ENFORCED
        LIMIT 1
      ];
      return creds.isEmpty(); // If not found, mock mode
    } catch (Exception e) {
      // If query fails, assume mock mode for safety
      System.debug('Error checking NamedCredential: ' + e.getMessage());
      return true;
    }
  }

  private static List<EmailRecord> getMockEmailHistory(String emailAddress) {
    List<EmailRecord> emails = new List<EmailRecord>();
    for (Integer i = 1; i <= 3; i++) {
      EmailRecord rec = new EmailRecord();
      rec.subjectLine = 'Mock Email ' + i;
      rec.emailWebUrl = 'https://www.example.com';
      rec.createdDate = String.valueOf(System.now().addDays(-i));
      rec.emailAddress = emailAddress;
      rec.eventType = 'Sent';
      rec.channelType = 'Email';
      emails.add(rec);
    }
    return emails;
  }

  private static List<EmailRecord> fetchFromSFMC(String emailAddress) {
    throw new AuraHandledException('fetchFromSFMC is not implemented yet.');
  }
}

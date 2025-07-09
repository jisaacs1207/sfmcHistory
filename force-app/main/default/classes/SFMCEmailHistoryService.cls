public with sharing class SFMCEmailHistoryService {
    public class EmailRecord {
        @AuraEnabled public String SubjectLine;
        @AuraEnabled public String EmailWebURL;
        @AuraEnabled public String CreatedDate;
        @AuraEnabled public String EmailAddress;
        @AuraEnabled public String EventType;
        @AuraEnabled public String ChannelType;
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
            List<Metadata.NamedCredential> creds = [SELECT MasterLabel FROM NamedCredential WHERE DeveloperName = 'SFMC_PI_Named_Credential' LIMIT 1];
            return creds.isEmpty(); // If not found, mock mode
        } catch (Exception e) {
            // If query fails, assume mock mode for safety
            return true;
        }
    }

    private static List<EmailRecord> getMockEmailHistory(String emailAddress) {
        List<EmailRecord> emails = new List<EmailRecord>();
        for (Integer i = 1; i <= 3; i++) {
            EmailRecord rec = new EmailRecord();
            rec.SubjectLine = 'Mock Email ' + i;
            rec.EmailWebURL = 'https://www.example.com/mockemail' + i;
            rec.CreatedDate = String.valueOf(System.now().addDays(-i));
            rec.EmailAddress = emailAddress;
            rec.EventType = 'Sent';
            rec.ChannelType = 'Email';
            emails.add(rec);
        }
        return emails;
    }

    private static List<EmailRecord> fetchFromSFMC(String emailAddress) {
        // TODO: Implement Named Credential + HTTP callout to SFMC DE
        // Filter by EmailAddress, EventType = 'Sent', ChannelType = 'Email'
        // Parse JSON response to EmailRecord list
        return new List<EmailRecord>();
    }
}

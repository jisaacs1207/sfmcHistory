@isTest
private class SFMCEmailHistoryServiceTest {
    @isTest static void testMockEmailHistory() {
        // Arrange
        String testEmail = 'test@example.com';
        // Act
        List<SFMCEmailHistoryService.EmailRecord> result = SFMCEmailHistoryService.getEmailHistory(testEmail);
        // Assert
        System.assertEquals(3, result.size(), 'Should return 3 mock emails');
        for (SFMCEmailHistoryService.EmailRecord rec : result) {
            System.assertEquals('Sent', rec.EventType);
            System.assertEquals('Email', rec.ChannelType);
            System.assertEquals(testEmail, rec.EmailAddress);
        }
    }
    // TODO: Add tests for fetchFromSFMC when real integration is implemented
}

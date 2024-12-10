package com.vpalz.hotellosterrenos.service.interfaces;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Map;

public interface IEmailService {
    /**
     * Send an HTML formatted email using a template
     * @param to recipient email address
     * @param subject email subject
     * @param templateName name of the HTML template to use
     * @param variables variables to be used in the template
     */
    void sendHtmlEmail(String to, String subject, String templateName, Map<String, Object> variables);

    /**
     * Send a simple text email
     * @param to recipient email address
     * @param subject email subject
     * @param body email content
     */
    void sendSimpleEmail(String to, String subject, String body);

    /**
     * Send a welcome email to new users
     * @param userEmail user's email address
     * @param userName user's name
     */
    void sendWelcomeEmail(String userEmail, String userName);

    /**
     * Send a password change confirmation email
     * @param userEmail user's email address
     * @param userName user's name
     */
    void sendPasswordChangeEmail(String userEmail, String userName);

    /**
     * Send an account deletion confirmation email
     * @param userEmail user's email address
     * @param userName user's name
     */
    void sendAccountDeletionEmail(String userEmail, String userName);

    /**
     *
     * @param oldEmail
     * @param newEmail
     * @param userName
     */
    void sendEmailChangeNotification(String oldEmail, String newEmail, String userName);

    void sendCorporateWelcomeEmail(String email, String name, String corporateId);

    void sendReservationConfirmationEmail(String userEmail, String userName, String confirmationCode,
                                          LocalDate checkIn, LocalDate checkOut, BigDecimal totalAmount, boolean isCorporate, String corporationName);

}
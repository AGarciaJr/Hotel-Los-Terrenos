package com.vpalz.hotellosterrenos.service.implementations;

import com.vpalz.hotellosterrenos.service.interfaces.IEmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.HashMap;
import java.util.Map;

@Service
public class EmailService implements IEmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TemplateEngine templateEngine;

    @Override
    public void sendHtmlEmail(String to, String subject, String templateName, Map<String, Object> variables) {
        try {
            // Debug prints
            System.out.println("Template Name: " + templateName);
            System.out.println("Variables: " + variables);

            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            Context context = new Context();
            context.setVariables(variables);

            // Debug print the processed HTML
            String htmlContent = templateEngine.process(templateName, context);
            System.out.println("Processed HTML Content: " + htmlContent);

            helper.setFrom("hotelvpalz@gmail.com");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);

            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            System.err.println("Failed to send HTML email: " + e.getMessage());
            e.printStackTrace();
        }
    }

    @Override
    public void sendSimpleEmail(String to, String subject, String body) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("hotelvpalz@gmail.com");
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Failed to send email: " + e.getMessage());
        }
    }

    @Override
    public void sendWelcomeEmail(String userEmail, String userName) {
        Map<String, Object> variables = new HashMap<>();
        variables.put("name", userName);

        sendHtmlEmail(
                userEmail,
                "Welcome to Hotel Los Terrenos",
                "emails/welcome-email",
                variables
        );
    }

    @Override
    public void sendPasswordChangeEmail(String userEmail, String userName) {
        Map<String, Object> variables = new HashMap<>();
        variables.put("name", userName);

        sendHtmlEmail(
                userEmail,
                "Password Updated - Hotel Los Terrenos",
                "emails/password-change-email",
                variables
        );
    }

    @Override
    public void sendAccountDeletionEmail(String userEmail, String userName) {
        Map<String, Object> variables = new HashMap<>();
        variables.put("name", userName);

        sendHtmlEmail(
                userEmail,
                "Account Deleted - Hotel Los Terrenos",
                "emails/account-deletion-email",
                variables
        );
    }

    @Override
    public void sendEmailChangeNotification(String oldEmail, String newEmail, String userName) {
        Map<String, Object> variables = new HashMap<>();
        variables.put("name", userName);
        variables.put("oldEmail", oldEmail);
        variables.put("newEmail", newEmail);

        // Send to both old and new email addresses
        sendHtmlEmail(
                oldEmail,
                "Email Address Change Notification - Hotel Los Terrenos",
                "emails/email-change",
                variables
        );

        sendHtmlEmail(
                newEmail,
                "Email Address Change Confirmation - Hotel Los Terrenos",
                "emails/email-change",
                variables
        );
    }
}
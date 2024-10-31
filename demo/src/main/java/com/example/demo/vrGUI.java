package com.example.demo;

import org.springframework.stereotype.Component;

import javax.swing.*;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import javax.imageio.ImageIO;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;


@Component
public class vrGUI {
    private JFrame frame;
    private User currentUser;
    private final userService userService;

    @Autowired
    public vrGUI(userService userService) {
        this.userService = userService;
        setupGUI();
    }

    private void setupGUI() {
        frame = new JFrame("Reservation System");
        frame.setSize(900, 600);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        JPanel loginPanel = createLoginPanel();
        loginPanel.setOpaque(false);

        JPanel wrapperPanel = new JPanel(new FlowLayout(FlowLayout.RIGHT));
        wrapperPanel.setOpaque(false);
        wrapperPanel.add(loginPanel);

        frame.add(wrapperPanel, BorderLayout.NORTH);
        frame.setVisible(true);
    }

    private JPanel createLoginPanel() {
        JPanel panel = new JPanel();
        panel.setLayout(new GridLayout(3, 2, 5, 5));
        panel.setPreferredSize(new Dimension(300, 100));
        panel.setBackground(new Color(255, 255, 255, 200));

        JLabel emailLabel = new JLabel("Email:");
        panel.add(emailLabel);

        JTextField emailText = new JTextField(20);
        panel.add(emailText);

        JLabel passwordLabel = new JLabel("Password:");
        panel.add(passwordLabel);

        JPasswordField passwordText = new JPasswordField(20);
        panel.add(passwordText);

        JButton loginButton = new JButton("Login");
        panel.add(loginButton);

        JButton createAccountButton = new JButton("Create Account");
        panel.add(createAccountButton);

        loginButton.addActionListener(e -> {
            String email = emailText.getText();
            String password = new String(passwordText.getPassword());
            currentUser = userService.login(email, password);

            if (currentUser != null) {
                reservationScreen();
            } else {
                JOptionPane.showMessageDialog(frame, "Invalid login credentials.");
            }
        });

        createAccountButton.addActionListener(e -> createAccountScreen());

        return panel;
    }

    private void createAccountScreen() {
        frame.getContentPane().removeAll();

        JPanel accountPanel = new JPanel();
        accountPanel.setLayout(new GridLayout(4, 2, 5, 5));
        accountPanel.setPreferredSize(new Dimension(300, 150));
        accountPanel.setBackground(new Color(255, 255, 255, 200));

        JLabel emailLabel = new JLabel("Email:");
        accountPanel.add(emailLabel);

        JTextField emailText = new JTextField(20);
        accountPanel.add(emailText);

        JLabel passwordLabel = new JLabel("Password:");
        accountPanel.add(passwordLabel);

        JPasswordField passwordText = new JPasswordField(20);
        accountPanel.add(passwordText);

        JLabel confirmPasswordLabel = new JLabel("Confirm Password:");
        accountPanel.add(confirmPasswordLabel);

        JPasswordField confirmPasswordText = new JPasswordField(20);
        accountPanel.add(confirmPasswordText);

        JButton registerButton = new JButton("Register");
        accountPanel.add(registerButton);

        JButton backButton = new JButton("Back to Login");
        accountPanel.add(backButton);

        registerButton.addActionListener(e -> {
            String email = emailText.getText();
            String password = new String(passwordText.getPassword());
            String confirmPassword = new String(confirmPasswordText.getPassword());

            if (!password.equals(confirmPassword)) {
                JOptionPane.showMessageDialog(frame, "Passwords do not match.");
            } else {
                boolean success = userService.createAccount(email, password);
                if (success) {
                    JOptionPane.showMessageDialog(frame, "Account created successfully!");
                    setupGUI();
                } else {
                    JOptionPane.showMessageDialog(frame, "Account creation failed. Email may already be registered.");
                }
            }
        });

        backButton.addActionListener(e -> setupGUI());

        frame.add(accountPanel, BorderLayout.CENTER);
        frame.revalidate();
        frame.repaint();
    }


    public void reservationScreen() {
        frame.getContentPane().removeAll();

        // Cart button setup
        JPanel cartPanel = new JPanel(new FlowLayout(FlowLayout.RIGHT));
        cartPanel.setOpaque(false);
        JButton cartButton = new JButton("Cart");
        cartButton.setFont(new Font("Arial", Font.BOLD, 16));
        cartPanel.add(cartButton);

        // Add action listener for cart button to display cart contents
        cartButton.addActionListener(e -> showCart());
        frame.add(cartPanel, BorderLayout.NORTH);

        // Main panel with GridLayout for 5 images (3 on top row, 2 on bottom)
        JPanel mainPanel = new JPanel();
        mainPanel.setLayout(new GridLayout(2, 3, 10, 10));

        String[] imagePaths = {"tp.jpg", "roof.jpg", "starnight.jpg", "Cusine.jpg", "casino.jpg"};
        String[] labels = {"Zhan's Golf", "DJ. Victor's Roof Club", "Senor Alejandro's Ranch", "Chef Paul's decent Chinese Cuisine", "Dr. Lamar's Native American Casino"};
        double[] prices = {100.0, 150.0, 200.0, 75.0, 120.0};

        for (int i = 0; i < imagePaths.length; i++) {
            JPanel imagePanel = new JPanel();
            imagePanel.setLayout(new BorderLayout());

            JLabel imageLabel = new JLabel();
            try {
                BufferedImage img = ImageIO.read(getClass().getClassLoader().getResource(imagePaths[i]));
                Image scaledImage = getScaledImage(img, 200, 150);
                imageLabel.setIcon(new ImageIcon(scaledImage));
            } catch (IOException e) {
                e.printStackTrace();
                imageLabel.setText("Image not found");
            }
            imageLabel.setHorizontalAlignment(JLabel.CENTER);

            JButton addToCartButton = new JButton("Add to Cart: " + labels[i]);
            addToCartButton.setHorizontalAlignment(JLabel.CENTER);

            int vacationIndex = i;  // Track the index for the vacation details
            addToCartButton.addActionListener(e -> {
                Vacation vacation = new Vacation(labels[vacationIndex], "Description of " + labels[vacationIndex], prices[vacationIndex]);

                userService.addToCart(currentUser, vacation);
                JOptionPane.showMessageDialog(frame, labels[vacationIndex] + " added to cart.");
            });

            imagePanel.add(imageLabel, BorderLayout.CENTER);
            imagePanel.add(addToCartButton, BorderLayout.SOUTH);
            mainPanel.add(imagePanel);
        }

        frame.add(mainPanel, BorderLayout.CENTER);
        frame.revalidate();
        frame.repaint();
    }


    private void showCart() {
        List<reservationSys> cartItems = userService.getUserCart(currentUser);

        // Create a new JFrame to display cart items
        JFrame cartFrame = new JFrame("Your Cart");
        cartFrame.setSize(400, 300);
        cartFrame.setLocationRelativeTo(frame);

        JPanel cartPanel = new JPanel();
        cartPanel.setLayout(new BoxLayout(cartPanel, BoxLayout.Y_AXIS));

        if (cartItems.isEmpty()) {
            cartPanel.add(new JLabel("Your cart is empty."));
        } else {
            for (reservationSys reservation : cartItems) {
                Vacation vacation = reservation.getVacation();
                String vacationInfo = vacation.getLocation() + " - $" + vacation.getPrice();

                // Create a panel to hold vacation info and remove button
                JPanel itemPanel = new JPanel(new BorderLayout());
                JLabel vacationLabel = new JLabel(vacationInfo);
                JButton removeButton = new JButton("Remove");

                // Add remove button action
                removeButton.addActionListener(e -> {
                    userService.removeFromCart(currentUser, vacation);
                    cartFrame.dispose();  // Close the cart window
                    showCart();  // Reopen to refresh contents
                });

                itemPanel.add(vacationLabel, BorderLayout.CENTER);
                itemPanel.add(removeButton, BorderLayout.EAST);
                cartPanel.add(itemPanel);
            }
        }

        // Add checkout button
        JButton checkoutButton = new JButton("Checkout");
        checkoutButton.addActionListener(e -> {
            int confirm = JOptionPane.showConfirmDialog(cartFrame, "Are you sure you want to checkout?");
            if (confirm == JOptionPane.YES_OPTION) {
                userService.checkout(currentUser);
                JOptionPane.showMessageDialog(cartFrame, "Checkout complete!");
                cartFrame.dispose();
            }
        });

        cartPanel.add(checkoutButton);  // Add checkout button at the bottom
        cartFrame.add(new JScrollPane(cartPanel));
        cartFrame.setVisible(true);
    }


    private BufferedImage getScaledImage(BufferedImage src, int width, int height) {
        BufferedImage resized = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);
        Graphics2D g2 = resized.createGraphics();
        g2.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
        g2.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);
        g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        g2.drawImage(src, 0, 0, width, height, null);
        g2.dispose();
        return resized;
    }

    private void navigateToPage(int pageNumber) {
        frame.getContentPane().removeAll();

        JPanel pagePanel = new JPanel();
        pagePanel.setLayout(new BorderLayout());

        JLabel pageLabel = new JLabel("You are on Page " + pageNumber, JLabel.CENTER);
        pageLabel.setFont(new Font("Arial", Font.BOLD, 24));
        pagePanel.add(pageLabel, BorderLayout.CENTER);

        JButton backButton = new JButton("Back to Home");
        backButton.addActionListener(e -> reservationScreen());
        pagePanel.add(backButton, BorderLayout.SOUTH);

        frame.add(pagePanel);
        frame.revalidate();
        frame.repaint();
    }
}

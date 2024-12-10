package org.example;

import javax.swing.*;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import javax.imageio.ImageIO;

public class vrGUI {
    private JFrame frame;
    private User currentUser;

    public vrGUI() {
        frame = new JFrame("Reservation System");
        frame.setSize(900, 600);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        // Load background image from resources
        JLabel backgroundLabel = new JLabel();
        backgroundLabel.setLayout(new BorderLayout());
        backgroundLabel.setIcon(new ImageIcon(getClass().getClassLoader().getResource("LosTerranos.png")));
        frame.setContentPane(backgroundLabel);

        // Create a panel for the login form and align it to the top right
        JPanel loginPanel = createLoginPanel();
        loginPanel.setOpaque(false); // Make login panel transparent to show background

        // Align login panel to top right
        JPanel wrapperPanel = new JPanel(new FlowLayout(FlowLayout.RIGHT));
        wrapperPanel.setOpaque(false); // Transparent to show the background
        wrapperPanel.add(loginPanel);

        backgroundLabel.add(wrapperPanel, BorderLayout.NORTH); // Add to top (BorderLayout.NORTH)

        frame.setVisible(true);
    }

    private JPanel createLoginPanel() {
        JPanel panel = new JPanel();
        panel.setLayout(new GridLayout(3, 2, 5, 5)); // Grid layout for better organization
        panel.setPreferredSize(new Dimension(300, 100)); // Set preferred size
        panel.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10)); // Add padding
        panel.setBackground(new Color(255, 255, 255, 200)); // Semi-transparent background for readability

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

        JButton guestButton = new JButton("Skip as Guest");
        panel.add(guestButton);

        loginButton.addActionListener(e -> {
            String email = emailText.getText();
            String password = new String(passwordText.getPassword());
            currentUser = User.login(email, password);

            if (currentUser != null) {
                reservationScreen();
            } else {
                JOptionPane.showMessageDialog(frame, "Invalid login credentials.");
            }
        });

        guestButton.addActionListener(e -> {
            currentUser = null; // Set currentUser to null to indicate guest access
            reservationScreen();
        });

        return panel;
    }


    public void reservationScreen() {
        // Clear previous content and prepare for the second page
        frame.getContentPane().removeAll();

        // Main panel with GridLayout for 5 images (3 on top row, 2 on bottom)
        JPanel mainPanel = new JPanel();
        mainPanel.setLayout(new GridLayout(2, 3, 10, 10)); // 2 rows, 3 columns with spacing

        // Load images and labels
        String[] imagePaths = {"tp.jpg", "roof.jpg", "starnight.jpg", "Cusine.jpg", "casino.jpg"};
        String[] labels = {"Zhan's Golf", "DJ. Victor's Roof Club", "Senor Alejandro's Ranch", "Chef Paul's decent Chinese Cuisine", "Dr. Lamar's Native American Casino"};

        // Loop to create each image-label pair and add it to the main panel
        for (int i = 0; i < imagePaths.length; i++) {
            JPanel imagePanel = new JPanel();
            imagePanel.setLayout(new BorderLayout());

            // Load and scale image from resources
            JLabel imageLabel = new JLabel();
            try {
                BufferedImage img = ImageIO.read(getClass().getClassLoader().getResource(imagePaths[i]));
                Image scaledImage = getScaledImage(img, 200, 150);  // Resize image to 200x150
                imageLabel.setIcon(new ImageIcon(scaledImage));
            } catch (IOException e) {
                e.printStackTrace();
                imageLabel.setText("Image not found");
            }
            imageLabel.setHorizontalAlignment(JLabel.CENTER);

            JButton pageButton = new JButton(labels[i]);
            pageButton.setHorizontalAlignment(JLabel.CENTER);

            // Add action listener to navigate to a specific page when clicked
            int pageNumber = i + 1; // Track the page number
            pageButton.addActionListener(e -> navigateToPage(pageNumber));

            // Add image and button to the image panel
            imagePanel.add(imageLabel, BorderLayout.CENTER);
            imagePanel.add(pageButton, BorderLayout.SOUTH);

            // Add image panel to the main panel
            mainPanel.add(imagePanel);
        }

        // Fill the last cell with an empty panel to balance layout (optional)
        mainPanel.add(new JPanel());

        // Add main panel to the frame
        frame.add(mainPanel, BorderLayout.CENTER);
        frame.revalidate();
        frame.repaint();
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



    public static void main(String[] args) {
        SwingUtilities.invokeLater(vrGUI::new);
    }
}

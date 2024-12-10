package com.example.demo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;

import javax.swing.*;

@SpringBootApplication
public class demo {

    public static void main(String[] args) {
        System.setProperty("java.awt.headless", "false");  // Disable headless mode
        SpringApplication.run(demo.class, args);
    }

    @Bean
    CommandLineRunner run(ApplicationContext context) {
        return args -> SwingUtilities.invokeLater(() -> context.getBean(vrGUI.class)); // Launch vrGUI after Spring starts
    }
}

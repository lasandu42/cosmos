package com.cosmos.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    /**
     * Visiting http://localhost:8080/  triggers this method.
     * The returned String "index" tells Thymeleaf to render
     * src/main/resources/templates/index.html
     */
    @GetMapping("/")
    public String home() {
        return "index";
    }
}

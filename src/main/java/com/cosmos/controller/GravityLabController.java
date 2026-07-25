package com.cosmos.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class GravityLabController {

    @GetMapping("/gravity-lab")
    public String gravityLab(){
        return "gravity-lab"; // looks for templates/gravity-lab.html
    }
}

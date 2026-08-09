
package com.cosmos.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class BlackHoleController {

    @GetMapping("/black-hole")
    public String blackHole() {
        return "black-hole";
    }
}
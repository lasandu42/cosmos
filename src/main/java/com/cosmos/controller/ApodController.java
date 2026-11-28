package com.cosmos.controller;

import com.cosmos.service.NasaService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ApodController {

    //Attribute
    private final NasaService nasaService;

    //Constructor
    public ApodController(NasaService nasaService){
        this.nasaService = nasaService;
    }

    @GetMapping("/apod")
    public String apod(Model model){
        // If NASA fails, "apod" is simply missing and the page shows a friendly message
        nasaService.getLatestApod().ifPresent(apod -> model.addAttribute("apod", apod));
        return "apod";
    }
}
